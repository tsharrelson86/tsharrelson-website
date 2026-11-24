import { useEffect, useId, useRef, useState } from 'react';
import { ArrowCounterClockwise, ArrowLeft, ArrowRight, ArrowsDownUp, CheckCircle, Question, WarningCircle } from '@phosphor-icons/react';
import { LendescaResponsiveViewport } from './LendescaResponsiveViewport.jsx';
import './LendescaOwnership.css';
const owners = [
  {id:'a',label:'Owner A',share:50,color:'#a675e8'},
  {id:'b',label:'Owner B',share:30,color:'#edcf3c'},
  {id:'c',label:'Owner C',share:20,color:'#69b8a1'},
];
export function LendescaOwnership({preview,viewControls,ApplicationFrame}){
 const [reversed,setReversed]=useState(false);const [editing,setEditing]=useState(false);const [saved,setSaved]=useState(false);const [name,setName]=useState('');const [error,setError]=useState(false);const input=useRef(null);const locate=useRef(null);const status=useRef(null);const details=useRef(null);const returnFocus=useRef(false);const errorId=useId();
 useEffect(()=>{if(editing){details.current?.scrollTo({top:0});input.current?.focus({preventScroll:true});input.current?.scrollIntoView({block:'nearest',behavior:'instant'});}else if(returnFocus.current){returnFocus.current=false;const target=saved?status.current:locate.current;target?.focus({preventScroll:true});target?.scrollIntoView({block:'nearest',behavior:'instant'});}},[editing,saved]);
 const close=()=>{returnFocus.current=true;setEditing(false);};
 function save(event){event.preventDefault();if(!name.trim()){setError(true);input.current?.focus();return;}setSaved(true);setError(false);close();}
 function replay(){setSaved(false);setEditing(false);setName('');setError(false);setReversed(false);}
 function panel(mobile){return <div className="phx-content ld-owner-content">
    <div className="phx-section-intro ld-owner-overview"><div><span className="phx-number">05</span><h3>Additional Owners</h3><p>Review each owner and complete any missing information.</p>
     <div className="ld-owner-chart" role="img" aria-label="Fictional ownership example: Owner A 50 percent, Owner B 30 percent, Owner C 20 percent"><span>Ownership<small>100%</small></span></div>
     <ul className="ld-owner-key">{owners.map(owner=><li key={owner.id}><i style={{background:owner.color}} aria-hidden="true"/><span>{owner.label}</span><b>{owner.share}%</b></li>)}</ul>
    </div><span className="phx-support"><Question size={17} aria-hidden="true"/>Contact support</span></div>
    <div ref={details} className="phx-fields ld-owner-details" role={mobile?undefined:'region'} aria-label={mobile?undefined:'Additional owners form fields'} tabIndex={mobile?undefined:0}>
     {editing?<form onSubmit={save} noValidate onKeyDown={event=>{if(event.key==='Escape'){event.preventDefault();close();}}}>
      <button className="ld-owner-back" type="button" onClick={close}><ArrowLeft size={16}/>All owners</button>
      <h4>Owner B information</h4><p className="ld-owner-instruction">Add the missing name to complete this demonstration.</p>
      <label className="ld-owner-field">Owner name<input ref={input} value={name} onChange={event=>{setName(event.target.value);setError(false);}} placeholder="Owner B" aria-invalid={error} aria-describedby={error?errorId:undefined}/></label>
      {error&&<p className="ld-owner-error" id={errorId} role="alert">Enter a name before saving.</p>}
      <button className="ld-owner-save" type="submit">Save owner <ArrowRight size={16}/></button>
     </form>:<>
      <div ref={status} tabIndex={-1} className={'ld-owner-status '+(saved?'is-complete':'')} role="status">{saved?<CheckCircle size={22}/>:<WarningCircle size={22}/>}<div><strong>{saved?'Owner information complete':'One owner needs attention'}</strong><p>{saved?'The corrected owner returns to the same place in the journey.':'Go directly to the owner with missing information.'}</p></div></div>
      <div className="ld-owner-list-heading"><h4>Owners</h4><button type="button" onClick={()=>setReversed(!reversed)} aria-label="Reverse owner order"><ArrowsDownUp size={16}/>Reorder</button></div>
      <ul className="ld-owner-list">{(reversed?[...owners].reverse():owners).map(owner=><li key={owner.id}><span className="ld-owner-initial" style={{'--owner-color':owner.color}}>{owner.id.toUpperCase()}</span><div><b>{owner.label}</b><span>{owner.id==='b'&&!saved?'Missing information':'Information complete'}</span></div>{owner.id==='b'&&!saved?<button ref={locate} type="button" onClick={()=>setEditing(true)} aria-label="Review missing details for Owner B">Review <ArrowRight size={15}/></button>:<CheckCircle size={20} aria-label="Complete"/>}</li>)}</ul>
      <p className="ld-owner-hint">Reorder the list. Each owner keeps the same color and label.</p>
     </>}
    </div>
   </div>;}
 return <figure ref={preview.root} className="ld-ownership">
  <div className="ld-demo-toolbar">{viewControls}<button type="button" className="ld-replay" onClick={replay}><ArrowCounterClockwise size={14} aria-hidden="true"/>Replay</button></div>
  <LendescaResponsiveViewport mobile={preview.mobile} narrow={preview.narrow} reduced={preview.reduced} desktopHeight={650}>{mobile=><ApplicationFrame stage={4} mobile={mobile} panel={panel(mobile)}/>}</LendescaResponsiveViewport>
  <div className="ld-under-controls"><span aria-live="polite">{saved?'Owner B’s correction is saved in this example.':preview.mobile?'Scroll to Owner B, select Review, then add a name and save.':'Select Review for Owner B, then add a name and save.'}</span></div>
  <figcaption className="ld-caption">Reconstructed ownership example. Names, percentages, and the correction task are fictional.</figcaption>
 </figure>;
}
