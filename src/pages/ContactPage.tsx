import { useState, type FormEvent } from "react"
import { site, type WhatsAppIntent } from "../config/site"
import { whatsappHref } from "../lib/whatsapp"
import { breadcrumbJson, pageMeta } from "../seo/sitePages"
import { SelectField, TextAreaField, TextField } from "../components/Fields"
import { PageHero } from "../components/PageChrome"
import { Seo } from "../components/Seo"
import { WhatsAppLink } from "../components/WhatsAppLink"

const interests: { value: string; label: string; intent: WhatsAppIntent }[] = [
  { value: "general", label: "General enquiry", intent: "general" },
  { value: "mutual-funds", label: "Mutual funds", intent: "mutualFunds" },
  { value: "loans", label: "Loans", intent: "loans" },
  { value: "insurance", label: "Insurance", intent: "insurance" },
  { value: "bonds", label: "Bonds", intent: "bonds" },
  { value: "planning", label: "Financial planning", intent: "general" },
  { value: "calculator", label: "A calculator result", intent: "calculator" },
]

type Errors = { name?: string; phone?: string; interest?: string; message?: string }

export function ContactPage() {
  const meta = pageMeta("/contact")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [interest, setInterest] = useState("general")
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState<Errors>({})

  function submit(event: FormEvent) {
    event.preventDefault()
    const next = validate(name, phone, interest, message)
    setErrors(next)
    if (Object.keys(next).length > 0) {
      const first = next.name ? "name" : next.phone ? "phone" : next.message ? "message" : "interest"
      document.getElementById(first)?.focus()
      return
    }
    const selected = interests.find((item) => item.value === interest) ?? interests[0]
    const extra = `Name: ${name.trim()}\nPhone: ${phone.trim()}\nTopic: ${selected.label}\nMessage: ${message.trim()}`
    window.open(whatsappHref(selected.intent, extra), "_blank", "noopener,noreferrer")
  }

  return (
    <>
      <Seo title={meta.title} description={meta.description} path={meta.path} jsonLd={breadcrumbJson(meta.crumbs)} />
      <PageHero
        eyebrow="Contact"
        title="Contact FinancialKatta"
        lede="Send a note on WhatsApp. The form checks your details in the browser and does not store them on this website."
        crumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]}
      />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 lg:grid-cols-12">
        <form onSubmit={submit} noValidate className="space-y-5 border-t border-line py-6 lg:col-span-7">
          <TextField id="name" label="Name" value={name} onChange={setName} autoComplete="name" error={errors.name} />
          <TextField
            id="phone"
            label="Mobile number"
            value={phone}
            onChange={setPhone}
            autoComplete="tel"
            inputMode="tel"
            error={errors.phone}
            hint="A 10-digit Indian mobile number."
          />
          <SelectField id="interest" label="What would you like to discuss?" value={interest} onChange={setInterest} options={interests} error={errors.interest} />
          <TextAreaField id="message" label="Message" value={message} onChange={setMessage} error={errors.message} />
          <button type="submit" className="bg-emerald px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-dark">
            Continue on WhatsApp
          </button>
          <p className="text-xs leading-relaxed text-muted">
            Submitting opens WhatsApp with your message. This website has no database and does not keep a copy.
          </p>
        </form>
        <aside className="space-y-6 lg:col-span-5">
          <div className="bg-night p-7 text-white">
            <h2 className="font-serif text-3xl">Pune</h2>
            <p className="mt-3 text-white/80">
              {site.location.city}, {site.location.state}, {site.location.country}
            </p>
            {site.location.addressLines.map((line) => (
              <p key={line} className="text-white/80">
                {line}
              </p>
            ))}
            {site.hours ? <p className="mt-3 text-white/80">{site.hours}</p> : null}
            <a href={`tel:${site.phoneE164}`} className="mt-5 block font-serif text-3xl text-gold">
              {site.phoneDisplay}
            </a>
            {site.email ? (
              <a href={`mailto:${site.email}`} className="mt-2 block text-gold">
                {site.email}
              </a>
            ) : null}
            <WhatsAppLink intent="general" className="mt-6 inline-flex items-center gap-2 bg-white px-4 py-3 text-sm font-semibold text-navy">
              Message on WhatsApp
            </WhatsAppLink>
          </div>
        </aside>
      </div>
    </>
  )
}

function validate(name: string, phone: string, interest: string, message: string): Errors {
  const errors: Errors = {}
  const cleanName = name.trim()
  if (cleanName.length < 2 || cleanName.length > 80) errors.name = "Enter your name."
  const digits = phone.replace(/\D/g, "")
  const local = digits.length > 10 ? digits.slice(-10) : digits
  if (!/^[6-9]\d{9}$/.test(local)) errors.phone = "Enter a valid 10-digit Indian mobile number."
  if (!interests.some((item) => item.value === interest)) errors.interest = "Choose a topic."
  const cleanMessage = message.trim()
  if (cleanMessage.length < 10) errors.message = "Add a short note, at least 10 characters."
  if (cleanMessage.length > 1000) errors.message = "Please keep the message under 1,000 characters."
  return errors
}
