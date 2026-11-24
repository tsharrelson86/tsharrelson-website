import { useEffect, useId, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowCounterClockwise, Briefcase, CalendarBlank, CheckCircle, CreditCard, DeviceMobile, FileText, Fingerprint, List, Monitor, Question, ShieldCheck, SquaresFour, UserCircle, Users, X } from '@phosphor-icons/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LendescaStageTransition } from './LendescaStageTransition.jsx';
import { LendescaOwnership } from './LendescaOwnership.jsx';
import { LendescaResponsiveViewport } from './LendescaResponsiveViewport.jsx';
import './LendescaCase.css';
gsap.registerPlugin(ScrollTrigger);
const stages=['Funding','About your business','Personal Info','Credit Authorization','Additional Owners','Identity Verification','Eligibility','Tax Information'];
const stageIcons=[Briefcase,Briefcase,UserCircle,CreditCard,Users,Fingerprint,ShieldCheck,FileText];
function useMedia(query,beforeChange){const [matches,set]=useState(()=>matchMedia(query).matches);const before=useRef(beforeChange);before.current=beforeChange;useEffect(()=>{const m=matchMedia(query);const update=()=>{before.current?.(m.matches);set(m.matches);};m.addEventListener('change',update);update();return()=>m.removeEventListener('change',update);},[query]);return matches;}
function usePreviewViewport(){
 const [view,setView]=useState('desktop');const root=useRef(null);const mobileControl=useRef(null);
 const previousNarrow=useRef(matchMedia('(max-width: 680px)').matches);
 const narrow=useMedia('(max-width: 680px)',isNarrow=>{
  if(previousNarrow.current===isNarrow)return;
  const layoutChanged=(previousNarrow.current||view==='mobile')!==(isNarrow||view==='mobile');
  previousNarrow.current=isNarrow;
  const focused=document.activeElement;
  if(!root.current?.contains(focused))return;
  const desktopControl=isNarrow&&focused.dataset.viewport==='desktop';
  const removedControl=isNarrow?focused.matches('.ld-card-return'):view==='desktop'&&focused.closest('.phx-rail-chrome,.phx-return-form,.phx-back');
  const closingHelp=layoutChanged&&focused.closest('.phx-help-panel');
  if(desktopControl||removedControl||closingHelp)mobileControl.current?.focus({preventScroll:true});
 });
 const reduced=useMedia('(prefers-reduced-motion: reduce)')||new URLSearchParams(location.search).get('motion')==='reduce';
 return {root,mobileControl,narrow,reduced,mobile:narrow||view==='mobile',setView};
}
function PreviewViewControls({label,mobile,narrow,mobileControl,setView}){return <div className={'ld-view-controls'+(narrow?' is-narrow':'')} role="group" aria-label={label} data-view={mobile?'mobile':'desktop'}>
 <span className="ld-view-indicator" aria-hidden="true"/>
 {!narrow&&<button type="button" data-viewport="desktop" aria-pressed={!mobile} onClick={()=>setView('desktop')}><Monitor size={16} aria-hidden="true"/>Desktop</button>}
 <button ref={mobileControl} type="button" aria-pressed={mobile} onClick={()=>setView('mobile')}><DeviceMobile size={16} aria-hidden="true"/>Mobile</button>
</div>;}
function Replay({onClick}){return <button type="button" className="ld-replay" onClick={onClick}><ArrowCounterClockwise size={14}/>Replay</button>;}
function Caption({children}){return <figcaption className="ld-caption">{children}</figcaption>;}
function Copy({n,title,children}){return <div className="chapter-copy"><span>{n}</span><div><h2>{title}</h2>{children}</div></div>;}
function Chapter({id,n,title,children,visual,wide=false}){return <section id={id} className={'ld-chapter'+(wide?' ld-chapter--wide':'')}><Copy n={n} title={title}>{children}</Copy><div className="ld-visual">{visual}</div></section>;}
function useLendescaMotion(root){useEffect(()=>{
 if(new URLSearchParams(location.search).get('motion')==='reduce')return;
 const media=gsap.matchMedia();media.add('(prefers-reduced-motion: no-preference)',()=>{
  const cleanups=[];const ctx=gsap.context(()=>{
   gsap.from('.ld-hero > div > *',{y:24,opacity:0,duration:.75,stagger:.08,ease:'power3.out'});
   root.current.querySelectorAll('.ld-chapter').forEach(section=>{
    const copy=section.querySelector('.chapter-copy');const visual=section.querySelector('.ld-visual');
    const tl=gsap.timeline({scrollTrigger:{trigger:section,start:'top 88%',end:'top 35%',scrub:.6,invalidateOnRefresh:section.id==='handoff'}});
    tl.from(copy.querySelectorAll(':scope > span, h2, p'),{y:34,opacity:.15,stagger:.08,ease:'power2.out'},0);
    const handoffDesktop=visual.querySelector('.ld-handoff-desktop');
    if(handoffDesktop){
     tl.from(handoffDesktop,{y:32,scale:.98,opacity:.2,ease:'power2.out'},.08);
     tl.from(visual.querySelector('.ld-handoff-mobile'),{x:()=>matchMedia('(max-width: 680px)').matches?0:24,y:46,opacity:.15,ease:'power2.out'},.19);
     tl.from(visual.querySelector('.ld-handoff-details'),{y:20,opacity:.3,ease:'power2.out'},.3);
    }else tl.from(visual,{y:60,scale:.97,opacity:.25,ease:'power2.out'},.08);
    let pointerUsed=false;const freeze=()=>{tl.scrollTrigger?.getTween()?.pause();tl.scrollTrigger?.disable(false);tl.pause();};const pointer=()=>{pointerUsed=true;freeze();};const focus=()=>{freeze();if(!pointerUsed)tl.progress(1);};
    visual.addEventListener('pointerdown',pointer,{once:true});visual.addEventListener('focusin',focus,{once:true});cleanups.push(()=>{visual.removeEventListener('pointerdown',pointer);visual.removeEventListener('focusin',focus);});
   });
  },root);return()=>{cleanups.forEach(cleanup=>cleanup());ctx.revert();};
 });return()=>media.revert();
},[root]);}
function PhxNav({stage,mobile=false,onClose}){return <aside className={'phx-nav'+(mobile?' phx-nav--mobile':'')} role={mobile?"dialog":undefined} aria-modal={mobile?true:undefined} aria-label="Application progress"><div className="phx-logo-row"><span className="ld-demo-mark" aria-label="Demonstration application"/>{mobile&&<button onClick={onClose} aria-label="Return to form"><X size={22}/></button>}</div><ol>{stages.map((name,i)=>{const Icon=stageIcons[i];return <li key={name} className={i<stage?'is-complete':i===stage?'is-active':''} aria-current={i===stage?'step':undefined}>{i<stage?<CheckCircle weight="fill"/>:<Icon/>}<span>{name}</span><span className="sr-only">{i<stage?'Completed':i===stage?'Current stage':'Upcoming'}</span></li>;})}</ol><div className="phx-account"><UserCircle size={23}/><span>Demo account</span></div></aside>;}
function PhxMobileRail({stage,expanded,onToggle,toggleRef}){return <aside className="phx-mobile-rail" aria-label="Application progress"><div className="phx-rail-mark"><span className="ld-demo-mark" aria-label="Demonstration application"/></div><ol>{stages.map((name,i)=>{const Icon=stageIcons[i];return <li key={name} className={i<stage?'is-complete':i===stage?'is-active':''} aria-current={i===stage?'step':undefined} aria-label={name+', '+(i<stage?'completed':i===stage?'current stage':'upcoming')} title={name}>{i<stage?<CheckCircle weight="fill" aria-hidden="true"/>:<Icon aria-hidden="true"/>}<span aria-hidden="true">{name}</span></li>;})}</ol><div className="phx-rail-utilities"><button type="button" ref={toggleRef} onClick={onToggle} aria-label={expanded?'Hide application menu':'Show application menu'} aria-expanded={expanded}><span className="phx-rail-chevron"><ArrowRight size={13} aria-hidden="true"/></span><span>{expanded?'Hide':'Show stages'}</span></button><div className="phx-rail-utility" aria-label="Support"><Question size={19} aria-hidden="true"/><span>Support</span></div><div className="phx-rail-utility" aria-label="Demo account"><UserCircle size={21} aria-hidden="true"/><span>Demo account</span></div></div></aside>;}
function SampleField({label,value,focused=false}){return <label className="phx-field"><span>{label}</span><input readOnly tabIndex={-1} aria-label={label+' masked demonstration'} value={value} className={focused?'sample-focused':''}/></label>;}
function HelpCopy(){return <><small>Business TIN · Sample guidance</small><h3>How to find your<br/>business TIN.</h3><p>The original help explained which business records to check, right beside the question.</p><ul><li>Check the relevant business documents.</li><li>Keep the identifier handy for this section.</li><li>Close this guide to return to your form.</li></ul><p className="phx-help-boundary">Portfolio sample copy. Identifiers and lending instructions are omitted.</p></>;}
function PhxStagePanel({stage,onStage,helpEnabled,mobile,notes,help,trigger,helpId,onHelp}){const funding=stage===0;const personal=stage===2;return (
<div className="phx-content">
    <div className="phx-section-intro"><div><span className="phx-number">{String(stage+1).padStart(2,'0')}</span><h3 tabIndex={-1}>{stages[stage]}</h3><p>{personal?'A focused next section, with the rest of the journey still in view.':'One section at a time. Keep your place as the application moves forward.'}</p></div><span className="phx-support"><Question size={17}/> Contact support</span></div>
    <div className="phx-fields" role={mobile?undefined:'region'} aria-label={mobile?undefined:stages[stage]+' form fields'} tabIndex={mobile?undefined:0}>
     <div className="phx-fields-group"><h4>{funding?'Funding details':personal?'Contact details':'Financials'}</h4>
      {funding?<><p className="phx-question">Section 1 · Funding</p><SampleField label="Details masked for this portfolio" value="••••••••••"/><p className="phx-funding-note">Funding information is masked in this simplified portfolio preview.</p></>:personal?<><p className="phx-question">Your contact details</p><SampleField label="Full name" value="••••••••••"/><div className="phx-inline-fields"><SampleField label="City" value="••••••"/><SampleField label="State" value="••"/></div></>:<><p className="phx-question">What was your business average monthly revenue for the last 12 months?</p><SampleField label="Average monthly revenue" value="$ ••••••" focused={!help&&!mobile}/><p className="phx-question">What is your business TIN?</p><div className="phx-help-field"><SampleField label="Business TIN" value="••–•••••••"/>{helpEnabled&&<button ref={trigger} className="phx-help-trigger" type="button" aria-expanded={help} aria-controls={helpId} onClick={onHelp}>Help me find it</button>}</div><p className="phx-question">What is your business phone?</p><SampleField label="Business phone" value="(•••) •••–••••"/></>}
     </div>
     {!funding&&!personal&&!mobile&&<div className="phx-fields-group"><h4>Registration</h4><p className="phx-question">When was your business registered?</p><div className="phx-inline-fields"><SampleField label="Month" value="••••"/><SampleField label="Year" value="••••"/><SampleField label="State" value="••"/></div></div>}
     {(onStage||notes)&&<div className="phx-next-row">{mobile&&onStage&&<button className="phx-back" type="button" disabled={funding} onClick={()=>onStage(stage-1)}><ArrowLeft size={16}/>Back</button>}<button className="phx-next" type="button" disabled={!onStage||personal} onClick={()=>onStage?.(stage+1)} aria-label="Next section">Next<ArrowRight size={16}/></button></div>}
    </div>
   </div>
);}
function PhxScreen({stage=1,onStage,helpEnabled=false,mobile=false,notes=false,activeNote=0,progressPreview=false,panel}){
 const [help,setHelp]=useState(false);const [menu,setMenu]=useState(progressPreview);const trigger=useRef(null);const close=useRef(null);const menuTrigger=useRef(null);const screen=useRef(null);const returnHelpFocus=useRef(false);const returnMenuFocus=useRef(false);const id=useId();
 useEffect(()=>{setHelp(false);setMenu(progressPreview);},[mobile,stage,progressPreview]);
 useEffect(()=>{if(help)close.current?.focus({preventScroll:true});},[help]);
 useEffect(()=>{if(menu&&!progressPreview)menuTrigger.current?.focus({preventScroll:true});},[menu,progressPreview]);
 function closeMenu(){returnMenuFocus.current=true;setMenu(false);}
 useEffect(()=>{if(!menu&&returnMenuFocus.current){returnMenuFocus.current=false;menuTrigger.current?.focus({preventScroll:true});}},[menu]);
 function closeHelp(){returnHelpFocus.current=true;setHelp(false);}
 useEffect(()=>{if(!help&&returnHelpFocus.current){returnHelpFocus.current=false;trigger.current?.focus({preventScroll:true});}},[help]);
 return <div ref={screen} className={'phx-screen '+(mobile?'phx-phone':'phx-desktop')+(notes?' phx-spec':'')+(mobile&&menu?' is-progress-open':'')} onKeyDown={event=>{if(event.key==='Escape'){if(help)closeHelp();if(menu)closeMenu();}if(event.key==='Tab'&&mobile&&help){const panel=screen.current.querySelector('.phx-help-panel');const controls=[...panel.querySelectorAll('button:not(:disabled),a[href],[tabindex="0"]')];const first=controls[0],last=controls.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus();}}}}>
  {!mobile&&<PhxNav stage={stage}/>}
  {mobile&&<div className="phx-rail-chrome" inert={help?true:undefined}><PhxMobileRail stage={stage} expanded={menu} toggleRef={menuTrigger} onToggle={()=>menu?closeMenu():setMenu(true)}/></div>}
  {mobile&&menu&&<button className="phx-return-form" type="button" aria-label="Return to form" onClick={closeMenu}/>}
  <div className="phx-workspace" inert={menu||(mobile&&help)?true:undefined}>
   <LendescaStageTransition stage={stage} labels={stages.slice(0,panel?stage+1:3)} onStage={onStage}>{displayStage=>panel?(displayStage===stage?panel:<div className="phx-content"><div className="phx-section-intro"><div><span className="phx-number">{String(displayStage+1).padStart(2,'0')}</span><h3>{stages[displayStage]}</h3></div></div></div>):<PhxStagePanel stage={displayStage} onStage={onStage} helpEnabled={helpEnabled} mobile={mobile} notes={notes} help={help} trigger={trigger} helpId={id+'-help'} onHelp={()=>setHelp(true)}/>}</LendescaStageTransition>
  </div>
  {help&&<section id={id+'-help'} className="phx-help-panel" role="dialog" aria-modal={mobile?true:undefined} aria-label="Contextual help example"><button ref={close} className="phx-help-close" type="button" onClick={closeHelp} aria-label="Close contextual help"><X size={22}/></button><HelpCopy/></section>}
  {notes&&<div className="phx-hotspots" aria-hidden="true"><span className={activeNote===0?'active':''}>1</span><span className={activeNote===1?'active':''}>2</span><span className={activeNote===2?'active':''}>3</span></div>}
 </div>;
}
function Journey(){
 const [stage,setStage]=useState(1);const preview=usePreviewViewport();
 return <figure ref={preview.root} className="lending-journey-demo">
  <div className="ld-demo-toolbar">
   <PreviewViewControls {...preview} label="Journey demonstration viewport"/>
   <Replay onClick={()=>setStage(1)}/>
  </div>
  <LendescaResponsiveViewport mobile={preview.mobile} narrow={preview.narrow} reduced={preview.reduced}>{displayMobile=><PhxScreen stage={stage} onStage={setStage} mobile={displayMobile}/>}</LendescaResponsiveViewport>
  <div className="ld-under-controls"><span aria-live="polite">{String(stage+1).padStart(2,'0')+' → '+stages[stage]}</span><span>{preview.mobile?'Back reopens the previous section. Next moves forward.':'Select the exposed card edge to go back. Next moves forward.'}</span></div>
  <Caption>Three representative sections, reconstructed with masked details.</Caption>
 </figure>;
}
function MobileJourney(){const [stage,setStage]=useState(1);return <figure className="ld-mobile-journey"><div className="ld-mobile-pair"><div><p className="ld-phone-label">Focused section</p><PhxScreen stage={stage} onStage={setStage} mobile/></div><div className="ld-progress-companion"><p className="ld-phone-label">Expanded progress</p><PhxScreen stage={stage} onStage={setStage} mobile progressPreview/></div></div><div className="ld-under-controls"><span>Expand the rail to see stage names. Try Next and Back.</span><Replay onClick={()=>setStage(1)}/></div><Caption>Reconstructed mobile views with masked details. The progress rail expands beside the current section.</Caption></figure>;}
function ResponsiveHelp(){
 const [key,setKey]=useState(0);const preview=usePreviewViewport();
 return <figure ref={preview.root} className="lending-help-demo">
  <div className="ld-demo-toolbar"><PreviewViewControls {...preview} label="Help demonstration viewport"/><Replay onClick={()=>setKey(key+1)}/></div>
  <div className={'ld-responsive-help'+(preview.mobile?' is-mobile':'')}>
   <LendescaResponsiveViewport mobile={preview.mobile} narrow={preview.narrow} reduced={preview.reduced} desktopHeight={620}>{displayMobile=><PhxScreen key={key} helpEnabled mobile={displayMobile}/>}</LendescaResponsiveViewport>
   <div className="help-mobile-aside" aria-hidden={!preview.mobile}><span>Same question.<br/>Different space.</span><p>Help moves to the bottom of the screen. The progress rail keeps all eight stages within reach.</p></div>
  </div>
  <Caption>Select “Help me find it” to open the guidance. Reconstructed with generic sample copy.</Caption>
 </figure>;
}
function Ownership(){
 const preview=usePreviewViewport();
 return <LendescaOwnership preview={preview} viewControls={<PreviewViewControls {...preview} label="Ownership demonstration viewport"/>} ApplicationFrame={PhxScreen}/>;
}
const handoffDetails=[
 ['The stakes','Establish credibility in a demanding lending market.'],
 ['My leadership','Bring brand, applicant needs, and legal constraints into one direction.'],
 ['The foundation','A consistent application experience across desktop and mobile.'],
];
function Handoff(){
 return <figure className="handoff-demo ld-decision-demo">
  <div className="ld-handoff-composition" aria-hidden="true">
   <div className="ld-handoff-desktop" inert><PhxScreen/></div>
   <div className="ld-handoff-mobile" inert><PhxScreen mobile progressPreview/></div>
  </div>
  <div className="ld-handoff-details">
   <div className="ld-handoff-summary-header"><p>The contribution</p></div>
   <dl className="ld-handoff-summary">
    {handoffDetails.map(([title,copy])=><div key={title}><dt>{title}</dt><dd>{copy}</dd></div>)}
   </dl>
  </div>
  <figcaption className="sr-only">Reconstructed desktop application and expanded mobile progress rail with masked demonstration fields. The summary connects Lendesca’s business stakes, my design leadership, and the resulting responsive application foundation.</figcaption>
 </figure>;
}

