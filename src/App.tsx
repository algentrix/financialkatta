import { lazy } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Layout } from "./components/Layout"

const HomePage = lazy(() => import("./pages/HomePage").then((module) => ({ default: module.HomePage })))
const AboutPage = lazy(() => import("./pages/AboutPages").then((module) => ({ default: module.AboutPage })))
const AdvisorPage = lazy(() => import("./pages/AboutPages").then((module) => ({ default: module.AdvisorPage })))
const VisionPage = lazy(() => import("./pages/AboutPages").then((module) => ({ default: module.VisionPage })))
const ServicePage = lazy(() => import("./pages/ServicePage").then((module) => ({ default: module.ServicePage })))
const CalculatorsPage = lazy(() => import("./pages/CalculatorPages").then((module) => ({ default: module.CalculatorsPage })))
const CalculatorPage = lazy(() => import("./pages/CalculatorPages").then((module) => ({ default: module.CalculatorPage })))
const KnowledgePage = lazy(() => import("./pages/KnowledgePages").then((module) => ({ default: module.KnowledgePage })))
const BlogsPage = lazy(() => import("./pages/KnowledgePages").then((module) => ({ default: module.BlogsPage })))
const BlogDetailPage = lazy(() => import("./pages/KnowledgePages").then((module) => ({ default: module.BlogDetailPage })))
const AwarenessPage = lazy(() => import("./pages/KnowledgePages").then((module) => ({ default: module.AwarenessPage })))
const VideosPage = lazy(() => import("./pages/KnowledgePages").then((module) => ({ default: module.VideosPage })))
const FaqsPage = lazy(() => import("./pages/KnowledgePages").then((module) => ({ default: module.FaqsPage })))
const TestimonialsPage = lazy(() => import("./pages/CommunityPages").then((module) => ({ default: module.TestimonialsPage })))
const PartnersPage = lazy(() => import("./pages/CommunityPages").then((module) => ({ default: module.PartnersPage })))
const InvitationPage = lazy(() => import("./pages/CommunityPages").then((module) => ({ default: module.InvitationPage })))
const ContactPage = lazy(() => import("./pages/ContactPage").then((module) => ({ default: module.ContactPage })))
const LegalPage = lazy(() => import("./pages/LegalPage").then((module) => ({ default: module.LegalPage })))
const NotFoundPage = lazy(() => import("./pages/NotFoundPage").then((module) => ({ default: module.NotFoundPage })))

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="about/advisor" element={<AdvisorPage />} />
          <Route path="about/vision" element={<VisionPage />} />
          <Route path="services/:slug" element={<ServicePage />} />
          <Route path="calculators" element={<CalculatorsPage />} />
          <Route path="calculators/:tool" element={<CalculatorPage />} />
          <Route path="knowledge" element={<KnowledgePage />} />
          <Route path="knowledge/blogs" element={<BlogsPage />} />
          <Route path="knowledge/blogs/:slug" element={<BlogDetailPage />} />
          <Route path="knowledge/awareness" element={<AwarenessPage />} />
          <Route path="knowledge/videos" element={<VideosPage />} />
          <Route path="knowledge/faqs" element={<FaqsPage />} />
          <Route path="testimonials" element={<TestimonialsPage />} />
          <Route path="partners" element={<PartnersPage />} />
          <Route path="invitation" element={<InvitationPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="privacy-policy" element={<LegalPage id="privacy" />} />
          <Route path="terms" element={<LegalPage id="terms" />} />
          <Route path="disclaimer" element={<LegalPage id="disclaimer" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
