import { resolve } from 'node:path';
import { createApp, readPassword } from './app.ts';
const root = process.cwd();
const passwordFile = process.env.ADMIN_PASSWORD_FILE;
if (!passwordFile) throw new Error('ADMIN_PASSWORD_FILE is required');
const { server, store } = await createApp({ root, dataDir: resolve(process.env.ADMIN_DATA_DIR ?? '.admin-data'), origin: process.env.ADMIN_ORIGIN ?? 'http://127.0.0.1:5210', password: readPassword(passwordFile) });
server.listen(Number(process.env.PORT ?? 5210), process.env.ADMIN_HOST ?? '127.0.0.1', () => console.log('Admin ready'));
for (const signal of ['SIGTERM','SIGINT'] as const) process.on(signal, () => server.close(() => { store.db.close(); process.exit(0); }));
