"use client"

import { motion } from "framer-motion"
import { Code, Database, PenToolIcon as Tool } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Skill categories with their respective skills
const skillCategories = [
  {
    title: "Front End",
    icon: <Code className="h-6 w-6" />,
    description: "Creating beautiful, responsive user interfaces",
    skills: ["React", "Next.js", "Tailwind CSS", "HTML", "CSS", "JavaScript"],
  },
  {
    title: "Back End",
    icon: <Database className="h-6 w-6" />,
    description: "Building robust server-side applications and APIs",
    skills: ["Node.js", "Express.js", "MongoDB", "MySQL/PostgreSQL (SQL)"],
  },
  {
    title: "Tools",
    icon: <Tool className="h-6 w-6" />,
    description: "Leveraging industry-standard tools for efficient workflows",
    skills: ["Git", "GitHub", "VS Code", "Figma", "Postman"],
  },
]

// Animation variants for cool animation effects
const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, rotate: -5 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
}

const hoverVariants = {
  hover: {
    scale: 1.05,
    rotate: 2,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
}

export default function Skills() {
  return (
    <section id="skills" className="w-full py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Expertise</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and areas of expertise.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className="relative"
            >
              <Card className="h-full border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-md transition-all duration-300">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="p-2 rounded-full bg-primary/10">{category.icon}</div>
                  <div>
                    <CardTitle>{category.title}</CardTitle>
                    <CardDescription className="mt-1">{category.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
