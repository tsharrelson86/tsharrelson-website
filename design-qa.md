# Portfolio Design QA

**Final result: passed**

## Operational AI Section 02 interactive review · October 9, 2026

### Visual source and comparison

- Composition source: `/var/folders/hg/cdwk1w4d6q979gz69twgt4r80000gn/T/codex-clipboard-176c3e43-c6d1-46ed-8006-a1ed7e97130f.png` (2416 × 1688). The updated Assistant source is `section-02-deck-iq-assistant-user.png` (882 × 732).
- Rendered implementation: `http://127.0.0.1:5177/section-02-review.html`, inspected in the in-app browser at 1440 × 900, 885 × 954, 600 × 900, and 375 × 812 CSS pixels. The browser captures are inline in this task's review record; the browser tool does not return a persistent screenshot path.
- The 1440 × 900 final search state was compared with the supplied composition: left narrative, higher search panel, lower overlapping Assistant, open negative space, soft shadows, and legible first results align. The browser component intentionally replaces the static search raster; the supplied Assistant image is used directly. At narrower widths, the chapter stacks for reading, and the Assistant opens at full size when selected.

### Interaction and fidelity checks

- Fonts and copy: editorial chapter typography matches the existing site; the search uses product-style sans text. The Assistant image reads $475, matching Section 01.
- Spacing and imagery: no new enclosing figure box or vertical divider; the source Assistant image keeps its full frame and rounded `#f1f1f1` border. Desktop overlap leaves the first three matches readable and the full-results action identifiable.
- Color: warm paper, green chapter number, blue search highlights, and the Assistant's original purple accent remain distinct. No horizontal overflow was found at 375 or 600 CSS pixels.
- Interaction: the short sequence reaches a populated result; visitors can type a name or order number, see a no-match state, select an order, expand all seven sample matches, and replay by keyboard. A reduced-motion preference presents a static populated state.
- `npm run build`: passed. The review page remains local and is not the public route.

### Follow-up polish

- At phone width, the source Assistant text is small. The image is linked to a full-size view rather than redrawn or cropped.

**Final result: passed**

## Case-study evidence and walkthrough refinement · September 2, 2026

### Source visual truth

- Six browser annotations at 1100 × 998 requested stronger outcome language across four case studies, an unlocking hover state for private walkthroughs, and removal of the low-value “Outside the product” section.
- The connected Work Journal was checked before changing the brand outcome. It supports three strong finalists that prompted broader CEO input and immediate, enthusiastic company-wide adoption. It does not support a direct “I loved them all” quotation, an exact 100 percent adoption rate, or a 60-day timeframe.

### Changes

- Reframed the Deck modernization outcome as one of many qualitative signals.
- Updated Operational AI status and outcome copy to reflect successful first-phase launches and glowing reviews from independent software analysts.
- Updated Lendesca evidence to describe a successful launch in which many small-business applicants completed the application and secured loans.
- Replaced the low-value brand disclosure with the corroborated concept-selection and company-wide-adoption outcome.
- Added a locked-to-unlocked icon transition on private-walkthrough links for hover and keyboard focus.
- Removed the “Outside the product” heading and paragraph from About.

### Verification

- Desktop checks at 1100 × 998 confirmed the exact revised copy on all four case-study routes with zero horizontal overflow.
- The lock transition changes the closed icon from full to zero opacity and the open icon from zero to full opacity on hover.
- Mobile checks at 390 × 844 found zero horizontal overflow on all four case studies and About.
- No affected rendered route contains an em dash.
- Browser console: no warnings or errors on the checked routes.
- `npm run build`: passed.
- `npm run test:sites`: 4 of 4 passed.

**Final result: passed**

## Work-page annotation revision · September 2, 2026

### Source visual truth

- Browser annotations at 1100 × 998 identified five focused issues on `/work`: an all-caps hero, vertically misaligned hero actions, redundant supporting copy, jargon-heavy disclosure notes, and an impersonal private-walkthrough heading.
- State: public, unauthenticated Work route in the warm-paper theme.

