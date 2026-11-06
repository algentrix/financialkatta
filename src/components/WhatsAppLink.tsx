import type { ReactNode } from "react"
import { MessageCircle } from "lucide-react"
import type { WhatsAppIntent } from "../config/site"
import { whatsappHref } from "../lib/whatsapp"

type WhatsAppLinkProps = {
  intent: WhatsAppIntent
  extra?: string
  children: ReactNode
  className?: string
}

export function WhatsAppLink({ intent, extra, children, className = "" }: WhatsAppLinkProps) {
  return (
    <a
      href={whatsappHref(intent, extra)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      <MessageCircle className="h-4 w-4" aria-hidden="true" />
      {children}
    </a>
  )
}
