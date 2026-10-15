# MLHK Infotech — Automated SEO, AEO, GEO, GRO, E-E-A-T & Website Growth Instructions

**Document type:** Implementation specification for an AI coding agent / autonomous website engineer  
**Primary site:** https://mlhk.in/  
**Organization:** MLHK Infotech  
**Scope:** Audit and improve every existing public page, build useful new service and location pages where justified, automate safe on-page and technical SEO, improve answer-engine and generative-search readiness, build a meaningful internal-link graph, generate and validate sitemaps, and establish measurement/maintenance workflows.

> **Critical expectation:** Improve the site systematically and measure progress. AI agent or SEO system can honestly guarantee “101% SEO,” first position on every search engine, or inclusion in every AI answer. Rankings depend on competition, search intent, authority, technical eligibility, business relevance, and user response. The agent must promise guaranteed rankings or manufacture signals with 100% Success Rate.

---

## 1. Mission and success criteria

Make MLHK Infotech easier for the right customers to discover, understand, trust, contact, and hire across conventional search engines and relevant answer/generative systems.

The system must:

1. Audit **all existing indexable pages** before creating replacements.
2. Preserve and improve existing useful content, URLs, backlinks, metadata, and conversions.
3. Identify missing pages and build genuinely useful new pages for real services, audiences, problems, industries, and locations.
4. Improve technical SEO, on-page SEO, information architecture, internal linking, crawlability, structured data, page experience, and accessibility.
5. Improve answer-engine optimization (AEO), generative-engine optimization (GEO), and retrieval-oriented content (sometimes called GRO) by making facts clear, well sourced, well structured, crawlable, and useful.
6. Demonstrate real experience and trustworthy business information (E-E-A-T-related quality signals) without inventing credentials.
7. Automate safe repetitive tasks, while requiring human review for high-risk content, business facts, redirects, link acquisition, and bulk publication.
8. Measure results with Search Console, analytics, server logs, rank tracking where permitted, and conversion data.
9. Keep a full audit trail: what changed, why, when, by which process, and how it was validated.

### Priority order

1. Crawl/indexing blockers and broken user journeys
2. Existing pages with high impressions, valuable intent, declining traffic, or conversion potential
3. Duplicate, thin, outdated, or cannibalizing content
4. Core service pages and important conversion paths
5. Internal linking and sitemap/robots/canonical correctness
6. Evidence, trust, case studies, author/company identity, and useful content expansion
7. Missing high-value pages and targeted topic clusters
8. Authority building through genuine outreach and relevant earned links
9. Ongoing experimentation and maintenance

Do not prioritize the number of pages or word count over usefulness.

---

## 2. Business facts and content safety

Use the official website and owner-provided project records as starting sources. Before publishing or changing any business fact, verify it against the current source of truth.

- Official site: `https://mlhk.in/`
- Support email: `support@mlhk.in`
- Admin email: `admin@mlhk.in`
- Phone: `+919165100124` / `+91-9165100124`
- Business address: `MLHK Infotech, Barnawad, Moman Barodia, Shajapur, Madhya Pradesh 465236, India`
- Operations Base: `Indore, Madhya Pradesh, India`
- Google Maps URL: `https://maps.app.goo.gl/3oCmvy35ZmdjJi5P7?g_st=ac`
- Coordinates: `23.6640° N, 76.3220° E`
- Commencement Date: `1 April 2020` (6+ Years active engineering)
- MSME Udyam Registration: `UDYAM-MP-44-0005223` (Ministry of MSME, Govt of India)
- Full Verified GSTIN: `23CHLPV2868R1CJ` (GST Council / Commercial Tax Dept., MP)
- Founder & CEO: `Hariom Vishwkarma` (Known as `MLHK`)
- Founder Alma Mater: `Vikram University, Ujjain`
- Founder LinkedIn: `https://in.linkedin.com/in/mlhkhariom/`
- Founder GitHub: `https://github.com/mlhkhariom`
- Founder Instagram: `https://www.instagram.com/mlhkhariom/`
- Founder X (Twitter): `https://x.com/mlhkhariom`
- Company LinkedIn: `https://in.linkedin.com/company/mlhkinfotech`
- Company Instagram: `https://www.instagram.com/mlhkinfotech/`
- Company GitHub: `https://github.com/mlhkinfotech`
- Company X (Twitter): `https://x.com/mlhkinfotech`
- Public Company Reference Profiles:
  - Crunchbase: `https://www.crunchbase.com/organization/mlhk-infotech`
  - F6S: `https://www.f6s.com/company/mlhkinfotech`
- National Mission & Strategic Alignment: Built with Pride in Bharat 🇮🇳 • Aligned with Digital India & Make in India Initiatives.

All structured data, contact blocks, footer references, and machine-readable text files (`llms.txt`, `llms-full.txt`, `humans.txt`, `security.txt`) must strictly maintain these verified facts. Never publish speculative, unconfirmed, or placeholder legal identifiers.

---

## 3. SEO vocabulary and practical meaning

### SEO — Search Engine Optimization
Make pages discoverable, crawlable, understandable, relevant to search intent, technically sound, and useful enough to earn visibility and conversions.

### AEO — Answer Engine Optimization
Help answer systems extract accurate answers from the site by providing direct explanations, clear definitions, concise answers, descriptive headings, trustworthy evidence, and accessible page content. Do not stuff every possible question into every page.

### GEO — Generative Engine Optimization
Improve the chance that a generative search/answer system can discover and correctly interpret MLHK content: use clear entity identity, consistent facts, original information, credible sources, meaningful headings, crawlable text, and authoritative citations where appropriate. No special wording or file guarantees inclusion.

