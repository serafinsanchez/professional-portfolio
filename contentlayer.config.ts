import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: 'content/projects/**/*.mdx',
  contentType: 'mdx',
  type: 'Project',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    excerpt: { type: 'string', required: true },
    tags: { type: 'list', of: { type: 'string' }, required: false },
    stack: { type: 'list', of: { type: 'string' }, required: false },
    links: { type: 'json', required: false },
    featured: { type: 'boolean', required: false, default: false },
    order: { type: 'number', required: false },
    image: { type: 'string', required: false },
    role: { type: 'string', required: false },
    company: { type: 'string', required: false },
    duration: { type: 'string', required: false }
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace('content/projects/', '')
    }
  }
}))

export const Work = defineDocumentType(() => ({
  name: 'Work',
  filePathPattern: 'content/work/**/*.mdx',
  contentType: 'mdx',
  type: 'Work',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    excerpt: { type: 'string', required: true },
    company: { type: 'string', required: true },
    position: { type: 'string', required: true },
    duration: { type: 'string', required: true },
    tags: { type: 'list', of: { type: 'string' }, required: false },
    stack: { type: 'list', of: { type: 'string' }, required: false },
    links: { type: 'json', required: false },
    featured: { type: 'boolean', required: false, default: false },
    order: { type: 'number', required: false },
    logo: { type: 'string', required: false }
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace('content/work/', '')
    }
  }
}))

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: 'content/blog/**/*.mdx',
  contentType: 'mdx',
  type: 'Post',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    excerpt: { type: 'string', required: true },
    tags: { type: 'list', of: { type: 'string' }, required: false },
    featured: { type: 'boolean', required: false, default: false },
    order: { type: 'number', required: false },
    image: { type: 'string', required: false }
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace('content/blog/', '')
    }
  }
}))

export const About = defineDocumentType(() => ({
  name: 'About',
  filePathPattern: 'content/about.mdx',
  contentType: 'mdx',
  type: 'About',
  fields: {
    title: { type: 'string', required: true },
    excerpt: { type: 'string', required: true },
    image: { type: 'string', required: false },
    avatar: { type: 'string', required: false }
  }
}))

export const Skills = defineDocumentType(() => ({
  name: 'Skills',
  filePathPattern: 'content/skills.mdx',
  contentType: 'mdx',
  type: 'Skills',
  fields: {
    title: { type: 'string', required: true },
    excerpt: { type: 'string', required: true }
  }
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Project, Work, Post, About, Skills],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }]
    ]
  }
})
