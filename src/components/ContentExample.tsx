'use client'

import { getProjects, getWork, getPosts, getAbout, getSkills } from '@/lib/content'

export default function ContentExample() {
  const projects = getProjects()
  const work = getWork()
  const posts = getPosts()
  const about = getAbout()
  const skills = getSkills()

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Contentlayer Content Example</h1>
      
      {/* About Section */}
      {about && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">About</h2>
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="font-medium">{about.title}</h3>
            <p className="text-gray-600">{about.excerpt}</p>
          </div>
        </section>
      )}

      {/* Skills Section */}
      {skills && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Skills</h2>
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="font-medium">{skills.title}</h3>
            <p className="text-gray-600">{skills.excerpt}</p>
          </div>
        </section>
      )}

      {/* Projects Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Projects ({projects.length})</h2>
        <div className="grid gap-4">
          {projects.map((project) => (
            <div key={project._id} className="bg-gray-100 p-4 rounded">
              <h3 className="font-medium">{project.title}</h3>
              <p className="text-gray-600">{project.excerpt}</p>
              <div className="text-sm text-gray-500 mt-2">
                <span>Date: {new Date(project.date).toLocaleDateString()}</span>
                {project.featured && <span className="ml-2 text-blue-600">⭐ Featured</span>}
              </div>
              {project.stack && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.stack.map((tech) => (
                    <span key={tech} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Work Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Work Experience ({work.length})</h2>
        <div className="grid gap-4">
          {work.map((job) => (
            <div key={job._id} className="bg-gray-100 p-4 rounded">
              <h3 className="font-medium">{job.position}</h3>
              <p className="text-gray-600">{job.company}</p>
              <p className="text-sm text-gray-500">{job.duration}</p>
              <p className="text-gray-600 mt-2">{job.excerpt}</p>
              {job.featured && <span className="text-blue-600 text-sm">⭐ Featured</span>}
            </div>
          ))}
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Blog Posts ({posts.length})</h2>
        <div className="grid gap-4">
          {posts.map((post) => (
            <div key={post._id} className="bg-gray-100 p-4 rounded">
              <h3 className="font-medium">{post.title}</h3>
              <p className="text-gray-600">{post.excerpt}</p>
              <div className="text-sm text-gray-500 mt-2">
                <span>Date: {new Date(post.date).toLocaleDateString()}</span>
                {post.featured && <span className="ml-2 text-blue-600">⭐ Featured</span>}
              </div>
              {post.tags && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
