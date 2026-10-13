import React from 'react';
import { BRAND, getWhatsAppUrl } from '../config/brand';
import { trackWhatsAppClick } from '../utils/analytics';
import './WhatsAppButton.css';

export const WhatsAppButton: React.FC = () => {
  const handleClick = () => {
    trackWhatsAppClick('floating');
  };

  const whatsappUrl = getWhatsAppUrl(
    'Olá, Meryellen! Gostaria de conversar sobre um projeto arquitetônico para o meu espaço.'
  );

  return (
    <aside aria-label="Atendimento rápido via WhatsApp" className="floating-wa-wrapper">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="floating-wa-button"
        aria-label={`Falar no WhatsApp com ${BRAND.name}`}
      >
        <span className="wa-pulse" aria-hidden="true" />
        <span className="wa-tooltip">Falar no WhatsApp</span>
        <svg
          className="wa-icon"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.16C10.57 20.16 9.12 19.76 7.85 19.01L7.55 18.83L4.44 19.65L5.27 16.62L5.07 16.3C4.24 14.98 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.69 12.05 3.69C14.25 3.69 16.31 4.55 17.87 6.11C19.42 7.67 20.28 9.73 20.28 11.93C20.27 16.48 16.59 20.16 12.05 20.16ZM16.57 14.36C16.32 14.23 15.1 13.63 14.87 13.55C14.64 13.47 14.48 13.43 14.31 13.68C14.15 13.93 13.68 14.48 13.53 14.64C13.39 14.81 13.25 14.83 13 14.71C12.75 14.58 11.95 14.32 11 13.48C10.26 12.82 9.76 12 9.61 11.75C9.47 11.5 9.59 11.37 9.72 11.24C9.83 11.13 9.97 10.95 10.1 10.8C10.22 10.65 10.26 10.55 10.34 10.38C10.43 10.22 10.38 10.07 10.32 9.95C10.26 9.83 9.76 8.6 9.56 8.09C9.36 7.6 9.16 7.66 9.01 7.65C8.87 7.65 8.7 7.64 8.54 7.64C8.37 7.64 8.1 7.7 7.87 7.95C7.65 8.2 7.02 8.79 7.02 10C7.02 11.21 7.9 12.38 8.02 12.54C8.15 12.71 9.75 15.17 12.21 16.23C12.8 16.48 13.25 16.63 13.61 16.75C14.2 16.94 14.74 16.91 15.16 16.85C15.63 16.78 16.61 16.26 16.81 15.68C17.02 15.1 17.02 14.61 16.96 14.51C16.89 14.4 16.73 14.33 16.57 14.21V14.36Z" />
        </svg>
      </a>
    </aside>
  );
};
