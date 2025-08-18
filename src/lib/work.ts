import fs from 'fs'
import path from 'path'

// Type for work metadata from MDX files
export type WorkMeta = {
  title: string
  date?: string
  role?: string
  excerpt?: string
}

// Type for work experience with component
export type WorkExperience = {
  Component: React.ComponentType
  meta: WorkMeta
}

// Type for work list item
export type WorkListItem = {
  slug: string
} & WorkMeta

/**
 * Get all work experiences from the content/work directory
 */
export async function getAllWorkExperiences(): Promise<WorkListItem[]> {
  const workDirectory = path.join(process.cwd(), 'src', 'content', 'work')
  
  try {
    const filenames = fs.readdirSync(workDirectory)
    const mdxFiles = filenames.filter(name => name.endsWith('.mdx'))
    
    const workExperiences = await Promise.all(
      mdxFiles.map(async (filename) => {
        const slug = filename.replace(/\.mdx$/, '')
        
        try {
          const workModule = await import(`@/content/work/${slug}.mdx`)
          return {
            slug,
            ...workModule.meta
          } as WorkListItem
        } catch (error) {
          console.error(`Error loading work experience ${slug}:`, error)
          return null
        }
      })
    )
    
    // Filter out failed imports and sort by date (newest first)
    return workExperiences
      .filter((work): work is WorkListItem => work !== null)
      .sort((a, b) => {
        if (!a.date || !b.date) return 0
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      })
  } catch (error) {
    console.error('Error reading work directory:', error)
    return []
  }
}

/**
 * Get a specific work experience by slug
 */
export async function getWorkExperience(slug: string): Promise<WorkExperience> {
  try {
    const workModule = await import(`@/content/work/${slug}.mdx`)
    
    return {
      Component: workModule.default,
      meta: workModule.meta
    }
  } catch (error) {
    console.error(`Error loading work experience ${slug}:`, error)
    throw new Error(`Work experience not found: ${slug}`)
  }
}
