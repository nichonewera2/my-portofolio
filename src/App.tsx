import StarField from '@/components/StarField'
import Nebula from '@/components/Nebula'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AudioPlayer from '@/components/AudioPlayer'
import CustomCursor from '@/components/CustomCursor'
import ScrollProgress from '@/components/ScrollProgress'
import LoadingScreen from '@/components/LoadingScreen'
import Hero from '@/sections/Hero'
import About from '@/sections/About'
import Projects from '@/sections/Projects'
import Skills from '@/sections/Skills'
import Timeline from '@/sections/Timeline'
import Favorites from '@/sections/Favorites'
import Testimonials from '@/sections/Testimonials'
import Stats from '@/sections/Stats'
import Contact from '@/sections/Contact'
import NotFound from '@/components/NotFound'

function App() {
  // The nav only ever scrolls (see Navbar.tsx's scrollTo) — it never touches
  // the URL path — so any pathname other than "/" means the visitor landed
  // on a broken link, old bookmark, or typo'd URL, not a normal in-site click.
  const path = typeof window !== 'undefined' ? window.location.pathname : '/'
  const isKnownPath = path === '/' || path === '/index.html'

  if (!isKnownPath) {
    return (
      <div className="relative min-h-screen">
        <StarField />
        <Nebula />
        <div className="relative z-10">
          <NotFound />
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen">
      <LoadingScreen />
      <CustomCursor />
      <ScrollProgress />
      <StarField />
      <Nebula />
      <div className="pointer-events-none fixed inset-0 z-0 bg-grid-overlay bg-[size:64px_64px] opacity-30" />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Timeline />
          <Favorites />
          <Testimonials />
          <Stats />
          <Contact />
        </main>
        <Footer />
      </div>

      <AudioPlayer />
    </div>
  )
}

export default App
