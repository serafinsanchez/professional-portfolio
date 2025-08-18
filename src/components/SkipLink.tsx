import { cn } from '@/lib/utils'

interface SkipLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export function SkipLink({ href, children, className }: SkipLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        // Visually hidden by default
        'absolute -top-40 left-6 z-[100] bg-background px-4 py-2 text-sm font-medium border border-border rounded-md shadow-lg',
        // Show when focused
        'focus:top-6',
        // Ensure proper focus styles
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        // Smooth transitions
        'transition-all duration-200 ease-out',
        className
      )}
    >
      {children}
    </a>
  )
}
