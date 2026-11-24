import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CheckCircle, Code, LockKey, MagnifyingGlass, Stack, TreeStructure } from '@phosphor-icons/react';
import { HomeFeature } from './HomeFeature.jsx';
import { CreditProjectPreview } from './CreditProjectPreview.jsx';
import { UserCenterPreview } from './UserCenterPreview.jsx';
import { GraphicInspectButton, HomeGraphicViewer } from './HomeGraphicViewer.jsx';
import customerCard from '../section-01-customer-card-user.png';
import insightsPanel from '../section-01-insights-panel-user.png';
import brandWebsite from '../brand-identity-assets/website-after-user.png';
import './homeB.css';

gsap.registerPlugin(ScrollTrigger);

const stages = ['Funding', 'About your business', 'Personal Info', 'Credit Authorization', 'Additional Owners', 'Identity Verification', 'Eligibility', 'Tax Information'];

function useSupportingMotion() {
  const root = useRef(null);
  useEffect(()=>{
    let active=true;
    const jump=()=>{if(active&&location.hash==='#user-center')root.current?.querySelector('#user-center')?.scrollIntoView({block:'start'});};
    document.fonts.ready.then(()=>requestAnimationFrame(jump));
    addEventListener('hashchange',jump);
    return()=>{active=false;removeEventListener('hashchange',jump);};
  },[]);
  useLayoutEffect(() => {
    if (new URLSearchParams(location.search).get('motion') === 'reduce') return;
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        const small = matchMedia('(max-width: 780px)').matches;
        root.current.querySelectorAll('.b-story-art').forEach(art => {
          const stage = art.querySelector('.b-story-figure');
          // Use the featured project's scroll-progress language on the source layers.
          // Each layer settles into its original composition as its stage enters view.
          const entrances = art.querySelector('.b-ai-visual') ? [
            {selector: '.b-ai-customer', from: {x: small ? -10 : -24, y: small ? 22 : 48, scale: .97}, start: 92, end: 66},
            {selector: '.b-ai-insights', from: {x: small ? 16 : 36, y: small ? 30 : 60, scale: small ? .96 : .93}, start: 84, end: 46},
          ] : art.querySelector('.b-credit-visual') ? [
            {selector: '.b-credit-screen', from: {x: 0, y: small ? 24 : 48, scale: .97}, start: 90, end: 50},
          ] : art.querySelector('.b-user-center-visual') ? [
            {selector: '.b-user-center-screen', from: {x:0, y:small ? 24 : 48, scale:.97}, start:90, end:50},
          ] : art.querySelector('.b-lending-visual') ? [
            {selector: '.b-lending-screen', from: {x: 0, y: small ? 26 : 52, scale: .97}, start: 90, end: 54},
          ] : [
            {selector: '.b-brand-logo', from: {x: 0, y: small ? 14 : 24, scale: 1}, start: 92, end: 70},
            {selector: '.b-brand-website', from: {x: 0, y: small ? 28 : 56, scale: small ? .97 : .95}, start: 84, end: 46},
          ];
          entrances.forEach(({selector, from, start, end}) => {
            gsap.fromTo(art.querySelector(selector), {...from, opacity: 0}, {
              x: 0, y: 0, scale: 1, opacity: 1, ease: 'power2.out',
              scrollTrigger: {trigger: stage, start: `top ${start}%`, end: `top ${end}%`, scrub: .5, invalidateOnRefresh: true},
            });
          });
        });
      }, root);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);
  return root;
}

function CaseLink({href, children = 'View the case study'}) {
  return <a className="text-action" href={href}>{children}<ArrowRight size={17}/></a>;
}

function AiPreview() {
  return <figure className="b-story-figure b-ai-visual" aria-label="Source designs showing Customer Info beside AI-powered Customer Insights. All customer details are approved sample data.">
    <img className="b-ai-customer" src={customerCard} alt="Order Detail Customer Info panel with the Customer Insights action" width="722" height="474" loading="lazy"/>
    <img className="b-ai-insights" src={insightsPanel} alt="Customer Insights summarizing a sample customer's order history beside lifetime orders, average order value, credit rate, and cancellation rate" width="781" height="850" loading="lazy"/>
  </figure>;
}

