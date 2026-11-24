import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/** Resize one live application specimen without resetting its current section. */
export function LendescaResponsiveViewport({ mobile, narrow, reduced, desktopHeight = 520, children }) {
  const stage = useRef(null);
  const frame = useRef(null);
  const content = useRef(null);
  const animation = useRef(null);
  const initialized = useRef(false);
  const previousNarrow = useRef(narrow);
  const currentMode = useRef(mobile);
  const [displayMobile, setDisplayMobile] = useState(mobile);
  const [resizing, setResizing] = useState(false);

  useLayoutEffect(() => { currentMode.current = displayMobile; }, [displayMobile]);

  useLayoutEffect(() => {
    const stageElement = stage.current;
    const frameElement = frame.current;
    const contentElement = content.current;
    if (!stageElement || !frameElement || !contentElement) return;
    let available = stageElement.clientWidth;
    const breakpointChanged = previousNarrow.current !== narrow;
    previousNarrow.current = narrow;

    const resize = (animate) => {
      animation.current?.kill();
      animation.current = null;
      const width = mobile ? Math.min(narrow ? 340 : 300, available) : available;
      const height = mobile ? width * 812 / 375 : desktopHeight;
      const finish = () => {
        animation.current = null;
        gsap.set(contentElement, { opacity: 1 });
        setResizing(false);
        ScrollTrigger.refresh();
      };
      const bounds = frameElement.getBoundingClientRect();
      const unchanged = currentMode.current === mobile &&
        Math.abs(bounds.width - width) < 1 && Math.abs(bounds.height - height) < 1;
      if (!initialized.current || reduced || !animate || unchanged) {
        initialized.current = true;
        setDisplayMobile(mobile);
        gsap.set(frameElement, { width, height, borderRadius: mobile ? 25 : 20 });
        gsap.set(stageElement, { height });
        finish();
        return;
      }

      const changingLayout = currentMode.current !== mobile;
      setResizing(true);
      const timeline = gsap.timeline({ onComplete: finish });
      animation.current = timeline;
      timeline.to(frameElement, { width, height, borderRadius: mobile ? 25 : 20,
        duration: .78, ease: 'power3.inOut' }, 0);
      timeline.to(stageElement, { height, duration: .78, ease: 'power3.inOut' }, 0);
      if (changingLayout) {
        // Hide only the structural breakpoint, while the frame keeps moving.
        timeline.to(contentElement, { opacity: 0, duration: .14, ease: 'power1.in' }, .13);
        timeline.call(() => setDisplayMobile(mobile), [], .28);
        timeline.to(contentElement, { opacity: 1, duration: .3, ease: 'power2.out' }, .32);
      } else {
        timeline.to(contentElement, { opacity: 1, duration: .2 }, 0);
      }
    };

    resize(!breakpointChanged);
    const observer = new ResizeObserver(() => {
      if (available === stageElement.clientWidth) return;
      available = stageElement.clientWidth;
      // Follow a real browser resize immediately rather than chasing it.
      resize(false);
    });
    observer.observe(stageElement);
    return () => {
      observer.disconnect();
      animation.current?.kill();
      animation.current = null;
    };
  }, [mobile, narrow, reduced, desktopHeight]);

  return <div ref={stage} className="ld-responsive-stage"
    data-view={displayMobile ? 'mobile' : 'desktop'} data-resizing={String(resizing)}
    aria-busy={resizing || undefined}>
    <div ref={frame} className="ld-responsive-frame" inert={resizing || undefined}>
      <div ref={content} className="ld-responsive-content">{children(displayMobile)}</div>
    </div>
  </div>;
}