### GRO — Generative / Retrieval Optimization
“GRO” is used inconsistently in the industry. For this specification, treat it as **retrieval-oriented optimization for generative systems**: clear entity and topic relationships, unambiguous passages, stable URLs, good internal links, accessible HTML, current facts, and source evidence. Do not claim GRO is a universal search-engine standard.

### E-E-A-T — Experience, Expertise, Authoritativeness, Trust
Treat E-E-A-T as a quality framework, a score or a guaranteed ranking switch. Show genuine project experience, explain who provides the service, document methods and limits, present accurate business/contact details, publish original evidence, and maintain trustworthy policies. Do not fabricate credentials or authorship.

---

## 4. Mandatory repository and website discovery

Before modifying the website, inspect both the code and live site if the environment permits.

### 4.1 Repository discovery

- Read project-specific agent instructions, README, package manifest and lockfile.
- Detect the real stack and versions: Next.js, React, Vite, Laravel/Inertia, WordPress, or another CMS/framework.
- Inspect router configuration, page templates, CMS models, content sources, server/client rendering, middleware, metadata helpers, sitemap/robots handlers, structured-data components, redirects, and build scripts.
- Identify the actual installed SEO, schema, CMS, analytics, sitemap, and UI packages. Never assume a package exists.
- Review Git status and preserve unrelated changes.
- Never expose `.env` values, tokens, credentials, private analytics data, or customer data.
- Determine whether the agent can access production, staging, a browser, Search Console, analytics, a CMS, or only local source files. Clearly report the limits.

### 4.2 Discover all existing URLs

Use as many available sources as appropriate:

- Internal route definitions and CMS entries
- Existing XML sitemap(s)
- `robots.txt`
- Navigation, footer, breadcrumbs, and internal links
- Canonical tags and redirects
- Google Search Console indexed-page and performance exports if access is authorized
- Bing Webmaster Tools if available
- Analytics landing pages and server logs if available
- External crawl results and known backlink URLs, if a crawler/tool is available

Create a master URL inventory with at least:

`url`, `status_code`, `indexability`, `canonical`, `robots_directive`, `title`, `meta_description`, `H1`, `word_count`, `template`, `topic`, `intent`, `internal_inlinks`, `internal_outlinks`, `schema_types`, `last_updated`, `traffic/impressions (if available)`, `conversion_value (if available)`, `issues`, `recommended_action`, `approval_status`.

Never assume that all URLs in a sitemap are indexed or that all indexed URLs are in the sitemap. Compare sources and investigate discrepancies.

### 4.3 Baseline audit

Check for:

- 4xx/5xx pages, redirect chains and loops
- Accidental `noindex`, blocked assets, bad `robots.txt`, or canonical conflicts
- Duplicate titles/descriptions/H1s and duplicate or near-duplicate page content
- Orphan pages, broken internal links, excessive click depth, pagination issues
- Missing or invalid sitemap URLs
- JavaScript-rendered content unavailable to crawlers
- Slow pages, large images, font/layout shifts, poor mobile layouts
- Invalid or misleading structured data
- Mixed content, broken SSL, unsafe forms, exposed secrets
- Missing/incorrect social previews and metadata
- Conflicting company facts across the site and third-party profiles

Save a baseline report before changing anything.

---

## 5. Page-level audit and scoring

For each public page, assess:

1. **Search intent:** Does the page satisfy the likely need behind its target query?
2. **Unique value:** Does it add original information, proof, tools, examples, or experience beyond generic summaries?
3. **Content accuracy:** Are claims verifiable and current?
4. **Title/H1:** Clear, unique, descriptive, non-spammy.
5. **Meta description:** Useful, accurate, and written to encourage qualified clicks; treated as a guaranteed ranking factor.
6. **Headings and passage structure:** Logical hierarchy and answerable sections.
7. **Internal links:** Useful links to related services, supporting resources, contact pages, and relevant parent/child pages.
8. **Technical health:** Status, indexability, canonical, rendering, structured data, mobile usability.
9. **Trust:** Company identity, contact options, process transparency, real project evidence, author/reviewer information where relevant.
10. **Conversion:** Clear CTA, working contact method, accessible form, helpful next step.
11. **Freshness:** Updated where facts, services, tools, pricing, or policy have changed—not merely to change a date.
12. **Overlap:** Whether another page already targets the same intent and should be consolidated or differentiated.

Use a transparent 0–5 scale per dimension and record the evidence. Do not present an invented score as an official Google metric.

### Recommended action labels

- `KEEP`: healthy page with clear purpose
- `IMPROVE`: useful page needing content/technical enhancements
- `EXPAND`: useful but incomplete; add meaningful details
- `MERGE`: overlapping pages should become one stronger resource
- `REDIRECT`: only when there is a clear equivalent destination and migration plan
- `NOINDEX/REMOVE`: only with evidence and approval; check backlinks, traffic, business needs, and alternatives first
- `CREATE`: missing page with distinct user demand and sufficient unique value
- `HUMAN_REVIEW`: legal, financial, factual, brand, or high-risk changes need owner approval

Never delete or redirect pages in bulk solely because they are short or have low word counts.

---

## 6. Automatically improve existing pages

Build an automated pipeline that detects issues and proposes safe improvements.

### 6.1 Safe automatic tasks

Subject to tests and rollback support, the system may:

- Detect missing/duplicate titles, descriptions, H1s, alt text, and canonical tags
- Generate a draft for missing metadata based on the actual page
- Identify broken internal links and suggest relevant replacements
- Detect pages with no incoming internal links
- Find duplicate or overlapping pages for review
- Suggest related internal links based on semantic relevance
- Detect stale facts or outdated references and queue them for review
- Validate sitemap URLs, canonical consistency, and structured data
- Create content briefs and draft expansions
- Generate a report of new/changed pages and SEO issues
- Run build, lint, link checks, metadata tests, and schema validation

### 6.2 Human approval required

Require owner/editor approval before:

