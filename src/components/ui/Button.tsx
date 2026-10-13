import React from 'react'
import './Button.css'

interface ButtonProps {
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'md' | 'lg'
  target?: string
  rel?: string
  children: React.ReactNode
}

export function Button({
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  target,
  rel,
  children,
}: ButtonProps) {
  const className = `btn btn--${variant} btn--${size}`

  if (href) {
    return (
      <a href={href} className={className} target={target} rel={rel}>
        {children}
      </a>
    )
  }

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  )
}
