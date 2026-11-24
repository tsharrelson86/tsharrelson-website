import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, ArrowRight, CornersOut, MagnifyingGlassPlus, Minus, Plus, X } from '@phosphor-icons/react';
import './homeGraphicViewer.css';

export function GraphicInspectButton({onClick, label}) {
  return <button className="b-graphic-open" type="button" onClick={onClick} aria-label={label} aria-haspopup="dialog">
    <span><MagnifyingGlassPlus size={19} aria-hidden="true"/>Enlarge preview</span>
  </button>;
}

export function HomeGraphicViewer({title, items, trigger, onClose}) {
  const dialog = useRef(null);
  const closeButton = useRef(null);
  const viewport = useRef(null);
  const art = useRef(null);
  const imageHeading = useRef(null);
  const changingImage = useRef(false);
  const zoomCenter = useRef(null);
  const titleId = useId();
  const hintId = useId();
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(2);
  const [availableSize, setAvailableSize] = useState({width: 0, height: 0});
  const item = items[index];
  const fitWidth = Math.min(Math.max(availableSize.width - 32, 1), Math.max(availableSize.height - 32, 1) * item.width / item.height, item.width);

  useEffect(() => {
    const element = dialog.current;
    const page = document.documentElement;
    const body = document.body;
    const position = {left: window.scrollX, top: window.scrollY};
    const previous = {htmlOverflow: page.style.overflow, bodyOverflow: body.style.overflow, paddingRight: body.style.paddingRight};
    const scrollbarWidth = window.innerWidth - page.clientWidth;
    if (scrollbarWidth > 0) body.style.paddingRight = `${parseFloat(getComputedStyle(body).paddingRight) + scrollbarWidth}px`;
    page.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    element.showModal();
    closeButton.current.focus({preventScroll: true});
    const measure = () => {
      const {clientWidth: width, clientHeight: height} = viewport.current;
      setAvailableSize(previousSize => previousSize.width === width && previousSize.height === height ? previousSize : {width, height});
    };
    const observer = new ResizeObserver(measure);
    observer.observe(viewport.current);
    measure();
    return () => {
      observer.disconnect();
      if (element.open) element.close();
      page.style.overflow = previous.htmlOverflow;
      body.style.overflow = previous.bodyOverflow;
      body.style.paddingRight = previous.paddingRight;
      window.scrollTo({...position, behavior: 'instant'});
      if (trigger?.isConnected) trigger.focus({preventScroll: true});
    };
  }, [trigger]);

  useLayoutEffect(() => {
    const area = viewport.current;
    const center = zoomCenter.current;
    if (!area) return;
    const areaBounds = area.getBoundingClientRect();
    const artBounds = art.current.getBoundingClientRect();
    area.scrollTo({
      left: center ? area.scrollLeft + artBounds.left - areaBounds.left + center.x * artBounds.width - area.clientWidth / 2 : 0,
      top: center ? area.scrollTop + artBounds.top - areaBounds.top + center.y * artBounds.height - area.clientHeight / 2 : 0,
      behavior: 'instant',
    });
    zoomCenter.current = null;
    if (changingImage.current) {
      imageHeading.current.focus({preventScroll: true});
      changingImage.current = false;
    }
  }, [zoom, index, availableSize]);

  function changeZoom(next) {
    if (next !== 1) {
      const area = viewport.current;
      const areaBounds = area.getBoundingClientRect();
      const artBounds = art.current.getBoundingClientRect();
      zoomCenter.current = {
        x: (areaBounds.left + area.clientWidth / 2 - artBounds.left) / artBounds.width,
        y: (areaBounds.top + area.clientHeight / 2 - artBounds.top) / artBounds.height,
      };
    }
    setZoom(next);
  }

  function changeImage(next) {
    zoomCenter.current = null;
    changingImage.current = true;
    setZoom(2);
    setIndex(next);
  }

  function keepFocusInside(event) {
    if (event.key !== 'Tab') return;
    const controls = [...dialog.current.querySelectorAll('button:not(:disabled), [tabindex="0"]')];
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && (document.activeElement === first || document.activeElement === imageHeading.current)) {
      event.preventDefault();
      last.focus({preventScroll: true});
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus({preventScroll: true});
    }
  }

  return createPortal(<dialog className="home-graphic-dialog" ref={dialog} aria-labelledby={titleId} aria-describedby={hintId}
    onKeyDown={keepFocusInside} onCancel={event => {event.preventDefault(); onClose();}}>
    <header className="home-graphic-header">
      <div><p>{title}</p><h2 id={titleId} ref={imageHeading} tabIndex={-1}>{item.label}</h2></div>
      <button ref={closeButton} type="button" className="home-graphic-close" onClick={onClose} aria-label="Close enlarged preview"><X size={24} aria-hidden="true"/></button>
    </header>
    <p className="home-graphic-hint" id={hintId}>Scroll to inspect details. Choose Fit for the full view.</p>
    <div className="home-graphic-viewport" ref={viewport} tabIndex={0} role="region" aria-label={`${item.label}, scrollable enlarged preview`}>
      <div className="home-graphic-art" ref={art} style={{width: `${fitWidth * zoom}px`}}>
        {item.render ? item.render() : <img src={item.src} alt={item.alt} width={item.width} height={item.height}/>}
      </div>
    </div>
    <footer className="home-graphic-controls">
      <div className="home-graphic-zoom" aria-label="Image zoom">
        <button type="button" onClick={() => changeZoom(1)} aria-pressed={zoom === 1}><CornersOut size={19} aria-hidden="true"/>Fit</button>
        <button type="button" onClick={() => changeZoom(Math.max(1, zoom - .5))} disabled={zoom === 1} aria-label="Zoom out"><Minus size={20} aria-hidden="true"/></button>
        <output aria-live="polite" aria-label="Zoom level">{Math.round(zoom * 100)}%</output>
        <button type="button" onClick={() => changeZoom(Math.min(4, zoom + .5))} disabled={zoom === 4} aria-label="Zoom in"><Plus size={20} aria-hidden="true"/></button>
      </div>
      {items.length > 1 && <nav className="home-graphic-pages" aria-label="Preview images">
        <button type="button" disabled={index === 0} onClick={() => changeImage(index - 1)} aria-label="Previous image"><ArrowLeft size={20} aria-hidden="true"/></button>
        <span aria-live="polite">{index + 1} of {items.length}</span>
        <button type="button" disabled={index === items.length - 1} onClick={() => changeImage(index + 1)} aria-label="Next image"><ArrowRight size={20} aria-hidden="true"/></button>
      </nav>}
    </footer>
  </dialog>, document.body);
}
