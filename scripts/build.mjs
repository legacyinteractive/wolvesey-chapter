import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';

// Only the public HTML goes into Cloudflare's static asset directory.
await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
await cp('index.html', 'dist/index.html');
for (const asset of ['privacy.html', 'accessibility.html', 'review.html', 'robots.txt', 'sitemap.xml', 'favicon.svg']) {
  await cp(asset, 'dist/' + asset);
}
await mkdir('dist/assets', { recursive: true });
await cp('assets/wolvesey-companion-bw.png', 'dist/assets/wolvesey-companion-bw.png');
await cp('assets/royal-arch-logo.svg', 'dist/assets/royal-arch-logo.svg');
await writeFile('dist/health.txt', 'ok: wolvesey-chapter\n', 'utf8');
let revision = process.env.GITHUB_SHA || process.env.CF_PAGES_COMMIT_SHA || 'unavailable';
try {
  revision = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
} catch {
  console.warn('Git revision unavailable in build environment; using provided metadata if present.');
}
await writeFile('dist/revision.txt', revision + '\n', 'utf8');
console.log('Built dist/index.html for Cloudflare Workers.');