### Changes

- Restored natural title case for the Work hero while preserving its display scale and editorial wrapping.
- Vertically centered the primary and quiet hero actions within the same action row.
- Removed the redundant opening sentence from the additional-work introduction.
- Rewrote both focused-decision disclosures in plain language and changed them from uppercase monospace labels to readable sentence-case serif notes.
- Retitled the private callout to “See how I make product decisions.”

### Verification

- Desktop browser check: 1100 × 998; hero title uses `text-transform: none`, both action centers align within one pixel, and no horizontal overflow is present.
- Mobile browser check: 390 × 844; hero title remains sentence case and no horizontal overflow is present.
- Both disclosure notes and the private-callout title were verified against the rendered page.
- `npm run build`: passed.
- `npm run test:sites`: 4 of 4 passed.

**Final result: passed**

## Portrait warmth and first-person voice revision · September 2, 2026

### Source visual truth

- Portrait source: `/Users/tsharrelson/Library/Mobile Documents/com~apple~CloudDocs/Job Hunting/Profile Images/tim_square.png`, 2403 × 2403 pixels.
- Before state: `design-qa-home-portrait-1100.png`, 1100 × 998, with the cooler original portrait treatment.
- Final state: `design-qa-home-warm-1100.png`, 1100 × 998, plus `design-qa-home-warm-390.png`, 390 × 844.
- The original portrait, before-state homepage, and final homepage were opened together in one comparison input.

### Decisions and fixes

- The final hero now uses the user-supplied `tim-hero-warm.png` directly. The asset is byte-for-byte identical to the attached 1254 × 1254 PNG, and the earlier CSS color filter has been removed so the supplied grade is not altered.
- [P1] The cool gray and blue portrait treatment conflicted with the warm paper background. The interim CSS grade was superseded by the user-supplied warm portrait, which now renders without any additional filter.
- A built-in identity-preserving image edit was tested and rejected because it changed facial and crop details. The live site continues to use the authentic source portrait; no generated likeness is used.
- [P1] Site-authored copy referred to Timothy in the third person on the homepage closing card, the contact intent option, the About metadata description, and the Lendesca evidence note. Rewritten in first person or direct second person as appropriate.
- Third-person wording inside attributed testimonials is preserved because it is quoted source material, not the site's narrative voice. Names in titles, navigation labels, metadata identity fields, accessibility labels, and the résumé are also preserved as identity rather than narrative third person.

### Verification

- `npm run build`: passed.
- `npm run test:sites`: 4 of 4 passed.
- Browser checks at 1100 × 998 and 390 × 844: portrait crop is intact and there is zero horizontal overflow after motion settles.
- Replacement asset loads completely at its natural 1254 × 1254 dimensions with `filter: none`.
- Homepage closing card reads `Looking to evaluate me for a role?` and its supporting copy uses `my product decisions`.
- Contact intent reads `I’m considering you for a role`.
- Lendesca evidence note begins `I report a successful launch`.
- The verified homepage remains open at `http://127.0.0.1:4173/`.

**Final result: passed**

## Browser annotation revision · September 1, 2026 · grid reliability and compact-diagram breakpoints

### Source visual truth

- Browser annotation captures in the current task at 1100 × 998 showed principle 01 remaining invisible, vertically misaligned 7/8 proof signals, and a compressed horizontal hero diagram.
- State: public homepage, warm-paper theme, 1100 × 998 CSS viewport at 1× density.

### Revised implementation evidence

- `design-qa-home-hero-column-1100.png`, 1100 × 998.
- `design-qa-feature-alignment-1100.png`, 1100 × 998.
- `design-qa-principles-complete-1100.png`, 1100 × 998.
- The annotated captures and revised screenshots were reviewed at the same viewport, state, crop scale, and density.

### Comparison history

