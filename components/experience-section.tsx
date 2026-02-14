"use client"

import { Briefcase } from "lucide-react"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"

const experiences = [
  {
    title: "Business / Data Analyst",
    company: "Dassault Systemes",
    department: "Global Sales Operations",
    period: "Oct 2025 - Present",
    tasks: [
      "Harmonization of Sales KPIs across 11 geographic zones (GEO), strengthening international reporting reliability.",
      "Comparative analysis of Business Objects data (Global Sales Operations vs Finance) to identify discrepancies, investigate divergences, and determine root causes.",
      "Translation of business needs into structured functional and technical data specifications.",
      "Interface between Sales and IT teams during a BI migration project.",
      "Migration and reliability improvement of 3 strategic dashboards to Data Perspectives.",
    ],
    skills: ["Business Objects", "Data Perspectives", "SQL", "KPI Design"],
  },
  {
    title: "Data Analyst",
    company: "Dassault Systemes",
    department: "Procurement Excellence",
    period: "Sept 2024 - Sept 2025",
    tasks: [
      "Creation of interactive dashboards with Data Perspectives (internal BI tool) to support procurement strategy.",
      "Management of procurement data flows: collection, cleaning, and analysis via Power Query, with quarterly reporting for 60 buyers worldwide.",
      "Writing and optimizing SQL queries to extract, aggregate, and analyze procurement data from multiple sources.",
      "Development of Python scripts to automate Excel data processing (cleaning, transformation, validation), reducing processing time from 2 days to minutes.",
      "Design of a Python script integrating an LLM to automatically control procurement transaction compliance with internal policies.",
    ],
    skills: ["Power Query", "SQL", "Python", "Power BI", "LLM"],
  },
  {
    title: "Data Analyst",
    company: "Ministry of Fisheries of Algeria",
    department: "",
    period: "Sept 2022 - Jul 2023",
    tasks: [
      "Collection and analysis of business requirements, with drafting of functional specifications.",
      "Data analysis (statistics, sampling) to support operational and strategic decision-making.",
      "Collection, transformation, and migration of data to a PostgreSQL-based system with modern data architecture.",
      "Design of KPIs and Power BI dashboards for real-time monitoring.",
      "Contribution to data quality, security, and project delivery using Agile (Scrum) methodology.",
    ],
    skills: ["PostgreSQL", "Power BI", "Agile/Scrum", "Statistics"],
  },
]

function ExperienceItem({ exp, index }: { exp: typeof experiences[number]; index: number }) {
  const { ref, isVisible } = useAnimateOnScroll(0.1)

  return (
    <div
      ref={ref}
      className={`relative flex flex-col gap-4 md:pl-10 animate-fade-up stagger-${index + 1} ${isVisible ? "is-visible" : ""}`}
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-2 hidden h-[15px] w-[15px] rounded-full border-2 border-primary bg-background md:block" />

      <div className="flex flex-col gap-1">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-lg font-semibold text-foreground">{exp.title}</h3>
          <span className="text-primary">{"·"}</span>
          <span className="font-medium text-primary">{exp.company}</span>
        </div>
        {exp.department && (
          <p className="text-sm text-muted-foreground">{exp.department}</p>
        )}
        <p className="font-mono text-xs tracking-wider text-muted-foreground">{exp.period}</p>
      </div>

      <ul className="flex flex-col gap-2">
        {exp.tasks.map((task, j) => (
          <li key={j} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50" />
            {task}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2">
        {exp.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

export function ExperienceSection() {
  const { ref: headerRef, isVisible: headerVisible } = useAnimateOnScroll(0.1)

  return (
    <section id="experience" className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div
          ref={headerRef}
          className={`mb-12 flex items-center gap-3 animate-fade-up ${headerVisible ? "is-visible" : ""}`}
        >
          <Briefcase className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Experience</h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 top-2 hidden h-full w-px bg-border md:left-[7px] md:block" />

          <div className="flex flex-col gap-12">
            {experiences.map((exp, i) => (
              <ExperienceItem key={i} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
