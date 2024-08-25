import { ref, watch } from 'vue'
import { fcitxReady } from 'fcitx5-js'

export const loading = ref(true)

export const inputMethod = ref('')

watch(inputMethod, (value: string) => {
  window.fcitx.setCurrentInputMethod(value)
})

export const inputMethods = ref<{
  name: string
  displayName: string
}[]>([])

function statusAreaCallback() {
  inputMethods.value = window.fcitx.getInputMethods()
  inputMethod.value = window.fcitx.currentInputMethod()
}

fcitxReady.then(() => {
  window.fcitx.setStatusAreaCallback(statusAreaCallback)
  window.fcitx.enable()
  window.fcitx.setInputMethods(['keyboard-us', 'pinyin'])
  document.querySelector('textarea')?.focus()
  window.fcitx.updateStatusArea()
  loading.value = false
})
