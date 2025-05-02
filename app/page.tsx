import Hero from "@/components/hero"
import ProjectShowcase from "@/components/project-showcase"
import Skills from "@/components/skills"
import AboutMe from "@/components/about-me"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Hero />
      <ProjectShowcase />
      <Skills />
      <AboutMe />
      <Footer />
    </main>
  )
}
