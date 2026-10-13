import './Services.css'
import { SectionWrapper } from './ui/SectionWrapper'
import { Button } from './ui/Button'
import { buildWhatsAppLink } from '../config/brand'
import { trackWhatsAppClick } from '../utils/analytics'

const SERVICES = [
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="4" y="4" width="32" height="32" rx="0" />
        <path d="M12 28V16M20 28V12M28 28V20" strokeLinecap="round" />
      </svg>
    ),
    title: 'Projeto Arquitetônico',
    description: 'Desenvolvimento completo do projeto: plantas, cortes, fachadas e toda a documentação técnica necessária para aprovação e execução.',
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="6" y="10" width="28" height="22" rx="0" />
        <path d="M6 16h28M14 10v4M26 10v4" strokeLinecap="round" />
        <circle cx="14" cy="22" r="2" fill="currentColor" stroke="none" />
        <circle cx="26" cy="22" r="2" fill="currentColor" stroke="none" />
      </svg>
    ),
    title: 'Design de Interiores',
    description: 'Criação de ambientes com identidade própria, equilibrando estética, funcionalidade e a linguagem visual do seu negócio ou estilo de vida.',
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M8 32L20 10l12 22H8z" />
        <path d="M20 10v22M8 32h24" strokeLinecap="round" />
      </svg>
    ),
    title: 'Renderizações 3D',
    description: 'Visualizações fotorrealistas do projeto antes da execução, para que você aprove cada detalhe com segurança e clareza.',
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="20" cy="20" r="14" />
        <path d="M20 6v28M6 20h28" strokeLinecap="round" />
        <path d="M9 11c3 4 8 6 11 9M31 11c-3 4-8 6-11 9" strokeLinecap="round" />
      </svg>
    ),
    title: 'Arquitetura Comercial',
    description: 'Projetos para clínicas, consultórios, salões, lojas e escritórios. Espaços que comunicam profissionalismo e encantam clientes desde a primeira visita.',
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M8 34V18l12-10 12 10v16H8z" />
        <path d="M16 34v-8h8v8" strokeLinecap="round" />
        <path d="M20 8v2" strokeLinecap="round" />
      </svg>
    ),
    title: 'Arquitetura Residencial',
    description: 'Projetos de casas e apartamentos que refletem quem você é. Do layout à escolha dos materiais, cada detalhe pensado para o seu bem-estar.',
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M10 30c0-8 4-12 10-12s10 4 10 12" strokeLinecap="round" />
        <circle cx="20" cy="14" r="4" />
        <path d="M6 34h28" strokeLinecap="round" />
      </svg>
    ),
    title: 'Consultoria e Reforma',
    description: 'Orientação técnica para reformas, requalificação de ambientes e tomada de decisões assertivas — seja para um cômodo ou para todo o espaço.',
  },
]

export function Services() {
  return (
    <SectionWrapper id="servicos" variant="dark">
      <p className="section-label">O que fazemos</p>
      <h2 className="services__title">Serviços que entregam resultado</h2>
      <span className="divider" />

      <div className="services__grid">
        {SERVICES.map(service => (
          <div key={service.title} className="services__card">
            <div className="services__icon">{service.icon}</div>
            <h3 className="services__card-title">{service.title}</h3>
            <p className="services__card-desc">{service.description}</p>
          </div>
        ))}
      </div>

      <div className="services__cta">
        <Button
          href={buildWhatsAppLink('services')}
          variant="outline"
          size="lg"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick('services')}
        >
          Falar sobre meu projeto
        </Button>
      </div>
    </SectionWrapper>
  )
}
