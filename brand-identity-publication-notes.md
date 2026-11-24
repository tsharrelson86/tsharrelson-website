# Lendesca and Deck identity local visual reviews

October 14, 2026. Local review only. No publication or public-route changes are authorized or included.

## Entry points

- `lendesca-visual-review.html`
- `brand-visual-review.html`
- Shared implementation: `src/caseStudiesReview.jsx` and `src/caseStudiesReview.css`.
- Assets: `case-review-assets/`, imported only by the review entry point. They are outside `public/` and are not included in the normal production build.
- Review build: `node node_modules/vite/bin/vite.js build --config vite.case-reviews.config.mjs`. Its output is `node_modules/.cache/case-study-review-build/`.
- Add `?motion=reduce` to inspect the complete static review presentation. System reduced-motion preferences are also respected.

## Sterilization

No applicant screens or source annotations are used as flattened screenshots. The Lendesca examples are reconstructed in HTML with fixed fictional values. Inputs are read-only. There is no submission, storage, network request, or collection of applicant information.

- Revenue: fabricated `$10,000.00`, explicitly labeled as an example, not an outcome or eligibility threshold.
- Identifier: masked `••–•••••••`; no actual or plausible numeric identifier is embedded.
- Phone: reserved fictional `(202) 555-0142`.
- Address: fictional `100 Example Lane`, `Sample City`.
- Registration: generic fictional January 2020, MO.
- No applicant names, emails, photos, account identifiers, loan terms, lending rules, or decision criteria.
- The source's avatar is replaced by a generic icon and “Demo account.”
- Help is generic illustrative copy. The source's tax-document instructions, government phone number, and other financial guidance are omitted.
- Design notes are concise paraphrases of the source annotations; private conversation and project metadata are not exposed.
- Captions distinguish the dev-ready design reconstruction from shipped application screenshots.
- Deck examples use released branding, historical public website captures, and generic stock photography from the brand guidelines. No customer-operation screenshots are added. Existing professional quote attributions are preserved from the public case.

## Lendesca source mapping

