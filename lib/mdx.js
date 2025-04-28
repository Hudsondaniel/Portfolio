import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const projectsDirectory = path.join(process.cwd(), 'content/projects')

export function getProjectSlugs() {
  return fs.readdirSync(projectsDirectory)
    .filter(file => file.endsWith('.mdx'))
    .map(file => file.replace(/\.mdx$/, ''))
}

export function getProjectBySlug(slug) {
  const fullPath = path.join(projectsDirectory, `${slug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    content,
    title: data.title,
    description: data.description,
    date: data.date,
    url: data.url,
    repository: data.repository,
    published: data.published,
    techStack: data.techStack,
  }
}

export function getAllProjects() {
  const slugs = getProjectSlugs()
  const projects = slugs
    .map(slug => getProjectBySlug(slug))
    .filter(project => project.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  
  return projects
} 