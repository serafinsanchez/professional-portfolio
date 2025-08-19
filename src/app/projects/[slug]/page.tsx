import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'
import { notFound } from 'next/navigation'
import { getAllProjects, getProject } from '@/lib/projects'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// Static params generation for build time
export async function generateStaticParams() {
  const projects = await getAllProjects()
  
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

// Dynamic metadata generation
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params
  
  try {
    const project = await getProject(slug)
    
    return {
      title: project.meta.title,
      description: project.meta.excerpt || `Learn about the ${project.meta.title} project`,
      openGraph: {
        title: project.meta.title,
        description: project.meta.excerpt,
        type: 'article',
        ...(project.meta.cover && {
          images: [
            {
              url: project.meta.cover,
              width: 1200,
              height: 630,
              alt: project.meta.title,
            },
          ],
        }),
      },
    }
  } catch (error) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found',
    }
  }
}

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  
  let project
  
  try {
    project = await getProject(slug)
  } catch (error) {
    notFound()
  }
  
  const { Component, meta } = project

  return (
    <main className="min-h-screen py-8">
      <article className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/#projects" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Projects
              </Link>
            </Button>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
              {meta.title}
            </h1>
            
            {meta.excerpt && (
              <p className="text-xl text-muted-foreground leading-relaxed">
                {meta.excerpt}
              </p>
            )}
            
            {meta.tags && meta.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {meta.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            
            {(meta.repo || meta.demo) && (
              <div className="flex flex-wrap gap-3">
                {meta.repo && (
                  <Button variant="outline" asChild>
                    <Link 
                      href={meta.repo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Github className="h-4 w-4" />
                      View Code
                    </Link>
                  </Button>
                )}
                {meta.demo && (
                  <Button asChild>
                    <Link 
                      href={meta.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </Link>
                  </Button>
                )}
              </div>
            )}
          </div>
        </header>
        
        {/* Hero Image */}
        {meta.cover && (
          <div className="relative w-full h-64 md:h-80 lg:h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src={meta.cover}
              alt={`${meta.title} preview`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              priority
            />
          </div>
        )}
        
        {/* Content */}
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <Component />
        </div>
      </article>
    </main>
  )
}
