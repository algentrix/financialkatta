import { Link } from "react-router-dom"
import { advisor, advisorIsPublished } from "../content/advisor"
import { calculatorTools } from "../content/calculators"
import { photos, type Photo } from "../content/imagery"
import { posts } from "../content/blogs"
import { partners } from "../content/partners"
import { verifiedTestimonials } from "../content/testimonials"
import { site, publishedRegistrations } from "../config/site"
import { safeHttpUrl } from "../lib/format"
import { calculateSip } from "../lib/calculators"
import { formatInr } from "../lib/format"
import { breadcrumbJson, pageMeta } from "../seo/sitePages"
import { Seo } from "../components/Seo"
import { WhatsAppLink } from "../components/WhatsAppLink"

const sipExample = calculateSip(1000, 12, 10 * 12)

const stages: { kicker: string; title: string; text: string; to: string; photo?: Photo }[] = [
  {
    kicker: "Starting out",
    title: "First salary. First SIP.",
    text: "The first useful step is often a monthly amount you can miss, and a clear reason for keeping it aside.",
    to: "/calculators/sip",
    photo: photos.youngInvestors,
  },
  {
    kicker: "Building a family",
    title: "A home, cover, and school fees.",
    text: "The questions get more specific: how much EMI, which insurance, and when the school money is needed.",
    to: "/services/financial-planning",
    photo: photos.childEducation,
  },
  {
    kicker: "Growing",
    title: "Investments, bonds, and the shop.",
    text: "A salary and a small business do not need the same product. The time frame still comes first.",
    to: "/services/bonds",
    photo: photos.shopOwner,
  },
  {
    kicker: "Looking ahead",
    title: "Income after the salary stops.",
    text: "Retirement planning is easier to talk about while you are still earning, not after the last month's pay.",
    to: "/services/financial-planning",
    photo: photos.retirement,
  },
]

const services = [
  {
    slug: "mutual-funds",
    title: "Mutual funds",
    text: "Start with what you can. Understand the options and build your investment journey.",
    photo: photos.womanPlanning,
    intent: "mutualFunds" as const,
  },
  {
    slug: "loans",
    title: "Loans",
    text: "Planning a home or need funds for your business? Explore financing options.",
    photo: photos.homeLoan,
    intent: "loans" as const,
  },
  {
    slug: "insurance",
    title: "Insurance",
    text: "Understand how different insurance plans can help protect your family and assets.",
    photo: photos.familyProtection,
    intent: "insurance" as const,
  },
  {
    slug: "bonds",
    title: "Bonds",
    text: "Learn about fixed-income investments, their potential returns and associated risks.",
    photo: photos.retirement,
    intent: "bonds" as const,
  },
]

const questions = [
  { q: "Is ₹2,000 a month enough to start investing?", a: "It can be a start. The useful question is whether you can continue that amount, and for how many years.", to: "/calculators/sip" },
  { q: "Should I buy insurance separately?", a: "A policy bought inside a loan or a fund is not the same as cover chosen for the family. Look at what is actually paid, and what is excluded.", to: "/services/insurance" },
  { q: "How much EMI can my salary support?", a: "A calculator shows the monthly figure. Your rent, existing EMIs and a buffer still have to fit beside it.", to: "/calculators/emi" },
  { q: "How do bonds work?", a: "You lend money to an issuer. Interest and repayment depend on that issuer. The price can move if you sell early.", to: "/services/bonds" },
  { q: "How should I plan for my child's education?", a: "Start with the year the money is needed and an amount you can set aside now. The product comes after that.", to: "/services/financial-planning" },
  { q: "What should I consider before retirement?", a: "What you already have, what a month costs, and how many earning years are left. A product name is not a plan.", to: "/services/financial-planning" },
]

const steps = [
  { n: "01", title: "Tell us what you're planning.", text: "A home, a SIP, a policy, or a question you have not named yet." },
  { n: "02", title: "We understand your requirements.", text: "Income, dependents, the date you need the money, and what you already hold." },
  { n: "03", title: "We explain relevant options.", text: "What the product does, what it costs, and the risk that stays with you." },
  { n: "04", title: "You decide.", text: "The choice stays yours. An explanation is not an instruction to buy." },
  { n: "05", title: "We help with the next step.", text: "Where we can. A lender, an insurer or a fund house still has its own process." },
]

