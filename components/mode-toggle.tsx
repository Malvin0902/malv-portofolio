"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { Sun, Moon } from "lucide-react"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  if (!mounted) {
    return <div className="w-14 h-7 rounded-full bg-secondary" />
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-between w-14 h-7 rounded-full p-1 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      style={{
        backgroundColor: theme === "dark" ? "rgba(30, 41, 59, 0.8)" : "rgba(219, 234, 254, 0.8)",
      }}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <span className="sr-only">Toggle theme</span>

      {/* Track icons */}
      <Sun className="h-4 w-4 text-yellow-400" aria-hidden="true" />
      <Moon className="h-4 w-4 text-slate-700" aria-hidden="true" />

      {/* Animated thumb */}
      <motion.div
        className="absolute rounded-full bg-white shadow-lg"
        style={{ width: "1.25rem", height: "1.25rem" }}
        animate={{
          x: theme === "dark" ? "calc(100% - 0.25rem)" : "0.25rem",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </button>
  )
}
