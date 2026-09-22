# Content Model

How Indic Knowledge organises Markdown notes.

This document explains the note types, what each is for, how they relate, and
which fields are maintained by hand versus generated. `FRONTMATTER_SCHEMA.md`
holds the field-by-field tables.

## Scope

This model governs `/content` only. It does not replace the registries:

- `data/corpus.yaml` remains the authoritative record of which texts are
  approved and what their bibliographic metadata is.
- `data/sources.yaml` remains the authoritative record of witnesses,
  editions and their limitations.

A note in `/content` **references** a registry record by ID. It never
duplicates it. Where a note and a registry disagree, the registry wins.

## Identifiers

Two ID spaces exist. **The field name determines which one applies** — there
are no prefixes, and none may be introduced. `corpus:`, `note:` and
`passage:` are all forbidden.

### Corpus IDs

Canonical identifiers of approved works, defined in `data/corpus.yaml`.

Resolved against the registry by: `corpus_id` (on a `text` note) and
`text_id` (on a `passage`).

### Note IDs

Stable identifiers for Markdown notes. Resolved against `/content` by every
other relationship field: `primary_passage`, `concepts`, `related_texts`,
`items`, and so on.

Note IDs must eventually be **globally unique across all ten public note
types** — not merely unique within a folder. Stage 3A adds no enforcement;
the Stage 3 CLI will validate uniqueness across the whole of `/content`.

### Passage IDs

Passage note IDs are ordinary note IDs. That they identify evidence objects
rather than prose is a fact about the note's role, not about its ID.

They should be human-readable and locator-oriented:

```
<text-short-id>-<locator>
```

```
kena-1-1
katha-1-2-20
caraka-sutrasthana-11-54
```

**Include the recension where it is materially necessary** — that is,
wherever the same locator denotes different text in different recensions:

```
isha-kanva-1
isha-madhyandina-1
brihadaranyaka-kanva-1-4-10
```

**Never put a source record, edition or authority in a passage ID.** Not
`kena-1-1-gretil`, not `caraka-11-54-trikamji`. Those belong in
`locator_source` and `source_record_ids`.

The reason is stability. The preferred witness for a passage will change —
a better edition is located, a text moves from `source-gap` to sourced, a
repository goes dark. When that happens the frontmatter changes and the ID
does not, so every entry, dossier and link pointing at the passage survives.
An ID naming its source would have to be rewritten, and rewriting IDs is
exactly what IDs exist to avoid.

### Uniqueness spans dossiers too

Note IDs must be unique across the ten public types **and across private
research dossiers**. There is no separate dossier namespace.

A dossier and the entry it converts into are different objects and need
different IDs; letting them collide would make any index that reads both
ambiguous. The CLI checks all eleven kinds together.

### A passage does not depend on a text note

`passage.text_id` resolves **directly against `data/corpus.yaml`**. A passage
may be created for any approved corpus text whether or not a public `text`
note exists for that work.

This follows from the registry being authoritative. A `text` note is a
reader-facing page *about* a corpus record; it is not the record, and
evidence work must not wait on someone writing an introduction. The two are
linked through the shared corpus ID, not through one owning the other.

## The three layers

The model separates what the sources contain from what we understand from
them and from what a reader is handed.

### Evidence objects

What a source actually contains. Grounded in a registered witness.

`passage`, `source-note`

### Knowledge objects

Reusable entities and ideas that accumulate across many texts.

`text`, `concept`, `person`, `tradition`, `discipline`

### Editorial objects

What the reader encounters. Built from the layers beneath.

`entry`, `deep-dive`, `pathway`

The hierarchy runs roughly:

```
TEXT
  └── PASSAGE
        └── CONCEPT / PERSON / TRADITION / DISCIPLINE
              └── ENTRY / DEEP-DIVE / PATHWAY
```

It is a dependency order, not a containment tree. A concept draws on many
passages from many texts; an entry draws on concepts and passages at once.

