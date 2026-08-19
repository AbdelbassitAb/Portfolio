"use client"

import { useState } from "react"
import Image from "next/image"
import { GraduationCap, Award, ExternalLink, RotateCw } from "lucide-react"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"
import { handleSpotlightMove } from "@/lib/spotlight"

const education = [
  {
    degree: "Master 2: MIAGE",
    distinction: "Ranked 1st in class",
    school: "Universite Paris-Saclay, Paris",
    logo: "/images/logos/paris-saclay.jpg",
    period: "2023 - 2025",
  },
  {
    degree: "State Engineer in Information Systems",
    distinction: "",
    school: "Ecole Nationale Superieure d'Informatique (ESI), Algiers",
    logo: "/images/logos/esi.jpg",
    period: "2018 - 2023",
  },
]

const certifications = [
  {
    name: "Microsoft PL-300: Power BI Data Analyst Associate",
    status: "Certified",
    image: "/images/certs/microsoft-pl300.png",
    link: "https://learn.microsoft.com/api/credentials/share/fr-fr/AbdelbassitAbedmeraim-5770/8ECF9C83B56745CC?sharingId=3D32194CFCEE77A7",
    date: "January 2026",
  },
  {
    name: "Data Analyst Associate - DataCamp",
    status: "Certified",
    image: "/images/certs/datacamp-analyst.jpg",
    link: "https://www.datacamp.com/certificate/DAA0010467975082",
    date: "November 2025",
  },
  {
    name: "Alteryx Designer Core",
    status: "Certified",
    image: "/images/certs/alteryx-designer-core.png",
    link: "https://www.credly.com/badges/86fab8ea-872b-4857-958a-da0128ff570d/public_url",
    date: "June 2026",
  },
  {
    name: "Microsoft DP-600: Fabric Analytics Engineer Associate",
    status: "In progress",
    image: null,
    link: null,
    date: "",
  },
]

function FlipCertCard({ cert, index, isVisible }: { cert: (typeof certifications)[number]; index: number; isVisible: boolean }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className={`flip-card group h-72 animate-fade-up stagger-${index + 1} ${isVisible ? "is-visible" : ""}`}
      onMouseMove={handleSpotlightMove}
    >
      <div className={`flip-card-inner spotlight-card h-full cursor-pointer rounded-xl ${flipped ? "is-flipped" : ""}`} onClick={() => setFlipped((f) => !f)}>
        {/* Front */}
        <div className="flip-card-face flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
          {cert.image ? (
            <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-secondary">
              <Image src={cert.image} alt={cert.name} fill className="object-cover" />
            </div>
          ) : (
            <div className="flex aspect-[16/10] w-full shrink-0 items-center justify-center bg-secondary">
              <Award className="h-10 w-10 text-muted-foreground/40" />
            </div>
          )}
          <div className="flex flex-1 flex-col gap-2 p-5">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-semibold leading-tight text-card-foreground">{cert.name}</h3>
              <span
                className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  cert.status === "Certified"
                    ? "border border-primary/20 bg-primary/10 text-primary"
                    : "border border-border bg-secondary text-muted-foreground"
                }`}
              >
                {cert.status}
              </span>
            </div>
            <span className="mt-auto inline-flex items-center gap-1.5 self-start font-mono text-[10px] text-muted-foreground/60">
              <RotateCw className="h-3 w-3" />
              Tap for details
            </span>
          </div>
        </div>

        {/* Back */}
        <div className="flip-card-face flip-card-back flex flex-col justify-between rounded-xl border border-primary/30 bg-card p-6">
          <div>
            <h3 className="text-sm font-semibold leading-tight text-card-foreground">{cert.name}</h3>
            {cert.date && <p className="mt-3 font-mono text-xs tracking-wider text-muted-foreground">Issued {cert.date}</p>}
            <p
              className={`mt-2 inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                cert.status === "Certified"
                  ? "border border-primary/20 bg-primary/10 text-primary"
                  : "border border-border bg-secondary text-muted-foreground"
              }`}
            >
              {cert.status}
            </p>
          </div>

          {cert.link ? (
            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 self-start text-xs font-medium text-primary transition-colors hover:text-primary/80"
            >
              Verify credential
              <ExternalLink className="h-3 w-3" />
            </a>
          ) : (
            <p className="text-xs text-muted-foreground">Certification in progress</p>
          )}
        </div>
      </div>
    </div>
  )
}

export function EducationSection() {
  const { ref: eduHeaderRef, isVisible: eduHeaderVisible } = useAnimateOnScroll(0.1)
  const { ref: eduGridRef, isVisible: eduGridVisible } = useAnimateOnScroll(0.1)
  const { ref: certHeaderRef, isVisible: certHeaderVisible } = useAnimateOnScroll(0.1)
  const { ref: certGridRef, isVisible: certGridVisible } = useAnimateOnScroll(0.1)

  return (
    <section id="education" className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        {/* Education as a pipeline timeline */}
        <div className="mb-20">
          <div
            ref={eduHeaderRef}
            className={`mb-12 flex items-center gap-3 animate-fade-up ${eduHeaderVisible ? "is-visible" : ""}`}
          >
            <GraduationCap className="h-5 w-5 text-primary" />
            <span className="font-mono text-xs tracking-widest text-muted-foreground">03</span>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Education</h2>
          </div>

          <div ref={eduGridRef} className="relative ml-3 border-l-2 border-dashed border-border pl-8">
            {education.map((edu, i) => (
              <div key={edu.degree} className={`relative pb-10 last:pb-0 animate-fade-up stagger-${i + 1} ${eduGridVisible ? "is-visible" : ""}`}>
                <span className="pipeline-node absolute -left-10 top-1 h-4 w-4 rounded-full border-2 border-primary bg-background" />
                <div
                  onMouseMove={handleSpotlightMove}
                  className="spotlight-card flex gap-4 rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
                >
                  {/* School logo */}
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-foreground/90">
                    <Image
                      src={edu.logo}
                      alt={`${edu.school} logo`}
                      fill
                      className="object-contain p-1"
                    />
                  </div>

                  <div className="flex flex-col">
                    <h3 className="text-lg font-semibold text-card-foreground">{edu.degree}</h3>
                    {edu.distinction && (
                      <p className="mt-0.5 text-sm font-medium text-primary">{edu.distinction}</p>
                    )}
                    <p className="mt-1.5 text-sm text-muted-foreground">{edu.school}</p>
                    <p className="mt-1 font-mono text-xs tracking-wider text-muted-foreground">{edu.period}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications as a flip-card badge wall */}
        <div>
          <div
            ref={certHeaderRef}
            className={`mb-3 flex items-center gap-3 animate-fade-up ${certHeaderVisible ? "is-visible" : ""}`}
          >
            <Award className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Certifications</h2>
          </div>
          <p className={`mb-10 text-sm text-muted-foreground animate-fade-up ${certHeaderVisible ? "is-visible" : ""}`}>
            Click a badge to flip it over
          </p>

          <div ref={certGridRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {certifications.map((cert, i) => (
              <FlipCertCard key={cert.name} cert={cert} index={i} isVisible={certGridVisible} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
