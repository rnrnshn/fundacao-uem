import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  timeout: 45_000,
  fullyParallel: false,
  workers: 1,
  use: { baseURL: 'http://127.0.0.1:4320', headless: true, viewport: { width: 1440, height: 1000 }, trace: 'retain-on-failure' },
  webServer: { command: 'pnpm start', env: { PORT: '4320', HOST: '127.0.0.1' }, url: 'http://127.0.0.1:4320', reuseExistingServer: false, timeout: 30_000 },
})
