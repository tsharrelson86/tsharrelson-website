import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowCounterClockwise, CursorClick, MagnifyingGlass } from '@phosphor-icons/react';
import './section02Search.css';

const orders = [
  { id: '31443500001', name: 'Joe Montana', date: '04/21/26 at 7:55am', email: 'jmontana@example.com', phone: '770.555.0101' },
  { id: '31443500002', name: 'Anita Desai', date: '04/21/26 at 7:54am', email: 'adesai@example.com', phone: '212.555.0102' },
  { id: '31443500003', name: 'Carlos Mendoza', date: '04/21/26 at 7:51am', email: 'cmendoza@example.com', phone: '917.555.0103' },
  { id: '31443500004', name: 'Sophia Lee', date: '04/21/26 at 7:44am', email: 'slee@example.com', phone: '415.555.0104' },
  { id: '31443500005', name: 'Markus Jensen', date: '04/21/26 at 7:32am', email: 'mjensen@example.com', phone: '314.555.0105' },
  { id: '31443500006', name: 'Priya Shah', date: '04/21/26 at 7:18am', email: 'pshah@example.com', phone: '312.555.0186' },
  { id: '31443500007', name: 'Devon Brooks', date: '04/21/26 at 7:09am', email: 'dbrooks@example.com', phone: '206.555.0142' },
  { id: '58210400006', name: 'Marianne Smith', date: '11/02/26 at 6:23pm', email: 'msmith@example.com', phone: '314.555.0106' },
];

function Highlight({ value, query }) {
  const position = value.toLowerCase().indexOf(query.toLowerCase());
  if (!query || position < 0) return value;
  return <>{value.slice(0, position)}<mark>{value.slice(position, position + query.length)}</mark>{value.slice(position + query.length)}</>;
}

export function SearchDemo() {
  const rootRef = useRef(null);
  const inputRef = useRef(null);
  const timersRef = useRef([]);
  const playedRef = useRef(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [scripted, setScripted] = useState(false);
  const [pointer, setPointer] = useState(false);
  const [allResults, setAllResults] = useState(false);
  const [selected, setSelected] = useState(null);
  const [reducedMotion, setReducedMotion] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);

  const matches = useMemo(() => {
    const term = query.replace(/^#/, '').trim().toLowerCase();
    if (term.length < 4) return [];
    return orders.filter(order => Object.values(order).some(value => value.toLowerCase().includes(term)));
  }, [query]);

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const schedule = (callback, delay) => {
    timersRef.current.push(setTimeout(callback, delay));
  };

  const play = () => {
    clearTimers();
    inputRef.current?.blur();
    setSelected(null);
    setAllResults(false);
    setQuery('');
    setShowResults(false);
    setActive(false);
    setPointer(false);
    setScripted(true);
    schedule(() => setPointer(true), 650);
    schedule(() => setActive(true), 1350);
    [...'314435'].forEach((character, index) => {
      schedule(() => {
        setQuery(previous => previous + character);
        if (index === 4) setShowResults(true);
      }, 2300 + index * 245);
    });
    schedule(() => setPointer(false), 2400);
    schedule(() => setScripted(false), 7400);
  };

  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(motion.matches);
    motion.addEventListener('change', updateMotion);
    return () => motion.removeEventListener('change', updateMotion);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      clearTimers();
      setScripted(false);
      setPointer(false);
      setQuery('314435');
      setActive(true);
      setShowResults(true);
      return;
    }
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !playedRef.current) {
        playedRef.current = true;
        play();
        observer.disconnect();
      }
    }, { threshold: .35 });
    observer.observe(rootRef.current);
    return () => {
      observer.disconnect();
      clearTimers();
    };
  }, [reducedMotion]);

  const takeControl = () => {
    playedRef.current = true;
    clearTimers();
    setScripted(false);
    setPointer(false);
    setActive(true);
    setSelected(null);
  };

  const changeQuery = event => {
    takeControl();
    const value = event.target.value;
    setQuery(value);
    setShowResults(value.trim().length >= 4);
    setAllResults(false);
  };

  const chooseOrder = order => {
    takeControl();
    setSelected(order);
    setQuery(`#${order.id}`);
    setShowResults(false);
  };

  const replay = () => {
    playedRef.current = true;
    if (reducedMotion) {
      setQuery('314435');
      setSelected(null);
      setShowResults(true);
    } else play();
  };

  return <div className={`search-demo${active ? ' is-active' : ''}${showResults ? ' has-results' : ''}${scripted ? ' is-scripted' : ''}`} ref={rootRef}>
    <div className="search-demo-card">
      <div className="search-demo-field">
        <MagnifyingGlass aria-hidden="true" size={19} weight="bold" />
        <input
          ref={inputRef}
          type="search"
          aria-label="Try the order search"
          aria-controls="search-demo-results"
          aria-expanded={showResults}
          autoComplete="off"
          placeholder={scripted && active ? '' : 'Search all...'}
          value={query}
          onFocus={takeControl}
          onBlur={() => { if (!scripted) setActive(false); }}
          onChange={changeQuery}
          onKeyDown={event => {
            if (event.key === 'Escape') { setShowResults(false); setActive(false); inputRef.current?.blur(); }
            if (event.key === 'Enter' && matches[0]) chooseOrder(matches[0]);
          }}
        />
        {scripted && active && <span className="search-demo-typing" aria-hidden="true">{query}<i /></span>}
      </div>
      <div id="search-demo-results" className="search-demo-results" aria-hidden={!showResults}>
        <div className="search-demo-results-inner">
          {matches.length ? <div className="search-demo-rows" aria-label="Matching orders">
            {matches.slice(0, allResults ? matches.length : 5).map((order, index) => <button className="search-demo-row" key={order.id} type="button" tabIndex={showResults ? 0 : -1} style={{ '--row-index': index }} onClick={() => chooseOrder(order)}>
              <strong>#<Highlight value={order.id} query={query} /></strong>
              <small>{order.date}<b>·</b>{order.name}<b>·</b>{order.email}<b>·</b>{order.phone}</small>
            </button>)}
          </div> : <p className="search-demo-empty">No quick matches found.</p>}
          {allResults ? <p className="search-demo-all search-demo-all--complete"><strong>{matches.length ? `Showing all ${matches.length} sample matches` : 'No further sample matches'}</strong><small>{matches.length ? 'Scroll the list to review more orders.' : 'Try 314435 or Marianne in this preview.'}</small></p>
            : <button className="search-demo-all" type="button" tabIndex={showResults ? 0 : -1} onClick={() => setAllResults(true)}>
              <strong>Search all orders for “{query}”</strong>
              <small>Includes PO numbers and other order attributes.</small>
            </button>}
        </div>
      </div>
      {selected && <div className="search-demo-selected" role="status"><strong>Order #{selected.id}</strong><span>{selected.name} · {selected.date}</span><button type="button" onClick={() => { setQuery('314435'); setSelected(null); setShowResults(true); }}>Back to results</button></div>}
    </div>
    {pointer && <CursorClick className="search-demo-pointer" aria-hidden="true" size={29} weight="fill" />}
    <button className="search-demo-replay" type="button" onClick={replay} aria-label="Replay the search demonstration"><ArrowCounterClockwise size={14} aria-hidden="true" /> Replay search</button>
  </div>;
}

const roots = new WeakMap();
export function mountSection02Search(scope = document) {
  scope.querySelectorAll('[data-search-demo]').forEach(node => {
    if (roots.has(node)) return;
    const root = createRoot(node);
    roots.set(node, root);
    root.render(<SearchDemo />);
  });
}
