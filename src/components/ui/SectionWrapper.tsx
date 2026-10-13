import React from 'react'
import './SectionWrapper.css'

interface SectionWrapperProps {
  id?: string
  variant?: 'light' | 'dark'
  className?: string
  children: React.ReactNode
}

export function SectionWrapper({ id, variant = 'light', className = '', children }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`section-wrapper section-wrapper--${variant} ${className}`}
    >
      <div className="section-wrapper__inner">{children}</div>
    </section>
  )
}
