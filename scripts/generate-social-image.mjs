import { chromium } from '@playwright/test'

// Reproducible, local social card. No stock photography or unapproved official logo.
const browser = await chromium.launch()
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
  await page.setContent(`<!doctype html><html lang="pt-MZ"><meta charset="utf-8"><style>
    *{box-sizing:border-box}body{margin:0;background:#f5f5f4;font-family:Arial,sans-serif;color:#303035}
    .card{width:1200px;height:630px;position:relative;overflow:hidden;padding:60px 70px}
    .brand{font-weight:700;color:#348f7a;font-size:30px;line-height:1.1}.brand small{display:block;font-size:13px;letter-spacing:4px;margin-top:7px}
    .dot{color:#efc94c}.label{font-size:14px;letter-spacing:3px;color:#348f7a;margin-top:74px}
    h1{font-size:64px;line-height:1.05;letter-spacing:-2px;margin:22px 0;width:760px;font-weight:700}
    p{font-size:22px;line-height:1.6;color:#78787b;width:730px;margin:20px 0}
    .foot{position:absolute;bottom:0;left:0;right:0;background:#348f7a;color:white;padding:22px 70px;font-size:15px;letter-spacing:1px}
    .shape{position:absolute;border:1px solid #348f7a22;border-radius:50%;width:420px;height:420px;right:-165px;top:15px}
    .shape.two{top:225px;right:-200px;border:50px solid #348f7a}
    .yellow{position:absolute;width:74px;height:74px;right:111px;top:103px;background:#efc94c;border-radius:50%}
  </style><div class="card"><div class="shape"></div><div class="shape two"></div><div class="yellow"></div>
  <div class="brand">Fundação<span class="dot">.</span><small>UNIVERSITÁRIA</small></div>
  <div class="label">MULHERES E JOVENS · MOÇAMBIQUE</div>
  <h1>Talento local.<br>Novas oportunidades.</h1>
  <p>Descubra projectos, produtos e serviços<br>das nossas comunidades.</p>
  <div class="foot">EXPLORE. CONHEÇA. CONECTE-SE.</div></div></html>`)
  await page.screenshot({ path: 'public/og-image.png', type: 'png' })
  console.log('Generated public/og-image.png (1200 × 630)')
} finally { await browser.close() }