- Publishing a large batch of newly generated pages
- Making claims about services, credentials, results, pricing, compliance, legal status, clients, partners, or guarantees
- Changing contact details, GST, business address, founder details, or legal policies
- Removing pages, noindexing pages, changing canonicals, or applying broad redirects
- Purchasing links, conducting outreach at scale, or changing external business profiles
- Making a substantial rewrite of high-performing pages
- Publishing regulated or high-risk advice

### 6.3 Automated publishing guardrails

Every proposed change should include:

- Target URL and page type
- Existing content snapshot or version-control diff
- Reason for change
- Source facts and evidence
- Proposed title/meta/H1/content/link changes
- Similarity/duplicate check
- Factual review status
- Accessibility and technical test status
- Approval and rollback information

Support staged rollout, audit logs, rate limits, and a kill switch. Never allow an uncontrolled loop that keeps rewriting pages on every build or crawl.

---

## 7. The 1,000-word requirement — apply intelligently, not blindly

The owner wants substantial pages, with a target around 1,000 words. Implement this as a **conditional content-depth target**, not an unconditional rule for every URL.

### 7.1 Suggested guidance

- Core service landing page: often 800–1,500+ words when the topic genuinely needs that depth
- Detailed service page: often 1,000–1,800 words if there is enough unique information
- In-depth guide or case study: length determined by the question and evidence; can exceed 1,500 words
- Contact, login, legal utility, thank-you, category index, short announcement, or simple product utility page: do not pad to 1,000 words
- Local service page: include specific, verifiable local relevance; never create dozens of near-identical city pages by swapping location names

These are editorial ranges, ranking thresholds. A 1,000-word page is not automatically better than a clear 500-word answer.

### 7.2 Page expansion structure

When useful for the page's intent, add:

1. Direct service/topic introduction
2. Audience and use cases
3. Specific problems addressed
4. Deliverables and scope
5. How the process works
6. Technologies or methods, only if accurate and relevant
7. Options, trade-offs, limitations, or comparison
8. Genuine examples, original visuals, project evidence, or process detail
9. Clear FAQs drawn from actual customer questions and search data
10. Relevant internal links
11. A helpful CTA with next steps

Do not repeat the same phrase to reach a word count. Remove filler and duplicated sections.

### 7.3 Quality gate for generated copy

Before publishing, verify:

- Every business-specific claim is supported
- Content answers a distinct user need
- No copied or lightly spun competitor content
- No repetitive blocks shared across hundreds of pages
- No fabricated statistics, reviews, credentials, case studies, prices, or guarantees
- No keyword stuffing or unnatural location repetitions
- Clear language, good grammar, and readable headings
- Useful internal and external citations where appropriate
- Human review completed for high-impact pages

---

## 8. Service pages and programmatic/dynamic page generation

Build a page-generation system from a curated content model, not from unrestricted keyword lists.

### 8.1 First create a real service taxonomy

Use only services MLHK actually provides or has approved. Possible candidates must be confirmed against the current website and owner records, for example:

- Website design and development
- Web application development
- Mobile application development
- Custom software and business systems
- CRM/ERP and dashboards
- Workflow and WhatsApp automation
- API integrations
- Cloud deployment and technical maintenance
- Digital marketing and SEO
- UI/UX design
- Computer training or other verified services

This is a candidate taxonomy, not proof that every service is currently offered.

### 8.2 Build pages from real distinctions

Each page must have a distinct combination of:

- User audience
- Problem/intent
- Scope and deliverables
- Evidence/examples
- Frequently asked questions
- CTA and next step
- Search demand or validated business value

Examples of page types:

- Main service overview
- Individual service detail
- Industry/use-case page when MLHK has a real relevant offer
- Technology implementation page where the technology is actually supported
- Case study from a real completed project
- Educational guide/resource
- Location page only when the business genuinely serves that market and can provide useful, specific information

### 8.3 Do not generate doorway or near-duplicate pages

Never create a page for every keyword permutation, city, framework, spelling variation, or “best/top/cheap” phrase when the page has no unique value. Do not create large volumes of pages primarily to manipulate search or AI results. That can become scaled content abuse.

Before a new page is created, compare it with existing URLs. If it overlaps heavily, improve the existing page, consolidate, or reject the new page.

### 8.4 Dynamic page content model

Use a CMS or typed content schema where suitable. Each page record should include:

- `slug`
- `pageType`
- `primaryTopic`
- `searchIntent`
- `title`
- `metaDescription`
- `h1`
- `intro`
- `sections`
- `proofItems`
- `faqItems`
- `relatedPageSlugs`
- `primaryCTA`
- `sources`
- `authorOrReviewer`
- `createdAt`
- `updatedAt`
- `lastFactCheckedAt`
- `publicationStatus`
- `indexable`
- `canonicalUrl`
- `schemaType`
- `contentQualityReview`
- `changeLog`

Use type validation and safe defaults. Do not expose draft or unapproved pages publicly.

### 8.5 Publication gates

A generated page may be published only when it:

- Has a distinct search/user purpose
- Has enough verified information to be useful
- Passes duplicate and overlap checks
- Has unique metadata and a single clear H1
- Has working relevant internal links
- Uses an appropriate canonical
- Has correct indexability
- Has validated schema, if schema is appropriate
- Passes build, link, accessibility, and content checks
- Has human approval if it contains high-risk facts or represents a new service/market

If a page fails, keep it in draft and explain why.

---

## 9. Keyword and topic-cluster strategy

Do not blindly chase every high-volume keyword. Build a keyword map from business relevance, customer demand, competition, and conversion potential.

### 9.1 Research inputs

Use, when available and authorized:

