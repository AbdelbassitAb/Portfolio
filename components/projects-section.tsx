"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { FolderOpen, Github, ExternalLink, ChevronLeft, ChevronRight, X, Star } from "lucide-react"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"
import { trackProject, trackProjectImpression, trackContactIntentAction } from "@/lib/analytics"

interface ProjectSection {
  label: "Problem" | "Data" | "Analysis" | "Insights" | "Business impact"
  content: string
}

interface Project {
  title: string
  shortDescription: string
  thumbnail: string
  images: { src: string; label: string }[]
  skills: string[]
  github: string
  impact: string[]
  sections: ProjectSection[]
  featured?: boolean
}

const projects: Project[] = [
  {
    title: "Enterprise Data Quality & Automation Pipeline",
    shortDescription:
      "Featured project inspired by real enterprise operations: built a Python-based validation and standardization pipeline to make multi-region Excel data trustworthy and scalable.",
    thumbnail: "/images/projects/food-beverage/Overview.png",
    images: [
      { src: "/images/projects/food-beverage/Overview.png", label: "Pipeline Overview" },
      { src: "/images/projects/food-beverage/Sales.png", label: "Validation Outputs" },
      { src: "/images/projects/food-beverage/Promotion.png", label: "Standardized Reporting" },
    ],
    skills: ["Python", "SQL", "Data Quality", "Data Governance", "Automation", "Power BI"],
    github: "https://github.com/AbdelbassitAb/FOOD-BEVERAGE",
    featured: true,
    impact: [
      "Reduced cross-region processing cycles from manual multi-day work to automated execution in minutes.",
      "Improved reliability through rule-based validation checks for duplicates, missing fields, and schema mismatches.",
      "Created a repeatable pipeline foundation that scales across teams and supports trustworthy KPI reporting.",
    ],
    sections: [
      {
        label: "Problem",
        content:
          "Regional teams were sharing inconsistent Excel files with different naming conventions, formats, and quality levels, creating reporting delays and KPI disputes.",
      },
      {
        label: "Data",
        content:
          "Multi-source procurement and performance data from several regions, mainly spreadsheet-based inputs with inconsistent schemas and partial records.",
      },
      {
        label: "Analysis",
        content:
          "Designed validation rules (completeness, uniqueness, format consistency), automated cleaning and standardization in Python, then consolidated into a reporting-ready model.",
      },
      {
        label: "Insights",
        content:
          "Most delays were caused by recurring quality issues at ingestion stage; introducing pre-report controls eliminated repeated manual back-and-forth corrections.",
      },
      {
        label: "Business impact",
        content:
          "Delivered faster and more reliable reporting cycles, reduced manual effort, and established scalable governance logic for future analytics use cases.",
      },
    ],
  },
  {
    title: "Reducing Customer Churn – Power BI Analysis",
    shortDescription:
      "Interactive churn analysis on 6,687 customers uncovering high-risk patterns across contracts, demographics, and service usage to support retention strategy.",
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
    github: "https://github.com/AbdelbassitAb/Analyzing-customer-churn---Power-BI",
    impact: [
      "Identified a major contract risk gap: monthly plans at 46.29% churn vs yearly plans at 6.62%.",
      "Exposed early-lifecycle churn concentration above 40% among new customers, enabling targeted onboarding interventions.",
      "Mapped top churn reasons to concrete retention levers (competitor offers, support experience, pricing transparency).",
    ],
    sections: [
      {
        label: "Problem",
        content:
          "High churn was eroding recurring revenue, but business teams lacked a consolidated view of churn drivers across contract terms, segments, and usage behavior.",
      },
      {
        label: "Data",
        content: "Databel dataset with 6,687 customers and 1,796 churned customers (26.86% churn rate).",
      },
      {
        label: "Analysis",
        content:
          "Built 10 interactive Power BI pages with DAX measures to segment churn by contracts, demographics, charges, usage behavior, and geographic factors.",
      },
      {
        label: "Insights",
        content:
          "Short contracts, low-tenure segments, and specific service patterns were consistently associated with significantly higher churn risk.",
      },
      {
        label: "Business impact",
        content:
          "Enabled teams to prioritize high-ROI retention actions such as contract conversion campaigns, onboarding improvements, and support quality interventions.",
      },
    ],
  },
  {
    title: "Improving Workforce Retention – HR Attrition Analytics",
    shortDescription:
      "HR analytics dashboard on 1,470 employees to detect attrition signals across tenure, overtime, travel, and satisfaction for proactive retention planning.",
    thumbnail: "/images/projects/hr-attrition/overview.png",
    images: [
      { src: "/images/projects/hr-attrition/overview.png", label: "Overview" },
      { src: "/images/projects/hr-attrition/demographics.png", label: "Demographics" },
      { src: "/images/projects/hr-attrition/performance-tracker.png", label: "Performance Tracker" },
      { src: "/images/projects/hr-attrition/attrition.png", label: "Attrition Analysis" },
    ],
    skills: ["Power BI", "DAX", "Power Query", "Data Modeling", "HR Analytics", "Business Intelligence"],
    github: "https://github.com/AbdelbassitAb/HR-analytics---power-bi",
    impact: [
      "Quantified attrition at ~16.1% (~237 leavers), establishing a measurable baseline for retention initiatives.",
      "Highlighted high-risk profiles in early tenure and overtime populations, enabling targeted HR actions.",
      "Improved decision quality by consolidating workforce, performance, and satisfaction indicators into a single model.",
    ],
    sections: [
      {
        label: "Problem",
        content:
          "HR leaders needed a clearer understanding of why attrition was concentrated in specific teams and profiles, but data was fragmented across metrics and reports.",
      },
      {
        label: "Data",
        content: "Atlas Labs HR dataset covering workforce demographics, tenure, travel, satisfaction, and performance variables.",
      },
      {
        label: "Analysis",
        content:
          "Built a star-schema model and DAX measures to track attrition patterns by tenure, overtime, travel frequency, and department-level exposure.",
      },
      {
        label: "Insights",
        content:
          "Attrition risk peaks in early tenure and rises with overtime and frequent travel, while lower satisfaction often precedes exits.",
      },
      {
        label: "Business impact",
        content:
          "Provided a practical framework for proactive retention monitoring, helping HR prioritize intervention areas with stronger business impact.",
      },
    ],
  },
  {
    title: "Marketing Performance Optimization – Food & Beverage Analytics",
    shortDescription:
      "End-to-end analytics foundation using Snowflake, SQL, and Streamlit to optimize marketing decisions under a 30% budget reduction context.",
    thumbnail: "/images/projects/food-beverage/Overview.png",
    images: [
      { src: "/images/projects/food-beverage/Overview.png", label: "Overview" },
      { src: "/images/projects/food-beverage/Sales.png", label: "Sales Analysis" },
      { src: "/images/projects/food-beverage/Promotion.png", label: "Promotion Analysis" },
    ],
    skills: ["Snowflake", "Streamlit", "Machine Learning", "SQL", "Analytics Engineering", "Data Cleaning"],
    github: "https://github.com/AbdelbassitAb/FOOD-BEVERAGE",
    impact: [
      "Built a reusable 3-layer data architecture to improve analytics consistency across reporting and ML use cases.",
      "Standardized mixed-format source ingestion (CSV, TSV, JSON, S3), reducing downstream cleaning effort.",
      "Enabled campaign and sales analysis with stronger data foundations during a constrained budget scenario.",
    ],
    sections: [
      {
        label: "Problem",
        content:
          "The business faced declining sales and market share while operating with a 30% smaller marketing budget, requiring better targeting decisions.",
      },
      {
        label: "Data",
        content:
          "Raw operational and campaign data from CSV, TSV, JSON, and S3 integrated into Snowflake schemas.",
      },
      {
        label: "Analysis",
        content:
          "Implemented bronze/silver/analytics layers, applied quality controls, and exposed curated tables for BI dashboards and exploratory modeling.",
      },
      {
        label: "Insights",
        content:
          "Reliable campaign and sales diagnostics depend on standardized data models and upfront quality checks rather than ad hoc reporting fixes.",
      },
      {
        label: "Business impact",
        content:
          "Created a scalable analytics product that supports reporting, optimization decisions, and future predictive marketing initiatives.",
      },
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
      className={`group w-full cursor-pointer overflow-hidden rounded-xl border border-border bg-card text-left transition-all hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 animate-scale-in ${isVisible ? "is-visible" : ""}`}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-secondary">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {project.featured && (
          <div className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-lg">
            <Star className="h-3 w-3" />
            Featured
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="glow-primary absolute right-3 bottom-3 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100">
          View details
        </div>
      </div>

      <div className="flex flex-col gap-3 p-6">
        <h3 className="text-lg font-semibold text-card-foreground transition-colors group-hover:text-primary">{project.title}</h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {project.shortDescription}
        </p>
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-primary">Impact</p>
          <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">{project.impact[0]}</p>
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
    trackProject("open_modal", project.title)
  }, [project.title])

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
      <div className="relative w-full max-w-5xl animate-[fadeInScale_0.3s_ease-out] rounded-2xl border border-border bg-card shadow-2xl shadow-primary/5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full bg-background/80 p-2 text-foreground backdrop-blur-sm transition-all hover:scale-110 hover:bg-destructive hover:text-foreground"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl bg-secondary">
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
                className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-background/80 p-2.5 text-foreground backdrop-blur-sm transition-all hover:scale-110 hover:bg-primary hover:text-primary-foreground"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={goNext}
                className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-background/80 p-2.5 text-foreground backdrop-blur-sm transition-all hover:scale-110 hover:bg-primary hover:text-primary-foreground"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-background/80 px-4 py-1.5 text-xs font-medium text-foreground backdrop-blur-sm">
            {project.images[currentImage].label} ({currentImage + 1}/{project.images.length})
          </div>
        </div>

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

        <div className="flex flex-col gap-6 p-6 md:p-8">
          <div>
            <div className="mb-2 flex items-center gap-2">
              {project.featured && (
                <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  <Star className="h-3 w-3" />
                  Featured project
                </span>
              )}
            </div>
            <h2 className="text-2xl font-bold text-card-foreground">{project.title}</h2>
          </div>

          <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">Impact</h3>
            <ul className="grid gap-2.5">
              {project.impact.map((point, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {project.sections.map((section) => (
              <div key={section.label} className="rounded-lg border border-border bg-card/40 p-4">
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">{section.label}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{section.content}</p>
              </div>
            ))}
          </div>

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

          <div className="border-t border-border pt-6">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackProject("github_click", project.title)
                trackContactIntentAction("github")
              }}
              className="glow-primary-hover inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
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
  }, [])

  return (
    <section id="projects" className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div
          ref={headerRef}
          className={`mb-4 flex items-center gap-3 animate-fade-up ${headerVisible ? "is-visible" : ""}`}
        >
          <FolderOpen className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Projects</h2>
        </div>
        <p className="mb-12 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          A selection of projects focused on one objective: turning complex data into decisions that improve revenue,
          efficiency, and reporting reliability.
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
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
