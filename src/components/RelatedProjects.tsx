import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import type { ProjectListItem } from '@/lib/projects'

interface RelatedProjectsProps {
  projects: ProjectListItem[]
  title?: string
  currentSlug?: string
}

export function RelatedProjects({ 
  projects, 
  title = "Related Projects", 
  currentSlug 
}: RelatedProjectsProps) {
  // Filter out current project and limit to 3 projects
  const filteredProjects = projects
    .filter(project => project.slug !== currentSlug)
    .slice(0, 3)

  if (filteredProjects.length === 0) {
    return null
  }

  return (
    <section className="mt-16 pt-8 border-t border-border/50">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight mb-2">
          {title}
        </h2>
        <p className="text-muted-foreground">
          Other projects you might find interesting
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <Card key={project.slug} className="group h-full transition-all duration-200 hover:shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                <Link 
                  href={`/projects/${project.slug}`}
                  className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
                >
                  {project.title}
                </Link>
              </CardTitle>
              {project.excerpt && (
                <CardDescription className="line-clamp-2 text-sm">
                  {project.excerpt}
                </CardDescription>
              )}
            </CardHeader>
            
            <CardContent className="pb-4">
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">
                      {tag}
                    </Badge>
                  ))}
                  {project.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs px-2 py-0.5">
                      +{project.tags.length - 3}
                    </Badge>
                  )}
                </div>
              )}
            </CardContent>
            
            <CardFooter className="pt-0">
              <Button variant="ghost" size="sm" asChild className="w-full justify-between">
                <Link 
                  href={`/projects/${project.slug}`}
                  className="group/button"
                >
                  Learn More
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {projects.length > 3 && (
        <div className="mt-8 text-center">
          <Button variant="outline" asChild>
            <Link href="/projects" className="flex items-center gap-2">
              View All Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}
    </section>
  )
}
