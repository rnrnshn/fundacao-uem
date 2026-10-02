import { Link, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { provinces, provinceSlug } from '../lib/catalog'

function Symbol({ kind }: { kind: 'map' | 'search' | 'people' | 'contact' }) {
  const paths = {
    map: <><path d="m3 5 6-2 6 2 6-2v16l-6 2-6-2-6 2ZM9 3v16M15 5v16"/></>,
    search: <><circle cx="10" cy="10" r="7"/><path d="m15 15 7 7"/></>,
    people: <><circle cx="9" cy="7" r="3"/><path d="M2 21v-3a7 7 0 0 1 14 0v3M16 4a3 3 0 0 1 0 6M18 14a5 5 0 0 1 4 5v2"/></>,
    contact: <><path d="M21 11a9 9 0 0 1-9 9H3l-1 2V11a9.5 9.5 0 0 1 19 0Z"/><path d="M7 9h9M7 13h6"/></>,
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-14">{paths[kind]}</svg>
}

export function ProvinceBanners() {
  const items = [
    { title: 'Descubra Nampula', subtitle: 'Um olhar para o norte', province: 'Nampula', photo: 'photo-1500382017468-9049fed747ef' },
    { title: 'Explore a Zambézia', subtitle: 'Talento e possibilidades', province: 'Zambézia', photo: 'photo-1542838132-92c53300491e' },
    { title: 'Conheça Maputo', subtitle: 'Ideias que nos aproximam', province: 'Cidade de Maputo', photo: 'photo-1522071820081-009f0129c71c' },
  ]
  return <section aria-label="Explore por província" className="header-container grid gap-[30px] md:grid-cols-3">{items.map((item, i) => <Link key={item.province} to="/provincias/$slug" params={{ slug: provinceSlug(item.province) }} className="group relative isolate flex min-h-[124px] items-center overflow-hidden bg-surface-muted px-6 py-7">
    <img loading="lazy" src={`https://images.unsplash.com/${item.photo}?auto=format&fit=crop&w=650&q=85`} alt="" className={`absolute inset-y-0 -z-20 h-full w-3/5 object-cover transition-transform duration-500 group-hover:scale-105 ${i === 1 ? 'right-0' : 'left-0'}`}/>
    <div className={`absolute inset-0 -z-10 ${i === 1 ? 'bg-gradient-to-r' : 'bg-gradient-to-l'} from-surface-muted via-surface-muted/95 to-surface-muted/10`}/>
    <div className={i === 1 ? 'mr-auto' : 'ml-auto text-right'}><p className="text-[10px] text-body">{item.subtitle}</p><h2 className="mt-1 text-[17px] font-bold text-heading">{item.title}</h2><span className="mt-3 inline-block text-[9px] font-bold text-primary uppercase">Explorar projectos →</span></div>
    <span className="absolute right-1 bottom-1 text-[8px] text-heading">Imagem ilustrativa</span>
  </Link>)}</section>
}

export function HowItWorks() {
  const steps = [
    { icon: 'map' as const, title: 'De norte a sul', text: 'Explore as 11 entradas geográficas de Moçambique.' },
    { icon: 'search' as const, title: 'Descubra o que procura', text: 'Encontre produtos, serviços e iniciativas locais.' },
    { icon: 'people' as const, title: 'Conheça os projectos', text: 'Descubra o talento das mulheres e dos jovens.' },
    { icon: 'contact' as const, title: 'Crie uma ligação', text: 'Contacte o projecto pelos canais publicados.' },
  ]
  return <section aria-label="Como funciona" className="bg-surface-muted"><div className="header-container grid gap-10 border-b border-border py-16 sm:grid-cols-2 lg:grid-cols-4 lg:py-20">{steps.map(step => <div key={step.title} className="flex flex-col items-center text-center"><span className="text-primary"><Symbol kind={step.icon}/></span><h2 className="mt-4 text-[14px] font-bold text-heading">{step.title}</h2><p className="mt-2 max-w-[230px] text-[13px] leading-6 text-body">{step.text}</p></div>)}</div></section>
}

export function Footer() {
  const navigate = useNavigate()
  const [province, setProvince] = useState('')
  const [showTop, setShowTop] = useState(false)
  useEffect(() => {
    const update = () => setShowTop(window.scrollY > 600)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  const footerLink = 'block text-left text-[13px] leading-7 text-body transition-colors hover:text-primary'
  return <>
    <footer className="bg-surface-muted">
      <div className="header-container grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1.5fr_1.4fr] lg:py-20">
        <div><Link to="/" search={{}} aria-label="Fundação Universitária — início" className="inline-block text-primary"><span className="block text-[27px] leading-none font-extrabold tracking-[-.7px]">Fundação<span className="text-accent">.</span></span><span className="mt-2 block text-[14px] leading-none font-bold tracking-[2.7px]">UNIVERSITÁRIA</span></Link><p className="mt-6 max-w-[290px] text-[13px] leading-6 text-body">Uma montra do talento local. Descubra produtos, serviços e projectos de mulheres e jovens em Moçambique.</p><Link to="/sobre" className="mt-5 inline-block border-b border-primary pb-1 text-xs text-primary">Conheça a Fundação →</Link></div>
        <nav aria-label="Explorar no rodapé"><h2 className="mb-5 text-sm font-bold uppercase">Explorar</h2><Link to="/projectos" className={footerLink}>Todos os projectos</Link><Link to="/produtos" className={footerLink}>Produtos locais</Link><Link to="/servicos" className={footerLink}>Serviços</Link><Link to="/projectos" search={{ publico: 'mulheres' }} className={footerLink}>Mulheres</Link><Link to="/projectos" search={{ publico: 'jovens' }} className={footerLink}>Jovens</Link></nav>
        <div><h2 className="mb-5 text-sm font-bold uppercase">Fale connosco</h2><p className="text-[13px] leading-6 text-body">Informações sobre a Fundação, os projectos e o directório.</p><Link to="/contacto" className={`${footerLink} mt-3`}>Contactos oficiais →</Link><Link to="/contacto" search={{ assunto: 'Correcções e actualizações' }} className={footerLink}>Correcções e actualizações</Link><Link to="/privacidade" className={footerLink}>Privacidade</Link><p className="mt-3 text-[11px] text-body">Contactos a confirmar pela Fundação.</p></div>
        <div><h2 className="mb-5 text-sm font-bold uppercase">Mais perto de si</h2><p className="mb-4 text-[13px] leading-6 text-body">De Maputo a Cabo Delgado.<br/>Comece pela sua província.</p><form onSubmit={event => { event.preventDefault(); void navigate({ to: '/provincias/$slug', params: { slug: provinceSlug(province) } }) }} className="flex min-h-12 border border-border bg-white"><label className="min-w-0 flex-1"><span className="sr-only">Província no rodapé</span><select required value={province} onChange={event => setProvince(event.target.value)} className="h-full w-full bg-transparent px-3 text-xs text-body"><option value="" disabled>Escolha a província</option>{provinces.map(p => <option key={p}>{p}</option>)}</select></label><button type="submit" aria-label="Explorar a província seleccionada" className="w-11 shrink-0 bg-primary text-lg text-white hover:bg-primary/90">→</button></form></div>
      </div>
      <div className="header-container"><div className="border-t border-border py-8 text-center"><nav aria-label="Províncias no rodapé" className="mx-auto flex max-w-5xl flex-wrap justify-center gap-x-2 gap-y-1 text-[12px] leading-6 text-body">{provinces.map((p, i) => <span key={p}><Link to="/provincias/$slug" params={{ slug: provinceSlug(p) }} className="hover:text-primary">{p}</Link>{i < provinces.length - 1 && <span className="ml-2 text-border" aria-hidden="true">/</span>}</span>)}</nav><p className="mt-6 text-xs text-body">Moçambique <span className="mx-3 text-primary" aria-hidden="true">•</span> Produtos e serviços locais <span className="mx-3 text-primary" aria-hidden="true">•</span> Conexões com propósito</p><p className="mt-6 text-xs text-body">© {new Date().getFullYear()} <span className="text-primary">Fundação Universitária.</span></p><p className="mt-3 text-[10px] text-body">Versão de demonstração · Conteúdos e fotografias ilustrativos, sujeitos a aprovação.</p></div></div>
    </footer>
    {showTop && <button type="button" aria-label="Voltar ao topo" className="fixed right-5 bottom-5 z-20 flex size-12 items-center justify-center rounded-full bg-primary text-white shadow-md transition-colors hover:bg-primary/90" onClick={() => { window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); const target = document.getElementById('main'); target?.focus({ preventScroll: true }) }}><svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 15 6-6 6 6"/></svg></button>}
  </>
}
