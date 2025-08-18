"use client"

import { motion } from "motion/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-5xl font-serif font-normal tracking-tight text-foreground sm:text-7xl md:text-8xl">
          hi, I'm Serafin 👋🏽
        </h1>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl md:text-2xl">
          Full-stack AI-native developer solving business problems and exploring creativity through code.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        className="mt-10 flex items-center justify-center gap-4"
      >
        <Button asChild size="lg" className="px-8 py-3">
          <Link href="#projects" aria-label="View my project portfolio">
            View Projects
          </Link>
        </Button>
        <Button asChild variant="secondary" size="lg" className="px-8 py-3">
          <Link href="#about" aria-label="Learn more about me">
            About Me
          </Link>
        </Button>
      </motion.div>
    </div>
  )
}
