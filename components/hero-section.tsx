"use client"

import Image from "next/image"
import { Download, Linkedin, Github, Mail, MapPin, ChevronDown } from "lucide-react"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"
import { useMagnetic } from "@/hooks/use-magnetic"
import { trackCTA, trackEvent, trackContactIntentAction } from "@/lib/analytics"
import { RotatingWords } from "@/components/rotating-words"
import { TechMarquee } from "@/components/tech-marquee"

function MagneticLink({
  href,
  download,
  target,
  rel,
  ariaLabel,
  onClick,
  className,
  children,
}: {
  href: string
  download?: string
  target?: string
  rel?: string
  ariaLabel?: string
  onClick?: () => void
  className: string
  children: React.ReactNode
}) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic<HTMLAnchorElement>(0.3)

  return (
    <a
      ref={ref}
      href={href}
      download={download}
      target={target}
      rel={rel}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      aria-label={ariaLabel}
      className={`${className} transition-transform duration-200 ease-out`}
    >
      {children}
    </a>
  )
}

export function HeroSection() {
  const { ref, isVisible } = useAnimateOnScroll(0.1)

  return (
    <section id="about" className="relative overflow-hidden px-6 pb-20 pt-28">
      {/* Ambient aurora background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="aurora-blob-a absolute -top-20 left-1/4 h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl" />
        <div className="aurora-blob-b absolute top-10 right-0 h-[380px] w-[380px] rounded-full bg-accent/10 blur-3xl" />
        <div className="aurora-blob-c absolute -bottom-32 left-0 h-[320px] w-[320px] rounded-full bg-primary/5 blur-3xl" />
      </div>

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
            <p className="font-mono text-sm tracking-wider text-primary">Data Analyst | Analytics Engineer</p>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Abdelbassit Abed Meraim
            </h1>
          </div>

          <p className={`text-lg text-muted-foreground animate-fade-up stagger-2 ${isVisible ? "is-visible" : ""}`}>
            I build{" "}
            <RotatingWords
              words={["reliable dashboards", "automated data pipelines", "clear business insights", "trustworthy KPIs"]}
            />
          </p>

          <p className={`max-w-xl text-pretty leading-relaxed text-muted-foreground animate-fade-up stagger-3 ${isVisible ? "is-visible" : ""}`}>
            Microsoft PL-300 certified Data Analyst with 3 years of international experience in business intelligence,
            automation, and data reliability, collaborating with business teams (Sales & Procurement) and technical
            teams (IT). Autonomous across the full data lifecycle, from gathering business requirements to reporting
            and dashboards, through collection, cleaning, transformation, modeling, and analysis, using Power BI,
            Python, advanced SQL, and Alteryx.
          </p>

          <div className={`flex items-center gap-2 text-sm text-muted-foreground animate-fade-up stagger-4 ${isVisible ? "is-visible" : ""}`}>
            <MapPin className="h-4 w-4 text-primary" />
            <span>{"Ile-de-France, France"}</span>
          </div>

          {/* CTA buttons */}
          <div className={`flex flex-wrap items-center gap-3 animate-fade-up stagger-5 ${isVisible ? "is-visible" : ""}`}>
            <MagneticLink
              href="/cv.pdf"
              download="Abdelbassit-Abed-Meraim-CV.pdf"
              onClick={() => {
                trackCTA("download_cv", "hero")
                trackEvent("cv_download")
                trackContactIntentAction("cv_download")
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 glow-primary-hover"
            >
              <Download className="h-4 w-4" />
              Download CV
            </MagneticLink>
            <MagneticLink
              href="https://www.linkedin.com/in/abdelbassit-abed-meraim-909b54174/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCTA("linkedin", "hero")}
              ariaLabel="LinkedIn profile"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm font-medium text-secondary-foreground hover:border-primary/40 hover:text-primary"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </MagneticLink>
            <MagneticLink
              href="https://github.com/AbdelbassitAb"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCTA("github", "hero")}
              ariaLabel="GitHub profile"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm font-medium text-secondary-foreground hover:border-primary/40 hover:text-primary"
            >
              <Github className="h-4 w-4" />
              GitHub
            </MagneticLink>
            <MagneticLink
              href="mailto:ab.abedmeraim@gmail.com"
              onClick={() => trackCTA("email", "hero")}
              ariaLabel="Send email"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm font-medium text-secondary-foreground hover:border-primary/40 hover:text-primary"
            >
              <Mail className="h-4 w-4" />
              Email
            </MagneticLink>
          </div>

          {/* Tech marquee */}
          <div className={`mt-2 animate-fade-up stagger-6 ${isVisible ? "is-visible" : ""}`}>
            <TechMarquee />
          </div>
        </div>
      </div>

      {/* Scroll-down indicator */}
      <a
        href="#skills"
        aria-label="Scroll to skills"
        className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-muted-foreground transition-colors hover:text-primary sm:flex"
      >
        <span className="font-mono text-[10px] tracking-widest">SCROLL</span>
        <ChevronDown className="h-4 w-4 animate-bounce-down" />
      </a>
    </section>
  )
}
