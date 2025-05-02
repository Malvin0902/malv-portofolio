"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Github, Linkedin, Instagram, Gamepad2, X, Calendar, GraduationCap } from "lucide-react"

export default function AboutMe() {
  const [location, setLocation] = useState("South Jakarta")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  // Toggle between locations
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setLocation((prev) => (prev === "South Jakarta" ? "Bandung" : "South Jakarta"))
    }, 5000) // Switch every 5 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  // Handle click outside modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false)
      }
    }

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.body.classList.add("modal-open")
    } else {
      document.body.classList.remove("modal-open")
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.classList.remove("modal-open")
    }
  }, [isModalOpen])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, rotate: -5 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const socialVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 200,
      },
    }),
  }

  // Education data
  const education = [
    {
      school: "Universitas Indonesia",
      degree: "Undergraduate in Computer Science",
      years: "2023 — Present",
      description: "Focusing on artificial intelligence and web development",
      icon: <GraduationCap className="h-5 w-5" />,
      progress: 40, // Current education (40% complete)
    },
    {
      school: "SMA Alfa Centauri",
      degree: "High School Diploma",
      years: "2020 — 2023",
      description: "Science and mathematics specialization",
      icon: <Calendar className="h-5 w-5" />,
      progress: 100, // Completed education (100% complete)
    },
  ]

  // Social media links
  const socialLinks = [
    { icon: <Github className="h-6 w-6" />, url: "https://github.com/Malvin0902", label: "GitHub" },
    { icon: <Linkedin className="h-6 w-6" />, url: "https://linkedin.com", label: "LinkedIn" },
    { icon: <Instagram className="h-6 w-6" />, url: "https://www.instagram.com/mlvn.raqin/", label: "Instagram" },
    { icon: <Gamepad2 className="h-6 w-6" />, url: "https://steamcommunity.com/id/raqinn/", label: "Steam" },
  ]

  return (
    <section id="about" className="w-full py-24 overflow-hidden">
      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* About Me Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="text-center mb-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="text-lg text-muted-foreground"
          >
            Full Stack Developer | Tech Enthusiast | Analyst
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Profile Picture */}
          <div className="flex justify-center md:justify-start md:ml-8">
            <motion.div className="relative" variants={itemVariants}>
              <motion.div
                className="relative w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-background shadow-xl cursor-pointer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsModalOpen(true)}
              >
                <Image
                  src="/images/profile.png"
                  alt="Profile"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Content */}
          <motion.div className="space-y-8" variants={itemVariants}>
            <div>
              <motion.h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3" variants={itemVariants}>
                Malvin Muhammad Raqin
              </motion.h2>

              <div className="flex items-center text-muted-foreground">
                <div className="h-6 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={location}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      {location}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <motion.p className="text-lg leading-relaxed" variants={itemVariants}>
              Hi, I’m Malvin — full stack developer by day, bug whisperer by night.
              I build web apps, fix things I broke five minutes ago, and occasionally touch grass.
              Currently studying Computer Science at UI, aka trying to survive both React and real life.
            </motion.p>

            <motion.div className="mt-8" variants={itemVariants}>
              <h3 className="text-xl font-medium mb-6">Education</h3>

              {/* Education Timeline */}
              <div className="space-y-6">
                {education.map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-card/40 backdrop-blur-sm rounded-xl border border-border/20 shadow-md overflow-hidden"
                    initial={{ opacity: 0 }}
                    whileInView={{
                      opacity: 1,
                      transition: {
                        delay: 0.1 * index,
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    }}
                    viewport={{ once: true }}
                  >
                    <div className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-full bg-primary/10 flex-shrink-0 mt-1">{item.icon}</div>

                        <div>
                          <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <h4 className="text-base font-medium">{item.school}</h4>
                            <span className="text-sm text-muted-foreground">{item.years}</span>
                          </div>
                          <p className="text-sm font-medium mt-1">{item.degree}</p>
                          {item.description && <p className="text-sm text-muted-foreground mt-2">{item.description}</p>}
                        </div>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="h-1 w-full bg-primary/10">
                      <motion.div
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        whileInView={{
                          width: `${item.progress}%`,
                          transition: {
                            delay: 0.3 + index * 0.2,
                            duration: 1,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact Me Section */}
            <motion.div className="mt-8" variants={itemVariants}>
              <h3 className="text-xl font-medium mb-6">Reach Me Out!</h3>
              <div className="flex space-x-4 pt-2 justify-center md:justify-start">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="p-4 rounded-full bg-primary/5 hover:bg-primary/10 text-foreground transition-colors duration-300 transform hover:scale-125"
                    custom={index}
                    variants={socialVariants}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Profile Image Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-3xl w-full bg-background/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl border border-border/20"
            >
              <div className="absolute top-4 right-4 z-10">
                <motion.button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-full bg-background/80 hover:bg-background text-foreground transition-colors shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </motion.button>
              </div>
              <motion.div
                className="aspect-square relative"
                initial={{ filter: "grayscale(100%)" }}
                animate={{ filter: "grayscale(0%)" }}
                transition={{ duration: 1 }}
              >
                <Image
                  src="/images/profile.png"
                  alt="Profile"
                  fill
                  className="object-cover"
                  priority
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
