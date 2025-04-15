import type { MenuAction } from 'fcitx5-js'
import { fcitxReady } from 'fcitx5-js'
import { ref, watch } from 'vue'

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

function inputMethodsCallback() {
  inputMethods.value = window.fcitx.getInputMethods()
  inputMethod.value = window.fcitx.currentInputMethod()
}

function statusAreaCallback() {
  menuActions.value = window.fcitx.getMenuActions()
}

fcitxReady.then(() => {
  // @ts-expect-error private API
  window.fcitx.useWorker = true
  window.fcitx.setInputMethodsCallback(inputMethodsCallback)
  window.fcitx.setStatusAreaCallback(statusAreaCallback)
  window.fcitx.enable()
  refocus()
  loading.value = false
})
