import {useEffect, useRef, useState} from 'react';
import {ArrowRight, ArrowCounterClockwise, CaretRight, CaretUpDown, CheckCircle, CreditCard, CurrencyDollar, Pause, Play, Users, Warning, X} from '@phosphor-icons/react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import './creditToolCase.css';
import {createCreditDemo,creditDemoPoint} from './creditDemoMotion.js';

gsap.registerPlugin(ScrollTrigger);
const A='/assets/credit-tool/';
const money=cents=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(cents/100);
const methods={visa:{label:'Visa ••4456',available:4947},gift:{label:'Gift card ••4134',available:1999}};
const items=[{id:'shoe',name:'Knit running shoe',sku:'SKU1333',price:4498,tax:449,image:'generic-shoe-thumb.png'},{id:'shipping',name:'Shipping charge',price:1500,tax:0},{id:'fee',name:'Restocking fee',price:499,tax:0}];
const initialSelection={shoe:{price:true,tax:false},shipping:{price:false,tax:false},fee:{price:false,tax:false}};
const emptySelection=()=>Object.fromEntries(items.map(i=>[i.id,{price:false,tax:false}]));
function creditLines(selected,percent){return items.map(item=>({...item,amount:Math.round(((selected[item.id].price?item.price:0)+(selected[item.id].tax?item.tax:0))*percent/100)})).filter(i=>i.amount>0);}
function goTo(id){const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches||new URLSearchParams(location.search).get('motion')==='reduce';document.getElementById(id)?.scrollIntoView({behavior:reduced?'instant':'smooth',block:'center'});}

function useMotion(root){useEffect(()=>{
 const mm=gsap.matchMedia();mm.add('(prefers-reduced-motion: no-preference)',()=>{
  if(new URLSearchParams(location.search).get('motion')==='reduce')return;
  const ctx=gsap.context(()=>{
   root.current.querySelectorAll('.credit-chapter').forEach(section=>{
    const copy=section.querySelector('.chapter-copy');const visual=section.querySelector('.credit-visual');
    const tl=gsap.timeline({scrollTrigger:{trigger:section,start:'top 87%',end:'top 36%',scrub:.65}});
    tl.from(copy.querySelectorAll(':scope > span, h2, p'),{y:38,opacity:.15,stagger:.1,ease:'power2.out'},0);
    if(visual)tl.from(visual,{y:60,scale:.97,opacity:.28,ease:'power2.out'},.08);
   });
   gsap.from('.source-dialog',{x:35,y:65,rotation:1.2,ease:'power2.out',scrollTrigger:{trigger:'.source-pair',start:'top 90%',end:'top 40%',scrub:.7}});
  },root);return()=>ctx.revert();
 });return()=>mm.revert();
},[root]);}

function Chapter({id,n,title,children,visual,wide=false}){return <section id={id} className={'credit-chapter'+(wide?' credit-chapter--wide':'')} aria-labelledby={id+'-heading'}><div className="chapter-copy"><span>{n}</span><div><h2 id={id+'-heading'}>{title}</h2>{children}</div></div><div className="credit-visual">{visual}</div></section>;}
function ProductImage({item}){return item.image?<img src={A+item.image} alt="" width="40" height="40"/>:<span className="credit-product-icon" aria-hidden="true"><CurrencyDollar size={20}/></span>;}
function SourcePair(){return <figure className="source-pair"><img className="source-workspace" src={A+'overview-sanitized.png'} width="1586" height="992" alt="Sanitized advanced-credit design showing individual items, shipping and restocking fees, payment methods, and a credit total"/><img className="source-dialog" src={A+'quick-dialog-user.png'} width="836" height="1394" alt="Timothy’s exported whole-order credit frame with an amount or percentage choice and a link to the advanced tool"/></figure>;}

