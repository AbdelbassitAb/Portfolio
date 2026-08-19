"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import { trackProject, trackContactIntentAction } from "@/lib/analytics"
import type { Project } from "@/lib/projects-data"

export function ProjectDetail({ project }: { project: Project }) {
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
      if (e.key === "ArrowRight") goNext()
      if (e.key === "ArrowLeft") goPrev()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [goNext, goPrev])

  useEffect(() => {
    trackProject("open_page", project.title)
  }, [project.title])

  return (
    <article className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-2xl font-bold text-foreground md:text-3xl">{project.title}</h1>

      {/* Image carousel */}
      <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-2xl border border-border bg-secondary">
        <Image
          src={project.images[currentImage].src}
          alt={`${project.title} - ${project.images[currentImage].label}`}
          fill
          className="object-contain transition-opacity duration-300"
          priority
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

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-background/80 px-4 py-1.5 text-xs font-medium text-foreground backdrop-blur-sm">
          {project.images[currentImage].label} ({currentImage + 1}/{project.images.length})
        </div>
      </div>

      {/* Thumbnails strip */}
      {project.images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto rounded-xl border border-border bg-secondary/30 p-3">
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
                  i === currentImage ? "border-primary shadow-md shadow-primary/20" : "border-transparent"
                }`}
              >
                <Image src={img.src} alt={img.label} fill className="object-cover" />
              </div>
              <span className="text-[10px] text-muted-foreground">{img.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="mt-10 flex flex-col gap-8">
        <p className="leading-relaxed text-muted-foreground">{project.fullDescription}</p>

        {project.highlights.length > 0 && (
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">Key Insights</h2>
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

        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">Technologies Used</h2>
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

        <div className="border-t border-border pt-8">
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
    </article>
  )
}
