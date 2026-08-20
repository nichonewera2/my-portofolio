export type Testimonial = {
  id: string
  name: string
  role: string
  quote: string
}

// Placeholder "incoming transmissions" — swap these for real testimonials
// from friends, teachers, or collaborators whenever you have them.
export const testimonials: Testimonial[] = [
  {
    id: 'transmission-1',
    name: 'Add a name',
    role: 'Friend / Classmate',
    quote:
      'Replace this with something a friend or classmate actually said about working or learning with you.',
  },
  {
    id: 'transmission-2',
    name: 'Add a name',
    role: 'Teacher / Mentor',
    quote:
      'Replace this with a short quote from a teacher or mentor — even one honest sentence works well here.',
  },
  {
    id: 'transmission-3',
    name: 'Add a name',
    role: 'Collaborator',
    quote:
      'Replace this with a note from anyone you have built or worked on something with, however small.',
  },
]
