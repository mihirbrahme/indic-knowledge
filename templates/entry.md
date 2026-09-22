---
id: ""
type: entry
title: ""
question: ""              # the hook, phrased as a question
primary_passage: ""       # passage id
status: candidate         # candidate | researching | source-verified | drafted
                          # | red-teamed | editor-approved | ready | scheduled
                          # | published | revised
created: ""               # quoted ISO string, e.g. "2026-09-22"
updated: ""               # always quote; no YAML date parsing
draft: true

# --- optional; publish_date becomes required at status: scheduled ---
# publish_date: ""        # quoted ISO string — this is the schedule; no separate calendar
# secondary_passages: []
# text_ids: []
# concepts: []
# people: []
# traditions: []
# disciplines: []
# archetype: []           # controlled; see FRONTMATTER_SCHEMA.md
# surprise_type: []       # controlled
# connection_types: []    # controlled; required if ## Connect makes a claim
# featured: false
---

<!-- Status gate: while the primary passage carries an unresolved
     source-gap flag, this entry may not reach source-verified,
     editor-approved, ready, scheduled or published. -->


# <question or hook>

<!-- Discover: open with a question, puzzle or tension. Do not overstate the
     source. -->

<!-- Original -->
![[PASSAGE-ID#Original]]

<!-- CANONICAL PATTERN — note there is NO `## Original` heading here.

     The passage owns the `## Original` heading, and Quartz inlines it along
     with the transcluded content. Declaring a second one renders the word
     "Original" twice and emits a duplicate id="original". The HTML comment
     above marks the section for the author and the CLI; the rendered
     heading comes from the passage.

     Do NOT paste source text here — the passage note owns the original,
     transliteration, working translation, locator and source records.

     The CLI resolves the stable passage id to the note file. If Quartz
     needs a filename to resolve the transclusion, that is a rendering
     detail tooling manages; the filename is never the identity layer. -->

## Understand

<!-- Roughly 100-180 words. Plain modern English without flattening the
     technical idea. -->

## Perspectives

## Connect

<!-- Optional. Never invent a modern connection to make an entry feel
     relevant. If present, classify it and say where the comparison stops. -->

## Explore

<!-- Three to five links of differing kinds: Read, Understand, Perspective,
     Compare, Modern, Listen, See. -->
