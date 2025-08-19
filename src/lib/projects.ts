import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'

// Type for project metadata from MDX files
export type ProjectMeta = {
  title: string
  slug?: string
  date?: string
  tags?: string[]
  excerpt?: string
  stack?: string[]
  repo?: string
  demo?: string
  cover?: string
}

// Type for project with component
export type Project = {
  Component: React.ComponentType
  meta: ProjectMeta
}

// Type for project list item
export type ProjectListItem = {
  slug: string
} & ProjectMeta

/**
 * Get all projects from the content/projects directory
 */
export async function getAllProjects(): Promise<ProjectListItem[]> {
  const projectsDirectory = path.join(process.cwd(), 'src', 'content', 'projects')
  
  try {
    const filenames = fs.readdirSync(projectsDirectory)
    const mdxFiles = filenames.filter(name => name.endsWith('.mdx'))
    
    const projects = await Promise.all(
      mdxFiles.map(async (filename) => {
        const slug = filename.replace(/\.mdx$/, '')
        
        try {
          const projectModule = await import(`@/content/projects/${slug}.mdx`)
          return {
            slug,
            ...projectModule.meta
          } as ProjectListItem
        } catch (error) {
          console.error(`Error loading project ${slug}:`, error)
          return null
        }
      })
    )
    
    // Filter out failed imports and sort by date (newest first)
    return projects
      .filter((project): project is ProjectListItem => project !== null)
      .sort((a, b) => {
        if (!a.date || !b.date) return 0
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      })
  } catch (error) {
    console.error('Error reading projects directory:', error)
    return []
  }
}

/**
 * Get a specific project by slug
 */
export async function getProject(slug: string): Promise<Project> {
  try {
    const projectModule = await import(`@/content/projects/${slug}.mdx`)
    
    return {
      Component: projectModule.default,
      meta: projectModule.meta
    }
  } catch (error) {
    console.error(`Error loading project ${slug}:`, error)
    notFound()
  }
}

/**
 * Get adjacent projects (previous and next) for navigation
 */
export async function getAdjacentProjects(currentSlug: string): Promise<{
  previous: ProjectListItem | null
  next: ProjectListItem | null
}> {
  try {
    const allProjects = await getAllProjects()
    const currentIndex = allProjects.findIndex(project => project.slug === currentSlug)
    
    if (currentIndex === -1) {
      return { previous: null, next: null }
    }
    
    return {
      previous: currentIndex > 0 ? allProjects[currentIndex - 1] : null,
      next: currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null
    }
  } catch (error) {
    console.error(`Error getting adjacent projects for ${currentSlug}:`, error)
    return { previous: null, next: null }
  }
}

/**
 * Get related projects based on shared tags
 */
export async function getRelatedProjects(currentSlug: string, currentTags: string[] = []): Promise<ProjectListItem[]> {
  try {
    const allProjects = await getAllProjects()
    
    // Filter out current project
    const otherProjects = allProjects.filter(project => project.slug !== currentSlug)
    
    if (currentTags.length === 0) {
      // If no tags, return recent projects
      return otherProjects.slice(0, 6)
    }
    
    // Score projects by shared tags
    const scoredProjects = otherProjects.map(project => {
      const projectTags = project.tags || []
      const sharedTags = currentTags.filter(tag => projectTags.includes(tag))
      const score = sharedTags.length
      
      return {
        ...project,
        score
      }
    })
    
    // Sort by score (most shared tags first), then by date
    return scoredProjects
      .sort((a, b) => {
        if (a.score !== b.score) {
          return b.score - a.score
        }
        // If same score, sort by date
        if (!a.date || !b.date) return 0
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      })
      .slice(0, 6)
  } catch (error) {
    console.error(`Error getting related projects for ${currentSlug}:`, error)
    return []
  }
}
