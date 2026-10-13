import './FinalCTA.css'
import { Button } from './ui/Button'
import { buildWhatsAppLink } from '../config/brand'
import { trackWhatsAppClick } from '../utils/analytics'

export function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="final-cta__inner">
        <p className="section-label">Vamos conversar?</p>
        <h2 className="final-cta__title">
          Pronto para transformar
          <br />
          <em>o seu espaço?</em>
        </h2>
        <p className="final-cta__subtitle">
          Entre em contato e descubra como a Thoni Arquitetura pode criar
          um projeto que reflete a identidade do seu negócio ou da sua vida.
        </p>
        <Button
          href={buildWhatsAppLink('final')}
          variant="primary"
          size="lg"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick('final-cta')}
        >
          Solicitar orçamento pelo WhatsApp
        </Button>
      </div>
    </section>
  )
}