- [P1] Principle 01 was present in the document but remained invisible because the card participated in overlapping reveal animations. Fixed by excluding repeated-card children from the general reveal and animating each principle grid once from its shared container. Post-fix evidence shows 01–04 visible in four equal 253-pixel columns.
- [P2] The 7 and 8 measures were centered as separate content stacks; the wrapped first label shifted its number upward. Fixed with identical 120-pixel tracks, top-aligned content, and single-line labels. Both signals now share the same container top, number top, label top, and 118-pixel height.
- [P2] The hero modernization diagram remained horizontal at 1100 pixels and compressed its nodes and labels. Fixed by applying the vertical compact-diagram pattern to both hero and flagship diagrams at 1180 pixels and below.

### Verification

- `npm run build`: passed.
- `npm run test:sites`: 4 of 4 passed.
- Browser at 1100 × 998: zero horizontal overflow; hero diagram reports column direction; all principles report visible opacity.
- Browser at 390 × 844: zero horizontal overflow; hero diagram remains vertical; principle content order remains 01, 02, 03, 04.
- The homepage was left open at 1100 × 998 for review.

**Final result: passed**

## Browser annotation revision · September 1, 2026 · emphasis, flagship simplification, and motion

### Source visual truth

- Current annotated homepage state captured before implementation at 1100 × 998:
  - `design-qa-before-feature-1100.png`
  - `design-qa-before-quotes-1100.png`
- The annotations identified three visible problems: testimonial emphasis was imperceptible, the flagship combined too many competing elements in an outdated four-card grid, and page motion was too subtle to register.

### Revised implementation evidence

- `design-qa-after-feature-1100.png`, 1100 × 998.
- `design-qa-after-quotes-1100.png`, 1100 × 998.
- `design-qa-after-feature-mobile.png`, 390 × 844.
- Source and revised captures were opened together in one comparison input at matching viewport, state, 1× density, and crop scale.

### Comparison history

- [P1] Quote emphasis used a synthetic serif weight that was indistinguishable at normal reading distance. Fixed by reducing each supporting quote to two emphasized phrases and rendering emphasis in the existing Roboto Condensed display family, weight 700, and dark green. The revised comparison makes every selected phrase immediately scannable without highlighting most of the sentence.
- [P1] The flagship relied on four pale-green cards that competed with the diagram and duplicated the surrounding narrative. Fixed by replacing the card grid with a single editorial proof strip: 7 product areas, 8 workstreams, and one concise result. The setup copy was reduced to one sentence.
- [P2] The diagram clipped at 1100 pixels and competed horizontally with the proof area. Fixed by moving the compact diagram to a vertical progression at widths through 1180 pixels while preserving the horizontal version on large desktop screens.
- [P2] Entry and scroll animation was technically present but visually negligible. Fixed with a sequenced hero entrance, a 52-pixel evidence-panel arrival, 28–38-pixel content movement, stronger diagram-node scale changes, staged connector reveals, and staggered proof/principle/path elements. All sequences finish and remain static; reduced-motion users bypass them.

### Fidelity surfaces

- Typography: display, body, and mono families are preserved. Quote emphasis now uses intentional family, weight, and color contrast rather than an imperceptible synthetic weight.
- Spacing and layout rhythm: the flagship is visibly shorter and clearer. The proof strip and diagram share a deliberate two-column relationship at tablet widths, then collapse without overflow on mobile.
- Colors and tokens: the existing paper, ink, green, and line tokens remain intact. Pale-green proof-card surfaces were removed from the flagship.
- Image and icon quality: the existing Phosphor-based diagram is preserved and remains crisp. No substitute assets or decorative approximations were introduced.
- Copy and content: the same approved public evidence is retained in fewer words; no new metric or confidential detail was added.

### Verification

- `npm run build`: passed.
- `npm run test:sites`: 4 of 4 passed.
- Browser: 1100 × 998 and 390 × 844; zero horizontal overflow.
- At 1100 pixels the compact diagram reports column direction. At 390 pixels the proof strip reports two equal numeric columns with the result spanning below.
- Computed quote emphasis: Roboto Condensed, weight 700, dark green (`rgb(3, 75, 54)`).
- Motion check confirmed the hero headline begins 28 pixels below at opacity 0 and resolves to its final position and opacity; the evidence panel begins 52 pixels to the right and resolves into place.
- The working homepage was left open at the annotated 1100 × 998 viewport.

