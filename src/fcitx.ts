import { ref, watch } from 'vue'
import type { MenuAction } from 'fcitx5-js'
import { fcitxReady } from 'fcitx5-js'

export const loading = ref(true)

export const inputMethod = ref('')

export const menuActions = ref<MenuAction[]>([])

export function refocus() {
  document.querySelector('textarea')?.focus()
}

watch(inputMethod, (value: string) => {
  window.fcitx.setCurrentInputMethod(value)
  refocus()
})

export const inputMethods = ref<{
  name: string
  displayName: string
}[]>([])

function statusAreaCallback() {
  inputMethods.value = window.fcitx.getInputMethods()
  inputMethod.value = window.fcitx.currentInputMethod()
  menuActions.value = window.fcitx.getMenuActions()
}

fcitxReady.then(() => {
  window.fcitx.setStatusAreaCallback(statusAreaCallback)
  window.fcitx.enable()
  window.fcitx.setInputMethods(['keyboard-us', 'pinyin'])
  refocus()
  window.fcitx.updateStatusArea()
  loading.value = false
})
