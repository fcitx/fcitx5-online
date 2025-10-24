import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: 'tests',
  retries: 3,
  expect: {
    timeout: 10000,
  },
  fullyParallel: true,
  webServer: {
    command: 'pnpm run preview',
    port: 4173,
    reuseExistingServer: true,
  },
})
