import { z } from 'zod'
import { stripSearchParams, type SearchSchemaInput } from '@tanstack/react-router'

export const provinceRecords = [
  { name: 'Cabo Delgado', slug: 'cabo-delgado', region: 'Norte' },
  { name: 'Gaza', slug: 'gaza', region: 'Sul' },
  { name: 'Inhambane', slug: 'inhambane', region: 'Sul' },
  { name: 'Manica', slug: 'manica', region: 'Centro' },
  { name: 'Maputo Província', slug: 'maputo-provincia', region: 'Sul' },
  { name: 'Cidade de Maputo', slug: 'cidade-de-maputo', region: 'Sul' },
  { name: 'Nampula', slug: 'nampula', region: 'Norte' },
  { name: 'Niassa', slug: 'niassa', region: 'Norte' },
  { name: 'Sofala', slug: 'sofala', region: 'Centro' },
  { name: 'Tete', slug: 'tete', region: 'Centro' },
  { name: 'Zambézia', slug: 'zambezia', region: 'Centro' },
] as const
export const provinces = provinceRecords.map(p => p.name)
export const provinceSlug = (name: string) => provinceRecords.find(p => p.name === name)?.slug ?? ''
export const categories = ['Agricultura e alimentos', 'Artesanato', 'Comércio', 'Serviços'] as const
export const photo = (id: string, width = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`
export const catalogSchema = z.object({
  q: z.string().trim().max(100).catch('').default(''),
  provincia: z.string().refine(v => !v || provinces.some(p => p === v)).catch('').default(''),
  categoria: z.enum(['', ...categories]).catch('').default(''),
  publico: z.enum(['todos', 'mulheres', 'jovens']).catch('todos').default('todos'),
  tipo: z.enum(['todos', 'produtos', 'servicos']).catch('todos').default('todos'),
  ordem: z.enum(['nome', 'nome-desc']).catch('nome').default('nome'),
  pagina: z.coerce.number().int().min(1).max(10000).catch(1).default(1),
  vista: z.enum(['grelha', 'lista']).catch('grelha').default('grelha'),
})
export type CatalogSearch = z.infer<typeof catalogSchema>
export type CatalogInput = Partial<Record<keyof CatalogSearch, unknown>> & SearchSchemaInput
export const validateCatalogSearch = (input: CatalogInput) => catalogSchema.parse(input)
export const catalogSearchMiddleware = stripSearchParams<CatalogSearch>(catalogSchema.parse({}))
export type EntryKind = 'projectos' | 'produtos' | 'servicos'
export type Project = {
  slug: string; name: string; province: string; audience: 'mulheres' | 'jovens' | 'ambos';
  category: typeof categories[number]; description: string; image: string; gallery: string[];
  status: 'demo';
}
export type Offering = {
  slug: string; name: string; projectSlug: string; kind: 'produtos' | 'servicos';
  description: string; image: string; price: number | null; unit: string | null;
}
export type CatalogEntry = {
  slug: string; name: string; image: string; description: string; province: string;
  audience: Project['audience']; category: string; kind: EntryKind;
  projectSlug: string; projectName: string; price: number | null; unit: string | null;
}
export type CatalogResult = { items: CatalogEntry[]; total: number; pages: number; page: number; perPage: number }
export const audienceLabel = (value: Project['audience']) => value === 'mulheres' ? 'Mulheres' : value === 'jovens' ? 'Jovens' : 'Mulheres e jovens'
export const priceLabel = (price: number | null, unit: string | null) => price === null ? 'Preço sob consulta' : `${new Intl.NumberFormat('pt-MZ', { style: 'currency', currency: 'MZN' }).format(price)}${unit ? ` / ${unit}` : ''}`
