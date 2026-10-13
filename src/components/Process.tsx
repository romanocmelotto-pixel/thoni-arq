import './Process.css'
import { SectionWrapper } from './ui/SectionWrapper'

const STEPS = [
  {
    number: '01',
    title: 'Conversa inicial',
    description: 'Entendemos seus objetivos, o perfil do negócio ou da família, o espaço disponível e o investimento previsto. Tudo sem compromisso.',
  },
  {
    number: '02',
    title: 'Briefing e programa',
    description: 'Definimos juntos as necessidades, o fluxo de uso, as referências de estilo e as prioridades do projeto.',
  },
  {
    number: '03',
    title: 'Anteprojeto em 3D',
    description: 'Apresentamos a proposta em renderização fotorrealista. Você visualiza o espaço antes de qualquer decisão construtiva.',
  },
  {
    number: '04',
    title: 'Projeto executivo',
    description: 'Desenvolvemos a documentação técnica completa: plantas, cortes, detalhamentos e memorial descritivo para execução.',
  },
  {
    number: '05',
    title: 'Acompanhamento de obra',
    description: 'Visitas e suporte durante a execução para garantir que cada detalhe do projeto seja fielmente respeitado.',
  },
]

export function Process() {
  return (
    <SectionWrapper id="processo" variant="dark">
      <p className="section-label">Como trabalhamos</p>
      <h2 className="process__title">Do briefing à entrega, com você em cada etapa</h2>
      <span className="divider" />

      <div className="process__steps">
        {STEPS.map((step, i) => (
          <div key={step.number} className="process__step">
            <div className="process__step-head">
              <span className="process__step-number">{step.number}</span>
              {i < STEPS.length - 1 && <div className="process__step-line" />}
            </div>
            <div className="process__step-body">
              <h3 className="process__step-title">{step.title}</h3>
              <p className="process__step-desc">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