function QuickCredit({onReview,onAdvanced}){
 const [open,setOpen]=useState(true),[type,setType]=useState('amount'),[amount,setAmount]=useState(''),[payment,setPayment]=useState('visa'),[reason,setReason]=useState(''),[classification,setClassification]=useState(''),[notify,setNotify]=useState(false);
 const value=Math.round(type==='percent'?6946*Number(amount)/100:Number(amount)*100);const cap=methods[payment].available;
 const valid=Number.isFinite(value)&&value>0&&value<=cap&&Boolean(classification)&&reason.trim().length>0&&(type!=='percent'||Number(amount)<=100);
 const reopen=useRef(null);
 function dismiss(){setOpen(false);setType('amount');setAmount('');setPayment('visa');setReason('');setClassification('');setNotify(false);requestAnimationFrame(()=>reopen.current?.focus({preventScroll:true}));}
 return <div className={'quick-demo'+(open?'':' quick-demo--closed')}>{open?<div className="quick-specimen dds-ui"><header><h3>Credit Whole Order</h3><button type="button" className="quick-close" aria-label="Close credit tool" onClick={dismiss}><X size={16} weight="bold"/></button><p>Total Credit Available: {money(6946)}</p><button className="dds-link" onClick={onAdvanced}>Advanced Credit Tool <CaretRight size={16}/></button></header><form onSubmit={e=>{e.preventDefault();if(valid)onReview({source:'quick',payment,total:value,lines:[{id:'whole',name:'Whole-order credit',amount:value}],reason,classification});}}>
 <label>Apply credit to<span className="dds-select"><select value={payment} onChange={e=>setPayment(e.target.value)}><option value="visa">Original payment method (Visa ••4456)</option><option value="gift">Gift card ••4134</option></select><CaretUpDown size={18} weight="bold" aria-hidden="true"/></span><small>Payment method credit available: {money(cap)}</small></label>
 <div className="quick-amount"><fieldset><legend>Credit Type</legend><label><input type="radio" name="credit-type" checked={type==='amount'} onChange={()=>setType('amount')}/>Amount ($)</label><label><input type="radio" name="credit-type" checked={type==='percent'} onChange={()=>setType('percent')}/>Percentage (%)</label></fieldset><label>{type==='amount'?'Credit Amount':'Percentage'}<div className="dds-number"><span>{type==='amount'?'$':'%'}</span><input aria-label="Whole-order credit amount" type="number" required min={type==='amount'?0.01:1} max={type==='amount'?cap/100:100} step={type==='amount'?'.01':'1'} value={amount} onChange={e=>setAmount(e.target.value)}/></div></label></div>
 <label>Adjustment Classification<span className="dds-select"><select className={classification?'':'is-placeholder'} required value={classification} onChange={e=>setClassification(e.target.value)}><option value="">Select one...</option><option>Customer care appeasement</option><option>Marketing promotion</option><option>Manufacturer defect</option></select><CaretUpDown size={18} weight="bold" aria-hidden="true"/></span></label>
 <label>Reason<textarea value={reason} placeholder="Enter any comments here..." required onChange={e=>setReason(e.target.value)} maxLength="500" rows="5"/><small className="counter">{reason.length}/500</small></label><label className="dds-check"><input type="checkbox" checked={notify} onChange={e=>setNotify(e.target.checked)}/>Notify customer by email</label>
 {value>cap&&<p className="dds-error" role="status">Credit exceeds the amount available on this payment method.</p>}
 <footer><button type="button" className="dds-back" onClick={dismiss}>Cancel</button><button className="dds-primary">Submit</button></footer></form></div>:<div className="dds-ui"><button ref={reopen} className="dds-link" onClick={()=>{setOpen(true);requestAnimationFrame(()=>document.querySelector('.quick-close')?.focus({preventScroll:true}));}}>Open credit tool <ArrowCounterClockwise size={15}/></button></div>}</div>;
}

