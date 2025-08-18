import { allProjects, allWorks, allPosts, allAbouts, allSkills } from '../../.contentlayer/generated'

// Get all projects, sorted by order and date
export function getProjects() {
  return allProjects.sort((a, b) => {
    if (a.order && b.order) return a.order - b.order
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

// Get featured projects
export function getFeaturedProjects() {
  return getProjects().filter(project => project.featured)
}

// Get project by slug
export function getProjectBySlug(slug: string) {
  return allProjects.find(project => project.slug === slug)
}

// Get all work experience, sorted by order and date
export function getWork() {
  return allWorks.sort((a, b) => {
    if (a.order && b.order) return a.order - b.order
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

// Get featured work experience
export function getFeaturedWork() {
  return getWork().filter(work => work.featured)
}

// Get work by slug
export function getWorkBySlug(slug: string) {
  return allWorks.find(work => work.slug === slug)
}

// Get all blog posts, sorted by date
export function getPosts() {
  return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Get featured posts
export function getFeaturedPosts() {
  return getPosts().filter(post => post.featured)
}

// Get post by slug
export function getPostBySlug(slug: string) {
  return allPosts.find(post => post.slug === slug)
}

// Get posts by tag
export function getPostsByTag(tag: string) {
  return getPosts().filter(post => post.tags?.includes(tag))
}

// Get about information
export function getAbout() {
  return allAbouts[0] // Should only be one about document
}

// Get skills information
export function getSkills() {
  return allSkills[0] // Should only be one skills document
}

// Get all tags from posts
export function getAllTags() {
  const tags = new Set<string>()
  allPosts.forEach(post => {
    post.tags?.forEach(tag => tags.add(tag))
  })
  return Array.from(tags).sort()
}

// Get all technologies from projects
export function getAllTechnologies() {
  const techs = new Set<string>()
  allProjects.forEach(project => {
    project.stack?.forEach(tech => techs.add(tech))
  })
  return Array.from(techs).sort()
}
