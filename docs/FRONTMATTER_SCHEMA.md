# Frontmatter Schema

Field-by-field reference for the ten note types. See `CONTENT_MODEL.md` for
what each type is *for*.

Legend: **R** required · **O** optional · **G** generated, do not hand-maintain

## Conventions

- All notes use YAML frontmatter.
- **All dates are quoted ISO strings** — `created: "2026-09-22"`, not
  `created: 2026-09-22`. YAML would otherwise parse the bare form into a
  native date object, and what a note carries then depends on the parser
  rather than on the file. Quoting keeps `created`, `updated` and
  `publish_date` as strings everywhere, so comparison, sorting and
  round-tripping behave identically in the CLI, in Quartz and in any
  script. Do not rely on YAML automatic date parsing.
- IDs are lowercase ASCII kebab-case, stable after creation. Changing a
  display title must never require changing an ID.
- **Two ID spaces, distinguished by field name, never by prefix.**
  `corpus_id` and `passage.text_id` resolve against `data/corpus.yaml`;
  every other relationship field resolves against note IDs in `/content`.
  Prefixes such as `corpus:` or `note:` are forbidden.
- Note IDs must be **globally unique across all ten public types and across
  private research dossiers** — not just within a folder, and with no
  separate dossier namespace. The Stage 3 CLI enforces this.
- Passage IDs follow `<text-short-id>-<locator>`, with the recension
  included where materially necessary (`isha-kanva-1`). They never name a
  source record, edition or authority. See `CONTENT_MODEL.md`.
- List fields hold IDs, not filenames and not titles.
- Omit an optional field rather than leaving it empty, except in templates.
- `draft` is present for Quartz and is derived from `status`
  (`draft: false` only when status is `published` or `revised`).

## Common fields

Every note type carries these.

| Field | R/O | Type | Notes |
|---|---|---|---|
| `id` | R | string | kebab-case, unique across all notes |
| `type` | R | enum | one of the ten note types |
| `title` | R | string | display title; may change freely |
| `status` | R | enum | see lifecycles below |
| `created` | R | string | quoted ISO `"YYYY-MM-DD"` |
| `updated` | R | string | quoted ISO `"YYYY-MM-DD"` |
| `draft` | G | bool | derived from `status` |

## Controlled vocabularies

### Note lifecycle
`text`, `passage`, `concept`, `person`, `tradition`, `discipline`, `pathway`, `source-note`

`stub` · `drafted` · `in-review` · `published` · `revised`

### Editorial lifecycle
`entry`, `deep-dive`

`candidate` · `researching` · `source-verified` · `drafted` · `red-teamed` ·
`editor-approved` · `ready` · `scheduled` · `published` · `revised`

### archetype
`big-question` · `argument` · `method` · `mathematical-insight` ·
`observation-of-nature` · `explanatory-model` · `language-about-language` ·
`mind-and-experience` · `society-and-decision-making` ·
`commonly-misunderstood-idea`

### surprise_type
`they-asked-this` · `they-did-this` · `i-misunderstood-this` ·
`they-disagreed-about-this`

### connection_types
`still-the-same-question` · `conceptual-parallel` · `historical-connection` ·
`historical-continuity` · `scientific-correspondence` ·
`modern-interpretation` · `contested-connection` · `not-the-same-thing`

### claim_risk
`low` · `medium` · `high`

How much verification a passage is likely to need. Not a quality score.

On a **research dossier** the field means something slightly different and
coarser: it is the **maximum overall editorial risk of the proposed piece**,
not an average and not a per-claim value. A dossier containing one high-risk
medical claim and eight safe textual ones is `high`.

Individual claims within a dossier may vary substantially in risk, and the
**Claim Audit is authoritative at claim level**. `claim_risk` is a triage
signal for deciding how much scrutiny the piece needs; the Claim Audit is
where the actual per-claim confidence, caveat and safe wording live. There
is deliberately **no per-claim frontmatter** — claims are prose rows in the
audit table, not structured fields.