function AnimatedCreditAmount({cents,reduced}){
 const node=useRef(null),value=useRef({cents}),initial=useRef(money(cents));
 useEffect(()=>{
  if(reduced){value.current.cents=cents;node.current.textContent=money(cents);return;}
  const tween=gsap.to(value.current,{cents,duration:.38,ease:'power2.out',onUpdate:()=>{if(node.current)node.current.textContent=money(Math.round(value.current.cents));}});
  return()=>tween.kill();
 },[cents,reduced]);
 return <><span ref={node} aria-hidden="true">{initial.current}</span><span className="sr-only">{money(cents)}</span></>;
}
function AmountButton({item,kind,selected,onToggle}){const amount=item[kind];return <button type="button" data-credit-target={item.id+'-'+kind} className={'amount-cell'+(selected?' included':'')} aria-pressed={selected} aria-label={`${selected?'Remove':'Include'} ${item.name} ${kind}`} disabled={amount===0} onClick={onToggle}>{selected&&<CheckCircle size={15}/>}<span>{money(amount)}</span></button>;}
function AdvancedCredit({selected,setSelected,percent,setPercent,payment,setPayment,onReview,reduced}){
 const stage=useRef(null),card=useRef(null),cursor=useRef(null),clickRing=useRef(null),playButton=useRef(null),tour=useRef(null),started=useRef(false),interrupted=useRef(false),complete=useRef(false);
 const [near,setNear]=useState(false),[playing,setPlaying]=useState(false),[notify,setNotify]=useState(false);
 const lines=creditLines(selected,percent),total=lines.reduce((s,i)=>s+i.amount,0),available=methods[payment].available;
 function clearCues(){card.current?.querySelectorAll('.demo-hover,.demo-editing').forEach(node=>node.classList.remove('demo-hover','demo-editing'));}
 function stop(){
  started.current=true;interrupted.current=true;tour.current?.pause();setPlaying(false);clearCues();
  if(cursor.current)gsap.set(cursor.current,{opacity:0});
  if(clickRing.current)gsap.set(clickRing.current,{opacity:0});
 }
 useEffect(()=>{
  if(reduced){setPlaying(false);clearCues();return;}
  const targets={price:'[data-credit-target="shoe-price"]',tax:'[data-credit-target="shoe-tax"]',percent:'.credit-percent-field',total:'.credit-total output'};
  const target=name=>card.current.querySelector(targets[name]);
  const timeline=createCreditDemo({cursor:cursor.current,clickRing:clickRing.current,
   point:name=>{if(name==='entry'){const p=creditDemoPoint(card.current,target('price'));return {x:Math.min(card.current.offsetWidth-36,p.x+90),y:Math.max(35,p.y-55)};}return creditDemoPoint(card.current,target(name));},
   onReset:()=>{complete.current=false;interrupted.current=false;clearCues();setSelected(emptySelection());setPercent(100);setPayment('visa');},
   onPrice:()=>setSelected({...emptySelection(),shoe:{price:true,tax:false}}),
   onPercent:setPercent,onTax:include=>setSelected({...emptySelection(),shoe:{price:true,tax:include}}),
   onEditing:value=>target('percent').classList.toggle('demo-editing',value),
   onHover:name=>{card.current.querySelectorAll('.demo-hover').forEach(node=>node.classList.remove('demo-hover'));if(name&&name!=='total')target(name).classList.add('demo-hover');},
   onProgress:progress=>playButton.current?.style.setProperty('--progress',`${progress*100}%`),
   onComplete:()=>{complete.current=true;clearCues();setPlaying(false);}
  });
  tour.current=timeline;
  let previousWidth=card.current.offsetWidth;
  const resize=new ResizeObserver(()=>{const width=card.current.offsetWidth;if(width!==previousWidth){previousWidth=width;stop();}});
  resize.observe(card.current);
  return()=>{resize.disconnect();timeline.kill();tour.current=null;clearCues();};
 },[reduced,setSelected,setPercent,setPayment]);
 useEffect(()=>{
  // Observe the actual controls rather than the whole figure, which can be
  // taller than a phone viewport. This also starts the tour on narrow screens.
  const visible=new Map();
  const io=new IntersectionObserver(entries=>{entries.forEach(entry=>visible.set(entry.target,entry.isIntersecting&&entry.intersectionRatio>=.35));setNear([...visible.values()].some(Boolean));},{threshold:.35});
  io.observe(card.current.querySelector('.credit-table-scroll'));
  io.observe(card.current.querySelector('.table-actions'));
  return()=>io.disconnect();
 },[]);
 useEffect(()=>{if(near&&!started.current&&!reduced&&tour.current){started.current=true;setPlaying(true);}},[near,reduced]);
 useEffect(()=>{if(playing&&near&&!reduced)tour.current?.play();else tour.current?.pause();},[playing,near,reduced]);
 useEffect(()=>{const change=()=>{if(document.hidden){tour.current?.pause();setPlaying(false);}};document.addEventListener('visibilitychange',change);return()=>document.removeEventListener('visibilitychange',change);},[]);
 function replay(){
  started.current=true;interrupted.current=false;complete.current=false;clearCues();
  if(reduced){setSelected(initialSelection);setPercent(20);setPayment('visa');setPlaying(false);return;}
  tour.current?.invalidate().restart();if(!near)tour.current?.pause();setPlaying(true);
 }
 function toggle(id,kind){stop();setSelected(old=>({...old,[id]:{...old[id],[kind]:!old[id][kind]}}));}
 function toggleRow(item){stop();setSelected(old=>{const include=!(old[item.id].price&&(old[item.id].tax||item.tax===0));return {...old,[item.id]:{price:include,tax:include&&item.tax>0}};});}
 return <figure className="advanced-figure" ref={stage}><div className="credit-stage-toolbar"><span>Try a credit. Select a price, tax, or fee.</span><div className="film-controls">{!reduced&&<button ref={playButton} className="film-play" aria-label={playing?'Pause credit demonstration':'Play credit demonstration'} onClick={()=>{if(complete.current||interrupted.current||!started.current)replay();else setPlaying(!playing);}}>{playing?<Pause size={13} weight="fill"/>:<Play size={13} weight="fill"/>}</button>}<button onClick={replay} className="film-replay"><ArrowCounterClockwise size={14}/>Replay</button></div></div>
 <div ref={card} className="advanced-specimen dds-ui" onPointerDownCapture={stop} onKeyDownCapture={stop} onFocusCapture={stop}><header><h3>Advanced Credit Tool</h3><span className="dds-sample">Sample order #1212</span></header>
 <div className="credit-payment"><span>Apply Credit To:</span><div>{Object.entries(methods).map(([id,m])=><label key={id} className={payment===id?'selected':''}><input type="radio" name="advanced-payment" checked={payment===id} onChange={()=>{stop();setPayment(id);}}/>{m.label}<small>{money(m.available)} available</small></label>)}</div><small>Only one form of payment can receive credit at a time.</small></div>
 <div className="table-actions"><label>Apply % to selected items:<span className="credit-percent-field"><input aria-label="Percentage applied to selected items" type="number" min="0" max="100" value={percent} onChange={e=>{stop();setPercent(Math.max(0,Math.min(100,Number(e.target.value))));}}/><span className="credit-demo-caret" aria-hidden="true"/></span><span>%</span></label><button onClick={()=>{stop();setSelected(emptySelection());setPercent(100);}}><ArrowCounterClockwise size={14}/>Reset</button></div>
 <div className="credit-table-scroll" tabIndex="0" role="region" aria-label="Scrollable credit items table"><table><thead><tr><th><span className="sr-only">Include row</span></th><th>Item</th><th>Available<br/>Item Price</th><th>Available<br/>Item Tax</th><th>Available<br/>Item Total</th><th>Credit Amount</th></tr></thead><tbody>{items.map(item=><tr key={item.id}><td><input aria-label={'Include all amounts for '+item.name} type="checkbox" checked={selected[item.id].price&&(selected[item.id].tax||item.tax===0)} onChange={()=>toggleRow(item)}/></td><td><div className="credit-item"><ProductImage item={item}/><div><span>{item.name}</span>{item.sku&&<small>{item.sku}</small>}</div></div></td><td><AmountButton item={item} kind="price" selected={selected[item.id].price} onToggle={()=>toggle(item.id,'price')}/></td><td><AmountButton item={item} kind="tax" selected={selected[item.id].tax} onToggle={()=>toggle(item.id,'tax')}/></td><td>{money(item.price+item.tax)}</td><td className="row-credit"><AnimatedCreditAmount cents={lines.find(i=>i.id===item.id)?.amount||0} reduced={reduced}/></td></tr>)}</tbody></table></div>
 <div className="credit-total"><span>Credit applied to: <strong>{methods[payment].label}</strong></span><div><strong>Total Credit Amount:</strong><output aria-live="polite" aria-label="Total advanced credit amount"><AnimatedCreditAmount cents={total} reduced={reduced}/></output></div></div>
 <div className="advanced-footer"><label className="dds-check"><input type="checkbox" checked={notify} onChange={e=>{stop();setNotify(e.target.checked);}}/>Notify customer by email</label><button className="dds-primary" disabled={total===0||total>available} onClick={()=>{stop();onReview({source:'advanced',payment,total,lines,reason:'Customer care appeasement'});}}>Submit</button></div>
 {total>available&&<p className="dds-error" role="status">The selected credit exceeds {money(available)} available on {methods[payment].label}. Adjust the amounts or choose another payment method.</p>}
 {!reduced&&<><span ref={clickRing} className="credit-demo-click" aria-hidden="true"/><span ref={cursor} className="credit-demo-cursor" aria-hidden="true"><svg viewBox="0 0 24 30"><path d="M2 2v22l6-6 5 10 4-2-5-10h9Z" fill="#141413" stroke="white" strokeWidth="2" strokeLinejoin="round"/></svg></span></>}
 </div><figcaption>Interactive reconstruction with fictional sample values. Price and tax can be selected independently.</figcaption></figure>;
}