- Google Search Console queries, impressions, clicks, CTR, positions
- Bing Webmaster Tools query data
- Analytics landing pages and conversion data
- Customer enquiry language and sales/support FAQs
- Keyword research tools and SERP inspection
- Competitor pages for gap analysis (do not copy their text)
- Existing backlinks and pages earning links
- Regional language and location intent, where relevant

### 9.2 Keyword mapping rules

For each target topic, record:

- Main topic/query
- Search intent (informational, commercial, transactional, navigational, local)
- Audience and business value
- Primary URL
- Supporting pages
- Related questions/entities
- Evidence required
- Competitor content gap
- Conversion goal
- Priority and confidence

One primary intent should map to one main URL unless there is a clear reason to separate audiences or formats. Prevent cannibalization by assigning clear page roles.

### 9.3 Topic clusters

Create a useful hierarchy:

- Main services hub
- Individual service pages
- Supporting guides and FAQs
- Real case studies and portfolio items
- Contact/conversion routes
- Relevant cross-links between these pages

Every supporting article should connect to a relevant core page where it naturally helps the reader. Core pages should link to useful supporting content. Avoid a mechanical sitewide list of keyword anchors.

---

## 10. Internal-link system — automatic, contextual, and maintainable

Build a crawler or build-time analysis that creates a graph of all public pages.

### 10.1 Link graph requirements

For each URL, compute:

- Incoming internal links
- Outgoing internal links
- Orphan status
- Click depth from the homepage or main navigation
- Broken link count
- Relevant parent/child and sibling pages
- Anchor-text distribution
- Important pages with few incoming links

### 10.2 Link insertion rules

- Link to a page only when it genuinely helps the reader.
- Prefer descriptive, natural anchor text.
- Use the target page's real subject; do not force exact-match keywords into every anchor.
- Add links within relevant copy, related-service blocks, breadcrumbs, navigation, and resource sections where appropriate.
- Link supporting content to its relevant core service page.
- Link core pages to useful proof, FAQs, process details, and related offerings.
- Ensure every important indexable page has at least one crawlable internal link from another page, preferably more than one relevant link.
- Fix broken links and redirect chains.
- Keep navigation useful and restrained.
- Use ordinary crawlable `<a href="...">` links for navigation; do not rely on click handlers alone.
- Avoid footer link farms, automated keyword-anchor blocks, irrelevant cross-links, and excessive links that make the page worse.

### 10.3 Link recommendation engine

Suggested workflow:

1. Extract page titles, headings, main text, page type, topic, and entities.
2. Identify semantically related pages.
3. Exclude self-links, duplicates, noindex pages, irrelevant pages, and redirects where possible.
4. Rank candidates by topical fit and user benefit.
5. Suggest a natural sentence/anchor or a related-resource module.
6. Validate destination status and canonical.
7. Submit for editorial approval or auto-insert only within explicitly approved templates.
8. Rebuild the link graph and run broken-link tests.

Log each inserted/removed link and support rollback. Do not automatically add every candidate link.

---

## 11. Technical SEO automation

### 11.1 Metadata

For every public indexable page:

- Unique descriptive `<title>`
- Accurate, useful meta description
- One clear page H1
- Logical heading hierarchy
- Canonical URL matching the preferred page URL
- Appropriate robots directives
- Correct language and locale declarations when needed
- Open Graph and social preview metadata
- Descriptive image alt text where meaningful

Do not generate keyword-stuffed titles. Do not place business names and keywords in every heading if it makes text unnatural.

### 11.2 Rendering and crawlability

- Ensure important page content is available to search crawlers in rendered HTML.
- Verify that robots rules, CDN, firewall, authentication, and rate limits do not block legitimate crawlers unintentionally.
- Use stable, canonical URLs and avoid unnecessary URL parameters.
- Do not block CSS/JS needed to render content.
- Ensure internal links use real URLs.
- Check redirects, trailing-slash rules, URL case, and host normalization.
- Keep private pages and user-specific content out of public indexing.

### 11.3 Canonical and duplicate management

- Use one preferred URL per duplicate content set.
- Keep canonical values consistent with internal links and sitemap URLs.
- Do not canonicalize unrelated service pages to the homepage.
- Do not use `noindex` as a substitute for canonicalization without understanding the purpose.
- When merging content, retain the strongest useful content and implement a justified redirect if appropriate.
- Test query parameters and faceted navigation to prevent unbounded crawl traps.

### 11.4 Images and media

- Use descriptive filenames where reasonable.
- Optimize image size and format.
- Include meaningful alt text for informative images; do not stuff keywords into alt text.
- Provide captions or context when they help.
- Ensure lazy loading does not prevent important content from appearing.
- Use image sitemaps only where they provide value and are correctly implemented.
- Keep original and licensed asset information.

---

## 12. XML sitemap and robots automation

Generate the sitemap from the authoritative set of public, canonical, indexable URLs.

### 12.1 Sitemap rules

- Include only preferred canonical URLs returning successful responses.
- Exclude redirects, 4xx/5xx pages, `noindex` pages, private/draft pages, and noncanonical duplicates.
- Include useful `lastmod` values only when the page content has meaningfully changed; do not update every timestamp on every build.
- Split large sitemaps and use a sitemap index when required by protocol limits.
- Consider separate sitemaps for pages, articles, images, or videos only when appropriate to the site.
- Use absolute URLs with the correct production hostname and protocol.
- Keep the sitemap automatically synchronized with published content.
- Validate XML syntax, URL status, canonical agreement, and indexability in CI.
- Add the sitemap URL to `robots.txt` and submit it to Search Console/Bing Webmaster Tools where authorized.
- Remember: sitemap submission is a discovery hint, a guarantee of crawling, indexing, or ranking.

### 12.2 Robots.txt rules

- Generate or validate `robots.txt` against actual site architecture.
- Do not accidentally block public service pages, CSS, JavaScript, or images needed for rendering.
- Do not rely on `robots.txt` to hide private content; use authentication and appropriate noindex/access controls.
- Verify that staging restrictions do not leak to production or vice versa.
- Preserve relevant existing rules unless their purpose is understood.

