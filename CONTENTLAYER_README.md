# Contentlayer Setup for Next.js Portfolio

This project is configured with Contentlayer for MDX content management, providing a type-safe way to manage portfolio content including projects, work experience, blog posts, and more.

## 🚀 Features

- **Type-safe MDX**: Full TypeScript support for all content
- **Collections**: Projects, Work Experience, Blog Posts
- **Singletons**: About, Skills
- **Rich Frontmatter**: Support for dates, tags, stacks, links, featured status, and ordering
- **MDX Enhancements**: GitHub Flavored Markdown, auto-linking headings, slug generation

## 📁 Content Structure

```
content/
├── about.mdx                 # About singleton
├── skills.mdx               # Skills singleton
├── projects/                # Project collection
│   └── ecommerce-platform.mdx
├── work/                    # Work experience collection
│   └── senior-developer.mdx
└── blog/                    # Blog posts collection
    └── nextjs-performance-optimization.mdx
```

## 🔧 Configuration

### Contentlayer Config (`contentlayer.config.ts`)

Defines document types with:
- **Project**: Portfolio projects with stack, links, featured status
- **Work**: Work experience with company, position, duration
- **Post**: Blog posts with tags and featured status
- **About**: Personal information singleton
- **Skills**: Technical skills overview singleton

### Next.js Integration (`next.config.ts`)

Uses `withContentlayer()` wrapper for seamless integration.

### TypeScript (`tsconfig.json`)

Includes `.contentlayer/generated` for auto-generated types.

## 📝 Content Models

### Project Frontmatter
```yaml
---
type: "Project"
title: "Project Name"
date: 2024-01-15
excerpt: "Project description"
tags: ["tag1", "tag2"]
stack: ["React", "Node.js"]
links:
  live: "https://project.com"
  github: "https://github.com/user/project"
featured: true
order: 1
image: "/images/project.jpg"
role: "Full-stack Developer"
company: "Client Name"
duration: "3 months"
---
```

### Work Frontmatter
```yaml
---
type: "Work"
title: "Job Title"
date: 2023-03-01
excerpt: "Role description"
company: "Company Name"
position: "Job Position"
duration: "2023 - Present"
tags: ["leadership", "mentoring"]
stack: ["React", "Node.js"]
links:
  company: "https://company.com"
featured: true
order: 1
logo: "/images/company-logo.png"
---
```

### Post Frontmatter
```yaml
---
type: "Post"
title: "Blog Post Title"
date: 2024-02-20
excerpt: "Post excerpt"
tags: ["nextjs", "performance"]
featured: true
order: 1
image: "/images/post.jpg"
---
```

## 🛠️ Usage

### Content Queries (`src/lib/content.ts`)

Utility functions for accessing content:

```typescript
import { 
  getProjects, 
  getFeaturedProjects, 
  getWork, 
  getPosts, 
  getAbout, 
  getSkills 
} from '@/lib/content'

// Get all projects, sorted by order and date
const projects = getProjects()

// Get featured projects only
const featuredProjects = getFeaturedProjects()

// Get work experience
const work = getWork()

// Get blog posts
const posts = getPosts()

// Get about information
const about = getAbout()

// Get skills information
const skills = getSkills()
```

### Component Example

```typescript
import { getProjects } from '@/lib/content'

export default function ProjectsList() {
  const projects = getProjects()
  
  return (
    <div>
      {projects.map((project) => (
        <div key={project._id}>
          <h3>{project.title}</h3>
          <p>{project.excerpt}</p>
          <div>{project.stack?.join(', ')}</div>
        </div>
      ))}
    </div>
  )
}
```

## 🔄 Development Workflow

### 1. Add New Content
Create new `.mdx` files in the appropriate content directory with proper frontmatter.

### 2. Build Content
```bash
npm run contentlayer
```

### 3. Development
```bash
npm run dev
```

### 4. Build
```bash
npm run build
```

## 📚 MDX Features

- **GitHub Flavored Markdown**: Tables, strikethrough, task lists
- **Auto-linking Headings**: Automatic ID generation for headings
- **Slug Generation**: URL-friendly slugs for navigation
- **TypeScript Support**: Full type safety for frontmatter and content

## 🎯 Best Practices

1. **Consistent Frontmatter**: Use the same structure across similar content types
2. **Featured Content**: Mark important items as `featured: true`
3. **Ordering**: Use `order` field for custom sorting when needed
4. **Tags**: Use consistent tag naming for better organization
5. **Images**: Store images in `public/images/` and reference with absolute paths

## 🚨 Troubleshooting

### Build Errors
- Ensure all content files have the correct `type` field
- Check that frontmatter matches the defined schema
- Run `npm run contentlayer` before building

### Type Errors
- Verify `.contentlayer/generated` is included in `tsconfig.json`
- Check import paths in content utility functions
- Ensure Contentlayer build completed successfully

### Content Not Loading
- Verify file paths match `filePathPattern` in config
- Check frontmatter syntax (YAML format)
- Ensure MDX files are in the correct content directories

## 📖 Additional Resources

- [Contentlayer Documentation](https://www.contentlayer.dev/)
- [MDX Documentation](https://mdxjs.com/)
- [Next.js App Router](https://nextjs.org/docs/app)
- [TypeScript](https://www.typescriptlang.org/)
