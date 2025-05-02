"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, ExternalLink } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Goyang Lidah Jogja",
    description: "A culinary recommendation platform for Yogyakarta — think TripAdvisor, but for food. Built with Django and styled using Tailwind CSS.",
    image: "/images/goyang_lidah_jogja.png",
    tags: ["Django", "Tailwind CSS", "Flutter", "Dart", "Python", "javascript"],
    link: "https://github.com/D-EZA-Kelompok5/goyang-lidah-jogja",
  },
  {
    id: 2,
    title: "AI Content Generator",
    description: "AI-powered content creation tool",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "OpenAI"],
    link: "#",
  },
  {
    id: 3,
    title: "Finance Dashboard",
    description: "Visualize financial data and trends",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Vue.js", "D3.js"],
    link: "#",
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "Responsive developer portfolio",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "Framer Motion"],
    link: "#",
  },
  {
    id: 5,
    title: "Task Management App",
    description: "Organize and track your projects",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React Native", "Firebase"],
    link: "#",
  },
  {
    id: 6,
    title: "Weather Application",
    description: "Real-time weather forecasts",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["JavaScript", "Weather API"],
    link: "#",
  },
]

// Triple the projects for a smoother infinite scroll effect
const duplicatedProjects = [...projects, ...projects, ...projects]

export default function ProjectShowcase() {
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section id="projects" className="w-full py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">A selection of my recent work</p>
        </motion.div>
      </div>

      <div className="relative">
        {/* Gradient fade effect on the left */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>

        {/* Gradient fade effect on the right */}
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>

        <div
          className="relative w-full overflow-hidden py-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          ref={containerRef}
        >
          <motion.div
            className="flex gap-6 md:gap-8"
            initial={{ x: "-33.33%" }}
            animate={{
              x: isPaused ? "-33.33%" : "0%", // Changed direction to move from left to right
            }}
            transition={{
              x: {
                duration: 60, // Slower speed for more relaxed pace
                ease: "linear",
                repeat: Number.POSITIVE_INFINITY,
              },
            }}
            style={{ width: "fit-content" }}
          >
            {duplicatedProjects.map((project, index) => (
              <ProjectCard key={`${project.id}-${index}`} project={project} index={index} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

interface ProjectCardProps {
  project: {
    id: number
    title: string
    description: string
    image: string
    tags: string[]
    link: string
  }
  index: number
}

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      className="flex-shrink-0 w-[280px] md:w-[320px] group"
      whileHover={{
        y: -8,
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          delay: (index % projects.length) * 0.1,
        },
      }}
    >
      <Link href={project.link} className="block">
        <div className="relative h-[180px] md:h-[200px] rounded-xl overflow-hidden mb-4 shadow-lg hover:shadow-xl transition-all duration-300">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* View project overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="px-4 py-2 bg-background/80 backdrop-blur-sm rounded-full text-sm font-medium flex items-center gap-2 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              View Project <ExternalLink className="h-4 w-4" />
            </span>
          </div>
        </div>

        <div className="bg-card/40 backdrop-blur-sm p-4 rounded-xl border border-border/20 shadow-md hover:shadow-lg transition-all duration-300">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-lg mb-1 group-hover:text-primary transition-colors duration-200">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-secondary/70 text-secondary-foreground rounded-full text-xs shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
              <ArrowUpRight className="h-5 w-5 text-primary" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