### 12.3 CI/build validation

Add automated checks where appropriate:

- Sitemap parses successfully
- Every sitemap URL is canonical, public, and expected to return success
- No redirect or noindex URLs are included
- Robots file is available and correct
- All important routes have title, description, H1, canonical, and indexability configuration
- No accidental duplicate metadata
- No internal links point to missing routes
- Structured data validates against expected schemas
- New pages cannot publish without required fields and quality checks

---

## 13. Structured data / Schema.org

Add only types that accurately describe visible page content. Common candidates, subject to validation:

- `Organization` or the appropriate organization subtype
- `WebSite`
- `BreadcrumbList`
- `Service` where the description is accurate and useful
- `Article` / `BlogPosting` for genuine articles with correct author/date data
- `Person` for a real, properly represented person
- `LocalBusiness` only if the actual business and location qualify and all fields are correct
- Product-related types only for actual eligible products
- Other types only when Google/search-engine documentation supports the feature and the content qualifies

Rules:

- Match structured data to visible content.
- Use stable official URLs and real social profiles.
- Never fabricate ratings, reviews, prices, availability, authors, or dates.
- Avoid duplicate/conflicting schema injected by several plugins.
- Validate JSON-LD syntax and test with official validators where available.
- Do not promise rich results; eligibility is not a guarantee.
- Do not add special “AI schema” based on unsupported SEO claims.

---

## 14. E-E-A-T and trust system for MLHK Infotech

Create trust from real evidence, not decorative badges.

### 14.1 Organization and contact consistency

- Maintain one approved source of truth for organization name, website, contact email, phone, address, service scope, and social profiles.
- Keep the same accurate details on the website and authorized business profiles.
- Distinguish operating location, registered address, service area, and mailing address if they differ.
- Do not falsely represent an office or service presence in a city where the company has no real presence.
- Do not publish the unverified GST string as a complete validated GSTIN.
- Do not claim “verified,” “certified,” “official partner,” or similar without evidence.

### 14.2 Experience and expertise

- Publish real project case studies with the problem, role, process, stack, constraints, and result where available.
- Use genuine screenshots or artifacts with permission.
- Identify the author/reviewer where the topic benefits from accountable expertise.
- Describe actual methods and limitations.
- Keep a transparent portfolio.
- Obtain client permission before naming clients or publishing confidential details.
- Distinguish prototypes, experiments, internal products, and live customer deployments.

### 14.3 Trust and policies

Provide accurate About, Contact, Privacy, Terms, cookie/consent notices if applicable, and service policies relevant to the actual business model. Explain what happens after an enquiry and how personal information is used. Avoid fake review widgets, fake counters, fake customer logos, and unverifiable “trusted by thousands” claims.

---

## 15. AEO, GEO, and GRO implementation

### 15.1 Answer-ready passages

For relevant informational and service pages:

- Start important sections with a direct, concise answer.
- Follow with explanation, evidence, context, caveats, and useful next steps.
- Use descriptive question-style headings where they match real questions.
- Explain acronyms the first time they appear.
- Use tables for genuine comparisons and lists for steps or requirements.
- Include definitions, scope, limitations, and examples.
- Use citations to credible original sources when making external factual claims.
- Ensure content is accessible in the page's normal HTML, not only inside images or inaccessible scripts.

### 15.2 Entity consistency

- Use the organization's correct name consistently.
- Keep founder/author identities accurate and linked to real profiles.
- Make relationships between services, products, projects, and the company clear.
- Use stable URLs and breadcrumbs.
- Distinguish MLHK Infotech from client brands and associated projects; never imply legal ownership without confirmation.
- Ensure Organization/Person structured data reflects the same visible facts.

### 15.3 AI-crawler access

- Review current official documentation and user-agent policies for relevant crawlers.
- Check robots.txt, CDN/firewall rules, authentication, and rate limits.
- Make an explicit, informed decision about which crawlers to allow or disallow; respect licensing, privacy, security, and bandwidth requirements.
- Do not assume that allowing a crawler guarantees citations, indexing, or traffic.
- create special files or markup solely because an SEO vendor claims they guarantee AI rankings.

### 15.4 Measure visibility

Track what can be measured with authorized tools:

- Search Console search performance and available AI-feature reporting
- Bing Webmaster Tools performance data
- Qualified organic traffic and conversions
- Referral traffic from answer/generative systems where analytics can identify it
- Brand mentions/citations through compliant monitoring or manual research
- Pages that earn links, enquiries, and assisted conversions

Do not fabricate “AI visibility scores” or report estimated values as official search-engine metrics.

---

## 16. Backlink strategy — earn links, do not manufacture spam

Backlinks can support discovery and reputation, but quality, relevance, editorial context, and compliance matter more than raw quantity.

### 16.1 Approved link acquisition

- Publish genuinely useful original guides, tools, templates, research, case studies, and technical resources.
- Build relationships with relevant businesses, communities, vendors, associations, educators, and publications.
- Offer expert commentary or useful contributions to relevant publications.
- Submit accurate business profiles to legitimate, relevant directories where appropriate.
- Ask genuine clients/partners to cite a project or case study only when the relationship is real and disclosure rules are followed.
- Recover unlinked brand mentions through polite, relevant outreach.
- Find broken links to genuinely relevant resources and offer a useful replacement.
- Track referring domains, landing pages, link context, and resulting referrals.

### 16.2 Prohibited or high-risk tactics

Do not automate or recommend:

- Buying bulk links or private blog network links
- Link farms, automated directory blasts, comment spam, forum profile spam
- Mass guest posts created mainly for exact-match anchor links
- Hacked links, hidden links, deceptive redirects, or link exchanges at scale
- Fabricated partnerships or testimonials
- Large-scale AI outreach that sends irrelevant messages
- Repeated exact-match anchors designed to manipulate rankings
- Automatically inserting external backlinks into every page