**Final result: passed**

## Browser annotation revision · September 1, 2026 · tablet density and AI discovery

### Source visual truth

- Browser annotation captures in the current task at 1024 × 768 identified a horizontal compact diagram that no longer fit its narrow column, excess flagship copy, missing speaker attribution, weak testimonial scanability, and an overall wall-of-text impression.
- The existing warm-paper editorial system, sentence-case display typography, Phosphor icon family, public-evidence boundaries, and stacked section-header pattern remained the approved visual foundation.

### Implementation evidence

- `design-qa-home-1024-feature.png`, 1024 × 768.
- `design-qa-home-1024-testimonials.png`, 1024 × 768.
- `design-qa-home-1024-testimonial-grid.png`, 1024 × 768.
- `design-qa-home-mobile-feature.png`, 390 × 844.

### Comparison history

- [P1] The compact modernization diagram overflowed its narrow evidence column at 1024 pixels. Fixed by turning only the flagship compact diagram into a vertical progression at the tablet breakpoint; the desktop diagram remains horizontal.
- [P1] The flagship section repeated its story across the intro, body, and proof list. Fixed by replacing the long setup with one concise leadership sentence, one outcome sentence, and four shorter proof cards.
- [P1] The Vercel recommendation omitted the supplied speaker. Fixed with the exact attribution `Joe Desapio · Director of GTM Field Readiness · Vercel`.
- [P2] Long recommendations were difficult to scan. Fixed by applying genuine bold emphasis only to the strongest short evidence phrases in the lead quote and all four supporting quotes.
- [P2] The page felt static and text-heavy. Fixed with short scroll-triggered editorial reveals, sequenced diagram nodes, restrained icon entrances, and directional arrow movement. Reduced-motion preferences bypass the animation layer.
- [P2] Search and AI discovery relied on a browser title alone. Fixed with route-aware descriptions and canonicals, Open Graph and Twitter metadata, Person and WebSite structured data, a complete sitemap, and crawl rules that explicitly allow OAI-SearchBot without making a separate model-training policy choice.

### Fidelity surfaces

- Typography and hierarchy: the existing display, reading, and mono families are unchanged; reduced copy improves the intended hierarchy without shrinking core evidence.
- Layout and responsiveness: the flagship remains a two-column editorial composition at 1024 pixels, while the internal diagram becomes vertical. At 390 pixels the entire section becomes one column with no horizontal overflow.
- Motion: all movement is tied to entering content or a direct hover. No continuous decoration, parallax, or spectacle was introduced.
- Content: proof statements retain the approved claims and evidence boundaries; no new metrics or confidential details were added.
- Discovery: visible copy and structured data describe the same person and expertise. No nonstandard AI-only content file or unverifiable ranking promise was introduced.

### Verification

- `npm run build`: passed.
- `npm run test:sites`: 4 of 4 passed.
- Built output contains `robots.txt`, `sitemap.xml`, canonical metadata, social metadata, and valid JSON-LD source.
- Browser checks: 1024 × 768 and 390 × 844, zero horizontal overflow; compact flagship diagram reports column direction at the tablet breakpoint.
- The local preview remains available at `http://127.0.0.1:4173/`.

**Final result: passed**

**Reviewed:** September 1, 2026

## Comparison target

- Approved source: `design-qa-desktop.png`, 1440 × 1100, showing the selected Editorial Chapters direction for the Deck Commerce case study.
- Implementation: `design-qa-case-desktop-revised.png`, 1440 × 1100, showing `/work/deck-modernization` in the completed multi-route portfolio.
- The source and final implementation were opened together in one side-by-side comparison at the same viewport.

## Pass one

### P2 · The flagship hero had lost its contextual action

