import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { SkillsSection } from "@/components/skills-section"
import { EducationSection } from "@/components/education-section"
import { ProjectsSection } from "@/components/projects-section"
import { Footer } from "@/components/footer"
import { EngagementTracker } from "@/components/engagement-tracker"
import { ScrollProgress } from "@/components/scroll-progress"
import { SectionDivider } from "@/components/section-divider"

export default function Home() {
  return (
    <div className="min-h-screen">
      <EngagementTracker />
      <ScrollProgress />
      <Navbar />
      <main>
        <HeroSection />
        <SectionDivider />
        <SkillsSection />
        <SectionDivider />
        <EducationSection />
        <SectionDivider />
        <ProjectsSection />
      </main>
      <Footer />
    </div>
  )
}
