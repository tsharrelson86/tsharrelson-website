import {useLayoutEffect, useEffect, useState} from 'react';

const clamp=value=>Math.max(0,Math.min(1,value));
const interval=(value,start,end)=>1-Math.pow(1-clamp((value-start)/(end-start)),3);
const preference=()=>new URLSearchParams(location.search).get('motion')==='reduce'||matchMedia('(prefers-reduced-motion: reduce)').matches;

// The Operational AI motion rhythm, adapted to this page's source compositions.
export function useFlagshipMotion(rootRef){
 const [reduced,setReduced]=useState(preference);
 useEffect(()=>{const media=matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setReduced(preference());media.addEventListener('change',update);return()=>media.removeEventListener('change',update);},[]);
 useLayoutEffect(()=>{
  const root=rootRef.current;
  if(!root||reduced||new URLSearchParams(location.search).has('still'))return;
  const chapters=[...root.querySelectorAll('.flagship-chapter')].map(element=>({element,id:element.id,current:0,target:0,rendered:null,near:false,pinned:false}));
  const dashboard=root.querySelector('.dashboard-figure');
  const brief=root.querySelector('.workflow-interlude-brief');
  let review={current:0,target:0,rendered:null,compact:null,near:false};
  let screen={current:0,target:0,rendered:null,compact:null,pinned:false};
  let frame=0,measureFrame=0,disposed=false;
  const set=(el,name,value)=>el.style.setProperty(`--${name}`,value);
  const float=(el,name,p,amount)=>{set(el,`${name}-p`,p.toFixed(4));set(el,`${name}-y`,`${((1-p)*amount).toFixed(2)}px`);};
  const image=(el,name,p,x,y,scale)=>{float(el,name,p,y);set(el,`${name}-x`,`${((1-p)*x).toFixed(2)}px`);set(el,`${name}-scale`,(scale+p*(1-scale)).toFixed(4));};
  const paint=()=>{
   if(disposed)return;
   let unsettled=false;
   const compact=innerWidth<=780;
   for(const chapter of chapters){
    chapter.current+=(chapter.target-chapter.current)*.18;
    if(Math.abs(chapter.target-chapter.current)<.001)chapter.current=chapter.target;else unsettled=true;
    if(chapter.rendered===chapter.current)continue;
    chapter.rendered=chapter.current;
    const {element:el,current:p,id}=chapter;
    float(el,'number',interval(p,0,.32),30);
    float(el,'heading',interval(p,.05,.48),44);
    float(el,'copy',interval(p,.15,.62),48);
    float(el,'copy-two',interval(p,.24,.73),48);
    if(id==='c01')image(el,'comparison',interval(p,.16,.9),compact?0:18,56,.95);
    if(id==='c02')image(el,'store',interval(p,.16,.9),0,64,.94);
    if(id==='c03'){
     float(el,'field',interval(p,.14,.7),30);
     image(el,'tokens',interval(p,.28,.82),compact?0:14,28,1);
     image(el,'spec',interval(p,.35,.96),0,44,.98);
    }
    if(id==='c05')float(el,'customer-quote',interval(p,.25,.92),44);
    if(id==='c04'){
     float(el,'suite-controls',interval(p,.14,.68),22);
     image(el,'suite',interval(p,.24,.94),0,56,.94);
    }
   }
   if(brief){
    review.current+=(review.target-review.current)*.18;
    if(Math.abs(review.target-review.current)<.001)review.current=review.target;else unsettled=true;
    if(review.rendered!==review.current||review.compact!==compact){
     review.rendered=review.current;review.compact=compact;
     const p=interval(review.current,0,1);
     set(brief,'brief-p',p.toFixed(4));
     set(brief,'brief-x',`${((1-p)*(compact?24:48)).toFixed(2)}px`);
    }
   }
   screen.current+=(screen.target-screen.current)*.18;
   if(Math.abs(screen.target-screen.current)<.001)screen.current=screen.target;else unsettled=true;
   if(screen.rendered!==screen.current||screen.compact!==compact){
    screen.rendered=screen.current;screen.compact=compact;
    image(dashboard,'dashboard',screen.current,0,compact?28:56,compact?.94:.84);
   }
   frame=unsettled?requestAnimationFrame(paint):0;
  };
  const update=()=>{
   for(const chapter of chapters){
    const bounds=chapter.element.getBoundingClientRect();
    const near=bounds.bottom>-innerHeight*.4&&bounds.top<innerHeight*1.4;
    if(near!==chapter.near){chapter.near=near;chapter.element.classList.toggle('motion-near',near);}
    chapter.target=chapter.pinned?1:clamp((innerHeight*.88-bounds.top)/(innerHeight*.7));
    if(bounds.bottom<-innerHeight*.25)chapter.current=chapter.target=1;
    else if(bounds.top>innerHeight*1.25&&!chapter.pinned)chapter.current=chapter.target=0;
   }
   if(brief){
    const bounds=brief.getBoundingClientRect();
    const near=bounds.bottom>-innerHeight*.4&&bounds.top<innerHeight*1.4;
    if(near!==review.near){review.near=near;brief.classList.toggle('motion-near',near);}
    // Trigger from the brief itself so the stacked mobile copy arrives in view.
    review.target=clamp((innerHeight*.88-bounds.top)/(innerHeight*.38));
    if(bounds.bottom<-innerHeight*.25)review.current=review.target=1;
    else if(bounds.top>innerHeight*1.25)review.current=review.target=0;
   }
   // Measure the layout box, not the transformed dashboard itself.
   const box=root.querySelector('#c05').getBoundingClientRect();
   const dashboardTop=box.top+dashboard.offsetTop;
   screen.target=screen.pinned?1:clamp((innerHeight*.88-dashboardTop)/(innerHeight*.52));
   if(box.bottom<-innerHeight*.25)screen.current=screen.target=1;
   else if(dashboardTop>innerHeight*1.25&&!screen.pinned)screen.current=screen.target=0;
   if(!frame)frame=requestAnimationFrame(paint);
  };
  const schedule=()=>{if(!measureFrame)measureFrame=requestAnimationFrame(()=>{measureFrame=0;update();});};
  const interact=event=>{
   const chapter=chapters.find(c=>c.element.contains(event.target));
   if(!chapter)return;
   // Settle before a control measures its geometry, especially the drag grip.
   chapter.pinned=true;chapter.current=chapter.target=1;
   if(chapter.id==='c05'){screen.pinned=true;screen.current=screen.target=1;}
   if(frame)cancelAnimationFrame(frame);frame=0;paint();
  };
  root.classList.add('flagship-motion-ready');
  addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);
  root.addEventListener('pointerdown',interact,true);root.addEventListener('focusin',interact,true);
  const observer=new ResizeObserver(schedule);observer.observe(root);
  update();
  Promise.all([...root.querySelectorAll('img')].map(img=>img.decode().catch(()=>{})).concat(document.fonts.ready)).then(()=>{if(!disposed)schedule();});
  return()=>{
   disposed=true;removeEventListener('scroll',schedule);removeEventListener('resize',schedule);
   root.removeEventListener('pointerdown',interact,true);root.removeEventListener('focusin',interact,true);observer.disconnect();
   if(frame)cancelAnimationFrame(frame);if(measureFrame)cancelAnimationFrame(measureFrame);
   root.classList.remove('flagship-motion-ready');chapters.forEach(c=>c.element.classList.remove('motion-near'));
   brief?.classList.remove('motion-near');
  };
 },[rootRef,reduced]);
 return reduced;
}
