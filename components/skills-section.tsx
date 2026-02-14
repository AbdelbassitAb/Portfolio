import { Code2, Database, BarChart3, Settings } from "lucide-react"

const skillCategories = [
  {
    title: "Data & BI",
    icon: BarChart3,
    skills: ["Power BI", "Business Objects", "Snowflake", "Talend", "Data Perspectives"],
  },
  {
    title: "Data & Automation",
    icon: Code2,
    skills: ["SQL / NoSQL", "Python", "Power Query", "PostgreSQL"],
  },
  {
    title: "Environments & Methods",
    icon: Settings,
    skills: ["Git", "Microsoft Azure", "Agile / Scrum"],
  },
]

const languages = [
  { name: "French", level: "Fluent" },
  { name: "English", level: "Professional" },
  { name: "Arabic", level: "Native" },
  { name: "Spanish", level: "Basic" },
]

export function SkillsSection() {
  return (
    <section id="skills" className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex items-center gap-3">
          <Code2 className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Technical Stack</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {skillCategories.map((cat) => (
            <div
              key={cat.title}
              className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/30"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <cat.icon className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-semibold text-card-foreground">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Languages */}
        <div className="mt-12">
          <h3 className="mb-6 text-lg font-semibold text-foreground">Languages</h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {languages.map((lang) => (
              <div
                key={lang.name}
                className="rounded-xl border border-border bg-card p-4 text-center transition-colors hover:border-primary/30"
              >
                <p className="font-medium text-card-foreground">{lang.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{lang.level}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
