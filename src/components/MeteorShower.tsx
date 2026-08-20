import ShootingStar from '@/components/ShootingStar'

const METEORS = [
  { top: '10%', left: '85%', delay: '0s' },
  { top: '22%', left: '60%', delay: '1.8s' },
  { top: '5%', left: '35%', delay: '3.4s' },
  { top: '30%', left: '92%', delay: '5s' },
]

export default function MeteorShower() {
  return (
    <>
      {METEORS.map((m, i) => (
        <ShootingStar key={i} top={m.top} left={m.left} delay={m.delay} />
      ))}
    </>
  )
}
