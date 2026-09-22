---
id: ""                    # kebab-case, stable
type: passage
title: ""
text_id: ""               # approved corpus id from data/corpus.yaml
locator: ""               # e.g. "1.1.1" — quote it so YAML keeps it a string
locator_source: ""        # source_record_id whose numbering this locator follows
source_record_ids: []     # registered records relevant here; locator_source first
original_language: ""     # sanskrit | malayalam
passage_scope: atomic     # atomic | short-sequence | prose-section | composite-excerpt
translation_status: pending   # pending | provisional | verified | not-applicable
claim_risk: low           # low | medium | high
status: stub              # stub | drafted | in-review | published | revised
created: ""               # quoted ISO string, e.g. "2026-09-22"
updated: ""               # always quote; no YAML date parsing
draft: true

# --- optional ---
# inspected_source_record_ids: []
#                         # subset of source_record_ids actually opened and
#                         # read. An edition anchor may sit in the list above
#                         # without appearing here. Absence does NOT mean a
#                         # source is weak — only that it was not examined in
#                         # this workflow. Provenance metadata, never shown
#                         # to readers.
# original_script: ""     # devanagari | iast | malayalam
# recension: ""           # required where the text has more than one
# translation_type: ""    # none | working | editorial | quoted-published
# translation_source: ""  # required when translation_type is quoted-published
# translation_review: ""  # pending | provisional | verified | not-applicable
# citation_review: ""     # pending | provisional | verified | not-applicable
# review_flags: []        # see FRONTMATTER_SCHEMA.md for controlled values
# concepts: []
---

<!-- text_id resolves against data/corpus.yaml, NOT against a text note.
     A passage may exist whether or not a public text note has been written.

     Smallest contiguous unit sufficient to support the idea being
     discussed. Prefer small reusable units; link several passages rather
     than widening one.

     If the parent corpus record is source-gap: add source-gap to
     review_flags, keep translation_status at provisional or weaker, leave
     it unpublished, and do not advance it to source-verified. -->


## Original

## Transliteration

## Working Translation

<!-- The project's own literal rendering. Label a published translation as
     such and record it in translation_source; never present a paraphrase
     as a literal translation. -->

## Literal Notes

<!-- Difficult terms, grammatical choices, where English flattens the sense. -->

## Traditional Interpretation

## Scholarly Notes

## Claim Notes

<!-- Which claim class each statement belongs to: TEXTUAL, COMMENTARIAL,
     HISTORICAL, MODERN, EDITORIAL, CONTESTED. See CLAIM_POLICY.md. -->

## Related Concepts

## Used In

<!-- Generated. Do not maintain by hand. -->
