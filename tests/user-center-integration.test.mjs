import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import test from 'node:test';
import worker from '../worker/index.js';
import {userCenterPageMeta as meta} from '../src/userCenterPageMeta.js';

test('direct User Center URLs expose case-specific metadata to crawlers before JavaScript runs',async()=>{
 const html=await readFile(new URL('../dist/client/work/user-center-permissions/index.html',import.meta.url),'utf8');
 assert.equal(await readFile(new URL('../dist/client/work/user-center-permissions.html',import.meta.url),'utf8'),html);
 for(const method of ['GET','HEAD']){
  const response=await worker.fetch(new Request(meta.canonical,{method,headers:{'user-agent':'LinkedInBot/1.0'}}),{ASSETS:{fetch:async request=>new Response(new URL(request.url).pathname===meta.path?(method==='HEAD'?null:html):'missing',{status:new URL(request.url).pathname===meta.path?200:404})}});
  assert.equal(response.status,200);
  if(method==='HEAD')continue;
  const text=await response.text();
  assert.ok(text.includes(`<title>${meta.title}</title>`));
  assert.ok(text.includes(`rel="canonical" href="${meta.canonical}"`));
  assert.ok(text.includes(`property="og:url" content="${meta.canonical}"`));
  assert.ok(text.includes(`name="twitter:title" content="${meta.title}"`));
  assert.ok(text.includes('"@type":"CreativeWork"'));
  assert.doesNotMatch(text,/127\.0\.0\.1|noindex|Local case study preview/);
 }
});
