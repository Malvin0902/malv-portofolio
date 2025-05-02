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

  // Smooth container animation
  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        duration: 1.5, // Increased duration for a smoother fade
        ease: [0.22, 1, 0.36, 1],
      }
    }
  }
  
  // Smooth fade-in for text elements
  const textAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.5, // Adjusted duration for smoother text appearance
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  // Smooth reveal for the gradient span
  const gradientAnimation = {
    hidden: { backgroundPosition: "200% 0" },
    visible: {
      backgroundPosition: "0% 0",
      transition: {
        duration: 2, // Slightly reduced duration for the gradient
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  // Smooth scale animation for button
  const buttonAnimation = {
    hidden: { opacity: 0, scale: 0.95 }, // Slight scale down for smoother appearance
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-16">
      {/* Background gradient with subtle animation */}
      <motion.div 
        className="hero-gradient absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, ease: "easeOut" }} // Slower background transition for a smoother effect
      ></motion.div>

      {/* Content container */}
      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center"
        initial="hidden"
        animate="visible"
        variants={containerAnimation}
      >
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          variants={textAnimation}
        >
          Creating Digital
          <br />
          <motion.span 
            className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-size-200"
            variants={gradientAnimation}
            style={{ backgroundSize: "200% 100%" }}
          >
            Experiences
          </motion.span>
        </motion.h1>

        <motion.p 
          className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-muted-foreground"
          variants={textAnimation}
        >
          Full-stack developer specializing in crafting beautiful, functional, and user-centered digital experiences.
        </motion.p>

        <motion.div variants={buttonAnimation}>
          <Button 
            onClick={scrollToProjects} 
            size="lg" 
            className="rounded-full px-8 relative overflow-hidden group"
          >
            <span className="relative z-10">View My Work</span>
            <motion.span 
              className="absolute inset-0 bg-primary/20 z-0"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ 
                scale: 1.4, // Reduced scale for more subtle effect
                opacity: 1,
                transition: { duration: 0.5, ease: "easeOut" }
              }}
            />
          </Button>
        </motion.div>
      </motion.div>

      {/* Arrow with enhanced smooth animation */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          transition: {
            duration: 1.5, // Adjusted delay for smoother reveal
            delay: 1.5,
          }
        }}
      >
        <motion.div
          animate={{ 
            y: [0, -8, 0], 
            transition: {
              y: {
                duration: 2.5, // Slightly slower duration for smoothness
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
              }
            }
          }}
          whileHover={{ 
            scale: 1.1,
            transition: { duration: 0.3, ease: "easeOut" }
          }}
          >
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={scrollToProjects} 
              className="rounded-full hover:bg-primary/10 transition-colors duration-300"
            >
              <ArrowDown className="h-6 w-6" />
            </Button>
          </motion.div>
      </motion.div>
    </section>
  )
}
