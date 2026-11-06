export type Testimonial = {
  id: string
  quote: string
  name: string
  context: string
  /** Only verified client feedback is shown. Do not mark placeholders as verified. */
  verified: boolean
}

export const testimonials: Testimonial[] = []

export const verifiedTestimonials = testimonials.filter((item) => item.verified && item.quote.trim() && item.name.trim())
