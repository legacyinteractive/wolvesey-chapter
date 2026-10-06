import { cp, mkdir, rm } from 'node:fs/promises';

// Only the public HTML goes into Cloudflare's static asset directory.
await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
await cp('index.html', 'dist/index.html');
console.log('Built dist/index.html for Cloudflare Workers.');
