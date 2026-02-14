"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { FolderOpen, Github, ExternalLink, ChevronLeft, ChevronRight, X } from "lucide-react"

interface Project {
  title: string
  shortDescription: string
  fullDescription: string
  thumbnail: string
  images: string[]
  skills: string[]
  github: string
  highlights: string[]
}

const projects: Project[] = [
  {
    title: "Customer Churn Analysis -- Power BI Dashboard",
    shortDescription:
      "Interactive Power BI dashboard analyzing customer churn behavior across 6,687 customers with a 26.86% churn rate. Identifies key drivers including contract type, demographics, and service usage patterns.",
    fullDescription:
      "This project analyzes customer churn behavior using a single dataset (Databel - Data). The objective is to identify the main drivers of churn and provide actionable business insights. The report covers 6,687 total customers with 1,796 churned (26.86% churn rate), focusing on contract type, demographics, service usage, charges, and customer behavior patterns. The dashboard includes 9 report pages: Overview, Churn Demographics, Groups and Categories, Unlimited Plan, International Calls, Contract Type, Age Groups, Payment and Contract, and Extra Charges.",
    thumbnail: "/images/projects/churn/overview.png",
    images: [
      "/images/projects/churn/overview.png",
      "/images/projects/churn/groups-and-categories.png",
      "/images/projects/churn/insights.png",
      "/images/projects/churn/contract-type.png",
    ],
    skills: ["Power BI", "DAX", "Data Analysis", "Data Visualization", "KPI Design", "Business Intelligence"],
    github: "https://github.com/AbdelbassitAb/Customer-Churn-PowerBI",
    highlights: [
      "Monthly contracts show 46.29% churn rate vs 6.62% for yearly contracts",
      "New customers show churn above 40-50%, long-term customers drop below 10%",
      "Customers with lower data usage (<5 GB) show higher churn",
      "Seniors show higher churn rates compared to other groups",
      "Main churn reasons: competitor offers, attitude of support, price dissatisfaction",
    ],
  },
]

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group w-full cursor-pointer overflow-hidden rounded-xl border border-border bg-card text-left transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-secondary">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="absolute bottom-3 right-3 rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100">
          View details
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-6">
        <h3 className="text-lg font-semibold text-card-foreground">{project.title}</h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {project.shortDescription}
        </p>
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-background/80 px-4 py-8 backdrop-blur-sm md:py-12"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div className="relative w-full max-w-4xl rounded-2xl border border-border bg-card shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-background/80 p-2 text-foreground backdrop-blur-sm transition-colors hover:bg-destructive hover:text-destructive-foreground"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Image carousel */}
        <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl bg-secondary">
          <Image
            src={project.images[currentImage]}
            alt={`${project.title} - screenshot ${currentImage + 1}`}
            fill
            className="object-contain"
          />

          {project.images.length > 1 && (
            <>
              <button
                onClick={goPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 text-foreground backdrop-blur-sm transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={goNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 text-foreground backdrop-blur-sm transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {/* Image counter */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-background/80 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
            {currentImage + 1} / {project.images.length}
          </div>
        </div>

        {/* Thumbnails strip */}
        {project.images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto border-b border-border bg-secondary/30 p-3">
            {project.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrentImage(i)}
                className={`relative h-14 w-24 shrink-0 overflow-hidden rounded-md border-2 transition-all ${
                  i === currentImage
                    ? "border-primary shadow-md"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
                aria-label={`View screenshot ${i + 1}`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col gap-6 p-6 md:p-8">
          <div>
            <h2 className="text-2xl font-bold text-card-foreground">{project.title}</h2>
          </div>

          <p className="leading-relaxed text-muted-foreground">{project.fullDescription}</p>

          {/* Key insights */}
          {project.highlights.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
                Key Insights
              </h3>
              <ul className="grid gap-2">
                {project.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
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
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
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

  return (
    <section id="projects" className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex items-center gap-3">
          <FolderOpen className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Projects</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              onClick={() => setSelectedProject(project)}
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