function LendingPreview() {
  // A bounded, static excerpt of the existing dev-ready portfolio reconstruction.
  // It contains no applicant values, identifiers, underwriting logic, or lending advice.
  return <figure className="b-story-figure b-lending-visual" aria-label="Illustrative reconstruction of the application design, with all applicant values omitted">
    <div className="b-lending-screen">
      <aside className="b-lending-progress" aria-label="Example application progress">
        <span className="b-lending-mark" aria-hidden="true"/>
        <ol>{stages.map((stage, index) => <li key={stage} className={index === 1 ? 'is-active' : ''}>
          {index === 0 ? <CheckCircle size={15} weight="fill"/> : <span className="b-stage-dot"/>}<span>{stage}</span>
        </li>)}</ol>
      </aside>
      <div className="b-lending-workspace">
        <span className="b-lending-step">02 / 08</span>
        <h4>About your business</h4>
        <p className="b-lending-context">One section at a time, with your progress in view.</p>
        <div className="b-lending-fields">
          <span className="b-lending-group">Financials</span>
          <p>What is your business TIN?</p>
          <div className="b-lending-input"><span>Business TIN</span><span>••–•••••••</span></div>
          <span className="b-lending-help">Help me find it</span>
        </div>
      </div>
    </div>
    <figcaption>Adapted from the dev-ready design. All applicant values omitted.</figcaption>
  </figure>;
}

function BrandPreview() {
  return <figure className="b-story-figure b-brand-visual">
    <img className="b-brand-logo" src="/assets/deck-commerce-logo-public.svg" alt="Released Deck Commerce logo" width="201" height="47" loading="lazy"/>
    <img className="b-brand-website" src={brandWebsite} alt="The released Deck Commerce website applying the new identity to its order experience engine positioning" width="2880" height="1800" loading="lazy"/>
  </figure>;
}

const stories = [
  {
    id: 'ai', number: '02', category: 'Operational AI · Deck Commerce',
    title: 'Customer history, right where the order is.',
    body: 'I designed contextual AI guidance so service teams could investigate an order while keeping the workspace and decisions in their control.',
    evidence: 'Customer Insights and AI reporting launched. The contextual assistant reached internal beta and sales demos.',
    role: 'Product direction · End-to-end UX/UI', href: '/work/operational-ai-assistant', Visual: AiPreview,
  },
  {
    id: 'credits', number: '03', category: 'Complex workflow design · Deck Commerce',
    title: 'Precise credits. A simpler everyday task.',
    body: 'I worked with Product and Engineering to give customer service teams precise control over credits while keeping everyday adjustments simple.',
    evidence: 'Built, with positive customer feedback relayed by Deck’s customer service representatives.',
    role: 'Use-case definition · Interaction design · UX/UI', href: '/work/customer-credits', Visual: CreditProjectPreview,
  },
  {
    id: 'user-center', number: '04', category: 'Roles and permissions · Deck Commerce',
    title: 'Managing access across roles and environments.',
    body: 'I designed User Center to make account creation, role assignment, and location access understandable across a growing commerce platform.',
    evidence: 'Core profile and role-management workflows released, with continued implementation review.',
    role: 'Comparative research · Experience design · Implementation review', href: '/work/user-center-permissions', Visual: UserCenterPreview,
  },
  {
    id: 'lending', number: '05', category: 'Complex fintech UX · Lendesca',
    title: 'Eight stages. A clear next step.',
    body: 'I directed a responsive SBA application, defining progress navigation, contextual help, and reusable form and validation patterns.',
    evidence: 'WCAG guidance carried into the design and handoff across desktop and mobile.',
    role: 'Director of User Experience Design · Aug–Sep 2025', href: '/work/lendesca-lending', Visual: LendingPreview,
  },
  {
    id: 'brand', number: '06', category: 'Brand identity · Deck Commerce',
    title: 'An identity the whole company could use.',
    body: 'I led the rebrand from competitive research and executive concept reviews through logo systems, brand guidance, and reusable employee resources.',
    evidence: 'A launched identity, public website, and a Brandcenter for everyday use.',
    role: 'Logo concepts · Identity system · Creative direction', href: '/work/deck-brand-transformation', Visual: BrandPreview,
  },
];

