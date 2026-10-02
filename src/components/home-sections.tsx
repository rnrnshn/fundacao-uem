import { Link as RouterLink } from '@tanstack/react-router'
import { DiscoveryLink as Link } from './discovery-link'
import { useEffect, useRef, useState } from 'react'

const photo = (id: string, width = 800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`
const images = {
  field: photo('photo-1500382017468-9049fed747ef', 1200),
  vegetables: photo('photo-1542838132-92c53300491e'),
  fruit: photo('photo-1619566636858-adf3ef46400b'),
  craft: photo('photo-1452860606245-08befc0ff44b'),
  team: photo('photo-1522071820081-009f0129c71c', 1200),
  tomatoes: photo('photo-1546094096-0df4bcaaa337', 500),
  avocado: photo('photo-1523049673857-eb18f1d7b578', 500),
  mango: photo('photo-1553279768-865429fa0078', 500),
  honey: photo('photo-1587049352851-8d4e89133924', 500),
  coffee: photo('photo-1447933601403-0c6688de566e', 500),
}

function Arrow({ left = false }: { left?: boolean }) {
  return <svg aria-hidden="true" className={`size-5 ${left ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="m9 5 7 7-7 7"/></svg>
}

const slides = [
  { kicker: 'Da nossa terra.', accent: 'Para todos.', title: <>Talento local.<br/>Novas oportunidades.</>, text: 'Descubra projectos de mulheres e jovens em Moçambique.', image: images.field, cta: 'Explorar projectos', search: { publico: 'todos' } },
  { kicker: 'Sabores locais.', accent: 'Novas ligações.', title: <>O melhor da terra,<br/>mais perto de si.</>, text: 'Explore produtos agrícolas e alimentos das nossas comunidades.', image: images.vegetables, cta: 'Explorar produtos', search: { tipo: 'produtos' } },
  { kicker: 'Ideias com futuro.', accent: 'Talento jovem.', title: <>Uma nova geração.<br/>Mais possibilidades.</>, text: 'Conheça iniciativas e serviços desenvolvidos por jovens.', image: images.team, cta: 'Conhecer projectos', search: { publico: 'jovens' } },
]

const sidebarItems = [
  { label: 'Agricultura e alimentos', search: { categoria: 'Agricultura e alimentos' } },
  { label: 'Artesanato e cultura', search: { categoria: 'Artesanato' } },
  { label: 'Comércio local', search: { categoria: 'Comércio' } },
  { label: 'Serviços', search: { tipo: 'servicos' } },
  { label: 'Todos os produtos', search: { tipo: 'produtos' } },
  { label: 'Projectos de mulheres', search: { publico: 'mulheres' } },
  { label: 'Projectos de jovens', search: { publico: 'jovens' } },
  { label: 'Mulheres e jovens', search: { publico: 'todos' } },
  { label: 'Explorar Moçambique', search: { publico: 'todos' } },
]

export function DiscoveryHero() {
  const [current, setCurrent] = useState(0)
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const slide = slides[current]
  return <section aria-label="Descubra projectos em Moçambique" className="showcase-container mt-[30px] grid gap-[30px] lg:grid-cols-[5fr_13fr_5fr]">
    <aside>
      <button aria-expanded={categoriesOpen} aria-controls="discovery-categories" onClick={() => setCategoriesOpen(!categoriesOpen)} className="flex h-[54px] w-full items-center gap-3 bg-primary px-5 text-left text-sm font-bold text-white uppercase lg:hidden"><span aria-hidden="true">☷</span> Explorar por categoria <span className="ml-auto">{categoriesOpen ? '−' : '+'}</span></button>
      <h2 className="hidden h-[54px] items-center gap-3 bg-primary px-5 text-sm font-bold text-white uppercase lg:flex"><span aria-hidden="true" className="text-xl">☷</span> Explorar por categoria</h2>
      <nav id="discovery-categories" aria-label="Categorias de projectos" className={`${categoriesOpen ? 'block' : 'hidden'} border border-t-0 border-border px-5 lg:block`}>
        {sidebarItems.map((item, i) => <Link key={item.label} to="/" search={item.search} className="flex h-[46.5px] items-center justify-between gap-2 text-[13px] text-body transition-colors hover:text-primary">{item.label}{i < 4 && <Arrow/>}</Link>)}
        <Link to="/" search={{ publico: 'todos' }} className="flex h-[46px] items-center justify-between border-t border-border text-[13px] text-body hover:text-primary">Todos os projectos <span aria-hidden="true">+</span></Link>
      </nav>
    </aside>

    <div className="group relative -mt-[30px] min-h-[420px] overflow-hidden bg-surface-muted lg:mt-0 lg:h-[520px]" aria-roledescription="carrossel" aria-label="Destaques">
      {slides.map((item, index) => <img key={item.image} src={item.image} alt="" className="hero-slide-image absolute inset-0 size-full object-cover" data-active={current === index} fetchPriority={index === 0 ? 'high' : 'low'} loading={index === 0 ? 'eager' : 'lazy'}/>)}
      <div className="absolute inset-0 bg-gradient-to-r from-[#f0f3e8]/95 via-[#f0f3e8]/85 to-[#f0f3e8]/10"/>
      <div className="relative flex h-full min-h-[420px] flex-col justify-center px-6 py-16 sm:px-12 lg:px-[7%]" aria-live="polite" aria-atomic="true">
        <div key={current} className="hero-slide-copy"><p className="mb-6 text-sm text-heading"><span className="text-primary">{slide.kicker}</span> {slide.accent}</p>
        <h1 className="text-[30px] leading-[1.2] font-bold tracking-[-.8px] text-heading xl:text-[38px]">{slide.title}</h1>
        <p className="mt-5 max-w-[320px] text-base leading-7 text-heading">{slide.text}</p>
        <Link to="/" search={slide.search} className="mt-8 inline-block w-fit bg-primary px-7 py-3.5 text-[12px] font-bold text-white uppercase transition-colors hover:bg-primary/90">{slide.cta}</Link></div>
      </div>
      <button aria-label="Destaque anterior" className="absolute top-1/2 left-1 flex size-8 -translate-y-1/2 items-center justify-center bg-white/75 text-primary opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100" onClick={() => setCurrent((current + slides.length - 1) % slides.length)}><Arrow left/></button>
      <button aria-label="Próximo destaque" className="absolute top-1/2 right-1 flex size-8 -translate-y-1/2 items-center justify-center bg-white/75 text-primary opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100" onClick={() => setCurrent((current + 1) % slides.length)}><Arrow/></button>
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">{slides.map((_, i) => <button key={i} aria-label={`Ver destaque ${i+1}`} aria-pressed={current === i} onClick={() => setCurrent(i)} className="flex size-6 items-center justify-center"><span className={`block size-3.5 rounded-full border-2 border-white ${current === i ? 'bg-white' : 'bg-primary/25'}`}/></button>)}</div>
      <span className="absolute right-2 bottom-1 text-[9px] text-white [text-shadow:0_1px_3px_#000]">Imagem ilustrativa · Unsplash</span>
    </div>

    <Link to="/" search={{ tipo: 'produtos' }} className="group relative flex min-h-[360px] flex-col overflow-hidden border border-border bg-[#f5f5f0] text-center lg:h-[473px]">
      <div className="relative z-10 px-4 pt-9"><p className="text-[13px] font-bold tracking-[2px] text-primary">DA TERRA À SUA MESA</p><h2 className="mt-2 text-[25px] leading-tight font-bold text-heading">Descubra os<br/>sabores locais.</h2><span className="mt-5 inline-block border-b border-primary pb-1 text-[10px] font-bold tracking-wider text-primary uppercase">Explorar produtos</span></div>
      <img src={images.fruit} alt="Selecção de frutas — imagem ilustrativa" className="mt-6 h-[220px] w-full object-cover transition-transform duration-500 group-hover:scale-105 lg:mt-auto lg:h-[260px]"/>
      <span className="absolute right-2 bottom-1 text-[9px] text-white [text-shadow:0_1px_3px_#000]">Imagem ilustrativa</span>
    </Link>
  </section>
}

export function PromotionalBanners() {
  const banners = [
    { title: 'Sabores da nossa terra', kicker: 'Agricultura e alimentos', cta: 'Explorar produtos', image: images.vegetables, search: { categoria: 'Agricultura e alimentos' } },
    { title: 'Feito com identidade', kicker: 'Artesanato e cultura', cta: 'Descobrir artesanato', image: images.craft, search: { categoria: 'Artesanato' } },
    { title: 'Talento que transforma', kicker: 'Serviços e oportunidades', cta: 'Conhecer serviços', image: images.team, search: { tipo: 'servicos' } },
  ]
  return <section aria-label="Explore produtos e serviços" className="showcase-container mt-[30px] grid gap-[30px] md:grid-cols-3">{banners.map(banner => <Link key={banner.title} to="/" search={banner.search} className="group relative flex min-h-[150px] items-center overflow-hidden bg-surface-muted px-7 py-7 xl:px-10">
    <img src={banner.image} alt="" loading="lazy" className="absolute inset-y-0 right-0 h-full w-3/5 object-cover transition-transform duration-500 group-hover:scale-105"/><div className="absolute inset-0 bg-gradient-to-r from-surface-muted via-surface-muted/95 to-surface-muted/10"/>
    <div className="relative max-w-[70%]"><p className="text-[10px] font-bold tracking-[.6px] text-heading">{banner.kicker}</p><h2 className="mt-1 text-[18px] leading-6 font-bold text-heading">{banner.title}</h2><span className="mt-5 block text-[9px] font-bold tracking-wider text-primary uppercase">{banner.cta} <span aria-hidden="true">→</span></span></div>
    <span className="absolute right-1 bottom-1 text-[8px] text-heading/70">Imagem ilustrativa</span>
  </Link>)}</section>
}

const products = [
  { name: 'Tomate fresco', image: images.tomatoes, category: 'Hortícolas' },
  { name: 'Abacate', image: images.avocado, category: 'Frutas' },
  { name: 'Manga', image: images.mango, category: 'Frutas' },
  { name: 'Mel', image: images.honey, category: 'Alimentos' },
  { name: 'Café em grão', image: images.coffee, category: 'Alimentos' },
  { name: 'Fruta da época', image: images.fruit, category: 'Frutas' },
  { name: 'Hortícolas variadas', image: images.vegetables, category: 'Hortícolas' },
]

export function ProductShowcase({ collection = false, sectionId, title, tabsOnly = false, offset = 0 }: { collection?: boolean; sectionId?: string; title?: string; tabsOnly?: boolean; offset?: number }) {
  const id = sectionId ?? (collection ? 'collection' : 'products')
  const filters = ['Todos', 'Hortícolas', 'Frutas', 'Alimentos']
  const [filter, setFilter] = useState('Todos')
  const visibleProducts = [...products.slice(offset), ...products.slice(0, offset)].filter(product => filter === 'Todos' || product.category === filter)
  const track = useRef<HTMLDivElement>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const [selected, setSelected] = useState<typeof products[number]>(products[0])
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  useEffect(() => {
    const element = track.current
    if (!element) return
    element.scrollLeft = 0
    const update = () => { setAtStart(element.scrollLeft < 2); setAtEnd(element.scrollLeft + element.clientWidth >= element.scrollWidth - 2) }
    const observer = new ResizeObserver(update)
    observer.observe(element)
    update()
    return () => observer.disconnect()
  }, [filter])
  function move(direction: number) {
    const element = track.current
    if (element) element.scrollBy({ left: direction * (element.firstElementChild!.getBoundingClientRect().width + 30), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  }
  return <section aria-labelledby={`${id}-title`} className={`header-container pb-20 ${tabsOnly ? '' : 'pt-[75px]'}`}>
    <div className="flex min-h-[50px] flex-wrap items-start justify-between gap-x-2 gap-y-3 border-b border-border"><h2 id={`${id}-title`} className={tabsOnly ? 'sr-only' : 'relative min-h-[50px] pb-4 text-[17px] leading-7 font-bold text-heading uppercase after:absolute after:bottom-[-1px] after:left-0 after:h-px after:w-40 after:bg-primary sm:text-[24px]'}>{title ?? (collection ? 'Explore os nossos produtos' : 'Produtos em destaque')}</h2>
      {collection && <div role="tablist" aria-label="Categorias de produtos" className={`flex gap-2 pb-3 sm:gap-4 lg:pt-1 ${tabsOnly ? '' : 'order-last w-full lg:order-none lg:w-auto'}`}>{filters.map((label, i) => <button key={label} role="tab" id={`${id}-tab-${i}`} aria-selected={filter === label} aria-controls={`${id}-panel`} tabIndex={filter === label ? 0 : -1} className={`min-h-8 px-1 text-[11px] font-bold uppercase transition-colors hover:text-primary sm:text-[13px] ${filter === label ? 'text-primary underline decoration-accent decoration-2 underline-offset-8' : 'text-body'}`} onClick={() => setFilter(label)} onKeyDown={event => { let next = i; if (event.key === 'ArrowRight') next = (i + 1) % filters.length; else if (event.key === 'ArrowLeft') next = (i + filters.length - 1) % filters.length; else if (event.key === 'Home') next = 0; else if (event.key === 'End') next = filters.length - 1; else return; event.preventDefault(); setFilter(filters[next]); document.getElementById(`${id}-tab-${next}`)?.focus() }}>{label}</button>)}</div>}
      <div className="flex shrink-0 gap-1 sm:gap-2"><button aria-label="Produtos anteriores" disabled={atStart} className="flex size-8 items-center justify-center text-heading hover:text-primary disabled:cursor-default disabled:opacity-30" onClick={() => move(-1)}><Arrow left/></button><button aria-label="Próximos produtos" disabled={atEnd} className="flex size-8 items-center justify-center text-heading hover:text-primary disabled:cursor-default disabled:opacity-30" onClick={() => move(1)}><Arrow/></button></div></div>
    <p className="mt-3 text-[11px] text-body">Pré-visualização do catálogo · Produtos e fotografias ilustrativos, sujeitos a aprovação.</p>
    <div id={collection ? `${id}-panel` : undefined} role={collection ? 'tabpanel' : undefined} aria-labelledby={collection ? `${id}-tab-${filters.indexOf(filter)}` : undefined} tabIndex={collection ? 0 : undefined} ref={track} onScroll={() => { const el = track.current!; setAtStart(el.scrollLeft < 2); setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2) }} className="product-track mt-5 flex snap-x snap-mandatory gap-[30px] overflow-x-auto pb-2" aria-label={collection ? undefined : 'Produtos ilustrativos'}>
      {visibleProducts.map(product => <article key={product.name} className={`group relative w-[calc((100%-30px)/2)] shrink-0 snap-start border border-border bg-white sm:w-[calc((100%-60px)/3)] ${collection ? 'lg:w-[calc((100%-90px)/4)]' : 'lg:w-[calc((100%-120px)/5)]'}`}>
        <button aria-label={`Ver detalhes: ${product.name}`} className="block w-full text-left" onClick={() => { setSelected(product); dialog.current?.showModal() }}>
          <div className={`relative h-[170px] overflow-hidden bg-surface-muted ${collection ? 'xl:h-[220px]' : 'xl:h-[180px]'}`}><img src={product.image} alt={`${product.name} — fotografia ilustrativa`} loading="lazy" className="size-full object-cover transition-transform duration-500 group-hover:scale-105"/><span className="absolute top-4 left-4 bg-primary px-2 py-1 text-[9px] text-white uppercase">Exemplo</span><span className="absolute right-3 bottom-3 flex size-8 items-center justify-center bg-white text-primary opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5"><path d="M2 12s4-7 10-7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg></span></div>
          <div className="px-4 pt-5 pb-5"><p className="text-[10px] text-body">{product.category}</p><h3 className="mt-1 min-h-9 text-[14px] leading-[18px] font-bold text-heading">{product.name}</h3><p className="mt-1 text-[13px] text-primary">Preço sob consulta</p><span className="mt-3 inline-block text-[10px] text-body">Ver detalhes <span aria-hidden="true">→</span></span></div>
        </button>
      </article>)}
    </div>
    <dialog ref={dialog} aria-labelledby={`${id}-dialog-title`} className="fixed inset-0 m-auto max-h-[90svh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto border border-border bg-white p-6 shadow-xl backdrop:bg-black/40">
      <div className="flex items-center justify-between gap-4"><p className="text-xs text-primary uppercase">Pré-visualização de produto</p><button aria-label="Fechar detalhes" className="flex size-10 items-center justify-center text-2xl text-body" onClick={() => dialog.current?.close()}>×</button></div>
      <img src={selected.image} alt={`${selected.name} — imagem ilustrativa`} className="mt-3 h-52 w-full object-cover"/>
      <h2 id={`${id}-dialog-title`} className="mt-5 text-2xl font-bold">{selected.name}</h2><p className="mt-2 text-primary">Preço sob consulta</p><p className="mt-4 text-sm leading-6 text-body">Este é um exemplo visual do catálogo, não uma oferta disponível. O projecto, a província, a unidade e os contactos serão apresentados quando existirem informações aprovadas.</p>
      <p className="mt-3 text-xs text-body">Fotografia ilustrativa: Unsplash.</p><RouterLink to="/produtos/$slug" params={{ slug: selected.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replaceAll(' ', '-') }} className="mt-5 inline-block bg-primary px-5 py-3 text-sm text-white">Ver ficha do produto</RouterLink><button className="mt-5 ml-4 text-sm text-primary underline" onClick={() => dialog.current?.close()}>Voltar aos produtos</button>
    </dialog>
  </section>
}
