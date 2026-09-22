# Research Dossier

The working evidence pack that turns a candidate idea into a reliable entry
or deep dive.

## Private, always

Dossiers live in **`research/dossiers/`**. They are never published by
Quartz, which reads only `/content`, and `docs/PUBLICATION_BOUNDARY.md`
already places `/research` outside the publication boundary.

A dossier is **not** an eleventh public note type. It does not appear in
`CONTENT_MODEL.md`'s ten types, and nothing in it is authoritative merely
because it exists in the repository — `AGENTS.md` is explicit on that point.

### Why it exists

Research is messy. Sources conflict, readings are disputed, a promising
connection collapses on inspection, and a good idea often arrives before its
evidence does.

Public content cannot be messy. Entries must state what is known, attribute
what is argued, and stay silent where the evidence does not reach.

The dossier is where the mess is allowed to live. **A dossier may be
provisional, contradictory and wrong.** Giving that material a legitimate
home is what stops it being quietly smuggled into an entry — and it means an
idea can be worked on for weeks without anything half-formed touching
`/content`.

## Lifecycle

Private, and separate from the public editorial lifecycle:

```
candidate → researching → evidence-collected → ready-for-draft → converted
                                             ↘ rejected
                                             ↘ parked
```

| Status | Meaning |
|---|---|
| `candidate` | An idea worth looking at. Nothing verified. |
| `researching` | Actively gathering sources and readings. |
| `evidence-collected` | The evidence is assembled; the claim audit is not yet settled. |
| `ready-for-draft` | Evidence and claim audit are sound enough to draft from. |
| `converted` | Its research has been used to create an entry or deep dive. |
| `rejected` | Will not become content. Keep it, with the reason. |
| `parked` | Genuinely interesting, blocked on something — usually a source gap. |

**`converted` is not publication.** It means the research fed a draft. What
happens to that draft is governed by the public editorial lifecycle, which
runs its own course through `red-teamed` and `editor-approved`.

`rejected` dossiers are kept, not deleted. A recorded dead end stops the same
idea being researched again in six months.

## Body structure

```
# Research Question
# Why This Might Be Interesting
# Primary Text Evidence
  ## Passage Candidates
  ## Source / Edition Notes
# Traditional Perspectives
# Scholarly Perspectives
# Modern Connection
# Claim Audit
# Counterevidence / Disagreement
# What We Should Not Say
# Entry Direction
# Open Questions
# Editor Decision
```

Working material, not polished prose. Bullet points, quotations, half-formed
objections and pasted references are all appropriate.

Three sections carry most of the weight:

**Claim Audit** — the heart of the dossier. See below.

**Counterevidence / Disagreement** — what argues against the reading. A
dossier with nothing here has usually not been researched, only assembled.

**What We Should Not Say** — the specific sentences the entry must avoid.
This is where an overreaching formulation gets killed before it reaches a
draft, and it is the most directly useful section when the entry is written.

## Claim Audit

For each claim that matters, capture:

| Field | What it records |
|---|---|
| claim | The assertion, stated plainly |
| claim type | TEXTUAL · COMMENTARIAL · HISTORICAL · MODERN · EDITORIAL · CONTESTED |
| supporting evidence | Passage, source record, or scholarly reference |
| confidence | How well the evidence actually supports it |
| caveat | Where it breaks down, or what it does not establish |
| safe wording | A formulation the entry can use as-is |

The claim classes are those of `CLAIM_POLICY.md` and must not be blurred.
The commonest failure is an EDITORIAL bridge presented as TEXTUAL — the text
said something, and we have quietly extended it.

### Claims needing stronger evidence

Per `CLAIM_POLICY.md` and `SOURCE_POLICY.md`, these require more work at
dossier stage, not at draft stage:

- scientific correspondence
- medical claims
- historical priority — first, earliest, invented, discovered
- influence or transmission
- controversial social or legal passages
- disputed readings and materially divergent recensions
- fragmentary or reconstructed texts

For `scientific-correspondence` specifically, the eight-question test in
`CLAIM_POLICY.md` should be answered in the dossier. If it cannot be, the
connection is downgraded to a weaker relationship type — that is a normal
outcome, not a failure.

Some ideas have **no** legitimate modern connection. `EDITORIAL_STANDARD.md`
says that is acceptable. Record it and move on; do not manufacture one.

## Frontmatter

