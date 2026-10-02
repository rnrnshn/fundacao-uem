import assert from 'node:assert/strict'
import { readFile, access } from 'node:fs/promises'

const output = new URL('../.vercel/output/', import.meta.url)
const config = JSON.parse(await readFile(new URL('config.json', output), 'utf8'))
assert.equal(config.version, 3)
assert.ok(config.routes.some(route => route.handle === 'filesystem'))
assert.ok(config.routes.some(route => route.dest === '/__server'))
const functionRoot = new URL('functions/__server.func/', output)
const settings = JSON.parse(await readFile(new URL('.vc-config.json', functionRoot), 'utf8'))
assert.equal(settings.runtime, 'nodejs24.x')
assert.equal(settings.supportsResponseStreaming, true)
const { default: handler } = await import(new URL(settings.handler, functionRoot).href)
const request = path => handler.fetch(new Request(`https://deployment-check.example${path}`))

for (const path of ['/', '/projectos', '/projectos/horta-comunitaria', '/contacto']) {
  const response = await request(path)
  assert.equal(response.status, 200, path)
  assert.ok(response.body && typeof response.body.getReader === 'function', `${path}: streaming body`)
  const html = await response.text()
  assert.ok(html.includes('<html lang="pt-MZ"'), `${path}: document SSR`)
  assert.ok(html.includes('<h1'), `${path}: rendered content`)
  if (process.env.EXPECT_NOINDEX === 'true') assert.match(html, /name="robots" content="noindex, follow"/)
  for (const [, asset] of html.matchAll(/(?:src|href)="(\/assets\/[^"?]+)"/g)) {
    await access(new URL(`static${asset}`, output))
  }
}
assert.equal((await request('/projectos/missing-record')).status, 404)
assert.match(await (await request('/robots.txt')).text(), /User-agent: \*/)
assert.match(await (await request('/sitemap.xml')).text(), /<urlset/)
for (const name of ['favicon.svg', 'og-image.png']) await access(new URL(`static/${name}`, output))
console.log('PASS: Vercel Build Output v3, Node 24, streaming handler, SSR, static assets, robots, sitemap and 404s')
