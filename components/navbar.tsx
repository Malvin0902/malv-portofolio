"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"
import { Menu, X, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 ${
          scrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent"
        } transition-all duration-300`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-xl font-semibold">
              Malv
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-sm font-medium hover:opacity-70 transition-opacity">
                Home
              </Link>
              <Link href="#projects" className="text-sm font-medium hover:opacity-70 transition-opacity">
                Projects
              </Link>
              <Link href="#skills" className="text-sm font-medium hover:opacity-70 transition-opacity">
                Skills
              </Link>
              <button onClick={scrollToAbout} className="text-sm font-medium hover:opacity-70 transition-opacity">
                About
              </button>
              <ThemeToggle />
              <Button variant="ghost" size="icon" onClick={scrollToAbout} className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center space-x-4">
              <ThemeToggle />
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-40 bg-background pt-16"
        >
          <nav className="flex flex-col items-center justify-center h-full space-y-8 text-lg">
            <Link href="/" className="font-medium" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link href="#projects" className="font-medium" onClick={() => setMobileMenuOpen(false)}>
              Projects
            </Link>
            <Link href="#skills" className="font-medium" onClick={() => setMobileMenuOpen(false)}>
              Skills
            </Link>
            <button onClick={scrollToAbout} className="font-medium">
              About
            </button>
            <Button variant="outline" onClick={scrollToAbout} className="rounded-full px-6">
              <User className="h-5 w-5 mr-2" />
              Profile
            </Button>
          </nav>
        </motion.div>
      )}
    </>
  )
}
