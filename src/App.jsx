import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight, ArrowsClockwise, Atom, BookOpenText, BoundingBox, Briefcase,
  CalendarBlank, CaretDown, ChatCenteredText, CheckCircle, CheckSquare,
  CirclesThreePlus, Compass, DownloadSimple, FigmaLogo, FileText, GridFour,
  GridNine, Kanban, Layout, List, LockKey, LockKeyOpen, PaperPlaneTilt, SelectionAll,
  ShieldCheck, ShieldWarning, Sparkle, Square, SquaresFour, Strategy, User, X,
} from "@phosphor-icons/react";
import { OperationalAiContent } from "./OperationalAiCase.jsx";
import { FlagshipContent } from "./FlagshipCase.jsx";
import { BrandIdentityContent } from "./BrandIdentityCase.jsx";
import { LendescaContent } from './LendescaCase.jsx';
import { HomeFeature } from "./HomeFeature.jsx";
import { HomeB, HomepageComparison, WorkProjects } from "./HomeB.jsx";
import { resumeContent } from "./resumeContent.js";
import { aboutContent } from "./aboutContent.js";

import {CreditToolCase} from './CreditToolCase.jsx';
import {UserCenterCase} from './UserCenterCase.jsx';
import {userCenterPageMeta} from './userCenterPageMeta.js';
import {creditToolPageMeta} from './creditToolPageMeta.js';

gsap.registerPlugin(ScrollTrigger);
const EMAIL = "tsharrelson@gmail.com";
const resumePdfUrl = "/Timothy-Harrelson-Resume.pdf";

const metaByPath = {
  [creditToolPageMeta.path]: [creditToolPageMeta.title, creditToolPageMeta.description],
  [userCenterPageMeta.path]: [userCenterPageMeta.title, userCenterPageMeta.description],
  "/": ["Timothy Harrelson | Senior Product Designer", "Senior product designer focused on enterprise SaaS, operational AI, design systems, and complex workflows."],
  "/work": ["Selected Work | Timothy Harrelson", "Selected enterprise SaaS, operational AI, fintech, and brand-transformation work."],
  "/work/deck-modernization": ["Deck Commerce Modernization | Timothy Harrelson", "Shifting a fragmented legacy OMS toward a modular SaaS product system."],
  "/work/operational-ai-assistant": ["Operational AI Product Direction | Timothy Harrelson", "Defining useful, controlled AI experiences inside operational software."],
  "/work/lendesca-lending": ["Lendesca Lending Experience | Timothy Harrelson", "Directing an accessible eight-stage SBA lending experience."],
  "/work/deck-brand-transformation": ["Deck Commerce Brand Transformation | Timothy Harrelson", "A launched identity shaped by company values, product direction, and stakeholder response."],
  "/about": ["About | Timothy Harrelson", "I'm Tim, a senior product designer with 10+ years across design, front-end development, and UX/UI."],
  "/resume": ["Résumé | Timothy Harrelson", "Senior Product Designer · Enterprise SaaS and Design Systems. Experience, skills, tools, and credentials."],
  "/contact": ["Contact | Timothy Harrelson", "Discuss a role, private walkthrough, or focused AI product challenge."],
  "/privacy": ["Privacy | Timothy Harrelson", "How information shared through this portfolio is handled."],
};

const projects = [
  { number:"01", kind:"Flagship product transformation", title:"Modernizing Deck Commerce’s enterprise order management platform", problem:"A capable but fragmented legacy OMS had become difficult to navigate, inconsistent to extend, and too dependent on insider knowledge.", role:"UI/UX Designer II | Sole Product Designer · Period covered: July 2023–September 2026", proof:"Seven launched product areas across eight modernization workstreams", status:"Public case study · Deeper operational evidence remains private", href:"/work/deck-modernization" },
  { number:"02", kind:"Operational AI product direction", title:"Defining useful AI inside operational software", problem:"An assistant can easily become a disconnected chat surface that adds novelty without improving the work around it.", role:"Product direction and end-to-end UX/UI · Deck Commerce · Through September 2026", proof:"First phases launched with glowing reviews from independent software analysts", status:"Public overview · Additional phases remain in development", href:"/work/operational-ai-assistant" },
  { number:"03", kind:"Complex workflow design", title:"Precise credits. A simpler everyday task.", problem:"Customer service teams needed granular control without complicating everyday credits.", role:"Use-case definition · Interaction design · UX/UI", proof:"Built, with positive customer feedback relayed by Deck’s service representatives", status:"Public case study", href:"/work/customer-credits" },
  { number:"04", kind:"Roles and permissions", title:"Managing access across roles and environments.", problem:"Account creation, role assignment, and location access needed to remain understandable across a growing platform.", role:"Comparative research · Experience design · Implementation review", proof:"Core profile and role-management workflows released", status:"Public case study", href:"/work/user-center-permissions" },
  { number:"05", kind:"Complex fintech UX", title:"Directing an eight-stage SBA lending experience", problem:"A regulated application needed to collect sensitive information without leaving applicants uncertain about progress or requirements.", role:"Director of User Experience Design · August–September 2025", proof:"Successful launch supporting completed small-business loan applications", status:"Public narrative · Product details remain private", href:"/work/lendesca-lending" },
  { number:"06", kind:"Brand identity and creative direction", title:"Making Deck Commerce’s mission recognizable at a glance", problem:"I developed identity directions grounded in Deck’s values, product differentiation, and market context, then helped carry the chosen direction into its public launch.", role:"Logo concepts, identity system, and creative direction · Deck Commerce", proof:"Launched identity, public website, and cleared leadership feedback", status:"Public work · Internal concepts remain private", href:"/work/deck-brand-transformation" },
];

