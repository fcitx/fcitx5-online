import { createApp } from 'vue'
import { fcitxReady } from 'fcitx5-js'
import App from './App.vue'
import './main.css'

fcitxReady.then(() => {
  window.fcitx.enable()
  window.fcitx.setInputMethods(['pinyin'])
})

createApp(App).mount('#app')
