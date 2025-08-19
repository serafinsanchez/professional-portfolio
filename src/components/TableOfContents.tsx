'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp, BookOpen } from 'lucide-react'

interface Heading {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  className?: string
}

export function TableOfContents({ className = '' }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Extract headings from the page
    const headingElements = Array.from(
      document.querySelectorAll('h1, h2, h3, h4, h5, h6')
    ).filter(heading => {
      // Skip headings that are not in the main article content
      return heading.closest('article')
    })

    const headingsData: Heading[] = headingElements.map((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1))
      let id = heading.id

      // Generate ID if not present
      if (!id) {
        id = heading.textContent
          ?.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '') || `heading-${index}`
        heading.id = id
      }

      return {
        id,
        text: heading.textContent || '',
        level
      }
    })

    setHeadings(headingsData)

    // Set up intersection observer for active section
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleHeadings = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target.id)

        if (visibleHeadings.length > 0) {
          setActiveId(visibleHeadings[0])
        }
      },
      {
        rootMargin: '-20px 0px -80% 0px',
        threshold: 0
      }
    )

    headingElements.forEach((heading) => {
      observer.observe(heading)
    })

    return () => {
      headingElements.forEach((heading) => {
        observer.unobserve(heading)
      })
    }
  }, [])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
    setIsOpen(false)
  }

  if (headings.length === 0) {
    return null
  }

  return (
    <div className={`lg:sticky lg:top-8 ${className}`}>
      {/* Mobile toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Table of Contents
          </span>
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>

      {/* Table of Contents */}
      <nav 
        className={`${isOpen ? 'block' : 'hidden'} lg:block`}
        aria-label="Table of contents"
      >
        <div className="border border-border rounded-lg p-4 bg-card">
          <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-3 flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            On This Page
          </h2>
          <ul className="space-y-2 text-sm">
            {headings.map((heading) => (
              <li key={heading.id}>
                <button
                  onClick={() => scrollToHeading(heading.id)}
                  className={`text-left w-full transition-colors hover:text-primary block ${
                    activeId === heading.id
                      ? 'text-primary font-medium'
                      : 'text-muted-foreground'
                  }`}
                  style={{
                    paddingLeft: `${(heading.level - 1) * 16}px`
                  }}
                >
                  {heading.text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  )
}
