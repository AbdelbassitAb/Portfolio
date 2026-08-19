"use client"

import { useEffect } from "react"
import Image from "next/image"
import { FolderOpen, ExternalLink } from "lucide-react"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"
import { trackProject, trackProjectImpression } from "@/lib/analytics"
import { handleSpotlightMove } from "@/lib/spotlight"
import { projects, type Project } from "@/lib/projects-data"

function ProjectCard({
  project,
  projectPosition,
}: {
  project: Project
  projectPosition: number
}) {
  const { ref, isVisible } = useAnimateOnScroll<HTMLAnchorElement>(0.1)

  return (
    <a
      ref={ref}
      href={`/projects/${project.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      data-project-name={project.title}
      data-project-position={projectPosition}
      onClick={() => trackProject("card_click", project.title)}
      onMouseMove={handleSpotlightMove}
      className={`spotlight-card group block w-full cursor-pointer overflow-hidden rounded-xl border border-border bg-card text-left transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 animate-scale-in ${isVisible ? "is-visible" : ""}`}
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
        <div className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 glow-primary">
          View project
          <ExternalLink className="h-3 w-3" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-6">
        <h3 className="text-lg font-semibold text-card-foreground transition-colors group-hover:text-primary">{project.title}</h3>
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
    </a>
  )
}

export function ProjectsSection() {
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

    const projectCards = document.querySelectorAll<HTMLAnchorElement>("[data-project-name]")
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
          className={`mb-12 flex items-center gap-3 animate-fade-up ${headerVisible ? "is-visible" : ""}`}
        >
          <FolderOpen className="h-5 w-5 text-primary" />
          <span className="font-mono text-xs tracking-widest text-muted-foreground">04</span>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Projects</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} projectPosition={index + 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
