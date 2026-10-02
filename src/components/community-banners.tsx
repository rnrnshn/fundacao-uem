import { DiscoveryLink as Link } from './discovery-link'

const image = (id: string, width: number) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`

export function FeatureBanner() {
  return (
    <section aria-labelledby="feature-banner-title" className="header-container">
      <div className="relative isolate flex min-h-[345px] items-center overflow-hidden bg-surface-muted">
        <img
          src={image('photo-1542838132-92c53300491e', 1400)}
          alt=""
          loading="lazy"
          className="absolute inset-0 -z-20 size-full object-cover object-right"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#f5f5f0] via-[#f5f5f0]/90 to-[#f5f5f0]/5"/>
        <div className="max-w-[650px] px-6 py-12 sm:px-12 lg:px-[75px]">
          <p className="mb-3 text-sm text-heading"><span className="font-bold text-primary">Valor local.</span> Ligações com futuro.</p>
          <h2 id="feature-banner-title" className="text-[28px] leading-[1.2] tracking-[-.6px] text-heading sm:text-[36px]">Da nossa terra.<br/>Para a sua comunidade.</h2>
          <p className="mt-5 max-w-sm text-sm leading-6 text-heading">Descubra produtos agrícolas e alimentos.<br className="hidden sm:block"/> Conheça quem está por detrás de cada iniciativa.</p>
          <Link to="/" search={{ tipo: 'produtos' }} className="mt-7 inline-flex min-h-11 items-center bg-primary px-8 py-3 text-xs font-bold text-white uppercase transition-colors hover:bg-primary/90">Descobrir produtos</Link>
        </div>
        <span className="absolute right-2 bottom-1 text-[9px] text-white [text-shadow:0_1px_3px_#000]">Imagem ilustrativa · Unsplash</span>
      </div>
    </section>
  )
}

export function CommunityBanners() {
  return (
    <section aria-label="Conheça quem faz acontecer" className="header-container grid gap-[30px] pb-20 md:grid-cols-2">
      <Link to="/" search={{ publico: 'mulheres' }} className="group relative isolate flex min-h-[190px] items-center justify-end overflow-hidden bg-[#f1f3ed]">
        <img src={image('photo-1452860606245-08befc0ff44b', 800)} alt="" loading="lazy" className="absolute inset-y-0 left-0 -z-20 h-full w-3/5 object-cover transition-transform duration-500 group-hover:scale-105"/>
        <div className="absolute inset-0 -z-10 bg-gradient-to-l from-[#f1f3ed] via-[#f1f3ed]/90 to-transparent"/>
        <div className="w-[62%] py-7 pr-6 pl-3 sm:pr-10">
          <p className="text-xs tracking-wide text-primary">Ideias que criam valor</p>
          <h2 className="mt-2 text-[23px] leading-7 font-bold text-heading">Mulheres que<br/>fazem acontecer.</h2>
          <span className="mt-4 inline-block border-b border-accent pb-1 text-[10px] font-bold text-primary uppercase">Conhecer projectos <span aria-hidden="true">→</span></span>
        </div>
        <span className="absolute bottom-1 left-2 text-[8px] text-heading">Imagem ilustrativa · Unsplash</span>
      </Link>
      <Link to="/" search={{ publico: 'jovens' }} className="group relative isolate flex min-h-[190px] items-center overflow-hidden bg-[#f5f4ee]">
        <img src={image('photo-1522071820081-009f0129c71c', 800)} alt="" loading="lazy" className="absolute inset-y-0 right-0 -z-20 h-full w-3/5 object-cover transition-transform duration-500 group-hover:scale-105"/>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#f5f4ee] via-[#f5f4ee]/90 to-transparent"/>
        <div className="relative w-[65%] py-7 pr-3 pl-6 sm:pl-10">
          <p className="text-xs tracking-wide text-primary">Uma geração de possibilidades</p>
          <h2 className="mt-2 text-[23px] leading-7 font-bold text-heading">Talento jovem.<br/>Um novo futuro.</h2>
          <span className="mt-4 inline-block border-b border-accent pb-1 text-[10px] font-bold text-primary uppercase">Explorar iniciativas <span aria-hidden="true">→</span></span>
        </div>
        <span className="absolute right-2 bottom-1 text-[8px] text-heading">Imagem ilustrativa · Unsplash</span>
      </Link>
    </section>
  )
}
