import { DatabaseSync } from 'node:sqlite';
import { contentSchema, publicationIssues, reviewScopes } from '../shared/content.ts';
import type { ContentData, ContentRecord, Kind, Version } from '../shared/content.ts';

export class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) { super(message); this.status = status; }
}
export class Store {
  db: DatabaseSync;
  constructor(path: string) {
    this.db = new DatabaseSync(path);
    this.db.exec(`PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON; PRAGMA busy_timeout=5000;
      CREATE TABLE IF NOT EXISTS records(id TEXT PRIMARY KEY, kind TEXT NOT NULL, revision INTEGER NOT NULL, data TEXT NOT NULL, published_version INTEGER, updated_at TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS versions(id INTEGER PRIMARY KEY AUTOINCREMENT, record_id TEXT NOT NULL REFERENCES records(id), data TEXT NOT NULL, created_at TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS admin(id INTEGER PRIMARY KEY CHECK(id=1), salt TEXT NOT NULL, hash TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS sessions(token TEXT PRIMARY KEY, csrf TEXT NOT NULL, expires INTEGER NOT NULL);
      CREATE TABLE IF NOT EXISTS migrations(name TEXT PRIMARY KEY, created_at TEXT NOT NULL);`);
  }
  get(id: string): ContentRecord {
    const row = this.db.prepare('SELECT * FROM records WHERE id=?').get(id);
    if (!row) throw new HttpError(404, '内容不存在');
    return { id: String(row.id), revision: Number(row.revision), publishedVersion: row.published_version === null ? null : Number(row.published_version), updatedAt: String(row.updated_at), data: contentSchema.parse(JSON.parse(String(row.data))) };
  }
  list(kind?: Kind): ContentRecord[] {
    const rows = kind ? this.db.prepare('SELECT id FROM records WHERE kind=? ORDER BY updated_at DESC,id').all(kind) : this.db.prepare('SELECT id FROM records ORDER BY kind,id').all();
    return rows.map(row => this.get(String(row.id)));
  }
  create(id: string, data: ContentData): ContentRecord {
    this.db.prepare('INSERT INTO records(id,kind,revision,data,updated_at) VALUES(?,?,1,?,?)').run(id, data.kind, JSON.stringify(contentSchema.parse(data)), new Date().toISOString());
    return this.get(id);
  }
  save(id: string, expected: number, data: ContentData): ContentRecord {
    if (this.get(id).data.kind !== data.kind) throw new HttpError(400, '内容类型不能改变');
    const result = this.db.prepare('UPDATE records SET data=?,revision=revision+1,updated_at=? WHERE id=? AND revision=?').run(JSON.stringify(contentSchema.parse(data)), new Date().toISOString(), id, expected);
    if (!result.changes) throw new HttpError(409, '内容已被其他窗口更新。请保留输入，重新加载后比较。');
    return this.get(id);
  }
  publish(id: string, expected: number, approvals: string[]): ContentRecord {
    this.db.exec('BEGIN IMMEDIATE');
    try {
      const record = this.get(id);
      if (record.revision !== expected) throw new HttpError(409, '草稿版本已改变，请重新检查');
      const issues = publicationIssues(record.data);
      if (issues.length) throw new HttpError(400, issues.join('；'));
      if (reviewScopes(record.data).some(scope => !approvals.includes(scope))) throw new HttpError(400, '请完成当前草稿逐项确认');
      const created = this.db.prepare('INSERT INTO versions(record_id,data,created_at) VALUES(?,?,?)').run(id, JSON.stringify(record.data), new Date().toISOString());
      this.db.prepare('UPDATE records SET published_version=?,revision=revision+1,updated_at=? WHERE id=?').run(created.lastInsertRowid, new Date().toISOString(), id);
      this.db.exec('COMMIT'); return this.get(id);
    } catch (error) { this.db.exec('ROLLBACK'); throw error; }
  }
  versions(id: string): Version[] {
    this.get(id);
    return this.db.prepare('SELECT * FROM versions WHERE record_id=? ORDER BY id DESC').all(id).map(row => ({ id: Number(row.id), recordId: String(row.record_id), createdAt: String(row.created_at), data: contentSchema.parse(JSON.parse(String(row.data))) }));
  }
  restore(id: string, expected: number, version: number): ContentRecord {
    const match = this.versions(id).find(item => item.id === version);
    if (!match) throw new HttpError(404, '历史版本不存在');
    return this.save(id, expected, match.data);
  }
  published(kind: Kind): { id: string; version: number; data: ContentData }[] {
    return this.db.prepare('SELECT r.id,v.id AS version,v.data FROM records r JOIN versions v ON r.published_version=v.id WHERE r.kind=? ORDER BY r.id').all(kind)
      .map(row => ({ id: String(row.id), version: Number(row.version), data: contentSchema.parse(JSON.parse(String(row.data))) }));
  }
}
