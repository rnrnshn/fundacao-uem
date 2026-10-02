import { test, expect } from '@playwright/test'

// For the configured-domain build, set SEO_TEST_ORIGIN to the same value as
// VITE_SITE_URL and SEO_TEST_INDEXABLE=true. The default preview has neither.
const origin = process.env.SEO_TEST_ORIGIN
const enabled = !!origin && process.env.SEO_TEST_INDEXABLE === 'true'

test('SSR metadata is unique and page-specific before JavaScript', async ({ browser, request }) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  const descriptions = new Set<string>()
  for (const path of ['/', '/projectos', '/produtos', '/servicos', '/provincias', '/provincias/nampula', '/projectos/horta-comunitaria', '/produtos/tomate-fresco', '/servicos/comunicacao-digital', '/sobre', '/contacto', '/privacidade']) {
    await page.goto(`http://127.0.0.1:4320${path}`)
    await expect(page.locator('head title')).toHaveCount(1)
    await expect(page.locator('head meta[name="description"]')).toHaveCount(1)
    await expect(page.locator('head meta[name="robots"]')).toHaveCount(1)
    await expect(page.locator('head meta[property="og:title"]')).toHaveAttribute('content', await page.title())
    await expect(page.locator('head meta[property="og:locale"]')).toHaveAttribute('content', 'pt_MZ')
    const description = await page.locator('meta[name="description"]').getAttribute('content')
    expect(description!.length).toBeGreaterThan(60)
    expect(descriptions.has(description!)).toBe(false)
    descriptions.add(description!)
    if (origin) {
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(1)
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${origin}${path}`)
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', `${origin}/og-image.png`)
      const schemas = await page.locator('script[type="application/ld+json"]').allTextContents()
      expect(schemas.length).toBeGreaterThan(0)
      for (const text of schemas) expect(() => JSON.parse(text)).not.toThrow()
      expect(schemas.join('')).not.toMatch(/"@type":"(Product|Offer|Review|AggregateRating|Organization)"/)
    } else {
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(0)
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow')
    }
  }
  const image = await request.get('/og-image.png')
  expect(image.status()).toBe(200)
  expect(image.headers()['content-type']).toContain('image/png')
  await context.close()
})

test('demo, filters, pagination and contact query URLs have consistent indexing', async ({ page }) => {
  await page.goto('/sobre')
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', enabled ? 'index, follow, max-image-preview:large' : 'noindex, follow')
  for (const [path, canonical] of [
    ['/projectos?q=tomate&vista=lista', '/projectos'],
    ['/projectos?pagina=2&ordem=nome-desc', '/projectos?pagina=2'],
    ['/projectos?pagina=9999', '/projectos?pagina=2'],
    ['/produtos/tomate-fresco', '/produtos/tomate-fresco'],
    ['/provincias/niassa', '/provincias/niassa'],
    ['/contacto?projecto=NomePrivado&assunto=AssuntoPrivado', '/contacto'],
  ]) {
    await page.goto(path)
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow')
    if (origin) await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${origin}${canonical}`)
    const meta = await page.locator('meta').evaluateAll(nodes => nodes.map(node => node.getAttribute('content')).join(' '))
    expect(meta).not.toContain('NomePrivado')
    expect(meta).not.toContain('AssuntoPrivado')
  }
  await page.goto('/projectos/inexistente')
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow')
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0)
})

test('client navigation replaces metadata rather than accumulating it', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('navigation', { name: 'Navegação principal' }).getByRole('link', { name: 'Sobre nós' }).click()
  await expect(page).toHaveTitle(/Sobre o directório/)
  await expect(page.locator('head meta[name="description"]')).toHaveCount(1)
  if (origin) await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${origin}/sobre`)
  await page.getByRole('navigation', { name: 'Navegação principal' }).getByRole('link', { name: 'Contacto', exact: true }).click()
  await expect(page).toHaveTitle(/Contacto e informações/)
  await expect(page.locator('head meta[property="og:title"]')).toHaveCount(1)
  if (origin) {
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${origin}/contacto`)
    await expect(page.locator('script#page-schema')).toHaveCount(1)
    expect(await page.locator('script#page-schema').textContent()).toContain('ContactPage')
  }
})

test('robots and sitemap agree with the configured publication state', async ({ request }) => {
  const robots = await request.get('/robots.txt')
  expect(robots.status()).toBe(200)
  expect(robots.headers()['content-type']).toContain('text/plain')
  expect(await robots.text()).not.toContain('Disallow: /\n')
  const response = await request.get('/sitemap.xml')
  expect(response.status()).toBe(200)
  expect(response.headers()['content-type']).toContain('application/xml')
  const xml = await response.text()
  expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
  const urls = Array.from(xml.matchAll(/<loc>(.*?)<\/loc>/g), match => match[1])
  if (enabled) {
    expect(await robots.text()).toContain(`Sitemap: ${origin}/sitemap.xml`)
    expect(urls).toEqual(['/', '/sobre', '/contacto', '/privacidade', '/provincias'].map(path => origin + path))
    for (const url of urls) expect((await request.get(new URL(url).pathname)).status()).toBe(200)
  } else {
    expect(urls).toHaveLength(0)
    expect(await robots.text()).not.toContain('Sitemap:')
  }
  expect(xml).not.toContain('/projectos/')
  expect(xml).not.toContain('lastmod') // No invented modification dates.
})