### review_flags
`disputed-reading` · `recension-sensitive` · `edition-numbering-sensitive` ·
`accent-sensitive` · `translation-sensitive` · `reconstructed-text` ·
`fragmentary-text` · `historical-priority-claim` ·
`scientific-correspondence-claim` · `influence-or-transmission-claim` ·
`medically-sensitive` · `socially-contested` · `source-gap` ·
`citation-scheme` · `medical-content`

These mirror the escalation triggers in `SOURCE_POLICY.md`. A flag means the
editorial pass must do more work here, not that the passage is unusable.
`source-gap` is **mandatory** on any passage whose parent corpus record has
`source_status: source-gap`.

Two of these are close neighbours and are kept distinct on purpose:

- `edition-numbering-sensitive` — the numbering *differs between editions*,
  but we know which edition we are following and can cite it.
- `citation-scheme` — the citation scheme for the text is **itself
  unsettled**, so no locator can yet be stated with confidence. This is the
  note-level counterpart of `citation_scheme_review: true` in
  `data/corpus.yaml`.

- `medically-sensitive` — the material touches health and needs careful
  wording.
- `medical-content` — the note *is* historical medical material, and every
  derived piece must carry the standing distinction between historical
  medical theory and present-day medical advice, per `AGENTS.md` and
  `CLAIM_POLICY.md`.

### passage_scope
`atomic` · `short-sequence` · `prose-section` · `composite-excerpt`

How much text the passage holds. Default `atomic`. Prefer smaller reusable
units; use `composite-excerpt` only where materially useful. See
`CONTENT_MODEL.md` for the granularity rule.

### translation_type
`none` · `working` · `editorial` · `quoted-published`

`working` is a literal rendering for internal use; `editorial` is a readable
rendering for publication; `quoted-published` is someone else's translation
and requires `translation_source` and attention to copyright.

### review states
`pending` · `provisional` · `verified` · `not-applicable`

Used by `translation_status`, `citation_review` and `translation_review`.

`provisional` means a rendering exists but rests on evidence not yet
adequate to stand behind — the required ceiling for any passage drawn from a
`source-gap` text.

### historicity_status
`historically-attested` · `traditionally-attributed` · `composite-or-disputed` ·
`uncertain`

---

## text

`content/texts/` — reader-facing page for one approved Corpus v1 work.

| Field | R/O | Type | Notes |
|---|---|---|---|
| common fields | R | | |
| `corpus_id` | R | string | **must resolve to an approved id in `data/corpus.yaml`** |
| `display_title` | O | string | short form for cards and navigation |
| `title_original` | O | string | script form, where the registry has one |
| `transliteration` | O | string | IAST |
| `tradition` | O | list | tradition IDs |
| `discipline` | O | list | discipline IDs |
| `related_texts` | O | list | text note IDs |
| `parent_text` | O | string | text note ID, where the work sits inside another |
| `featured` | O | bool | |
| `family` | G | string | from the registry; do not hand-maintain |
| `passages` | G | list | passages whose `text_id` is this work |
| `entries` | G | list | entries citing this work |

Do not copy `shakha`, `recension`, `citation_scheme`, `source_status` or
scope notes into this note. Read them from the registry.

Body: What is this text? · Why it matters · Major ideas · Structure ·
Key passages · Related concepts · Source and edition notes

---

## passage

`content/passages/` — the atomic evidence object.

| Field | R/O | Type | Notes |
|---|---|---|---|
| common fields | R | | |
| `text_id` | R | string | approved corpus id, **not** the text note id |
| `locator` | R | string | e.g. `"1.1.1"`; quote it so YAML keeps it a string |
| `locator_source` | R | string | source_record_id whose numbering `locator` follows |
| `source_record_ids` | R | list | registered source records relevant to this passage; `locator_source` first |
| `inspected_source_record_ids` | O | list | subset actually opened and read; see below |
| `original_language` | R | enum | `sanskrit` · `malayalam` |
| `original_script` | O | enum | `devanagari` · `iast` · `malayalam` |
| `passage_scope` | O | enum | default `atomic`; see vocabulary |
| `recension` | O | string | required where the text has more than one |
| `translation_status` | R | enum | same values as review states |
| `translation_type` | O | enum | see vocabulary |
| `translation_source` | O | string | required when type is `quoted-published` |
| `translation_review` | O | enum | review state |
| `citation_review` | O | enum | review state |
| `claim_risk` | R | enum | `low` · `medium` · `high` |
| `review_flags` | O | list | controlled; see vocabulary |
| `concepts` | O | list | concept IDs |
| `used_in` | G | list | entries and deep-dives citing this passage |

