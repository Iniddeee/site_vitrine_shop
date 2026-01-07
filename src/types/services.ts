export interface Service {
  id: number
  title: string
  slug: string
  category: string
  description: string
  longDescription: string
  price: number | 'Sur devis'
  image: string
  badge: string | null
  features: string[]
  duration: string
  isShoppable: boolean
}
