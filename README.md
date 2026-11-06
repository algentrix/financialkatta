# FinancialKatta

Static website for FinancialKatta, a Pune-based financial services practice.

**Live domain:** https://www.financialkatta.com  
**Enquiry number:** +91 81779 50709

## Research and design

The Algentrix marketing site lives in `../algentrix-website` and is published at https://algentrix.com. It is a React, TypeScript and Vite site with Tailwind CSS 4, React Router and per-page metadata. Its Works section is a case-study index for Tiger Fitness, TradeConnect and WorkPulse. Those patterns were reused: a static Vite build, route-level titles, a sitemap, `robots.txt`, and hosting fallbacks.

FinancialKatta does not reuse Algentrix branding, photography, copy or the dark theme. The current theme follows the public CancerIQ colour and type rhythm: white pages, header gray `#F2F2F2`, text `#444444`, slate `#6A6B80`, sage buttons `#67BA94`, near-black close `#1E1E1E`, and Open Sans. The wording and photographs are FinancialKatta’s. The homepage follows a long storytelling page — a large headline, life stages, alternating service rows, a five-step process and a dark closing band. It is not a copy of any reference site’s code, text or images.

Lifestyle photographs are original files in `public/assets/editorial/`. Each scene has an 800-pixel WebP and a larger WebP. The homepage hero is `hero-family` and is not used on other pages. The advisor portrait in `public/advisor/prasad.jpg` was supplied by the practice and was not generated.

No reference-website list was stored in this project folder. The information architecture follows the brief: a service menu, a calculator workshop, a knowledge centre, a direct WhatsApp enquiry and product-risk disclosures. No competitor copy, code or images were copied.

The advisor name and AMFI ARN come from the public AssetPlus onboarding page supplied for this practice. Testimonials, partner logos, social accounts, a street address, and SEBI, IRDAI and RBI numbers stay blank because that page does not provide them.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

`npm run build` checks the calculator formulas, writes the Open Graph image and sitemap, typechecks, builds, and saves one HTML file per route so each URL has its own title, description and canonical link.

## Update content

| What | File |
| --- | --- |
| Phone, WhatsApp, email, address, hours, social links, referral URL, registrations | `src/config/site.ts` |
| About copy | `src/content/about.ts` |
| Advisor name, qualifications, experience, certifications, photo | `src/content/advisor.ts` |
| Vision and mission | `src/content/vision.ts` |
| Service explanations | `src/content/services.ts` |
| Lifestyle photographs and alt text | `src/content/imagery.ts`, `public/assets/editorial/` |
| Articles | `src/content/blogs.ts` |
| Awareness notes and FAQs | `src/content/awareness.ts`, `src/content/faqs.ts` |
| Videos (`youtubeId` is the 11-character id) | `src/content/videos.ts` |
| Testimonials (`verified: true` only for real feedback) | `src/content/testimonials.ts` |
| Associate partners | `src/content/partners.ts` |
| Privacy, terms and disclaimer | `src/content/legal.ts` |

Social links and the homepage partner block stay hidden while those lists are empty. A testimonial is shown only when `verified` is true.

WhatsApp messages are centralized in `src/config/site.ts` and encoded with `encodeURIComponent`. The number is `918177950709`.

## Calculators

All five calculators run in the browser. Nothing is stored.

- SIP uses the beginning-of-month formula. The annual rate is nominal and is divided by 12.
- Lumpsum compounds monthly on the same nominal rate.
- STP compounds the source and destination, then transfers the monthly amount, limited by the source balance.
- SWP compounds the corpus, then deducts the withdrawal. The illustration stops if the corpus cannot fund a withdrawal.
- EMI is a reducing-balance schedule rounded to paise.

Investment results are labelled as illustrative estimates, not guaranteed returns.

## Deploy www.financialkatta.com

The build output is the `dist` folder. Point the domain at that folder.

### Netlify

Build command `npm run build`, publish directory `dist`. `public/_redirects` serves each published route from its own `index.html`, then sends unknown paths to the site shell. Add the custom domain `www.financialkatta.com` and redirect the apex domain to it.

### Vercel

Import the project. `vercel.json` rewrites unknown paths to `index.html`. Add `www.financialkatta.com`.

### Any static host, including Hostinger

Upload the contents of `dist`. A published path such as `/about` must serve `about/index.html`, not the homepage shell. Use the host’s directory index or the generated `_redirects` rules. Send only unknown paths to the root `index.html`, so a refresh still opens the site and the custom 404 can render.

After deploy, confirm `/sitemap.xml` and `/robots.txt` load from the domain.

## Before changing claims

Publish extra registration numbers only by editing `src/config/site.ts`. Do not add performance statistics, testimonials, or partner names that the business has not verified.