```yaml
id: ""
type: research-dossier
title: ""
status: candidate
created: ""                        # quoted ISO string, e.g. "2026-09-22"
updated: ""                        # quoted ISO string

candidate_question: ""

target_entry: ""
target_deep_dive: ""

text_ids: []
passage_ids: []
source_record_ids: []
inspected_source_record_ids: []

concepts: []
people: []
traditions: []
disciplines: []

archetype: []
surprise_type: []
connection_types: []

claim_risk: low
review_flags: []

blocked_on: []
research_gaps: []
sources_consulted_unregistered: []

editorial_decision: ""
```

| Field | R/O | Notes |
|---|---|---|
| `id` | R | kebab-case; unique among dossiers |
| `type` | R | always `research-dossier` |
| `title` | R | working title; may be rough |
| `status` | R | dossier lifecycle above |
| `created`, `updated` | R | ISO `YYYY-MM-DD` |
| `candidate_question` | R | the question being investigated |
| `target_entry` | O | entry note ID, once one exists |
| `target_deep_dive` | O | deep-dive note ID, once one exists |
| `text_ids` | O | **corpus IDs** from `data/corpus.yaml` |
| `passage_ids` | O | passage note IDs created or needed |
| `source_record_ids` | O | registered source records relevant to this research |
| `inspected_source_record_ids` | O | subset actually opened and read; see below |
| `concepts`, `people`, `traditions`, `disciplines` | O | note IDs |
| `archetype`, `surprise_type`, `connection_types` | O | the public controlled vocabularies |
| `claim_risk` | O | `low` · `medium` · `high` — the **maximum** risk of the proposed piece; see below |
| `review_flags` | O | the public `review_flags` vocabulary |
| `blocked_on` | O | controlled; why progress has actually stopped. See below |
| `research_gaps` | O | short factual statements of what is not yet known |
| `sources_consulted_unregistered` | O | useful material consulted that is not a registered source record |
| `editorial_decision` | O | the editor's ruling, in their words |

Vocabularies are shared with the public schema in `FRONTMATTER_SCHEMA.md` so
that a dossier's findings transfer to an entry without translation. Not every
optional field needs a value, and an early dossier will have almost none.

There is no `draft` field: dossiers are outside `/content` and Quartz never
sees them.

`text_ids` holds corpus IDs, consistent with `passage.text_id`. Every other
list holds note IDs.

**Dates are quoted ISO strings** — `created: "2026-09-22"`, never the bare
form. See `FRONTMATTER_SCHEMA.md`; the rule is the same for dossiers as for
public notes, and for the same reason.

### `inspected_source_record_ids`

`source_record_ids` records the registered sources **relevant** to the object.
`inspected_source_record_ids` is the subset of those that were **actually
opened and read** during the current evidence work.

Rules:

- Every ID here must also appear in `source_record_ids`. It is a subset,
  never an independent list.
- An **edition anchor may appear in `source_record_ids` without appearing
  here.** That is the normal case: the anchor is the registered edition the
  numbering belongs to, and citing it is not the same as having checked its
  page.
- **Absence does not mean the source is weak.** It means only that this
  workflow did not directly examine it. A printed critical edition that
  nobody has opened is still the strongest source in the chain.
- This is **provenance and audit metadata, not reader-facing content.** It
  answers "what did we actually look at?" for a later reviewer. It is not a
  quality ranking and must not be rendered as one.

The distinction exists because `SOURCE_POLICY.md` requires recording *which
source was actually used and what its limits are*, and a single list cannot
carry both "this is the registered edition" and "this is what we read".
Before this field existed, the first real conversion had to state that
difference in prose.

On a dossier this field carries the research history rather than a note's
evidence chain: it is what was genuinely read while the dossier was being
built. Keeping it honest is what makes `research_gaps` meaningful — a source
listed as relevant but never inspected is precisely the kind of thing a gap
should name.

### `blocked_on`

Records **why progress has actually stopped**, as a list from a controlled
vocabulary:

| Value | Meaning |
|---|---|
| `citation-scheme-resolution` | No locator can be stated until the text's numbering is settled against an edition |
| `source-gap` | The parent corpus record is `source-gap`; the evidence is not there yet |
| `source-identity` | We are unsure which witness, edition or recension a reading actually comes from |
| `recension-resolution` | The passage differs materially across recensions and we have not chosen |
| `translation-resolution` | The rendering turns on a term or construction we have not resolved |
| `commentary-resolution` | The reading depends on a commentator we have named but not read |
| `editorial-decision` | Waiting on the human editor; pairs with `editorial_decision` |
| `other` | Genuinely something else — say what, in **Open Questions** |

