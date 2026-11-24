import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowLeft } from '@phosphor-icons/react';
import { gsap } from 'gsap';
import './LendescaStageTransition.css';

function prefersReducedMotion() {
  return new URLSearchParams(window.location.search).get('motion') === 'reduce'
    || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Completed cards stay mounted above the form, with their bottom edge exposed. */
export function LendescaStageTransition({ stage, labels, onStage, children }) {
  const root = useRef(null);
  const animation = useRef(null);
  const focusAfterChange = useRef(false);
  const resetScrollRevision = useRef(0);
  const [reduced, setReduced] = useState(prefersReducedMotion);
  const [view, setView] = useState({ stage, from: stage, direction: 'none', moving: false, revision: 0 });

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(prefersReducedMotion());
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useLayoutEffect(() => {
    if (stage === view.stage) return;
    animation.current?.kill();
    animation.current = null;
    focusAfterChange.current = Boolean(root.current?.closest('.phx-screen')?.contains(document.activeElement));
    setView(current => ({
      stage,
      from: current.stage,
      direction: stage > current.stage ? 'next' : 'back',
      moving: !reduced,
      revision: current.revision + 1,
    }));
  }, [stage, view.stage, reduced]);

  useLayoutEffect(() => {
    const element = root.current;
    if (!element) return;
    const cards = [...element.querySelectorAll('.ld-stage-card')];
    const position = index => {
      const styles = getComputedStyle(element);
      const peek = parseFloat(styles.getPropertyValue('--card-peek')) || 0;
      const gap = parseFloat(styles.getPropertyValue('--card-gap')) || 0;
      return index < view.stage
        ? (index === view.stage - 1 ? peek : -gap) - cards[index].offsetHeight
        : index === 0 ? 0 : peek + gap;
    };
    const finish = () => {
      animation.current = null;
      setView(current => current.revision === view.revision && current.moving
        ? { ...current, moving: false }
        : current);
    };
    if (resetScrollRevision.current !== view.revision) {
      cards[view.stage].querySelectorAll('.phx-content, .phx-fields').forEach(pane => {
        pane.scrollTop = 0;
      });
      resetScrollRevision.current = view.revision;
    }
    if (view.moving && !reduced) {
      animation.current = gsap.to(cards, {
        y: position,
        duration: 0.72,
        ease: 'power3.inOut',
        onComplete: finish,
      });
    } else {
      gsap.set(cards, { y: position });
      if (view.moving) finish();
      if (focusAfterChange.current) {
        cards[view.stage].querySelector('h3')?.focus({ preventScroll: true });
        focusAfterChange.current = false;
      }
    }
    let width = element.clientWidth;
    let height = element.clientHeight;
    const resize = new ResizeObserver(() => {
      if (width === element.clientWidth && height === element.clientHeight) return;
      width = element.clientWidth;
      height = element.clientHeight;
      if (animation.current) animation.current.progress(1);
      gsap.set(cards, { y: position });
    });
    resize.observe(element);
    return () => {
      resize.disconnect();
      animation.current?.kill();
      animation.current = null;
    };
  }, [view.stage, view.revision, view.moving, reduced]);

  return (
    <div ref={root} className={'ld-stage-transition' + (view.moving ? ' is-moving' : '')}
      data-stage={view.stage} data-direction={view.direction} data-moving={String(view.moving)} aria-busy={view.moving || undefined}>
      {labels.map((label, index) => {
        const current = index === view.stage;
        const previous = index === view.stage - 1;
        const stripVisible = previous || (view.moving && index === view.from - 1);
        return <div key={label} className={'ld-stage-card' + (current ? ' is-current' : '') + (previous ? ' is-previous' : '')}
          data-card={index} style={{ zIndex: labels.length - index }}>
          <div className="ld-card-body" inert={!current || view.moving || undefined} aria-hidden={!current || view.moving || undefined}>
            {children(index)}
          </div>
          <button type="button" className={'ld-card-return' + (stripVisible ? ' is-visible' : '')}
            aria-label={label} aria-hidden={!previous || view.moving || undefined}
            disabled={!previous || view.moving || !onStage} tabIndex={previous && !view.moving ? 0 : -1}
            onClick={() => onStage?.(index)}><ArrowLeft size={15} aria-hidden="true"/>{label}</button>
        </div>;
      })}
    </div>
  );
}

export default LendescaStageTransition;
