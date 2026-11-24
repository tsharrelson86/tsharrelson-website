import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowsLeftRight, CalendarBlank, SquaresFour, UserCircle, X } from '@phosphor-icons/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './BrandIdentityCase.css';
gsap.registerPlugin(ScrollTrigger);
const sourceAssets=import.meta.glob('../brand-identity-assets/*',{eager:true,query:'?url',import:'default'});
const asset=name=>sourceAssets['../brand-identity-assets/'+name];
function useEditorialMotion(root){
 useEffect(()=>{if(new URLSearchParams(location.search).get('motion')==='reduce')return;const media=gsap.matchMedia();media.add('(prefers-reduced-motion: no-preference)',()=>{
  const ctx=gsap.context(()=>{
   gsap.from('.case-hero > div > *',{y:26,opacity:0,duration:.8,stagger:.09,ease:'power3.out'});
   root.current.querySelectorAll('.study-chapter').forEach(section=>{
    const copy=section.querySelector('.chapter-copy');const visual=section.querySelector('.study-visual');
    const tl=gsap.timeline({scrollTrigger:{trigger:section,start:'top 88%',end:'top 34%',scrub:.65}});
    tl.from(copy?.querySelectorAll(':scope > span, h2, p')||[],{y:36,opacity:.15,stagger:.1,ease:'power2.out'},0);
    if(visual&&!visual.querySelector('.application-spread'))tl.from(visual,{y:65,scale:.96,opacity:.25,ease:'power2.out'},.08);
    section.querySelectorAll('.application-piece').forEach((piece,index)=>{
     const layer=piece.querySelector('.application-float');const art=layer.querySelector('button');const mobile=matchMedia('(max-width: 600px)').matches;
     const tilt=[-2.2,2.1,1.3,-2,2][index]*(mobile ? .4 : 1);
     const entrance=gsap.timeline({scrollTrigger:{trigger:piece,start:'top 98%',end:'top 52%',scrub:.7,invalidateOnRefresh:true}});
     entrance.fromTo(layer,{y:mobile?34:84,scale:.97,opacity:.3},{y:0,scale:1,opacity:1,ease:'none'},0).fromTo(art,{rotation:0},{rotation:tilt,ease:'none'},0);
    });
   });
  },root);return()=>ctx.revert();
 });return()=>media.revert();},[root]);
}
function Hero(){return <><section className="case-hero"><div><p className="eyebrow">Case study · Deck Commerce identity</p><h1>A rebrand that made Deck’s mission recognizable at a glance.</h1><p className="hero-lede">How I developed a new identity through strategic exploration, collaborative choice, and a company-wide launch.</p></div></section><dl className="project-facts">{[[CalendarBlank,'State','Launched in 2025'],[UserCircle,'My role','Logo concepts · Identity system · Creative direction'],[SquaresFour,'Public evidence','Released mark · Website · Leadership response']].map(([Icon,label,value])=><div key={label}><Icon size={30} weight="thin"/><dt>{label}</dt><dd>{value}</dd></div>)}</dl></>;}
function Copy({n,title,children}){return <div className="chapter-copy"><span>{n}</span><div><h2>{title}</h2>{children}</div></div>;}
function Chapter({id,n,title,children,visual,wide=false}){return <section id={id} className={'study-chapter'+(wide?' study-chapter--wide':'')}><Copy n={n} title={title}>{children}</Copy><div className="study-visual">{visual}</div></section>;}
function Segments({label,items,value,onChange}){return <div className="study-segments" role="group" aria-label={label}>{items.map(([key,text])=><button type="button" key={key} aria-pressed={value===key} onClick={()=>onChange(key)}>{text}</button>)}</div>;}
function Caption({children}){return <figcaption className="study-caption">{children}</figcaption>;}

