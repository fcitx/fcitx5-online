import { getLocale } from 'fcitx5-config-vue'
import { createI18n } from 'vue-i18n'
import zhCN from './locales/zh-CN.json'

const messages = {
  'en': Object.fromEntries(Object.keys(zhCN).map(key => [key, key])),
  'zh-CN': zhCN,
}

const i18n = createI18n({
  locale: getLocale(messages),
  messages,
})

export function t(key: string) {
  return i18n.global.t(key)
}