const reasons = [
  { title: "Clear explanations", text: "Everyday words first. If a term matters, we say what it changes for your money." },
  { title: "Individual attention", text: "The conversation starts from your household, not from a product we want to place." },
  { title: "Transparent discussions", text: "Costs, exclusions and what can go wrong are part of the explanation." },
  { title: "Understand, then choose", text: "A suggestion follows the goal and the time you have. It is not a list of everything we offer." },
  { title: "WhatsApp, when you are ready", text: "Ask in a message. An enquiry is a conversation. It is not an approval or a quotation." },
]

const reading = [
  { title: "SIP or lumpsum", text: "What actually changes when you invest monthly instead of once.", to: "/knowledge/blogs/sip-and-lumpsum" },
  { title: "A short awareness guide", text: "Money you may need soon, and money that can stay invested, are different jobs.", to: "/knowledge/awareness" },
  { title: "Questions before a policy", text: "What to ask before you treat a policy as cover.", to: "/knowledge/blogs/questions-before-buying-insurance" },
  { title: "Videos", text: "Short explainers, when a page of text is the wrong format.", to: "/knowledge/videos" },
  { title: "FAQs", text: "The questions families ask before the first meeting.", to: "/knowledge/faqs" },
]

function Frame({
  photo,
  className,
  sizes,
  priority = false,
}: {
  photo: Photo
  className: string
  sizes: string
  priority?: boolean
}) {
  return (
    <img
      src={photo.src}
      srcSet={photo.srcSet}
      sizes={sizes}
      alt={photo.alt}
      width={1280}
      height={800}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={className}
    />
  )
}

