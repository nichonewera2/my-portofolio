import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type Star = {
  x: number
  y: number
  radius: number
  baseAlpha: number
  twinkleSpeed: number
  twinklePhase: number
  driftSpeed: number
}

/**
 * Renders a performant, layered star field on a single canvas.
 * Star count scales down on smaller / lower-power viewports, and all
 * motion is skipped entirely when the user prefers reduced motion.
 */
export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    let stars: Star[] = []
    let animationId = 0
    let deviceScale = Math.min(window.devicePixelRatio || 1, 2)

    const isSmallScreen = () => window.innerWidth < 768

    const buildStars = () => {
      const area = width * height
      const baseDensity = isSmallScreen() ? 1 / 9000 : 1 / 6000
      const count = Math.min(Math.floor(area * baseDensity), isSmallScreen() ? 140 : 260)

      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.3 + 0.3,
        baseAlpha: Math.random() * 0.6 + 0.3,
        twinkleSpeed: Math.random() * 0.6 + 0.2,
        twinklePhase: Math.random() * Math.PI * 2,
        driftSpeed: Math.random() * 4 + 2,
      }))
    }

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      deviceScale = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * deviceScale
      canvas.height = height * deviceScale
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(deviceScale, 0, 0, deviceScale, 0, 0)
      buildStars()
    }

    resize()
    window.addEventListener('resize', resize)

    if (reducedMotion) {
      // Static render only — no animation loop.
      ctx.clearRect(0, 0, width, height)
      stars.forEach((star) => {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(230, 236, 255, ${star.baseAlpha})`
        ctx.fill()
      })
      return () => window.removeEventListener('resize', resize)
    }

    let start = performance.now()

    const render = (now: number) => {
      const elapsed = (now - start) / 1000
      ctx.clearRect(0, 0, width, height)

      for (const star of stars) {
        const twinkle =
          star.baseAlpha *
          (0.6 + 0.4 * Math.sin(elapsed * star.twinkleSpeed + star.twinklePhase))

        const y = (star.y + elapsed * star.driftSpeed * 0.6) % (height + 20)

        ctx.beginPath()
        ctx.arc(star.x, y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(230, 236, 255, ${Math.max(0, Math.min(1, twinkle))})`
        ctx.fill()
      }

      animationId = requestAnimationFrame(render)
    }

    animationId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [reducedMotion])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  )
}
