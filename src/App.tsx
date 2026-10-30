import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { ExperienceSection } from './components/ExperienceSection'
import { ServicesSection } from './components/ServicesSection'
import { TechnologyIntroduction } from './components/TechnologyIntroduction'
import { TechnologyCatalog } from './components/TechnologyCatalog'
import { WorkflowSection } from './components/WorkflowSection'
import { CallToAction } from './components/CallToAction'
import { SiteFooter } from './components/SiteFooter'
import { ServicesPage } from './pages/ServicesPage'
import { AboutPage } from './pages/AboutPage'
import { UniversityPage } from './pages/UniversityPage'
import { ContactPage } from './pages/ContactPage'

export default function App() {
  const path = location.pathname
  const isHome = path === '/' || path === '/index.html'
  return <div className="site-shell">
    {isHome ? <><Header /><Hero /><ExperienceSection /><ServicesSection /><TechnologyIntroduction /><TechnologyCatalog /><WorkflowSection /><CallToAction /><SiteFooter /></> : path === '/servicios' ? <><Header /><ServicesPage /><CallToAction /><SiteFooter /></> : path === '/nosotros' ? <><Header /><AboutPage /><CallToAction /><SiteFooter /></> : path === '/university' ? <><Header /><UniversityPage /><SiteFooter /></> : path === '/contacto' ? <><Header /><ContactPage /><SiteFooter /></> : <main className="empty-page" aria-label="Página no encontrada" />}
  </div>
}