const inspectionGalleries = {
  flagship: {title: 'Deck Commerce modernization', items: [
    {label: 'Aged open orders', src: '/assets/flagship/home-aged-orders.png', width: 1136, height: 650, alt: 'Aged Open Orders widget with color-coded daily queues'},
    {label: 'Action-needed queues', src: '/assets/flagship/home-folder.png', width: 1088, height: 686, alt: 'Configurable Folder widget showing Action Needed queues'},
    {label: 'Orders metric', src: '/assets/flagship/home-orders.png', width: 726, height: 440, alt: 'Orders metric comparing the current and previous 90 days'},
  ]},
  ai: {title: 'Operational AI', items: [
    {label: 'Customer Info', src: customerCard, width: 722, height: 474, alt: 'Order Detail Customer Info panel with the Customer Insights action'},
    {label: 'Customer Insights', src: insightsPanel, width: 781, height: 850, alt: "Customer Insights showing an approved sample customer's order history and lifetime metrics"},
  ]},
  credits: {title: 'Customer credits', items: [
    {label: 'Item price, tax, and resulting credit', width: 660, height: 420, render: () => <CreditProjectPreview/>},
  ]},
  'user-center': {title: 'User Center roles and permissions', items: [
    {label: 'Role and site access in the current environment', width:660, height:540, render:()=> <UserCenterPreview/>},
  ]},
  lending: {title: 'Guided lending', items: [
    {label: 'Application progress and guidance', width: 660, height: 420, render: () => <LendingPreview/>},
  ]},
  brand: {title: 'Deck Commerce identity', items: [
    {label: 'Released website', src: brandWebsite, width: 2880, height: 1800, alt: 'Released Deck Commerce website applying the identity to its order experience engine positioning'},
  ]},
};

function useProjectInspection() {
  const [inspection, setInspection] = useState(null);
  const closeInspection = useCallback(() => setInspection(null), []);
  const openInspection = (id, event) => setInspection({...inspectionGalleries[id], trigger: event.currentTarget});
  return {inspection, closeInspection, openInspection};
}

function FlagshipProject({onInspect}) {
  return <HomeFeature inspectionControl={<GraphicInspectButton label="Enlarge Deck Commerce product previews" onClick={event => onInspect('flagship', event)}/>} summary="I began with Store Center, designing the product and Figma design system in tandem. Later, I built and aligned Storybook as the shared source of truth for engineers." signals={
    <dl className="feature-signals b-feature-signals">
      <div><dt>7</dt><dd>Product areas<br/>launched</dd></div>
      <div><dt>8</dt><dd>Modernization<br/>workstreams</dd></div>
      <div className="feature-outcome"><dt>Shared foundations</dt><dd>Navigation, reusable patterns, and a reference engineers could build from.</dd></div>
    </dl>
  }/>;
}

function SupportingProjectStories({onInspect, showEvidence = true}) {
  return <div className="b-stories">{stories.map(({id, number, category, title, body, evidence, role, href, Visual}) => <article className={`b-story b-story--${id}`} id={id} key={id}>
    <div className="b-story-copy reveal">
      <p className="eyebrow"><span>{number}</span>{category}</p>
      <h3>{title}</h3><p className="b-story-description">{body}</p>{showEvidence && <p className="b-story-evidence">{evidence}</p>}
      <p className="b-story-role">{role}</p><CaseLink href={href}/>
    </div>
    <div className="b-story-art b-inspectable-art"><Visual/><GraphicInspectButton label={`Enlarge ${category.split(' · ')[0]} preview`} onClick={event => onInspect(id, event)}/></div>
  </article>)}</div>;
}

