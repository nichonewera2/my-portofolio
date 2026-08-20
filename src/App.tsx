import StarField from '@/components/StarField'
import Nebula from '@/components/Nebula'
import Navbar from '@/components/Navbar'
import AudioPlayer from '@/components/AudioPlayer'
import Hero from '@/sections/Hero'
import About from '@/sections/About'
import Projects from '@/sections/Projects'
import Skills from '@/sections/Skills'
import Favorites from '@/sections/Favorites'
import Stats from '@/sections/Stats'
import Contact from '@/sections/Contact'

function App() {
  return (
    <div className="relative min-h-screen">
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
          <Favorites />
          <Stats />
          <Contact />
        </main>
      </div>

      <AudioPlayer />
    </div>
  )
}

export default App
