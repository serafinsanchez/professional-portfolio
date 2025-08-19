import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getAllProjects } from '@/lib/projects'
import { ProjectCard } from '@/components'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'All Projects | Portfolio',
  description: 'Browse all my projects including web applications, tools, and experiments',
}

export default async function ProjectsPage() {
  const projects = await getAllProjects()

  return (
    <main className="min-h-screen py-4 sm:py-8">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              All Projects
            </h1>
            <p className="text-lg text-muted-foreground sm:text-xl">
              A collection of my work, experiments, and contributions. 
              {projects.length > 0 && ` Currently featuring ${projects.length} projects.`}
            </p>
          </div>
        </header>
        
        {/* Projects Grid */}
        {projects.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {projects.map((project) => (
              <div key={project.slug} className="flex">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No projects found. Check back soon for updates!
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
