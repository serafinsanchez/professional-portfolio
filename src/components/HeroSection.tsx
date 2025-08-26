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
        <h1 className="text-4xl font-serif font-normal tracking-tight text-foreground sm:text-5xl md:text-7xl lg:text-8xl">
          hi, I&apos;m Serafin 👋🏽 🎷
        </h1>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8 md:text-xl lg:text-2xl">
          Full-stack AI-native developer building solutions and exploring creativity through code.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
      >
        <Button asChild size="lg" className="w-full sm:w-auto px-8 py-3 min-h-[48px]">
          <Link href="#projects" aria-label="View my project portfolio">
            View Projects
          </Link>
        </Button>
        <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto px-8 py-3 min-h-[48px]">
          <Link href="#about" aria-label="Learn more about me">
            About Me
          </Link>
        </Button>
      </motion.div>
    </div>
  )
}
