import React from 'react';
import { BRAND, getWhatsAppUrl } from '../config/brand';
import { trackWhatsAppClick } from '../utils/analytics';
import './Footer.css';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleScrollTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-root">
      <div className="container footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <img
              src="/images/logo/logo-clara.png"
              alt={BRAND.name}
              className="footer-logo"
              loading="lazy"
            />
            <p className="footer-tagline">
              Arquitetura comercial e de interiores orientada à identidade, funcionalidade e planejamento técnico.
            </p>
            <div className="footer-registration">
              <span>{BRAND.architect}</span>
              <span className="footer-reg-divider">•</span>
              <span>{BRAND.degree}</span>
            </div>
          </div>

          <div className="footer-nav">
            <h4 className="footer-col-title">Navegação</h4>
            <ul className="footer-links">
              <li><a href="#portfolio">Projetos</a></li>
              <li><a href="#servicos">Serviços</a></li>
              <li><a href="#diferenciais">Diferenciais</a></li>
              <li><a href="#processo">Como Trabalhamos</a></li>
              <li><a href="#sobre">Sobre a Arquiteta</a></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4 className="footer-col-title">Contato e Atendimento</h4>
            <ul className="footer-contact-list">
              <li>
                <span className="contact-label">WhatsApp</span>
                <a
                  href={getWhatsAppUrl('Olá, Meryellen! Gostaria de agendar uma reunião sobre o meu projeto.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('footer')}
                  className="footer-contact-link"
                >
                  {BRAND.whatsappDisplay}
                </a>
              </li>
              <li>
                <span className="contact-label">Instagram</span>
                <a
                  href={BRAND.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-contact-link"
                >
                  {BRAND.instagramHandle}
                </a>
              </li>
              <li>
                <span className="contact-label">Local de Atendimento</span>
                <p className="contact-desc">
                  {BRAND.locationPrimary}.
                  <br />
                  <span className="contact-remote">{BRAND.locationRemote}</span>
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} {BRAND.name} — Todos os direitos reservados.
          </p>
          <div className="footer-meta">
            <span className="footer-disclaimer">
              Projetos autorais e atendimento personalizado para ambientes comerciais e residenciais.
            </span>
            <a href="#hero" onClick={handleScrollTop} className="footer-back-to-top" aria-label="Voltar ao início">
              Voltar ao topo ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