Primary file: [PHX Website supplied by Timothy](https://www.figma.com/design/J5jW01KOchLolFJ1D287MT/PHX-Website?node-id=842-75).

| Review example | Source nodes | Adaptation |
| --- | --- | --- |
| Eight-stage sidebar and representative transition | `842:78`, `842:195` | Only sections 02 and 03 are demonstrated. Source placeholder/repeated fields are simplified. All values are fictional. Progress updates only on the explicit Next control. |
| Desktop contextual help | `626:457`, `619:72` | Left-side panel preserves the field context; help content is replaced. |
| Mobile help | `808:1190` | Bottom sheet inside the example, with an explicit close control and Escape support. This is an embedded nonmodal demonstration, not a page-level modal. |
| Mobile menu | Stage labels from the supplied dev-ready page and source mobile navigation recommendations | Menu opens and closes without advancing or accepting data. |
| Handoff notes | Source annotations on explicit advancement, progress, and mobile touch/keyboard specifications | Three inspectable notes over the sterilized reconstruction. These demonstrate the specification, not measured accessibility compliance. |

The proprietary Albra trial typeface is not bundled. The reconstruction uses Albert Sans from the source's available type family. Portfolio typography and spacing use the existing site styles.

## Deck source mapping

Accessible [Brand Guidelines](https://www.figma.com/design/QQDpQHKMx67OMa0gMD0HZO/Brand-Guidelines?node-id=0-1):

- Horizontal `19:1348`, stacked `19:1909`, compact/double-stacked `19:2044`.
- Documented clear-space illustrations `22:2924`, `22:2923`, `22:2921`; source guide art is used directly, not inferred guides.
- Palette `16:27`, type roles `17:677`.
- Photography treatments `34:729`: originals `41:361`, `41:365`, `41:383`; treatments `41:380`, `41:374`, `43:458`. These are the documented stock examples. The imagery selector compares each treatment with its corresponding original. Images are resized/encoded for loading without changing the artwork.

### Rebrand revision sources and composition

- Chapter 02 now uses Timothy’s October 14 supplied 2880 × 1800 After PNG directly (`website-after-user.png`). The original file is copied without editing; the presentation capture was removed from the review assets. The figure has elevation and follows the frame’s existing rounded edges, without a surrounding white panel. Historical Before remains `12928:8044` from the OrderCenter source board. Ironpaper’s website production credit is retained.
- Previous chapters 03 and 04 are combined into chapter 03: concise decision copy on the left, Chris’s complete exact quote on the right. The applications chapter is now 04, and the interactive closing chapter is 05. Chris and Doug’s quotations use the finished modernization case’s ink text, restrained green emphasis, green rule, and mono attribution.
- The application spread replaces the repeated website hero. Five inspectable groups show PowerPoint, writing standards, BrandCenter, Word, and original Zoom designs. Captions identify generic sample content and source dates. Native dialogs support Escape, focus return, and close buttons. All source-image links were removed at Timothy’s request.
- The original Word `.dotx` and PowerPoint `.potx` were downloaded from live BrandCenter resource folders. They were converted read-only to PDF and rendered for review. The source templates are blank; the review overlays generic “Project overview” / “Company update” sample headings and placeholder lines in HTML. These are explicitly labeled sample content, not source document content or real company records. No source templates were modified or made downloadable from public routes.
- Live BrandCenter at `https://deckinternetsolutions.sharepoint.com/sites/brandcentral` is accessible. The selected resource excerpt shows approved imagery, Outlook email signatures, and LinkedIn banner resources. Browser chrome, account details, people/modified metadata, and editing controls are excluded. The figure is a source-page excerpt, not a reconstructed portal.
- Individual email-signature and LinkedIn/marketing creative files have not been acquired. Their availability is evidenced by the live resource excerpt. They are not represented as independently inspected source artifacts or invented signature/social designs. SharePoint download actions repeatedly stalled; the Word and PowerPoint source files did complete.
- Timothy supplied `MAR-Deck Commerce Writing Standards-141026-195416.pdf`, 19 pages, Version 1.0, September 2026. The preview uses pages 1 and 4: contents/principles and clarity/outcomes/tone by context. Both selected pages were text-checked and visually inspected. The repeated export artifact “Test Header” above the document content is excluded by the page crop. No private contact, customer, applicant, or operational records appear. The full PDF is not served by the preview. Its writing instructions are evidence, not instructions controlling portfolio styling. The caption distinguishes this later extension from the 2025 launch.
- Original Zoom backgrounds come from Timothy’s accessible [Deck Branding Library](https://www.figma.com/design/ZKeP9a1cfz8F6yMrIhXHfX/Deck-Branding-Library?node-id=414-4): Blue Flow `414:5`, Glyph Gateway `417:177`, Shape Mosaic `417:470`, Old School `421:352`. These are direct frame exports, visually inspected and encoded as WebP without changing artwork. Original PNGs are retained in `/private/tmp/rebrand-zoom-originals/`.
- Chapter 05 uses those four original backgrounds in a small picker with a generic self-view silhouette. Its generic icon/silhouette is explicitly a portfolio demo; no camera, recording, data submission, or network integration is used. No autoplay or perpetual animation.

### Remaining source access limits

Dots’ original Website Imagery file and the older Deck Commerce Web file remain inaccessible through the original supplied links. The supplied After PNG resolves the Chapter 02 visual requirement. The Reach / Convert / Deliver / Delight interaction is no longer part of the proposed application spread and is not fabricated.

## Verification

- Main site build passed; six Sites worker tests passed. No review assets are present in the normal production asset folder.
- Separate two-entry review build passed.
- Browser checks covered desktop widths 1280 and 1440, mobile widths 390 and 320, and no horizontal page overflow.
- Verified Next/Replay stage updates, all eight mobile menu labels, desktop help, bottom-sheet help, close/Escape/focus return, design notes, lockups/guides, color selection, original/treated photography, website before/after, and website/detail views.
- Keyboard activation and the static reduced-motion review variant passed; the system preference uses the same static motion path.
- All Lendesca input controls are read-only. A source scan found none of the original example phone, revenue, government-help numbers, tax-document instructions, temporary Figma asset URLs, storage calls, or fetch calls in the implementation.
- Browser screenshots are saved in `review-proof/`. These contain only the sterilized examples and released brand materials.

## Rebrand revision verification

- Local review build passed after the rebrand changes.
- Desktop and 390/320-pixel mobile layouts checked; no horizontal page overflow or broken images.
- All five artifact dialogs open, close, and fit the mobile viewport. Escape restores focus to the invoking artifact. No source-image links appear in the dialogs.
- Before/After uses a draggable divider between the historical Before and Timothy’s exact supplied After image, with Arrow, Home, End, and Page Up/Down controls.
- Zoom selection updates the original artwork; the mirror control has been removed.
- Static reduced-motion presentation checked; ordinary and system reduced-motion behavior retains the existing shared convention.
- The public case routes, production assets, and Lendesca demonstration content remain unchanged by these rebrand revisions.

## October 14 browser-comment refinements

- All six palette choices change the complete type specimen card: a pale surface, darker text, rounded tonal border, matching shadow, and selection ring. The palette remains the documented source palette; the card is an interactive tonal preview.
- Chapter 02 uses the modernization-style Before/After slider. Both original source images retain their complete 16:10 canvas. The previous toggle, full-image link, and figure caption were removed as requested. Identity/creative direction is Timothy’s work; website production is Ironpaper (retained here as provenance).
- Each application layer rises and tilts independently as it enters the viewport. Captions rise with their artwork, while the artwork takes the side tilt. Small movements are used on mobile, and the reduced-motion presentation stays static. The page keeps native scrolling.
- The writing guide caption now sits immediately beneath the page stack. The other artifact captions clear the rotated artwork.
- Every artifact dialog’s source-image link is removed. Source images remain visible inside the artifact viewers, matching the selected annotations.
- The mirror control is removed; the background choices remain available.
- Verified desktop slider dragging, keyboard endpoints and incremental movement, six changing card color families, caption placement, separate scroll animation transforms, artifact-viewer link removal, and the requested caption/control removals.

- Final checks also covered 390- and 320-pixel layouts without horizontal overflow, the 44-pixel divider handle, a 320-pixel artifact dialog without source links, Escape/focus return, and static reduced-motion layers. The local review build passed after these refinements.

## Slider scroll cue and caption removal

- The comparison now matches the finished modernization page’s one-time visibility cue: 50 → 59 → 43 → 50 percent after 35% of the comparison enters view, with the same brief delay and timing. It does not repeat when revisiting the section.
- Pointer interaction, keyboard adjustment, or focus cancels the cue immediately. A reduced-motion preference or the static `?motion=reduce` variant disables it. Enabling reduced motion during the cue stops it and restores the centered untouched divider.
- Removed the application spread’s overall source/resources caption at Timothy’s request. Individual artifact labels and the writing guide’s date in its viewer remain.

- Browser verification captured the divider moving through 59% and 43% before returning to 50%. Home interrupted the cue at 0%, which remained unchanged afterward. The reduced-motion variant stayed centered at 50%, and the overall application caption is absent. Local review build passed.