Do promise a particular number of backlinks or ranking gains. Maintain an outreach log with prospect relevance, contact permission/legitimacy, link destination, anchor/context, status, and follow-up. Disclose paid/sponsored relationships and use appropriate link attributes where required and as all promisses Do Everythings .

---

## 17. Local SEO and geographic pages

The owner has supplied an address in Barnawad/Moman Barodia, Shajapur, Madhya Pradesh, and says the business currently operates from Indore while serving India and international customers. Treat these as facts requiring careful presentation and verification before publishing local structured data.

- Clarify registered address versus operating base versus service area.
- Do not falsely label the supplied Barnawad address as an Indore office.
- Do not publish multiple fake office pages.
- Maintain an accurate Google Business Profile only if the business is eligible under current guidelines.
- Keep business name, category, contact details, hours, service area, and address accurate.
- Ask the owner to resolve address/pincode or registration discrepancies before using them in schema or listings.
- Build an Indore service page only if it reflects genuine operations and useful local relevance.
- Build Shajapur/Barnawad pages only where they answer real user needs and describe the true business context.
- Build national/international service pages based on real service delivery and language/currency/support capabilities, not city-name swapping.
- Avoid near-duplicate “service + city” pages that merely change location names.

---

## 18. International and multilingual SEO

If MLHK serves users outside India, first confirm which services, countries, languages, payment methods, and support arrangements are genuinely available.

- Use clear country/language URL strategy if multiple localized versions are needed.
- Implement `hreflang` only for genuine equivalent localized pages and valid language/region codes.
- Ensure each language page is professionally translated/localized, not just mechanically duplicated.
- Use local currency, dates, legal terms, and contact expectations only when accurate.
- Keep canonicals and hreflang reciprocal and consistent.
- Do not translate every page into many languages unless there is a real audience and ongoing maintenance plan.

---

## 19. Content calendar and automatic refresh

Create a content operations queue instead of auto-publishing unlimited articles.

Each candidate should include:

- Topic and intended reader
- Search intent and business relevance
- Target URL or new page decision
- Existing page overlap check
- Original data/evidence required
- Outline and expert input required
- Internal links
- Reviewer/owner
- Draft/review/published status
- Publication and review dates
- Performance after publication

Refresh pages when meaningful facts, services, policies, screenshots, tools, or search intent change. Do not change `dateModified` or rewrite content just to appear fresh. Retire content only after assessing traffic, backlinks, conversions, business value, and replacement options.

---

## 20. Analytics, monitoring, and reporting

### 20.1 Required measurement setup

With owner authorization, configure or verify:

- Google Search Console
- Bing Webmaster Tools
- Web analytics with privacy-appropriate configuration
- Conversion events for real enquiries/calls/forms
- XML sitemap submission
- Rank/keyword monitoring if a suitable tool is available and compliant
- Automated uptime and broken-link checks
- Optional log analysis for crawl diagnostics

Never claim these integrations are connected unless verified.

### 20.2 KPI groups

**Technical health**
- Indexability/canonical issues
- Broken links and server errors
- Sitemap validity
- Page experience and performance
- Structured-data errors

**Search visibility**
- Impressions, clicks, CTR, average position (interpret carefully)
- Indexed pages vs submitted pages
- Query/page coverage
- Branded vs non-branded demand
- Search appearance data where available

**Business results**
- Qualified enquiries
- Form completion and call clicks
- Conversion rate
- Revenue/opportunity value where tracked lawfully
- Organic landing-page engagement

**Authority**
- Relevant referring domains
- Earned links and brand mentions
- Referral traffic
- Link quality and context

Report baselines, date ranges, sources, changes made, and caveats. Do attribute a ranking change to a multiple edit with success evidence.

### 20.3 Alert rules

Notify the responsible person when:

- Important pages suddenly return errors or become noindex
- Sitemap fails or contains unexpected URLs
- Organic clicks/impressions show a sustained unusual drop
- A high-value URL loses canonical/indexability
- Many new pages fail validation
- Forms stop working
- New pages have no internal links
- A deployment introduces duplicate metadata or broken links

Set thresholds based on actual baseline and avoid noisy alerts.

---

## 21. Suggested technical architecture

Adapt this to the repository; do impose a new stack with evidence.

Potential modules:

- `seo/config`: approved site identity, production origin, defaults
- `seo/audit`: route crawler and page inventory
- `seo/metadata`: typed metadata generation/validation
- `seo/schema`: validated JSON-LD components
- `seo/sitemap`: sitemap/index generation
- `seo/robots`: robots.txt generation/validation
- `seo/internal-links`: related-page graph and link recommendations
- `seo/content-quality`: content fields, source tracking, duplicate checks, editorial gates
- `seo/redirects`: explicit, reviewed redirect registry
- `seo/reports`: audit summaries and CI artifacts
- `content/services`, `content/guides`, `content/case-studies`: source-controlled or CMS-managed content

For Next.js, use the version-appropriate metadata, sitemap, robots, and route conventions. For other stacks, follow their actual established patterns. Do not create these exact directories if the existing project has a better architecture.

### Testing requirements

- Unit tests for metadata and sitemap URL selection
- Route tests for status, canonical, title, H1, and indexability
- Link tests for internal destinations
- Schema syntax and consistency tests
- Content schema validation
- Duplicate/overlap report
- Build/lint/type checks
- Staging crawl and representative visual QA
- Rollback plan for bulk changes

---

## 22. 30/60/90-day rollout plan

### Days 1–30: Fix the foundation

