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
  { name: "French", level: "Fluent" },
  { name: "English", level: "Professional" },
  { name: "Arabic", level: "Native" },
  { name: "Spanish", level: "Basic" },
]

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
                className={`rounded-xl border border-border bg-card p-4 text-center transition-all hover:border-primary/40 hover:shadow-md hover:shadow-primary/5 animate-fade-up stagger-${i + 1} ${langVisible ? "is-visible" : ""}`}
              >
                <p className="font-medium text-card-foreground">{lang.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{lang.level}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