function Ending(){return <section className="case-ending"><div><p className="eyebrow">Continue</p><h2>Modernizing Deck Commerce’s enterprise order management platform</h2></div><div><a className="primary-action" href="/work/deck-modernization">Next story <ArrowRight size={17}/></a><a className="text-action" href="/work">Back to selected work</a></div></section>;}
const lockups={wide:['logo-wide.png','logo-space-wide.png','Horizontal'],stacked:['logo-stacked-clean.png','logo-space-stacked.png','Stacked'],square:['logo-square-clean.png','logo-space-square.png','Double stacked']};
const palette=[['Enterprise Blue','#052D67','Primary identity color'],['Deck Blue','#0C64E7','Primary identity color'],['Mint','#16B191','Secondary palette'],['Grape','#8038E7','Secondary palette'],['Raspberry','#BF1D6A','Secondary palette'],['Tangerine','#FF9532','Secondary palette']];
function ImageTreatment(){const [treatment,setTreatment]=useState('overlay');const [original,setOriginal]=useState(false);return <div className="image-treatment"><div className="image-treatment-stage"><img key={treatment+original} src={asset('photo-'+treatment+'-'+(original?'original':'treated')+'.webp')} alt={(original?'Original stock photograph for ':'Documented brand treatment: ')+({overlay:'color overlay',mask:'brand silhouette mask',pattern:'pattern overlay'}[treatment])}/></div><div className="identity-controls"><Segments label="Photographic treatment" items={[["overlay","Overlay"],["mask","Mask"],["pattern","Pattern"]]} value={treatment} onChange={setTreatment}/><button type="button" className="study-text-button" aria-pressed={original} onClick={()=>setOriginal(!original)}>{original?'Show treatment':'Show original'}</button></div></div>;}
function Identity(){const [tab,setTab]=useState('lockups');const [lockup,setLockup]=useState('wide');const [guides,setGuides]=useState(false);const [color,setColor]=useState(1);return <figure className="identity-demo"><Segments label="Identity system" items={[["lockups","Lockups"],["type","Type + color"],["imagery","Imagery"]]} value={tab} onChange={setTab}/>{tab==='imagery'?<ImageTreatment/>:tab==='type'?<div className="identity-type-panel" style={{'--brand-accent':palette[color][1]}}><span className="brand-type-brow">One family. A clear hierarchy.</span><h3>Figtree</h3><p className="brand-type-heading">Power your growth.</p><p>Display, heading, body, and action roles give the system a recognizable rhythm.</p><div className="brand-swatches" role="group" aria-label="Brand palette">{palette.map(([name,hex],i)=><button type="button" key={hex} aria-label={name} aria-pressed={i===color} style={{backgroundColor:hex}} onClick={()=>setColor(i)}/>)}</div><p className="brand-color-detail" aria-live="polite"><b>{palette[color][0]}</b><span>{palette[color][1]} · {palette[color][2]}</span></p></div>:<><div className={'lockup-stage lockup-stage--'+lockup}><img key={lockup+(tab==='guides'||guides)} src={asset(lockups[lockup][tab==='guides'||guides?1:0])} alt={lockups[lockup][2]+' released Deck Commerce lockup'+(tab==='guides'||guides?', with documented clear-space guides':'')}/></div><div className="identity-controls"><Segments label="Logo format" items={[["wide","Wide"],["stacked","Stacked"],["square","Compact"]]} value={lockup} onChange={setLockup}/>{tab!=='guides'&&<button type="button" className="study-text-button" aria-pressed={guides} onClick={()=>setGuides(!guides)}>{guides?'Hide guides':'Show guides'}</button>}</div></>}<Caption>Selected source lockups and rules from the Deck Commerce brand guidelines.</Caption></figure>;}
function WebsiteComparison(){
 const [split,setSplit]=useState(50);const box=useRef(null);const dragging=useRef(false);const cue=useRef(null);const interacted=useRef(false);
 useEffect(()=>{
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  if(reduced.matches||new URLSearchParams(location.search).get('motion')==='reduce')return;
  const observer=new IntersectionObserver(entries=>{
   if(!entries.some(entry=>entry.isIntersecting))return;
   observer.disconnect();if(interacted.current)return;
   const position={value:50};const update=()=>setSplit(position.value);
   cue.current=gsap.timeline({delay:.5}).to(position,{value:59,duration:.5,ease:'power2.inOut',onUpdate:update}).to(position,{value:43,duration:.65,ease:'power2.inOut',onUpdate:update}).to(position,{value:50,duration:.45,ease:'power2.inOut',onUpdate:update});
  },{threshold:.35});
  observer.observe(box.current);
  const change=()=>{if(reduced.matches){observer.disconnect();cue.current?.kill();if(!interacted.current)setSplit(50);}};
  reduced.addEventListener('change',change);
  return()=>{observer.disconnect();cue.current?.kill();reduced.removeEventListener('change',change);};
 },[]);
 const stopCue=()=>{interacted.current=true;cue.current?.kill();};
 const move=event=>{if(!dragging.current)return;const rect=box.current.getBoundingClientRect();setSplit(Math.max(0,Math.min(100,(event.clientX-rect.left)/rect.width*100)));};
 const keyboard=event=>{const values={ArrowLeft:split-5,ArrowDown:split-5,ArrowRight:split+5,ArrowUp:split+5,PageDown:split-10,PageUp:split+10,Home:0,End:100};if(values[event.key]!==undefined){stopCue();event.preventDefault();setSplit(Math.max(0,Math.min(100,values[event.key])));}};
 return <figure className="website-comparison"><div className="website-compare-labels"><span>Before</span><span>After</span></div><div ref={box} className="website-slider" style={{'--split':`${split}%`}}>
  <img className="website-slider-after" src={asset('website-after-user.png')} width="2880" height="1800" alt="After: the new Deck Commerce identity and commerce illustration"/>
  <div className="website-slider-before" style={{clipPath:`inset(0 ${100-split}% 0 0)`}}><img src={asset('website-before-backup.png')} width="1440" height="900" alt="Before: Deck Commerce’s former identity and orange-accented website"/></div>
  <button type="button" role="slider" className="website-compare-divider" aria-label="Before and after comparison divider" aria-valuemin="0" aria-valuemax="100" aria-valuenow={Math.round(split)} aria-valuetext={`${Math.round(split)} percent before, ${100-Math.round(split)} percent after`} aria-orientation="horizontal" onFocus={stopCue} onKeyDown={keyboard} onPointerDown={event=>{stopCue();dragging.current=true;event.currentTarget.setPointerCapture(event.pointerId);move(event);}} onPointerMove={move} onPointerUp={()=>{dragging.current=false;}} onPointerCancel={()=>{dragging.current=false;}} onLostPointerCapture={()=>{dragging.current=false;}}><span><ArrowsLeftRight size={20}/></span></button>
 </div></figure>;
}

