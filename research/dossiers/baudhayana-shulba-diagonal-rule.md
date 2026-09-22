---
id: baudhayana-shulba-diagonal-rule
type: research-dossier
title: "Baudhāyana Śulba Sūtra — the diagonal rule, and the altar it came from"
candidate_question: "How did ritual geometry lead to a rule about the diagonal?"
status: researching
created: "2026-09-22"
updated: "2026-09-22"

text_ids:
  - baudhayana-shulba-sutra
  - baudhayana-shrauta-sutra
passage_ids: []           # BLOCKED — cannot mint a passage id until the
                          # locator is resolved. See blocked_on below; no
                          # passage ID has been invented.
source_record_ids:
  - sr-baudh-sulba-titus
  - sr-baudh-sulba-senbag-anchor
concepts: []
people: []
traditions: []
disciplines: []
claim_risk: high
review_flags:
  - citation-scheme
  - edition-numbering-sensitive
  - historical-priority-claim

blocked_on:
  - citation-scheme-resolution

research_gaps:
  - "Need an edition-backed resolution of Baudhayana numbering 1.12 vs 1.48."
  - "Sen & Bag (INSA 1983) has not been consulted in print; its numbering is known only from conflicting secondary reports."
  - "Unknown whether 1.12 and 1.48 are the same sutra under sectional vs continuous numbering, or whether one secondary report is simply wrong."
  - "The relationship between the Thibaut and Burk numbering traditions has not been established."
  - "Unknown whether sr-baudh-sulba-titus reproduces a specific edition's numbering or its own; the transcription is by anonymous students."
  - "Not verified whether the Shulba Sutra is the 30th prashna of the Baudhayana Shrauta Sutra; embedded_in.range is null in data/corpus.yaml."
  - "Commentaries by Dvarakanatha Yajvan, Venkateshvara Dikshita and Kapardisvamin have not been read; no reading may be attributed to them."
  - "Not checked whether the Apastamba and Katyayana Shulba Sutras are in Corpus v1, so the entry cannot yet judge whether it overstates Baudhayana's singularity."
  - "The rendering of parshvamani and tiryagmani as 'side-measure' and 'crosswise-measure' is unverified against a technical glossary of altar layout."

sources_consulted_unregistered:
  - title: "Applied Geometry of the Sulba Sutras"
    author: "John F. Price"
    publication: "School of Mathematics, University of Hyderabad (Algorithms in Ancient India)"
    url: "https://sanskrit.uohyd.ac.in/Algorithms_in_Ancient_India/7-3-2018/Applied+Geometry+in+SulbaSutras.pdf"
    use: "Secondary. Source of the identification of sutra 48 as the diagonal statement, and of the report that two numbering traditions exist (Thibaut, Burk)."
  - title: "Shulba Sutras"
    publication: "Wikipedia"
    url: "https://en.wikipedia.org/wiki/Shulba_Sutras"
    use: "Orientation only; source of the 1.12 / 1.13 numbering seen in circulation. Not relied on for any claim."
  - title: "Baudhayana sutras"
    publication: "Wikipedia"
    url: "https://en.wikipedia.org/wiki/Baudhayana_sutras"
    use: "Orientation only; the Shrauta Sutra embedding and the names of the commentators. Commentator names are a pointer for later research, not evidence."
  - title: "Square Roots in the Sulbasutra"
    publication: "School of Mathematics, University of Hyderabad (Algorithms in Ancient India)"
    url: "https://sanskrit.uohyd.ac.in/Algorithms_in_Ancient_India/7-3-2018/cornell_sulbh.pdf"
    use: "Consulted for context on how Sulba rules are stated procedurally. Not used for the diagonal rule itself."
---

<!-- PRIVATE working material. Lives in research/dossiers/ and is never
     published. May be provisional, contradictory and wrong — that is the
     point of having it. Public content may not be. -->

# Research Question

How did ritual geometry lead to a rule about the diagonal?

The Śulba Sūtras are altar-construction manuals. They exist to get a fire
altar built to specification with cord and peg. Somewhere inside that
practical brief sits a general statement about the diagonal of a rectangle.
The question is what the ritual problem was that made such a statement
necessary — and whether "led to" is even the right relation.

# Why This Might Be Interesting

Reader reaction: **they did this** — with a secondary note of **I
misunderstood this**.

Most readers who have heard of the Śulba Sūtras have heard of them through the
phrase "Pythagorean theorem in India", which is roughly the least interesting
true thing about them. The interesting thing is the *setting*: the rule
appears in a text about laying out sacrificial ground, among instructions for
cord-stretching (*śulba* = cord), because the ritual required altars of exact
prescribed area and exact prescribed orientation, and sometimes required
building an altar of the same area in a different shape. The geometry is
downstream of a liturgical constraint.

