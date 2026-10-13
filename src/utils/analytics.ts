// =========================================================
// Analytics helpers — centraliza todos os eventos GTM/GA4
// =========================================================

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}

function push(event: Record<string, unknown>) {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push(event)
  }
}

export function trackWhatsAppClick(source: string) {
  push({
    event: 'whatsapp_click',
    event_category: 'engagement',
    event_label: source,
    whatsapp_source: source,
  })
}

export function trackPortfolioFilter(category: string) {
  push({
    event: 'portfolio_filter',
    event_category: 'engagement',
    event_label: category,
    filter_category: category,
  })
}

export function trackPortfolioOpen(projectName: string) {
  push({
    event: 'portfolio_open',
    event_category: 'engagement',
    event_label: projectName,
    project_name: projectName,
  })
}
