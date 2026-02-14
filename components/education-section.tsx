import { GraduationCap, Award } from "lucide-react"

const education = [
  {
    degree: "Master 2: MIAGE",
    distinction: "Ranked 1st in class",
    school: "Universite Paris-Saclay, Paris",
    period: "2023 - 2025",
  },
  {
    degree: "State Engineer in Information Systems",
    distinction: "",
    school: "Ecole Nationale Superieure d'Informatique (ESI), Algiers",
    period: "2018 - 2023",
  },
]

const certifications = [
  {
    name: "Microsoft PL-300: Power BI Data Analyst Associate",
    status: "Certified",
  },
  {
    name: "Data Analyst with SQL - DataCamp",
    status: "Certified",
  },
  {
    name: "Microsoft DP-600: Fabric Analytics Engineer Associate",
    status: "In progress",
  },
]

export function EducationSection() {
  return (
    <section id="education" className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        {/* Education */}
        <div className="mb-16">
          <div className="mb-12 flex items-center gap-3">
            <GraduationCap className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Education</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {education.map((edu) => (
              <div
                key={edu.degree}
                className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/30"
              >
                <h3 className="text-lg font-semibold text-card-foreground">{edu.degree}</h3>
                {edu.distinction && (
                  <p className="mt-1 text-sm font-medium text-primary">{edu.distinction}</p>
                )}
                <p className="mt-2 text-sm text-muted-foreground">{edu.school}</p>
                <p className="mt-1 font-mono text-xs tracking-wider text-muted-foreground">{edu.period}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <div className="mb-12 flex items-center gap-3">
            <Award className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Certifications</h2>
          </div>

          <div className="flex flex-col gap-4">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="flex items-center justify-between rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30"
              >
                <p className="font-medium text-card-foreground">{cert.name}</p>
                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                    cert.status === "Certified"
                      ? "border border-primary/20 bg-primary/10 text-primary"
                      : "border border-border bg-secondary text-muted-foreground"
                  }`}
                >
                  {cert.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