export function HomePage() {
  const meta = pageMeta("/")
  const featured = posts.slice(0, 2)
  return (
    <>
      <Seo title={meta.title} description={meta.description} path={meta.path} jsonLd={breadcrumbJson(meta.crumbs)} />

      <section className="hero-wash">
        <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-5 py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-6">
            <h1 className="max-w-xl font-serif text-5xl font-light leading-[1.05] text-ink sm:text-6xl">
              Every family has <span className="font-bold text-muted">dreams.</span> Let’s make a plan for them.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink">{site.supporting}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/services/mutual-funds" className="btn-sage inline-flex">
                Explore Financial Services
              </Link>
              <WhatsAppLink intent="general" className="btn-line inline-flex">
                Talk to Us
              </WhatsAppLink>
            </div>
            <p className="mt-6 text-sm text-muted">{site.tagline}</p>
          </div>
          <figure className="lg:col-span-6">
            <Frame photo={photos.heroFamily} priority sizes="(min-width: 1024px) 46vw, 100vw" className="aspect-[16/10] w-full object-cover" />
          </figure>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[1240px] px-5 py-16 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-leaf">Every family. Every financial milestone.</p>
            <h2 className="mt-3 font-serif text-4xl font-bold leading-[1.1] text-ink sm:text-5xl">Money decisions change as life moves forward.</h2>
          </div>
          <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2">
            {stages.map((stage) => (
              <article key={stage.kicker}>
                {stage.photo ? (
                  <Link to={stage.to} className="block">
                    <Frame photo={stage.photo} sizes="(min-width: 640px) 46vw, 100vw" className="aspect-[16/10] w-full object-cover" />
                  </Link>
                ) : null}
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-leaf">{stage.kicker}</p>
                <h3 className="mt-2 font-serif text-3xl font-bold text-ink">
                  <Link to={stage.to} className="hover:text-forest">
                    {stage.title}
                  </Link>
                </h3>
                <p className="mt-3 max-w-md leading-relaxed text-muted">{stage.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-[1240px] px-5 py-16 lg:py-24">
          <h2 className="max-w-3xl font-serif text-4xl font-bold leading-[1.1] text-ink sm:text-5xl">Different needs. Practical financial solutions.</h2>
          <div className="mt-14 space-y-16">
            {services.map((service, index) => (
              <article key={service.slug} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <Frame photo={service.photo} sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[4/3] w-full object-cover" />
                </div>
                <div>
                  <h3 className="font-serif text-3xl font-bold text-ink sm:text-4xl">{service.title}</h3>
                  <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">{service.text}</p>
                  <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                    <Link to={`/services/${service.slug}`} className="btn-line inline-flex justify-center">
                      Learn more
                    </Link>
                    <WhatsAppLink intent={service.intent} className="btn-sage inline-flex justify-center gap-2">
                      WhatsApp enquiry
                    </WhatsAppLink>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[1240px] px-5 py-16 lg:py-24">
          <h2 className="max-w-3xl font-serif text-4xl font-bold leading-[1.1] text-ink sm:text-5xl">Some financial questions are easier when someone explains them.</h2>
          <div className="mt-12 divide-y divide-line border-y border-line">
            {questions.map((item) => (
              <article key={item.q} className="grid gap-3 py-7 lg:grid-cols-12 lg:items-baseline">
                <h3 className="font-serif text-2xl font-bold text-ink lg:col-span-6">
                  <Link to={item.to} className="hover:text-forest">
                    {item.q}
                  </Link>
                </h3>
                <p className="leading-relaxed text-muted lg:col-span-6">{item.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-[1240px] px-5 py-16 lg:py-24">
          <h2 className="font-serif text-4xl font-bold leading-[1.1] text-ink sm:text-5xl">Let’s take it one step at a time.</h2>
          <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step) => (
              <li key={step.n} className="border-t border-forest/20 pt-5">
                <p className="text-xs font-semibold tracking-[0.16em] text-leaf">{step.n}</p>
                <h3 className="mt-3 font-serif text-xl font-bold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[1240px] px-5 py-16 lg:py-24">
          <h2 className="font-serif text-4xl font-bold leading-[1.1] text-ink sm:text-5xl">Before you decide, see the numbers.</h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            A ₹1,000 monthly SIP, typed at 12% for 10 years, invests {formatInr(sipExample.invested)} and illustrates {formatInr(sipExample.maturity)}. That is an assumption inside the calculator, not a return you will receive.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {calculatorTools.map((tool) => (
              <Link
                key={tool.slug}
                to={`/calculators/${tool.slug}`}
                className="flex h-full flex-col border border-line bg-white p-6 transition hover:border-leaf hover:bg-mint"
              >
                <span className="font-serif text-2xl font-bold text-ink">{tool.title}</span>
                <span className="mt-2 flex-1 leading-relaxed text-muted">{tool.summary}</span>
                <span className="mt-5 text-base font-bold text-leaf">Open calculator</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-5">
            <h2 className="font-serif text-4xl font-bold leading-[1.1] text-ink sm:text-5xl">Why people write to FinancialKatta</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">We explain the choice. We do not publish client counts, ratings or results we cannot show.</p>
          </div>
          <ul className="space-y-8 lg:col-span-7">
            {reasons.map((reason) => (
              <li key={reason.title} className="border-t border-line pt-5">
                <h3 className="font-serif text-2xl font-bold text-ink">{reason.title}</h3>
                <p className="mt-2 max-w-xl leading-relaxed text-muted">{reason.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {verifiedTestimonials.length > 0 ? (
        <section className="bg-white">
          <div className="mx-auto max-w-[1240px] px-5 py-16 lg:py-24">
            <h2 className="font-serif text-4xl font-bold text-ink">What clients have said</h2>
            <div className="mt-10 grid gap-10 lg:grid-cols-2">
              {verifiedTestimonials.map((item) => (
                <blockquote key={item.id} className="border-t border-line pt-6">
                  <p className="text-lg leading-relaxed text-ink">“{item.quote}”</p>
                  <footer className="mt-4 text-sm text-muted">
                    {item.name}
                    {item.context ? ` · ${item.context}` : ""}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-cream">
        <div className="mx-auto max-w-[1240px] px-5 py-16 lg:py-24">
          <h2 className="max-w-3xl font-serif text-4xl font-bold leading-[1.1] text-ink sm:text-5xl">Understand money a little better, one topic at a time.</h2>
          <div className="mt-12 grid gap-10 lg:grid-cols-12">
            <div className="space-y-8 lg:col-span-7">
              {reading.map((item) => (
                <article key={item.title} className="border-t border-line pt-5">
                  <h3 className="font-serif text-2xl font-bold text-ink">
                    <Link to={item.to} className="hover:text-forest">
                      {item.title}
                    </Link>
                  </h3>
                  <p className="mt-2 max-w-lg text-muted">{item.text}</p>
                </article>
              ))}
            </div>
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-leaf">From the desk</p>
              <ul className="mt-4 space-y-6">
                {featured.map((post) => (
                  <li key={post.slug}>
                    <Link to={`/knowledge/blogs/${post.slug}`} className="font-serif text-xl font-bold text-ink hover:text-forest">
                      {post.title}
                    </Link>
                    <p className="mt-2 text-sm text-muted">{post.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-[1240px] items-center gap-10 px-5 py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-5">
            {advisorIsPublished && advisor.photoSrc ? (
              <img
                src={advisor.photoSrc}
                alt={advisor.photoAlt || advisor.name}
                className="aspect-[4/5] w-full object-cover object-top"
                width={800}
                height={1000}
                loading="lazy"
              />
            ) : (
              <div className="flex aspect-[4/5] items-end bg-mint p-6">
                <p className="text-sm text-muted">Prasad Prakashrao Chidrawar, mutual fund distributor, Pune.</p>
              </div>
            )}
          </div>
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-leaf">About</p>
            <h2 className="mt-3 font-serif text-4xl font-bold leading-[1.1] text-ink sm:text-5xl">
              {advisorIsPublished ? advisor.name : "FinancialKatta"}
            </h2>
            {advisorIsPublished ? <p className="mt-4 text-leaf">{advisor.role}</p> : null}
            {publishedRegistrations.length > 0 ? (
              <ul className="mt-4 space-y-1 text-sm text-ink">
                {publishedRegistrations.map((item) => (
                  <li key={item.label}>
                    {item.label}: {item.value}
                  </li>
                ))}
              </ul>
            ) : null}
            <div className="mt-6 space-y-4 leading-relaxed text-muted">
              {(advisorIsPublished ? advisor.paragraphs : ["Message us on WhatsApp and we will tell you who will take the conversation."]).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <Link to="/about/advisor" className="mt-6 inline-block text-sm font-semibold text-forest underline decoration-leaf/50 underline-offset-4">
              Read the profile
            </Link>
          </div>
        </div>
      </section>

      {partners.length > 0 ? (
        <section className="bg-cream">
          <div className="mx-auto max-w-[1240px] px-5 py-16">
            <h2 className="font-serif text-3xl font-bold text-ink">Associate partners</h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2">
              {partners.map((partner) => (
                <li key={partner.name} className="border-t border-line pt-4">
                  <p className="font-semibold text-ink">{partner.name}</p>
                  {safeHttpUrl(partner.href) ? (
                    <a href={safeHttpUrl(partner.href)!} className="text-sm text-forest" target="_blank" rel="noopener noreferrer">
                      {partner.href}
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section id="contact" className="bg-night text-white">
        <div className="mx-auto max-w-[1240px] px-5 py-16 lg:py-24">
          <h2 className="max-w-3xl font-serif text-4xl font-bold leading-[1.1] sm:text-5xl">Have something on your mind? Let’s talk.</h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">
            WhatsApp {site.phoneDisplay}. Tell us what you are planning. We will reply with the next useful question, not a product pitch.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <WhatsAppLink intent="general" className="btn-sage inline-flex">
              Talk to Us
            </WhatsAppLink>
            <Link to="/contact" className="inline-flex items-center justify-center rounded-[14px] border border-white/50 px-[25px] py-[14px] text-xs font-bold uppercase tracking-[0.36px] text-white">
              Send an enquiry
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
