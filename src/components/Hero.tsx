import './Hero.css'
import { Button } from './ui/Button'
import { buildWhatsAppLink } from '../config/brand'
import { trackWhatsAppClick } from '../utils/analytics'

export function Hero() {
  return (
    <section id="top" className="hero">
      {/* Background image with overlay */}
      <div className="hero__bg">
        <img
          src="/images/portfolio/clinica-odonto-1.jpg"
          alt="Consultório odontológico projetado pela Thoni Arquitetura — divisória com fios dourados e luz natural"
          className="hero__bg-img"
          fetchPriority="high"
        />
        <div className="hero__overlay" />
      </div>

      {/* Content */}
      <div className="hero__content">
        <p className="section-label">Thoni Arquitetura</p>
        <h1 className="hero__title">
          Arquitetura que traduz a
          <em className="hero__title-em"> identidade </em>
          do seu negócio em cada espaço.
        </h1>
        <p className="hero__subtitle">
          Projetos comerciais e residenciais em Volta Redonda, Sul Fluminense<br />
          e atendimento remoto em todo o Brasil.
        </p>

        <div className="hero__actions">
          <Button
            href={buildWhatsAppLink('hero')}
            variant="primary"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('hero')}
          >
            Solicitar um orçamento
          </Button>
          <Button href="#portfolio" variant="outline" size="lg">
            Ver projetos
          </Button>
        </div>

        {/* Stats strip */}
        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-number">+30</span>
            <span className="hero__stat-label">Projetos entregues</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-number">Comercial</span>
            <span className="hero__stat-label">Especialidade principal</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-number">100%</span>
            <span className="hero__stat-label">Projetos personalizados</span>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="hero__scroll-cue" aria-hidden="true">
        <span />
      </div>
    </section>
  )
}
