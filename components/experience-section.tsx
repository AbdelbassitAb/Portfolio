"use client"

import Image from "next/image"
import { Briefcase } from "lucide-react"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"

const experiences = [
  {
    title: "Business / Data Analyst",
    company: "Dassault Systemes",
    logo: "/images/logos/dassault-systemes.png",
    department: "Global Sales Operations",
    period: "Oct 2025 - Present",
    tasks: [
      "Resolved inconsistent KPI definitions across 11 GEOs by redesigning harmonization rules with Sales stakeholders, improving trust in executive-level performance reporting.",
      "Identified recurring ARR and pipeline discrepancies between Global Sales Operations and Finance data marts through comparative Business Objects analysis, enabling faster root-cause investigation and remediation.",
      "Converted ambiguous business requirements into structured functional and technical specifications, reducing delivery friction between Sales and IT during BI migration cycles.",
      "Led cross-functional alignment between Sales and IT during dashboard migration to Data Perspectives, protecting reporting continuity for strategic decision-makers.",
      "Migrated and strengthened 3 strategic sales dashboards with improved data controls, increasing KPI reliability for recurring business reviews.",
    ],
    skills: ["Business Objects", "Data Perspectives", "SQL", "KPI Design"],
  },
  {
    title: "Data Analyst",
    company: "Dassault Systemes",
    logo: "/images/logos/dassault-systemes.png",
    department: "Procurement Excellence",
    period: "Sept 2024 - Sept 2025",
    tasks: [
      "Addressed fragmented procurement visibility by designing interactive dashboards in Data Perspectives, giving category leaders and buyers clearer performance tracking.",
      "Standardized quarterly procurement reporting for 60 buyers worldwide by restructuring collection, cleaning, and transformation flows in Power Query.",
      "Improved cross-source analysis reliability by writing optimized SQL queries for extraction and aggregation, accelerating recurring procurement insights generation.",
      "Automated Excel-based validation and consolidation with Python across multi-region procurement files, reducing processing time from 2 days to minutes and lowering manual errors.",
      "Built an AI-assisted compliance control script for procurement transactions, strengthening policy adherence checks at scale.",
    ],
    skills: ["Power Query", "SQL", "Python", "Power BI", "LLM"],
  },
  {
    title: "Data Analyst",
    company: "Ministry of Fisheries of Algeria",
    logo: "/images/logos/ministere-peche.webp",
    department: "",
    period: "Sept 2022 - Jul 2023",
    tasks: [
      "Solved unclear reporting needs by collecting and formalizing business requirements into actionable functional specifications for analytics delivery.",
      "Applied statistical analysis and sampling methods to uncover operational signals, supporting more evidence-based planning and resource decisions.",
      "Migrated legacy datasets into a PostgreSQL-centered architecture with transformation controls, improving long-term data accessibility and consistency.",
      "Designed KPI frameworks and Power BI monitoring dashboards to provide near real-time visibility on priority operational indicators.",
      "Improved project execution quality by embedding data quality, security practices, and Agile collaboration throughout delivery cycles.",
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
      <div className="absolute top-2 left-0 hidden h-[15px] w-[15px] rounded-full border-2 border-primary bg-background md:block" />

      <div className="flex flex-col gap-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-md bg-foreground/90">
            <Image
              src={exp.logo}
              alt={`${exp.company} logo`}
              fill
              className="object-contain p-0.5"
            />
          </div>
          <h3 className="text-lg font-semibold text-foreground">{exp.title}</h3>
          <span className="text-primary">{"·"}</span>
          <span className="font-medium text-primary">{exp.company}</span>
        </div>
        {exp.department && (
          <p className="text-sm text-muted-foreground md:pl-11">{exp.department}</p>
        )}
        <p className="font-mono text-xs tracking-wider text-muted-foreground md:pl-11">{exp.period}</p>
      </div>

      <ul className="flex flex-col gap-2 md:pl-11">
        {exp.tasks.map((task, j) => (
          <li key={j} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50" />
            {task}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2 md:pl-11">
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
          className={`mb-4 flex items-center gap-3 animate-fade-up ${headerVisible ? "is-visible" : ""}`}
        >
          <Briefcase className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Experience</h2>
        </div>
        <p className="mb-12 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Each role below reflects a consistent approach: diagnose business pain points, build reliable data solutions,
          and translate analysis into measurable operational impact.
        </p>

        <div className="relative">
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
