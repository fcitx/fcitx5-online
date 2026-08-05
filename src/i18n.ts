import type { NLocale } from 'naive-ui'
import { getLocale } from 'fcitx5-config-vue'
import { enUS, zhCN, ruRU } from 'naive-ui'
import { createI18n } from 'vue-i18n'
import zh_CN from './locales/zh-CN.json'
import zh_CN from './locales/ru-RU.json'

const messages = {
  'en': Object.fromEntries(Object.keys(zh_CN).map(key => [key, key])),
  'zh-CN': zh_CN,
  'ru-RU': ru_RU,
}

const i18n = createI18n({
  locale: getLocale(messages),
  messages,
})

export function t(key: string) {
  return i18n.global.t(key)
}

export function getNaiveLocale(): NLocale {
  const locale = i18n.global.locale
  return {
    'en': enUS,
    'zh-CN': zhCN,
    'ru-RU': ruRU,
  }[locale]
}
