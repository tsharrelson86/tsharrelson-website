import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from '@phosphor-icons/react';
import './homeFeature.css';
const orders='/assets/flagship/home-orders.png';
const folder='/assets/flagship/home-folder.png';
const aged='/assets/flagship/home-aged-orders.png';
gsap.registerPlugin(ScrollTrigger);
export function HomeFeature({summary,signals,inspectionControl}={}){
  const ref=useRef(null);
  useLayoutEffect(()=>{
    if(matchMedia('(prefers-reduced-motion: reduce)').matches || new URLSearchParams(location.search).get('motion')==='reduce')return;
    const ctx=gsap.context(()=>{
      const small=matchMedia('(max-width: 780px)').matches;
      // Give each component its own restrained entrance, then settle into the still composition.
      const entrances=[
        {selector:'.feature-layer-aged',from:{x:small?20:56,y:small?-4:-12,scale:1,rotation:0},start:92,end:66,ease:'power2.out'},
        {selector:'.feature-layer-folder',from:{x:0,y:small?30:72,scale:1,rotation:0},start:84,end:53,ease:'power3.out'},
        {selector:'.feature-layer-orders',from:{x:small?-5:-14,y:small?12:26,scale:small?.94:.88,rotation:small?-1.5:-3},start:76,end:42,ease:'power2.out'},
      ];
      entrances.forEach(({selector,from,start,end,ease})=>{
        gsap.fromTo(ref.current.querySelector(selector),{...from,opacity:0},
          {x:0,y:0,scale:1,rotation:0,opacity:1,ease,scrollTrigger:{trigger:ref.current.querySelector('.feature-layer-stage'),start:`top ${start}%`,end:`top ${end}%`,scrub:.5}});
      });
    },ref);
    return()=>ctx.revert();
  },[]);
  const graphic = <figure className="feature-layer-stage" aria-label="Three components from the composable OrderCenter dashboard">
    <div className="feature-layer feature-layer-aged"><img src={aged} alt="Aged Open Orders widget with color-coded daily queues" width="1136" height="650"/></div>
    <div className="feature-layer feature-layer-folder"><img src={folder} alt="Configurable Folder widget showing Action Needed queues" width="1088" height="686"/></div>
    <div className="feature-layer feature-layer-orders"><img src={orders} alt="Orders metric from Operational Snapshot, comparing the current and previous 90 days" width="726" height="440"/></div>
  </figure>;
  return <section id="flagship-feature" ref={ref} className="feature-case layered-feature">
    <div className="layered-feature-copy">
      <div className="feature-heading reveal">
        <p className="eyebrow">Flagship product transformation</p>
        <h2>Modernizing Deck Commerce’s enterprise order management platform</h2>
        <p>{summary || 'I turned fragmented legacy UX into shared product foundations that teams could extend with confidence.'}</p>
      </div>
      <div className="feature-body">
        {signals || <dl className="feature-signals"><div><dt>7</dt><dd>Product areas</dd></div><div><dt>8</dt><dd>Workstreams</dd></div><div className="feature-outcome"><dt>Result</dt><dd>Shared navigation, reusable workflows, and less guided onboarding.</dd></div></dl>}
        <a className="primary-action" href="/work/deck-modernization">Read the case study <ArrowRight size={19}/></a>
      </div>
    </div>
    {inspectionControl ? <div className="b-inspectable-art b-flagship-art">{graphic}{inspectionControl}</div> : graphic}
  </section>;
}
