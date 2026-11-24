import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { SearchDemo } from "./section02Search.jsx";
import customerCard from "../section-01-customer-card-user.png";
import insightsPanel from "../section-01-insights-panel-user.png";
import conversation from "../section-02-deck-iq-assistant-user.png";
import assessment from "../section-03-reasoning-full-user.png";
import orders from "../section-04-orders-elevation.png";
import agedOrders from "../section-04-aged-orders-elevation.png";
import orderHealth from "../section-04-order-health.png";
import fullWorkspace from "../section-05-customer-insights-full.png";
import "./OperationalAiCase.css";

const chapterIds = ["fit", "boundary", "control", "phase", "outcome"];

function ChapterCopy({ number, title, children }) {
  return <div className="chapter-copy"><span>{number}</span><div><h2 id={`chapter-${number}-heading`}>{title}</h2>{children}</div></div>;
}

function MobileAssessment() {
  return <div className="mobile-assessment" aria-label="Readable mobile version of the Deck IQ backorder assessment">
    <div className="mobile-assessment-head"><span className="mobile-assessment-mark" aria-hidden="true"/><strong>Deck IQ Assistant</strong></div>
    <div className="mobile-assessment-question"><b>You</b><span>Which backordered orders are delayed because inventory is unavailable?</span></div>
    <h3>Backorder risk assessment</h3>
    <p>Deck IQ found three backordered orders that are likely delayed because available inventory does not match their assigned fulfillment locations.</p>
    <h4>Key findings</h4>
    <ul><li>Two orders have no available inventory at the assigned location.</li><li>One order can be fulfilled from another location.</li><li>No payment or address exceptions were found.</li></ul>
    <h4>Recommended actions</h4>
    <ol><li>Review alternate fulfillment locations.</li><li>Reassign eligible inventory before changing the delivery estimate.</li><li>Contact affected customers with a confirmed timeline.</li></ol>
    <blockquote>“Inventory availability is the most likely cause of delay, but the fulfillment location should be verified before contacting the customer.”</blockquote>
    <a href={assessment} target="_blank" rel="noreferrer">View the original panel ↗</a>
  </div>;
}

