import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import test from 'node:test';
import worker from '../worker/index.js';
import {creditToolPageMeta as meta} from '../src/creditToolPageMeta.js';

test('published credit URL serves its own HTML to a link-preview crawler',async()=>{
  const html=await readFile(new URL('../dist/client/work/customer-credits/index.html',import.meta.url),'utf8');
  assert.equal(await readFile(new URL('../dist/client/work/customer-credits.html',import.meta.url),'utf8'),html);
  const response=await worker.fetch(new Request(meta.canonical,{headers:{accept:'*/*','user-agent':'LinkedInBot/1.0'}}),{ASSETS:{fetch:async request=>new Response(new URL(request.url).pathname===meta.path?html:'missing',{status:new URL(request.url).pathname===meta.path?200:404})}});
  assert.equal(response.status,200);
  const text=await response.text();
  assert.ok(text.includes(`<title>${meta.title}</title>`));
  assert.ok(text.includes(`rel="canonical" href="${meta.canonical}"`));
  assert.ok(text.includes(`property="og:url" content="${meta.canonical}"`));
  assert.ok(text.includes(`name="twitter:title" content="${meta.title}"`));
  assert.doesNotMatch(text,/Local review|local portfolio|noindex/);
});

test('release includes only the final credit images and required fonts',async()=>{
  const files=await readdir(new URL('../dist/client/assets/credit-tool/',import.meta.url));
  assert.deepEqual(files.sort(),['figtree-400.ttf','figtree-600.ttf','figtree-700.ttf','generic-shoe-thumb.png','overview-sanitized.png','quick-dialog-user.png']);
  const bytes=await readFile(new URL('../dist/client/assets/credit-tool/quick-dialog-user.png',import.meta.url));
  assert.equal(createHash('sha256').update(bytes).digest('hex'),'54f5f3282a6683c87a903effe354e334340ee7d76fb9051560a2c808e7ae4667');
});

test('client route, Work entry, related Deck link and sitemap connect the case',async()=>{
  const app=await readFile(new URL('../src/App.jsx',import.meta.url),'utf8');
  const projects=await readFile(new URL('../src/HomeB.jsx',import.meta.url),'utf8');
  const flagship=await readFile(new URL('../src/FlagshipCase.jsx',import.meta.url),'utf8');
  const sitemap=await readFile(new URL('../public/sitemap.xml',import.meta.url),'utf8');
  assert.ok(app.includes('<CreditToolCase pathname={pathname} Shell={Shell}/>'));
  assert.ok(projects.includes("href: '/work/customer-credits', Visual: CreditProjectPreview"));
  assert.doesNotMatch(app,/<Mini title="Making a manual-credit workflow feel controlled"/);
  assert.ok(flagship.includes('href="/work/customer-credits"'));
  assert.ok(sitemap.includes(`<loc>${meta.canonical}</loc>`));
});