The approved source placed the private-walkthrough action directly beneath the case summary. The first expanded implementation omitted it, weakening the recruiter journey and drifting from the selected composition.

**Fix:** Restored the private-walkthrough action in the flagship hero and in the two supporting cases where deeper approved evidence may be discussed. The public brand case intentionally omits it.

### P2 · The chapter rail no longer reflected reading position

The first expanded implementation rendered the correct rail but held chapter 01 as the permanent active state.

**Fix:** Restored observed active-chapter behavior while keeping the rail hidden at narrow breakpoints, matching the approved responsive direction.

### P2 · The flagship headline wrapped more broadly than the source

The first expanded implementation allowed the case headline to use a wider measure, reducing the deliberate editorial stack from five lines to four.

**Fix:** Restored the approved 980-pixel headline measure and display scale. The final comparison retains the source's five-line structure and visual weight.

## Pass two

No remaining P0, P1, or P2 differences were found.

- Typography: Roboto Condensed display type, Cormorant Garamond reading text, and IBM Plex Mono labels remain consistent with the source.
- Layout and spacing: restrained page margins, linear dividers, editorial chapter structure, facts band, and CTA placement match the approved system.
- Color and surfaces: warm paper, dark ink, restrained green, dotted rules, and square-cornered actions remain consistent; no generic gradients, decorative blobs, or rounded-card treatment were introduced.
- Icons and evidence figures: the existing Phosphor icon family and approved raster evidence assets remain consistent. New supporting diagrams use the same accessible relationship pattern without reconstructing confidential screens.
- Content: public, private, launched, in-development, implementation-ready, and unverified states remain distinct.
- Interaction: global navigation, mobile menu, chapter links and active state, case-to-case sequence, consulting details, contact intent selection, and résumé download are present.
- Accessibility: semantic headings, labeled form controls, visible focus styles, keyboard-closeable mobile navigation, reduced-motion handling, printable résumé treatment, and no horizontal overflow at checked breakpoints.
- Responsiveness: desktop was checked at 1440 × 1100. Homepage, mobile menu, contact intent state, résumé route, and a supporting case were checked at 390 × 844 with no horizontal overflow.
- Browser console: no errors or warnings appeared across the public routes or 404 route.

Focused region review was not required beyond the matched first-screen comparison because the source's critical typography, header, CTA, chapter rail, and project-facts details were all readable at the comparison scale. Chapter figures and mobile navigation were inspected separately at their rendered sizes.

## Browser annotation revision · September 1, 2026

### Source visual truth

- Browser annotation captures in the current task at 1440 × 900 and 1100 × 998 identified the offset eyebrow/heading pattern as visually broken on Home, Work, and Consulting.
- Quote source: `/var/folders/hg/cdwk1w4d6q979gz69twgt4r80000gn/T/TemporaryItems/NSIRD_screencaptureui_izZzsz/Screenshot 2026-09-01 at 3.17.22 PM.png`, 624 × 940 pixels.
- State: public, unauthenticated portfolio routes in the warm-paper theme.

### Implementation evidence

- `design-qa-home-feature-revised.png`, 1440 × 900.
- `design-qa-home-section-header-revised.png`, 1440 × 900.
- `design-qa-home-testimonials-revised.png`, 1440 × 900.
- `design-qa-work-header-revised.png`, 1440 × 900.
- `design-qa-consulting-header-revised.png`, 1440 × 900.
- `design-qa-consulting-faq-revised.png`, 1440 × 900.
- `design-qa-home-mobile-revised.png`, 390 × 844.
- CSS viewport and captured pixel dimensions match at 1× density; no normalization was required.

### Comparison history