// Keep the Work index and homepage on the same approved source compositions,
// responsive layouts, scroll-linked entrances, and mobile inspection galleries.
export function WorkProjects() {
  const motionRoot = useSupportingMotion();
  const {inspection, closeInspection, openInspection} = useProjectInspection();
  return <div className="home-page home-b work-projects" ref={motionRoot}>
    <FlagshipProject onInspect={openInspection}/>
    <section className="b-supporting-work" aria-labelledby="b-supporting-title">
      <header className="section-intro reveal"><p className="eyebrow">Selected supporting work</p><h2 id="b-supporting-title">Clearer decisions, across different kinds of work.</h2></header>
      <SupportingProjectStories onInspect={openInspection}/>
    </section>
    {inspection && <HomeGraphicViewer {...inspection} onClose={closeInspection}/>}
  </div>;
}

// Grounded in approved career-bank entries D10, D03/D21, D04, and D24/D25.
// These are demonstrated capabilities, rather than a prescribed sequence of phases.
const workingApproach = [
  {
    Icon: TreeStructure, title: 'Question the product assumption.',
    body: 'For Deck’s Shopify integration, I mapped setup with solution engineers and refocused the first-phase design on connection status and guidance, deferring a self-service wizard the operating process couldn’t yet support.',
  },
  {
    Icon: Stack, title: 'Build a system engineers can use.',
    body: 'I designed Store Center and the Figma system together, then built the Storybook reference used in engineering onboarding. I also audited gaps between designed components and their React behavior.',
  },
  {
    Icon: Code, title: 'Make the target real in code.',
    body: 'I redesigned and coded Build Manager with AI assistance, giving engineers a working interface for comparing software builds and investigating failures. Engineering integrated and deployed it.',
  },
  {
    Icon: MagnifyingGlass, title: 'Test AI against the actual work.',
    body: 'I tested an order-management assistant against order records and exposed missing or contradictory details. I also defined evidence requirements and deferred actions that would change orders.',
  },
];

const workingMethod = [
  {
    Icon: TreeStructure, title: 'Map the rules and exceptions.',
    body: 'I map roles, information, permissions, dependencies, and recovery paths with the people who understand the operation. Unresolved rules become explicit questions for product and engineering.',
  },
  {
    Icon: Code, title: 'Prototype the uncertain part.',
    body: 'I use interactive prototypes or working code to test specific questions about behavior and feasibility. When AI is involved, I check its answers against source information.',
  },
  {
    Icon: Stack, title: 'Define the shared behavior.',
    body: 'I separate reusable patterns from the needs of one task, then document their states and behavior in shared sources of truth, such as Figma for design and Storybook for component behavior.',
  },
  {
    Icon: MagnifyingGlass, title: 'Review the working build together.',
    body: 'I review the running interface with engineers and product partners, including responsive behavior, validation, and recovery. Findings feed back into implementation priorities and shared documentation.',
  },
];