**Why the separation matters.** An editorial claim must be traceable to the
evidence that supports it. If entries carried their own source text, the same
passage would be re-transcribed, re-translated and re-cited in every entry
that touched it, and a correction would have to be chased across all of them.
Passages exist so that source text is stated once, verified once, and reused.

## Note types

| Type | Folder | Layer | Purpose |
|---|---|---|---|
| `text` | `content/texts/` | knowledge | Reader-facing page for one approved Corpus v1 work |
| `passage` | `content/passages/` | evidence | One source-grounded textual unit — the atomic evidence object |
| `concept` | `content/concepts/` | knowledge | A reusable idea appearing across texts and traditions |
| `person` | `content/people/` | knowledge | Author, commentator, thinker, compiler or attributed figure |
| `tradition` | `content/traditions/` | knowledge | An intellectual or textual tradition |
| `discipline` | `content/disciplines/` | knowledge | A cross-tradition subject area |
| `entry` | `content/entries/` | editorial | The daily reader-facing piece |
| `deep-dive` | `content/deep-dives/` | editorial | Long-form treatment of one question |
| `pathway` | `content/pathways/` | editorial | Curated reading journey through existing notes |
| `source-note` | `content/sources/` | evidence | Explanation of an edition or source problem worth its own page |

Ten types, no more. If something does not fit, it is probably a `concept` or
a `deep-dive`.

### text

The public page for a work already approved in `data/corpus.yaml`. It carries
`corpus_id`, and everything bibliographic — family, shakha, recension,
citation scheme, source status — is read from the registry rather than copied
here. The note's job is to explain the work to a reader: what it is, why it
matters, how it is structured, what to read first.

### passage

The most important type. One passage, one locator, one registered witness.

A passage must keep apart:

- the original wording;
- transliteration;
- the project's own working translation;
- any quoted published translation;
- interpretation of any kind.

These are different claim classes under `CLAIM_POLICY.md` and collapsing them
is the single easiest way for this project to mislead. The body has a heading
for each so the distinction survives editing.

**A locator is meaningless without its edition.** Stage 2 established that a
bare reference such as `8.270` identifies a passage only once the edition is
named, because critical and received texts diverge in numbering and in which
verses exist. Every passage therefore records `locator_source`: the source
record whose numbering the locator follows.

#### How much text is one passage?

> A passage contains the **smallest contiguous textual unit sufficient to
> support the idea being discussed**.

That may be one mantra, one verse, one sutra, several consecutive verses, or
a short prose section. There is no universal one-verse rule — the unit of
sense differs by genre, and a sutra that is unintelligible alone is not a
useful evidence object.

Prefer smaller, reusable units over chapter-sized ones. A small passage can
be cited by many entries; a large one tends to be cited by none, because no
entry is about all of it.

Where an entry needs wider context, **link several passage notes** rather
than widening one. Create a deliberately broader passage only where the
meaning genuinely cannot be separated.

`passage_scope` records which of these a passage is — `atomic`,
`short-sequence`, `prose-section` or `composite-excerpt` — defaulting to
`atomic`. Reach for `composite-excerpt` only when it is materially useful.

#### Passages from source-gap texts

Sixteen approved texts carry `source_status: source-gap`. Passage work on
them is **permitted but confined to research**, so that researchers have
somewhere to work without weak evidence leaking into publication.

A passage whose parent corpus record is `source-gap` must:

- remain unpublished;
- carry `source-gap` in `review_flags`;
- carry a `translation_status` no stronger than `provisional`;
- never reach `source-verified`.

And while an unresolved `source-gap` sits on an entry's **primary** passage,
that entry may not enter `source-verified`, `editor-approved`, `ready`,
`scheduled` or `published`.

The CLI will warn loudly when such a passage is created. The restriction is
on publication, not on thinking.

