import { readdirSync } from 'node:fs'
import { expect, test } from '@playwright/test'
import { init } from './util'

test('Offline', async ({ page }) => {
  const assets = readdirSync('dist/assets')
  const commonPaths = [
    '/',
    '/favicon.svg',
    ...assets.map(file => `/assets/${file}`),
    ...['Fcitx5.js', 'Fcitx5.wasm', 'Fcitx5.data', 'libFcitx5Core.so', 'libFcitx5Config.so', 'libFcitx5Utils.so'].map(file => `/wasm/${file}`),
  ]
  await init(page)
  await expect(page.getByText('Site is ready to work offline.')).toBeVisible()

  let htmlRequested = false
  const { resolve, promise } = Promise.withResolvers()
  page.on('response', (response) => {
    const { pathname } = new URL(response.url())
    if (!htmlRequested) {
      if (pathname !== '/') {
        return // Filter out leftovers from initial load.
      }
      htmlRequested = true
    }
    expect(response.fromServiceWorker()).toBe(true)
    const index = commonPaths.indexOf(pathname)
    if (index >= 0) {
      commonPaths.splice(index, 1)
      if (!commonPaths.length) {
        resolve(null)
      }
    }
  })
  await init(page)
  await promise
})
