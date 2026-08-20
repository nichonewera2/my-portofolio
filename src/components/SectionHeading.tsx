import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
  titleClassName?: string
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  titleClassName,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn('mb-12', align === 'center' && 'text-center')}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2
        className={cn(
          'mt-4 text-3xl font-bold text-starlight sm:text-4xl',
          titleClassName,
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-4 max-w-2xl text-base text-starlight/60',
            align === 'center' && 'mx-auto',
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  )
}
