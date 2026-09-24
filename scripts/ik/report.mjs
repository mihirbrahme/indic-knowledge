// status / find / stats / schedule / publish-check

import { writeFileSync, readFileSync } from "node:fs"
import {
  registries, notes, dossiers, entries, passages, loadConfig, today, addDays,
  isISODate, asList, GATED_STATUSES, HIGH_RISK_FLAGS, findNote, transclusions,
} from "./repo.mjs"
import { validate } from "./validate.mjs"

const count = (arr, key) => {
  const m = new Map()
  for (const x of arr) {
    const k = typeof key === "function" ? key(x) : x[key]
    for (const v of Array.isArray(k) ? k : [k]) if (v != null) m.set(v, (m.get(v) ?? 0) + 1)
  }
  return m
}
const sorted = (m) => [...m.entries()].sort((a, b) => b[1] - a[1] || String(a[0]).localeCompare(String(b[0])))
const label = (s) => String(s).replace(/-/g, " ").replace(/^./, (c) => c.toUpperCase())

// ------------------------------------------------------------------ runway

/**
 * Publishing runway = consecutive future dates, starting at the next
 * publishing day, that each already hold a scheduled entry. Stops at the
 * first gap.
 */
export function runway() {
  const cfg = loadConfig()
  const start = addDays(today(cfg.timezone), 1)
  const taken = new Set(
    entries()
      .filter((e) => e.data.status === "scheduled" && isISODate(e.data.publish_date))
      .map((e) => e.data.publish_date),
  )
  let n = 0
  let d = start
  while (taken.has(d)) { n++; d = addDays(d, 1) }
  return { days: n, from: start, timezone: cfg.timezone }
}

/** First date on or after `from` with no entry already carrying a publish_date. */
export function nextFreeDate(from) {
  const used = new Set(entries().map((e) => e.data.publish_date).filter(isISODate))
  let d = from
  while (used.has(d)) d = addDays(d, 1)
  return d
}

// ------------------------------------------------------------------ status

export function status() {
  const { texts, candidates, sourceRecords } = registries()
  const { errors, warnings } = validate()
  const ss = count(texts, "source_status")
  const dl = count(dossiers(), (d) => d.data.status)
  const el = count(entries(), (e) => e.data.status)
  const rw = runway()

  const L = []
  L.push("", "Indic Knowledge", "")
  L.push(`Corpus: ${texts.length} texts   Candidates: ${(candidates.candidates ?? []).length}   Sources: ${sourceRecords.length}`)
  L.push(`  ${["verified", "partially-verified", "source-gap"].map((k) => `${label(k)}: ${ss.get(k) ?? 0}`).join("   ")}`)

  if (dossiers().length) {
    L.push("", "Dossiers:")
    for (const [k, v] of sorted(dl)) L.push(`  ${label(k)}: ${v}`)
  }
  if (entries().length) {
    L.push("", "Entries:")
    for (const [k, v] of sorted(el)) L.push(`  ${label(k)}: ${v}`)
  }
  L.push("", `Passages: ${passages().length}`)

  const sched = entries()
    .filter((e) => e.data.status === "scheduled" && isISODate(e.data.publish_date))
    .sort((a, b) => a.data.publish_date.localeCompare(b.data.publish_date))
  L.push(`Scheduled: ${sched.length}`)
  if (sched.length) {
    for (const e of sched.slice(0, 5)) L.push(`  ${e.data.publish_date}  ${e.data.id}`)
    if (sched.length > 5) L.push(`  … ${sched.length - 5} more`)
  }
  L.push(`Publishing runway: ${rw.days} day${rw.days === 1 ? "" : "s"}  (from ${rw.from}, ${rw.timezone})`)

  L.push("")
  L.push(`Errors: ${errors.length}   Warnings: ${warnings.length}`)
  if (errors.length) L.push("  run `ik validate` for detail")
  L.push("")
  return { text: L.join("\n"), errors: errors.length }
}