**`locator_source` is required, not optional.** A locator without its edition
is ambiguous wherever critical and received texts diverge, which is most of
the corpus.

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

**`text_id` resolves against `data/corpus.yaml`, not against a `text` note.**
A passage may exist for any approved corpus text whether or not a public text
note has been written.

**If the parent corpus record is `source-gap`**, the passage must carry
`source-gap` in `review_flags`, keep `translation_status` at `provisional` or
weaker, stay unpublished, and never reach `source-verified`.

Long original text belongs in the body, not frontmatter.

Body headings, in order:

```
## Original
## Transliteration
## Working Translation
## Literal Notes
## Traditional Interpretation
## Scholarly Notes
## Claim Notes
## Related Concepts
## Used In
```

`## Claim Notes` records which claim class each statement belongs to —
TEXTUAL, COMMENTARIAL, HISTORICAL, MODERN, EDITORIAL or CONTESTED — per
`CLAIM_POLICY.md`.

---

## concept

`content/concepts/`

| Field | R/O | Type | Notes |
|---|---|---|---|
| common fields | R | | |
| `original_term` | O | string | e.g. `pramāṇa` |
| `language` | O | string | |
| `traditions` | O | list | tradition IDs |
| `disciplines` | O | list | discipline IDs |
| `related_concepts` | O | list | concept IDs |
| `key_passages` | O | list | passage IDs |
| `entries` | G | list | |

Body: What it means · Across traditions · Key passages · Disagreements ·
Modern connections

The *Across traditions* and *Disagreements* sections are structural, not
decorative: a concept must not be presented through one school's reading.

---

## person

`content/people/`

| Field | R/O | Type | Notes |
|---|---|---|---|
| common fields | R | | |
| `display_name` | O | string | |
| `name_original` | O | string | |
| `roles` | O | list | e.g. `author`, `commentator`, `compiler`, `attributed-figure` |
| `traditions` | O | list | tradition IDs |
| `disciplines` | O | list | discipline IDs |
| `related_texts` | O | list | text note IDs |
| `historicity_status` | R | enum | see vocabulary |

`historicity_status` is required precisely because several corpus records
carry traditional attributions that must not harden into historical fact.

Body: Who · What they wrote · Position and arguments · What is attributed
versus established · Related texts

---

## tradition

`content/traditions/`

| Field | R/O | Type | Notes |
|---|---|---|---|
| common fields | R | | |
| `parent_tradition` | O | string | tradition ID; omit where overlap is real |
| `related_traditions` | O | list | tradition IDs |
| `key_texts` | O | list | text note IDs |
| `key_people` | O | list | person IDs |
| `disciplines` | O | list | discipline IDs |

Prefer `related_traditions` to a forced `parent_tradition` where traditions
overlap rather than nest.

Body: What it is · Core commitments · Key texts · Key figures · Disagreements
within and beyond

---

## discipline

`content/disciplines/`

| Field | R/O | Type | Notes |
|---|---|---|---|
| common fields | R | | |
| `related_texts` | O | list | text note IDs |
| `related_concepts` | O | list | concept IDs |
| `related_traditions` | O | list | tradition IDs |

Body: What it covers · How it was practised · Key texts · Key ideas

---

## entry

`content/entries/` — the daily editorial object.

