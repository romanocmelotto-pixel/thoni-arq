import './About.css'
import { SectionWrapper } from './ui/SectionWrapper'
import { Button } from './ui/Button'
import { buildWhatsAppLink } from '../config/brand'
import { trackWhatsAppClick } from '../utils/analytics'

export function About() {
  return (
    <SectionWrapper id="sobre" variant="light">
      <div className="about__layout">
        {/* Image side */}
        <div className="about__image-wrap">
          <img
            src="/images/about/mery-1.jpg"
            alt="Meryellen Thoni Melotto — Arquiteta, fundadora da Thoni Arquitetura"
            className="about__image"
            loading="lazy"
          />
          <div className="about__image-badge">
            <span className="about__badge-number">+30</span>
            <span className="about__badge-label">Projetos entregues</span>
          </div>
        </div>

        {/* Text side */}
        <div className="about__text">
          <p className="section-label">Sobre mim</p>
          <h2 className="about__title">
            Meryellen Thoni Melotto
          </h2>
          <span className="divider" />

          <p className="about__body">
            Sou arquiteta e urbanista, fundadora da Thoni Arquitetura, com atuação em projetos
            comerciais e residenciais em Volta Redonda, Sul Fluminense e, de forma remota,
            em todo o Brasil.
          </p>
          <p className="about__body">
            Acredito que um espaço bem projetado tem o poder de transformar negócios e vidas.
            Por isso, coloco cada cliente no centro do processo criativo, entendendo sua história,
            seus objetivos e sua identidade antes de qualquer risca no papel.
          </p>
          <p className="about__body">
            Minha especialidade é criar espaços comerciais que comunicam, encantam e convertem —
            clínicas, consultórios, salões e estabelecimentos que se tornam parte da marca
            de quem os habita.
          </p>

          <div className="about__cta">
            <Button
              href={buildWhatsAppLink('final')}
              variant="primary"
              size="md"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('about')}
            >
              Conversar com Meryellen
            </Button>
            <a
              href="https://www.instagram.com/thoniarquitetura"
              target="_blank"
              rel="noopener noreferrer"
              className="about__instagram"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
              @thoniarquitetura
            </a>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
