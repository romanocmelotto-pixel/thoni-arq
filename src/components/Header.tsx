import { useState, useEffect } from 'react'
import './Header.css'
import { buildWhatsAppLink } from '../config/brand'
import { trackWhatsAppClick } from '../utils/analytics'

const NAV_LINKS = [
  { label: 'Portfólio', href: '#portfolio' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Processo', href: '#processo' },
  { label: 'Sobre', href: '#sobre' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Fechar menu ao clicar em link
  const handleNavClick = () => setMenuOpen(false)

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''} ${menuOpen ? 'header--open' : ''}`}>
      <div className="header__inner">
        {/* Logo */}
        <a href="#top" className="header__logo" aria-label="Thoni Arquitetura — página inicial">
          <img
            src="/images/logo/logo-clara.png"
            alt="Thoni Arquitetura"
            className="header__logo-light"
            width="160"
            height="52"
          />
          <img
            src="/images/logo/logo-roxa.png"
            alt="Thoni Arquitetura"
            className="header__logo-dark"
            width="160"
            height="52"
          />
        </a>

        {/* Desktop Nav */}
        <nav className="header__nav" aria-label="Navegação principal">
          {NAV_LINKS.map(link => (
            <a key={link.href} href={link.href} className="header__nav-link">
              {link.label}
            </a>
          ))}
          <a
            href={buildWhatsAppLink('hero')}
            className="header__cta"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('header')}
          >
            Solicitar Orçamento
          </a>
        </nav>

        {/* Hamburger */}
        <button
          className="header__hamburger"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(v => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className="header__mobile-menu" aria-hidden={!menuOpen}>
        <nav aria-label="Menu mobile">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="header__mobile-link"
              onClick={handleNavClick}
            >
              {link.label}
            </a>
          ))}
          <a
            href={buildWhatsAppLink('hero')}
            className="header__mobile-cta"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => { trackWhatsAppClick('header-mobile'); handleNavClick() }}
          >
            Solicitar Orçamento
          </a>
        </nav>
      </div>
    </header>
  )
}
