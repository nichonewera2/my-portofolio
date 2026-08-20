import SectionHeading from '@/components/SectionHeading'
import ProjectCard from '@/components/ProjectCard'
import Spaceship from '@/components/Spaceship'
import Asteroid from '@/components/Asteroid'
import { projects } from '@/data/projects'

export default function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden py-24 sm:py-32">
      <Spaceship size={56} tilt={20} className="absolute right-4 top-4 hidden lg:block" />
      <Asteroid size={20} className="absolute left-8 bottom-10 hidden lg:block" />

      <div className="section-shell">
        <SectionHeading
          eyebrow="Log Misi"
          title="Proyek"
          description="Kreasi kecil dan eksperimen yang lebih besar — setiap satu adalah langkah lebih jauh ke dalam semesta kode."
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
