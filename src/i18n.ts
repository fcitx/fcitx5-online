import type { NLocale } from 'naive-ui'
import { getLocale } from 'fcitx5-config-vue'
import { caES, daDK, deDE, enUS, esAR, frFR, heIL, jaJP, kaGE, koKR, ruRU, svSE, viVN, zhCN, zhTW } from 'naive-ui'
import { createI18n } from 'vue-i18n'
import ca from './locales/ca.json'
import da from './locales/da.json'
import de from './locales/de.json'
import es from './locales/es.json'
import fr from './locales/fr.json'
import he from './locales/he.json'
import ja from './locales/ja.json'
import ka from './locales/ka.json'
import ko from './locales/ko.json'
import ru from './locales/ru.json'
import sv from './locales/sv.json'
import vi from './locales/vi.json'
import zh_CN from './locales/zh-CN.json'
import zh_TW from './locales/zh-TW.json'

const messages = {
  'en': Object.fromEntries(Object.keys(zh_CN).map(key => [key, key])),
  'ca': ca,
  'da': da,
  'de': de,
  'es': es,
  'fr': fr,
  'he': he,
  'ja': ja,
  'ka': ka,
  'ko': ko,
  'ru': ru,
  'sv': sv,
  'vi': vi,
  'zh-CN': zh_CN,
  'zh-TW': zh_TW,
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
    'ca': caES,
    'da': daDK,
    'de': deDE,
    'en': enUS,
    'es': esAR,
    'fr': frFR,
    'he': heIL,
    'ja': jaJP,
    'ka': kaGE,
    'ko': koKR,
    'ru': ruRU,
    'sv': svSE,
    'vi': viVN,
    'zh-CN': zhCN,
    'zh-TW': zhTW,
  }[locale]
}

export function getDirection(): 'rtl' | 'ltr' {
  return i18n.global.locale === 'he' ? 'rtl' : 'ltr'
}
