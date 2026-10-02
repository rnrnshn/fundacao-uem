import { Link, useNavigate, useSearch } from '@tanstack/react-router'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { provinces, categories, provinceSlug } from '../lib/catalog'
export { provinces, categories } from '../lib/catalog'

function Icon({ name, className = 'size-5' }: { name: 'search' | 'chevron' | 'menu' | 'close' | 'map' | 'message'; className?: string }) {
  const paths = {
    search: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></>,
    chevron: <path d="m6 9 6 6 6-6"/>,
    menu: <path d="M3 6h18M3 12h18M3 18h18"/>,
    close: <path d="m6 6 12 12M6 18 18 6"/>,
    map: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    message: <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H4l-2 2V11.5a9.5 9.5 0 0 1 19 0Z"/>,
  }
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

function Dropdown({ label, children, top = false }: { label: string; children: ReactNode; top?: boolean }) {
  return <details className="header-dropdown group relative">
    <summary className={top ? 'flex h-10 cursor-pointer list-none items-center gap-2 border-l border-border px-4 text-[12px] uppercase hover:text-primary' : 'flex min-h-[60px] cursor-pointer list-none items-center gap-2 px-4 text-sm font-bold uppercase transition-colors hover:bg-black/10 group-open:bg-black/10'}>{label}<Icon name="chevron" className="size-3 transition-transform group-open:rotate-180"/></summary>
    <div className={`absolute top-full z-30 min-w-56 border border-border bg-white py-2 text-heading shadow-lg ${top ? 'right-0' : 'left-0'}`}>{children}</div>
  </details>
}

export function Header() {
  const navigate = useNavigate()
  const search = useSearch({ strict: false })
  const [q, setQ] = useState(search.q ?? '')
  const [category, setCategory] = useState<string>(search.categoria ?? '')
  const [mobileOpen, setMobileOpen] = useState(false)
  const header = useRef<HTMLElement>(null)

  useEffect(() => { setQ(search.q ?? ''); setCategory(search.categoria ?? '') }, [search.q, search.categoria])
  useEffect(() => {
    function closeMenus(event: Event) {
      if (event instanceof KeyboardEvent && event.key !== 'Escape') return
      if (!(event instanceof KeyboardEvent) && header.current?.contains(event.target as Node)) return
      header.current?.querySelectorAll('details[open]').forEach(el => el.removeAttribute('open'))
      setMobileOpen(false)
    }
    document.addEventListener('pointerdown', closeMenus)
    document.addEventListener('keydown', closeMenus)
    return () => { document.removeEventListener('pointerdown', closeMenus); document.removeEventListener('keydown', closeMenus) }
  }, [])
  function closeNavigation() {
    setMobileOpen(false)
    header.current?.querySelectorAll('details[open]').forEach(el => el.removeAttribute('open'))
  }
  const dropdownLink = 'block px-5 py-2.5 text-[14px] transition-colors hover:bg-surface-muted hover:text-primary focus-visible:bg-surface-muted'

  return <>
    <a href="#main" className="sr-only z-50 bg-white p-3 text-primary focus:not-sr-only focus:fixed">Saltar para o conteúdo</a>
    <header ref={header}>
      <div className="border-b border-border bg-white text-body">
        <div className="header-container flex min-h-10 items-center justify-between">
          <p className="text-[12px] sm:text-[14px]">Mulheres e jovens. <span className="hidden sm:inline">Talento de </span>Moçambique.</p>
          <div className="flex items-center">
            <span className="hidden h-10 items-center border-l border-border px-4 text-[12px] uppercase md:flex">MZN · Metical</span>
            <span className="flex h-10 items-center border-x border-border px-3 text-[12px] uppercase sm:px-4"><span className="sm:hidden">PT</span><span className="hidden sm:inline">Português</span></span>
            <div className="hidden sm:block"><Dropdown label="Informações" top><Link to="/sobre" className={dropdownLink} onClick={closeNavigation}>Sobre a Fundação</Link><Link to="/contacto" className={dropdownLink} onClick={closeNavigation}>Contacto</Link></Dropdown></div>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="header-container flex flex-wrap items-center justify-between gap-y-5 py-5 lg:h-[105px] lg:flex-nowrap lg:py-[30px]">
          <Link to="/" search={{}} onClick={closeNavigation} aria-label="Fundação Universitária — início" className="shrink-0 text-primary">
            <span className="block text-[23px] leading-[1.05] font-extrabold tracking-[-.7px] sm:text-[27px]">Fundação<span className="text-accent">.</span></span>
            <span className="mt-1 block text-[13px] leading-none font-bold tracking-[2.25px] sm:text-[14px] sm:tracking-[2.7px]">UNIVERSITÁRIA</span>
          </Link>
          <button type="button" className="flex size-11 items-center justify-center border border-border text-primary lg:hidden" aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={mobileOpen} aria-controls="primary-navigation" onClick={() => setMobileOpen(!mobileOpen)}><Icon name={mobileOpen ? 'close' : 'menu'}/></button>
          <form role="search" className="flex h-[45px] w-full rounded-[3px] border border-border lg:w-[680px]" onSubmit={event => { event.preventDefault(); closeNavigation(); void navigate({ to: '/projectos', search: { q: q.trim(), categoria: category } }) }}>
            <label className="relative my-[10px] flex w-[112px] shrink-0 items-center border-r border-border sm:w-[157px]">
              <span className="sr-only">Categoria</span>
              <select className="w-full appearance-none truncate bg-transparent py-1 pr-6 pl-3 text-[12px] text-body outline-offset-2 sm:pl-5" value={category} onChange={e => setCategory(e.target.value)}><option value="">Todas</option>{categories.map(c => <option key={c}>{c}</option>)}</select><Icon name="chevron" className="pointer-events-none absolute right-3 size-3 text-body"/>
            </label>
            <label className="min-w-0 flex-1"><span className="sr-only">Pesquisar projectos, produtos ou serviços</span><input type="search" value={q} onChange={e => setQ(e.target.value)} maxLength={100} placeholder="O que procura?" className="h-full w-full bg-transparent px-4 text-[13px] text-heading outline-offset-2 placeholder:text-body sm:px-6"/></label>
            <button type="submit" aria-label="Pesquisar" className="-my-px -mr-px flex w-[45px] shrink-0 items-center justify-center rounded-r-[3px] bg-primary text-white transition-colors hover:bg-primary/90"><Icon name="search" className="size-6"/></button>
          </form>
        </div>
      </div>

      <div className="bg-primary text-white">
        <div className="header-container flex items-stretch justify-between">
          <nav id="primary-navigation" aria-label="Navegação principal" data-open={mobileOpen} className="navigation-panel flex w-full flex-col lg:w-auto lg:flex-row">
            <Link to="/" search={{}} onClick={closeNavigation} className="flex min-h-[60px] items-center px-4 text-sm font-bold uppercase hover:bg-black/10 lg:pl-0 lg:pr-6">Início</Link>
            <Dropdown label="Projectos"><Link className={dropdownLink} to="/projectos" onClick={closeNavigation}>Todos os projectos</Link><Link className={dropdownLink} to="/projectos" search={{ publico: 'mulheres' }} onClick={closeNavigation}>Projectos de mulheres</Link><Link className={dropdownLink} to="/projectos" search={{ publico: 'jovens' }} onClick={closeNavigation}>Projectos de jovens</Link></Dropdown>
            <Dropdown label="Províncias"><Link to="/provincias" className={`${dropdownLink} font-bold`} onClick={closeNavigation}>Todas as províncias</Link>{provinces.map(p => <Link key={p} className={dropdownLink} to="/provincias/$slug" params={{ slug: provinceSlug(p) }} onClick={closeNavigation}>{p}</Link>)}</Dropdown>
            <Link to="/produtos" onClick={closeNavigation} className="flex min-h-[60px] items-center px-4 text-sm font-bold uppercase hover:bg-black/10">Produtos</Link>
            <Link to="/servicos" onClick={closeNavigation} className="flex min-h-[60px] items-center px-4 text-sm font-bold uppercase hover:bg-black/10">Serviços</Link>
            <Link to="/sobre" className="flex min-h-[60px] items-center px-4 text-sm font-bold uppercase hover:bg-black/10" onClick={closeNavigation}>Sobre nós</Link>
            <Link to="/contacto" className="flex min-h-[60px] items-center px-4 text-sm font-bold uppercase hover:bg-black/10" onClick={closeNavigation}>Contacto</Link>
          </nav>
          <div className="hidden lg:flex"><Link to="/provincias" aria-label="Explorar províncias" className="flex w-[62px] items-center justify-center border-x border-white/15 hover:bg-black/10"><Icon name="map" className="size-6"/></Link><Link to="/contacto" aria-label="Contactar a Fundação" className="flex w-[68px] items-center justify-center border-r border-white/15 hover:bg-black/10"><Icon name="message" className="size-6"/></Link></div>
        </div>
      </div>
    </header>
  </>
}
