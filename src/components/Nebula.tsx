import heroBg from '@/assets/hero-bg.jpg'

/**
 * The global backdrop: a rich hand-generated nebula/starfield photo as the
 * base layer, topped with slow-moving CSS gradient blobs for extra depth
 * and motion. Pure decoration — sits behind everything else.
 */
export default function Nebula() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <img
        src={heroBg}
        alt=""
        className="h-full w-full object-cover opacity-70"
        draggable={false}
      />
      <div className="absolute inset-0 bg-void/55" />

      <div className="absolute -left-1/4 -top-1/4 h-[70vh] w-[70vh] animate-float-slow rounded-full bg-nebula-1 blur-3xl" />
      <div
        className="absolute -right-1/4 top-1/3 h-[60vh] w-[60vh] animate-float-slow rounded-full bg-nebula-2 blur-3xl"
        style={{ animationDelay: '-3s' }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[55vh] w-[55vh] animate-float-slow rounded-full bg-nebula-1 opacity-70 blur-3xl"
        style={{ animationDelay: '-6s' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-void/30 via-transparent to-void" />
    </div>
  )
}
