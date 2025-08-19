import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { getWorkExperience, getAllWorkExperiences } from '@/lib/work'

interface WorkPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function WorkPage({ params }: WorkPageProps) {
  try {
    const { slug } = await params
    const { Component, meta } = await getWorkExperience(slug)
    
    return (
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="mb-8">
            <Button asChild variant="ghost" className="mb-4">
              <Link href="/#work">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Work Experience
              </Link>
            </Button>
          </div>
          
          <article className="prose prose-lg max-w-none dark:prose-invert">
            <Component />
          </article>
        </div>
      </main>
    )
  } catch (error) {
    notFound()
  }
}

// Generate static params for all work experiences
export async function generateStaticParams() {
  const workExperiences = await getAllWorkExperiences()
  return workExperiences.map((work) => ({
    slug: work.slug
  }))
}
