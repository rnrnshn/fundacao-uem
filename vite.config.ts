import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import react from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import tailwindcss from '@tailwindcss/vite'

const vercelBuild = process.env.NITRO_PRESET === 'vercel' || process.env.VERCEL === '1'
const vercelPreview = !!process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production'

export default defineConfig({
  // Preview deployments must not inherit a production indexing flag.
  define: vercelPreview ? { 'import.meta.env.VITE_SEO_INDEXABLE': JSON.stringify('false') } : {},
  plugins: [
    tailwindcss(),
    tanstackStart(),
    nitro({
      preset: vercelBuild ? 'vercel' : 'node-server',
      vercel: { functions: { runtime: 'nodejs24.x', maxDuration: 30 } },
    }),
    react(),
  ],
})
