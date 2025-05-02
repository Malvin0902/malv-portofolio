"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Only show the toggle after mounting to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-12 h-6 rounded-full bg-secondary/50" />
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="relative w-12 h-6 rounded-full bg-secondary/50 flex items-center p-1 cursor-pointer"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <span className="sr-only">Toggle theme</span>

      {/* Sun icon */}
      <span className={`absolute left-1.5 transition-opacity duration-200 ${isDark ? "opacity-40" : "opacity-100"}`}>
        <Sun size={14} className="text-yellow-500" />
      </span>

      {/* Moon icon */}
      <span className={`absolute right-1.5 transition-opacity duration-200 ${isDark ? "opacity-100" : "opacity-40"}`}>
        <Moon size={14} className="text-slate-700 dark:text-slate-200" />
      </span>

      {/* Animated thumb */}
      <motion.div
        className="w-4 h-4 rounded-full bg-white shadow-md z-10"
        animate={{ x: isDark ? 24 : 0 }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
          duration: 0.2,
        }}
      />
    </button>
  )
}