// ------------------------------------------------------------------ find

const norm = (s) =>
  String(s ?? "").normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase()

function haystack(obj, keys) {
  const out = []
  for (const k of keys) {
    const v = obj?.[k]
    if (v == null) continue
    if (Array.isArray(v)) out.push(v.flat(3).join(" "))
    else if (typeof v === "object") out.push(Object.values(v).join(" "))
    else out.push(String(v))
  }
  return out.join(" \u0000 ")
}

export function find(query) {
  const q = norm(query).split(/\s+/).filter(Boolean)
  if (!q.length) return "Usage: ik find <query>"
  const hit = (text) => { const t = norm(text); return q.every((w) => t.includes(w)) }
  const rows = []

  const { texts, families, candidates } = registries()
  for (const t of texts) {
    if (hit(haystack(t, ["id", "title", "title_devanagari", "family", "secondary_family", "veda",
      "shakha", "darshana_school", "vedanga_domain", "discipline_focus", "commentarial_tradition",
      "scope_notes"])))
      rows.push(["corpus", t.id, `${t.title} — ${t.family} · ${t.source_status}`])
  }
  for (const f of families.families ?? []) {
    if (hit(haystack(f, ["id", "label", "description", "scope_notes"])))
      rows.push(["family", f.id, f.label])
  }
  for (const c of candidates.candidates ?? []) {
    if (hit(haystack(c, ["id", "title", "reason", "notes"])))
      rows.push(["candidate", c.id, `${c.title} — ${c.status}`])
  }
  for (const n of [...notes(), ...dossiers()]) {
    if (!n.data.type) continue
    const fm = haystack(n.data, ["id", "title", "question", "candidate_question", "text_id",
      "text_ids", "locator", "concepts", "people", "traditions", "disciplines", "archetype",
      "surprise_type", "connection_types", "review_flags", "research_gaps"])
    if (hit(fm) || hit(n.body)) {
      const where = hit(fm) ? "" : "  (body)"
      rows.push([n.data.type, n.data.id, `${n.data.title ?? ""} — ${n.data.status}${where}`])
    }
  }

  if (!rows.length) return `No matches for "${query}".`
  const w = Math.max(...rows.map((r) => r[0].length))
  const order = ["corpus", "family", "candidate", "passage", "entry", "research-dossier"]
  const rank = (t) => { const i = order.indexOf(t); return i === -1 ? order.length : i }
  rows.sort((a, b) => rank(a[0]) - rank(b[0]) || a[1].localeCompare(b[1]))
  return [
    "",
    ...rows.map(([t, id, d]) => `  ${t.padEnd(w)}  ${id}${d ? `  ·  ${d}` : ""}`),
    "",
    `${rows.length} match${rows.length === 1 ? "" : "es"}`,
    "",
  ].join("\n")
}

// ------------------------------------------------------------------ stats