**Use it only when progress is actually blocked.** A dossier that could be
advanced by doing more of the same research is not blocked; it is
unfinished, and that belongs in `research_gaps` or **Open Questions**.
`blocked_on` means the next step is unavailable, not merely undone.

The commonest consequence is that **no passage note can be created**. If the
locator is unresolved, a passage ID cannot be minted — the convention is
`<text-short-id>-<locator>`, and inventing a locator would bake an unverified
claim into a permanent identifier. In that case `passage_ids` stays empty and
`blocked_on` carries `citation-scheme-resolution`.

`blocked_on` and `status` are independent. A dossier may be `researching` and
blocked, or `evidence-collected` and blocked on an editorial decision. A
dossier blocked *only* by a source gap belongs at `parked`.

### `research_gaps`

Short factual statements of **what we looked for and did not find**, or what
we are assuming without having checked. One line each.

```yaml
research_gaps:
  - "No inspected source yet supports rendering the Kena term directly as 'consciousness'."
  - "Need an edition-backed resolution of Baudhayana numbering 1.12 vs 1.48."
```

This exists because a negative research result is a real result and is
otherwise lost. It covers:

- **failed searches** — we looked, it was not there;
- **unresolved evidence** — sources conflict and we have not settled it;
- **missing scholarship** — nobody appears to have treated this;
- **unverified assumptions** — we are relying on something unchecked.

It is **not** a general notes field. Discussion, reasoning and next steps go
in the body sections; `research_gaps` holds only the gap itself, stated
flatly enough to be read as a checklist.

A recorded gap also protects the entry: it is the standing reason a
particular formulation may not be used, and it survives the dossier being
picked up months later by someone who does not remember the search.

### `sources_consulted_unregistered`

Material that genuinely informed the research but is **not** a registered
canonical source record in `data/sources.yaml`.

```yaml
sources_consulted_unregistered:
  - title: "Applied Geometry of the Sulba Sutras"
    author: "John F. Price"
    year: "2018"
    publication: "University of Hyderabad, Sanskrit Studies"
    url: "https://sanskrit.uohyd.ac.in/..."
    use: "Secondary; identifies sutra 48 as the diagonal statement."
```

All keys are optional; record what is known and omit the rest. `use` should
say in one line what the item was actually used for.

This matters because the two roles are different:

- these sources may inform **scholarship, context and framing**;
- they do **not** become canonical textual witnesses, and agreement with one
  is not attestation of a reading.

Nothing here is a registered source. Listing an item in this field does not
propose it for `data/sources.yaml`, and it must never be cited in public
content as though it were a primary witness. Promoting anything to a source
record is a separate, deliberate act governed by `SOURCE_POLICY.md`, and
`AGENTS.md` reserves approval of a new canonical source to the human editor.

### `claim_risk` at dossier level

Dossier-level `claim_risk` is the **maximum overall editorial risk of the
proposed piece** — not an average, and not a per-claim value. One high-risk
medical or priority claim makes the whole dossier `high`, however safe the
rest of it is.

Individual claims may vary substantially in risk, and the **Claim Audit
remains authoritative at claim level**. `claim_risk` is triage: it says how
much scrutiny the piece needs. The audit says which sentence is the dangerous
one.

There is deliberately **no per-claim frontmatter**. Claims are rows of prose
in the Claim Audit, where confidence, caveat and safe wording can be stated
in the terms the evidence actually requires. Structuring them into YAML would
buy queryability at the cost of the nuance that makes the audit work.

## Who does what

Per `AGENTS.md`.

**AI may** surface candidate passages, gather sources, summarise
commentaries, compare translations, identify disagreements, draft the
dossier, red-team the proposed claims, and draft the resulting entry.

**AI may not** mark anything `editor-approved`, publish, resolve a serious
scholarly disagreement as settled fact, or treat a `source-gap` text as
reliably evidenced without actual sourcing.

**The human editor decides** whether the idea is worth publishing, where the
interpretive emphasis falls, how strongly a modern connection may be put,
the final wording, and publication approval.

`editorial_decision` is the editor's field. AI drafts everything around it
and leaves it alone.

## Source gaps

A dossier is exactly where a `source-gap` text may be worked on. Passages
created from one stay unpublished, flagged `source-gap`, and capped at
`provisional` translation status, per `CONTENT_MODEL.md`.

A dossier blocked only by a source gap belongs at `parked`, with
`blocked_on: [source-gap]`, the missing source named in **Open Questions**,
and the shortfall stated flatly in `research_gaps`. That is a research task,
not a dead end.
