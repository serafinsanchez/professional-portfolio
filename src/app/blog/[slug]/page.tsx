import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import { notFound } from 'next/navigation'
import { getAllBlogPosts, getBlogPost } from '@/lib/blog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// Static params generation for build time
export async function generateStaticParams() {
  const posts = await getAllBlogPosts()
  
  return posts.map((post) => ({
    slug: post.slug,
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
    const post = await getBlogPost(slug)
    
    return {
      title: `${post.meta.title} | Serafin Sanchez`,
      description: post.meta.excerpt || `Read "${post.meta.title}" on my blog`,
      openGraph: {
        title: post.meta.title,
        description: post.meta.excerpt,
        type: 'article',
        publishedTime: post.meta.date,
        authors: [post.meta.author || 'Serafin Sanchez'],
        tags: post.meta.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.meta.title,
        description: post.meta.excerpt,
      },
    }
  } catch (error) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found',
    }
  }
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  
  let post
  
  try {
    post = await getBlogPost(slug)
  } catch (error) {
    notFound()
  }
  
  const { Component, meta } = post

  const formattedDate = new Date(meta.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <main className="min-h-screen py-8">
      <article className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/blog" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
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
            
            {/* Meta information */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <time dateTime={meta.date}>{formattedDate}</time>
              </div>
              {meta.readTime && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{meta.readTime}</span>
                </div>
              )}
              {meta.author && (
                <div>
                  By {meta.author}
                </div>
              )}
            </div>
            
            {meta.tags && meta.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {meta.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </header>
        
        {/* Content */}
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <Component />
        </div>

        {/* Back to blog link */}
        <footer className="mt-12 pt-8 border-t">
          <div className="flex justify-between items-center">
            <Button variant="outline" asChild>
              <Link href="/blog" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                More Posts
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/#contact">
                Get in Touch
              </Link>
            </Button>
          </div>
        </footer>
      </article>
    </main>
  )
}
