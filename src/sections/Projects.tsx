import SectionHeading from '@/components/SectionHeading'
import ProjectCard from '@/components/ProjectCard'
import { projects } from '@/data/projects'

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Mission Log"
          title="Projects"
          description="Small builds and bigger experiments — each one a step further into the universe of code."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
