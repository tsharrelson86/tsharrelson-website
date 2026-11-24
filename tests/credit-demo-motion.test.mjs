import assert from 'node:assert/strict';
import test from 'node:test';
import {createCreditDemo,creditDemoPoint} from '../src/creditDemoMotion.js';

function example(){
  const cursor={x:0,y:0,opacity:0,scale:1},clickRing={x:0,y:0,opacity:0,scale:0};
  const points={entry:{x:100,y:50},price:{x:200,y:100},percent:{x:80,y:20},tax:{x:300,y:100},total:{x:350,y:200}};
  const state={price:false,tax:false,percent:100,editing:false,progress:0,complete:false};
  const clicks=[],totals=[];
  const total=()=>Math.round(((state.price?4498:0)+(state.tax?449:0))*Number(state.percent)/100);
  function click(name){assert.equal(cursor.x,points[name].x);assert.equal(cursor.y,points[name].y);clicks.push(name);}
  const timeline=createCreditDemo({cursor,clickRing,point:name=>points[name],
    onReset:()=>{state.price=false;state.tax=false;state.percent=100;state.complete=false;},
    onPrice:()=>{click('price');state.price=true;totals.push(total());},
    onPercent:value=>{state.percent=value;totals.push(total());},
    onTax:value=>{click('tax');state.tax=value;totals.push(total());},
    onEditing:value=>{state.editing=value;if(value)click('percent');},onHover:()=>{},
    onProgress:value=>{state.progress=value;},onComplete:()=>{state.complete=true;}
  });
  return {timeline,cursor,clickRing,points,state,clicks,totals};
}

test('cursor moves continuously and changes financial state only after arriving at controls',()=>{
  const e=example();
  try{
    e.timeline.totalTime(1,false);
    assert.ok(e.cursor.x>e.points.entry.x&&e.cursor.x<e.points.price.x);
    assert.equal(e.state.price,false);
    e.timeline.totalTime(1.94,false);
    assert.equal(e.state.price,true);
    e.timeline.totalTime(4.22,false);
    assert.equal(e.state.editing,true);
    e.timeline.totalTime(5.2,false);
    assert.equal(e.state.percent,20);
    e.timeline.totalTime(7.5,false);
    assert.equal(e.state.tax,true);
    e.timeline.totalTime(10.6,false);
    assert.equal(e.state.tax,false);
    e.timeline.totalTime(13.3,false);
    assert.deepEqual(e.clicks,['price','percent','tax','tax']);
    assert.deepEqual(e.totals,[4498,0,90,900,989,900]);
    assert.equal(e.state.editing,false);
    assert.equal(e.state.complete,true);
    assert.equal(e.state.progress,1);
    assert.equal(e.cursor.opacity,0);
    assert.equal(e.clickRing.opacity,0);
  }finally{e.timeline.kill();}
});

test('pause preserves the cursor and actions; replay starts the same demo from the beginning',async()=>{
  const e=example();
  try{
    e.timeline.totalTime(4.4,false).pause();
    const position={x:e.cursor.x,y:e.cursor.y,time:e.timeline.time(),percent:e.state.percent};
    await new Promise(resolve=>setTimeout(resolve,70));
    assert.deepEqual({x:e.cursor.x,y:e.cursor.y,time:e.timeline.time(),percent:e.state.percent},position);
    e.timeline.totalTime(13.3,false);
    e.timeline.invalidate().restart().pause();
    e.timeline.totalTime(.02,false);
    assert.equal(e.state.price,false);
    assert.equal(e.state.percent,100);
    assert.equal(e.state.complete,false);
    e.timeline.totalTime(1.94,false);
    assert.equal(e.state.price,true);
  }finally{e.timeline.kill();}
});

test('cursor destinations are remeasured for a resized layout and compensate for editorial scale',()=>{
  const e=example();
  try{
    e.timeline.totalTime(2.5,false);
    e.points.percent={x:55,y:300};
    e.timeline.totalTime(4.22,false);
    assert.equal(e.cursor.x,55);
    assert.equal(e.cursor.y,300);
  }finally{e.timeline.kill();}
  const container={offsetWidth:1000,offsetHeight:600,getBoundingClientRect:()=>({left:100,top:50,width:500,height:300})};
  const target={getBoundingClientRect:()=>({left:200,top:150,width:50,height:20})};
  assert.deepEqual(creditDemoPoint(container,target),{x:266,y:218.8});
});