- [P1] Section-header composition looked disconnected because eyebrows occupied a separate left column from their headings. Fixed by replacing the split grid with one stacked editorial pattern everywhere: eyebrow, 16-pixel gap, heading, then optional supporting copy.
- [P2] Flagship proof rows resembled accordion controls because they used full-width dividers and leading plus marks. Fixed by using non-interactive two-column proof cards with explicit CheckCircle icons, a quiet green surface, and no hover or disclosure affordance.
- [P2] The requested Vercel recommendation was missing. Fixed by replacing the Eric Elves card with the supplied recommendation and role attribution. The source and implementation were opened together; the site intentionally preserves the compact four-column testimonial system instead of copying the source card's portrait and highlighted words.
- Post-fix evidence shows the Home, Work, and Consulting headers share the same left edge and vertical hierarchy. Desktop and mobile captures show no clipping or horizontal overflow.

### Fidelity surfaces

- Typography: existing Roboto Condensed, Cormorant Garamond, and IBM Plex Mono hierarchy is preserved; the stacked relationship and wrapping are now intentional.
- Spacing and layout rhythm: the repeated header component has a consistent 980-pixel measure on desktop, 16-pixel eyebrow gap, and single-column mobile fallback.
- Colors and tokens: existing paper, ink, green, green-soft, and line tokens are unchanged.
- Image quality and assets: no new image assets were introduced; existing Phosphor icons are used for proof cards.
- Copy and content: the supplied Vercel quote is reproduced without adding a speaker name that was not present in the source.

### Verification

- `npm run build`: passed.
- `npm run test:sites`: 4 of 4 passed.
- Browser console: no warnings or errors on the checked routes.
- Responsive check: 390 × 844, zero horizontal overflow; evidence cards collapse to one column.

**Final result: passed**

## Site-wide em-dash copy revision · September 2, 2026

### Source visual truth

- A browser annotation on the first focused-decision card requested removing em dashes from all website copy.
- The existing layout, hierarchy, evidence boundaries, and visual system were otherwise preserved.

### Changes

- Rewrote every affected sentence according to its meaning instead of replacing punctuation mechanically.
- Updated the Work-page focused-decision paragraph, homepage principle copy, testimonial punctuation, case-study narratives, About copy, page titles and social metadata, the 404 title, and the generated contact-email subject.
- Page-title separators now use a vertical bar.
- Recorded the no-em-dash rule as a durable copy convention in `AGENTS.md`.

### Verification

- Source audit found no remaining em dash characters or em dash entities in user-facing source files.
- Rendered-route audit covered Home, Work, all four case studies, About, Résumé, Consulting, Contact, and Privacy. No page body or document title contained an em dash.
- The annotated Work section was visually checked at 1100 × 998; the rewritten paragraph wraps cleanly without changing the two-column composition.
- Mobile checks at 390 × 844 confirmed the revised copy on Home, Work, About, and the flagship case.
- `npm run build`: passed.
- `npm run test:sites`: 4 of 4 passed.

**Final result: passed**

## Operational AI publication preparation · October 10, 2026

- Moved the approved five-chapter local review into the real `/work/operational-ai-assistant` route.
- Preserved exact selected graphics, layered depth, text/image entrance motion, interactive search, the full 700px desktop drawer at the viewport edge, quote reveal, and scroll-growing closing image.
- Removed chapter navigation from the shared hero across the work pages; retained section numbers and anchor IDs.
- Kept native scrolling and source-level reduced-motion support, including response to preference changes.
- Corrected source-style ordering during the port so the drawer has no desktop vertical padding and the closing image has no added divider. Hid the empty desktop visual container in mobile reflow so the readable assessment uses the full available width.
- Checked desktop at 1440×900 and mobile at 390×844. No horizontal overflow. All eight main source graphics loaded.
- Verified the desktop drawer is about 701px high and reaches the browser content edge; mobile uses readable assessment text with a link to the full source image.
- Verified search matching, no-match feedback, and selecting a sample order in the browser. No console warnings or errors on the checked page.
- Confirmed latest saved Site version 11 source matches local HEAD `420f514cbf43ef5218d4263738dca3f5c51e7e6d` before preparation.
- Build and six Sites hosting tests passed. Timothy explicitly approved publication on October 10, 2026; deployment verification follows the approved source handoff.
