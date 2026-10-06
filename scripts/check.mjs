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
assert.equal(config.name, 'wolvesey-chapter');
assert.equal(config.assets.directory, './dist');
console.log('Wolvesey Chapter source and Wrangler configuration checks passed.');
