import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react'
import { notFound } from 'next/navigation'
import { getAllProjects, getProject, getAdjacentProjects, getRelatedProjects, ProjectListItem } from '@/lib/projects'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb, RelatedProjects, ShareButtons, TableOfContents } from '@/components'

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
  let adjacentProjects: { previous: ProjectListItem | null; next: ProjectListItem | null } = { previous: null, next: null }
  let relatedProjects: any[] = []
  
  try {
    project = await getProject(slug)
    adjacentProjects = await getAdjacentProjects(slug)
    relatedProjects = await getRelatedProjects(slug, project.meta.tags || [])
  } catch (error) {
    notFound()
  }
  
  const { Component, meta } = project

  return (
    <main className="min-h-screen py-4 sm:py-8">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        {/* Breadcrumb Navigation */}
        <Breadcrumb 
          items={[
            { label: 'Projects', href: '/projects' },
            { label: meta.title, href: `/projects/${slug}` }
          ]} 
        />
        
        {/* Navigation */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/#projects" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
        </div>

        {/* Hero Image */}
        {meta.cover ? (
          <>
            <div className="relative w-full h-[40vh] md:h-[50vh] lg:h-[60vh] mb-8 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={meta.cover}
                alt={`${meta.title} preview`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                priority
              />
            </div>
            
            {/* Project Header */}
            <header className="mb-12">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
                  {meta.title}
                </h1>
                
                {meta.excerpt && (
                  <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl">
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
                
                <div className="flex flex-wrap gap-3 items-center">
                  {(meta.repo || meta.demo) && (
                    <>
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
                    </>
                  )}
                  <ShareButtons
                    title={meta.title}
                    description={meta.excerpt}
                  />
                </div>
              </div>
            </header>
          </>
        ) : (
          <header className="mb-12">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
                {meta.title}
              </h1>
              
              {meta.excerpt && (
                <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl">
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
              
              <div className="flex flex-wrap gap-3 items-center">
                {(meta.repo || meta.demo) && (
                  <>
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
                  </>
                )}
                <ShareButtons
                  title={meta.title}
                  description={meta.excerpt}
                />
              </div>
            </div>
          </header>
        )}
        
        {/* Content */}
        <div className="grid gap-8 lg:grid-cols-4 lg:gap-12">
          <article className="lg:col-span-3">
            <div className="prose prose-lg max-w-none dark:prose-invert 
                           prose-headings:scroll-mt-24 prose-headings:tracking-tight
                           prose-h1:text-4xl prose-h1:font-bold prose-h1:lg:text-5xl
                           prose-h2:text-3xl prose-h2:font-semibold prose-h2:lg:text-4xl
                           prose-h3:text-2xl prose-h3:font-semibold prose-h3:lg:text-3xl
                           prose-p:leading-7 prose-p:text-base prose-p:sm:text-lg
                           prose-img:rounded-lg prose-img:shadow-lg prose-img:cursor-pointer prose-img:transition-transform prose-img:hover:scale-[1.02]">
              <Component />
            </div>
          </article>
          
          <aside className="lg:col-span-1">
            <TableOfContents />
          </aside>
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <RelatedProjects 
            projects={relatedProjects} 
            currentSlug={slug}
            title="Related Projects"
          />
        )}

        {/* Project Navigation */}
        {(adjacentProjects.previous || adjacentProjects.next) && (
          <nav className="mt-16 pt-8 border-t border-border/50" aria-label="Project navigation">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              {adjacentProjects.previous ? (
                <Link 
                  href={`/projects/${adjacentProjects.previous.slug}`}
                  className="group flex items-center gap-3 p-4 rounded-lg border border-border/50 bg-card hover:bg-accent transition-colors text-left flex-1 sm:max-w-sm"
                >
                  <div className="p-2 rounded-full bg-muted group-hover:bg-accent-foreground/10 transition-colors">
                    <ChevronLeft className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-muted-foreground font-medium">Previous</p>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                      {adjacentProjects.previous.title}
                    </h3>
                  </div>
                </Link>
              ) : (
                <div className="flex-1 sm:max-w-sm" />
              )}

              {adjacentProjects.next ? (
                <Link 
                  href={`/projects/${adjacentProjects.next.slug}`}
                  className="group flex items-center gap-3 p-4 rounded-lg border border-border/50 bg-card hover:bg-accent transition-colors text-right flex-1 sm:max-w-sm"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-muted-foreground font-medium">Next</p>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                      {adjacentProjects.next.title}
                    </h3>
                  </div>
                  <div className="p-2 rounded-full bg-muted group-hover:bg-accent-foreground/10 transition-colors">
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </Link>
              ) : (
                <div className="flex-1 sm:max-w-sm" />
              )}
            </div>
          </nav>
        )}
      </div>
    </main>
  )
}
