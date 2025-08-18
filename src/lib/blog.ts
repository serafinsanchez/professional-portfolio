import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'

// Type for blog post metadata from MDX files
export type BlogMeta = {
  title: string
  date: string
  tags?: string[]
  excerpt?: string
  author?: string
  readTime?: string
}

// Type for blog post with component
export type BlogPost = {
  Component: React.ComponentType
  meta: BlogMeta
}

// Type for blog post list item
export type BlogPostListItem = {
  slug: string
} & BlogMeta

/**
 * Get all blog posts from the content/blog directory
 */
export async function getAllBlogPosts(): Promise<BlogPostListItem[]> {
  const blogDirectory = path.join(process.cwd(), 'src', 'content', 'blog')
  
  try {
    const filenames = fs.readdirSync(blogDirectory)
    const mdxFiles = filenames.filter(name => name.endsWith('.mdx'))
    
    const posts = await Promise.all(
      mdxFiles.map(async (filename) => {
        const slug = filename.replace(/\.mdx$/, '')
        
        try {
          const postModule = await import(`@/content/blog/${slug}.mdx`)
          return {
            slug,
            ...postModule.meta
          } as BlogPostListItem
        } catch (error) {
          console.error(`Error loading blog post ${slug}:`, error)
          return null
        }
      })
    )
    
    // Filter out failed imports and sort by date (newest first)
    return posts
      .filter((post): post is BlogPostListItem => post !== null)
      .sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      })
  } catch (error) {
    console.error('Error reading blog directory:', error)
    return []
  }
}

/**
 * Get a specific blog post by slug
 */
export async function getBlogPost(slug: string): Promise<BlogPost> {
  try {
    const postModule = await import(`@/content/blog/${slug}.mdx`)
    
    return {
      Component: postModule.default,
      meta: postModule.meta
    }
  } catch (error) {
    console.error(`Error loading blog post ${slug}:`, error)
    notFound()
  }
}

/**
 * Get recent blog posts (for homepage)
 */
export async function getRecentBlogPosts(limit: number = 3): Promise<BlogPostListItem[]> {
  const allPosts = await getAllBlogPosts()
  return allPosts.slice(0, limit)
}