function CreditConfirmation({review,onBack}){
 const [confirmed,setConfirmed]=useState(false);
 useEffect(()=>setConfirmed(false),[review.total,review.payment,review.source]);
 useEffect(()=>{if(confirmed)document.getElementById('credit-confirmation-title')?.focus({preventScroll:true});},[confirmed]);
 return <div className={'confirmation-specimen dds-ui'+(confirmed?' confirmed':'')}><header>{confirmed?<CheckCircle size={20}/>:<Warning size={20}/>}<h3 id="credit-confirmation-title" tabIndex="-1">{confirmed?'Demonstration complete':'Customer Appeasement Credit'}</h3></header>{confirmed?<div className="confirmed-body"><CheckCircle size={50} weight="thin"/><h4>{money(review.total)} reviewed and confirmed.</h4><p>This completes the sample workflow. No payment was processed.</p><button className="dds-link" onClick={()=>setConfirmed(false)}>Review the credit again <ArrowCounterClockwise size={15}/></button></div>:<><div className="confirmation-body"><p>Review the credit details before proceeding. You can return to modify the credit before confirming.</p><div className="confirmation-lines">{review.lines.length?review.lines.map(item=><div key={item.id}><span>{item.image&&<ProductImage item={item}/>}<span>{item.name}</span></span><strong>{money(item.amount)}</strong></div>):<p>Select an amount in the advanced tool to prepare a credit.</p>}</div><div className="confirmation-summary"><span>Credit applied to:<strong>{methods[review.payment].label}</strong></span><span>Total Credit Amount:<strong>{money(review.total)}</strong></span></div></div><footer><button className="dds-back" onClick={onBack}>No, go back and modify the credit</button><button className="dds-primary" disabled={!review.total||review.total>methods[review.payment].available} onClick={()=>setConfirmed(true)}>Yes, issue the credit now</button></footer></>}</div>;
}

