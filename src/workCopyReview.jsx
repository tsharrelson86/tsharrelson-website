import { createRoot } from 'react-dom/client';
import { Work, useMotion } from './App.jsx';
import './styles.css';

function Review(){
 const ref=useMotion('/work');
 return <div ref={ref}><Work pathname="/work"
  title="A few projects I’m proud of."
  lede="These projects show how I approach software people rely on every day, from order management and lending to operational AI. Here’s what I worked through, the decisions I made, and what we shipped."
 /></div>;
}

createRoot(document.getElementById('root')).render(<Review/>);
