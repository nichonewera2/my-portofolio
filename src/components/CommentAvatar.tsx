const HUE_PAIRS: Array<[number, number]> = [
  [174, 258], // cyan -> violet (brand default)
  [24, 340], // amber -> pink
  [200, 160], // blue -> teal
  [280, 200], // purple -> blue
  [330, 24], // pink -> amber
]

function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export default function CommentAvatar({ name, size = 40 }: { name: string; size?: number }) {
  const h = hashString(name)
  const [h1, h2] = HUE_PAIRS[h % HUE_PAIRS.length]

  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full font-display font-bold text-[#05060d]"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.36,
        background: `linear-gradient(135deg, hsl(${h1} 70% 65%), hsl(${h2} 70% 65%))`,
      }}
    >
      {initialsFromName(name)}
    </div>
  )
}
