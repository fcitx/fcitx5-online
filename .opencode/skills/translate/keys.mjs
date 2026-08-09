import fs from 'node:fs'
import path from 'node:path'

// Collect the canonical set of translation keys used by this repo's own t()
// function, imported from src/i18n.ts. StatusArea.vue imports t from
// 'fcitx5-config-vue', whose strings are translated by that package's own
// locale files, so its keys must not be collected here. Dynamic template
// keys such as t(`language.${x}`) are skipped (they contain ${).
const LOCAL_T = /import\s*\{[^}]*\bt\b[^}]*\}\s*from\s*['"][./]+i18n['"]/

function walk(dir) {
  const res = []
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name)
    const st = fs.statSync(p)
    if (st.isDirectory()) res.push(...walk(p))
    else if (/\.(vue|ts)$/.test(p)) res.push(p)
  }
  return res
}

const keys = new Set()

for (const f of walk('src')) {
  const s = fs.readFileSync(f, 'utf8')
  if (!LOCAL_T.test(s)) continue
  for (const m of s.matchAll(/(?<![A-Za-z0-9_])t\s*\(\s*(['"`])([\s\S]*?)\1\s*[,)]/g)) {
    const k = m[2]
    if (!k.includes('${')) keys.add(k)
  }
}

for (const k of [...keys].sort()) console.log(k)
