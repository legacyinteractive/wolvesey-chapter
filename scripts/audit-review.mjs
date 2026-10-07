import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const pages=['index.html','review.html','privacy.html','accessibility.html'];
const rootURL='https://wolvesey-chapter.jack-576.workers.dev/';
const files=Object.fromEntries(await Promise.all(pages.map(async p=>[p,await readFile(p,'utf8')])));
let links=0,images=0,scans=0;

for(const [page,html] of Object.entries(files)){
  assert.match(html,/^<!doctype html>/i,'HTML doctype missing: '+page);
  assert.match(html,/<html lang="en-GB">/,'Language missing: '+page);
  assert.match(html,/<meta name="viewport"/,'Viewport missing: '+page);
  assert.match(html,/<meta name="robots" content="noindex, noarchive"/,'Concept indexing guard missing: '+page);
  assert.match(html,/Website demo — concept only/i,'Concept banner missing: '+page);
  assert.match(html,/<title>[^<]+<\/title>/,'Title missing: '+page);
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(new Set(ids).size,ids.length,'Duplicate HTML id on '+page);
  for(const match of html.matchAll(/\b(?:aria-controls|aria-labelledby)="([^"]+)"/g)){
    for(const id of match[1].trim().split(/\s+/))assert.ok(ids.includes(id),'Unknown ARIA reference '+id+' on '+page);
  }
  for(const match of html.matchAll(/<a\b[^>]*>/g)){
    const tag=match[0],href=tag.match(/\bhref="([^"]*)"/)?.[1];links++;
    assert.ok(href&&href.trim()&&href!=='#','Empty anchor on '+page);
    assert.ok(!/^javascript:/i.test(href),'Unsafe anchor on '+page);
    if(tag.includes('target="_blank"'))assert.match(tag,/\brel="[^"]*\bnoopener\b[^"]*"/,'Missing noopener on '+page);
    if(href.startsWith('#'))assert.ok(ids.includes(href.slice(1)),'Broken hash '+href+' on '+page);
    if(href.startsWith('/')&&!href.startsWith('//')){
      const dest=new URL(href,rootURL),target=dest.pathname==='/'?'index.html':decodeURIComponent(dest.pathname.replace(/^\//,''));
      assert.ok(pages.includes(target)||target.startsWith('assets/')||target==='favicon.svg','Unrecognised site link '+href+' on '+page);
      if(dest.hash)assert.ok(files[target]?.includes('id="'+decodeURIComponent(dest.hash.slice(1))+'"'),'Invalid target hash '+href+' on '+page);
    }
    if(/^[^/:#?]+\.html(#.*)?$/.test(href)){
      const [target,hash]=href.split('#');
      assert.ok(pages.includes(target),'Missing local page '+href+' on '+page);
      if(hash)assert.ok(files[target].includes('id="'+hash+'"'),'Missing linked target '+href+' on '+page);
    }
  }
  for(const match of html.matchAll(/<img\b[^>]*>/g)){
    const tag=match[0],src=tag.match(/\bsrc="([^"]+)"/)?.[1];images++;
    assert.ok(src,'Image without source: '+page);
    assert.match(tag,/\balt="[^"]*"/,'Image without alternative text: '+page);
    if(src.startsWith('/')){
      const target=path.posix.normalize(src.slice(1));
      assert.ok(!target.startsWith('..'),'Unsafe image path '+src);
      const meta=await stat(target).catch(()=>null);
      assert.ok(meta?.isFile()&&meta.size>100,'Missing/empty image '+src);
    }
  }
  scans++;
}
assert.ok(files["review.html"].includes("not active"),'Members Area limitation not explained');
assert.ok(files["index.html"].includes('id="menu-button"')&&files["index.html"].includes('aria-expanded="false"'),'Menu needs accessible toggle');
assert.ok(files["index.html"].includes('id="calendar-download"')&&files["index.html"].includes('STATUS:TENTATIVE'),'Calendar must remain indicative');
assert.ok(files["index.html"].includes('the finest chapter in the universe'),'Chapter quote must match approved wording');
console.log('Public demo audit passed: '+scans+' HTML pages, '+links+' links and '+images+' images checked.');
