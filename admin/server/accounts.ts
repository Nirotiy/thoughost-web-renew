import { randomBytes, scrypt } from 'node:crypto';
import { promisify } from 'node:util';
import { z } from 'zod';
import { HttpError, type Store } from './store.ts';

const derive = promisify(scrypt);
export const usernameSchema = z.string().trim().min(1).max(64).regex(/^[a-zA-Z0-9_.-]+$/).transform(value => value.toLowerCase());

// Accounts share administrator permissions. Passwords are never stored in plaintext.
export async function createAdmin(store: Store, username: string, password: string) {
  const name = usernameSchema.parse(username);
  z.string().min(16).max(1024).parse(password);
  const salt = randomBytes(32).toString('hex');
  const hash = (await derive(password, salt, 64) as Buffer).toString('hex');
  const result = store.db.prepare('INSERT INTO admins(username,salt,hash) VALUES(?,?,?) ON CONFLICT(username) DO NOTHING').run(name, salt, hash);
  if (!result.changes) throw new HttpError(409, '用户名已存在');
  return { username: name };
}
