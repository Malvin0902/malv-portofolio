"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, ExternalLink, Star } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Goyang Lidah Jogja",
    description: "A culinary recommendation platform for Yogyakarta — think TripAdvisor, but for food. Built with Django and styled using Tailwind CSS.",
    image: "/images/goyang_lidah_jogja.png",
    tags: ["Django", "Tailwind CSS", "Flutter", "Dart", "Python", "JavaScript"],
    link: "https://github.com/D-EZA-Kelompok5/goyang-lidah-jogja",
    featured: true,
  },
  {
    id: 2,
    title: "AI Content Generator",
    description: "AI-powered content creation tool that transforms ideas into polished text using advanced language models.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "OpenAI", "API Integration"],
    link: "#",
    featured: false,
  },
  {
    id: 3,
    title: "Finance Dashboard",
    description: "Interactive visualization platform for financial data and trends with real-time analytics and reporting.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Vue.js", "D3.js", "Financial API"],
    link: "#",
    featured: true,
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "Responsive developer portfolio showcasing projects and skills with smooth animations and modern design.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "Framer Motion", "Next.js"],
    link: "#",
    featured: false,
  },
  {
    id: 5,
    title: "Task Management App",
    description: "Organize and track projects with this intuitive task management solution featuring collaborative tools.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React Native", "Firebase", "Mobile Development"],
    link: "#",
    featured: false,
  },
  {
    id: 6,
    title: "Weather Application",
    description: "Real-time weather forecasts with location tracking and personalized alerts for changing conditions.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["JavaScript", "Weather API", "Geolocation"],
    link: "#",
    featured: false,
  },
]

// Triple the projects for a smoother infinite scroll effect
const duplicatedProjects = [...projects, ...projects, ...projects]

export default function ProjectShowcase() {
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headerRef, { once: true, amount: 0.3 })
  const controls = useAnimation()
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile for responsive adjustments
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    
    return () => {
      window.removeEventListener('resize', checkIsMobile)
    }
  }, [])

  // Start animations when section comes into view
  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  return (
    <section id="projects" className="w-full py-16 md:py-24 overflow-hidden bg-gradient-to-b from-background to-background/95">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative">
        {/* Decorative elements */}
        <div className="absolute -top-10 left-1/4 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl opacity-50 animate-pulse" />
        <div className="absolute -bottom-16 right-1/3 w-40 h-40 bg-secondary/10 rounded-full filter blur-3xl opacity-40" />
        
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
            }
          }}
          className="text-center relative z-10"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            A curated selection of my most impactful work and creative endeavors
          </p>
        </motion.div>
      </div>

      <div className="relative mt-8">
        {/* Enhanced gradient fade effects */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>

        <div
          className="relative w-full overflow-hidden py-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          ref={containerRef}
        >
          <motion.div
            className="flex gap-6 md:gap-8 hardware-accelerated"
            initial={{ x: isMobile ? "0%" : "-33.33%" }}
            animate={{
              x: isPaused ? (isMobile ? "0%" : "-33.33%") : isMobile ? "-100%" : "0%",
            }}
            transition={{
              x: {
                duration: isMobile ? 40 : 60, // Adjust speed based on device
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
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12 text-center">
        <Link href="/projects" className="inline-flex items-center px-6 py-3 rounded-full bg-primary/10 hover:bg-primary/20 text-primary font-medium group transition-all duration-300 has-transition">
          <span>View all projects</span>
          <ArrowUpRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
        </Link>
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
    featured: boolean
  }
  index: number
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        delay: (index % projects.length) * 0.1,
      }
    },
    hover: {
      y: -10,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }
    }
  }

  const imageVariants = {
    hover: {
      scale: 1.08,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }
    }
  }

  return (
    <motion.div
      className="flex-shrink-0 w-[300px] md:w-[350px] group"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <Link href={project.link} className="block">
        <div className="relative h-[200px] md:h-[220px] rounded-xl overflow-hidden mb-4 shadow-soft transition-shadow duration-300 group-hover:shadow-xl">
          <motion.div className="absolute inset-0" variants={imageVariants}>
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover"
            />
          </motion.div>
          
          {/* Improved overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-3 right-3 px-3 py-1 bg-primary/90 text-primary-foreground rounded-full text-xs font-medium flex items-center gap-1 shadow-lg z-10">
              <Star className="h-3 w-3" />
              <span>Featured</span>
            </div>
          )}

          {/* Improved view project button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="px-5 py-2.5 bg-background/90 backdrop-blur-md rounded-full text-sm font-medium flex items-center gap-2 shadow-button transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
              View Project <ExternalLink className="h-4 w-4" />
            </span>
          </div>
        </div>

        <div className="bg-card/50 backdrop-blur-md p-5 rounded-xl border border-border/30 shadow-soft hover:shadow-xl transition-shadow duration-300">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-xl mb-2 group-hover:text-primary transition-colors duration-200">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.tags.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-secondary/50 hover:bg-secondary/70 text-secondary-foreground rounded-full text-xs shadow-sm transition-colors duration-200"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className="px-3 py-1 bg-secondary/30 text-secondary-foreground rounded-full text-xs shadow-sm">
                    +{project.tags.length - 3}
                  </span>
                )}
              </div>
            </div>

            <div className="opacity-60 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
              <ArrowUpRight className="h-5 w-5 text-primary" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}