'use client'

import { useEffect, useState } from 'react'

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const article = document.querySelector('article')
      if (!article) return

      const rect = article.getBoundingClientRect()
      const total = article.scrollHeight - window.innerHeight
      const scrolled = Math.min(Math.max(window.scrollY - (article as HTMLElement).offsetTop, 0), total)
      const pct = total > 0 ? (scrolled / total) * 100 : 0
      setProgress(pct)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-50 h-1 bg-muted">
      <div
        className="h-full bg-primary transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
