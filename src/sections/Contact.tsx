import { motion } from 'framer-motion'
import SectionHeading from '@/components/SectionHeading'
import SocialIcon from '@/components/SocialIcon'
import Planet from '@/components/Planet'
import { socials } from '@/data/socials'
import { profile } from '@/data/profile'

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-32">
      <Planet size={70} hue="violet" className="absolute right-6 top-10 hidden lg:block" />

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
          className="glass-panel mx-auto max-w-2xl rounded-3xl p-8 text-center sm:p-12"
        >
          <p className="text-sm font-medium text-cyan-glow">{profile.handle}</p>
          <h3 className="mt-2 text-2xl font-semibold text-starlight">{profile.name}</h3>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {socials.map((social) => (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel glass-panel-hover flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-starlight/80 hover:text-starlight"
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
