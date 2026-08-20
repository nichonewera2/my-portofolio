import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import heroBg from '@/assets/hero-bg.jpg'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * The global backdrop: a rich hand-generated nebula/starfield photo as the
 * base layer, topped with slow-moving CSS gradient blobs for extra depth
 * and motion. The blobs also drift gently toward the cursor for a subtle
 * parallax feel on desktop. Pure decoration — sits behind everything else.
 */
export default function Nebula() {
  const reducedMotion = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const springX = useSpring(mx, { stiffness: 40, damping: 20, mass: 0.6 })
  const springY = useSpring(my, { stiffness: 40, damping: 20, mass: 0.6 })

  useEffect(() => {
    if (reducedMotion) return
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine) return

    const onMove = (event: MouseEvent) => {
      const nx = event.clientX / window.innerWidth - 0.5
      const ny = event.clientY / window.innerHeight - 0.5
      mx.set(nx)
      my.set(ny)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [reducedMotion, mx, my])

  const blobAX = useTransform(springX, (v) => v * -30)
  const blobAY = useTransform(springY, (v) => v * -30)
  const blobBX = useTransform(springX, (v) => v * 22)
  const blobBY = useTransform(springY, (v) => v * 22)
  const blobCX = useTransform(springX, (v) => v * -14)
  const blobCY = useTransform(springY, (v) => v * 14)

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <img
        src={heroBg}
        alt=""
        className="h-full w-full object-cover opacity-70"
        draggable={false}
      />
      <div className="absolute inset-0 bg-void/55" />

      <motion.div style={{ x: blobAX, y: blobAY }} className="absolute -left-1/4 -top-1/4 h-[70vh] w-[70vh]">
        <div className="h-full w-full animate-float-slow rounded-full bg-nebula-1 blur-3xl" />
      </motion.div>
      <motion.div style={{ x: blobBX, y: blobBY }} className="absolute -right-1/4 top-1/3 h-[60vh] w-[60vh]">
        <div
          className="h-full w-full animate-float-slow rounded-full bg-nebula-2 blur-3xl"
          style={{ animationDelay: '-3s' }}
        />
      </motion.div>
      <motion.div style={{ x: blobCX, y: blobCY }} className="absolute bottom-0 left-1/3 h-[55vh] w-[55vh]">
        <div
          className="h-full w-full animate-float-slow rounded-full bg-nebula-1 opacity-70 blur-3xl"
          style={{ animationDelay: '-6s' }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-void/30 via-transparent to-void" />
    </div>
  )
}
