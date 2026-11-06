type BrandMarkProps = {
  className?: string
}

export function BrandMark({ className = "h-9 w-9" }: BrandMarkProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="16" fill="#67BA94" />
      <path d="M19.5 30 L49.2 13.2" fill="none" stroke="#FFFFFF" strokeWidth="7.8" strokeLinecap="round" />
      <path d="M19.5 34.4 L45.6 50.8" fill="none" stroke="#1E1E1E" strokeWidth="7.8" strokeLinecap="round" />
      <path d="M17.4 12.4 V51.6" fill="none" stroke="#1E1E1E" strokeWidth="10" strokeLinecap="round" />
    </svg>
  )
}
