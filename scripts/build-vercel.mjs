import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

// Invoke the same Vite build with Nitro's deployment adapter selected explicitly.
// No shell-specific environment assignment and no Vercel account needed to build.
const cli = fileURLToPath(new URL('./bin/vite.js', import.meta.resolve('vite/package.json')))
const result = spawnSync(process.execPath, [cli, 'build'], {
  stdio: 'inherit',
  env: { ...process.env, NITRO_PRESET: 'vercel' },
})
if (result.error) throw result.error
process.exit(result.status ?? 1)
