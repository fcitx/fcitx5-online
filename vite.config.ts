import { execSync } from 'node:child_process'
import { defineConfig } from 'vite'
import replace from '@rollup/plugin-replace'
import vue from '@vitejs/plugin-vue'
import { viteStaticCopy } from 'vite-plugin-static-copy'

const wasmPath = 'node_modules/fcitx5-js/dist/'

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  optimizeDeps: {
    // Don't pre-bundle it to node_modules/.vite/deps as wasm/data won't be copied there.
    exclude: ['fcitx5-js'],
  },
  plugins: [
    replace({
      __COMMIT__: execSync('git rev-parse HEAD').toString().trim(),
      __BUILD_DATE__: new Date().toLocaleString(),
    }),
    vue(),
    viteStaticCopy({
      targets: ['Fcitx5.data', 'Fcitx5.wasm', 'libFcitx5Config.so', 'libFcitx5Core.so', 'libFcitx5Utils.so'].map(file => ({
        src: wasmPath + file,
        dest: 'assets',
      })),
    }),
  ],
})
