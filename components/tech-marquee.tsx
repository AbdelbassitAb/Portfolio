import { TechIcon } from "@/components/tech-icon"

const MAIN_TOOLS = [
  "Power BI",
  "Python",
  "SQL",
  "Snowflake",
  "Microsoft Azure",
  "PostgreSQL",
  "Git",
  "Streamlit",
  "SAP BusinessObjects",
  "Jira",
]

function ToolBadge({ name }: { name: string }) {
  return (
    <div className="flex shrink-0 items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 backdrop-blur-sm">
      <TechIcon name={name} className="h-4 w-4" />
      <span className="whitespace-nowrap text-xs font-medium text-muted-foreground">{name}</span>
    </div>
  )
}

export function TechMarquee() {
  const track = [...MAIN_TOOLS, ...MAIN_TOOLS]

  return (
    <div className="marquee-row marquee-fade w-full max-w-2xl overflow-hidden">
      <div className="animate-marquee flex w-max items-center gap-3">
        {track.map((name, i) => (
          <ToolBadge key={`${name}-${i}`} name={name} />
        ))}
      </div>
    </div>
  )
}