**This rule is deliberately a cross-file invariant.** No single file owns it,
and none should. The validator evaluates the chain:

```
entry.primary_passage → passage.text_id → corpus record.source_status
                      → passage.review_flags
```

Both arms matter: the corpus `source_status` is the underlying fact, and
`review_flags` is the passage's own acknowledgement of it. A passage that
should carry the flag and does not is itself a validation failure — the flag
is not optional bookkeeping.

Resolving it needs the registry and two notes at once, which is why it lives
in the validator rather than in a schema.

### concept

An idea that accumulates. A concept page must not present one tradition's
reading as the universal meaning — `CLAIM_POLICY.md` forbids collapsing
schools into a synthetic Indic view, and concept pages are where that
temptation is strongest.

### person

Includes figures whose historicity is uncertain and names that are
attributions rather than authorship. `historicity_status` records which, so
that traditional attribution is never silently promoted to historical fact.

### tradition and discipline

Kept separate on purpose. A tradition is a community of thought with its own
lineage and commitments (Advaita Vedanta, Paninian grammar). A discipline is
a subject worked on across traditions (grammar, medicine, astronomy). Nyaya
is a tradition; epistemology is a discipline; they overlap without being the
same kind of thing.

### entry

The daily editorial object, following the six-stage model in
`EDITORIAL_STANDARD.md`:

**Discover → Original → Understand → Perspectives → Connect → Explore**

An entry should read in three to five minutes. Depth belongs in the passage,
concept and deep-dive pages it links to.

#### Entries do not duplicate canonical original text

The division of ownership is fixed:

| The **passage** owns | The **entry** owns |
|---|---|
| original text | the question |
| transliteration | explanation |
| working translation | perspectives |
| source locator | connections |
| source records | exploration path |
| literal and textual notes | |

An entry's Original stage **references** the primary passage; it does not
restate it. The author must not paste Sanskrit into an entry by hand.

#### The canonical entry pattern

```markdown
<!-- Original -->
![[<passage-file-id>#Original]]
```

**The entry does not declare its own `## Original` heading.** The passage
owns that heading, and Quartz inlines it together with the transcluded
content. An entry that also writes `## Original` renders the word twice in a
row and emits a duplicate `id="original"` — invalid HTML and a visible
defect. This was found in the generated output of the first real conversion,
not in the markdown.

So the HTML comment marks the section for the author and for tooling, and
the rendered heading comes from the passage. The six-stage reading
experience is unchanged: the reader still sees Discover → **Original** →
Understand → Perspectives → Connect → Explore, with the Original heading
supplied by the evidence object that owns it.

The passage's `## Original` section is **not** renamed to avoid the
collision. The passage is the owner; the entry is the borrower, and it is
the borrower that gives way.

**Verified working** against Quartz v5.0.0 on 2026-09-22. Section
transclusion is resolved at build time and inlined server-side as:

```html
<blockquote class="transclude" data-url="kena-1-1" data-block="#original">
```

Two things the test established:

1. The heading anchor is **case-insensitive** — `#Original` resolves to
   `#original`. Write it in the readable form.
2. Quartz resolves the link by **filename slug, not by note ID**.

So that wikilinks resolve naturally, **passage notes are written to
`<id>.md`** — the filename is *derived from* the ID. The ID stays canonical;
the filename is a generated rendering detail, and the CLI keeps them in step
when creating or renaming a note. An editor writes `![[kena-1-1#Original]]`
and never has to think about the file.

This is not a retreat from "filenames are not identity". It is the opposite:
the filename is downstream of the ID, so renaming a title changes neither.

The point is not tidiness. If entries carried their own copies of source
text, a corrected reading would have to be chased through every entry that
ever quoted it, and the copies would silently drift apart.

#### Recording what was actually read

A passage carries two source lists, and they answer different questions.

- `source_record_ids` — the registered sources **relevant** to this passage.
- `inspected_source_record_ids` — the subset **actually opened and read**
  while the passage was made. Always a subset, never independent.

