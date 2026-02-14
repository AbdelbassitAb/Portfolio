"use client"

import Image from "next/image"
import { GraduationCap, Award, ExternalLink } from "lucide-react"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"

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
    link: "https://learn.microsoft.com/api/credentials/share/en-us/AbdelbassitAbedmeraim-5770/8ECF9C83B56745CC?sharingId=E0A78BC6F66991DC",
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
    name: "Microsoft DP-600: Fabric Analytics Engineer Associate",
    status: "In progress",
    image: null,
    link: null,
    date: "",
  },
]

export function EducationSection() {
  const { ref: eduHeaderRef, isVisible: eduHeaderVisible } = useAnimateOnScroll(0.1)
  const { ref: eduGridRef, isVisible: eduGridVisible } = useAnimateOnScroll(0.1)
  const { ref: certHeaderRef, isVisible: certHeaderVisible } = useAnimateOnScroll(0.1)
  const { ref: certGridRef, isVisible: certGridVisible } = useAnimateOnScroll(0.1)

  return (
    <section id="education" className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        {/* Education */}
        <div className="mb-16">
          <div
            ref={eduHeaderRef}
            className={`mb-12 flex items-center gap-3 animate-fade-up ${eduHeaderVisible ? "is-visible" : ""}`}
          >
            <GraduationCap className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Education</h2>
          </div>

          <div ref={eduGridRef} className="grid gap-6 md:grid-cols-2">
            {education.map((edu, i) => (
              <div
                key={edu.degree}
                className={`flex gap-4 rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 animate-fade-up stagger-${i + 1} ${eduGridVisible ? "is-visible" : ""}`}
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
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <div
            ref={certHeaderRef}
            className={`mb-12 flex items-center gap-3 animate-fade-up ${certHeaderVisible ? "is-visible" : ""}`}
          >
            <Award className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Certifications</h2>
          </div>

          <div ref={certGridRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert, i) => (
              <div
                key={cert.name}
                className={`group overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 animate-fade-up stagger-${i + 1} ${certGridVisible ? "is-visible" : ""}`}
              >
                {/* Certificate image */}
                {cert.image && (
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-secondary">
                    <Image
                      src={cert.image}
                      alt={cert.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}

                <div className="flex flex-col gap-3 p-5">
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

                  {cert.date && (
                    <p className="font-mono text-xs tracking-wider text-muted-foreground">{cert.date}</p>
                  )}

                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-primary transition-colors hover:text-primary/80"
                    >
                      Verify credential
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
