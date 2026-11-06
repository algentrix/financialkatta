import { site, type WhatsAppIntent } from "../config/site"

export function whatsappHref(intent: WhatsAppIntent, extra?: string) {
  const base = site.whatsapp.messages[intent]
  const message = extra ? `${base}\n\n${extra}` : base
  return `${site.whatsapp.baseUrl}?text=${encodeURIComponent(message)}`
}
