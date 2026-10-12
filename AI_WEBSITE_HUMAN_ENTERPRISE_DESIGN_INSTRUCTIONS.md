# AI Website & UI/UX Engineering Instructions
## Human-like, Enterprise-grade Design System and Existing Website Enhancement Playbook

**Purpose:** Give this document to an AI coding agent before it designs, audits, or improves an existing website or application. The agent must first understand the actual codebase and current content, then improve it without destroying useful work. The expected result is a credible, polished, accessible, production-minded product—not a generic AI-generated landing page.

**Applies to:** Existing websites, new pages within existing products, dashboards, SaaS apps, portals, ecommerce, service websites, admin panels, mobile-responsive web apps, and redesigns.

---

## 1. Core operating principles

1. **Inspect before changing.** Never start by replacing the whole UI or generating a new design from assumptions.
2. **Preserve and expand existing content.** Treat current website copy, pages, assets, SEO metadata, navigation, routes, and business logic as source material. Improve, organize, clarify, and expand them. Do not silently delete useful content.
3. **Use evidence, not assumptions.** Read the repository, inspect the running app where possible, and check the actual installed dependencies before selecting frameworks or components.
4. **Design for the real business and users.** Match the product's audience, industry, trust requirements, brand, and workflows.
5. **Make it feel human and intentional.** Avoid repetitive AI-style sections, empty marketing phrases, fake statistics, generic gradient backgrounds, excessive rounded cards, and decorative elements that do not serve a purpose.
6. **Enterprise quality means consistency and reliability.** Prioritize clear information hierarchy, predictable interactions, accessible controls, responsive layouts, maintainable components, performance, security, and complete states.
7. **Do not fake functionality.** Every visible button, link, form, menu, filter, tab, modal, and CTA must work or be clearly presented as unavailable/coming soon.
8. **Do not claim work was tested unless it was tested.** Report the checks actually performed and any remaining limitations.

---

## 2. Phase 0 — Repository and environment discovery (mandatory)

Before changing files, identify the actual project structure and runtime.

### 2.1 Inspect project files

