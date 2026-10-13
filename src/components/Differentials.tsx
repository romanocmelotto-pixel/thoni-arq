import './Differentials.css'
import { SectionWrapper } from './ui/SectionWrapper'

const DIFFERENTIALS = [
  { number: '01', title: 'Identidade visual do seu negócio no centro do projeto', body: 'Cada espaço comercial é uma extensão da sua marca. Projetamos ambientes que comunicam seus valores antes mesmo de abrir a boca.' },
  { number: '02', title: 'Escuta ativa e projeto co-criado com você', body: 'Nada é decidido sem o seu envolvimento. Suas preferências, rotinas e necessidades guiam cada escolha de projeto.' },
  { number: '03', title: 'Visualização em 3D antes da execução', body: 'Você aprova o espaço virtualmente antes de qualquer obra. Sem surpresas, sem retrabalho.' },
  { number: '04', title: 'Acompanhamento próximo em todas as etapas', body: 'Da concepção à entrega das chaves, estamos presentes para garantir que a execução reflita fielmente o projeto.' },
  { number: '05', title: 'Atendimento personalizado e ágil', body: 'Você fala diretamente com a arquiteta responsável. Sem intermediários, com respostas rápidas e comunicação clara.' },
]

export function Differentials() {
  return (
    <SectionWrapper variant="light">
      <div className="differentials__layout">
        <div className="differentials__left">
          <p className="section-label">Por que nos escolher</p>
          <h2 className="differentials__title">
            Cada projeto é único.
            <br />
            <em>Como o seu negócio.</em>
          </h2>
          <span className="divider" />
          <p className="differentials__body">
            Na Thoni Arquitetura, acreditamos que um bom projeto vai além da estética.
            Ele precisa funcionar para quem usa, comunicar para quem visita
            e durar para quem investe.
          </p>
        </div>

        <div className="differentials__right">
          {DIFFERENTIALS.map(d => (
            <div key={d.number} className="differentials__item">
              <span className="differentials__number">{d.number}</span>
              <div className="differentials__item-content">
                <h3 className="differentials__item-title">{d.title}</h3>
                <p className="differentials__item-body">{d.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