function useChapterMotion(rootRef) {
  const [reducedMotion, setReducedMotion] = useState(() => matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const page = root.closest("main.operational-ai-case");
    const drawer = root.querySelector("#control");
    const alignDrawer = () => {
      const rightInset = document.documentElement.clientWidth - drawer.getBoundingClientRect().right;
      drawer.style.setProperty("--drawer-breakout", `${Math.max(0, rightInset)}px`);
    };
    alignDrawer();
    addEventListener("resize", alignDrawer);

    if (reducedMotion) return () => removeEventListener("resize", alignDrawer);
    const clamp = value => Math.max(0, Math.min(1, value));
    const ease = value => 1 - Math.pow(1 - clamp(value), 3);
    const interval = (progress, start, end) => ease((progress - start) / (end - start));
    const chapters = chapterIds.map(id => ({ id, element:root.querySelector(`#${id}`), current:0, target:0, rendered:null, near:false }));
    const closingScreen = root.querySelector("#outcome .outcome-screen");
    const closingFigure = closingScreen.closest("figure");
    let screenCurrent = 0;
    let screenTarget = 0;
    let screenRendered = null;
    let screenRenderedCompact = null;
    let frame = 0;
    let measureFrame = 0;
    const set = (element, name, value) => element.style.setProperty(name, value);
    const setFloat = (element, name, amount, progress) => {
      set(element, `--${name}-p`, progress);
      set(element, `--${name}-y`, `${((1 - progress) * amount).toFixed(1)}px`);
    };
    const setImage = (element, name, progress, x, y, scale) => {
      set(element, `--${name}-p`, progress);
      set(element, `--${name}-x`, `${((1 - progress) * x).toFixed(1)}px`);
      set(element, `--${name}-y`, `${((1 - progress) * y).toFixed(1)}px`);
      set(element, `--${name}-scale`, (scale + progress * (1 - scale)).toFixed(3));
    };
    const paint = () => {
      let unsettled = false;
      chapters.forEach(chapter => {
        chapter.current += (chapter.target - chapter.current) * .18;
        if (Math.abs(chapter.target - chapter.current) < .001) chapter.current = chapter.target;
        else unsettled = true;
        const { element, current, id } = chapter;
        if (chapter.rendered === current) return;
        chapter.rendered = current;
        setFloat(element, "number", 38, interval(current, 0, .32));
        setFloat(element, "heading", 52, interval(current, .05, .48));
        setFloat(element, "copy", 62, interval(current, .15, .62));
        setFloat(element, "copy-two", 62, interval(current, .24, .73));
        if (id === "fit") {
          setImage(element, "customer", interval(current, .12, .77), -26, 78, .91);
          setImage(element, "insights", interval(current, .30, 1), 56, 94, .86);
        } else if (id === "boundary") {
          setImage(element, "search", interval(current, .12, .77), -26, 78, .91);
          setImage(element, "conversation", interval(current, .30, 1), 56, 94, .86);
        } else if (id === "control") {
          const progress = interval(current, .18, .92);
          set(element, "--drawer-p", progress);
          set(element, "--drawer-x", `${((1 - progress) * 104).toFixed(1)}%`);
          set(element, "--drawer-mobile-y", `${((1 - progress) * 36).toFixed(1)}px`);
        } else if (id === "phase") {
          setImage(element, "age", interval(current, .12, .77), -28, 88, .89);
          setImage(element, "orders", interval(current, .23, .89), 14, 78, .84);
          setImage(element, "health", interval(current, .34, 1), 65, 46, .78);
        } else if (id === "outcome") {
          setFloat(element, "quote-line-1", 72, interval(current, .33, .64));
          setFloat(element, "quote-line-2", 72, interval(current, .46, .76));
          setFloat(element, "quote-line-3", 72, interval(current, .59, .88));
          setFloat(element, "quote-cite", 42, interval(current, .77, 1));
        }
      });
      screenCurrent += (screenTarget - screenCurrent) * .18;
      if (Math.abs(screenTarget - screenCurrent) < .001) screenCurrent = screenTarget;
      else unsettled = true;
      const compact = innerWidth <= 780;
      if (screenRendered !== screenCurrent || screenRenderedCompact !== compact) {
        screenRendered = screenCurrent;
        screenRenderedCompact = compact;
        setImage(closingScreen, "screen", clamp(screenCurrent), 0, compact ? 42 : 72, compact ? .88 : .72);
      }
      frame = unsettled ? requestAnimationFrame(paint) : 0;
    };
    const update = () => {
      chapters.forEach(chapter => {
        const bounds = chapter.element.getBoundingClientRect();
        const near = bounds.bottom > -innerHeight * .4 && bounds.top < innerHeight * 1.4;
        if (near !== chapter.near) {
          chapter.near = near;
          chapter.element.classList.toggle("motion-near", near);
        }
        chapter.target = clamp((innerHeight * .88 - bounds.top) / (innerHeight * .7));
        if (bounds.bottom < -innerHeight * .25) chapter.current = chapter.target = 1;
        else if (bounds.top > innerHeight * 1.25) chapter.current = chapter.target = 0;
      });
      const bounds = closingFigure.getBoundingClientRect();
      const compact = innerWidth <= 780;
      screenTarget = clamp((innerHeight * (compact ? .9 : .68) - bounds.top) / (innerHeight * (compact ? .46 : .5)));
      if (bounds.bottom < -innerHeight * .25) screenCurrent = screenTarget = 1;
      else if (bounds.top > innerHeight * 1.25) screenCurrent = screenTarget = 0;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const scheduleUpdate = () => {
      if (measureFrame) return;
      measureFrame = requestAnimationFrame(() => { measureFrame = 0; update(); });
    };
    page.classList.add("motion-ready");
    addEventListener("scroll", scheduleUpdate, { passive:true });
    addEventListener("resize", scheduleUpdate);
    update();
    if (location.hash) requestAnimationFrame(() => {
      const target = document.getElementById(location.hash.slice(1));
      if (target && root.contains(target)) target.scrollIntoView();
    });
    return () => {
      removeEventListener("resize", alignDrawer);
      removeEventListener("scroll", scheduleUpdate);
      removeEventListener("resize", scheduleUpdate);
      if (frame) cancelAnimationFrame(frame);
      if (measureFrame) cancelAnimationFrame(measureFrame);
      page.classList.remove("motion-ready");
      chapters.forEach(chapter => chapter.element.classList.remove("motion-near"));
    };
  }, [rootRef, reducedMotion]);
}

