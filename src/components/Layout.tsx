import { Suspense, useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { Footer, WhatsAppFloat } from "./Footer"
import { Header } from "./Header"

export function Layout() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const target = document.querySelector(location.hash)
      if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: "smooth", block: "start" })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [location.pathname, location.hash])

  return (
    <div className="min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:text-navy"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Suspense fallback={<p className="px-5 py-24 text-navy">Loading…</p>}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
