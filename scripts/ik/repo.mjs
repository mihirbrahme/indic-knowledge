// Shared repository model for the `ik` CLI.
// Zero new dependencies: `yaml` is already a direct dependency of the repo.

import { readFileSync, readdirSync, existsSync, statSync } from "node:fs"
import { join, relative, basename, dirname } from "node:path"
import { fileURLToPath } from "node:url"
import YAML from "yaml"

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..")
const p = (...s) => join(ROOT, ...s)

// ---------------------------------------------------------------- config

const DEFAULT_CONFIG = {
  timezone: "Asia/Kolkata",
  publishing: { entries_per_day: 1 },
}

export function loadConfig() {
  const f = p("ik.config.yaml")
  if (!existsSync(f)) return DEFAULT_CONFIG
  const cfg = YAML.parse(readFileSync(f, "utf8")) ?? {}
  return {
    ...DEFAULT_CONFIG,
    ...cfg,
    publishing: { ...DEFAULT_CONFIG.publishing, ...(cfg.publishing ?? {}) },
  }
}

// ---------------------------------------------------------------- dates

/** Today's date as YYYY-MM-DD in the configured timezone. */
export function today(tz = loadConfig().timezone) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date())
}

export const isISODate = (s) =>
  typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s + "T00:00:00Z"))

export function addDays(iso, n) {
  const d = new Date(iso + "T00:00:00Z")
  d.setUTCDate(d.getUTCDate() + n)
  return d.toISOString().slice(0, 10)
}

// ---------------------------------------------------------------- registries

const readYaml = (rel) => YAML.parse(readFileSync(p(rel), "utf8"))

let _registries = null
export function registries() {
  if (_registries) return _registries
  const corpus = readYaml("data/corpus.yaml")
  const sources = readYaml("data/sources.yaml")
  const families = existsSync(p("data/corpus-families.yaml")) ? readYaml("data/corpus-families.yaml") : { families: [] }
  const candidates = existsSync(p("data/corpus-candidates.yaml"))
    ? readYaml("data/corpus-candidates.yaml")
    : { candidates: [] }
  _registries = {
    corpus,
    sources,
    families,
    candidates,
    texts: corpus.texts ?? [],
    sourceRecords: sources.source_records ?? [],
    textById: new Map((corpus.texts ?? []).map((t) => [t.id, t])),
    sourceById: new Map((sources.source_records ?? []).map((r) => [r.id, r])),
  }
  return _registries
}

// ---------------------------------------------------------------- notes

function walk(dir, out = []) {
  if (!existsSync(dir)) return out
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) walk(full, out)
    else if (name.endsWith(".md")) out.push(full)
  }
  return out
}

const FM = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/

/** Parse one markdown file into { file, path, slug, data, body, parseError }. */
export function parseNote(full) {
  const raw = readFileSync(full, "utf8")
  const rel = relative(ROOT, full).split("\\").join("/")
  const slug = basename(full, ".md")
  const m = FM.exec(raw)
  if (!m) return { file: full, path: rel, slug, fmRaw: "", data: {}, body: raw, parseError: "no YAML frontmatter block" }
  try {
    const data = YAML.parse(m[1]) ?? {}
    if (typeof data !== "object" || Array.isArray(data)) {
      return { file: full, path: rel, slug, fmRaw: m[1], data: {}, body: m[2], parseError: "frontmatter is not a mapping" }
    }
    return { file: full, path: rel, slug, fmRaw: m[1], data, body: m[2] }
  } catch (e) {
    return { file: full, path: rel, slug, data: {}, body: m[2], parseError: e.message.split("\n")[0] }
  }
}

let _notes = null
/** Every markdown note under /content (the public, Quartz-visible tree). */
export function notes() {
  if (!_notes) _notes = walk(p("content")).map(parseNote)
  return _notes
}

let _dossiers = null
/** Every research dossier under /research/dossiers (private, never published). */
export function dossiers() {
  if (!_dossiers) {
    _dossiers = walk(p("research", "dossiers"))
      .filter((f) => basename(f) !== "README.md")
      .map(parseNote)
  }
  return _dossiers
}

