import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { once } from 'node:events';
import { randomBytes } from 'node:crypto';
import type { AddressInfo } from 'node:net';
import sharp from 'sharp';
import { createApp } from '../server/app.ts';
import { Store } from '../server/store.ts';
import { emptyContent } from '../shared/content.ts';
import type { ContentRecord, Version } from '../shared/content.ts';
import { seed } from '../server/seed.ts';

test('current source import accepts missing credits and does not overwrite saved drafts', () => {
  const store = new Store(':memory:');
  try {
    seed(store, process.cwd());
    assert.equal(store.list('albums').length, 20);
    assert.equal(store.list('members').length, 12);
    assert.equal(store.published('albums').length, 0);
    const record = store.list('members')[0]!;
    store.save(record.id, record.revision, { ...record.data, title: 'Edited locally' });
    seed(store, process.cwd());
    assert.equal(store.get(record.id).data.title, 'Edited locally');
  } finally { store.db.close(); }
});

test('authenticated editing, conflict protection, publication, media and restart persistence', async () => {
  const dataDir = mkdtempSync(join(tmpdir(), 'thoughost-admin-test-'));
  const password = randomBytes(24).toString('hex');
  const origin = 'http://127.0.0.1:5210';
  const { server, store } = await createApp({ dataDir, root: process.cwd(), origin, password, importSeed: false });
  server.listen(0, '127.0.0.1'); await once(server, 'listening');
  const base = 'http://127.0.0.1:' + (server.address() as AddressInfo).port;
  let cookie = '', csrf = '';
  const request = (path: string, method = 'GET', data?: unknown, authenticated = true) => fetch(base + path, { method, headers: { 'Content-Type': 'application/json', Origin: origin, ...(authenticated ? { Cookie: cookie, 'X-CSRF-Token': csrf } : {}) }, ...(data === undefined ? {} : { body: JSON.stringify(data) }) });
  let id = '';
  try {
    assert.equal((await request('/api/admin/records', 'GET', undefined, false)).status, 401);
    assert.equal((await request('/api/auth/login', 'POST', { username: 'admin', password: 'wrong' }, false)).status, 401);
    const login = await request('/api/auth/login', 'POST', { username: 'admin', password }, false);
    assert.equal(login.status, 200); assert.match(login.headers.get('set-cookie')!, /HttpOnly/);
    cookie = login.headers.get('set-cookie')!.split(';')[0]!; csrf = (await login.json() as { csrf: string }).csrf;
    assert.equal((await fetch(base + '/api/admin/records', { method: 'POST', headers: { Cookie: cookie, Origin: 'https://invalid.test', 'Content-Type': 'application/json' }, body: '{}' })).status, 403);
    assert.equal((await fetch(base + '/api/admin/records', { method: 'POST', headers: { Cookie: cookie, Origin: origin, 'Content-Type': 'application/json' }, body: '{}' })).status, 403);
    const data = emptyContent('news', 'Integration test'); data.date = '2026-09-08';
    const created = await request('/api/admin/records', 'POST', data); assert.equal(created.status, 201);
    let record = await created.json() as ContentRecord; id = record.id;
    const path = '/api/admin/records/' + encodeURIComponent(id);
    assert.deepEqual(await (await request('/api/content/news')).json(), []);
    assert.equal((await request(path + '/publish', 'POST', { revision: record.revision })).status, 400);
    record = await (await request(path, 'PUT', { revision: record.revision, data: { ...data, texts: { ...data.texts, en: 'Version one' } } })).json() as ContentRecord;
    record = await (await request(path + '/publish', 'POST', { revision: record.revision })).json() as ContentRecord;
    assert.ok(record.publishedVersion);
    const previousRevision = record.revision;
    record = await (await request(path, 'PUT', { revision: record.revision, data: { ...data, texts: { ...data.texts, en: 'Version two draft' } } })).json() as ContentRecord;
    assert.equal((await request(path, 'PUT', { revision: previousRevision, data })).status, 409);
    const publicRows = await (await request('/api/content/news')).json() as { data: typeof data }[];
    assert.equal(publicRows[0]?.data.texts.en, 'Version one');
    const versions = await (await request(path + '/versions')).json() as Version[];
    const restored = await request(path + '/restore', 'POST', { revision: record.revision, version: versions[0]!.id });
    record = await restored.json() as ContentRecord; assert.equal(record.data.texts.en, 'Version one'); assert.equal(record.revision, 5);
    assert.equal((await request('/api/admin/media', 'POST', { fake: true })).status, 400);
    const png = await sharp({ create: { width: 10, height: 10, channels: 3, background: '#a3bd8e' } }).png().toBuffer();
    const uploaded = await fetch(base + '/api/admin/media', { method: 'POST', headers: { Cookie: cookie, Origin: origin, 'X-CSRF-Token': csrf, 'Content-Type': 'image/png' }, body: new Uint8Array(png) });
    assert.equal(uploaded.status, 201); const media = await uploaded.json() as { url: string };
    const image = await fetch(base + media.url); assert.equal(image.status, 200); assert.equal(image.headers.get('content-type'), 'image/webp');
    await request('/api/auth/logout', 'POST', {}); assert.equal((await request('/api/admin/records')).status, 401);
  } finally { server.close(); await once(server, 'close'); store.db.close(); }
  const reopened = new Store(join(dataDir, 'content.sqlite'));
  try { assert.equal(reopened.get(id).revision, 5); assert.equal(reopened.published('news')[0]?.data.texts.en, 'Version one'); } finally { reopened.db.close(); }
});
