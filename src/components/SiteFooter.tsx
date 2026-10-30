import { footerContent } from '../content/homeSections'
import { Reveal } from './Reveal'

export function SiteFooter() {
  return <Reveal as="footer" className="site-footer" variant="fade">
    <div className="site-footer__main page-container">
      <a className="site-footer__brand" href="/" aria-label={`${footerContent.brand}, Inicio`}>
        <span>{footerContent.brand}</span><small>{footerContent.tagline}</small>
      </a>
      <nav className="site-footer__navigation" aria-label={footerContent.navigationTitle}>
        <h2>{footerContent.navigationTitle}</h2>
        {footerContent.navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        <a className="site-footer__project-link" href="/contacto">{footerContent.projectLink}<span aria-hidden="true">→</span></a>
      </nav>
      <div className="site-footer__contact">
        <h2>{footerContent.contactTitle}</h2>
        <a className="site-footer__contact-detail" href={`mailto:${footerContent.email}`}>{footerContent.email}</a>
        <a className="site-footer__contact-detail" href={footerContent.phoneHref}>{footerContent.phone}</a>
        {footerContent.socialProfiles.map((profile) => <p className="site-footer__social" key={profile.network}><span>{profile.network}:</span> {profile.name}</p>)}
      </div>
    </div>
    <div className="site-footer__legal">
      <div className="page-container">
        <span>{footerContent.copyright}</span>
        <span>{footerContent.privacy}</span>
      </div>
    </div>
  </Reveal>
}
