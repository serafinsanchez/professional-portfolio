'use client'

import { motion, useReducedMotion } from 'motion/react'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface RevealProps {
  children: ReactNode
  className?: string
  /**
   * Animation direction
   * @default 'up'
   */
  direction?: 'up' | 'down' | 'left' | 'right'
  /**
   * Animation delay in seconds
   * @default 0
   */
  delay?: number
  /**
   * Animation duration in seconds
   * @default 0.6
   */
  duration?: number
  /**
   * Distance to slide from in pixels
   * @default 30
   */
  distance?: number
}

export function Reveal({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 30,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion()

  // Define initial positions based on direction
  const getInitialPosition = () => {
    if (shouldReduceMotion) {
      return { opacity: 0 } // Only fade in for reduced motion
    }
    
    switch (direction) {
      case 'up':
        return { y: distance, opacity: 0 }
      case 'down':
        return { y: -distance, opacity: 0 }
      case 'left':
        return { x: distance, opacity: 0 }
      case 'right':
        return { x: -distance, opacity: 0 }
      default:
        return { y: distance, opacity: 0 }
    }
  }

  return (
    <motion.div
      className={cn(className)}
      initial={getInitialPosition()}
      whileInView={{
        x: 0,
        y: 0,
        opacity: 1,
      }}
      viewport={{
        once: true,
        amount: 0.1, // Trigger when 10% of the element is visible
      }}
      transition={{
        duration: shouldReduceMotion ? 0.01 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.21, 1.11, 0.81, 0.99], // Custom easing for smooth animation
      }}
    >
      {children}
    </motion.div>
  )
}