export function OperationalAiContent() {
  const rootRef = useRef(null);
  useChapterMotion(rootRef);
  return <div className="chapters" ref={rootRef}>
    <section className="chapter" id="fit" aria-labelledby="chapter-01-heading">
      <ChapterCopy number="01" title="Start with the work, not the interface">
        <p>I developed a catalog of customer-service tasks to identify where AI could help inside the OMS. I used product documentation and role-based scenarios to explore opportunities, then worked with product, engineering, and the CTO to shape the direction.</p>
        <p>With the CTO, I co-developed a contextual insight entry in the customer panel. It gave a CSR a quick summary of the customer’s history, with a path into a deeper conversation while keeping the order workspace available.</p>
      </ChapterCopy>
      <figure className="evidence-figure" aria-label="Customer Info panel and its contextual Customer Insights assistant">
        <div className="interface-sequence">
          <div className="customer-card"><img width="722" height="474" src={customerCard} alt="Complete Customer Info panel, including the contextual AI entry in its header"/></div>
          <div className="insights-panel"><img width="780" height="850" src={insightsPanel} alt="Complete slide-out Customer Insights assistant with a summary and customer metrics"/></div>
        </div>
        <figcaption className="sr-only">The Customer Info panel sits behind the slide-out Customer Insights assistant it opens. Customer details shown are sample data.</figcaption>
      </figure>
    </section>

    <section className="chapter" id="boundary" aria-labelledby="chapter-02-heading">
      <ChapterCopy number="02" title="Define the boundary between AI and UI">
        <p>I examined where conversation could help someone investigate an order and where it could restrict the workflow. That shaped two complementary patterns: direct search for a known record, and a contextual assistant for questions that require synthesis or explanation.</p>
        <p>Both kept the operational workspace available so the user could inspect the underlying information and decide what to do next.</p>
      </ChapterCopy>
      <figure className="evidence-figure" aria-label="Direct order search and a contextual assistant conversation">
        <div className="interface-boundary">
          <div className="direct-search"><SearchDemo/></div>
          <div className="assistant-conversation"><a href={conversation} target="_blank" rel="noreferrer" aria-label="Open the Deck IQ Assistant conversation at full size"><img width="882" height="732" src={conversation} alt="Deck IQ Assistant conversation about a customer's order, including a check before changing fulfillment status"/></a></div>
        </div>
        <figcaption className="sr-only">An interactive order search is paired with a Deck IQ Assistant conversation. Search records are fictional sample data.</figcaption>
      </figure>
    </section>

    <section className="chapter" id="control" aria-labelledby="chapter-03-heading">
      <ChapterCopy number="03" title="Make context and control visible">
        <p>The backorder assessment organized findings and suggested next steps while leaving the operational decision with the user. It prompted verification of the fulfillment location before contacting the customer.</p>
        <p>I also proposed explaining the assistant’s capabilities and limits within each Center. Engineering suggested placing that guidance beside the suggested prompts, and product supported the direction. This would help people understand what they could reasonably ask before starting a conversation.</p>
      </ChapterCopy>
      <figure className="evidence-figure" aria-label="Backorder risk assessment that preserves human review">
        <div className="control-study"><div className="reasoning-state"><a href={assessment} target="_blank" rel="noreferrer" aria-label="Open the complete Deck IQ assessment image at full size"><img width="662" height="1260" src={assessment} alt="Deck IQ backorder assessment showing findings, suggested actions, a structured response example, and a reminder to verify the fulfillment location"/></a></div></div>
        <MobileAssessment/>
        <figcaption className="sr-only">Complete Deck IQ Assistant panel with the question, assessment, structured response example, and composer. The mobile layout restates the content for reading.</figcaption>
      </figure>
    </section>

    <section className="chapter" id="phase" aria-labelledby="chapter-04-heading">
      <ChapterCopy number="04" title="Make operational data mean what it appears to mean">
        <p>During a reporting review, a standalone sparkline could suggest a direction that conflicted with the aggregate percentage beside it. I worked with engineering to clarify the comparison periods and revised the concept to show current and prior periods together.</p>
        <p>Engineering found the revised comparison clearer. The CTO preferred its meaning but questioned whether it belonged on the operational dashboard or in Report Center. The review sharpened both the visual explanation and the question of where it would be most useful.</p>
      </ChapterCopy>
      <figure className="evidence-figure" aria-label="OrderCenter KPI, Order Health, and aged open orders visualizations">
        <div className="report-study">
          <div className="kpi-study"><img width="670" height="378" src={orders} alt="Orders KPI comparing the last 90 days with the previous period, with a day 75 tooltip"/></div>
          <div className="age-study"><img width="1036" height="592" src={agedOrders} alt="Aged Open Orders widget showing order counts and percentages by age band"/></div>
          <div className="health-study"><img width="348" height="392" src={orderHealth} alt="Order Health chart showing 82 percent healthy, 11 percent warning, and 7 percent action"/></div>
        </div>
        <figcaption className="sr-only">Illustrative data in the composable dashboard visual language.</figcaption>
      </figure>
    </section>

    <section className="chapter outcome-chapter" id="outcome" aria-labelledby="chapter-05-heading">
      <ChapterCopy number="05" title="What shipped and what we learned">
        <p>Report Center, AI Reporting, and Customer Insights launched. Deck IQ Assistant reached internal beta and demos with Deck’s sales team.</p>
        <p>In live demonstrations, analysts from Forrester and Gartner gave the assistant glowing feedback.</p>
      </ChapterCopy>
      <blockquote className="outcome-quote"><p><span className="sr-only">“This is a real value add for all our customers and our product!”</span><span className="quote-line quote-line-1" aria-hidden="true"><span className="quote-line-text">“This is a real value add</span></span><span className="quote-line quote-line-2" aria-hidden="true"><span className="quote-line-text">for all our customers</span></span><span className="quote-line quote-line-3" aria-hidden="true"><span className="quote-line-text">and our product!”</span></span></p><cite>Doug Smith · CTO, Deck Commerce</cite></blockquote>
      <figure className="evidence-figure outcome-figure" aria-label="Full order workspace with contextual Customer Insights open">
        <a className="outcome-screen" href={fullWorkspace} target="_blank" rel="noreferrer" aria-label="Open full-size Customer Insights frame"><img width="1440" height="900" src={fullWorkspace} alt="Full OrderCenter screen showing Customer Info in the order workspace and Customer Insights open on the right"/></a>
        <figcaption className="sr-only">Full workspace context with Customer Insights open. All visible customer and order details are sample or cleared data.</figcaption>
      </figure>
    </section>
  </div>;
}
