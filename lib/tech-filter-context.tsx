"use client"

import { createContext, useContext, useMemo, useState, type ReactNode } from "react"
import { normalizeSkillName } from "@/lib/normalize-skill"

interface TechFilterContextValue {
  activeFilter: string | null
  setActiveFilter: (value: string | null) => void
  jumpToFilter: (skillName: string) => void
}

const TechFilterContext = createContext<TechFilterContextValue | null>(null)

export function TechFilterProvider({ children }: { children: ReactNode }) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  const value = useMemo<TechFilterContextValue>(
    () => ({
      activeFilter,
      setActiveFilter,
      jumpToFilter: (skillName: string) => {
        setActiveFilter(normalizeSkillName(skillName))
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
      },
    }),
    [activeFilter]
  )

  return <TechFilterContext.Provider value={value}>{children}</TechFilterContext.Provider>
}

export function useTechFilter() {
  const ctx = useContext(TechFilterContext)
  if (!ctx) throw new Error("useTechFilter must be used within a TechFilterProvider")
  return ctx
}
