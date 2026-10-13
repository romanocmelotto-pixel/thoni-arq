import { useState } from 'react'
import './Portfolio.css'
import { SectionWrapper } from './ui/SectionWrapper'
import { trackPortfolioFilter, trackPortfolioOpen } from '../utils/analytics'

type Category = 'todos' | 'comercial' | 'residencial'

interface Project {
  id: string
  name: string
  category: Exclude<Category, 'todos'>
  cover: string
  images: string[]
  label: string
  description: string
}

const PROJECTS: Project[] = [
  {
    id: 'clinica-odonto',
    name: 'Consultório Odontológico',
    category: 'comercial',
    cover: '/images/portfolio/clinica-odonto-1.jpg',
    images: [
      '/images/portfolio/clinica-odonto-1.jpg',
      '/images/portfolio/clinica-odonto-2.jpg',
      '/images/portfolio/clinica-odonto-3.jpg',
      '/images/portfolio/clinica-odonto-4.jpg',
      '/images/portfolio/clinica-odonto-5.jpg',
      '/images/portfolio/clinica-odonto-6.jpg',
    ],
    label: 'Projeto Comercial · Consultório',
    description: 'Projeto de arquitetura para consultório odontológico. Divisórias com fios dourados, iluminação técnica e ambientação que transmite sofisticação e conforto ao paciente.',
  },
  {
    id: 'salao-beleza',
    name: 'Salão de Beleza',
    category: 'comercial',
    cover: '/images/portfolio/salao-1.jpg',
    images: [
      '/images/portfolio/salao-1.jpg',
      '/images/portfolio/salao-2.jpg',
    ],
    label: 'Projeto Comercial · Estética',
    description: 'Salão de beleza com painel de madeira ripado, espelho circular com iluminação embutida e atmosfera acolhedora que posiciona a marca no segmento premium.',
  },
  {
    id: 'clinica-vet',
    name: 'Clínica Veterinária Moverpet',
    category: 'comercial',
    cover: '/images/portfolio/clinica-vet-1.jpg',
    images: [
      '/images/portfolio/clinica-vet-1.jpg',
      '/images/portfolio/clinica-vet-2.jpg',
      '/images/portfolio/clinica-vet-3.jpg',
    ],
    label: 'Projeto Comercial · Clínica',
    description: 'Recepção da clínica veterinária Moverpet com arco iluminado, paleta de cores vibrante e layout funcional que cria um ambiente acolhedor para tutores e animais.',
  },
  {
    id: 'residencial-1',
    name: 'Residência com Área Gourmet',
    category: 'residencial',
    cover: '/images/portfolio/residencial1-1.jpg',
    images: [
      '/images/portfolio/residencial1-1.jpg',
      '/images/portfolio/residencial1-2.jpg',
      '/images/portfolio/residencial1-3.jpg',
      '/images/portfolio/residencial1-4.jpg',
      '/images/portfolio/residencial1-5.jpg',
      '/images/portfolio/residencial1-6.jpg',
      '/images/portfolio/residencial1-7.jpg',
      '/images/portfolio/residencial1-8.jpg',
    ],
    label: 'Projeto Residencial · Área Externa',
    description: 'Projeto residencial com área de lazer completa: piscina com cascata, jardim vertical, fachada em madeira e integração harmoniosa entre arquitetura e paisagismo.',
  },
  {
    id: 'residencial-2',
    name: 'Residência Contemporânea',
    category: 'residencial',
    cover: '/images/portfolio/residencial2-1.jpg',
    images: [
      '/images/portfolio/residencial2-1.jpg',
      '/images/portfolio/residencial2-2.jpg',
      '/images/portfolio/residencial2-3.jpg',
      '/images/portfolio/residencial2-4.jpg',
      '/images/portfolio/residencial2-5.jpg',
      '/images/portfolio/residencial2-6.jpg',
      '/images/portfolio/residencial2-7.jpg',
      '/images/portfolio/residencial2-8.jpg',
    ],
    label: 'Projeto Residencial · Interior e Exterior',
    description: 'Residência contemporânea com linguagem arquitetônica limpa, volumes bem definidos e interiores que equilibram funcionalidade e elegância em cada ambiente.',
  },
]

const FILTERS: { value: Category; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'comercial', label: 'Comercial' },
  { value: 'residencial', label: 'Residencial' },
]

