"use client"

import { Linkedin, Github, Mail, Phone, Terminal } from "lucide-react"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"
import { trackCTA } from "@/lib/analytics"
import { MagneticLink } from "@/components/magnetic-link"

export function Footer() {
  const { ref, isVisible } = useAnimateOnScroll(0.1)

  return (
    <footer id="contact" className="bg-dot-grid border-t border-border px-6 py-16">
      <div ref={ref} className="mx-auto max-w-6xl">
        <div className={`mb-10 flex flex-col items-center gap-4 text-center animate-fade-up ${isVisible ? "is-visible" : ""}`}>
          <div className="flex items-center gap-3">
            <Terminal className="h-5 w-5 text-primary" />
            <span className="font-mono text-xs tracking-widest text-muted-foreground">05</span>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">{"Let's connect"}</h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            {"Feel free to reach out if you'd like to discuss a project, a job opportunity, or simply say hello."}
          </p>
        </div>

        <div className={`flex flex-wrap items-center justify-center gap-4 animate-fade-up stagger-2 ${isVisible ? "is-visible" : ""}`}>
          <MagneticLink
            href="mailto:ab.abedmeraim@gmail.com"
            onClick={() => trackCTA("email", "footer")}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm text-secondary-foreground hover:border-primary/40 hover:text-primary hover:shadow-md hover:shadow-primary/5"
          >
            <Mail className="h-4 w-4" />
            ab.abedmeraim@gmail.com
          </MagneticLink>
          <MagneticLink
            href="tel:+33605591453"
            onClick={() => trackCTA("phone", "footer")}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm text-secondary-foreground hover:border-primary/40 hover:text-primary hover:shadow-md hover:shadow-primary/5"
          >
            <Phone className="h-4 w-4" />
            +33 6 05 59 14 53
          </MagneticLink>
          <MagneticLink
            href="https://www.linkedin.com/in/abdelbassit-abed-meraim-909b54174/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCTA("linkedin", "footer")}
            ariaLabel="LinkedIn profile"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm text-secondary-foreground hover:border-primary/40 hover:text-primary hover:shadow-md hover:shadow-primary/5"
          >
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </MagneticLink>
          <MagneticLink
            href="https://github.com/AbdelbassitAb"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCTA("github", "footer")}
            ariaLabel="GitHub profile"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm text-secondary-foreground hover:border-primary/40 hover:text-primary hover:shadow-md hover:shadow-primary/5"
          >
            <Github className="h-4 w-4" />
            GitHub
          </MagneticLink>
        </div>

        <div className="mt-16 border-t border-border pt-8 text-center">
          <p className="font-mono text-xs text-muted-foreground">
            {"© 2026 Abdelbassit Abed Meraim. All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  )
}
