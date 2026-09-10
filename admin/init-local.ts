import { existsSync, writeFileSync } from 'node:fs';
import { randomBytes } from 'node:crypto';
const path = '.env.admin-password';
if (!existsSync(path)) writeFileSync(path, randomBytes(24).toString('base64url'), { mode: 0o600, flag: 'wx' });
console.log('Local password file ready: .env.admin-password');