export function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<Category>('todos')
  const [lightbox, setLightbox] = useState<{ project: Project; index: number } | null>(null)

  const filtered = activeFilter === 'todos'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeFilter)

  function handleFilter(cat: Category) {
    setActiveFilter(cat)
    trackPortfolioFilter(cat)
  }

  function openLightbox(project: Project, index = 0) {
    setLightbox({ project, index })
    trackPortfolioOpen(project.name)
    document.body.style.overflow = 'hidden'
  }

  function closeLightbox() {
    setLightbox(null)
    document.body.style.overflow = ''
  }

  function prevImage() {
    if (!lightbox) return
    setLightbox(l => l ? {
      ...l,
      index: (l.index - 1 + l.project.images.length) % l.project.images.length,
    } : null)
  }

  function nextImage() {
    if (!lightbox) return
    setLightbox(l => l ? {
      ...l,
      index: (l.index + 1) % l.project.images.length,
    } : null)
  }

  return (
    <>
      <SectionWrapper id="portfolio" variant="light">
        <p className="section-label">Portfólio</p>
        <h2 className="portfolio__title">Projetos que contam histórias</h2>
        <span className="divider" />

        {/* Filters */}
        <div className="portfolio__filters" role="tablist" aria-label="Filtrar projetos">
          {FILTERS.map(f => (
            <button
              key={f.value}
              className={`portfolio__filter-btn ${activeFilter === f.value ? 'portfolio__filter-btn--active' : ''}`}
              onClick={() => handleFilter(f.value)}
              role="tab"
              aria-selected={activeFilter === f.value}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="portfolio__grid">
          {filtered.map(project => (
            <article
              key={project.id}
              className="portfolio__card"
              onClick={() => openLightbox(project)}
              role="button"
              tabIndex={0}
              aria-label={`Ver projeto: ${project.name}`}
              onKeyDown={e => e.key === 'Enter' && openLightbox(project)}
            >
              <div className="portfolio__card-img-wrap">
                <img
                  src={project.cover}
                  alt={project.name}
                  className="portfolio__card-img"
                  loading="lazy"
                />
                <div className="portfolio__card-overlay">
                  <span className="portfolio__card-label">{project.label}</span>
                  <h3 className="portfolio__card-name">{project.name}</h3>
                  <span className="portfolio__card-cta">Ver projeto →</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </SectionWrapper>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Projeto: ${lightbox.project.name}`}
          onClick={e => { if (e.target === e.currentTarget) closeLightbox() }}
        >
          <div className="lightbox__inner">
            {/* Header */}
            <div className="lightbox__header">
              <div>
                <span className="lightbox__label">{lightbox.project.label}</span>
                <h3 className="lightbox__title">{lightbox.project.name}</h3>
              </div>
              <button className="lightbox__close" onClick={closeLightbox} aria-label="Fechar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Image */}
            <div className="lightbox__image-wrap">
              <img
                src={lightbox.project.images[lightbox.index]}
                alt={`${lightbox.project.name} — imagem ${lightbox.index + 1}`}
                className="lightbox__image"
              />
              {/* Nav arrows */}
              {lightbox.project.images.length > 1 && (
                <>
                  <button className="lightbox__nav lightbox__nav--prev" onClick={prevImage} aria-label="Imagem anterior">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button className="lightbox__nav lightbox__nav--next" onClick={nextImage} aria-label="Próxima imagem">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </>
              )}
              <span className="lightbox__counter">
                {lightbox.index + 1} / {lightbox.project.images.length}
              </span>
            </div>

            {/* Thumbnails */}
            {lightbox.project.images.length > 1 && (
              <div className="lightbox__thumbs">
                {lightbox.project.images.map((img, i) => (
                  <button
                    key={i}
                    className={`lightbox__thumb ${i === lightbox.index ? 'lightbox__thumb--active' : ''}`}
                    onClick={() => setLightbox(l => l ? { ...l, index: i } : null)}
                    aria-label={`Ir para imagem ${i + 1}`}
                  >
                    <img src={img} alt="" loading="lazy" />
                  </button>
                ))}
              </div>
            )}

            {/* Description */}
            <p className="lightbox__desc">{lightbox.project.description}</p>
          </div>
        </div>
      )}
    </>
  )
}
