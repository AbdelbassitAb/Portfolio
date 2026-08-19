import Image from "next/image"
import { Webhook, FileCode, Database, Table2, Workflow, LayoutDashboard, Braces, type LucideIcon } from "lucide-react"

const LOGO_MAP: Record<string, string> = {
  "Power BI (PL-300)": "/images/logos/power-bi.svg",
  "Power BI": "/images/logos/power-bi.svg",
  "SAP BusinessObjects": "/images/logos/sap.svg",
  JSON: "/images/logos/json.svg",
  PostgreSQL: "/images/logos/postgresql.svg",
  Snowflake: "/images/logos/snowflake.svg",
  "Microsoft Azure": "/images/logos/azure.svg",
  Python: "/images/logos/python.svg",
  Pandas: "/images/logos/pandas.svg",
  NumPy: "/images/logos/numpy.svg",
  Matplotlib: "/images/logos/matplotlib.svg",
  Streamlit: "/images/logos/streamlit.svg",
  Git: "/images/logos/git.svg",
  Jira: "/images/logos/jira.svg",
  dbt: "/images/logos/dbt.svg",
}

const FALLBACK_MAP: Record<string, LucideIcon> = {
  "Netvibes Data Perspectives": LayoutDashboard,
  Excel: Table2,
  "Alteryx Designer": Workflow,
  "REST APIs": Webhook,
  XML: FileCode,
  SQL: Database,
  NoSQL: Braces,
}

export function TechIcon({ name, className = "h-4 w-4", size = 16 }: { name: string; className?: string; size?: number }) {
  const logo = LOGO_MAP[name]
  if (logo) {
    return <Image src={logo} alt="" width={size} height={size} aria-hidden className={`${className} object-contain`} />
  }

  const FallbackIcon = FALLBACK_MAP[name]
  if (FallbackIcon) {
    return <FallbackIcon className={className} aria-hidden />
  }

  return null
}
