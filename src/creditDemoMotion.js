import {gsap} from 'gsap';

// One persistent interface, with state changes timed to the cursor's clicks.
// Positions are measured when each movement starts, so phone rows and desktop
// columns share the same sequence without hard-coded screen coordinates.
export function createCreditDemo({cursor,clickRing,point,onReset,onPrice,onPercent,onTax,onEditing,onHover,onProgress,onComplete}){
  const timeline=gsap.timeline({paused:true,onUpdate:()=>onProgress(timeline.progress()),onComplete});
  const position=target=>({x:()=>point(target).x,y:()=>point(target).y});
  function move(target,at,duration=.85){
    timeline.to(cursor,{...position(target),duration,ease:'power2.inOut',onStart:()=>onHover(null),onComplete:()=>onHover(target)},at);
  }
  function click(target,at,action){
    timeline.set(clickRing,{x:()=>point(target).x+2,y:()=>point(target).y+2,scale:.2,opacity:.6},at);
    timeline.to(clickRing,{scale:1.7,opacity:0,duration:.42,ease:'power2.out'},at);
    timeline.to(cursor,{scale:.86,duration:.09,ease:'power2.out'},at);
    timeline.to(cursor,{scale:1,duration:.16,ease:'power2.out'},at+.09);
    timeline.call(action,[],at+.08);
  }
  timeline.call(onReset,[],.01);
  timeline.set(cursor,{...position('entry'),scale:1,opacity:0},0);
  timeline.to(cursor,{opacity:1,duration:.3,ease:'power1.out'},.2);
  move('price',.65,.95);
  click('price',1.85,onPrice);
  move('percent',2.9,1.05);
  click('percent',4.12,()=>onEditing(true));
  timeline.call(()=>onPercent(''),[],4.65);
  timeline.call(()=>onPercent(2),[],4.9);
  timeline.call(()=>onPercent(20),[],5.15);
  timeline.call(()=>onEditing(false),[],5.85);
  move('tax',6.15,1.05);
  click('tax',7.4,()=>onTax(true));
  move('total',8.05,.9);
  move('tax',9.4,.9);
  click('tax',10.5,()=>onTax(false));
  move('total',11.15,.9);
  timeline.call(()=>onHover(null),[],12.35);
  timeline.to(cursor,{opacity:0,duration:.45,ease:'power1.out'},12.75);
  return timeline;
}

export function creditDemoPoint(container,target){
  const outer=container.getBoundingClientRect();
  const rect=target.getBoundingClientRect();
  const scaleX=container.offsetWidth/outer.width,scaleY=container.offsetHeight/outer.height;
  return {x:(rect.left-outer.left+rect.width*.68)*scaleX-2,y:(rect.top-outer.top+rect.height*.52)*scaleY-2};
}