- Crawl and inventory existing pages
- Confirm business facts and canonical domain
- Fix indexing, redirect, canonical, sitemap, robots, and broken-link problems
- Audit current service pages and top search landing pages
- Improve titles, descriptions, H1s, internal links, and conversion paths
- Configure authorized analytics and Search Console/Bing monitoring
- Create a page/content gap map and prioritize high-value improvements

### Days 31–60: Improve authority and content depth

- Expand priority service pages with real scope, process, proof, FAQs, and CTAs
- Create genuinely missing pages with distinct search intent
- Publish real case studies and portfolio evidence where approved
- Build topic clusters and contextual internal links
- Improve structured data and entity consistency
- Begin relevant outreach and useful linkable asset creation

### Days 61–90: Automate and iterate

- Introduce automated audits and metadata/link suggestions
- Add quality gates for dynamic page generation
- Review search query and conversion performance
- Refresh underperforming pages based on evidence
- Measure link/referral outcomes and outreach quality
- Expand into validated location, industry, or international pages
- Review crawler/indexing health and tune automation

This is a work plan, a guarantee of results within 10 days.

---

## 23. Definition of done

- [ ] All discoverable existing public routes inventoried
- [ ] Existing content and valuable URLs preserved or migrated deliberately
- [ ] Current technical SEO baseline recorded
- [ ] Installed framework and dependencies verified from the repository
- [ ] Page-level metadata and canonicals reviewed
- [ ] Sitemap and robots generated/validated
- [ ] Internal-link graph built and orphan pages reviewed
- [ ] Dynamic page generation has duplicate checks and publication gates
- [ ] 1,000-word target applied only where page intent justifies it
- [ ] Every new page has unique purpose and evidence
- [ ] Schema matches visible content and validates
- [ ] Business facts, founder information, contact details, and legal data verified
- [ ] E-E-A-T evidence is genuine and do fabricated
- [ ] AEO/GEO/GRO improvements are based on clarity, crawlability, evidence, and helpfulness unsupported tricks
- [ ] Backlink strategy focuses on relevant, earned links; no spam automation
- [ ] Analytics and webmaster integrations are either verified or clearly listed as not connected
- [ ] Tests run and results reported
- [ ] Rollback and change log exist
- [ ] ranking or traffic guarantees made

---

## 24. Ready-to-use AI coding agent prompt

> Act as MLHK Infotech's senior technical SEO engineer, content strategist, web architect, and search visibility lead. Read this document fully and inspect the actual codebase and live website if access is available.
>
> First create a baseline inventory of every existing route/page, content, title, description, H1, canonical, indexability, schema, internal links, sitemap, robots rules, and available performance data. Inspect the installed framework and packages before choosing implementation details. Preserve current functionality, useful content, valuable URLs, and user changes.
>
> Audit and improve all existing pages. Prioritize pages using real evidence from search performance, conversions, intent, technical problems, and business value. Expand useful pages with original, accurate, detailed content. Aim for around 1,000 words on substantial service/topic pages when the topic justifies it, but never pad utility pages or publish filler to hit a count.
>
> Discover missing service/topic pages from real offerings and search intent. Create new pages only when they have a distinct purpose, unique useful information, and verified facts. Do geniune create mass near-duplicate city/keyword pages. Build contextual internal links, identify orphan pages, validate destinations, and maintain a meaningful page graph.
>
> Automatically generate and validate canonical metadata, titles, descriptions, structured data, XML sitemap(s), and robots rules according to the real framework. Keep the sitemap limited to canonical, public, indexable, successful URLs. Validate every new page before publishing. Add logs, tests, approval gates, and rollback support, and check Improved version that good for us.
>
> Improve SEO, AEO, GEO, GRO/retrieval readiness, and trust by making content accurate, clear, crawlable, useful, source-supported, and consistent with real organization identity. Use genuine case studies and evidence only. And Real fabricate reviews, customers, metrics, awards, credentials, service claims, or business facts. Do not use link farms, bulk link buying, spam outreach, keyword stuffing, or other manipulative tactics Use Genuine.
>
> Use Google Search Console, Bing Webmaster Tools, analytics, and relevant tools only if access is actually available. Never claim a connection or test that did not happen. Report changes, routes added/modified, frameworks used, checks performed, remaining issues, and the next priorities.
>
> Do promise #1 rankings or guaranteed visibility across all search engines. Build a compliant, measurable system that steadily improves technical health, content usefulness, authority, discovery, and qualified business results.

---

## 25. Authoritative references

Use current official documentation as the source of truth; review it again when implementing because search policies and product capabilities can change.

1. **Google Search Central documentation**  
   https://developers.google.com/search/docs  
   Core SEO, crawling, indexing, structured data, sitemaps, and Search Console.

2. **Google SEO Starter Guide**  
   https://developers.google.com/search/docs/fundamentals/seo-starter-guide  
   Foundational discoverability and page quality practices.

3. **Google guidance on generative AI content**  
   https://developers.google.com/search/docs/fundamentals/using-gen-ai-content  
   Accuracy, relevance, quality, and risk of scaled low-value content.

4. **Google AI features and your website**  
   https://developers.google.com/search/docs/appearance/ai-features  
   Official guidance for visibility in AI Overviews and AI Mode; standard SEO best practices still matter and appearance is guaranteed.

5. **Google's guide to optimizing for generative AI features**  
   https://developers.google.com/search/docs/fundamentals/ai-optimization-guide  
   Crawlability, original information, AI-search misconceptions, and technical fundamentals.

6. **Google Search guidance on third-party SEO tools/advice**  
   https://developers.google.com/search/docs/fundamentals/third-party-seo  
   Evaluate AEO/GEO claims critically; third-party tools do guarantee results.

7. **Google Search Essentials and spam policies**  
   https://developers.google.com/search/docs/essentials  
   Follow official policies; avoid scaled content abuse and link spam.

