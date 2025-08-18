import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionProps {
  children: ReactNode
  className?: string
  title?: string
  id?: string
}

export function Section({ children, className, title, id }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "mx-auto w-full max-w-6xl px-6 py-16 md:py-24",
        className
      )}
    >
      {title && (
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {title}
          </h2>
        </div>
      )}
      {children}
    </section>
  )
}
