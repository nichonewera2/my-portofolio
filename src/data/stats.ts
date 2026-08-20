export type LanguageStat = {
  name: string
  percent: number
  color: string
}

export const languageStats: LanguageStat[] = [
  { name: 'TypeScript', percent: 42, color: '#5eead4' },
  { name: 'JavaScript', percent: 24, color: '#fbbf7d' },
  { name: 'CSS', percent: 19, color: '#a78bfa' },
  { name: 'HTML', percent: 15, color: '#22d3ee' },
]

export type FunFact = {
  label: string
  value: string
}

export const funFacts: FunFact[] = [
  { label: 'Projects launched into orbit', value: '2' },
  { label: 'Cups of tea while debugging', value: '∞' },
  { label: 'Times "it works on my machine"', value: '17' },
  { label: 'Hours lost to CSS centering', value: '6+' },
]
