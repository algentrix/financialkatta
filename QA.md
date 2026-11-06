# FinancialKatta QA

Date: 6 November 2026

## Verdict

The editorial redesign is implemented and the production build passes. The site is not ready to treat as a finished public legal publication until a lawyer reviews the privacy policy, terms and disclaimer. Those pages are still drafts dated 4 November 2026.

## Design reference

The public homepage at https://www.canceriq.com/ was inspected in a desktop browser at 1440×900 on 6 November 2026. Measured from the live page, not copied:

- Header about 82px, background `#f2f2f2`, content width 1240px, small bold navigation, one pill-shaped demo button.
- Hero headline uses a very large first line and a shorter second statement. Body copy stays short.
- Later sections use about 80px of vertical padding, 32px bold headings, and a white page.
- The journey is told as labelled stages (before diagnosis, in treatment, survivorship) with photographs, not icon cards.
- A numbered process explains how the product works.
- The footer is near-black.
- The page is long, roughly 8500px, and stacks on a narrow viewport.

FinancialKatta uses the same kind of structure — large type, alternating photographs, a life-stage sequence, a five-step process, generous space, and a dark close — with its own colours, Manrope and Inter, original copy, and original photographs. CancerIQ’s HTML, CSS, images, illustrations and wording were not copied. The reverse-engineering toolkit was not connected in this session, so the inspection used the browser directly.

## What changed

Homepage sections now follow a family financial journey: hero, four life stages, four services, common questions, five steps, calculators, why FinancialKatta, knowledge, the advisor, and contact. Testimonials stay hidden because none are verified.

Inner pages share the larger page header, flatter sections, and the same type scale. Routes, calculator maths, contact validation, sitemap, robots.txt and hosting fallbacks were kept.

## Photographs

Generated for this site and saved as WebP under `public/assets/editorial/`. Each file was viewed before use. Two widths are published, 800px and the source width (about 864–1280px).

- `hero-family` — parents and a young son on a sofa. Homepage hero only.
- `young-investors` — a couple with a laptop at the dining table.
- `child-education` — a mother and daughter studying.
- `shop-owner` — a shopkeeper with a laptop in a small store.
- `retirement` — a couple with tea on a balcony. Also used beside the bonds introduction on the homepage, because the set has no separate bonds scene.
- `woman-planning` — a woman working through household notes.
- `home-loan` — a couple talking with a consultant.
- `family-protection` — parents and two children at home.

The advisor photograph is still the supplied portrait of Prasad Prakashrao Chidrawar. It was not generated.

## Tests

| Check | Result |
| --- | --- |
| `npm run build` | Pass. Formula checks passed. 31 routes prerendered. |
| Homepage in the browser | Pass. Headline, Manrope, eight encoded WhatsApp links, no testimonial block, no horizontal overflow at 390px. |
| Mutual funds page | Pass. Uses the dining-table photograph and the mutual-fund WhatsApp message. |
| SIP and EMI calculators | Pass. SIP still shows ₹12,00,000 and ₹23,23,391. EMI’s last row closes at ₹0.00 and the page does not overflow at 390px. |
| Testimonials | Hidden while `verifiedTestimonials` is empty. |
| Advisor | Prasad Prakashrao Chidrawar, AMFI ARN 272207, supplied portrait. |
| SIP example | ₹1,000 at a typed 12% for 10 years stays labelled as an illustration. |
| Fake ratings, partner logos, guaranteed returns | Not added. |

## Outstanding

- Have the privacy policy, terms and disclaimer reviewed before relying on them.
- Confirm ARN 272207 is still current on AMFI’s distributor search. The number comes from the advisor’s AssetPlus page.
- A separate bonds photograph would let the homepage stop reusing the balcony picture.
