import { Linkedin, Github, Mail, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col items-center gap-4 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">{"Let's connect"}</h2>
          <p className="max-w-md text-sm text-muted-foreground">
            {"Feel free to reach out if you'd like to discuss a project, a job opportunity, or simply say hello."}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:ia_abedmeraim@esi.dz"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm text-secondary-foreground transition-colors hover:border-primary/30 hover:text-primary"
          >
            <Mail className="h-4 w-4" />
            ia_abedmeraim@esi.dz
          </a>
          <a
            href="tel:+33605591453"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm text-secondary-foreground transition-colors hover:border-primary/30 hover:text-primary"
          >
            <Phone className="h-4 w-4" />
            +33 6 05 59 14 53
          </a>
          <a
            href="https://www.linkedin.com/in/abed-meraim-abdelbassit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm text-secondary-foreground transition-colors hover:border-primary/30 hover:text-primary"
          >
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </a>
          <a
            href="https://github.com/AbdelbassitAb"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm text-secondary-foreground transition-colors hover:border-primary/30 hover:text-primary"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
        </div>

        <div className="mt-16 border-t border-border pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            {"© 2026 Abdelbassit Abed Meraim. All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  )
}