const A = ({href,children,className="",...props}) => <a href={href} className={className} {...props}>{children}</a>;
function Action({href,children,className="primary-action"}) { return <A href={href} className={className}><span>{children}</span><ArrowRight size={18} weight="bold"/></A>; }
function WalkthroughAction({children="Request private walkthrough"}) { return <A className="quiet-action walkthrough-action" href="/contact?intent=role&walkthrough=true"><span className="lock-swap" aria-hidden="true"><LockKey className="lock-closed" size={17}/><LockKeyOpen className="lock-open" size={17}/></span>{children}</A>; }

function Header({pathname}) {
  const [open,setOpen] = useState(false);
  const current = pathname.startsWith("/work") ? "/work" : pathname;
  useEffect(()=>setOpen(false),[pathname]);
  useEffect(()=>{ if(!open) return; const close=e=>e.key==="Escape"&&setOpen(false); addEventListener("keydown",close); return()=>removeEventListener("keydown",close); },[open]);
  return <header className="site-header">
    <A className="wordmark" href="/" aria-label="Timothy Harrelson, home"><span>Timothy Harrelson</span><small>Product design leader</small></A>
    <button className="menu-button" type="button" aria-expanded={open} aria-controls="primary-nav" onClick={()=>setOpen(!open)}>{open?<X size={22}/>:<List size={24}/>}<span>{open?"Close":"Menu"}</span></button>
    <nav id="primary-nav" className={open?"is-open":""} aria-label="Primary navigation">
      {[["/work","Work"],["/about","About"],["/contact","Contact"]].map(([href,label])=><A key={href} className={current===href?"is-current":""} href={href}>{label}</A>)}
      <A className={`resume-link ${current==="/resume"?"is-current":""}`} href="/resume">Résumé</A>
    </nav>
  </header>;
}
function Footer({locationLabel="St. Louis, Missouri"}){return <footer className="site-footer"><div><A href="/">Timothy Harrelson</A><span>Senior Product Designer</span></div><p>Enterprise SaaS, operational AI experiences, design systems, and complex workflows.</p><div className="footer-links"><a href={`mailto:${EMAIL}`}>{EMAIL}</a><a href="https://www.linkedin.com/in/tsharrelson/" target="_blank" rel="noreferrer">LinkedIn ↗</a><A href="/privacy">Privacy</A></div><small>{locationLabel} · Available for fully remote work<br/>© {new Date().getFullYear()} Timothy Harrelson</small></footer>}
function Shell({pathname,children,wide=false}){return <div className={`site-shell ${wide?"site-shell--wide":""}`}><Header pathname={pathname}/>{children}<Footer locationLabel={pathname==="/resume"?resumeContent.location:undefined}/></div>}

function Figure({label,children,className=""}){return <figure className={`evidence-figure ${className}`} aria-label={label}>{children}<figcaption className="sr-only">{label}</figcaption></figure>}
const Connector=()=> <ArrowRight className="connector" weight="thin" aria-hidden="true"/>;
function ModernizationFigure({compact=false}){return <Figure className={`context-figure ${compact?"is-compact":""}`} label="Fragmented product patterns becoming shared foundations and a modular platform"><div className="figure-node muted"><SelectionAll size={compact?54:80} weight="thin"/><span>Fragmented</span></div><Connector/><div className="figure-node"><Square size={compact?50:70} weight="thin"/><span>Shared rules</span></div><Connector/><div className="figure-node"><GridNine size={compact?60:86} weight="thin"/><span>Modular system</span></div></Figure>}
function AiFigure(){return <StepFigure label="Active workspace connected to a governed assistant and a user-controlled outcome" steps={[["Active workspace",Layout],["Governed assistant",ChatCenteredText],["User-controlled outcome",ShieldCheck]]}/>}
function BrandFigure(){return <StepFigure label="Strategic context becoming an identity system and public expression" steps={[["Strategic context",Strategy],["Identity system",CirclesThreePlus],["Public expression",Sparkle]]}/>}
function StepFigure({label,steps}){return <Figure className={`step-figure ${steps.length===3?"step-figure--three":""}`} label={label}>{steps.map(([name,Icon],i)=><div className="step-item" key={name}><Icon size={52} weight="thin"/><span>{name}</span>{i<steps.length-1&&<Connector/>}</div>)}</Figure>}
function LendingFigure(){return <Figure className="progression-figure" label="Eight-stage lending journey with persistent progress and validation"><ol>{[1,2,3,4,5,6,7,8].map(n=><li key={n}><span>{String(n).padStart(2,"0")}</span></li>)}</ol><div className="progression-legend"><Compass size={24}/><span>Persistent progress</span><ShieldCheck size={24}/><span>Validation + recovery</span></div></Figure>}
function IconGrid({label,items}){return <Figure className="icon-grid" label={label}>{items.map(([name,Icon])=><div key={name}><Icon size={38} weight="thin"/><span>{name}</span></div>)}</Figure>}
function BinaryFigure({label,left,right}){const [lName,LIcon]=left,[rName,RIcon]=right;return <Figure className="binary-figure" label={label}><div><LIcon size={62} weight="thin"/><span>{lName}</span></div><Connector/><div><RIcon size={62} weight="thin"/><span>{rName}</span></div></Figure>}
function SectionIntro({eyebrow,title,body}){return <header className="section-intro reveal"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{body&&<p>{body}</p>}</header>}

function ProjectRow({project,dominant=false}){return <article className={`project-row reveal ${dominant?"dominant":""}`}><div className="project-number">{project.number}</div><div className="project-main"><p className="eyebrow">{project.kind}</p><h3>{project.title}</h3><p>{project.problem}</p><A className="text-action" href={project.href}>View case <ArrowRight size={16}/></A></div><dl><div><dt>Role</dt><dd>{project.role}</dd></div><div><dt>Evidence</dt><dd>{project.proof}</dd></div><div><dt>Disclosure</dt><dd>{project.status}</dd></div></dl></article>}