| Field | R/O | Type | Notes |
|---|---|---|---|
| common fields | R | | `status` uses the **editorial** lifecycle |
| `question` | R | string | the hook, as a question |
| `primary_passage` | R | string | passage ID |
| `publish_date` | O→R | string | optional before `scheduled`, required from `scheduled`; not unique at schema level, but the scheduler warns on a collision and needs an explicit override |
| `secondary_passages` | O | list | passage IDs |
| `text_ids` | O | list | text note IDs |
| `concepts` | O | list | concept IDs |
| `people` | O | list | person IDs |
| `traditions` | O | list | tradition IDs |
| `disciplines` | O | list | discipline IDs |
| `archetype` | O | list | controlled; one or more |
| `surprise_type` | O | list | controlled; one or more |
| `connection_types` | O | list | controlled; **required if the entry makes a modern connection** |
| `featured` | O | bool | |
| `reading_time` | G | number | estimated from body |

Body:

```
# <question or hook>          ← Discover
<!-- Original -->              ← transclusion; NO `## Original` heading here
## Understand
## Perspectives
## Connect
## Explore
```

The Original stage is a section transclusion of the primary passage, and the
canonical pattern is:

```markdown
<!-- Original -->
![[<passage-file-id>#Original]]
```

**The entry must not declare its own `## Original` heading.** The passage
owns that heading and Quartz inlines it with the transcluded content, so a
second one renders "Original" twice and emits a duplicate `id="original"`.
The comment marks the section; the rendered heading comes from the passage.
The passage's `## Original` is not renamed — see `CONTENT_MODEL.md`.

The CLI resolves the stable passage ID to the note file when writing this.
Editors do not paste source text into entries.

Not every section needs length, and one may be dropped if genuinely
unnecessary. `## Connect` is optional — `EDITORIAL_STANDARD.md` is explicit
that a modern connection must never be invented to make an entry feel
relevant. When present, every connection must carry a `connection_types`
value.

**Status gate.** While the entry's `primary_passage` carries an unresolved
`source-gap` flag, the entry may not enter `source-verified`,
`editor-approved`, `ready`, `scheduled` or `published`.

`## Explore` offers roughly three to five links of differing kinds: Read,
Understand, Perspective, Compare, Modern, Listen, See.

---

## deep-dive

`content/deep-dives/`

| Field | R/O | Type | Notes |
|---|---|---|---|
| common fields | R | | `status` uses the **editorial** lifecycle |
| `question` | R | string | the one question this answers |
| `passages` | O | list | passage IDs |
| `texts` | O | list | text note IDs |
| `concepts` | O | list | concept IDs |
| `people` | O | list | person IDs |
| `traditions` | O | list | tradition IDs |
| `disciplines` | O | list | discipline IDs |
| `connection_types` | O | list | controlled |
| `publish_date` | O | string | quoted ISO `"YYYY-MM-DD"` |
| `featured` | O | bool | |

Body: The question · What the sources say · How it was argued · Where
scholars disagree · What we can and cannot conclude · Further reading

---

## pathway

`content/pathways/`

| Field | R/O | Type | Notes |
|---|---|---|---|
| common fields | R | | |
| `description` | R | string | one sentence on who this is for |
| `items` | R | list | **ordered** note IDs |
| `estimated_time` | O | string | |
| `featured` | O | bool | |

`items` is ordered and may mix types — an entry, then a passage, then a
deep-dive. A pathway curates; it does not restate. If it starts explaining at
length, that material belongs in a deep-dive.

Body: Who this is for · What you will see · The path (annotated) ·
Where to go next

---

## source-note

`content/sources/`

| Field | R/O | Type | Notes |
|---|---|---|---|
| common fields | R | | |
| `source_record_id` | O | string | must resolve in `data/sources.yaml` |
| `related_texts` | O | list | text note IDs |
| `related_source_records` | O | list | source_record_ids |

`source_record_id` is optional because some notes explain a *problem across
several sources* — the critical-versus-vulgate question, for instance — which
no single record owns. Such a note uses `related_source_records` instead.

Created sparingly: only where an edition or transmission problem genuinely
needs a page.

Body: What this source is · What it represents · Why it matters · What to
watch for · How to cite it

---

## Reserved and forbidden

- **Do not** add `shakha`, `veda`, `citation_scheme`, `source_status` or
  other registry fields to notes. Read them from `data/corpus.yaml`.
- **Do not** hand-maintain any field marked **G**.
- **Do not** introduce free-text values where a vocabulary above exists.
- **Do not** use filenames as identity. `id` is the identity layer.