export function HomeB({pathname, Shell, recommendations, methodVersion = 'examples'}) {
  const motionRoot = useSupportingMotion();
  const {inspection, closeInspection, openInspection} = useProjectInspection();
  const isMethod = methodVersion === 'method';
  const approach = isMethod ? workingMethod : workingApproach;
  useEffect(() => {
    if (location.hash !== '#how-i-work') return;
    let active = true;
    document.fonts.ready.then(() => requestAnimationFrame(() => {
      if (!active) return;
      document.getElementById('how-i-work')?.scrollIntoView({behavior: 'instant'});
      ScrollTrigger.refresh();
    }));
    return () => {active = false;};
  }, [pathname]);
  const peerQuotes = recommendations.filter(({attribution}) => attribution.startsWith('Barry McCann') || attribution.startsWith('Derek Garnett'));
  return <div className="home-b-preview"><Shell pathname={pathname} wide><main id="main-content" className="home-page home-b" ref={motionRoot}>
    <section className="home-hero">
      <div className="home-copy reveal">
        <p className="eyebrow">Timothy Harrelson · Product design leader</p>
        <h1>I turn difficult software into clear products that users understand and teams can build on.</h1>
        <p className="hero-lede">With 10+ years across design, front-end development, and UX/UI, I modernize critical B2B SaaS workflows, shape useful AI experiences, and align design systems with production.</p>
        <p className="availability">Available for fully remote product design roles and select advisory work.</p>
        <div className="action-row"><a className="primary-action" href="#flagship-feature">View selected work <ArrowRight size={18} weight="bold"/></a><CaseLink href="/resume">Résumé</CaseLink></div>
        <a className="quiet-action" href="/contact?intent=role&walkthrough=true"><LockKey size={17}/>Request a private walkthrough</a>
      </div>
      <figure className="home-portrait reveal"><img src="/assets/tim-hero.jpg" alt="Timothy Harrelson smiling in a gray cap and blue shirt" width="1400" height="1400" loading="eager" fetchPriority="high"/></figure>
    </section>

    <FlagshipProject onInspect={openInspection}/>

    <section className="b-feature-quote reveal" aria-label="Customer adoption feedback">
      <p className="eyebrow">What customer success heard</p>
      <blockquote>
        <p>“Our customers loved how <strong>intuitive</strong> it was! At our first end-user training session, the customer's lead trainer opened by saying they <strong>didn't really need training</strong> because the product was so <strong>straightforward</strong>.”</p>
        <cite>Zulfiqar Ahmad · Chief Customer Officer · Deck Commerce</cite>
      </blockquote>
    </section>

    <section className="b-supporting-work" aria-labelledby="b-supporting-title">
      <header className="section-intro reveal"><p className="eyebrow">Selected supporting work</p><h2 id="b-supporting-title">Clearer decisions, across different kinds of work.</h2></header>
      <SupportingProjectStories onInspect={openInspection} showEvidence={false}/>
      <CaseLink href="/work">View all selected work</CaseLink>
    </section>

    <section className="b-peer-feedback" aria-label="Product and engineering recommendations">
      <p className="eyebrow reveal">From product and engineering</p>
      <div className="b-peer-quotes">{peerQuotes.map(({quote, attribution}) => <blockquote className="testimonial-card reveal" key={attribution}><p>“{quote}”</p><cite>{attribution}</cite></blockquote>)}</div>
    </section>

    <section className="b-method" id="how-i-work">
      <header className="section-intro reveal"><p className="eyebrow">How I work</p><h2>{isMethod ? 'Make the decisions explicit. Carry them into the build.' : 'I connect product judgment, design systems, and working code.'}</h2></header>
      <ul className="b-method-capabilities reveal">
        {approach.map(({Icon, title, body}) => <li key={title}><Icon className="b-method-marker" size={44} weight="light" aria-hidden="true"/><div><h3>{title}</h3><p>{body}</p></div></li>)}
      </ul>
      <div className="reveal"><CaseLink href="/about">More about how I work</CaseLink></div>
    </section>

    <section className="b-contact reveal">
      <p className="eyebrow">Start a conversation</p><h2>Let’s talk about the work.</h2>
      <div className="b-contact-paths">
        <div><h3>Considering me for a role?</h3><p>I can walk your team through the product decisions, system design, and implementation tradeoffs behind these projects.</p><a className="primary-action" href="/contact?intent=role&walkthrough=true">Request a portfolio walkthrough <ArrowRight size={18}/></a></div>
        <div><h3>Have a product challenge?</h3><p>I take on select advisory engagements focused on product direction and useful AI experiences.</p><CaseLink href="/contact?intent=consulting">Discuss a product challenge</CaseLink></div>
      </div>
    </section>
  </main></Shell>{inspection && <HomeGraphicViewer {...inspection} onClose={closeInspection}/>}</div>;
}

export function HomepageComparison({pathname}) {
  return <nav className="homepage-comparison" aria-label="Homepage version comparison">
    <span>Local review</span><a href="/" aria-current={pathname === '/' ? 'page' : undefined}><b>A</b> Current</a><a href="/home-b#how-i-work" aria-current={pathname === '/home-b' ? 'page' : undefined}><b>B1</b> Examples</a><a href="/home-b-v2#how-i-work" aria-current={pathname === '/home-b-v2' ? 'page' : undefined}><b>B2</b> Method</a>
  </nav>;
}
