"use client"

import { useEffect, useMemo, useState } from "react"
import {
  Search,
  User,
  BarChart3,
  GraduationCap,
  FolderOpen,
  Mail,
  Download,
  Linkedin,
  Github,
  CornerDownLeft,
} from "lucide-react"
import { trackCTA, trackEvent, trackContactIntentAction } from "@/lib/analytics"

interface Command {
  id: string
  label: string
  hint: string
  icon: typeof User
  action: () => void
}

function useCommands(close: () => void): Command[] {
  return useMemo(
    () => [
      {
        id: "about",
        label: "Go to About",
        hint: "Section",
        icon: User,
        action: () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }),
      },
      {
        id: "skills",
        label: "Go to Technical Stack",
        hint: "Section",
        icon: BarChart3,
        action: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }),
      },
      {
        id: "education",
        label: "Go to Education & Certifications",
        hint: "Section",
        icon: GraduationCap,
        action: () => document.getElementById("education")?.scrollIntoView({ behavior: "smooth" }),
      },
      {
        id: "projects",
        label: "Go to Projects",
        hint: "Section",
        icon: FolderOpen,
        action: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }),
      },
      {
        id: "contact",
        label: "Go to Contact",
        hint: "Section",
        icon: Mail,
        action: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }),
      },
      {
        id: "cv",
        label: "Download CV",
        hint: "Action",
        icon: Download,
        action: () => {
          trackCTA("download_cv", "command_palette")
          trackEvent("cv_download")
          trackContactIntentAction("cv_download")
          const link = document.createElement("a")
          link.href = "/cv.pdf"
          link.download = "Abdelbassit-Abed-Meraim-CV.pdf"
          link.click()
        },
      },
      {
        id: "linkedin",
        label: "Open LinkedIn",
        hint: "Link",
        icon: Linkedin,
        action: () => {
          trackCTA("linkedin", "command_palette")
          window.open("https://www.linkedin.com/in/abdelbassit-abed-meraim-909b54174/", "_blank", "noopener,noreferrer")
        },
      },
      {
        id: "github",
        label: "Open GitHub",
        hint: "Link",
        icon: Github,
        action: () => {
          trackCTA("github", "command_palette")
          window.open("https://github.com/AbdelbassitAb", "_blank", "noopener,noreferrer")
        },
      },
      {
        id: "email",
        label: "Send an email",
        hint: "Action",
        icon: Mail,
        action: () => {
          trackCTA("email", "command_palette")
          window.location.href = "mailto:ab.abedmeraim@gmail.com"
        },
      },
    ].map((c) => ({
      ...c,
      action: () => {
        c.action()
        close()
      },
    })),
    [close]
  )
}

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [highlighted, setHighlighted] = useState(0)

  const close = () => {
    setOpen(false)
    setQuery("")
    setHighlighted(0)
  }

  const commands = useCommands(close)
  const filtered = commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()))

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
      if (e.key === "Escape") close()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => setHighlighted(0), [query])

  const onInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setHighlighted((h) => Math.min(h + 1, filtered.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setHighlighted((h) => Math.max(h - 1, 0))
    } else if (e.key === "Enter") {
      e.preventDefault()
      filtered[highlighted]?.action()
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
        className="hidden items-center gap-2 rounded-lg border border-border bg-secondary/60 px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary md:inline-flex"
      >
        <Search className="h-3.5 w-3.5" />
        Jump to
        <kbd className="rounded border border-border bg-background px-1.5 py-0.5 text-[10px]">Ctrl K</kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-background/70 px-4 pt-24 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) close()
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <div className="animate-palette-in w-full max-w-lg overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-primary/10">
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder="Search sections, links, actions..."
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
              <kbd className="shrink-0 rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">Esc</kbd>
            </div>

            <ul className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-muted-foreground">No matches</li>
              )}
              {filtered.map((cmd, i) => (
                <li key={cmd.id}>
                  <button
                    onClick={cmd.action}
                    onMouseEnter={() => setHighlighted(i)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                      i === highlighted ? "bg-primary/10 text-primary" : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    <cmd.icon className="h-4 w-4 shrink-0" />
                    <span className="flex-1">{cmd.label}</span>
                    <span className="font-mono text-[10px] text-muted-foreground">{cmd.hint}</span>
                    {i === highlighted && <CornerDownLeft className="h-3.5 w-3.5 shrink-0" />}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}
