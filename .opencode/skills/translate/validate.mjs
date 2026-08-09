import fs from 'node:fs'

const [base, target] = process.argv.slice(2)
if (!base || !target) {
  console.error('usage: node validate.mjs <zh-CN.json> <lang.json>')
  process.exit(1)
}

const a = JSON.parse(fs.readFileSync(base, 'utf8'))
const b = JSON.parse(fs.readFileSync(target, 'utf8'))

// Flatten a JSON locale object into dotted key paths. Locale files in this
// project are flat, but the flattening keeps future nested blocks safe.
function flat(obj, pre = '') {
  const res = new Set()
  for (const [k, v] of Object.entries(obj)) {
    const p = pre ? `${pre}.${k}` : k
    if (v !== null && typeof v === 'object') {
      for (const x of flat(v, p)) res.add(x)
    } else {
      res.add(p)
    }
  }
  return res
}

function get(obj, path) {
  if (path in obj) return obj[path]
  return path.split('.').reduce((o, k) => o?.[k], obj)
}

const ka = [...flat(a)].sort()
const kb = [...flat(b)].sort()

let exit = false

const missing = ka.filter(k => !kb.includes(k))
const extra = kb.filter(k => !ka.includes(k))
// Words that are legitimately identical in the target language and should not
// be reported as untranslated (keyed by locale derived from the target file).
const SAME_WORD = {
  ru: ['OK'],
}
const locale = target.split('/').pop().replace(/\.json$/, '')
const sameWord = SAME_WORD[locale] ?? []
// A value that equals its leaf key means it is still the English placeholder.
const untranslated = ka.filter(k => {
  const v = get(b, k)
  const leaf = k.split('.').pop()
  return typeof v === 'string' && v === leaf && !sameWord.includes(leaf)
})

// Interpolation placeholders ({name}) must be preserved exactly in the
// translation: same names with the same counts for every leaf in both locales.
function placeholders(s) {
  const counts = new Map()
  for (const m of String(s).matchAll(/\{([^{}]+)\}/g)) {
    counts.set(m[1], (counts.get(m[1]) ?? 0) + 1)
  }
  return counts
}

const placeholderFailures = ka.filter(k => {
  if (typeof get(a, k) !== 'string' || typeof get(b, k) !== 'string') return false
  const pa = placeholders(get(a, k))
  const pb = placeholders(get(b, k))
  if (pa.size !== pb.size) return true
  for (const [name, count] of pa) {
    if (pb.get(name) !== count) return true
  }
  return false
})

if (missing.length) {
  console.log(`MISSING (in ${target}, not in ${base}):`)
  console.log(missing.join('\n'))
  exit = true
}
if (extra.length) {
  console.log(`EXTRA (in ${target}, not in ${base}):`)
  console.log(extra.join('\n'))
  exit = true
}
if (untranslated.length) {
  console.log(`UNTRANSLATED (value equals its key) in ${target}:`)
  console.log(untranslated.join('\n'))
  exit = true
}
if (placeholderFailures.length) {
  console.log(`PLACEHOLDER MISMATCH (interpolation {name} differs between ${base} and ${target}):`)
  console.log(placeholderFailures.join('\n'))
  exit = true
}

if (!exit) console.log(`OK ${target}: all keys match ${base}, nothing untranslated`)
process.exitCode = exit ? 1 : 0