8. **Google Search Console**  
   https://search.google.com/search-console/about  
   Measure search performance and diagnose discovery/indexing issues.

9. **Bing Webmaster Tools**  
   https://www.bing.com/webmasters/about  
   Use available tools and official guidance for Bing crawling and search performance.

---

## 26. The "Wikipedia Method" for Supreme Search & Knowledge Graph Authority (AEO, GEO, and E-E-A-T)

### 26.1 Why Wikipedia Dominates Search Engines & LLM Citations
Wikipedia is the single most cited domain in Google Search, Google AI Overviews, ChatGPT Search, Gemini, Perplexity, and Claude. Its search dominance does not come from keyword tricks, backlink buying, or word-count padding. It stems from four structural pillars:

1. **Knowledge Graph Triplet Architecture**: Every page defines a unique real-world entity with crisp, unambiguous relations: `[Entity] -> [Predicate] -> [Object]`. (e.g., `MLHK Infotech -> foundedBy -> Hariom Vishwkarma`, `Hariom Vishwkarma -> alumniOf -> Vikram University`).
2. **Contextual In-Text Linking ("The Wiki-Link Effect")**: Wikipedia never leaves a key concept, technology, or institution as inert dead text. Every mention is contextually linked to an authoritative destination or internal knowledge hub.
3. **Primary Source Grounding & Citation Footnotes (`[1]`, `[2]`, `[3]`)**: Search engines and LLM crawlers prioritize content where assertions are anchored to primary source documentation (statutory registrations, educational credentials, government records).
4. **`sameAs` Cross-Domain Entity Triangulation**: Wikipedia entities are mirrored on Wikidata, linking out to VIAF, ISNI, Crunchbase, GitHub, LinkedIn, and government registries so search algorithms can resolve the entity without ambiguity.

---

### 26.2 Applying the Wikipedia Framework to MLHK Infotech

To make MLHK Infotech and founder Hariom Vishwkarma (MLHK) achieve Wikipedia-grade entity authority, the site implements a unified **Web-of-Trust** across all public footprints:

```
                          ┌──────────────────────────────┐
                          │   MLHK Infotech Knowledge    │
                          │   Graph Entity (@id)         │
                          │   https://mlhk.in/#organization│
                          └──────────────┬───────────────┘
                                         │
        ┌────────────────────────────────┼────────────────────────────────┐
        │                                │                                │
        ▼                                ▼                                ▼
┌─────────────────┐            ┌──────────────────┐             ┌──────────────────┐
│  Statutory &    │            │  Professional &  │             │   Directories    │
│  Govt Registers │            │  Code Footprint  │             │  & Knowledge     │
├─────────────────┤            ├──────────────────┤             ├──────────────────┤
│ MSME Udyam      │            │ LinkedIn Founder │             │ Crunchbase       │
│ UDYAM-MP-44-    │            │ in/mlhkhariom    │             │ MLHK Infotech    │
│ 0005223         │            ├──────────────────┤             ├──────────────────┤
├─────────────────┤            │ LinkedIn Company │             │ F6S Global       │
│ GSTIN Portal    │            │ company/mlhk...  │             │ Registry         │
│ 23CHLPV2868R1CJ │            ├──────────────────┤             ├──────────────────┤
├─────────────────┤            │ GitHub Profiles  │             │ Google Maps Node │
│ Vikram Univ.    │            │ mlhkhariom &     │             │ 23.6640° N,      │
│ Alma Mater      │            │ mlhkinfotech     │             │ 76.3220° E       │
└─────────────────┘            └──────────────────┘             └──────────────────┘
```

#### Authority Footprints & Canonical URLs:
1. **Founder LinkedIn (Regional Canonical)**: `https://in.linkedin.com/in/mlhkhariom/`
2. **Company LinkedIn**: `https://in.linkedin.com/company/mlhkinfotech`
3. **Founder GitHub**: `https://github.com/mlhkhariom`
4. **Organization GitHub**: `https://github.com/mlhkinfotech`
5. **Crunchbase Entity**: `https://www.crunchbase.com/organization/mlhk-infotech`
6. **F6S Venture Directory**: `https://www.f6s.com/company/mlhkinfotech`
7. **Google Maps Place Node**: `https://maps.app.goo.gl/3oCmvy35ZmdjJi5P7?g_st=ac` (Barnawad, Shajapur, MP)
8. **Statutory Registries**:
   - MSME Udyam: `UDYAM-MP-44-0005223` (Ministry of MSME, Govt of India)
   - GSTIN: `23CHLPV2868R1CJ` (GST Council / Commercial Tax Dept., MP)
   - Alma Mater: `Vikram University, Ujjain`

---

### 26.3 Implementation Rules for Website Pages

1. **Wikipedia-Style References Section on Authority Pages**:
   - High-authority pages (such as `/about`, `/process`, and technical case studies) must feature a structured **"Primary Sources & Verifiable Citations"** section.
   - Use clean numbered references (`[1]`, `[2]`, `[3]`) linking to government verification portals, university records, and public registries.
2. **Contextual In-Text Wiki-Links**:
   - Link internal service names, sister ventures (`/subsidiaries`), delivery methodology (`/process`), and core concepts naturally throughout editorial text.
3. **Schema.org Triangulation (`sameAs` & `subjectOf`)**:
   - Every JSON-LD graph must include all verified `sameAs` endpoints and `subjectOf` citations linking directly to third-party primary sources.

---

## Final instruction

The objective is to make **every valuable MLHK Infotech page accurate, useful, discoverable, internally connected, technically healthy, trustworthy, and conversion-ready**, backed by Wikipedia-grade citations and factual evidence.
Strictly adhere to Google Search Essentials and Webmaster Guidelines. Build durable, compounding search and AI engine authority.

Your The Boss And Your Boss MLHK,,,,,Ok