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
        <p 
          className="mt-6 text-lg leading-8 text-gray-900 dark:[color:#ffffff!important] font-instrument-sans font-normal sm:text-xl sm:leading-9 md:text-2xl lg:text-3xl"
          style={{ color: 'inherit' }}
        >
          Full-stack, AI-native developer building business solutions and exploring creativity through code.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
      >
        {/* View Projects — sliding arrow + subtle shine sweep */}
        <Button
          asChild
          size="lg"
          className="group relative w-full sm:w-auto px-8 py-3 min-h-[48px] overflow-hidden"
        >
          <Link href="#projects" aria-label="View my project portfolio" className="flex items-center gap-2">
            <svg
              className="transition-transform duration-300 ease-out group-hover:translate-x-1"
              width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"
            >
              <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>View Projects</span>
            {/* Shine sweep */}
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition duration-500" />
          </Link>
        </Button>

        {/* About Me — icon + underline grow on hover/focus */}
        <Button
          asChild
          variant="secondary"
          size="lg"
          className="group relative w-full sm:w-auto px-8 py-3 min-h-[48px]"
        >
          <Link href="#about" aria-label="Learn more about me" className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>About Me</span>
            {/* Underline grow */}
            <span className="pointer-events-none absolute left-3 right-3 bottom-2 h-px bg-foreground/40 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100" />
          </Link>
        </Button>
      </motion.div>
    </div>
  )
}
