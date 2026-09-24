// Structural validation. Checks shape, references and vocabularies.
// It never judges whether content is intellectually good — that is editorial.

import {
  registries, notes, dossiers, entries, passages, VOCAB, GATED_STATUSES,
  HIGH_RISK_FLAGS, asList, expectedDraft, isISODate, transclusions,
  wikilinks, hasHeading,
} from "./repo.mjs"

const REQUIRED = {
  common: ["id", "type", "title", "status", "created", "updated"],
  passage: ["text_id", "locator", "locator_source", "source_record_ids", "original_language",
            "translation_status", "claim_risk"],
  entry: ["question", "primary_passage"],
  "deep-dive": ["question"],
  "research-dossier": ["id", "type", "title", "candidate_question", "status", "created", "updated"],
}

export function validate() {
  const errors = []
  const warnings = []
  const E = (where, msg) => errors.push({ where, msg })
  const W = (where, msg) => warnings.push({ where, msg })

  const { textById, sourceById } = registries()
  const all = [...notes(), ...dossiers()]
  const noteIds = new Map()

  // ---- per-note structural checks
  for (const n of all) {
    const at = n.path
    const d = n.data
    const isDossier = d.type === "research-dossier"

    if (n.parseError) { E(at, `frontmatter does not parse: ${n.parseError}`); continue }
    // Plain site pages (home, about) carry no `type`. They are pages, not
    // typed knowledge objects, and the note schema does not apply to them.
    if (!d.type && !n.path.startsWith("research/")) continue

    // required fields
    const req = isDossier ? REQUIRED["research-dossier"] : [...REQUIRED.common, ...(REQUIRED[d.type] ?? [])]
    for (const f of req) {
      if (d[f] === undefined || d[f] === null || d[f] === "") E(at, `missing required field \`${f}\``)
    }
    if (!d.type) continue

    // type must be known
    if (!isDossier && !VOCAB.noteTypes.includes(d.type)) E(at, `unknown note type \`${d.type}\``)

    // id uniqueness + filename agreement
    if (d.id) {
      if (noteIds.has(d.id)) E(at, `duplicate id \`${d.id}\` (also in ${noteIds.get(d.id)})`)
      else noteIds.set(d.id, n.path)
      if (d.id !== n.slug) E(at, `filename \`${n.slug}.md\` does not match id \`${d.id}\``)
    }

    // dates are quoted ISO strings
    for (const f of ["created", "updated", "publish_date"]) {
      if (d[f] == null) continue
      if (typeof d[f] !== "string") E(at, `\`${f}\` must be a quoted ISO string, got ${typeof d[f]} (${d[f]})`)
      else if (!isISODate(d[f])) E(at, `\`${f}\` is not a valid YYYY-MM-DD date: "${d[f]}"`)
    }
    // The quoting rule exists because parsers differ: `yaml` returns a bare
    // 2026-09-24 as a string, but js-yaml and PyYAML coerce it to a Date. So
    // check the raw source, not only the parsed value.
    const bare = /^(created|updated|publish_date):[ 	]*(\d{4}-\d{2}-\d{2})[ 	]*(?:#.*)?$/gm
    for (const b of (n.fmRaw ?? "").matchAll(bare)) {
      E(at, `\`${b[1]}\` is unquoted (${b[2]}) — write it as "${b[2]}"; bare dates parse to a Date in some parsers`)
    }
    if (d.locator != null && typeof d.locator !== "string") {
      E(at, `\`locator\` must be a quoted string, got ${typeof d.locator}`)
    }

    // lifecycle
    const lc = isDossier ? VOCAB.dossierLifecycle
      : ["entry", "deep-dive"].includes(d.type) ? VOCAB.editorialLifecycle
      : VOCAB.noteLifecycle
    if (d.status && !lc.includes(d.status)) E(at, `invalid status \`${d.status}\` for type ${d.type}`)

    // controlled vocabularies
    const vocabChecks = [
      ["review_flags", VOCAB.reviewFlags], ["blocked_on", VOCAB.blockedOn],
      ["archetype", VOCAB.archetype], ["surprise_type", VOCAB.surpriseType],
      ["connection_types", VOCAB.connectionTypes],
    ]
    for (const [field, vocab] of vocabChecks) {
      for (const v of asList(d[field])) if (!vocab.includes(v)) E(at, `invalid ${field} value \`${v}\``)
    }
    for (const f of ["translation_status", "translation_review", "citation_review"]) {
      if (d[f] && !VOCAB.reviewStates.includes(d[f])) E(at, `invalid ${f} \`${d[f]}\``)
    }
    if (d.claim_risk && !VOCAB.claimRisk.includes(d.claim_risk)) E(at, `invalid claim_risk \`${d.claim_risk}\``)
    if (d.passage_scope && !VOCAB.passageScope.includes(d.passage_scope)) E(at, `invalid passage_scope \`${d.passage_scope}\``)
    if (d.translation_type && !VOCAB.translationType.includes(d.translation_type)) E(at, `invalid translation_type \`${d.translation_type}\``)

    // draft consistency (public notes only; dossiers are never Quartz-visible)
    if (!isDossier) {
      const want = expectedDraft(d.status)
      if (d.draft === undefined) E(at, "missing `draft` field")
      else if (d.draft !== want) E(at, `draft is ${d.draft} but status \`${d.status}\` requires draft: ${want}`)
    } else if ("draft" in d) {
      E(at, "a research dossier must not carry a `draft` field")
    }

    // corpus + source references
    for (const t of [...(d.text_id ? [d.text_id] : []), ...(isDossier ? asList(d.text_ids) : [])]) {
      if (!textById.has(t)) E(at, `corpus id \`${t}\` is not in data/corpus.yaml`)
    }
    const srcFields = ["source_record_ids", "inspected_source_record_ids"]
    for (const f of srcFields) for (const r of asList(d[f])) {
      if (!sourceById.has(r)) E(at, `${f}: source record \`${r}\` is not in data/sources.yaml`)
    }
    if (d.locator_source && !sourceById.has(d.locator_source)) {
      E(at, `locator_source \`${d.locator_source}\` is not in data/sources.yaml`)
    }
    const inspected = asList(d.inspected_source_record_ids)
    if (inspected.length) {
      const pool = asList(d.source_record_ids)
      for (const r of inspected) {
        if (!pool.includes(r)) E(at, `inspected_source_record_ids: \`${r}\` is not in source_record_ids`)
      }
    }
    if (d.locator_source && asList(d.source_record_ids).length && asList(d.source_record_ids)[0] !== d.locator_source) {
      W(at, "locator_source is conventionally listed first in source_record_ids")
    }

    // transclusion + wikilink targets
    for (const { target, section } of transclusions(n.body)) {
      const t = all.find((x) => x.slug === target || x.data.id === target)
      if (!t) { E(at, `transclusion target \`${target}\` does not exist`); continue }
      if (section && !hasHeading(t.body, section)) {
        E(at, `transclusion \`${target}#${section}\`: no such heading in ${t.path}`)
      }
    }
    for (const target of wikilinks(n.body)) {
      if (!all.some((x) => x.slug === target || x.data.id === target)) {
        E(at, `wikilink \`[[${target}]]\` has no target note`)
      }
    }
  }

  // ---- passage-specific: source-gap discipline
  for (const ps of passages()) {
    const at = ps.path, d = ps.data
    const rec = textById.get(d.text_id)
    if (!rec) continue
    const flags = asList(d.review_flags)
    if (rec.source_status === "source-gap") {
      if (!flags.includes("source-gap")) {
        E(at, `parent corpus text \`${d.text_id}\` is source-gap; passage must carry the \`source-gap\` review flag`)
      }
      if (!["pending", "provisional"].includes(d.translation_status)) {
        E(at, `source-gap passage may not hold translation_status \`${d.translation_status}\` (cap: provisional)`)
      }
      if (["published", "revised"].includes(d.status)) E(at, "a source-gap passage may not be published")
    }
    if (!asList(d.inspected_source_record_ids).length && d.status !== "stub") {
      W(at, "no `inspected_source_record_ids` — record which source was actually opened")
    }
  }

  // ---- entry-specific: passage resolution + publication gates
  const byDate = new Map()
  for (const en of entries()) {
    const at = en.path, d = en.data
    const ps = passages().find((x) => x.data.id === d.primary_passage || x.slug === d.primary_passage)
    if (d.primary_passage && !ps) {
      E(at, `primary_passage \`${d.primary_passage}\` does not resolve to a passage note`)
    }

    // the entry must transclude, not restate
    if (ps && !transclusions(en.body).some((t) => t.target === ps.slug)) {
      W(at, `does not transclude its primary passage \`${ps.slug}\``)
    }
    if (/[ऀ-ॿ]/.test(en.body)) {
      W(at, "entry body contains Devanagari — original text belongs in the passage note")
    }
    if (/^##\s+Original\s*$/im.test(en.body)) {
      E(at, "entry declares its own `## Original` heading; the transcluded passage supplies it")
    }

    // source-gap gate (cross-file invariant)
    if (ps) {
      const rec = textById.get(ps.data.text_id)
      const gapped = rec?.source_status === "source-gap" || asList(ps.data.review_flags).includes("source-gap")
      if (gapped && GATED_STATUSES.includes(d.status)) {
        E(at, `primary passage carries an unresolved source-gap; status \`${d.status}\` is gated`)
      }
    }

    // scheduling
    if (d.status === "scheduled" && !d.publish_date) {
      E(at, "status is `scheduled` but there is no publish_date")
    }
    if (["published", "revised"].includes(d.status) && !d.publish_date) {
      E(at, `status is \`${d.status}\` but there is no publish_date`)
    }
    if (d.publish_date && isISODate(d.publish_date)) {
      if (!byDate.has(d.publish_date)) byDate.set(d.publish_date, [])
      byDate.get(d.publish_date).push(d.id)
    }
    if (d.connection_types && !/^##\s+Connect\s*$/im.test(en.body)) {
      W(at, "declares connection_types but has no `## Connect` section")
    }
    if (ps) {
      const risky = asList(ps.data.review_flags).filter((f) => HIGH_RISK_FLAGS.includes(f))
      const unresolved = ps.data.claim_risk === "high" &&
        ["pending", "provisional"].includes(ps.data.translation_status)
      if (risky.length && unresolved && GATED_STATUSES.includes(d.status)) {
        W(at, `primary passage is high-risk (${risky.join(", ")}) with translation_status \`${ps.data.translation_status}\``)
      }
    }
  }

  const perDay = 1
  for (const [date, ids] of byDate) {
    if (ids.length > perDay) W("schedule", `${date} has ${ids.length} entries: ${ids.join(", ")}`)
  }

  // ---- dossier-specific
  for (const ds of dossiers()) {
    const at = ds.path, d = ds.data
    if (asList(d.blocked_on).length && !["researching", "parked", "evidence-collected", "candidate"].includes(d.status)) {
      W(at, `blocked_on is set but status is \`${d.status}\``)
    }
    if (d.status === "converted" && !d.target_entry && !d.target_deep_dive) {
      W(at, "status is `converted` but no target_entry or target_deep_dive is recorded")
    }
    if (d.target_entry && !entries().some((e) => e.data.id === d.target_entry)) {
      E(at, `target_entry \`${d.target_entry}\` does not resolve to an entry`)
    }
    for (const pid of asList(d.passage_ids)) {
      if (!passages().some((x) => x.data.id === pid)) W(at, `passage_ids: \`${pid}\` does not exist yet`)
    }
    for (const u of asList(d.sources_consulted_unregistered)) {
      if (typeof u !== "object") E(at, "sources_consulted_unregistered entries must be mappings")
    }
  }

  return { errors, warnings }
}
