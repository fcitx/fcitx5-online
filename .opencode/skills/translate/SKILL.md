---
name: translate
description: Translate fcitx5-online vue-i18n localization files (JSON) among English, Simplified Chinese, Russian, and other languages
---

# Translation Reference

This skill provides format rules, terminology, and guidelines for translating fcitx5-online. The `/translate` command orchestrates the workflow.

## Project Overview

fcitx5-online is a Vue 3 application using **vue-i18n** (not gettext). It has one i18n system backed by JSON locale files.

- The canonical English strings are the **keys** of the JSON locale files. In `src/i18n.ts` the `en` locale is generated from the `zh-CN.json` keys, mapping every key to itself — so English text equals the key. There is **no** `en` JSON file.
- **`src/locales/zh-CN.json`** is the source of truth and the Simplified Chinese translation.
- Every other language lives in its own JSON file `src/locales/<lang>.json`, mirroring `zh-CN.json`'s structure with translated values.
- All supported languages are listed in the `messages` object of `src/i18n.ts`. Any language to translate must be registered there.
- **naive-ui** localizes the strings inside its own components. `getNaiveLocale()` in `src/i18n.ts` maps each `messages` key to the matching `NLocale` (e.g. `ru` -> `ruRU`, `zh-CN` -> `zhCN`). Any locale added to `messages` must also get a `getNaiveLocale()` mapping.

### Locale Mapping

Supported locale codes come from `src/i18n.ts` (`messages`), which is the authoritative list:

| Locale code (JSON file) | Language | naive-ui `NLocale` |
|--------------------------|----------|---------------------|
| ca | Catalan | enUS (unavailable) |
| da | Danish | daDK |
| de | German | deDE |
| es | Spanish | esAR |
| fr | French | frFR |
| he | Hebrew | enUS (unavailable) |
| ja | Japanese | jaJP |
| ka | Georgian | enUS (unavailable) |
| ko | Korean | koKR |
| ru | Russian | ruRU |
| sv | Swedish | svSE |
| vi | Vietnamese | viVN |
| zh-CN | Simplified Chinese (source) | zhCN |
| zh-TW | Traditional Chinese | zhTW |

`en` (English) is auto-generated from the JSON keys in `src/i18n.ts` and has no file. Keep this table in sync with `messages` whenever a language is added or removed.

### naive-ui Locales

`naive-ui` ships these `NLocale`s (see `node_modules/naive-ui/es/locales/common/`): arDZ, azAZ, csCZ, daDK, deDE, enGB, enUS, eo, esAR, etEE, faIR, frFR, idID, itIT, jaJP, kmKH, koKR, nbNO, nlNL, plPL, ptBR, ruRU, skSK, svSE, thTH, trTR, ugCN, ukUA, uzUZ, viVN, zhCN, zhTW. When adding a new locale, prefer the matching `NLocale` (`ja` -> `jaJP`, `vi` -> `viVN`, `zh-TW` -> `zhTW`). If no match exists (e.g. `he`, `ka`, `ca`), map it to `enUS` as a fallback.

## vue-i18n Localization (JSON)

### File Format

Each locale is a flat JSON object whose keys are English sentences and whose values are the translation.

```json
{
  "Update available": "可更新",
  "Update now": "现在更新"
}
```

### Message Files

| File | Purpose |
|------|---------|
| src/locales/zh-CN.json | Source of truth (Simplified Chinese) |
| src/locales/<lang>.json | One per other language |
| src/i18n.ts | Registers locales in `messages` and maps them in `getNaiveLocale()` |

### Collecting Strings

Translateable strings are all the keys passed to this repo's own `t()` function in the Vue/TS sources (imported from `src/i18n.ts`). Look for:

- `t('String')`, `t("String")` — static strings; these are literal keys.
- `t('...', { param })` — strings with named interpolation; the `{param}` token must be preserved in the translation.

Note: `StatusArea.vue` imports its `t` from `fcitx5-config-vue`. Those strings (`Input Method`, `Global Config`, `Theme Editor`, `Plugin Manager`, `Advanced`) are translated by that package's own locale files — never add them here.

Machine-extract the current static keys:

```sh
node .opencode/skills/translate/keys.mjs
```

## Adding a New Language

When adding a language not yet in `messages` (e.g. `ja`):

1. Copy `src/locales/zh-CN.json` to `src/locales/<lang>.json`.
2. Register it in `src/i18n.ts`. Import each locale module under an identifier-safe binding of the locale code — the import path keeps the original code, but the local name must be a valid JS identifier (e.g. `zh_CN` for `zh-CN`). Example for `ja`:
   ```ts
   import ja from './locales/ja.json'
   // ...
   const messages = {
     // ...
     'ja': ja,
   }
   ```
   There are currently no fallback entries in `messages`; just add the new key.
3. Add the matching entry in `getNaiveLocale()` (e.g. `'ja': jaJP`, importing `jaJP` from `naive-ui`). If naive-ui has no matching `NLocale`, use `enUS`.
4. Translate every value, using the key (English) and the `zh-CN.json` value (Simplified Chinese) as context.

## Editing Rules

- **Encoding**: UTF-8 (all JSON already is).
- **Keys must never change**: the key equals the English string passed to `t()`. English text lives only in the key, never in a separate field.
- **Interpolation tokens**: `{param}` placeholders MUST be preserved exactly.
- **Trailing punctuation** in the key is part of the string (e.g. `?`, `.`, `…`) and must be reflected in the translation.
- **Untranslated**: a value that equals its key (the English text) means it is still untranslated. Completed translations must differ from the key, except where the target language genuinely uses the same word.
- **Uncertainty**: if unsure, prefer the meaning of the `zh-CN` value, keep the phrasing natural, and note the uncertainty in your output summary.

## Terminology Reference

Use these translations consistently:

| English | Simplified Chinese | Russian |
|---------|-------------------|---------|
| input method | 输入法 | метод ввода |
| plugin | 插件 | плагин |
| update | 更新 | обновление |
| offline | 离线 | автономный |
| disable | 禁用 | отключить |
| download | 下载 | загрузить |

## General Translation Rules

1. **Keep translations concise** — UI space is limited. Prefer short, natural phrasing.
2. **Maintain consistency** — if a term is translated one way, reuse the same translation everywhere.
3. **Respect platform conventions** — use terminology the target platform's users expect.
4. **No machine-translation artifacts** — avoid overly formal or stilted phrasing; translations should read naturally.
5. **Do not translate** — brand names, file paths, technical identifiers, or code. Keep well-known UI/design terms in their original form if translating would cause confusion.
6. **Preserve `{param}` interpolation** — all named placeholders must appear in the translated value with the same names and counts; their order is not enforced, so reordering to fit the target language is allowed.
7. **Punctuation** — use the target language's punctuation conventions (e.g. Chinese full-width 。、？ vs English half-width . , ?).
8. **The key is the English source** — the key plus the `zh-CN` value together give the intended meaning; translate the key using both as context.

## Validation

```sh
node .opencode/skills/translate/validate.mjs src/locales/zh-CN.json src/locales/<lang>.json
```

Checks that every key in `zh-CN.json` exists in `<lang>.json` (reports MISSING / EXTRA keys) and flags values that still equal their key as UNTRANSLATED. Run it for every locale file after translating.

## Output Format

When translating, present changes clearly:

- Group changes by locale file.
- Show the keys added/modified with their translations.
- Mention any keys still untranslated.
- Note any edits to `src/i18n.ts` (both `messages` and `getNaiveLocale()`) when a new language was added.
