import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

const html = await readFile('index.html', 'utf8');
const config = JSON.parse(await readFile('wrangler.jsonc', 'utf8'));
assert.match(html, /^<!doctype html>/i);
assert.match(html, /<title>Wolvesey Chapter No\. 6818/);
assert.match(html, /<meta name="viewport"/);
for (const id of ['content','home','our-chapter','royal-arch','news','meetings','visit','contact','members-dialog']) {
  assert.ok(html.includes('id="' + id + '"'), 'Missing anchor: ' + id);
}
assert.ok(html.includes('The private Chapter area is being prepared.'), 'Members area must not claim working authentication');
for (const path of ['privacy.html', 'accessibility.html', 'robots.txt', 'sitemap.xml', 'favicon.svg']) {
  assert.ok((await readFile(path, 'utf8')).length > 20, 'Missing public SEO/accessibility asset: ' + path);
}
assert.ok(html.includes('the best chapter in the universe'), 'Chapter quote was not updated');
assert.ok(!html.includes('Redruth,_Cornwall'), 'Unrelated illustrative photo must not appear');
assert.ok(html.includes('align-self:center;margin:0 0 0 8px'), 'Desktop header CTA alignment missing');
assert.ok(html.includes('src="/assets/wolvesey-companion-bw.png"'), 'The sharper black-and-white Chapter image must appear on homepage');
assert.ok((await readFile('assets/wolvesey-companion-bw.png')).length > 100000, 'High-resolution Chapter photo is missing or too small');
assert.ok(html.includes('object-fit:contain;object-position:center;filter:grayscale(100%)'), 'Chapter photo should not be cropped or shown in colour');
assert.ok(!html.includes('meetings__brand-art'), 'Outdated placeholder still present');
assert.equal(config.name, 'wolvesey-chapter');
assert.equal(config.assets.directory, './dist');
assert.match(await readFile('scripts/build.mjs', 'utf8'), /dist\/health\.txt/);
console.log('Wolvesey Chapter source and Wrangler configuration checks passed.');
