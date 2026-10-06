import { cp, mkdir, rm, writeFile } from 'node:fs/promises';

// Only the public HTML goes into Cloudflare's static asset directory.
await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
await cp('index.html', 'dist/index.html');
await writeFile('dist/health.txt', 'ok: wolvesey-chapter\n', 'utf8');
console.log('Built dist/index.html for Cloudflare Workers.');