The "I misunderstood this" layer: this is *not* a theorem with a proof. It is
a rule stated as a rule. Treating it as a theorem is the common reader error.

# Primary Text Evidence

## Passage Candidates

**The sūtra.** Text as circulated (IAST, from the primary witness):

> dīrghacatursrasyākṣṇayā rajjuḥ pārśvamānī tiryagmānī ca
> yatpṛthagbhūte kurutastadubhayaṃ karoti

Working translation (mine, deliberately flat):

> The cord [stretched along] the diagonal of an oblong produces both [the
> areas] which the side-measure and the crosswise-measure produce separately.

**The locator is unresolved, and this is the central evidentiary problem of
this dossier.** Numbering seen in circulation for this same sūtra:

| Numbering | Where it appears |
|---|---|
| 1.12 (with 1.13 giving the triples) | Thibaut-style sectional numbering; also reported for Sen & Bag |
| 1.48 | Continuous per-sūtra numbering of chapter 1 |

There are **at least two numbering traditions** for the BŚS — one associated
with Thibaut, one with A. Bürk — and they are not interconvertible by any rule
I can apply without the printed texts in hand. 1.12 and 1.48 are very unlikely
to be a simple offset; they look like *sectional* versus *continuous* counting
of chapter 1.

This is exactly the state the corpus record already records:

- `citation_scheme: null`
- `citation_scheme_review: true`

So the registry was right, and this dossier is the first concrete instance of
why. **No passage note can be created yet**, because the passage ID convention
is `<text-short-id>-<locator>` and we do not have a locator we can stand
behind. Minting `baudhayana-shulba-1-12` now would bake an unverified locator
into a permanent identifier.

**Related passage, same problem:** the immediately following sūtra listing the
rational right triangles (3,4 / 12,5 / 15,8 / 7,24 / 12,35 / 15,36). Same
numbering ambiguity.

## Source / Edition Notes

- `sr-baudh-sulba-titus` — **primary witness**. Registered caveat: the
  transcription is by anonymous students. That is a real provenance weakness
  for a text where the *numbering* is the contested element, because an
  anonymous transcription is exactly the kind of witness that may silently
  renumber.
- `sr-baudh-sulba-senbag-anchor` — printed edition anchor: **S. N. Sen and
  A. K. Bag, *The Śulbasūtras* (Indian National Science Academy, 1983)**. This
  is the standard modern critical edition with translation and commentary, and
  it is the right authority to settle the numbering. I have **not** consulted
  the printed page; I have only secondary reports of what numbering it uses,
  and those reports conflict with each other.
- Corpus `source_status`: **verified**. The text itself is well attested. The
  problem here is not whether we have the text — we do — but which number to
  cite it by. Those are different failure modes and the registry distinguishes
  them correctly (`source_status: verified` alongside
  `citation_scheme_review: true`).
- **Embedding:** the corpus record has
  `embedded_in: baudhayana-shrauta-sutra`, `range: null`. The Śulba Sūtra is
  transmitted as part of the Baudhāyana Śrauta Sūtra — traditionally as its
  final (30th) praśna, though **that number is not recorded in our registry
  and I have not verified it**, so it must not be stated. The embedding is
  itself editorially important: it is the structural evidence that the
  geometry is a ritual annex, not a freestanding mathematical work.

# Traditional Perspectives

- **Dvārakānātha Yajvan, Veṅkaṭeśvara Dīkṣita, and Kapardisvāmin** are named
  in the literature as commentators on the Baudhāyana Śulba Sūtra. I have not
  read them and **cannot characterise their readings**. They are listed here
  so a later pass knows where to look; nothing about their positions may be
  asserted publicly on the strength of this dossier.
- The relevant "traditional perspective" that *can* be stated is not a
  commentator's opinion but the ritual frame itself: the Śrauta corpus
  specifies altars by area and shape, and prescribes transformations (square
  to circle, square to oblong, enlargement of the falcon altar by a given
  number of units) that *require* area-preserving construction. The diagonal
  rule is a tool for that. This is a claim about the texts' relationship, and
  it is well grounded in the fact of the embedding.

# Scholarly Perspectives

- The Śulba Sūtras are standardly read as **practical construction manuals**,
  with the geometrical content stated as rules of procedure rather than as
  demonstrated propositions. There is no proof apparatus in the text.
- Dating is **genuinely contested** and estimates range widely across the
  first millennium BCE. Because the text is embedded in the Baudhāyana Śrauta
  Sūtra, its date is entangled with the dating of the Kalpa literature
  generally. **No date should appear in a public entry** from this dossier.
- The relationship to Greek mathematics is the single most abused topic in
  this area. The defensible scholarly position is narrow: the BŚS states the
  relation, uses rational right triangles, and does not prove the relation.
  What follows from that about *priority*, *independence* or *influence* is
  exactly what is disputed, and this project has no business adjudicating it.