An edition anchor routinely appears in the first and not the second: the
anchor is the registered edition whose numbering the locator follows, and
citing it is not the same as having checked its page. **Absence from the
inspected list says nothing about a source's strength** — a printed critical
edition nobody has opened is still the best source in the chain. The field is
provenance metadata for a later reviewer, not a ranking, and it is never
rendered to readers.

`SOURCE_POLICY.md` requires recording which source was actually used and what
its limits are. One list cannot carry both "this is the registered edition"
and "this is what we read", and the first real conversion had to say the
difference in prose because the field did not yet exist.

### deep-dive

Answers one clear question at length, reusing many passages. It should remain
useful when reached directly, not only as a footnote to an entry.

### pathway

Curates existing notes into an order. It adds sequence and framing, not
content. If a pathway starts explaining things at length, that material
belongs in a deep-dive.

### source-note

For an edition or transmission problem that a reader or editor needs
explained — why the Mahabharata Critical Edition differs from common
editions, why the Isha Upanishad has two recensions. Created only when the
problem is worth a page. **Do not create one per source record**; there are
209 source records and almost none of them need prose.

## Relationships

**Structured frontmatter uses stable IDs. Bodies use wikilinks.**

```yaml
primary_passage: kena-1-1
concepts:
  - pramana
  - consciousness
```

```markdown
See also [[What is pramana?]] and [[Kena Upanishad]].
```

Rationale: IDs are stable and machine-resolvable, so tooling can validate and
index them; wikilinks are natural to write and Obsidian and Quartz already
render and backlink them. Filenames are *not* the identity layer — a file may
be renamed, a title may change, and the ID must survive both.

Relationship fields point *downward or sideways* in the hierarchy: an entry
names its passages, a passage names its text. Upward lists — which entries
use this passage — are generated, never maintained by hand.

## Status

Two vocabularies. They share their terminal states so that `published` and
`revised` mean the same thing everywhere.

### Note lifecycle

For `text`, `passage`, `concept`, `person`, `tradition`, `discipline`,
`pathway`, `source-note`:

```
stub → drafted → in-review → published → revised
```

### Editorial lifecycle

For `entry` and `deep-dive`, per `EDITORIAL_STANDARD.md`:

```
candidate → researching → source-verified → drafted → red-teamed
   → editor-approved → ready → scheduled → published → revised
```

The editorial lifecycle is the note lifecycle with the review stages made
explicit. Two rules carry over from policy:

- **No AI-generated entry may go straight from `drafted` to `published`.**
  It passes through `red-teamed` and `editor-approved`, which are human acts.
- **A date arriving does not publish anything.** An entry with a future
  `publish_date` may sit at `scheduled`; it becomes `published` only when the
  publication workflow actually publishes it.

### Relationship to Quartz

Quartz decides what to render from its own `draft` field.

> `draft` is **derived operational state, not editorial truth.** `status` is
> the editorial truth; `draft` is what Quartz happens to need in order to
> act on it.

The mapping is total and mechanical:

| `status` | `draft` |
|---|---|
| `published`, `revised` | `false` |
| every earlier state | `true` |

The CLI synchronises `draft` from `status` automatically. **Editors are
never expected to maintain it by hand**, and it must not be treated as a
second, independent switch — if the two ever disagree, `status` is right and
`draft` is stale.

It is not removed, because Quartz needs it. Templates ship `draft: true`.

## Scheduling

`publish_date` on the entry **is** the schedule. There is no separate
calendar file to keep in step — `AGENTS.md` requires the schedule be
generated from entry metadata, and `data/schedule.json` is a generated
artefact, not a source of truth.

`publish_date` is optional before `scheduled` and required from `scheduled`
onward.

### Dates are quoted strings

`publish_date`, `created` and `updated` are always written as **quoted ISO
strings** — `publish_date: "2026-10-01"`, never the bare `2026-10-01`.