function BrandQuote({children,by}){return <blockquote className="study-visual brand-response-quote"><p>{children}</p><cite>{by}</cite></blockquote>;}
const applications=[
 ['presentation','PowerPoint templates','Original template with a sample heading.','presentation-template.webp'],
 ['writing','Writing standards','Selected pages from the 19-page company-wide guide, September 2026.','writing-guide-4.webp'],
 ['brandcenter','BrandCenter','Live resource excerpt: imagery, email signatures, and LinkedIn assets.','brandcenter-resources.jpg'],
 ['word','Word templates','Original template with generic demonstration content.','word-template.webp'],
 ['zoom','Zoom backgrounds','Original artwork exported from the branding library.','zoom-glyph.webp'],
];
function ApplicationArt({kind,large=false}){
 if(kind==='presentation')return <div className="application-slide"><img src={asset('presentation-template.webp')} alt="Original Deck PowerPoint template with blue gradient and white logo"/><div className="template-sample-title" aria-label="Generic sample heading">Company update<small>A shared direction.</small></div></div>;
 if(kind==='writing')return <div className={'application-guide'+(large?' application-guide--large':'')}><img className="guide-back" src={asset('writing-guide-1.webp')} alt="Writing guide title, five principles, and contents"/><img className="guide-front" src={asset('writing-guide-4.webp')} alt="Writing standards page on clarity, outcomes, and tone for six company contexts"/></div>;
 if(kind==='word')return <div className="application-word"><img src={asset('word-template.webp')} alt="Original Word template with branded header and footer"/><div className="word-sample"><h3>Project overview</h3><p>A shared starting point.</p><h4>Purpose</h4><div className="sample-lines" aria-hidden="true"><i/><i/><i/><i/></div><h4>Next steps</h4><div className="sample-lines" aria-hidden="true"><i/><i/><i/></div></div></div>;
 if(kind==='brandcenter')return <div className="brandcenter-crop"><img src={asset('brandcenter-resources.jpg')} alt="BrandCenter resources for approved imagery, Outlook email signatures, and LinkedIn banners"/></div>;
 return <div className="application-backgrounds"><img src={asset('zoom-blue-flow.webp')} alt="Blue Flow Zoom background"/><img src={asset('zoom-mosaic.webp')} alt="Shape Mosaic Zoom background"/></div>;
}
function BrandApplications(){
 const [active,setActive]=useState(null);const dialog=useRef(null);const triggers=useRef([]);
 useEffect(()=>{if(active!==null&&!dialog.current.open)dialog.current.showModal();},[active]);
 function close(){const prior=active;dialog.current.close();setActive(null);triggers.current[prior]?.focus({preventScroll:true});}
 return <figure className="brand-applications"><div className="application-spread">{applications.map(([kind,title,detail],i)=><div className={'application-piece application-piece--'+kind} key={kind}><div className="application-float"><button type="button" ref={el=>triggers.current[i]=el} onClick={()=>setActive(i)} aria-label={'Inspect '+title}><ApplicationArt kind={kind}/></button><div className="application-caption"><span>{title}</span><small>{kind==='writing'?'19 pages · Voice to product UI':kind==='presentation'||kind==='word'?'Sample content on original template':kind==='brandcenter'?'Guidance + company resources':'A library of original designs'}</small></div></div></div>)}</div><dialog ref={dialog} className="application-dialog" onCancel={event=>{event.preventDefault();close();}} onClick={event=>{if(event.target===event.currentTarget)close();}} aria-labelledby="application-dialog-title"><div className="application-dialog-heading"><div><h3 id="application-dialog-title">{active!==null?applications[active][1]:''}</h3><p>{active!==null?applications[active][2]:''}</p></div><button type="button" onClick={close} aria-label="Close artifact"><X size={24}/></button></div>{active!==null&&<div className={'application-dialog-art application-dialog-art--'+applications[active][0]}><ApplicationArt kind={applications[active][0]} large/></div>}</dialog></figure>;
}
const zoomDesigns=[['blue-flow','Blue Flow'],['glyph','Glyph Gateway'],['mosaic','Shape Mosaic'],['old-school','Old School']];
function BackgroundPlayground(){const [selected,setSelected]=useState(0);return <figure className="background-playground"><div className="background-preview"><img key={selected} src={asset('zoom-'+zoomDesigns[selected][0]+'.webp')} alt={'Original '+zoomDesigns[selected][1]+' Zoom background'}/><div className="background-selfview" aria-hidden="true"><UserCircle size={70} weight="thin"/><span>You, on brand.</span></div></div><div className="background-thumbnails" role="group" aria-label="Choose a Zoom background">{zoomDesigns.map(([file,name],i)=><button type="button" key={file} onClick={()=>setSelected(i)} aria-pressed={selected===i}><img src={asset('zoom-'+file+'.webp')} alt=""/><span>{name}</span></button>)}</div><div className="study-under-controls"><span aria-live="polite">{zoomDesigns[selected][1]}</span></div><Caption>Try a background. These are original exports from the Deck branding library. The silhouette is a portfolio demonstration; no camera is used.</Caption></figure>;}
export function BrandIdentityContent(){const root=useRef(null);useEditorialMotion(root);
 useEffect(()=>{if(!location.hash)return;let cancelled=false;document.fonts.ready.then(()=>requestAnimationFrame(()=>{if(cancelled)return;document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView({behavior:'instant'});ScrollTrigger.refresh();}));return()=>{cancelled=true;};},[]);
 return <div ref={root} className={'case-study-review brand-identity-case'+(new URLSearchParams(location.search).get('motion')==='reduce'?' study-motion-reduced':'')}><Hero/><div className="chapters">
 <Chapter id="identity" n="01" title="A mark built to represent the company behind the platform." visual={<Identity/>}><p>The chosen direction became Deck Commerce’s public identity. I developed the logo concepts and identity system, then helped carry the work into a broader brand launch.</p></Chapter>
 <Chapter id="challenge" n="02" title="The identity needed to catch up with the product" wide visual={<WebsiteComparison/>}><p>As Deck modernized its order-management platform, its market-facing identity needed to express the company’s direction with greater clarity and distinction.</p><p>The challenge was to give the team a recognizable system they could use beyond one logo.</p></Chapter>
 <section className="study-chapter study-quote" id="choice"><Copy n="03" title="Three directions. One shared decision."><p>I narrowed the exploration to three finalists, then brought leadership into the choice. Each direction connected Deck’s values and product ambition to a distinct visual identity.</p></Copy><BrandQuote by="Chris Deck · Owner/CEO">“Tim, these are all so good – you have done such a great job to <strong>learn our company, our heart, our mission, our vision</strong> and represent that in each of these brand directions. I literally can’t pick just one – they are all so good!”</BrandQuote></section>
 <Chapter id="launch" n="04" title="A system that worked beyond the mark." wide visual={<BrandApplications/>}><p>The identity became a company-wide system: BrandCenter, writing guidance, Word and PowerPoint templates, Zoom backgrounds, email signatures, and marketing and social materials.</p><p>I led brand-voice decisions across product, marketing, customer service, and sales, and authored shared writing standards aligned with our brand personality and audience personas.</p><p>I led the identity work and website creative direction. The visual identity earned immediate, enthusiastic company-wide adoption.</p></Chapter>
 <section className="study-chapter study-quote study-quote--closing"><div className="chapter-copy"><span aria-hidden="true"></span><div><p className="eyebrow">At launch</p><h2>The craft was recognized.</h2></div></div><BrandQuote by="Doug Smith · CTO">“I have worked with multi-million dollar companies, and they have <strong>not produced something as good as you have done on your own.</strong> I’m amazed.”</BrandQuote></section>
 <Chapter id="connection" n="05" title="Recognizable. With room for personality." visual={<BackgroundPlayground/>}><p>A useful brand system gives people a clear starting point and enough range to make it their own. Even a daily touchpoint like a Zoom background can feel recognizably Deck without every choice looking the same.</p><p>That balance of consistency and flexibility also shapes how I design products.</p><a className="text-action" href="/work/deck-modernization">Read the Deck product case <ArrowRight size={17}/></a></Chapter>
 </div><Ending/></div>;}