export function Home({pathname,feature}){return <Shell pathname={pathname} wide><main id="main-content" className="home-page">
  <section className="home-hero"><div className="home-copy reveal"><p className="eyebrow">Timothy Harrelson · Product design leader</p><h1>I turn difficult software into clear products that users understand and teams can build on.</h1><p className="hero-lede">With 10+ years across design, front-end development, and UX/UI, I modernize critical B2B SaaS workflows, shape useful AI experiences, and align design systems with production.</p><p className="availability">Available for fully remote product design roles and select advisory work.</p><div className="action-row"><Action href="/work">View selected work</Action><A className="text-action" href="/resume">Résumé <ArrowRight size={16}/></A></div><WalkthroughAction children="Request a private walkthrough"/></div><figure className="home-portrait reveal"><img src="/assets/tim-hero.jpg" alt="Timothy Harrelson smiling in a gray cap and blue shirt" width="1400" height="1400" loading="eager" fetchPriority="high"/><figcaption className="sr-only">Portrait of Timothy Harrelson</figcaption></figure></section>
  {feature || <HomeFeature/>}
  <section className="section-block home-supporting-work"><SectionIntro eyebrow="Selected supporting work" title="Different problems. The same responsibility for clarity." body="Across every domain, I clarify the operating reality, define the product direction, and help teams build it credibly."/><div className="project-list">{projects.slice(1).map(p=><ProjectRow key={p.number} project={p}/>)}</div><Action href="/work" className="text-action">View all selected work</Action></section>
  <section className="section-block"><SectionIntro eyebrow="How I work" title="Clear direction, carried through the details."/><div className="principle-grid">{[["01","Start with the operating reality","Real workflows, research, support patterns, constraints, and the people closest to the work."],["02","Make the first phase credible","A practical first release and an expandable system that creates momentum without another dead end."],["03","Lead through expertise","Clear rationale and shared rules that align product, design, engineering, and QA."],["04","Stay accountable for quality","Hands-on prototyping, behavior documentation, implementation alignment, and UX/UI review."]].map(([n,t,b])=><article className="principle reveal" key={n}><span>{n}</span><h3>{t}</h3><p>{b}</p></article>)}</div><Action href="/about" className="text-action">More about how I work</Action></section>
  <Quote/>
  <section className="closing"><SectionIntro eyebrow="Start a conversation" title="Two reasons to reach out."/><div className="path-grid"><Path icon={Briefcase} title="Looking to evaluate me for a role?" body="Request a private walkthrough for a deeper discussion of my product decisions, leadership scope, and implementation tradeoffs." href="/contact?intent=role&walkthrough=true" action="Request a portfolio walkthrough"/><Path icon={Strategy} title="Working through an AI product decision?" body="Share the unresolved decision and current stage. I take on a small number of clearly bounded advisory engagements." href="/contact?intent=consulting" action="Discuss a focused engagement"/></div></section>
  </main></Shell>}
