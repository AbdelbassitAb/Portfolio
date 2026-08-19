"use client"

import type { ReactNode } from "react"
import { useMagnetic } from "@/hooks/use-magnetic"

export function MagneticLink({
  href,
  download,
  target,
  rel,
  ariaLabel,
  onClick,
  className,
  children,
}: {
  href: string
  download?: string
  target?: string
  rel?: string
  ariaLabel?: string
  onClick?: () => void
  className: string
  children: ReactNode
}) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic<HTMLAnchorElement>(0.3)

  return (
    <a
      ref={ref}
      href={href}
      download={download}
      target={target}
      rel={rel}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      aria-label={ariaLabel}
      className={`${className} transition-transform duration-200 ease-out`}
    >
      {children}
    </a>
  )
}
