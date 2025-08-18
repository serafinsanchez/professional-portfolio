import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface WorkTimelineItem {
  company: string
  role: string
  start: string
  end: string
  summary?: string
  logoUrl?: string
  slug?: string
}

interface WorkTimelineProps {
  items: WorkTimelineItem[]
}

export function WorkTimeline({ items }: WorkTimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 top-6 bottom-0 w-0.5 bg-border md:left-6" />
      
      <div className="space-y-8">
        {items.map((item, index) => {
          const cardContent = (
            <Card 
              className={cn(
                "transition-all duration-200 hover:shadow-lg",
                item.slug && "cursor-pointer hover:shadow-xl hover:scale-[1.02]"
              )}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-lg md:text-xl">
                      {item.role}
                    </CardTitle>
                    <CardDescription className="mt-1 text-base font-medium text-foreground">
                      {item.company}
                    </CardDescription>
                  </div>
                  {item.logoUrl && (
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 overflow-hidden rounded-lg bg-muted">
                        <Image
                          src={item.logoUrl}
                          alt={`${item.company} logo`}
                          width={40}
                          height={40}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <time dateTime={item.start}>
                    {new Date(item.start).toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </time>
                  <span>-</span>
                  <time dateTime={item.end}>
                    {item.end === 'present' 
                      ? 'Present'
                      : new Date(item.end).toLocaleDateString('en-US', {
                          month: 'long',
                          year: 'numeric',
                        })
                    }
                  </time>
                </div>
              </CardHeader>
              {item.summary && (
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.summary}
                    {item.slug && (
                      <span className="ml-2 text-xs text-primary font-medium">
                        Click to read more →
                      </span>
                    )}
                  </p>
                </CardContent>
              )}
            </Card>
          )
          
          return (
            <div key={index} className="relative flex gap-6 md:gap-8">
              {/* Timeline dot */}
              <div className="relative flex h-8 w-8 shrink-0 items-center justify-center md:h-12 md:w-12">
                <div className="h-3 w-3 rounded-full bg-primary ring-4 ring-background md:h-4 md:w-4" />
              </div>
              
              {/* Content */}
              <div className="flex-1 pb-8">
                {item.slug ? (
                  <Link href={`/work/${item.slug}`}>
                    {cardContent}
                  </Link>
                ) : (
                  cardContent
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
