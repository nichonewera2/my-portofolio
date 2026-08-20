import { motion } from 'framer-motion'
import SectionHeading from '@/components/SectionHeading'
import SocialIcon from '@/components/SocialIcon'
import Planet from '@/components/Planet'
import Astronaut from '@/components/Astronaut'
import Spaceship from '@/components/Spaceship'
import Asteroid from '@/components/Asteroid'
import Alien from '@/components/Alien'
import { useParallax } from '@/hooks/useParallax'
import { socials } from '@/data/socials'
import { profile } from '@/data/profile'

export default function Contact() {
  const { ref, y } = useParallax<HTMLDivElement>(35)

  return (
    <section id="contact" ref={ref} className="relative overflow-hidden py-24 sm:py-32">
      <motion.div style={{ y }} className="pointer-events-none absolute inset-0">
        <Planet size={70} hue="violet" variant="saturn" className="absolute right-6 top-10 hidden lg:block" />
        <Planet size={46} hue="cyan" variant="moon" className="absolute left-8 bottom-16 hidden lg:block" />
        <Spaceship size={54} tilt={-45} className="absolute left-[10%] top-6 hidden lg:block" />
        <Asteroid size={20} className="absolute right-[22%] bottom-8 hidden lg:block" />
        <Alien size={38} className="absolute right-[6%] bottom-32 hidden lg:block" />
      </motion.div>

      <div className="section-shell">
        <SectionHeading
          eyebrow="Open Channel"
          title="Let's Connect"
          description="Have a project, an idea, or just want to say hi? Reach out through any of these channels."
          align="center"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="glass-panel relative mx-auto max-w-2xl rounded-bubble-lg p-8 text-center shadow-glow sm:p-12"
        >
          <Astronaut
            size={80}
            pose="wave"
            className="absolute -right-6 -top-10 hidden sm:block"
          />

          <p className="font-mono text-sm font-medium text-cyan-glow">{profile.handle}</p>
          <h3 className="mt-2 text-2xl font-bold text-starlight">{profile.name}</h3>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {socials.map((social) => (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-bubble glass-panel glass-panel-hover flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-starlight/80 hover:text-starlight"
              >
                <SocialIcon icon={social.icon} size={16} />
                {social.label}
              </a>
            ))}
          </div>
        </motion.div>

        <p className="mt-16 text-center text-xs text-starlight/30">
          © {new Date().getFullYear()} {profile.name}. Built with curiosity, one commit at a time.
        </p>
      </div>
    </section>
  )
}
