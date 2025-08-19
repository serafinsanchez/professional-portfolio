import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <Link 
        href="/" 
        className="flex items-center gap-1 hover:text-foreground transition-colors"
        aria-label="Home"
      >
        <Home className="h-4 w-4" />
        <span className="sr-only sm:not-sr-only">Home</span>
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-1">
          <ChevronRight className="h-4 w-4 flex-shrink-0" />
          {index === items.length - 1 ? (
            <span className="font-medium text-foreground truncate">
              {item.label}
            </span>
          ) : (
            <Link 
              href={item.href}
              className="hover:text-foreground transition-colors truncate"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}
