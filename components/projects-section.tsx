"use client"

import { useState } from "react"
import Image from "next/image"
import { FolderOpen, Github, ExternalLink, ChevronLeft, ChevronRight, Play } from "lucide-react"

export interface Project {
  title: string
  description: string
  images: string[]
  video?: string
  skills: string[]
  github: string
}

const projects: Project[] = []

function ProjectCard({ project }: { project: Project }) {
  const [currentImage, setCurrentImage] = useState(0)
  const totalMedia = project.images.length + (project.video ? 1 : 0)

  const goNext = () => setCurrentImage((prev) => (prev + 1) % totalMedia)
  const goPrev = () => setCurrentImage((prev) => (prev - 1 + totalMedia) % totalMedia)

  const isVideo = project.video && currentImage === project.images.length

  return (
    <div className="group overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/30">
      {/* Media carousel */}
      {totalMedia > 0 && (
        <div className="relative aspect-video w-full overflow-hidden bg-secondary">
          {isVideo ? (
            <video
              src={project.video}
              controls
              className="h-full w-full object-cover"
              aria-label={`${project.title} demo video`}
            />
          ) : project.images[currentImage] ? (
            <Image
              src={project.images[currentImage]}
              alt={`${project.title} screenshot ${currentImage + 1}`}
              fill
              className="object-cover"
            />
          ) : null}

          {/* Navigation arrows */}
          {totalMedia > 1 && (
            <>
              <button
                onClick={goPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-1.5 text-foreground opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={goNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-1.5 text-foreground opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
                aria-label="Next image"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}

          {/* Dots indicator */}
          {totalMedia > 1 && (
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {Array.from({ length: totalMedia }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === currentImage ? "w-4 bg-primary" : "w-1.5 bg-foreground/40"
                  }`}
                  aria-label={
                    i < project.images.length
                      ? `View image ${i + 1}`
                      : "View video"
                  }
                />
              ))}
            </div>
          )}

          {/* Video indicator */}
          {project.video && !isVideo && (
            <button
              onClick={() => setCurrentImage(project.images.length)}
              className="absolute right-3 top-3 rounded-full bg-background/80 p-2 text-foreground backdrop-blur-sm transition-colors hover:bg-primary hover:text-primary-foreground"
              aria-label="Play video"
            >
              <Play className="h-3 w-3" />
            </button>
          )}
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col gap-4 p-6">
        <h3 className="text-lg font-semibold text-card-foreground">{project.title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>

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

        <div className="mt-auto pt-2">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            <Github className="h-4 w-4" />
            View on GitHub
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  )
}

export function ProjectsSection() {
  return (
    <section id="projects" className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex items-center gap-3">
          <FolderOpen className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Projects</h2>
        </div>

        {projects.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-card/50 p-16 text-center">
            <FolderOpen className="mx-auto mb-4 h-10 w-10 text-muted-foreground/50" />
            <p className="text-lg font-medium text-muted-foreground">Projects coming soon</p>
            <p className="mt-2 text-sm text-muted-foreground/70">
              Stay tuned -- projects will be added here shortly.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