function Path({icon:Icon,title,body,href,action}){return <article className="path-card reveal"><Icon size={34} weight="thin"/><h3>{title}</h3><p>{body}</p><Action href={href} className="text-action">{action}</Action></article>}
const supportingQuotes = [
  { quote:<>Tim possesses a rare combination of simultaneously seeing the <strong>human work needing to be done</strong>, the ideal workflow for a user interface and the <strong>technical components</strong> to create that UI.</>, attribution:"Barry McCann · Product & Technology Executive" },
  { quote:<>Tim has an extraordinary ability to navigate any industry landscape, <strong>build strong relationships</strong>, and collaborate effectively. His talent isn’t just in his individual work, but also in how he <strong>elevates the work</strong> of those around him. His positive influence is undeniable, fostering collaboration and teamwork that drives project success.</>, attribution:"Joe Desapio · Director of GTM Field Readiness · Vercel" },
  { quote:<>Tim is a rare breed: an <strong>excellent team member</strong>, talented UI/UX designer, salesman, friend, counselor, <strong>leader and mentor</strong>. He’s also the guy you want to grab a cup of coffee with outside of work.</>, attribution:"Ryan Haider · Co-Founder and Chief Executive Partner · Lendesca" },
  { quote:<>The design system he put together for the dev team wasn't just a nice Figma file, it was <strong>organized and thought through</strong> in a way that made it <strong>genuinely easy to build</strong>.</>, attribution:"Derek Garnett · Full Stack Software Engineer" },
];
function Quote(){return <section className="testimonial-section"><blockquote className="endorsement reveal"><p>“Our customers loved how <strong>intuitive</strong> it was! At our first end-user training session, the customer's lead trainer opened by saying they <strong>didn't really need training</strong> because the product was so <strong>straightforward</strong>.”</p><cite>Zulfiqar Ahmad · Chief Customer Officer · Deck Commerce</cite></blockquote><div className="testimonial-grid">{supportingQuotes.map(({quote,attribution})=><blockquote className="testimonial-card reveal" key={attribution}><p>“{quote}”</p><cite>{attribution}</cite></blockquote>)}</div></section>}

export function Work({pathname, title="A few projects I’m proud of.", lede="These projects show how I approach software people rely on every day, from order management and lending to operational AI. Here’s what I worked through, the decisions I made, and what we shipped."}){return <Shell pathname={pathname} wide><main id="main-content" className="work-page"><PageHero eyebrow="Selected work" title={title} lede={lede}><Action href="/work/deck-modernization">Start with the flagship case</Action><WalkthroughAction children="Request a private walkthrough"/></PageHero><WorkProjects/><section className="section-block"><SectionIntro eyebrow="Additional selected work" title="Decisions that made the larger product more credible" body="I model complex states, reduce operational risk, and scope ambitious requests into credible first phases."/><div className="mini-grid mini-grid--single"><Mini title="Turning Shopify integration complexity into a phased readiness experience" body="I modeled installation through authorization, configuration, validation, activation, failure, and recovery. I then reshaped the direction around the real service model instead of preserving a misleading promise of instant self-service." disclosure="This simplified example leaves out confidential details. The launch status has not been confirmed."/></div></section><PrivateCallout/></main></Shell>}
function Mini({title,body,disclosure,href,linkLabel}){return <article className="mini-case reveal"><span>Focused decision</span><h3>{title}</h3><p>{body}</p><p className="disclosure">{!href&&<LockKey size={16}/>}{disclosure}</p><A className="text-action" href={href||"/contact?intent=role&walkthrough=true"}>{linkLabel||"Request a related walkthrough"} <ArrowRight size={16}/></A></article>}
function PrivateCallout(){return <section className="private-callout reveal"><LockKey size={42} weight="thin"/><div><p className="eyebrow">Controlled private walkthrough</p><h2>See how I make product decisions.</h2><p>For hiring teams evaluating complex product judgment, I offer a tailored walkthrough covering deeper workflow decisions, ownership boundaries, implementation tradeoffs, and approved confidential evidence. Access is never automatic.</p></div><Action href="/contact?intent=role&walkthrough=true">Request a private walkthrough</Action></section>}
function PageHero({eyebrow,title,lede,children,compact=false}){return <section className={`page-hero reveal ${compact?"compact":""}`}><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{lede&&<p className="hero-lede">{lede}</p>}{children&&<div className="action-row">{children}</div>}</section>}

function CaseHero({eyebrow,title,lede,facts,walkthrough=true}){return <><section className="case-hero reveal"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="hero-lede">{lede}</p>{walkthrough&&<Action href="/contact?intent=role&walkthrough=true">Request a private walkthrough</Action>}</div></section><dl className="project-facts reveal">{facts.map(({Icon,label,value})=><div key={label}><Icon size={30} weight="thin"/><dt>{label}</dt><dd>{value}</dd></div>)}</dl></>}
function Chapter({n,id,title,body,figure}){return <section className="chapter" id={id}><div className="chapter-copy"><span>{n}</span><div><h2>{title}</h2>{body.map(p=><p key={p}>{p}</p>)}</div></div>{figure}</section>}
function Ending({href,label,walkthrough=true}){return <section className="case-ending reveal"><div><p className="eyebrow">Continue</p><h2>{label}</h2></div><div><Action href={href}>Next story</Action>{walkthrough&&<WalkthroughAction/>}<A className="text-action" href="/work">Back to selected work</A></div></section>}
function DecisionFigure(){return <StepFigure label="Decision path from an isolated request to a shared product system" steps={[["Initial scope",BoundingBox],["System risk",ShieldWarning],["Reframing",ArrowsClockwise],["Shared patterns",GridFour]]}/>}
function SystemFigure(){return <Figure className="system-figure" label="Component behavior moving from Figma through Storybook, Jira, React, and UX/UI review"><div>{[["Figma",FigmaLogo],["Storybook",BookOpenText],["Jira",Kanban],["React",Atom],["UX/UI QA",CheckSquare]].map(([name,Icon],i)=><div className="system-item" key={name}><span><Icon size={40} weight="thin"/></span><small>{name}</small>{i<4&&<Connector/>}</div>)}</div><p><ArrowsClockwise size={18}/> Gaps become the next refinement target</p></Figure>}
function RoleFigure(){return <Figure className="role-figure" label="Responsibility expanding from experience modernization to system stewardship and direction"><img src="/assets/responsibility-growth.png" alt=""/><ol><li><strong>01</strong><span>Experience</span></li><li><strong>02</strong><span>System</span></li><li><strong>03</strong><span>Quality + direction</span></li></ol></Figure>}
function OutcomeFigure(){return <Figure className="outcome-figure" label="Explanation-dependent paths converging into an increasingly self-service experience"><img src="/assets/onboarding-convergence-arrow.png" alt=""/><div><span>Explanation-dependent</span><span>Increasingly self-service</span></div></Figure>}

const deckChapters=[
  {id:"context",title:"The product had outgrown its interface",body:["Years of capability had accumulated without a reliable experience system holding it together. Navigation relied on memory, patterns changed between pages, and terminology made the most sense to experienced insiders.","The opportunity was larger than a visual refresh: create a scalable SaaS foundation without stripping away the operational depth expert users depended on."],figure:<ModernizationFigure/>},
  {id:"decision",title:"The first Center became a proving ground",body:["An early dashboard and data-table request could have been solved as a one-off. Instead, I reframed it around reusable navigation, workflow, action, state, and component patterns.","The first Center became a working model for what would scale across the suite. It favored recognition over recall and gave users a persistent sense of place."],figure:<DecisionFigure/>},
  {id:"system",title:"The system had to survive implementation",body:["Recurring UI rework exposed a gap between the design system and production. With more engineers expected to contribute, I initiated a shared Storybook reference and led the gap analysis connecting Figma, component documentation, Jira requirements, production React, and UX/UI review.","Engineers used Storybook to implement features, check newer component versions, and resolve inconsistencies. I saw potential sprint blockers become brief alignment discussions in daily stand-ups.","Engineering owned production React implementation and QA owned formal release validation. I owned the target system, documentation, implementation requirements, and experience-quality review."],figure:<SystemFigure/>},
  {id:"role",title:"My responsibility expanded",body:["I joined Deck Commerce as a contract UX Designer in July 2023 and became a full-time UI/UX Designer II in January 2025. As the sole product designer, my scope expanded to end-to-end product design across the platform, including reusable product architecture, roadmap influence, component governance, and implementation quality.","That scope came to include defining how AI could support operational work while strengthening the system beneath it."],figure:<RoleFigure/>},
  {id:"outcome",title:"What changed",body:["Seven product areas are now launched across eight modernization workstreams. More importantly, recent customer launches have required substantially less guided onboarding.","The redesigned experience lets new customers orient themselves with far less explanation. This is one of the many qualitative signals that a complex operational product is finally revealing its structure."],figure:<OutcomeFigure/>},
];
const caseData={
  ai:{eyebrow:"Case study · Operational AI direction",title:"Defining useful AI inside operational software",lede:"A governed assistant should improve the work around it instead of becoming a disconnected destination.",facts:[{Icon:CalendarBlank,label:"Status",value:"First phases launched"},{Icon:User,label:"Role",value:"Product direction · End-to-end UX/UI"},{Icon:SquaresFour,label:"Scope",value:"Reporting · Insights · Chat · Tools"}],chapters:[
    {id:"fit",title:"Start with the work, not the interface",body:["The useful question was not how to add chat. It was where AI could improve a real decision or task, and where conventional interface patterns would remain clearer.","I mapped the moments where synthesis, explanation, or assisted action could add value without separating users from the operational context they needed."],figure:<AiFigure/>},
    {id:"boundary",title:"Define the boundary between AI and UI",body:["Conversation works well for ambiguous intent, exploration, and explanation. Explicit controls remain better for consequential choices, repeatable operations, and states users must verify.","The models let people remain oriented in the active product while using the assistant, then return results to a controlled workflow."],figure:<BinaryFigure label="Conversational exploration joined to explicit product controls" left={["Explore + explain",ChatCenteredText]} right={["Review + commit",CheckCircle]}/>},
    {id:"control",title:"Make context and control visible",body:["The experience needed clear boundaries around what the assistant knew, what it was proposing, and what would change if the user continued.","Confirmation, failure, recovery, and source context became primary product states rather than details after the happy path."],figure:<IconGrid label="Context, proposal, review, and recovery surrounding a user-controlled action" items={[["Context",Compass],["Proposal",Sparkle],["Review",ShieldCheck],["Recovery",ArrowsClockwise]]}/>},
    {id:"phase",title:"Turn direction into credible phases",body:["I partnered with product and engineering to translate experience decisions into coherent working models and achievable release phases.","The first few phases launched successfully and earned glowing reviews from independent software analysts. I framed the remaining opportunities as focused, achievable release phases."],figure:<Figure className="phase-figure" label="Working model progressing through validation toward phased delivery"><ol><li><span>01</span>Working model</li><li><span>02</span>Validate fit</li><li><span>03</span>Phase delivery</li></ol></Figure>},
  ],next:"/work/lendesca-lending",nextLabel:"Directing an eight-stage SBA lending experience",walkthrough:true},
  lending:{eyebrow:"Case study · Lendesca",title:"Directing an eight-stage SBA lending experience",lede:"Making a long, regulated process easier to understand across desktop and mobile.",facts:[{Icon:CalendarBlank,label:"Timeframe",value:"Aug–Sep 2025"},{Icon:User,label:"Role",value:"Director of User Experience Design"},{Icon:SquaresFour,label:"Scope",value:"Responsive · Eight stages · Accessible patterns"}],chapters:[
    {id:"journey",title:"A long application needed a visible shape",body:["The experience had to collect sensitive, regulated information without leaving applicants uncertain about progress, requirements, validation, or what would happen next.","I established an eight-stage architecture that made the overall journey visible while allowing each step to remain focused."],figure:<LendingFigure/>},
    {id:"system",title:"The interface needed a reusable grammar",body:["Persistent progress navigation, contextual help, input patterns, validation states, and recovery behavior became shared rules rather than page-by-page decisions.","That system gave the delivery team a consistent target across desktop and mobile."],figure:<IconGrid label="Reusable system of progress, help, input, and validation patterns" items={[["Progress",Compass],["Help",ChatCenteredText],["Input",FileText],["Validation",ShieldCheck]]}/>},
    {id:"alignment",title:"Direction had to create convergence",body:["I directed UX and UI, guided accessible interaction patterns, and helped stakeholders and the delivery team converge on one clear implementation target.","The value was not only consistency. The system gave the team a shared answer when the process became complex or ambiguous."],figure:<BinaryFigure label="Stakeholder and delivery constraints converging on an approved target" left={["Stakeholders",User]} right={["Shared target",CheckSquare]}/>},
    {id:"evidence",title:"Protect the evidence boundary",body:["The work produced an approved, responsive experience across desktop and mobile.","The experience launched successfully. Many small-business applicants were able to navigate the application, complete it with ease, and secure their loans."],figure:<PrivacyFigure publicText="Architecture + system direction" privateText="Screens + financial rules"/>},
  ],next:"/work/deck-brand-transformation",nextLabel:"Leading Deck Commerce’s brand and website transformation",walkthrough:true},
};
function PrivacyFigure({publicText,privateText}){return <Figure className="privacy-figure" label="Public evidence separated from permissioned material"><ShieldCheck size={74} weight="thin"/><div><strong>Public</strong><span>{publicText}</span></div><div><strong>Private</strong><span>{privateText}</span></div></Figure>}
function BrandCase({pathname}){return <Shell pathname={pathname} wide><main id="main-content"><BrandIdentityContent/></main></Shell>}

function DeckCase({pathname}){const facts=[{Icon:CalendarBlank,label:"Period covered",value:"Jul 2023–Sep 2026"},{Icon:User,label:"Role",value:"UI/UX Designer II | Sole Product Designer"},{Icon:SquaresFour,label:"Scope",value:"7 product areas · 8 workstreams"}];return <Shell pathname={pathname} wide><main id="main-content"><CaseHero eyebrow="Case study · Deck Commerce" title="Modernizing Deck Commerce’s enterprise order management platform" lede="How I led the shift from fragmented legacy UX to a modular SaaS product system." facts={facts}/><FlagshipContent/><Ending href="/work/operational-ai-assistant" label="Defining useful AI inside operational software"/></main></Shell>}
function SupportCase({pathname,data}){return <Shell pathname={pathname} wide><main id="main-content"><CaseHero eyebrow={data.eyebrow} title={data.title} lede={data.lede} facts={data.facts} walkthrough={data.walkthrough}/><div className="chapters">{data.chapters.map((c,i)=><Chapter key={c.id} n={String(i+1).padStart(2,"0")} {...c}/>)}</div><Ending href={data.next} label={data.nextLabel} walkthrough={data.walkthrough}/></main></Shell>}
function OperationalAiCase({pathname}){return <Shell pathname={pathname} wide><main id="main-content" className="review-page motion-review quote-review drawer-review operational-ai-case"><CaseHero eyebrow="Case study · Operational AI direction" title="Defining useful AI inside operational software" lede="A governed assistant should improve the work around it instead of becoming a disconnected destination." facts={[{Icon:CalendarBlank,label:"Status",value:"First phases launched"},{Icon:User,label:"Role",value:"Product direction · End-to-end UX/UI"},{Icon:SquaresFour,label:"Scope",value:"Reporting · Insights · Chat · Tools"}]}/><OperationalAiContent/><Ending href="/work/lendesca-lending" label="Directing an eight-stage SBA lending experience"/></main></Shell>}

function About({pathname}){return <Shell pathname={pathname}><main id="main-content">
  <PageHero eyebrow={aboutContent.eyebrow} title={aboutContent.title} lede={aboutContent.intro}/>
  <section className="longform standalone reveal">{aboutContent.sections.map(({heading,paragraphs})=><Fragment key={heading}><h2>{heading}</h2>{paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}</Fragment>)}</section>
  <Quote/>
  <section className="page-actions reveal"><Action href="/work">View selected work</Action><Action href="/contact" className="text-action">Get in touch</Action></section>
</main></Shell>}

function Resume({pathname}){
  const content = resumeContent;
  return <Shell pathname={pathname}><main id="main-content" className="resume-page">
    <section className="resume-header reveal"><div><p className="eyebrow">Résumé</p><h1>Timothy Harrelson</h1><p className="resume-title">{content.headline}</p><p>{content.positioning}</p><p>{content.location} · Fully remote · <a href={`mailto:${EMAIL}`}>{EMAIL}</a> · <a href="https://www.linkedin.com/in/tsharrelson/" target="_blank" rel="noreferrer">LinkedIn ↗</a></p></div><a className="primary-action" href={resumePdfUrl} download="Timothy-Harrelson-Resume.pdf"><DownloadSimple size={19}/> Download PDF résumé</a></section>
    <section className="resume-summary reveal"><h2 className="eyebrow">Summary</h2><p>{content.summary}</p></section>
    <ResumeSection title="Skills"><div className="resume-role"><p>{content.skills}</p><p>{content.tools}</p></div></ResumeSection>
    <ResumeSection title="Experience"><ResumeRole {...content.deck} secondary={content.deck.dates}/></ResumeSection>
    <ResumeSection title="Consulting experience"><ResumeRole {...content.consulting} secondary={content.consulting.dates}/></ResumeSection>
    <ResumeSection title="Additional experience">{content.additional.map(entry=><ResumeRole key={entry.company} {...entry} secondary={entry.dates}/>)}</ResumeSection>
    <ResumeSection title="Credentials"><ul>{content.credentials.map(credential=><li key={credential}>{credential}</li>)}</ul></ResumeSection>
    <section className="page-actions reveal"><Action href="/work/deck-modernization">View flagship work</Action><Action href="/contact?intent=role" className="text-action">Discuss a role</Action></section>
  </main></Shell>;
}
function ResumeSection({title,children}){return <section className="resume-section reveal"><h2>{title}</h2><div>{children}</div></section>}
function ResumeRole({company,role,secondary,bullets}){return <article className="resume-role"><h3>{company}</h3><p><strong>{role}</strong>{secondary&&<><br/><span>{secondary}</span></>}</p><ul>{bullets.map(b=><li key={b}>{b}</li>)}</ul></article>}

function Consulting({pathname}){return <Shell pathname={pathname}><main id="main-content"><PageHero eyebrow="Selective advisory work" title="AI Product Direction & Validation Sprint" lede="Turn a rough AI initiative into a trustworthy product direction, a practical Phase 1 MVP, and a phased path forward."><Action href="/contact?intent=consulting">Discuss a product challenge</Action></PageHero><section className="section-block"><SectionIntro eyebrow="Best fit" title="For established B2B software teams with an unresolved AI decision."/><div className="trigger-grid">{["The idea is driven by pressure rather than a validated need.","The experience feels like a chatbot attached to an existing product.","The team cannot determine what belongs in AI versus conventional UI.","A prototype exists, but there is no credible path to MVP and scale."].map((item,i)=><article className="trigger reveal" key={item}><span>0{i+1}</span><p>{item}</p></article>)}</div></section><section className="engagement reveal"><div><p className="eyebrow">The engagement</p><h2>Four to six weeks. One focused decision.</h2></div><div><h3>What I own</h3><ul className="evidence-list"><li>Product diagnosis and opportunity ranking</li><li>Target workflow and appropriate role of AI</li><li>Transparency, control, validation, failure, and recovery</li><li>Prototype target and practical Phase 1 MVP</li><li>Design-system and engineering implications</li><li>Phased roadmap and success measures</li></ul></div><div><h3>What is excluded</h3><p>Backend-model development, general production capacity, an open-ended design retainer, and a promise that every initiative should become an AI feature.</p></div></section><section className="investment reveal"><div><p className="eyebrow">Typical investment</p><strong>$12,500–$18,000</strong><span>Fixed fee · Scope dependent</span></div><p>The default is a tightly bounded four-week sprint. Broader stakeholder, research, validation, or prototype scope moves toward the upper end of the range.</p></section><section className="section-block faq"><SectionIntro eyebrow="Qualification" title="A good sprint begins with the right boundary."/>{[["Who needs to participate?","A product or business owner, an engineering partner who understands constraints, and access to the research, workflows, or prototype already shaping the initiative."],["What do we leave with?","A clear recommendation, an experience target, a credible first phase, and a phased path the team can evaluate together."],["Do you build the production feature?","No. I define the diagnosis, direction, framework, and key experience. Your team retains backend-model and production implementation ownership."]].map(([q,a])=><details className="reveal" key={q}><summary>{q}<CaretDown size={18}/></summary><p>{a}</p></details>)}</section><section className="page-actions reveal"><Action href="/contact?intent=consulting">Discuss a product challenge</Action><A className="text-action" href="/work/operational-ai-assistant">View relevant work <ArrowRight size={16}/></A></section></main></Shell>}

function Field({label,name,type="text",autoComplete,required=false}){return <label><span>{label}</span><input type={type} name={name} autoComplete={autoComplete} required={required}/></label>}
function Contact({pathname}){
  const walkthrough=new URLSearchParams(location.search).get("walkthrough")==="true";
  const [prepared,setPrepared]=useState(false);
  const submit=e=>{
    e.preventDefault();
    const data=new FormData(e.currentTarget);
    const name=data.get("name").trim();
    const subject=`${walkthrough?"Portfolio walkthrough":"Website inquiry"}: ${name}`;
    const body=`Name: ${name}\nEmail: ${data.get("email").trim()}\n\n${data.get("message").trim()}`;
    setPrepared(true);
    location.href=`mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  return <Shell pathname={pathname}><main id="main-content">
    <PageHero compact eyebrow="Contact" title="Tell me what you’re working on." lede="Hiring a designer or looking for help with a product? I’d like to hear about it. Share a little below."/>
    <form className="contact-form reveal" onSubmit={submit}>
      <div className="form-grid">
        <Field label="Name" name="name" autoComplete="name" required/>
        <Field label="Email" name="email" type="email" autoComplete="email" required/>
        <label className="wide"><span id="contact-message-label">Message</span><p className="contact-message-help" id="contact-message-help">Tell me about the role, project, or walkthrough you have in mind.</p><textarea name="message" rows="6" aria-labelledby="contact-message-label" aria-describedby="contact-message-help" defaultValue={walkthrough?"I’d like a portfolio walkthrough.":""} required/></label>
      </div>
      <div className="form-submit">
        <button className="primary-action" type="submit"><PaperPlaneTilt size={19}/> Continue in email</button>
        <p>This opens a draft in your email app for you to review and send. Please leave out confidential information.</p>
        {prepared&&<p role="status">If your email app didn’t open, email <a href={`mailto:${EMAIL}`}>{EMAIL}</a> directly.</p>}
      </div>
    </form>
    <p className="direct-contact reveal">Prefer email directly? <a href={`mailto:${EMAIL}`}>{EMAIL}</a> · I typically respond within two business days.</p>
  </main></Shell>;
}
function Privacy({pathname}){return <Shell pathname={pathname}><main id="main-content"><PageHero compact eyebrow="Privacy" title="A simple contact path should have a simple privacy explanation."/><section className="longform standalone reveal"><h2>Information you choose to share</h2><p>The Contact page prepares an email in your own email application. This portfolio does not transmit or store the form contents in a website database.</p><h2>How contact information is used</h2><p>Information you email is used only to evaluate and respond to your inquiry, continue a role or consulting conversation, or arrange an appropriate private portfolio walkthrough.</p><h2>Confidential information</h2><p>Please do not send customer data, proprietary product material, credentials, financial records, or other confidential information through the initial inquiry.</p><h2>Analytics</h2><p>No analytics or advertising trackers are included in this portfolio build.</p><h2>Contact</h2><p>Questions can be sent to <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p></section><section className="page-actions reveal"><Action href="/contact">Return to Contact</Action><A className="text-action" href="/">Return Home</A></section></main></Shell>}
function NotFound({pathname}){return <Shell pathname={pathname}><main id="main-content"><section className="not-found reveal"><span>404</span><p className="eyebrow">Page not found</p><h1>This route does not lead to a case study.</h1><p>The work is still here. Start with the selected portfolio or return home.</p><div className="action-row"><Action href="/work">View selected work</Action><A className="text-action" href="/">Return Home</A></div></section></main></Shell>}

function setMeta(selector,attribute,value){document.querySelector(selector)?.setAttribute(attribute,value)}
export function useMotion(pathname){
  const ref=useRef(null);
  useEffect(()=>{
    scrollTo(0,0);
    const isHomeB=import.meta.env.DEV&&["/home-b","/home-b-v2"].includes(pathname);
    const meta=isHomeB?[`${pathname==="/home-b-v2"?"Homepage B2: Method":"Homepage B1: Examples"} | Timothy Harrelson`,metaByPath["/"][1]]:metaByPath[pathname]||["Page not found | Timothy Harrelson","Return to selected work."];
    const canonical=`https://tsharrelson.com${pathname==="/"||isHomeB?"":pathname}`;
    document.title=meta[0];
    setMeta('meta[name="robots"]',"content",(pathname==="/consulting"||isHomeB)?"noindex,nofollow":"index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1");
    setMeta('meta[name="description"]',"content",meta[1]);
    setMeta('link[rel="canonical"]',"href",canonical);
    setMeta('meta[property="og:title"]',"content",meta[0]);
    setMeta('meta[property="og:description"]',"content",meta[1]);
    setMeta('meta[property="og:url"]',"content",canonical);
    setMeta('meta[name="twitter:title"]',"content",meta[0]);
    setMeta('meta[name="twitter:description"]',"content",meta[1]);
    if(pathname==="/resume"){
      const script=document.querySelector('script[type="application/ld+json"]');
      if(script){const schema=JSON.parse(script.textContent);const person=schema["@graph"]?.find(item=>item["@type"]==="Person");if(person?.address){person.address.addressLocality="Troy";script.textContent=JSON.stringify(schema);}}
    }
  },[pathname]);
  useLayoutEffect(()=>{
    if(matchMedia("(prefers-reduced-motion: reduce)").matches||new URLSearchParams(location.search).get("motion")==="reduce")return;
    const ctx=gsap.context(()=>{
      const intro=gsap.timeline({defaults:{ease:"power3.out"}}).from(".site-header",{autoAlpha:0,y:-16,duration:.5});
      if(pathname==="/"||(import.meta.env.DEV&&["/home-b","/home-b-v2"].includes(pathname))){
        intro.from(".home-copy > *",{autoAlpha:0,y:28,duration:.66,stagger:.09},"-=.12")
          .from(".home-portrait",{autoAlpha:0,x:52,clipPath:"inset(0 0 18% 0)",duration:.9},"-=.55")
          .from(".home-portrait img",{scale:1.07,duration:1.05,ease:"power2.out"},"-=.72");
      }else if(pathname!=="/work/deck-brand-transformation"){
        intro.from("main > :first-child",{autoAlpha:0,y:34,duration:.72},"-=.16");
      }
      gsap.utils.toArray("main .reveal").filter(element=>!element.closest(".home-hero")&&!element.matches(".principle,.path-card")).forEach(element=>gsap.from(element,{autoAlpha:0,y:38,duration:.78,ease:"power3.out",scrollTrigger:{trigger:element,start:"top 86%",once:true}}));
      gsap.utils.toArray(".context-figure").filter(figure=>!figure.closest(".home-evidence")).forEach(figure=>{
        const trigger={trigger:figure,start:"top 84%",once:true};
        gsap.from(figure.querySelectorAll(".figure-node"),{autoAlpha:0,scale:.74,y:20,duration:.62,stagger:.16,ease:"back.out(1.45)",scrollTrigger:trigger});
        gsap.from(figure.querySelectorAll(".connector"),{autoAlpha:0,scaleX:0,duration:.48,stagger:.18,transformOrigin:"left center",ease:"power2.out",scrollTrigger:trigger});
      });
      gsap.utils.toArray(".feature-signals,.principle-grid,.path-grid").forEach(group=>gsap.from(group.children,{autoAlpha:0,y:26,duration:.62,stagger:.09,ease:"power2.out",scrollTrigger:{trigger:group,start:"top 89%",once:true}}));
      gsap.utils.toArray(".path-card > svg").forEach(icon=>gsap.from(icon,{autoAlpha:0,scale:.62,rotate:-12,duration:.52,ease:"back.out(1.8)",scrollTrigger:{trigger:icon,start:"top 92%",once:true}}));
      const homeDashboard=ref.current.querySelector('.home-dashboard-image');
      if(homeDashboard)gsap.fromTo(homeDashboard,{y:28,scale:.96,opacity:.65},{y:0,scale:1,opacity:1,ease:'none',scrollTrigger:{trigger:homeDashboard.closest('figure'),start:'top 88%',end:'top 40%',scrub:.6}});
      ScrollTrigger.refresh();
    },ref);
    return()=>ctx.revert();
  },[pathname]);
  return ref;
}
export function App(){const pathname=location.pathname.replace(/\/$/,"")||"/";const ref=useMotion(pathname);let page;if(pathname==="/")page=<HomeB pathname={pathname} Shell={Shell} recommendations={supportingQuotes} methodVersion="method"/>;else if(import.meta.env.DEV&&["/home-b","/home-b-v2"].includes(pathname))page=<HomeB pathname={pathname} Shell={Shell} recommendations={supportingQuotes} methodVersion={pathname==="/home-b-v2"?"method":"examples"}/>;else if(pathname===userCenterPageMeta.path)page=<UserCenterCase pathname={pathname} Shell={Shell}/>;else if(pathname===creditToolPageMeta.path)page=<CreditToolCase pathname={pathname} Shell={Shell}/>;else if(pathname==="/work")page=<Work pathname={pathname}/>;else if(pathname==="/work/deck-modernization")page=<DeckCase pathname={pathname}/>;else if(pathname==="/work/operational-ai-assistant")page=<OperationalAiCase pathname={pathname}/>;else if(pathname==="/work/lendesca-lending")page=<Shell pathname={pathname} wide><main id="main-content"><LendescaContent/></main></Shell>;else if(pathname==="/work/deck-brand-transformation")page=<BrandCase pathname={pathname}/>;else if(pathname==="/about")page=<About pathname={pathname}/>;else if(pathname==="/resume")page=<Resume pathname={pathname}/>;else if(pathname==="/contact")page=<Contact pathname={pathname}/>;else if(pathname==="/privacy")page=<Privacy pathname={pathname}/>;else page=<NotFound pathname={pathname}/>;return <div ref={ref}>{page}{import.meta.env.DEV&&["/","/home-b","/home-b-v2"].includes(pathname)&&<HomepageComparison pathname={pathname}/>}</div>}
