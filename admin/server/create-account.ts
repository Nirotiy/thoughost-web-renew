import { resolve } from 'node:path';
import { existsSync, readFileSync } from 'node:fs';
import { Store } from './store.ts';
import { createAdmin } from './accounts.ts';

// Explicit database and password-file paths avoid changing the wrong environment.
const [database, username, passwordFile] = process.argv.slice(2);
if (!database || !username || !passwordFile || !existsSync(resolve(database))) {
  throw new Error('Usage: node admin/server/create-account.ts <existing-database> <username> <password-file>');
}
const store = new Store(resolve(database));
try {
  await createAdmin(store, username, readFileSync(resolve(passwordFile), 'utf8').trim());
  console.log('Administrator account created.');
} finally { store.db.close(); }
