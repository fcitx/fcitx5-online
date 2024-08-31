import type { FCITX } from 'fcitx5-js'

declare global {
  interface Window {
    fcitx: FCITX
  }
}
