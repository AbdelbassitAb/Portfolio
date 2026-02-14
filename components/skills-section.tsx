"use client"

import { Code2, BarChart3, Settings } from "lucide-react"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"

const skillCategories = [
  {
    title: "Data & BI",
    icon: BarChart3,
    skills: ["Power BI", "Business Objects", "Snowflake", "Talend", "Data Perspectives"],
  },
  {
    title: "Data & Automation",
    icon: Code2,
    skills: ["SQL / NoSQL", "Python", "Power Query", "PostgreSQL"],
  },
  {
    title: "Environments & Methods",
    icon: Settings,
    skills: ["Git", "Microsoft Azure", "Agile / Scrum"],
  },
]

const languages = [
  { name: "French", level: "Fluent", flag: "FR" },
  { name: "English", level: "Professional", flag: "GB" },
  { name: "Arabic", level: "Native", flag: "DZ" },
  { name: "Spanish", level: "Basic", flag: "ES" },
]

function FlagIcon({ code }: { code: string }) {
  const flags: Record<string, { colors: string[]; layout: "tricolor-v" | "tricolor-h" | "bicolor" | "crescent" }> = {
    FR: { colors: ["#002395", "#FFFFFF", "#ED2939"], layout: "tricolor-v" },
    GB: { colors: ["#012169", "#C8102E", "#FFFFFF"], layout: "bicolor" },
    DZ: { colors: ["#006233", "#FFFFFF", "#D21034"], layout: "tricolor-v" },
    ES: { colors: ["#AA151B", "#F1BF00", "#AA151B"], layout: "tricolor-h" },
  }

  const flag = flags[code]
  if (!flag) return null

  if (code === "FR") {
    return (
      <svg viewBox="0 0 30 20" className="h-5 w-7 rounded-[2px] shadow-sm" aria-hidden="true">
        <rect width="10" height="20" fill="#002395" />
        <rect x="10" width="10" height="20" fill="#FFFFFF" />
        <rect x="20" width="10" height="20" fill="#ED2939" />
      </svg>
    )
  }

  if (code === "GB") {
    return (
      <svg viewBox="0 0 60 30" className="h-5 w-7 rounded-[2px] shadow-sm" aria-hidden="true">
        <rect width="60" height="30" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFFFFF" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 V30 M0,15 H60" stroke="#FFFFFF" strokeWidth="10" />
        <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
      </svg>
    )
  }

  if (code === "DZ") {
    return (
      <svg viewBox="0 0 30 20" className="h-5 w-7 rounded-[2px] shadow-sm" aria-hidden="true">
        <rect width="15" height="20" fill="#006233" />
        <rect x="15" width="15" height="20" fill="#FFFFFF" />
        <circle cx="16" cy="10" r="5" fill="#D21034" />
        <circle cx="17.5" cy="10" r="4" fill="#FFFFFF" />
        <polygon points="17,6.5 17.8,9 20.5,9 18.3,10.8 19,13.5 17,11.7 15,13.5 15.7,10.8 13.5,9 16.2,9" fill="#D21034" />
      </svg>
    )
  }

  if (code === "ES") {
    return (
      <svg viewBox="0 0 30 20" className="h-5 w-7 rounded-[2px] shadow-sm" aria-hidden="true">
        <rect width="30" height="5" fill="#AA151B" />
        <rect y="5" width="30" height="10" fill="#F1BF00" />
        <rect y="15" width="30" height="5" fill="#AA151B" />
      </svg>
    )
  }

  return null
}

export function SkillsSection() {
  const { ref: headerRef, isVisible: headerVisible } = useAnimateOnScroll(0.1)
  const { ref: gridRef, isVisible: gridVisible } = useAnimateOnScroll(0.1)
  const { ref: langRef, isVisible: langVisible } = useAnimateOnScroll(0.1)

  return (
    <section id="skills" className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div
          ref={headerRef}
          className={`mb-12 flex items-center gap-3 animate-fade-up ${headerVisible ? "is-visible" : ""}`}
        >
          <Code2 className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Technical Stack</h2>
        </div>

        <div ref={gridRef} className="grid gap-6 md:grid-cols-3">
          {skillCategories.map((cat, i) => (
            <div
              key={cat.title}
              className={`rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 animate-fade-up stagger-${i + 1} ${gridVisible ? "is-visible" : ""}`}
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <cat.icon className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-semibold text-card-foreground">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Languages */}
        <div ref={langRef} className="mt-12">
          <h3 className={`mb-6 text-lg font-semibold text-foreground animate-fade-up ${langVisible ? "is-visible" : ""}`}>Languages</h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {languages.map((lang, i) => (
              <div
                key={lang.name}
                className={`flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-md hover:shadow-primary/5 animate-fade-up stagger-${i + 1} ${langVisible ? "is-visible" : ""}`}
              >
                <FlagIcon code={lang.flag} />
                <div>
                  <p className="font-medium text-card-foreground">{lang.name}</p>
                  <p className="text-xs text-muted-foreground">{lang.level}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
