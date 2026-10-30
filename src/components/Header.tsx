import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { homeContent } from '../content/home'

export function Header() {
  const [open, setOpen] = useState(false)
  const [compact, setCompact] = useState(() => window.scrollY > 80)
  const compactRef = useRef(compact)
  const normalizedPath = location.pathname.replace(/\/+$/, '') || '/'
  const currentPath = normalizedPath === '/index.html' ? '/' : normalizedPath
  useEffect(() => {
    const updateSize = () => {
      const next = compactRef.current ? window.scrollY >= 60 : window.scrollY > 80
      if (next !== compactRef.current) {
        compactRef.current = next
        setCompact(next)
      }
    }
    window.addEventListener('scroll', updateSize, { passive: true })
    updateSize()
    return () => window.removeEventListener('scroll', updateSize)
  }, [])

  const handleEscape = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape') {
      setOpen(false)
      document.querySelector<HTMLButtonElement>('.menu-toggle')?.focus()
    }
  }
  return <>
    <div className="site-header-spacer" aria-hidden="true" />
    <header className={`site-header${compact ? ' site-header--compact' : ''}`}>
      <a className="brand" href="/" aria-label="MBS, Inicio">
        <span className="brand__name">{homeContent.brand}</span>
        <span className="brand__tagline">{homeContent.tagline}</span>
      </a>
      <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen((value) => !value)} onKeyDown={handleEscape}>
        <span className="sr-only">{open ? 'Cerrar menú' : 'Abrir menú'}</span><span></span><span></span><span></span>
      </button>
      <nav id="primary-navigation" className={`primary-nav${open ? ' primary-nav--open' : ''}`} aria-label="Navegación principal" onKeyDown={handleEscape}>
        {homeContent.navigation.map((item) => {
          const isCurrent = currentPath === item.href
          return <a key={item.label} href={item.href} aria-current={isCurrent ? 'page' : undefined} onClick={() => setOpen(false)} className={`${isCurrent ? 'nav-link nav-link--current' : 'nav-link'}${item.arrow ? ' nav-link--contact' : ''}`}>
            <span className="nav-link__label">{item.label}</span>{item.arrow && <span className="nav-link__arrow" aria-hidden="true">→</span>}
          </a>
        })}
      </nav>
    </header>
  </>
}