export const byType = (t) => notes().filter((n) => n.data.type === t)
export const passages = () => byType("passage")
export const entries = () => byType("entry")

export function findNote(id) {
  return [...notes(), ...dossiers()].find((n) => n.data.id === id || n.slug === id)
}

// ---------------------------------------------------------------- vocabularies
// Mirrors docs/FRONTMATTER_SCHEMA.md. Kept here so the CLI has one source of
// truth for structural checks; it does not duplicate registry data.

export const VOCAB = {
  noteTypes: [
    "text", "passage", "concept", "person", "tradition",
    "discipline", "entry", "deep-dive", "pathway", "source-note",
  ],
  noteLifecycle: ["stub", "drafted", "in-review", "published", "revised"],
  editorialLifecycle: [
    "candidate", "researching", "source-verified", "drafted", "red-teamed",
    "editor-approved", "ready", "scheduled", "published", "revised",
  ],
  dossierLifecycle: [
    "candidate", "researching", "evidence-collected", "ready-for-draft",
    "converted", "rejected", "parked",
  ],
  reviewFlags: [
    "disputed-reading", "recension-sensitive", "edition-numbering-sensitive",
    "accent-sensitive", "translation-sensitive", "reconstructed-text",
    "fragmentary-text", "historical-priority-claim",
    "scientific-correspondence-claim", "influence-or-transmission-claim",
    "medically-sensitive", "socially-contested", "source-gap",
    "citation-scheme", "medical-content",
  ],
  blockedOn: [
    "citation-scheme-resolution", "source-gap", "source-identity",
    "recension-resolution", "translation-resolution", "commentary-resolution",
    "editorial-decision", "other",
  ],
  archetype: [
    "big-question", "argument", "method", "mathematical-insight",
    "observation-of-nature", "explanatory-model", "language-about-language",
    "mind-and-experience", "society-and-decision-making",
    "commonly-misunderstood-idea",
  ],
  surpriseType: [
    "they-asked-this", "they-did-this", "i-misunderstood-this",
    "they-disagreed-about-this",
  ],
  connectionTypes: [
    "still-the-same-question", "conceptual-parallel", "historical-connection",
    "historical-continuity", "scientific-correspondence",
    "modern-interpretation", "contested-connection", "not-the-same-thing",
  ],
  reviewStates: ["pending", "provisional", "verified", "not-applicable"],
  claimRisk: ["low", "medium", "high"],
  passageScope: ["atomic", "short-sequence", "prose-section", "composite-excerpt"],
  translationType: ["none", "working", "editorial", "quoted-published"],
}

/** Entry statuses that source-gap material may never reach. */
export const GATED_STATUSES = [
  "source-verified", "editor-approved", "ready", "scheduled", "published",
]

/** Review flags that demand deeper verification before publication. */
export const HIGH_RISK_FLAGS = [
  "historical-priority-claim", "scientific-correspondence-claim",
  "influence-or-transmission-claim", "medically-sensitive", "medical-content",
  "socially-contested", "disputed-reading",
]

export const asList = (v) => (v == null ? [] : Array.isArray(v) ? v : [v])

/** `draft` is derived: false only once the note is published or revised. */
export const expectedDraft = (status) => !["published", "revised"].includes(status)

/** Section transclusions in a body: ![[target#Section]] */
export function transclusions(body) {
  const out = []
  const re = /!\[\[([^\]|#]+)(?:#([^\]|]+))?(?:\|[^\]]*)?\]\]/g
  let m
  while ((m = re.exec(body))) out.push({ target: m[1].trim(), section: m[2]?.trim() ?? null })
  return out
}

/** Plain wikilinks in a body: [[target|alias]] */
export function wikilinks(body) {
  const out = []
  const re = /(?<!!)\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|[^\]]*)?\]\]/g
  let m
  while ((m = re.exec(body))) out.push(m[1].trim())
  return out
}

export function hasHeading(body, heading) {
  const esc = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  return new RegExp(`^#{1,6}\\s+${esc}\\s*$`, "im").test(body)
}
