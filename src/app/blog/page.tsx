import Link from 'next/link'
import { Metadata } from 'next'
import { Section, BlogCard } from '@/components'
import { Button } from '@/components/ui/button'
import { getAllBlogPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog | Serafin Sanchez',
  description: 'Thoughts, tutorials, and insights about web development, career growth, and technology.',
}

export default async function BlogPage() {
  const allPosts = await getAllBlogPosts()

  return (
    <main className="min-h-screen">
      {/* Header Section */}
      <Section className="py-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
            Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Thoughts, tutorials, and insights about web development, career growth, and emerging technologies.
          </p>
        </div>
      </Section>

      {/* Blog Posts Section */}
      <Section>
        {allPosts.length > 0 ? (
          <>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {allPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
            
            {/* Stats */}
            <div className="mt-12 text-center">
              <p className="text-muted-foreground">
                {allPosts.length} {allPosts.length === 1 ? 'post' : 'posts'} published
              </p>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
              I&apos;m working on some exciting blog posts about web development, career insights, and technical tutorials. 
              Check back soon for the latest content!
            </p>
            <Button asChild variant="outline">
              <Link href="/#contact">
                Get notified when I publish
              </Link>
            </Button>
          </div>
        )}
      </Section>

      {/* Back to Home */}
      <Section>
        <div className="text-center">
          <Button asChild variant="ghost">
            <Link href="/">
              ← Back to Home
            </Link>
          </Button>
        </div>
      </Section>
    </main>
  )
}
