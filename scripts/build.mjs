import { cp, mkdir, rm, writeFile } from 'node:fs/promises';

// Only the public HTML goes into Cloudflare's static asset directory.
await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
await cp('index.html', 'dist/index.html');
for (const asset of ['privacy.html', 'accessibility.html', 'robots.txt', 'sitemap.xml', 'favicon.svg']) {
  await cp(asset, 'dist/' + asset);
}
await mkdir('dist/assets', { recursive: true });
await cp('assets/wolvesey-companion-bw.png', 'dist/assets/wolvesey-companion-bw.png');
await writeFile('dist/health.txt', 'ok: wolvesey-chapter\n', 'utf8');
console.log('Built dist/index.html for Cloudflare Workers.');