export function stats() {
  const { texts, sourceRecords, candidates } = registries()
  const L = []
  const section = (title, map, empty = "none") => {
    L.push("", title)
    const s = sorted(map)
    if (!s.length) { L.push(`  ${empty}`); return }
    for (const [k, v] of s) L.push(`  ${String(k).padEnd(28)} ${v}`)
  }

  L.push("", "Indic Knowledge — statistics")
  section("Corpus by family", count(texts, "family"))
  section("Corpus by source status", count(texts, "source_status"))

  const byText = new Map()
  for (const e of entries()) {
    const ps = passages().find((p) => p.data.id === e.data.primary_passage)
    const t = ps?.data.text_id ?? "(unresolved)"
    byText.set(t, (byText.get(t) ?? 0) + 1)
  }
  section("Entries by corpus text", byText)

  const byDisc = new Map()
  for (const e of entries()) {
    const ps = passages().find((p) => p.data.id === e.data.primary_passage)
    const rec = registries().textById.get(ps?.data.text_id)
    const ds = asList(rec?.discipline_focus)
    for (const d of ds.length ? ds : ["(unclassified)"]) byDisc.set(d, (byDisc.get(d) ?? 0) + 1)
  }
  section("Entries by discipline", byDisc)

  section("Dossiers by status", count(dossiers(), (d) => d.data.status))
  section("Entries by status", count(entries(), (e) => e.data.status))

  const rw = runway()
  L.push("", "Publishing")
  L.push(`  ${"Published entries".padEnd(28)} ${entries().filter((e) => ["published", "revised"].includes(e.data.status)).length}`)
  L.push(`  ${"Scheduled entries".padEnd(28)} ${entries().filter((e) => e.data.status === "scheduled").length}`)
  L.push(`  ${"Runway (days)".padEnd(28)} ${rw.days}`)
  L.push(`  ${"Timezone".padEnd(28)} ${rw.timezone}`)
  L.push("", "Sources")
  L.push(`  ${"Source records".padEnd(28)} ${sourceRecords.length}`)
  L.push(`  ${"Corpus texts at source-gap".padEnd(28)} ${texts.filter((t) => t.source_status === "source-gap").length}`)
  L.push(`  ${"Corpus candidates".padEnd(28)} ${(candidates.candidates ?? []).length}`)
  L.push("")
  return L.join("\n")
}

// ------------------------------------------------------------------ publish-check

export function publishCheck(entryId) {
  const en = entries().find((e) => e.data.id === entryId || e.slug === entryId)
  if (!en) return { ready: false, text: `NOT READY\n  no entry with id \`${entryId}\`` }
  const d = en.data
  const reasons = []
  const { textById } = registries()

  if (!["editor-approved", "ready", "scheduled"].includes(d.status)) {
    reasons.push(`status is \`${d.status}\` — needs editor-approved, ready or scheduled (a human approves this, not the CLI)`)
  }
  if (!d.primary_passage) reasons.push("no primary_passage")
  const ps = passages().find((p) => p.data.id === d.primary_passage || p.slug === d.primary_passage)
  if (d.primary_passage && !ps) reasons.push(`primary_passage \`${d.primary_passage}\` does not resolve to a passage note`)

  if (ps) {
    const rec = textById.get(ps.data.text_id)
    if (!rec) reasons.push(`passage text_id \`${ps.data.text_id}\` is not in the corpus`)
    if (rec?.source_status === "source-gap" || asList(ps.data.review_flags).includes("source-gap")) {
      reasons.push("primary passage carries an unresolved source-gap")
    }
    const bad = [...asList(ps.data.source_record_ids), ps.data.locator_source]
      .filter(Boolean).filter((r) => !registries().sourceById.has(r))
    if (bad.length) reasons.push(`invalid source record(s): ${bad.join(", ")}`)
    if (!asList(ps.data.inspected_source_record_ids).length) {
      reasons.push("no source on the passage is recorded as actually inspected")
    }
    const risky = asList(ps.data.review_flags).filter((f) => HIGH_RISK_FLAGS.includes(f))
    if (risky.length && ["pending", "provisional"].includes(ps.data.translation_status)) {
      reasons.push(`unresolved high-risk review flag(s) ${risky.join(", ")} with translation_status \`${ps.data.translation_status}\``)
    }
    if (!transclusions(en.body).some((t) => t.target === ps.slug)) {
      reasons.push(`entry does not transclude its primary passage \`${ps.slug}\``)
    }
  }

  if (!d.publish_date) reasons.push("no publish_date")
  else if (!isISODate(d.publish_date)) reasons.push(`publish_date "${d.publish_date}" is not YYYY-MM-DD`)

  const wantDraft = !["published", "revised"].includes(d.status)
  if (d.draft !== wantDraft) reasons.push(`draft is ${d.draft} but status \`${d.status}\` requires draft: ${wantDraft}`)

  const { errors } = validate()
  const own = errors.filter((e) => e.where === en.path || (ps && e.where === ps.path))
  for (const e of own) reasons.push(`validation: ${e.msg}`)

  if (!reasons.length) return { ready: true, text: `READY\n  ${d.id}  ·  ${d.publish_date}` }
  return { ready: false, text: ["NOT READY", `  ${d.id}`, "", ...reasons.map((r) => `  - ${r}`)].join("\n") }
}