- John F. Price, "Applied Geometry of the Śulba Sūtras" (Univ. of Hyderabad
  Sanskrit dept. PDF) and the standard Sen–Bag apparatus are the two places to
  go next. Price is where I saw sūtra 48 identified as the diagonal statement;
  the 1.12/1.13 numbering appears in other secondary treatments.

# Modern Connection

Deliberately minimal.

- **Relationship type:** none asserted. The honest statement is about
  *setting*, not about lineage or anticipation: a rule of the kind now taught
  as a geometry theorem appears here as a cord-stretcher's working rule.
- **Where it stops:** immediately. The BŚS does not prove the rule, does not
  frame it as a theorem, does not situate it in a deductive system, and does
  not claim generality of the kind a theorem claims. Any sentence containing
  both "Baudhāyana" and "before Pythagoras" is out of scope for this project
  regardless of whether it happens to be true.

# Claim Audit

**Claim 1 — The Baudhāyana Śulba Sūtra states that the square on the diagonal
of an oblong equals the sum of the squares on its two sides.**
- Class: TEXTUAL
- Evidence: the sūtra quoted above, via `sr-baudh-sulba-titus`; edition anchor
  `sr-baudh-sulba-senbag-anchor`.
- Confidence: high for the content; **low for the locator**.
- Caveat: the text says it in terms of *areas produced by cords*, not in terms
  of squares on sides. The squares-on-sides phrasing is already a modernising
  paraphrase.
- Safe wording: "The cord along the diagonal of an oblong produces the same
  area as the two sides produce separately." **Cite without a number** until
  the locator is resolved, e.g. "in the first chapter of the Baudhāyana Śulba
  Sūtra".

**Claim 2 — The rule appears inside a manual for building ritual altars.**
- Class: TEXTUAL / HISTORICAL
- Evidence: the genre of the text; corpus `embedded_in:
  baudhayana-shrauta-sutra`; `vedanga_domain` on the corpus record.
- Confidence: high
- Caveat: none material.
- Safe wording: "It appears in a manual for laying out sacrificial altars with
  cord and peg."

**Claim 3 — The ritual requirement of area-preserving shape transformation is
what the geometry serves.**
- Class: EDITORIAL (an interpretive claim about purpose)
- Evidence: the text's own content — it contains square-to-circle,
  square-to-oblong and altar-enlargement constructions alongside the diagonal
  rule; plus the embedding in the Śrauta Sūtra.
- Confidence: moderate-to-high, but it is an inference about *why*, and "why"
  claims are editorial.
- Caveat: "led to" in the research question presumes a causal direction I
  cannot demonstrate. The rule may have been known independently and merely
  *recorded* here because it was useful. The text shows use, not origin.
- Safe wording: "The rule is stated where it is *useful*: among instructions
  for building altars of prescribed area in more than one shape." Avoid "led
  to", "gave rise to", "was discovered in order to".

**Claim 4 — The text lists rational right triangles (3–4–5, 5–12–13,
8–15–17, 7–24–25, 12–35–37, 15–36–39).**
- Class: TEXTUAL
- Evidence: the sūtra following the diagonal rule; the side-pairs are reported
  consistently across secondary treatments.
- Confidence: moderate-to-high for the list; low for the locator.
- Caveat: the text gives *side pairs*, not triples; the hypotenuses are mine.
  Presenting them as "Pythagorean triples" is a modern relabelling.
- Safe wording: "The next rule lists pairs of sides for which the construction
  comes out exactly: 3 and 4, 12 and 5, 15 and 8, 7 and 24, 12 and 35, 15 and
  36."

**Claim 5 — The standard modern edition is Sen & Bag (INSA, 1983).**
- Class: HISTORICAL / bibliographic
- Evidence: registered as `sr-baudh-sulba-senbag-anchor`.
- Confidence: high
- Caveat: none.
- Safe wording: as stated.

**Claim 6 — The sūtra's number differs between editions.**
- Class: EDITORIAL (a statement about our sources, not about the text)
- Evidence: 1.12/1.13 vs 1.48 both in circulation for the same sūtra; at least
  two numbering traditions (Thibaut, Bürk) are reported to exist.
- Confidence: **high that a discrepancy exists**; low as to which is which.
- Caveat: I have not opened either printed edition.
- Safe wording: if this appears publicly at all, "different editions of the
  Śulba Sūtras number the sūtras differently, so the same rule is cited under
  more than one number." This is honest, and it is arguably a more interesting
  sentence than the number would have been.

