import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { Script } from 'node:vm';

const html = await readFile('index.html', 'utf8');
const config = JSON.parse(await readFile('wrangler.jsonc', 'utf8'));
assert.match(html, /^<!doctype html>/i);
const pageScript=html.match(/<script>\s*([\s\S]*?)<\/script>/)?.[1];
assert.ok(pageScript, 'Missing interactive page script');
new Script(pageScript, { filename: 'Wolvesey inline script' });
assert.match(html, /<title>Wolvesey Chapter No\. 6818/);
assert.match(html, /<meta name="viewport"/);
for (const id of ['content','home','our-chapter','royal-arch','news','meetings','visit','contact','members-dialog']) {
  assert.ok(html.includes('id="' + id + '"'), 'Missing anchor: ' + id);
}
assert.ok(html.includes('The private Chapter area is being prepared.'), 'Members area must not claim working authentication');
for (const path of ['privacy.html', 'accessibility.html', 'review.html', 'robots.txt', 'sitemap.xml', 'favicon.svg']) {
  assert.ok((await readFile(path, 'utf8')).length > 20, 'Missing public SEO/accessibility asset: ' + path);
}
assert.ok(html.includes('the finest chapter in the universe'), 'Chapter quote wording regressed');
assert.ok(html.includes('opacity:.067;pointer-events:none'), 'Hero watermark should stay subtle');
assert.ok(html.includes('href="/review.html"'), 'Review banner link missing');
assert.ok((await readFile('review.html','utf8')).includes('The Members Area is <strong>not active</strong>'), 'Review honesty section missing');
assert.ok(!html.includes('the best chapter in the universe'), 'Superseded Chapter quote still in source');
assert.ok(html.includes('.story__quote p{position:relative;font:normal') && html.includes('color:#1d161a'), 'Quote type contrast missing');
assert.ok(html.includes('.story__grid,.arch__grid{grid-template-columns:1fr;gap:37px}'), 'Quote must stack safely on tablets');
assert.ok(html.includes('The Next Step in Your Masonic Journey.'), 'Chapter headline must be distinct from Lodge site');
assert.ok(html.includes('button.quicklink{appearance:none'), 'Members card must reset default button appearance');
assert.ok(html.includes('background:#ebe8e8'), 'Members card should have a readable light-grey default background');
assert.ok(html.includes('button.quicklink p{color:#4b4245}'), 'Members card text needs explicit high-contrast styling');
assert.ok(html.includes('.quicklink h3{font:700'), 'Quicklink headlines should be bold');
assert.ok(html.includes('.quicklink__arrow{margin-top:auto;color:#9b0b27'), 'Quicklink arrows need stronger contrast');
assert.ok(!html.includes('A Chapter in the<br>heart of Winchester.'), 'Previous Chapter headline must be removed');
assert.ok(html.includes('class="demo-banner"') && html.includes('Website demo — concept only'), 'Public concept-only preview banner must be visible');
assert.ok(html.includes('Website built by <a href="https://legacyinteractive.co.uk/"'), 'Legacy Interactive footer credit missing');
assert.match(html, /<meta property="og:image" content="https:\/\/wolvesey-chapter\.jack-576\.workers\.dev\/assets\/wolvesey-companion-bw\.png">/, 'Social share image missing');
assert.ok(html.includes('scroll-padding-top:24px'), 'On-page links need sensible anchor offsets');
assert.ok(html.includes('font-size:.56rem;margin-top:5px'), 'Mobile brand label readability regression');
assert.ok(html.includes('window.addEventListener("resize"'), 'Mobile navigation should close when entering desktop layout');
assert.ok(html.includes('window.innerWidth>1220'), 'Header nav breakpoint must match JS');
assert.ok(html.includes('font-size:clamp(3.85rem,12.8vw,6rem)'), 'Mobile hero title should not overflow');
assert.ok(html.includes('object-fit:contain;object-position:center;filter:grayscale(100%)'), 'Chapter portrait should be full-width monochrome without excess contrast');
assert.ok(html.includes('grid-template-columns:repeat(2,minmax(0,1fr))'), 'Tablet news cards should not be squeezed');
assert.ok(!html.includes('.footer__top{'), 'Obsolete footer styling should be removed');
assert.ok(html.includes('id="joining"') && html.includes('href="#joining"'), 'Joining pathway should be reachable');
assert.ok(html.includes('at least four weeks'), 'Royal Arch eligibility information missing');
assert.ok(html.includes('124 Alresford Road') && html.includes('Confirm before travel'), 'Recorded venue needs qualification');
assert.ok(html.includes('id="calendar-download"') && html.includes('STATUS:TENTATIVE'), 'Indicative meeting reminders missing');
assert.ok(html.includes('second Wednesday in February, May, October'), 'Provincial meeting pattern absent');
assert.ok(html.includes('name="robots" content="noindex, noarchive"'), 'Demo homepage must not be indexed prior to launch approval');
for(const page of ['privacy.html','accessibility.html','review.html']){
  const legalHtml = await readFile(page,'utf8');
  assert.ok(legalHtml.includes('Website demo — concept only'), 'Preview label missing from '+page);
  assert.ok(legalHtml.includes('name="robots" content="noindex, noarchive"'), 'Demo legal pages must remain noindex until authorised release');
}
assert.ok(!html.includes('Redruth,_Cornwall'), 'Unrelated illustrative photo must not appear');
assert.ok(html.includes('align-self:center;margin:0 0 0 8px'), 'Desktop header CTA alignment missing');
assert.ok(html.includes('src="/assets/wolvesey-companion-bw.png"'), 'The sharper black-and-white Chapter image must appear on homepage');
assert.ok((await readFile('assets/wolvesey-companion-bw.png')).length > 100000, 'High-resolution Chapter photo is missing or too small');
assert.ok(html.includes('object-fit:contain;object-position:center;filter:grayscale(100%)'), 'Chapter photo should not be cropped or shown in colour');
assert.ok(!html.includes('meetings__brand-art'), 'Outdated placeholder still present');
const logo = await readFile('assets/royal-arch-logo.svg', 'utf8');
assert.ok(logo.includes('<svg') && logo.includes('</svg>'), 'Uploaded Royal Arch logo must be valid SVG text');
assert.ok(html.includes('src="/assets/royal-arch-logo.svg"'), 'Homepage must reference the official Royal Arch logo');
assert.equal(html.split('src="/assets/royal-arch-logo.svg"').length - 1, 4, 'Use the official logo in both mastheads, quicklink and watermark');
assert.ok(!html.includes('#ra-mark'), 'No legacy logo artwork should remain');
assert.equal(await readFile('favicon.svg', 'utf8'), logo, 'Favicon must match the Chapter logo');
assert.equal(config.name, 'wolvesey-chapter');
assert.equal(config.assets.directory, './dist');
assert.match(await readFile('scripts/build.mjs', 'utf8'), /dist\/health\.txt/);
console.log('Wolvesey Chapter source and Wrangler configuration checks passed.');