// ------------------------------------------------------------------ schedule

export function scheduleShow() {
  const t = today()
  const rows = entries()
    .filter((e) => isISODate(e.data.publish_date) && e.data.publish_date >= t)
    .sort((a, b) => a.data.publish_date.localeCompare(b.data.publish_date))
  if (!rows.length) return "\nNothing scheduled.\n"
  const seen = new Map()
  const L = ["", "Upcoming", ""]
  for (const e of rows) {
    const dt = e.data.publish_date
    seen.set(dt, (seen.get(dt) ?? 0) + 1)
    const clash = seen.get(dt) > 1 ? "  ⚠ collision" : ""
    L.push(`  ${dt}  ${String(e.data.status).padEnd(15)} ${e.data.id}${clash}`)
  }
  const rw = runway()
  L.push("", `Runway: ${rw.days} day${rw.days === 1 ? "" : "s"} from ${rw.from} (${rw.timezone})`, "")
  return L.join("\n")
}

/** Rewrite one frontmatter key in place, preserving the rest of the file byte for byte. */
function setFrontmatterKey(note, key, value) {
  const raw = readFileSync(note.file, "utf8")
  const m = /^(---\r?\n)([\s\S]*?)(\r?\n---)/.exec(raw)
  if (!m) throw new Error(`${note.path}: no frontmatter block`)
  const line = `${key}: "${value}"`
  const re = new RegExp(`^${key}:.*$`, "m")
  const block = re.test(m[2]) ? m[2].replace(re, line) : `${m[2]}\n${line}`
  writeFileSync(note.file, raw.replace(m[0], `${m[1]}${block}${m[3]}`), "utf8")
}

function setStatus(note, value) {
  const raw = readFileSync(note.file, "utf8")
  const m = /^(---\r?\n)([\s\S]*?)(\r?\n---)/.exec(raw)
  const block = m[2].replace(/^status:.*$/m, `status: ${value}`)
  writeFileSync(note.file, raw.replace(m[0], `${m[1]}${block}${m[3]}`), "utf8")
}

export function scheduleAssign(entryId, dateArg) {
  const en = entries().find((e) => e.data.id === entryId || e.slug === entryId)
  if (!en) return { ok: false, text: `No entry with id \`${entryId}\`.` }
  const cfg = loadConfig()
  const date = dateArg ?? nextFreeDate(addDays(today(cfg.timezone), 1))
  if (!isISODate(date)) return { ok: false, text: `\`${date}\` is not a YYYY-MM-DD date.` }

  const L = []
  if (date <= today(cfg.timezone)) L.push(`  ⚠ ${date} is not in the future (${cfg.timezone}).`)
  const clash = entries().filter((e) => e.data.publish_date === date && e.data.id !== en.data.id)
  if (clash.length) {
    L.push(`  ⚠ ${date} already holds: ${clash.map((c) => c.data.id).join(", ")}`)
    L.push(`  ⚠ the default model is one entry per day — keep this only if the pairing is deliberate.`)
  }

  setFrontmatterKey(en, "publish_date", date)
  L.unshift(`  publish_date set to ${date}`)

  if (en.data.status === "ready") {
    setStatus(en, "scheduled")
    L.push("  status: ready → scheduled")
  } else if (en.data.status !== "scheduled") {
    L.push(`  status left at \`${en.data.status}\` — only a \`ready\` entry is advanced to \`scheduled\` automatically.`)
  }
  return { ok: true, text: ["", `${en.data.id}`, ...L, "", "Not published. Run `ik publish-check` before publishing.", ""].join("\n") }
}
