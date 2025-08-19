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
    <Card className="group h-full transition-all duration-200 hover:shadow-lg overflow-hidden">
      {project.cover && (
        <div className="relative h-48 w-full overflow-hidden">
          <Link 
            href={`/projects/${project.slug}`}
            className="block h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label={`Learn more about ${project.title}`}
          >
            <Image
              src={project.cover}
              alt={`${project.title} preview`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </Link>
        </div>
      )}
      
      <CardHeader>
        <CardTitle className="group-hover:text-primary transition-colors">
          <Link 
            href={`/projects/${project.slug}`} 
            className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
            aria-label={`Learn more about ${project.title}`}
          >
            {project.title}
          </Link>
        </CardTitle>
        {project.excerpt && (
          <CardDescription className="line-clamp-2">
            {project.excerpt}
          </CardDescription>
        )}
      </CardHeader>
      
      <CardContent className="flex-1">
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      
      {(project.repo || project.demo) && (
        <CardFooter className="gap-2 pt-0">
          {project.repo && (
            <Button variant="outline" size="sm" asChild>
              <Link 
                href={project.repo} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
                aria-label={`View ${project.title} source code on GitHub (opens in new tab)`}
              >
                <Github className="h-4 w-4" />
                Code
              </Link>
            </Button>
          )}
          {project.demo && (
            <Button size="sm" asChild>
              <Link 
                href={project.demo} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
                aria-label={`View ${project.title} live demo (opens in new tab)`}
              >
                <ExternalLink className="h-4 w-4" />
                Demo
              </Link>
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  )
}
