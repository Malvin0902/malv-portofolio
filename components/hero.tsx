"use client"

import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Hero() {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects")
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-16">
      <div className="hero-gradient absolute inset-0 z-0"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center"
      >
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Creating Digital
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
            Experiences
          </span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Full-stack developer specializing in crafting beautiful, functional, and user-centered digital experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button onClick={scrollToProjects} size="lg" className="rounded-full px-8">
            View My Work
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 1,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          repeatDelay: 0.5,
        }}
      >
        <Button variant="ghost" size="icon" onClick={scrollToProjects} className="rounded-full animate-bounce">
          <ArrowDown className="h-6 w-6" />
        </Button>
      </motion.div>
    </section>
  )
}
