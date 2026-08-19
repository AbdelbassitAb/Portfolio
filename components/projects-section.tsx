"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import Image from "next/image"
import { FolderOpen, Github, ExternalLink, ChevronLeft, ChevronRight, X, SlidersHorizontal } from "lucide-react"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"
import { trackProject, trackProjectImpression, trackContactIntentAction } from "@/lib/analytics"
import { handleSpotlightMove } from "@/lib/spotlight"
import { useTechFilter } from "@/lib/tech-filter-context"
import { normalizeSkillName } from "@/lib/normalize-skill"

interface Project {
  title: string
  shortDescription: string
  fullDescription: string
  thumbnail: string
  images: { src: string; label: string }[]
  skills: string[]
  stats: { value: string; label: string }[]
  github: string
  highlights: string[]
}

const projects: Project[] = [
  {
    title: "Customer Churn Analysis -- Power BI Dashboard",
    shortDescription:
      "Interactive Power BI dashboard analyzing customer churn across 6,687 customers with a 26.86% churn rate, uncovering key drivers like contract type, demographics, and service patterns.",
    fullDescription:
      "This project analyzes customer churn behavior using the Databel dataset. The objective is to identify the main drivers of churn and provide actionable business insights. The report covers 6,687 total customers with 1,796 churned (26.86% churn rate). The dashboard includes 10 interactive report pages analyzing contract types, demographics, service usage, charges, geographic patterns, and customer behavior. Each page is designed with interactive filters and drill-downs for stakeholder exploration.",
    thumbnail: "/images/projects/churn/overview.png",
    images: [
      { src: "/images/projects/churn/overview.png", label: "Overview" },
      { src: "/images/projects/churn/churn-demographics.png", label: "Churn Demographics" },
      { src: "/images/projects/churn/groups-and-categories.png", label: "Groups & Categories" },
      { src: "/images/projects/churn/unlimited-plan.png", label: "Unlimited Plan" },
      { src: "/images/projects/churn/international-calls.png", label: "International Calls" },
      { src: "/images/projects/churn/contract-type.png", label: "Contract Type" },
      { src: "/images/projects/churn/age-groups.png", label: "Age Groups" },
      { src: "/images/projects/churn/payment-and-contract.png", label: "Payment & Contract" },
      { src: "/images/projects/churn/extra-charges.png", label: "Extra Charges" },
      { src: "/images/projects/churn/insights.png", label: "Insights" },
    ],
    skills: ["Power BI", "DAX", "Data Analysis", "Data Visualization", "KPI Design", "Business Intelligence"],
    stats: [
      { value: "6,687", label: "customers analyzed" },
      { value: "26.9%", label: "churn rate" },
      { value: "10", label: "report pages" },
    ],
    github: "https://github.com/AbdelbassitAb/Analyzing-customer-churn---Power-BI",
    highlights: [
      "Monthly contracts show 46.29% churn rate vs 6.62% for yearly contracts",
      "New customers (short account length) show churn above 40-50%, dropping below 10% for long-term customers",
      "Customers on unlimited data plans with lower actual consumption show higher churn rates",
      "Seniors (over 65) show significantly higher churn rates compared to other age groups",
      "Top churn reasons: competitor offers (44.82%), attitude of support (15.98%), and dissatisfaction (15.92%)",
      "International calls feature: customers with active international plans but no calls show 71.19% churn",
    ],
  },
  {
    title: "HR Analytics — Employee Attrition Dashboard",
    shortDescription:
      "Interactive Power BI dashboard built on Atlas Labs HR data (1,470 employees) to track attrition drivers across tenure, overtime, travel, satisfaction, and department exposure.",
    fullDescription:
      "This HR Analytics project focuses on employee attrition analysis to support data-driven retention decisions. The dashboard combines workforce KPIs, demographics, performance and satisfaction tracking, and detailed attrition diagnostics in one navigable report. Built with a star-schema model and dedicated DAX measures table, it highlights risk patterns across early tenure, overtime, frequent travel, and role-level exposure while keeping calculations consistent and maintainable.",
    thumbnail: "/images/projects/hr-attrition/overview.png",
    images: [
      { src: "/images/projects/hr-attrition/overview.png", label: "Overview" },
      { src: "/images/projects/hr-attrition/demographics.png", label: "Demographics" },
      { src: "/images/projects/hr-attrition/performance-tracker.png", label: "Performance Tracker" },
      { src: "/images/projects/hr-attrition/attrition.png", label: "Attrition Analysis" },
    ],
    skills: [
      "Power BI",
      "DAX",
      "Power Query",
      "Data Modeling",
      "HR Analytics",
      "Business Intelligence",
    ],
    stats: [
      { value: "1,470", label: "employees tracked" },
      { value: "16.1%", label: "attrition rate" },
      { value: "4", label: "report pages" },
    ],
    github: "https://github.com/AbdelbassitAb/HR-analytics---power-bi",
    highlights: [
      "Overall workforce snapshot: 1,470 employees with ~16.1% attrition (~237 leavers)",
      "Highest attrition appears in early tenure windows, especially the first 1–2 years",
      "Overtime employees show materially higher attrition, acting as a leading risk signal",
      "Frequent business travel correlates with increased turnover compared with non-travel employees",
      "Lower satisfaction scores often precede exits, supporting proactive retention monitoring",
      "Attrition is concentrated in specific departments and roles, suggesting structural team-level issues",
    ],
  },
  {
    title: "Food & Beverage - Marketing Analytics Platform",
    shortDescription:
      "End-to-end marketing analytics project combining Snowflake pipelines, Streamlit dashboards, and machine learning to support smarter decisions under tight budget constraints.",
    fullDescription:
      "This project was built for a fictional food and beverage company facing lower sales, a 30% reduction in marketing budget, and a loss of market share. The solution covers the full analytics workflow: ingesting raw CSV, TSV, and JSON data into Snowflake, cleaning and standardizing data through bronze and silver layers, creating stable analytics tables for reuse, and exposing the resulting data product for BI, Streamlit dashboards, and machine learning use cases. The focus is on turning scattered operational data into a reliable analytics foundation for campaign optimization and business decision-making.",
    thumbnail: "/images/projects/food-beverage/Overview.png",
    images: [
      { src: "/images/projects/food-beverage/Overview.png", label: "Overview" },
      { src: "/images/projects/food-beverage/Sales.png", label: "Sales Analysis" },
      { src: "/images/projects/food-beverage/Promotion.png", label: "Promotion Analysis" },
    ],
    skills: [
      "Snowflake",
      "Streamlit",
      "Machine Learning",
      "SQL",
      "Analytics Engineering",
      "Data Cleaning",
    ],
    stats: [
      { value: "30%", label: "budget cut to offset" },
      { value: "3", label: "layer pipeline" },
    ],
    github: "https://github.com/AbdelbassitAb/FOOD-BEVERAGE",
    highlights: [
      "Built a 3-layer architecture across bronze, silver, and analytics schemas for dependable downstream analysis",
      "Loaded mixed-format source data from CSV, TSV, JSON, and S3 into Snowflake with fit-for-purpose ingestion rules",
      "Applied text cleanup, type harmonization, deduplication, and business validation before analytics consumption",
      "Converted exploratory analysis into reusable analytics tables designed for dashboards, advanced analysis, and ML",
      "Framed the project around marketing optimization during a 30% budget cut and declining market share",
      "Delivered a data product approach focused on reporting, campaign optimization, and future predictive modeling",
    ],
  },
]