export function LendescaContent(){const root=useRef(null);useLendescaMotion(root);
 useEffect(()=>{if(!location.hash)return;let cancelled=false;document.fonts.ready.then(()=>requestAnimationFrame(()=>{if(!cancelled){document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView({behavior:'instant'});ScrollTrigger.refresh();}}));return()=>{cancelled=true;};},[]);
 return <div ref={root} className={'lendesca-case'+(new URLSearchParams(location.search).get('motion')==='reduce'?' ld-motion-reduced':'')}>
 <section className="case-hero ld-hero"><div><p className="eyebrow">Case study · Lendesca</p><h1>Directing an eight-stage SBA lending experience.</h1><p className="hero-lede">Lendesca was building a bank-partnered lending business, and its application needed to earn applicants’ confidence. I led UX/UI direction for its eight-stage SBA loan application, guiding a designer and working with senior stakeholders to balance the company’s high design standards, applicant needs, and legal constraints.</p></div></section>
 <dl className="project-facts">{[[CalendarBlank,'Timeframe','August–September 2025'],[UserCircle,'My role','Director of User Experience Design'],[SquaresFour,'Scope','Eight stages · Responsive UX · Design handoff']].map(([Icon,label,value])=><div key={label}><Icon size={30} weight="thin"/><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
 <div className="ld-chapters">
 <Chapter id="journey" n="01" title="Build the experience around clear navigation." visual={<Journey/>}><p>Applicants had to provide business, financial, and personal information across eight stages. I directed a navigation model that became the foundation for the application: persistent progress beside a focused section card, with clear ways to move forward and return to earlier details.</p><p>A co-owner favored icon-only navigation. I advocated labels so applicants could recognize each section without remembering what its icon meant. That focus on orientation shaped the layout and interactions: on desktop, section headings stayed fixed while fields scrolled, and completed cards lifted to reveal the next section and reopened on return.</p></Chapter>
 <Chapter id="mobile" n="02" title="Keep the journey visible on mobile." visual={<MobileJourney/>}><p>That model had to work in far less space on a phone. The challenge was keeping applicants oriented through all eight stages while leaving enough room to read questions and enter information.</p><p>I guided the design around the same section cards and a narrow progress rail beside the form. Expanding the rail reveals stage names and shifts the form aside. Collapsing it returns that space to the current task, while the rail continues to distinguish completed, current, and upcoming stages.</p></Chapter>
 <Chapter id="guidance" n="03" title="Keep help attached to the question." wide visual={<ResponsiveHelp/>}><p>For a question about a business tax identifier, applicants may need to consult their records before they can answer. The design needed to offer guidance alongside the question.</p><p>I directed contextual help that opens beside the fields on desktop and in a bottom drawer on mobile. Applicants can read the guidance, close it, and return to the same field to continue.</p></Chapter>
 <Chapter id="ownership" n="04" title="Show which owner needs attention." wide visual={<Ownership/>}><p>An application could include several owners, each with their own details. If information was missing, the interface needed to identify whose details were incomplete and provide a direct route to the fields that needed attention.</p><p>I defined a direct path from the validation message to the owner’s details. I paired names with stable colors so each person stays recognizable as applicants move between views, make a correction, and return to the application.</p></Chapter>
 <Chapter id="handoff" n="05" title="Make the experience match the ambition." visual={<Handoff/>}><p>Across these decisions, I held the work to Lendesca’s high visual and UX standards. I led the designer through review and refinement, worked through brand application with senior stakeholders, and defended applicant needs within the loan process’s legal constraints.</p><p>That direction gave Lendesca a coherent application across desktop and mobile and a shared target for implementation. It was an early product foundation designed to earn applicants’ confidence and express the caliber of business the company was building.</p></Chapter>
 </div>
 <section className="ld-close ld-company-milestone" aria-labelledby="ld-company-milestone-title"><div><p className="eyebrow">What came next · <time dateTime="2026-08">August 2026</time></p><h2 id="ld-company-milestone-title">An expanding lending business.</h2><p>Lendesca expanded its team and network of bank and credit union relationships through its acquisition of SBA Collective.</p><a href="https://www.globenewswire.com/news-release/2026/08/25/3350500/0/en/lendesca-acquires-sba-collective-names-ray-drew-chief-revenue-officer.html" className="ld-milestone-source" target="_blank" rel="noopener noreferrer">Read the company announcement <ArrowRight size={15} aria-hidden="true"/></a></div></section>
 <section className="case-ending"><div><p className="eyebrow">Continue</p><h2>Making Deck Commerce’s mission recognizable at a glance</h2></div><div><a className="primary-action" href="/work/deck-brand-transformation">Next story <ArrowRight size={17}/></a><a className="text-action" href="/work">Back to selected work</a></div></section>
 </div>;
}
