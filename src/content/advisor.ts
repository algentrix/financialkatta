/** Facts taken from the advisor’s public AssetPlus onboarding page. Do not add credentials that page does not show. */
export const advisor = {
  name: "Prasad Prakashrao Chidrawar",
  role: "Mutual Fund Distributor",
  qualifications: [] as string[],
  experience: "",
  certifications: [] as string[],
  photoSrc: "/advisor/prasad.jpg",
  photoAlt: "Prasad Prakashrao Chidrawar",
  paragraphs: [
    "Prasad Prakashrao Chidrawar is a mutual fund distributor in Pune. His AMFI ARN is 272207.",
    "Clients may also know this practice as Share Market GYAN. The logo on the onboarding page reads Stock Market GYAN.",
  ],
}

export const advisorIsPublished = Boolean(advisor.name.trim())
