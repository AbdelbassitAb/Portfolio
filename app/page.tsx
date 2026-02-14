import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ExperienceSection } from "@/components/experience-section"
import { SkillsSection } from "@/components/skills-section"
import { EducationSection } from "@/components/education-section"
import { ProjectsSection } from "@/components/projects-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <div className="mx-auto max-w-6xl px-6">
          <hr className="border-border" />
        </div>
        <ExperienceSection />
        <div className="mx-auto max-w-6xl px-6">
          <hr className="border-border" />
        </div>
        <SkillsSection />
        <div className="mx-auto max-w-6xl px-6">
          <hr className="border-border" />
        </div>
        <EducationSection />
        <div className="mx-auto max-w-6xl px-6">
          <hr className="border-border" />
        </div>
        <ProjectsSection />
      </main>
      <Footer />
    </div>
  )
}
