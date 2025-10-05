import type { Page } from '@playwright/test'

export function init(page: Page) {
  return page.goto('http://localhost:4173')
}