- Read `README`, project instructions, agent instructions, contribution docs, and relevant architecture notes.
- Inspect `package.json` and the lockfile (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`, or equivalent).
- Identify the framework and version: Next.js, React, Vite, Vue, Svelte, Angular, Astro, Laravel/Inertia, or another stack.
- Identify routing, layouts, page templates, server/client boundaries, API routes, state management, and data-fetching patterns.
- Locate existing styles, design tokens, fonts, images, icons, reusable components, forms, and page content.
- Inspect `.env.example` or environment-variable documentation only. Never print, expose, or copy secret values.
- Determine build, lint, type-check, and test commands from project scripts.
- Check Git status and avoid overwriting unrelated user changes.

### 2.2 Check which UI frameworks and libraries are actually installed

Do not assume that a library is installed because it is popular or mentioned in a prompt. Check `package.json`, the lockfile, and the package manager's dependency tree where available. Check the existing source imports and component patterns too.

Potential categories to inventory (examples only; **not a claim that any are installed**):

| Category | Examples to check |
|---|---|
| CSS / utility styling | Tailwind CSS, Bootstrap, UnoCSS |
| Component systems | shadcn/ui, Radix UI, MUI, Ant Design, Chakra UI, Mantine, PrimeReact |
| Headless primitives | Radix UI, Headless UI, React Aria |
| Icons | Lucide, React Icons, Heroicons, Font Awesome |
| Animation | Framer Motion / Motion, GSAP, AOS |
| Charts | Recharts, Chart.js, ECharts, Nivo |
| Forms and validation | React Hook Form, Formik, Zod, Yup |
| Tables / data grids | TanStack Table, AG Grid |
| Dates | date-fns, Day.js, Luxon |
| Rich text / editors | TipTap, Lexical, Quill |
| Maps | MapLibre, Leaflet, Google Maps SDK |
| Testing | Vitest, Jest, Playwright, Cypress, Testing Library |
| Accessibility support | axe tools and accessibility testing packages |

Also inspect installed fonts, icon packages, existing component folders, theme providers, CSS variables, and any internal design system.

### 2.3 Dependency decision rules

- **Prefer installed, already-used, maintained libraries** when they meet the requirement.
- Reuse existing components before creating duplicates.
- Do not install a new framework just to style one page.
- Do not add overlapping component libraries without a clear reason.
- If a new dependency is necessary, explain the gap, expected benefit, bundle/security/maintenance impact, and ask for approval if project policy requires it.
- Never import a package without confirming it exists in the project or adding it correctly.
- Avoid mixing several styling systems in the same feature unless the architecture already requires it.
- Do not claim “all UI frameworks are used.” Use the smallest coherent set of tools that produces the best result.
- Record the discovered stack in the final report, including versions when available.

---

## 3. Phase 1 — Audit the existing website before redesign

Create a brief audit before implementation.

### 3.1 Page and route inventory

Discover routes through source files, router configuration, CMS content, sitemap, navigation, and links. Do not rely on the homepage alone.

For every page, record:

- Route and page title
- Purpose and target user
- Existing copy and key information
- Current layout and reusable components
- Calls to action and destination routes
- SEO title, description, canonical, headings, and structured data if present
- Forms, integrations, dynamic content, and authentication requirements
- Responsive or accessibility problems
- Content gaps and potential improvements
- Whether it is live, draft, deprecated, or uncertain

Build a route/page matrix. Preserve routes unless there is a deliberate migration plan with redirects and link updates.

### 3.2 Inspect actual UI states

Where possible, run the existing app and inspect desktop, tablet, and mobile views. Check:

- Homepage and every important route
- Header, footer, navigation, mobile menu
- Primary and secondary CTAs
- Forms, validation, success and error states
- Loading, empty, no-results, disabled, and failure states
- Authentication and permission states
- Long text, missing images, and unusually large datasets
- 404 and error pages
- Keyboard-only operation and focus visibility
- Browser console, network errors, and failed assets

If browser preview, screenshot, or runtime access is unavailable, state this limitation. Do not pretend visual inspection occurred.

### 3.3 Content inventory is mandatory

Before editing, preserve the current content in notes or a structured inventory. Identify:

- Accurate facts that must remain unchanged
- Copy that is outdated, unclear, duplicated, or thin
- Missing information users need to make a decision
- Existing internal links and relevant pages
- FAQs, service descriptions, case studies, product details, policies, contact information, and trust signals
- Existing SEO terms and metadata that should be retained or improved

Do not delete paragraphs or pages simply because a shorter AI-generated version looks cleaner.

---

## 4. Phase 2 — Understand the business and audience

Before choosing the visual direction, answer these questions from the repository, current site, supplied brief, and verified sources:

1. What does the organization offer?
2. Who is the primary audience and what are their goals?
3. What problem does the product solve?
4. What action should users take on each important page?
5. What evidence supports the organization's claims?
6. What makes the business different?
7. What are the brand colors, typography, logo rules, tone, and existing visual assets?
8. Which requirements are legal, privacy, security, or industry-specific?
9. Which content is verified, supplied by the user, inferred, or still unknown?

Do not invent awards, customer logos, reviews, client names, certifications, partner status, statistics, addresses, prices, guarantees, testimonials, or compliance claims. Use clearly marked placeholders only when a real value is not yet available.

---

## 5. Visual design direction — polished, human, enterprise-ready

### 5.1 Visual hierarchy

- Give each page one clear primary purpose.
- Use a deliberate order: page title, concise explanation, primary action, supporting information.
- Make important content visually prominent without making everything loud.
- Use consistent spacing, alignment, typography, component sizes, and interaction patterns.
- Establish a predictable grid and readable content widths.
- Use whitespace intentionally; avoid both cramped layouts and huge empty sections.
- Keep paragraphs and line lengths comfortable to read.
- Use contrast and weight before relying on color alone.

### 5.2 Avoid generic AI-generated design

Avoid these patterns unless the brand and task genuinely justify them:

- Every section placed in an identical rounded card
- A gradient hero followed by three cards, logo strip, testimonials, pricing, FAQ, and CTA on every site
- Excessive purple/blue gradients, glows, glassmorphism, neon borders, floating blobs, and decorative blur
- Huge headings that push useful information below the fold
- Random icon combinations or emojis used as professional icons
- Too many pills, badges, shadows, borders, and corner radii
- Fake dashboard metrics, fake customer logos, invented testimonials, or fabricated review counts
- Repeating the same claim in the hero, cards, banner, and footer
- Generic copy such as “revolutionizing the future,” “seamless solutions,” or “unlock your potential” without concrete meaning
- Animation that delays, distracts, or makes the site feel like a template
- Stock imagery that is unrelated to the business or repeated across every section

A premium design can be restrained. Use a visual effect only when it strengthens hierarchy, brand identity, feedback, or understanding.

### 5.3 Human-like content and presentation

- Write as a knowledgeable person from the actual organization, not as a generic AI marketing template.
- Prefer specific nouns, real service details, clear benefits, and direct language.
- Use varied section structures where appropriate: editorial layouts, comparison tables, timelines, process diagrams, image-text sections, feature lists, data tables, FAQs, or case studies.
- Use real project screenshots and genuine photography where available and permitted.
- Use authentic company details only after checking their source.
- Maintain a consistent voice across pages while allowing different pages to have different purposes.
- Remove repetitive phrasing and unsupported superlatives.
- Explain technical concepts in language appropriate to the audience.
- Keep empty-state and error messages helpful and calm.

### 5.4 Enterprise credibility

- Make company identity, contact details, services, and next steps easy to find.
- Include appropriate About, Services/Products, Contact, Privacy, Terms, and other required pages where relevant.
- Present process, deliverables, timelines, limitations, support arrangements, and pricing conditions clearly when known.
- Use genuine case studies or project examples; label internal demos and prototypes accurately.
- Ensure forms explain what happens after submission and show confirmation or failure.
- Avoid fake trust badges and unverified security/compliance claims.
- Use consistent footer details and working contact links.
- Design for content growth, localization, and future pages.

---

## 6. Design system — define before building many pages

Inspect the existing design system first. Improve it rather than replacing it without reason.

### 6.1 Tokens

Create or refine reusable tokens for:

- Brand and semantic colors: primary, secondary, accent, background, surface, border, text, muted text, success, warning, error, focus
- Typography: font family, scale, weight, line height, letter spacing
- Spacing scale
- Content widths and responsive breakpoints
- Radius scale
- Shadows and elevation
- Borders and focus rings
- Motion durations and easing
- Layering/z-index conventions

Prefer CSS custom properties or the existing theme mechanism. Avoid hard-coded, slightly different values scattered across every component.

### 6.2 Components

Reuse or establish coherent patterns for:

- Buttons and links
- Inputs, selects, textareas, checkboxes, radio groups, switches
- Form labels, help text, validation, and submission feedback
- Cards only where grouping is meaningful
- Page headers and section headers
- Navigation, breadcrumbs, tabs, pagination
- Tables, filters, search, sorting, bulk actions
- Dialogs, drawers, popovers, tooltips
- Alerts, badges, toasts, empty states
- Loading skeletons and progress indicators
- Footer, contact blocks, CTAs
- Error and not-found states

Every component should have documented variants and interaction states where appropriate. Do not build a one-off version of a component for each page.

### 6.3 Component quality checklist

For each interactive component, check:

- Default, hover, focus-visible, active, disabled, loading, success, and error states where applicable
- Keyboard navigation and sensible tab order
- Screen-reader labels and accessible names
- Touch target size
- Responsive behavior
- Long text and overflow
- Color contrast
- Consistent spacing and type
- Reduced-motion behavior for animation

---

## 7. Existing content must be expanded intelligently

The goal is to **improve and expand the current website**, not replace it with a minimal template.

### 7.1 Content preservation rules

- Keep existing factual content unless it is demonstrably incorrect, obsolete, duplicated, legally risky, or explicitly requested to be removed.
- Improve spelling, grammar, readability, headings, structure, and clarity without changing the meaning of business claims.
- Expand short pages with useful details, examples, process explanations, deliverables, FAQs, comparisons, and relevant cross-links.
- Do not add filler just to make pages longer.
- Preserve useful keyword context and page-specific SEO intent.
- Keep the original source text in version control or a content inventory when major rewrites are made.
- Flag contradictions and ask for clarification rather than silently choosing one version.

### 7.2 How to expand a thin page

Use only sections that help the user. A service page may include:

1. Clear service overview and intended audience
2. Problems solved and outcomes (avoid guarantees)
3. Scope and deliverables
4. Features or capabilities
5. How the process works
6. Technologies or methods, when relevant
7. Example use cases
8. Genuine portfolio/project evidence
9. FAQs based on real customer questions
10. Related services and useful internal links
11. Clear CTA and contact route

A product page, dashboard, article, or contact page needs a different structure. Do not force every template onto every page.

### 7.3 Content accuracy

Classify important statements internally as:

- **Verified:** Supported by the current source or confirmed records
- **User-provided:** Explicitly supplied by the business owner
- **Inferred:** Reasonable interpretation but not confirmed
- **Placeholder:** Requires real content before launch

Never turn an inference into a factual claim. Do not fabricate case studies, customers, prices, testimonials, statistics, certifications, or legal information.

---

## 8. Create new pages based on actual needs

Do not invent routes arbitrarily. Derive new pages from existing content, sitemap, navigation, business needs, search intent, and user journeys.

### 8.1 Page discovery workflow

1. Enumerate current routes.
2. Group pages by purpose and audience.
3. Identify duplicate, orphaned, thin, or missing pages.
4. Map services/products to individual detail pages when each has enough unique value.
5. Map FAQs, resources, portfolio, case studies, policies, and contact/support pages where appropriate.
6. Check whether a new page overlaps with an existing page.
7. Propose a sitemap with purpose, target keyword/topic, CTA, and source content for every proposed page.
8. Add approved pages using shared layouts and components.
9. Update navigation, footer, breadcrumbs, internal links, sitemap, and redirects where required.
10. Check every new route and every existing route after changes.

### 8.2 Page naming and route quality

- Use stable, readable, lowercase routes with hyphens where appropriate.
- Follow the project's existing routing conventions.
- Avoid duplicate routes, duplicate content, and thin programmatic pages.
- Ensure each page has a unique purpose, title, description, H1, and canonical behavior as appropriate.
- Do not break bookmarked URLs or external links.
- For changed routes, implement redirects where supported and update internal references.

---

## 9. Responsive design requirements

Design mobile-first or follow the project's established responsive approach. Test real content at representative widths, not just one screenshot.

Check at least:

- Small mobile: approximately 320–375 px
- Typical mobile: approximately 390–430 px
- Tablet: approximately 768–1024 px
- Desktop: approximately 1280–1440 px
- Wide desktop: approximately 1600 px where relevant

These are test targets, not mandatory breakpoints.

Requirements:

- No unintended horizontal scrolling.
- Navigation and menus work on touch and keyboard.
- Tables have a deliberate mobile treatment.
- Text does not overlap images, controls, or buttons.
- Forms are usable on mobile and trigger suitable keyboards when relevant.
- Content order remains logical when columns stack.
- Sticky elements do not obscure content or keyboard focus.
- Avoid fixed heights that clip text or translated content.
- Images use appropriate sizing, cropping, and responsive behavior.

---

## 10. Accessibility requirements

Aim for WCAG 2.2 AA where feasible and appropriate.

- Semantic HTML before custom ARIA.
- One clear page-level H1, with properly nested headings.
- Labels associated with form fields.
- Meaningful alt text for informative images; empty alt text for decorative images.
- Sufficient text and UI contrast.
- Visible focus indicators.
- Full keyboard operation.
- No keyboard traps.
- Accessible dialogs with focus management.
- Errors described in text and associated with fields.
- Do not use color as the only signal.
- Respect `prefers-reduced-motion`.
- Support zoom and text resizing.
- Test automated accessibility where tools are available, plus manual keyboard checks.

Do not add ARIA attributes unnecessarily or use ARIA to compensate for incorrect semantics.

---

## 11. Motion and micro-interactions

Use motion to communicate state, hierarchy, or cause and effect—not to decorate every element.

- Prefer subtle transitions for hover, focus, opening, closing, and loading.
- Use consistent durations and easing.
- Avoid large entrance animations on every scroll section.
- Avoid parallax or motion that harms reading, performance, or accessibility.
- Respect reduced-motion preferences.
- Ensure animation does not block interaction or hide content.
- Provide immediate feedback after actions.
- Use skeletons only when they accurately represent loading content.

---

## 12. Images, icons, typography, and assets

- Search the repository for existing logos, illustrations, screenshots, and brand assets before adding new ones.
- Preserve aspect ratios and use suitable responsive image techniques.
- Use optimized image formats and lazy loading where appropriate.
- Avoid stretching logos or using low-resolution assets.
- Use one coherent icon set already installed in the project.
- Avoid mixing emoji, several icon libraries, and custom SVG styles without a reason.
- Check font loading, fallback fonts, weights, and layout shifts.
- Use real screenshots of the product where they provide stronger evidence than decorative stock images.
- Respect licensing and asset permissions.
- Do not invent logos of partners, customers, or certifications.

---

## 13. SEO and content architecture

For public, indexable pages, inspect and improve as appropriate:

- Unique page titles and meta descriptions
- One clear H1 and meaningful heading structure
- Canonical URLs
- Open Graph and social preview metadata
- Sitemap and robots directives
- Internal links and breadcrumbs
- Image alt text and descriptive filenames where practical
- Structured data only when the content qualifies and the markup is accurate
- Redirects and 404 behavior
- Page speed and crawlability
- Duplicate, thin, or orphaned pages

Do not add fabricated schema data, fake reviews, false ratings, or unsupported business information. Do not accidentally index private dashboards, account pages, or sensitive routes.

---

## 14. Performance and production readiness

- Avoid unnecessary dependencies and oversized client bundles.
- Use server rendering or static generation when appropriate to the framework and existing architecture.
- Minimize layout shifts and optimize images/fonts.
- Avoid unnecessary re-renders and duplicated data requests.
- Use pagination, filtering, or virtualization for large datasets when needed.
- Handle network errors, timeouts, retries, and empty results deliberately.
- Avoid exposing API keys or secrets in client code.
- Review caching behavior and dynamic data requirements.
- Check console errors, broken links, missing assets, and failed requests.
- Do not remove useful features just to make a performance score look better.

---

## 15. Security and data handling

- Never expose secrets, tokens, private keys, database credentials, or sensitive environment values.
- Do not put secrets in frontend bundles.
- Validate untrusted input on the server as well as the client where applicable.
- Use safe output rendering; avoid unsafe HTML injection.
- Protect authenticated routes and enforce authorization server-side.
- Do not log personal data or credentials unnecessarily.
- Use CSRF protections and secure cookie settings where appropriate to the stack.
- Follow the existing authentication and authorization design unless a change is required and approved.
- Do not create fake login, payment, upload, or admin functionality.
- Preserve privacy notices and consent behavior.
- Do not claim the website is “fully secure” based only on a visual review.

---

## 16. Forms and interaction completeness

For every form, specify and implement:

- Required and optional fields
- Client-side validation and server-side validation where applicable
- Helpful inline error messages
- Loading/submitting state
- Duplicate-submit prevention
- Success confirmation
- Failure/retry behavior
- Accessible field labels and error associations
- Privacy note or consent where necessary
- Real submission destination/API behavior

For every button/link:

- Confirm its purpose.
- Confirm destination or action.
- Ensure it works with keyboard and touch.
- Do not use `href="#"` as a fake link.
- Do not use a button when a normal link is semantically correct.
- Do not present a visual element as interactive unless it is interactive.

---

## 17. Dashboard and SaaS-specific guidance

For applications and admin panels:

- Prioritize task completion over marketing visuals.
- Establish clear navigation, page titles, breadcrumbs, and contextual actions.
- Use consistent table, search, filter, sort, pagination, and bulk-action patterns.
- Show data freshness and meaningful units.
- Include loading, empty, error, permission-denied, and no-results states.
- Distinguish destructive actions and request confirmation when warranted.
- Keep important actions discoverable without clutter.
- Avoid charts that do not answer a specific question.
- Include accessible table alternatives or summaries for complex charts.
- Never fabricate KPI values or imply demo data is live production data.
- Handle role-based access and data visibility correctly.

---

## 18. E-commerce and service-business-specific guidance

When relevant, provide accurate and useful information about:

- Products/services and their scope
- Pricing or quote process
- Delivery, turnaround, installation, support, and limitations
- Refund, cancellation, warranty, and policy information when applicable
- Contact routes and response expectations when known
- Genuine product imagery, specifications, and availability
- Clear forms and next steps

Do not invent discounts, guarantees, availability, delivery times, customer ratings, or financial terms. Financial, medical, legal, energy, and other regulated claims need extra verification and appropriate disclaimers.

---

## 19. Implementation workflow

Follow this sequence for every substantial redesign.

### Step A — Baseline
- Record current routes and main features.
- Check Git status.
- Run the current app and available tests if possible.
- Capture baseline screenshots when tooling permits.
- Note existing errors before making changes.

### Step B — Audit
- Review all relevant pages, content, styles, components, and installed dependencies.
- Create a list of bugs, visual inconsistencies, content gaps, accessibility problems, and missing pages.
- Separate confirmed problems from subjective design opportunities.

### Step C — Plan
- Define user journeys and primary actions.
- Propose sitemap changes only where needed.
- Define the visual direction and reusable design tokens.
- Prioritize changes by user impact, risk, and effort.
- Identify files/routes likely to change.

### Step D — Build a representative page
- Start with one high-value page or shared shell.
- Implement the token system and reusable components.
- Verify the result before scaling patterns across the entire site.
- Avoid a full rewrite unless the architecture truly requires it.

### Step E — Expand
- Improve existing page content and structure.
- Add missing pages that serve real user needs.
- Reuse shared components while allowing page-specific layouts.
- Preserve meaningful original content, integrations, routes, and behavior.
- Update navigation, metadata, and internal links.

### Step F — Validate
- Run build, lint, type-check, tests, and accessibility checks that are available.
- Visit important routes.
- Test mobile, tablet, and desktop layouts.
- Test forms, menus, links, loading states, error states, and keyboard interactions.
- Inspect console and network errors if tooling permits.
- Compare with baseline to ensure existing functionality was not lost.

### Step G — Report
- Summarize what changed.
- List routes added/modified.
- State which dependencies/frameworks were discovered and used.
- List checks actually run and their results.
- Identify remaining issues, unverified content, and blockers.
- Mention any dependency added and why.
- Do not say “complete” when important routes or checks remain untested.

---

## 20. Definition of done

A redesign or enhancement is ready for review when:

- [ ] Existing routes and content have been inventoried.
- [ ] Useful original content is preserved and improved.
- [ ] New pages are justified by real content or user needs.
- [ ] Installed frameworks and UI libraries were inspected before use.
- [ ] The UI has a consistent, coherent design system.
- [ ] The design fits the actual brand and audience.
- [ ] The page does not look like a generic AI template.
- [ ] No unsupported business claims or fabricated data were introduced.
- [ ] All visible interactive elements have meaningful behavior.
- [ ] Loading, empty, error, and success states are handled where relevant.
- [ ] Mobile, tablet, and desktop layouts have been checked.
- [ ] Keyboard navigation, focus, labels, and contrast have been checked.
- [ ] SEO metadata and links have been reviewed for public pages.
- [ ] Performance and security basics have been considered.
- [ ] Available build/lint/type/test commands have been run or limitations reported.
- [ ] The final report is accurate about what was and was not tested.

---

## 21. AI agent working prompt

Use this block as the task prompt after supplying the repository and this instruction file:

> You are the senior product designer, UX researcher, frontend engineer, content architect, and quality reviewer for this project. First inspect the actual repository and current website. Do not immediately rewrite the UI.
>
> Inventory existing routes, pages, content, brand assets, components, styling rules, package versions, and installed UI frameworks/libraries. Identify the current architecture and available scripts. Reuse installed libraries and existing patterns where they are appropriate; do not assume a package exists and do not install unnecessary competing frameworks.
>
> Audit the existing design and functionality. Preserve useful content, business logic, SEO intent, URLs, and integrations. Expand thin or incomplete content with specific, useful information grounded in the current website and verified project materials. Propose new pages only when they fill a real content or user-journey gap. Avoid filler and fabricated claims.
>
> Improve the experience to feel human, intentional, premium, credible, accessible, and enterprise-ready. Avoid generic AI-template patterns, repetitive cards, excessive gradients, fake metrics, fake testimonials, and decorative UI without purpose. Build a consistent design system and reusable components, but let different pages use layouts that fit their content.
>
> Make all visible interactions work. Implement responsive behavior and relevant loading, empty, error, success, and disabled states. Respect accessibility, performance, security, and the existing stack. Do not break existing routes or user changes.
>
> Work in phases: baseline, audit, plan, representative page, implementation, content/page expansion, validation, final report. Run the checks available in this repository and report actual results. Clearly label unknowns and assumptions. Never claim a test, visual inspection, or dependency check was performed unless it actually was.

---

## 22. Suggested audit report format

At the end of the task, provide:

1. **Project detected:** framework, version, routing, styling, build tooling.
2. **Installed UI ecosystem:** actual installed frameworks/libraries and where used.
3. **Current state:** pages reviewed, key strengths, confirmed problems.
4. **Design decisions:** hierarchy, typography, spacing, colors, components, motion.
5. **Content work:** what was preserved, rewritten, expanded, or flagged for verification.
6. **Page work:** routes added, modified, retained, redirected, or left untouched.
7. **Functionality:** interactions and states implemented.
8. **Quality checks:** commands run and exact pass/fail status.
9. **Outstanding issues:** blockers, assumptions, missing assets, unverified facts.
10. **Next priorities:** the most valuable remaining improvements.

---

## 23. Important constraints

- Do not assume access to a live browser, production website, deployment system, or external accounts.
- Do not claim to have inspected the live site if only source files were available.
- Do not claim every installed framework was used; explain the chosen stack and rationale.
- Do not change the business identity, prices, policies, or legal statements without evidence or approval.
- Do not delete existing pages or content merely to simplify implementation.
- Do not silently replace the existing framework or architecture.
- Do not fabricate content to fill a page.
- If a requirement conflicts with the existing architecture, explain the trade-off and choose the least disruptive reliable solution.
- If the repository is incomplete, proceed with safe improvements and clearly list what cannot be verified.

**Success standard:** The finished website should look purpose-built for its organization, communicate clearly, feel trustworthy, behave consistently, work across screen sizes, retain its useful history, and remain maintainable by a real development team.