**Claim 7 — Anything about priority relative to Pythagoras.**
- Class: CONTESTED
- Evidence: insufficient, and out of scope.
- Confidence: n/a
- Caveat: **do not make this claim in any direction**, including the
  deflationary direction ("it was independent") and the hedged direction ("it
  may predate"). Both are claims.
- Safe wording: silence. If the reader's expectation must be addressed, say
  only that the text states the rule without proving it, and that this project
  does not take a position on questions of priority.

# Counterevidence / Disagreement

- **"Ritual geometry led to the rule" may be the wrong causal story.** The
  text records a rule in use. It does not narrate a discovery. The framing in
  the research question builds in a genesis account the evidence does not
  supply. This is the strongest objection and it goes to the entry's hook.
- **The rule may not be "general".** It is stated for an oblong
  (*dīrghacatursra*) and immediately followed by a list of specific working
  side-pairs. A reader could argue the list is the operative content and the
  general statement is a summary of practice, not a general claim. This cuts
  against "they had the theorem".
- **The sūtra might not be as isolated as the framing suggests.** The
  Āpastamba and Kātyāyana Śulba Sūtras carry comparable statements. Presenting
  Baudhāyana as *the* source overstates its singularity. Check whether the
  other Śulba texts are in Corpus v1 before the entry implies uniqueness.
- **The locator problem may indicate a deeper editorial divergence**, not just
  renumbering — the two traditions might segment the sūtras differently, in
  which case "the same sūtra" is doing some work.

# What We Should Not Say

- ❌ "Baudhāyana discovered the Pythagorean theorem before Pythagoras."
  Priority claim, unverifiable, and the project does not adjudicate it.
- ❌ "The Pythagorean theorem was known in India by [date]."
  Dating is contested; no date is verified here.
- ❌ "Baudhāyana Śulba Sūtra 1.12 states..." or "...1.48 states..."
  We do not have a verified locator. Either number would be asserting
  something we have not checked.
- ❌ "This is a theorem" / "Baudhāyana proved that..."
  No proof apparatus exists in the text.
- ❌ "Indian mathematics was ahead of Greek mathematics."
  Comparative-priority framing; out of scope.
- ❌ "Vedic Indians invented geometry to build altars."
  Origin claim; the text shows use, not invention.
- ❌ "The Śulba Sūtras are the world's oldest geometry texts."
  Superlative, unverified.
- ❌ Any silent choice between 1.12 and 1.48. If a number is needed and cannot
  be verified, cite the chapter without a sūtra number and say why.

# Entry Direction

- **Hook (Discover):** the rule most readers know as a theorem shows up here
  as a working instruction for people stretching cord over ground, in a text
  about where to put a fire altar.
- **Passage carrying it:** **blocked.** No passage note can be created until
  the locator is resolved. This entry cannot proceed to `source-verified`
  without either (a) consulting Sen & Bag directly, or (b) an editorial
  decision to cite chapter-only.
- **Understand (~160 words):** what *śulba* means; what the ritual demanded
  (exact area, exact orientation, shape transformation at constant area); how
  the diagonal rule serves that; that it is stated, not proved.
- **Perspectives:** the scholarly reading of the Śulba texts as procedural
  manuals; the honest statement that the numbering itself is unsettled. Do not
  stage a priority debate.
- **Connect:** omit, or restrict to the narrow setting-level observation in
  Modern Connection above.
- **Explore:** Read → the triples sūtra. Understand → a concept note on
  altar geometry / *vedi*, if one exists. Compare → Āpastamba and Kātyāyana
  Śulba Sūtras. See → a diagram of the falcon altar, if one can be sourced.

Shape note: the *unresolved locator* is itself a legitimate piece of the
entry's honesty and could be surfaced in a sources footnote rather than
hidden. "We can tell you what it says; editions disagree about what to call
it" is a true and interesting sentence.

# Open Questions

1. **What locator does Sen & Bag (INSA 1983) actually assign?** This is the
   blocking question. Requires the printed page or a reliable reproduction of
   its numbering. Until answered, no passage note exists for this text.
2. Are 1.12 and 1.48 the *same* sūtra under two numbering schemes, or does one
   of the reports simply have it wrong?
3. What is the relationship between the Thibaut and Bürk numbering traditions —
   sectional vs continuous, or genuinely different segmentation?
4. Is the Śulba Sūtra the 30th praśna of the Baudhāyana Śrauta Sūtra? If
   verifiable from a registered source, this would fill `embedded_in.range` —
   but that is a Corpus change, out of scope for this dossier.
5. Are Āpastamba and Kātyāyana Śulba Sūtras in Corpus v1? Affects whether the
   entry may imply Baudhāyana's singularity, and whether Compare links exist.
6. Does `sr-baudh-sulba-titus` reproduce a specific edition's numbering, or its
   own? An anonymous transcription's numbering is not independent evidence.
7. Is the literal reading *pārśvamānī tiryagmānī* as "side-measure" and
   "crosswise-measure" the right rendering of the two cords, or are these
   technical terms with a more specific altar-layout sense?

# Editor Decision

<!-- Human editor only. -->
