import Link from "next/link"
import Image from "next/image"
import { ExternalLink, Github } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { ProjectListItem } from "@/lib/projects"

interface ProjectCardProps {
  project: ProjectListItem
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group h-full w-full transition-all duration-200 hover:shadow-lg overflow-hidden flex flex-col">
      <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
        <Link 
          href={`/projects/${project.slug}`}
          className="block h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label={`Learn more about ${project.title}`}
        >
          {project.cover ? (
            <Image
              src={project.cover}
              alt={`${project.title} preview`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-primary/60">
                    {project.title.charAt(0).toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground font-medium">
                  {project.title}
                </p>
              </div>
            </div>
          )}
        </Link>
      </div>
      
      <div className="flex flex-col flex-1 p-6 space-y-4">
        <div className="space-y-2">
          <CardTitle className="group-hover:text-primary transition-colors leading-tight">
            <Link 
              href={`/projects/${project.slug}`} 
              className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
              aria-label={`Learn more about ${project.title}`}
            >
              {project.title}
            </Link>
          </CardTitle>
          {project.excerpt && (
            <CardDescription className="line-clamp-3 text-sm">
              {project.excerpt}
            </CardDescription>
          )}
        </div>
        
        <div className="flex-1">
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, 6).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">
                  {tag}
                </Badge>
              ))}
              {project.tags.length > 6 && (
                <Badge variant="outline" className="text-xs px-2 py-0.5">
                  +{project.tags.length - 6}
                </Badge>
              )}
            </div>
          )}
        </div>
        
        {(project.repo || project.demo) && (
          <div className="flex gap-2 pt-2 border-t border-border/50">
            {project.repo && (
              <Button variant="outline" size="sm" asChild className="flex-1">
                <Link 
                  href={project.repo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                  aria-label={`View ${project.title} source code on GitHub (opens in new tab)`}
                >
                  <Github className="h-4 w-4" />
                  Code
                </Link>
              </Button>
            )}
            {project.demo && (
              <Button size="sm" asChild className="flex-1">
                <Link 
                  href={project.demo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                  aria-label={`View ${project.title} live demo (opens in new tab)`}
                >
                  <ExternalLink className="h-4 w-4" />
                  Demo
                </Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  )
}
