"use client"

import Image from "next/image"
import { Download, Linkedin, Github, Mail, MapPin, ArrowRight } from "lucide-react"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"
import { trackCTA, trackEvent, trackContactIntentAction } from "@/lib/analytics"

export function HeroSection() {
  const { ref, isVisible } = useAnimateOnScroll(0.1)

  return (
    <section id="about" className="relative overflow-hidden px-6 pt-28 pb-20">
      <div className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div
        ref={ref}
        className="mx-auto flex max-w-6xl flex-col items-center gap-12 lg:flex-row lg:items-start lg:gap-16"
      >
        <div className={`shrink-0 animate-scale-in ${isVisible ? "is-visible" : ""}`}>
          <div className="glow-primary relative h-48 w-48 overflow-hidden rounded-full border-2 border-primary/40 lg:h-56 lg:w-56">
            <Image
              src="/images/profile.jpg"
              alt="Abdelbassit Abed Meraim"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <div className={`flex flex-col gap-2 animate-fade-up ${isVisible ? "is-visible" : ""}`}>
            <p className="font-mono text-sm tracking-wider text-primary">Data Analyst · Business Impact Focus</p>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              I turn unreliable data into trusted KPIs and measurable business decisions.
            </h1>
          </div>

          <p className={`max-w-2xl text-pretty leading-relaxed text-muted-foreground animate-fade-up stagger-2 ${isVisible ? "is-visible" : ""}`}>
            I specialize in KPI reliability, data quality governance, and analytics automation for Sales and Procurement teams.
            I help organizations detect inconsistencies early, standardize reporting, and accelerate decision-making with robust data pipelines.
          </p>

          <div className={`grid max-w-2xl gap-3 text-sm text-muted-foreground sm:grid-cols-2 animate-fade-up stagger-3 ${isVisible ? "is-visible" : ""}`}>
            <p className="rounded-lg border border-border bg-card/40 px-4 py-3">
              Improved global KPI consistency across <span className="font-semibold text-foreground">11 GEOs</span> by aligning Sales definitions and validation logic.
            </p>
            <p className="rounded-lg border border-border bg-card/40 px-4 py-3">
              Automated multi-region procurement data checks with Python, cutting manual processing from <span className="font-semibold text-foreground">2 days to minutes</span>.
            </p>
          </div>

          <p className={`text-sm font-medium text-primary animate-fade-up stagger-4 ${isVisible ? "is-visible" : ""}`}>
            Available for Data Analyst roles · Immediate availability
          </p>

          <div className={`flex items-center gap-2 text-sm text-muted-foreground animate-fade-up stagger-4 ${isVisible ? "is-visible" : ""}`}>
            <MapPin className="h-4 w-4 text-primary" />
            <span>{"Ile-de-France, France"}</span>
          </div>

          <div className={`flex flex-wrap items-center gap-3 animate-fade-up stagger-4 ${isVisible ? "is-visible" : ""}`}>
            <a
              href="/cv.pdf"
              download="Abdelbassit-Abed-Meraim-CV.pdf"
              onClick={() => {
                trackCTA("download_cv", "hero")
                trackEvent("cv_download")
                trackContactIntentAction("cv_download")
              }}
              className="glow-primary-hover inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
            >
              <Download className="h-4 w-4" />
              Download CV
            </a>
            <a
              href="#projects"
              onClick={() => trackCTA("view_projects", "hero")}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm font-medium text-secondary-foreground transition-all hover:border-primary/40 hover:text-primary"
            >
              <ArrowRight className="h-4 w-4" />
              View Projects
            </a>
            <a
              href="#contact"
              onClick={() => {
                trackCTA("contact_me", "hero")
                trackContactIntentAction("email")
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm font-medium text-secondary-foreground transition-all hover:border-primary/40 hover:text-primary"
            >
              <Mail className="h-4 w-4" />
              Contact me
            </a>
            <a
              href="https://www.linkedin.com/in/abdelbassit-abed-meraim-909b54174/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCTA("linkedin", "hero")}
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
              onClick={() => trackCTA("github", "hero")}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm font-medium text-secondary-foreground transition-all hover:border-primary/40 hover:text-primary"
              aria-label="GitHub profile"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
