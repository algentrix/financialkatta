import { useEffect, useId, useState } from "react"
import { ChevronDown, Menu, X } from "lucide-react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { services } from "../content/services"
import { BrandMark } from "./BrandMark"
import { WhatsAppLink } from "./WhatsAppLink"

const knowledgeLinks = [
  { to: "/knowledge", label: "Overview" },
  { to: "/knowledge/blogs", label: "Blogs" },
  { to: "/knowledge/awareness", label: "Financial Awareness" },
  { to: "/knowledge/videos", label: "Videos" },
  { to: "/knowledge/faqs", label: "FAQs" },
]

const serviceLinks = services.map((service) => ({
  to: `/services/${service.slug}`,
  label: service.navLabel,
}))

function itemClass(active: boolean) {
  return `inline-flex items-center px-1 py-2 text-base font-semibold ${active ? "text-leaf" : "text-ink hover:text-leaf"}`
}

export function Header() {
  const location = useLocation()
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [pinnedMenu, setPinnedMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSection, setMobileSection] = useState<string | null>(null)
  const menuId = useId()

  useEffect(() => {
    setOpenMenu(null)
    setPinnedMenu(null)
    setMobileOpen(false)
    setMobileSection(null)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  useEffect(() => {
    function onPointer(event: MouseEvent) {
      const target = event.target
      if (target instanceof Element && target.closest("[data-nav-menu]")) return
      setOpenMenu(null)
      setPinnedMenu(null)
    }
    document.addEventListener("click", onPointer)
    return () => document.removeEventListener("click", onPointer)
  }, [])

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenMenu(null)
        setPinnedMenu(null)
        setMobileOpen(false)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <header className="sticky top-0 z-40 bg-canvas">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-5 py-4">
        <Link to="/" className="flex items-center gap-3" aria-label="FinancialKatta home">
          <BrandMark className="h-11 w-11" />
          <span className="font-serif text-[1.65rem] font-semibold leading-none text-ink">FinancialKatta</span>
        </Link>

        <nav className="hidden items-center gap-5 xl:flex" aria-label="Primary">
          <NavLink to="/" end className={({ isActive }) => itemClass(isActive)}>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => itemClass(isActive)}>
            About Us
          </NavLink>
          <DesktopMenu
            id={`${menuId}-services`}
            label="Services"
            links={serviceLinks}
            open={openMenu === "services"}
            active={location.pathname.startsWith("/services")}
            onOpen={() => {
              if (pinnedMenu && pinnedMenu !== "services") return
              setOpenMenu("services")
            }}
            onClose={() => {
              if (pinnedMenu === "services") return
              setOpenMenu((current) => (current === "services" ? null : current))
            }}
            onToggle={() => {
              if (pinnedMenu === "services") {
                setPinnedMenu(null)
                setOpenMenu(null)
                return
              }
              setPinnedMenu("services")
              setOpenMenu("services")
            }}
          />
          <NavLink to="/calculators" className={({ isActive }) => itemClass(isActive)}>
            Calculators
          </NavLink>
          <DesktopMenu
            id={`${menuId}-knowledge`}
            label="Knowledge Centre"
            links={knowledgeLinks}
            open={openMenu === "knowledge"}
            active={location.pathname.startsWith("/knowledge")}
            onOpen={() => {
              if (pinnedMenu && pinnedMenu !== "knowledge") return
              setOpenMenu("knowledge")
            }}
            onClose={() => {
              if (pinnedMenu === "knowledge") return
              setOpenMenu((current) => (current === "knowledge" ? null : current))
            }}
            onToggle={() => {
              if (pinnedMenu === "knowledge") {
                setPinnedMenu(null)
                setOpenMenu(null)
                return
              }
              setPinnedMenu("knowledge")
              setOpenMenu("knowledge")
            }}
          />
          <NavLink to="/contact" className={({ isActive }) => itemClass(isActive)}>
            Contact Us
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <WhatsAppLink
            intent="general"
            className="btn-sage hidden sm:inline-flex"
          >
            Talk to Us
          </WhatsAppLink>
          <button
            type="button"
            className="inline-flex h-12 w-12 items-center justify-center text-ink xl:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div id="mobile-navigation" className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-line bg-white xl:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-5 py-4" aria-label="Mobile">
            <MobileLink to="/">Home</MobileLink>
            <MobileLink to="/about">About Us</MobileLink>
            <MobileGroup
              label="Services"
              links={serviceLinks}
              open={mobileSection === "services"}
              onToggle={() => setMobileSection((current) => (current === "services" ? null : "services"))}
            />
            <MobileLink to="/calculators">Calculators</MobileLink>
            <MobileGroup
              label="Knowledge Centre"
              links={knowledgeLinks}
              open={mobileSection === "knowledge"}
              onToggle={() => setMobileSection((current) => (current === "knowledge" ? null : "knowledge"))}
            />
            <MobileLink to="/contact">Contact Us</MobileLink>
            <WhatsAppLink
              intent="general"
              className="btn-sage mt-4 inline-flex"
            >
              WhatsApp enquiry
            </WhatsAppLink>
          </nav>
        </div>
      ) : null}
    </header>
  )
}

function DesktopMenu({
  id,
  label,
  links,
  open,
  active,
  onOpen,
  onClose,
  onToggle,
}: {
  id: string
  label: string
  links: { to: string; label: string }[]
  open: boolean
  active: boolean
  onOpen: () => void
  onClose: () => void
  onToggle: () => void
}) {
  return (
    <div className="relative" data-nav-menu onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button
        type="button"
        className={`inline-flex items-center gap-1 px-1 py-2 text-base font-semibold ${active ? "text-leaf" : "text-ink hover:text-leaf"}`}
        aria-expanded={open}
        aria-controls={id}
        onClick={onToggle}
      >
        {label}
        <ChevronDown className="h-5 w-5" aria-hidden="true" />
      </button>
      {open ? (
        <div id={id} className="absolute left-0 top-full z-20 min-w-56 pt-3">
          <ul className="border border-line bg-white py-2 shadow-lg">
            {links.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="block px-4 py-3 text-base text-ink hover:bg-canvas hover:text-leaf" role="menuitem">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

function MobileLink({ to, children }: { to: string; children: string }) {
  return (
    <NavLink to={to} className="border-b border-line py-4 text-lg font-semibold text-ink">
      {children}
    </NavLink>
  )
}

function MobileGroup({
  label,
  links,
  open,
  onToggle,
}: {
  label: string
  links: { to: string; label: string }[]
  open: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-b border-line">
      <button type="button" className="flex w-full items-center justify-between py-4 text-lg font-semibold text-ink" aria-expanded={open} onClick={onToggle}>
        {label}
        <ChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
      {open ? (
        <ul className="pb-3">
          {links.map((link) => (
            <li key={link.to}>
              <Link to={link.to} className="block py-2.5 pl-3 text-base text-ink hover:text-leaf">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