Unquoted, YAML parses the value into a native date object, so what a note
carries depends on which parser read it. Scheduling is exactly where that
bites: the scheduler compares, sorts and groups by date, and a field that is
a string in one tool and a date object in another produces comparisons that
are silently wrong rather than loudly broken. Quoting makes the value the
same everywhere. Do not rely on YAML automatic date parsing.

### One entry per day, by default

`publish_date` is **not unique at schema level**. Two entries may carry the
same date, and that is occasionally wanted — a paired entry, a themed day,
a correction published alongside its original.

But the default publishing model is one entry per date. The scheduler must:

- **warn** when a date already has an entry scheduled;
- **require an explicit override** to place a second entry on that day.

Enforcing uniqueness in the schema would make the legitimate case
impossible; leaving it silent would let a double-booking ship unnoticed. A
warning with an override is the setting that matches how the decision is
actually made.

## Manual versus generated

### Maintained by hand

Anything expressing editorial judgement: `title`, `question`, `status`,
`publish_date`, `primary_passage`, `archetype`, `surprise_type`,
`connection_types`, `claim_risk`, `review_flags`, relationship lists, and all
body prose.

### Generated — never hand-maintained

- backlinks and "used in" lists
- the publication calendar and reading runway
- entry counts per text, concept or tradition
- related-content indexes
- `draft`, derived from `status`
- any roll-up of registry data into a note

If a field can be computed from the registries plus frontmatter, it is
generated. Editors should never be asked to keep a derived list in step.

## What sits outside this model

### Research dossiers — private

A **research dossier** is the working evidence pack that turns a candidate
idea into a reliable entry or deep dive. It is *not* an eleventh public note
type. Dossiers live in `research/dossiers/`, are never published by Quartz,
and are governed by `RESEARCH_DOSSIER.md`.

The split is the point. A dossier is allowed to be messy, provisional,
contradictory and wrong; public content is not. Keeping the mess somewhere
legitimate is what stops it being smuggled into an entry.

Dossiers have their own private lifecycle — `candidate`, `researching`,
`evidence-collected`, `ready-for-draft`, `converted`, `rejected`, `parked` —
which is separate from the public editorial lifecycle. **`converted` means a
dossier's research has been used to create an entry or deep dive. It does
not mean anything has been published.**

Dossiers also carry three fields the public types do not, because research
has to record its own failures: `blocked_on` (why progress has actually
stopped), `research_gaps` (what was looked for and not found) and
`sources_consulted_unregistered` (material that informed the work without
becoming a canonical witness). `RESEARCH_DOSSIER.md` defines all three.

`blocked_on` is what stops a stalled dossier from looking finished. Its
commonest effect is on identifiers: if a text's numbering is unresolved, no
passage ID can be minted, because the convention is
`<text-short-id>-<locator>` and a guessed locator would become permanent.
The dossier records the block and creates nothing.

### Who decides what

Per `AGENTS.md`:

**AI may** surface candidate passages, gather sources, summarise
commentaries, compare translations, identify disagreements, draft a dossier,
red-team proposed claims, and draft an entry.

**AI may not** mark anything `editor-approved`, publish, resolve a serious
scholarly disagreement as fact, or upgrade a `source-gap` into reliable
evidence without actual sourcing.

**The human editor decides** whether an idea is worth publishing, where the
interpretive emphasis falls, how strong a modern connection may be claimed,
the final wording, and publication approval.

## What this model deliberately does not do

- It does not copy corpus or source metadata into notes.
- It does not add note types for every distinction; commentary, for instance,
  is handled as a `text` with its own corpus record, not a separate type.
- It does not use free-text status or tag soup. Controlled vocabularies are
  listed in `FRONTMATTER_SCHEMA.md`.
- It does not yet impose JSON Schema or a validation harness. Those come with
  the CLI.
