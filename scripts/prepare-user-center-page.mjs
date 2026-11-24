import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {userCenterPageMeta as meta} from '../src/userCenterPageMeta.js';

// Emit a real HTML entry for search and link-preview crawlers without changing
// the existing Worker or any other page's metadata.
export function userCenterPageHtml(rootHtml){
  const escape=value=>value.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
  let html=rootHtml.replace(/<title>[\s\S]*?<\/title>/,`<title>${escape(meta.title)}</title>`);
  const values={description:meta.description,robots:'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1','og:title':meta.title,'og:description':meta.description,'og:url':meta.canonical,'twitter:title':meta.title,'twitter:description':meta.description};
  for(const [name,value] of Object.entries(values)){
    const attribute=name.startsWith('og:')?'property':'name';
    const pattern=new RegExp(`<meta ${attribute}="${name}" content="[^"]*"\\s*\\/?\\s*>`);
    if(!pattern.test(html))throw new Error(`Missing existing metadata: ${name}`);
    html=html.replace(pattern,`<meta ${attribute}="${name}" content="${escape(value)}" />`);
  }
  if(!/<link rel="canonical" href="[^"]*"/.test(html))throw new Error('Missing canonical link');
  html=html.replace(/<link rel="canonical" href="[^"]*"/,`<link rel="canonical" href="${meta.canonical}"`);
  const schema={'@context':'https://schema.org','@type':'CreativeWork','@id':meta.canonical+'#case-study',url:meta.canonical,name:meta.title,description:meta.description,author:{'@id':'https://tsharrelson.com/#person'},isPartOf:{'@id':'https://tsharrelson.com/#website'}};
  return html.replace('</head>',`<script type="application/ld+json">${JSON.stringify(schema)}</script>\n</head>`);
}

if(process.argv[1]&&new URL(import.meta.url).pathname===process.argv[1]){
  const html=userCenterPageHtml(await readFile(new URL('../dist/client/index.html',import.meta.url),'utf8'));
  const directory=new URL('../dist/client/work/user-center-permissions/',import.meta.url);
  await mkdir(directory,{recursive:true});
  await writeFile(new URL('index.html',directory),html);
  await writeFile(new URL('../dist/client/work/user-center-permissions.html',import.meta.url),html);
  console.log('Prepared User Center page with canonical and sharing metadata.');
}
