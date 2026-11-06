export type Partner = {
  name: string
  description: string
  logoSrc: string
  href: string
}

/** Add a partner only when the relationship is real and the logo is licensed for this site. */
export const partners: Partner[] = []