export function CreditToolCase({Shell,pathname='/work/customer-credits'}){
 const root=useRef(null);useMotion(root);const [selected,setSelectedState]=useState(initialSelection),[percent,setPercentState]=useState(20),[payment,setPaymentState]=useState('visa'),[snapshot,setSnapshot]=useState(null);
 const [reduced,setReduced]=useState(()=>matchMedia('(prefers-reduced-motion: reduce)').matches||new URLSearchParams(location.search).get('motion')==='reduce');
 useEffect(()=>{let active=true;const jump=()=>{if(active&&location.hash)document.getElementById(location.hash.slice(1))?.scrollIntoView({behavior:'instant',block:'start'});};Promise.all([document.fonts.ready,...Array.from(document.images,img=>img.decode().catch(()=>{}))]).then(jump);window.addEventListener('hashchange',jump);return()=>{active=false;window.removeEventListener('hashchange',jump);};},[]);
 useEffect(()=>{const m=matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setReduced(m.matches||new URLSearchParams(location.search).get('motion')==='reduce');m.addEventListener('change',update);return()=>m.removeEventListener('change',update);},[]);
 // Stable callbacks keep playback effects independent of manual state updates.
 const clearSnapshot=()=>setSnapshot(null);
 const selectedSetter=useRef(value=>{setSelectedState(value);setSnapshot(null);}).current;
 const percentSetter=useRef(value=>{setPercentState(value);setSnapshot(null);}).current;
 const paymentSetter=useRef(value=>{setPaymentState(value);setSnapshot(null);}).current;
 const lines=creditLines(selected,percent);const review=snapshot||{source:'advanced',payment,lines,total:lines.reduce((sum,i)=>sum+i.amount,0)};
 function submit(value){setSnapshot(value);goTo('review');requestAnimationFrame(()=>document.getElementById('credit-confirmation-title')?.focus({preventScroll:true}));}
 return <Shell pathname={pathname} wide><main ref={root} className={'credit-case'+(reduced?' motion-reduced':'')} id="main-content"><section className="case-hero credit-hero"><div><p className="eyebrow">Case study · Deck Commerce</p><h1>Precise credits.<br/>A simpler everyday task.</h1><p className="hero-lede">Giving customer service teams granular control without complicating the everyday credit.</p></div></section>
 <dl className="project-facts"><div><CreditCard size={28} weight="thin"/><dt>My role</dt><dd>Interaction design · UX/UI</dd></div><div><Users size={28} weight="thin"/><dt>Collaboration</dt><dd>Product · Engineering</dd></div><div><CheckCircle size={28} weight="thin"/><dt>Result</dt><dd>Built · Positive customer feedback</dd></div></dl>
 <div className="credit-chapters"><Chapter id="together" n="01" title="Establish the possibilities together." visual={<SourcePair/>}><p>Customer service teams needed more control over customer credits. Sometimes a simple goodwill amount was enough. Other situations called for crediting particular items, taxes, shipping, or a restocking fee.</p><p>Product brought the customer requests, and I worked with them to define the use cases. Engineering was refactoring the underlying payment logic, so I asked about technical constraints before developing the interactions. The planned refactor would provide the data and capabilities the design needed.</p><p>My responsibility was to translate those requirements and capabilities into a clear interface and workflow. I designed within Deck’s shared design system and worked with front-end engineering on the new table interactions.</p></Chapter>
 <Chapter id="simple" n="02" title="Start simple. Reveal precision when needed." visual={<><QuickCredit onReview={submit} onAdvanced={()=>goTo('precise')}/><p className="credit-caption">Try an amount or percentage, or open the advanced tool.</p></>}><p>My challenge was to support those specific requests while keeping the everyday workflow straightforward.</p><p>I kept the default experience focused on a whole-order credit: choose an amount or percentage, select the payment method, and provide the adjustment details. Users could open the advanced tool from within that workflow when they needed more control.</p></Chapter>
 <Chapter id="precise" n="03" title="Make each choice visible." wide visual={<AdvancedCredit selected={selected} setSelected={selectedSetter} percent={percent} setPercent={percentSetter} payment={payment} setPayment={paymentSetter} onReview={submit} reduced={reduced}/>}><p>The advanced table let them select individual items and charges, apply a percentage to selected items, and choose the payment method receiving the credit.</p><p>Their choices and the resulting total remained visible together.</p></Chapter>
 <Chapter id="review" n="04" title="Review before committing." visual={<><CreditConfirmation review={review} onBack={()=>{clearSnapshot();goTo(review.source==='quick'?'simple':'precise');}}/><p className="credit-caption">The review carries the amounts and payment method from your example above.</p></>}><p>Submitting opened a confirmation that repeated the selected items, payment method, and total. Users could return to modify the credit or explicitly confirm it.</p><p>That review step gave them a chance to check the financial effect of their choices before committing.</p></Chapter>
 <Chapter id="outcome" n="05" title="What happened." visual={<div className="credit-feedback"><span className="eyebrow">Customer response</span><p>More flexibility to handle the credits customers needed.</p><span className="feedback-attribution">Qualitative feedback relayed by Deck’s customer service representatives.</span></div>}><p>The tool was built. Deck’s customer service representatives relayed strongly positive customer feedback: the added control addressed what customers had requested and gave them more flexibility in handling credits.</p><p>Product and I defined the use cases, engineering delivered the underlying capabilities and production implementation, and I owned the interaction design and UX/UI. The result reflects that shared work.</p></Chapter></div>
 <section className="case-ending"><div><p className="eyebrow">Continue</p><h2>The system behind the workflow.</h2></div><div><a className="primary-action" href="/work/deck-modernization">Read the Deck product case <ArrowRight size={18}/></a><a className="quiet-action" href="/work/user-center-permissions">Explore User Center roles and access</a><a className="quiet-action" href="/work">Back to selected work</a></div></section></main></Shell>;
}