function ProjectCard({
  project,
  projectPosition,
  onClick,
}: {
  project: Project
  projectPosition: number
  onClick: () => void
}) {
  const { ref, isVisible } = useAnimateOnScroll<HTMLButtonElement>(0.1)

  return (
    <button
      ref={ref}
      data-project-name={project.title}
      data-project-position={projectPosition}
      onClick={onClick}
      onMouseMove={handleSpotlightMove}
      className={`spotlight-card group w-full cursor-pointer overflow-hidden rounded-xl border border-border bg-card text-left transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 animate-scale-in ${isVisible ? "is-visible" : ""}`}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-secondary">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute bottom-3 right-3 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 glow-primary">
          View details
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 p-6">
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-card-foreground transition-colors group-hover:text-primary">{project.title}</h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {project.shortDescription}
          </p>
        </div>

        {/* Headline stat chips */}
        <div className="flex flex-wrap gap-4 rounded-lg border border-border bg-secondary/40 px-4 py-3">
          {project.stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-mono text-base font-bold leading-none text-primary">{stat.value}</p>
              <p className="mt-1 text-[11px] text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {project.skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
            >
              {skill}
            </span>
          ))}
          {project.skills.length > 4 && (
            <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
              +{project.skills.length - 4} more
            </span>
          )}
        </div>
      </div>
    </button>
  )
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  const [currentImage, setCurrentImage] = useState(0)

  const goNext = useCallback(
    () => setCurrentImage((prev) => (prev + 1) % project.images.length),
    [project.images.length]
  )
  const goPrev = useCallback(
    () => setCurrentImage((prev) => (prev - 1 + project.images.length) % project.images.length),
    [project.images.length]
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") goNext()
      if (e.key === "ArrowLeft") goPrev()
    }
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [onClose, goNext, goPrev])

  useEffect(() => {
    // Fires once whenever a project modal is opened.
    trackProject("open_modal", project.title)
  }, [project.title])

  const reportSlug = project.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-background/80 px-4 py-8 backdrop-blur-md md:py-12"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div className="relative w-full max-w-5xl animate-[fadeInScale_0.3s_ease-out] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-primary/5">
        {/* Report window chrome */}
        <div className="flex items-center gap-3 border-b border-border bg-secondary/40 px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
          </div>
          <span className="truncate font-mono text-[11px] text-muted-foreground">report/{reportSlug}.pbix</span>
          <button
            onClick={onClose}
            className="ml-auto rounded-full p-1.5 text-foreground transition-all hover:bg-destructive hover:scale-110"
            aria-label="Close modal"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Image carousel */}
        <div className="relative aspect-video w-full overflow-hidden bg-secondary">
          <Image
            src={project.images[currentImage].src}
            alt={`${project.title} - ${project.images[currentImage].label}`}
            fill
            className="object-contain transition-opacity duration-300"
          />

          {project.images.length > 1 && (
            <>
              <button
                onClick={goPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2.5 text-foreground backdrop-blur-sm transition-all hover:bg-primary hover:text-primary-foreground hover:scale-110"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={goNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2.5 text-foreground backdrop-blur-sm transition-all hover:bg-primary hover:text-primary-foreground hover:scale-110"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {/* Image label + counter */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-background/80 px-4 py-1.5 text-xs font-medium text-foreground backdrop-blur-sm">
            {project.images[currentImage].label} ({currentImage + 1}/{project.images.length})
          </div>
        </div>

        {/* Thumbnails strip */}
        {project.images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto border-b border-border bg-secondary/30 p-3">
            {project.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrentImage(i)}
                className={`group/thumb relative flex shrink-0 flex-col items-center gap-1 transition-all ${
                  i === currentImage ? "opacity-100" : "opacity-50 hover:opacity-80"
                }`}
                aria-label={`View ${img.label}`}
              >
                <div
                  className={`relative h-12 w-20 overflow-hidden rounded-md border-2 transition-all ${
                    i === currentImage
                      ? "border-primary shadow-md shadow-primary/20"
                      : "border-transparent"
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.label}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-[10px] text-muted-foreground">{img.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col gap-6 p-6 md:p-8">
          <div>
            <h2 className="text-2xl font-bold text-card-foreground">{project.title}</h2>
          </div>

          {/* Headline stats */}
          <div className="flex flex-wrap gap-6 rounded-xl border border-border bg-secondary/30 p-5">
            {project.stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-mono text-2xl font-bold leading-none text-primary">{stat.value}</p>
                <p className="mt-1.5 text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          <p className="leading-relaxed text-muted-foreground">{project.fullDescription}</p>

          {/* Key insights */}
          {project.highlights.length > 0 && (
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
                Key Insights
              </h3>
              <ul className="grid gap-2.5">
                {project.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Skills */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* GitHub link */}
          <div className="border-t border-border pt-6">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackProject("github_click", project.title)
                trackContactIntentAction("github")
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 glow-primary-hover"
            >
              <Github className="h-4 w-4" />
              View Full Project on GitHub
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const { ref: headerRef, isVisible: headerVisible } = useAnimateOnScroll(0.1)
  const { activeFilter, setActiveFilter } = useTechFilter()

  const allTags = useMemo(() => {
    const map = new Map<string, string>()
    projects.forEach((p) => p.skills.forEach((s) => map.set(normalizeSkillName(s), s)))
    return Array.from(map.entries()).sort((a, b) => a[1].localeCompare(b[1]))
  }, [])

  const filteredProjects = useMemo(() => {
    if (!activeFilter) return projects
    return projects.filter((p) => p.skills.some((s) => normalizeSkillName(s) === activeFilter))
  }, [activeFilter])

  useEffect(() => {
    const seenProjects = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const projectName = entry.target.getAttribute("data-project-name")
          const projectPosition = Number(entry.target.getAttribute("data-project-position"))
          if (!projectName || seenProjects.has(projectName)) return

          seenProjects.add(projectName)
          trackProjectImpression(projectName, projectPosition)
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.45 }
    )

    const projectCards = document.querySelectorAll<HTMLButtonElement>("[data-project-name]")
    projectCards.forEach((projectCard) => {
      const projectName = projectCard.getAttribute("data-project-name")
      if (!projectName || seenProjects.has(projectName)) return
      observer.observe(projectCard)
    })

    return () => observer.disconnect()
  }, [filteredProjects])

  return (
    <section id="projects" className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div
          ref={headerRef}
          className={`mb-6 flex items-center gap-3 animate-fade-up ${headerVisible ? "is-visible" : ""}`}
        >
          <FolderOpen className="h-5 w-5 text-primary" />
          <span className="font-mono text-xs tracking-widest text-muted-foreground">04</span>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Projects</h2>
        </div>

        {/* Slicer filter bar */}
        <div
          className={`mb-10 flex flex-wrap items-center gap-2 animate-fade-up stagger-1 ${headerVisible ? "is-visible" : ""}`}
        >
          <span className="mr-1 inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground/70">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filter:
          </span>
          <button
            onClick={() => setActiveFilter(null)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
              activeFilter === null
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-secondary text-secondary-foreground hover:border-primary/40 hover:text-primary"
            }`}
          >
            All ({projects.length})
          </button>
          {allTags.map(([normalized, display]) => (
            <button
              key={normalized}
              onClick={() => setActiveFilter(activeFilter === normalized ? null : normalized)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                activeFilter === normalized
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-secondary text-secondary-foreground hover:border-primary/40 hover:text-primary"
              }`}
            >
              {display}
            </button>
          ))}
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                projectPosition={index + 1}
                onClick={() => {
                  trackProject("card_click", project.title)
                  setSelectedProject(project)
                }}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border bg-card/40 p-10 text-center">
            <p className="text-sm text-muted-foreground">
              No showcased project uses <span className="font-medium capitalize text-primary">{activeFilter}</span> yet — ask me about it directly.
            </p>
            <button
              onClick={() => setActiveFilter(null)}
              className="mt-4 rounded-lg border border-border bg-secondary px-4 py-2 text-xs font-medium text-secondary-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              Clear filter
            </button>
          </div>
        )}
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  )
}
