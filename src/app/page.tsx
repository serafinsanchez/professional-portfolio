import Link from "next/link"
import dynamic from "next/dynamic"
import { Section, ProjectCard, BlogCard, HeroSection } from "@/components"
import { Button } from "@/components/ui/button"
import { getAllProjects } from "@/lib/projects"
import { getRecentBlogPosts } from "@/lib/blog"
import About from "@/content/about.mdx"
import { meta as skillsMeta } from "@/content/skills.mdx"
import { meta as acmeMeta } from "@/content/work/acme.mdx"
import { meta as vercelMeta } from "@/content/work/vercel.mdx"

// Lazy load below-the-fold components
const WorkTimeline = dynamic(() => import("@/components/WorkTimeline").then(mod => ({ default: mod.WorkTimeline })), {
  loading: () => <div className="h-32 animate-pulse bg-muted rounded-lg" />,
})

const SkillsGrid = dynamic(() => import("@/components/SkillsGrid").then(mod => ({ default: mod.SkillsGrid })), {
  loading: () => <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"><div className="h-32 animate-pulse bg-muted rounded-lg" /><div className="h-32 animate-pulse bg-muted rounded-lg" /><div className="h-32 animate-pulse bg-muted rounded-lg" /></div>,
})

const ContactForm = dynamic(() => import("@/components/ContactForm").then(mod => ({ default: mod.ContactForm })), {
  loading: () => <div className="h-64 animate-pulse bg-muted rounded-lg" />,
})

export default async function Home() {
  // Get projects data
  const allProjects = await getAllProjects()
  const featuredProjects = allProjects.slice(0, 6) // Show top 6 projects
  
  // Get recent blog posts
  const recentBlogPosts = await getRecentBlogPosts(3) // Show top 3 blog posts
  
  // Transform work meta into timeline format
  const workItems = [
    {
      company: "Acme Corp",
      role: acmeMeta.role || "Senior Frontend Developer",
      start: "2022-01-01",
      end: "present",
      summary: acmeMeta.excerpt,
      slug: "acme",
    },
    {
      company: "Vercel",
      role: vercelMeta.role || "Frontend Engineer",
      start: "2020-06-01",
      end: "2021-12-01",
      summary: vercelMeta.excerpt,
      slug: "vercel",
    }
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Section className="flex min-h-screen items-center justify-center py-32">
        <HeroSection />
      </Section>

      {/* About Section */}
      <Section id="about" title="About Me">
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <About />
        </div>
      </Section>

      {/* Work Experience Section */}
      <Section id="work" title="Work Experience">
        <WorkTimeline items={workItems} />
      </Section>

      {/* Projects Section */}
      <Section id="projects" title="Projects">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        
        {allProjects.length > featuredProjects.length && (
          <div className="mt-8 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/projects">
                View All Projects ({allProjects.length} total)
              </Link>
            </Button>
          </div>
        )}
      </Section>

      {/* Blog Section */}
      <Section id="blog" title="Latest Blog Posts">
        {recentBlogPosts.length > 0 ? (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recentBlogPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Button asChild variant="outline" size="lg">
                <Link href="/blog">
                  View All Posts
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <p className="text-lg text-muted-foreground">
              Blog posts coming soon! Stay tuned for insights about web development, career growth, and technical tutorials.
            </p>
          </div>
        )}
      </Section>

      {/* Skills Section */}
      <Section id="skills" title="Skills">
        <SkillsGrid categories={skillsMeta.categories || []} />
      </Section>

      <Section id="contact" title="Contact">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <p className="text-lg text-muted-foreground">
              Have a project in mind or just want to say hello? I&apos;d love to hear from you!
            </p>
          </div>
          <ContactForm />
        </div>
      </Section>
    </main>
  )
}
