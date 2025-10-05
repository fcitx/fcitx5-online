import { execSync } from 'node:child_process'
import replace from '@rollup/plugin-replace'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { appName } from './package.json'

const wasmPath = 'node_modules/fcitx5-js/dist/'

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  optimizeDeps: {
    // Don't pre-bundle it to node_modules/.vite/deps as wasm/data won't be copied there.
    exclude: ['fcitx5-js'],
  },
  plugins: [
    // @ts-expect-error plugin type not esm compatible
    replace({
      __COMMIT__: execSync('git rev-parse HEAD').toString().trim(),
      __BUILD_DATE__: new Date().toLocaleString(),
    }),
    vue(),
    viteStaticCopy({
      targets: ['worker.js', 'Fcitx5.js', 'Fcitx5.data', 'Fcitx5.wasm', 'libFcitx5Config.so', 'libFcitx5Core.so', 'libFcitx5Utils.so'].map(file => ({
        src: wasmPath + file,
        dest: 'wasm', // Don't put under assets, as vite pwa won't hash them by default.
      })),
    }),
    VitePWA({
      registerType: 'prompt',
      manifest: {
        name: appName,
        short_name: appName,
      },
      pwaAssets: {
        injectThemeColor: false,
      },
      workbox: {
        // 30 MB for Fcitx5.wasm debug.
        maximumFileSizeToCacheInBytes: 30 * 1024 * 1024,
        // Exclude manifest.webmanifest to avoid duplicate.
        globPatterns: ['**/*.{js,css,html,svg,ico,png,data,so,wasm}'],
        cleanupOutdatedCaches: true,
      },
    }),
  ],
  build: {
    rollupOptions: {
      external: ['fcitx5-js'], // Don't bundle Fcitx5.js so that it can be reused by worker.
      output: {
        paths: {
          'fcitx5-js': '../wasm/Fcitx5.js', // Convert import from 'fcitx5-js' to import from '../wasm/Fcitx5.js'.
        },
      },
    },
  },
})
