import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { provinceSlug } from '../lib/catalog'

// Homepage campaigns share one typed destination resolver.
export function DiscoveryLink({ search, children, className }: { to?: '/'; search: { publico?: string; tipo?: string; categoria?: string; provincia?: string }; children: ReactNode; className?: string }) {
  if (search.provincia) return <Link to="/provincias/$slug" params={{ slug: provinceSlug(search.provincia) }} className={className}>{children}</Link>
  const to = search.tipo === 'produtos' ? '/produtos' : search.tipo === 'servicos' ? '/servicos' : '/projectos'
  return <Link to={to} search={{ ...search, tipo: 'todos' }} className={className}>{children}</Link>
}
