export function formatInr(value: number, digits = 0) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(value)
}

export function inrScale(value: number) {
  const abs = Math.abs(value)
  if (abs >= 1_00_00_000) return `${formatInr(value / 1_00_00_000, 2)} crore`
  if (abs >= 1_00_000) return `${formatInr(value / 1_00_000, 2)} lakh`
  return formatInr(value, 0)
}

export function parseAmount(raw: string) {
  const cleaned = raw.replace(/,/g, "").trim()
  if (!cleaned) return null
  const value = Number(cleaned)
  if (!Number.isFinite(value)) return null
  return value
}

export function safeHttpUrl(url: string) {
  try {
    const parsed = new URL(url)
    if (parsed.protocol === "https:" || parsed.protocol === "http:") return parsed.toString()
    return null
  } catch {
    return null
  }
}

export function formatDisplayDate(iso: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso))
}
