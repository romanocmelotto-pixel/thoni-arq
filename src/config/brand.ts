// =========================================================
// Configuração central da marca — edite aqui para atualizar
// informações em todo o site.
// =========================================================

export const BRAND = {
  name: 'Thoni Arquitetura',
  architect: 'Meryellen Thoni Melotto',
  degree: 'Arquiteta e Urbanista (UGB, 2019)',
  specialization: 'Especialização em Lighting Design',
  whatsapp: '5524999669070',
  whatsappDisplay: '(24) 99966-9070',
  instagram: 'https://www.instagram.com/thoniarquitetura',
  instagramHandle: '@thoniarquitetura',
  locationPrimary: 'Volta Redonda e Sul Fluminense',
  locationRemote: 'Atendimento remoto em todo o Brasil',
  coverage: 'Volta Redonda e Sul Fluminense · Atendimento remoto em todo o Brasil',
  email: '',
  site: 'https://thoniarq.com.br',
} as const;

// Mensagens pré-preenchidas para o WhatsApp por origem de clique
export const WA_MESSAGES = {
  hero: 'Ol%C3%A1%2C+Meryellen%21+Conheci+a+Thoni+Arquitetura+pelo+site+e+gostaria+de+conversar+sobre+um+projeto.',
  portfolio: 'Ol%C3%A1%2C+Meryellen%21+Vi+os+projetos+no+site+e+gostaria+de+entender+como+funciona+o+desenvolvimento+de+um+projeto.',
  services: 'Ol%C3%A1%2C+Meryellen%21+Tenho+interesse+em+um+projeto+e+gostaria+de+saber+mais+sobre+os+seus+servi%C3%A7os.',
  final: 'Ol%C3%A1%2C+Meryellen%21+Gostaria+de+solicitar+um+or%C3%A7amento+para+um+projeto+de+arquitetura.',
  floating: 'Ol%C3%A1%2C+Meryellen%21+Vim+pelo+site+da+Thoni+Arquitetura+e+gostaria+de+conversar.',
  footer: 'Ol%C3%A1%2C+Meryellen%21+Gostaria+de+agendar+uma+reuni%C3%A3o+sobre+o+meu+projeto.',
} as const;

export type WASource = keyof typeof WA_MESSAGES;

export function buildWhatsAppLink(source: WASource = 'hero'): string {
  return `https://wa.me/${BRAND.whatsapp}?text=${WA_MESSAGES[source]}`;
}

export function getWhatsAppUrl(customText?: string): string {
  if (!customText) return buildWhatsAppLink('hero');
  return `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(customText)}`;
}
