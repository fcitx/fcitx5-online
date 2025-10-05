import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  webServer: {
    command: 'pnpm run preview',
    port: 4173,
    reuseExistingServer: true,
  },
})
