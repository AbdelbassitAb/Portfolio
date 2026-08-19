"use client"

import { useEffect, useRef, useState } from "react"
import type { LucideIcon } from "lucide-react"

export function KpiTile({
  icon: Icon,
  value,
  suffix = "",
  label,
  delayMs = 0,
}: {
  icon: LucideIcon
  value: number
  suffix?: string
  label: string
  delayMs?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    const startDelay = setTimeout(() => {
      const duration = 900
      const start = performance.now()
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.round(eased * value))
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, delayMs)
    return () => clearTimeout(startDelay)
  }, [visible, value, delayMs])

  return (
    <div
      ref={ref}
      className={`spotlight-card flex items-center gap-3 rounded-xl border border-border bg-card/60 px-4 py-3 backdrop-blur-sm ${visible ? "animate-kpi-in" : "opacity-0"}`}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div>
        <p className="font-mono text-xl font-bold leading-none text-foreground">
          {count}
          {suffix}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  )
}
