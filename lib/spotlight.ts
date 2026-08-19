import type { MouseEvent } from "react"

export function handleSpotlightMove(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget
  const rect = el.getBoundingClientRect()
  el.style.setProperty("--x", `${e.clientX - rect.left}px`)
  el.style.setProperty("--y", `${e.clientY - rect.top}px`)
}
