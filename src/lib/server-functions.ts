import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { catalogSchema } from './catalog'

export const getCatalog = createServerFn({ method: 'GET' })
  .inputValidator(z.object({ search: catalogSchema, kind: z.enum(['projectos', 'produtos', 'servicos']) }))
  .handler(async ({ data }) => (await import('./catalog.server')).listCatalog(data.search, data.kind))
export const getProject = createServerFn({ method: 'GET' })
  .inputValidator(z.object({ slug: z.string().min(1).max(100) }))
  .handler(async ({ data }) => (await import('./catalog.server')).projectDetail(data.slug))
export const getOffering = createServerFn({ method: 'GET' })
  .inputValidator(z.object({ slug: z.string().min(1).max(100) }))
  .handler(async ({ data }) => (await import('./catalog.server')).offeringDetail(data.slug))
export const getRelated = createServerFn({ method: 'GET' })
  .inputValidator(z.object({ slug: z.string().min(1).max(100) }))
  .handler(async ({ data }) => (await import('./catalog.server')).relatedProjects(data.slug))
