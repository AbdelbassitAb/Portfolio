"use client"

import Image from "next/image"
import { Download, Linkedin, Github, Mail, MapPin } from "lucide-react"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"

export function HeroSection() {
  const { ref, isVisible } = useAnimateOnScroll(0.1)

  return (
    <section id="about" className="relative px-6 pt-28 pb-20 overflow-hidden">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-primary/5 blur-3xl" />
      
      <div
        ref={ref}
        className="mx-auto flex max-w-6xl flex-col items-center gap-12 lg:flex-row lg:items-start lg:gap-16"
      >
        {/* Photo */}
        <div className={`shrink-0 animate-scale-in ${isVisible ? "is-visible" : ""}`}>
          <div className="relative h-48 w-48 overflow-hidden rounded-full border-2 border-primary/40 glow-primary lg:h-56 lg:w-56">
            <Image
              src="/images/profile.jpg"
              alt="Abdelbassit Abed Meraim"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Text content */}
        <div className="flex flex-1 flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <div className={`flex flex-col gap-2 animate-fade-up ${isVisible ? "is-visible" : ""}`}>
            <p className="font-mono text-sm tracking-wider text-primary">Data Analyst</p>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Abdelbassit Abed Meraim
            </h1>
          </div>

          <p className={`max-w-xl text-pretty leading-relaxed text-muted-foreground animate-fade-up stagger-2 ${isVisible ? "is-visible" : ""}`}>
            Microsoft PL-300 certified Data Analyst (Power BI), specializing in SQL, BI reporting, and Python automation. 
            Experienced in international environments (Sales & Procurement) with a strong focus on KPI reliability, 
            data quality, and decision-making process optimization. Currently seeking a permanent position and available immediately.
          </p>

          <div className={`flex items-center gap-2 text-sm text-muted-foreground animate-fade-up stagger-3 ${isVisible ? "is-visible" : ""}`}>
            <MapPin className="h-4 w-4 text-primary" />
            <span>{"Ile-de-France, France"}</span>
          </div>

          {/* CTA buttons */}
          <div className={`flex flex-wrap items-center gap-3 animate-fade-up stagger-4 ${isVisible ? "is-visible" : ""}`}>
            <a
              href="/cv.pdf"
              download="Abdelbassit-Abed-Meraim-CV.pdf"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 glow-primary-hover"
            >
              <Download className="h-4 w-4" />
              Download CV
            </a>
            <a
              href="https://www.linkedin.com/in/abdelbassit-abed-meraim-909b54174/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm font-medium text-secondary-foreground transition-all hover:border-primary/40 hover:text-primary"
              aria-label="LinkedIn profile"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
            <a
              href="https://github.com/AbdelbassitAb"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm font-medium text-secondary-foreground transition-all hover:border-primary/40 hover:text-primary"
              aria-label="GitHub profile"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              href="mailto:ia_abedmeraim@esi.dz"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm font-medium text-secondary-foreground transition-all hover:border-primary/40 hover:text-primary"
              aria-label="Send email"
            >
              <Mail className="h-4 w-4" />
              Email
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
