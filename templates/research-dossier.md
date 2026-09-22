---
id: ""                    # kebab-case, unique among dossiers
type: research-dossier
title: ""                 # working title; may be rough
candidate_question: ""    # the question being investigated
status: candidate         # candidate | researching | evidence-collected
                          # | ready-for-draft | converted | rejected | parked
created: ""               # quoted ISO string, e.g. "2026-09-22" — always quote
updated: ""               # quoted ISO string — never rely on YAML date parsing

# --- optional ---
# target_entry: ""        # entry note id, once one exists
# target_deep_dive: ""    # deep-dive note id, once one exists
# text_ids: []            # CORPUS ids from data/corpus.yaml
# passage_ids: []         # passage note ids created or needed
# source_record_ids: []   # registered source records relevant to this research
# inspected_source_record_ids: []
#                         # subset of the above actually opened and read.
#                         # Must be a subset. Absence does not imply a source
#                         # is weak, only that it was not examined here.
# concepts: []
# people: []
# traditions: []
# disciplines: []
# archetype: []           # public controlled vocabulary
# surprise_type: []       # public controlled vocabulary
# connection_types: []    # public controlled vocabulary
# claim_risk: low         # low | medium | high — the MAXIMUM risk of the
#                         # proposed piece, not an average. The Claim Audit
#                         # stays authoritative at claim level; there is no
#                         # per-claim frontmatter.
# review_flags: []        # public controlled vocabulary
#
# blocked_on: []          # ONLY when progress is actually blocked:
#                         #   citation-scheme-resolution | source-gap
#                         # | source-identity | recension-resolution
#                         # | translation-resolution | commentary-resolution
#                         # | editorial-decision | other
#                         # Unfinished is not blocked — that goes in
#                         # research_gaps or Open Questions.
#
# research_gaps: []       # short factual lines: what we looked for and did
#                         # not find, what conflicts, what is unchecked.
#                         # Not a general notes field.
#   - "No inspected source supports rendering X as 'consciousness'."
#
# sources_consulted_unregistered:   # informed the work; NOT canonical
#   - title: ""                     # witnesses. Do not add to data/sources.yaml.
#     author: ""
#     year: ""
#     publication: ""
#     url: ""
#     use: ""                       # one line: what it was used for
#
# editorial_decision: ""  # the editor's field; AI leaves it alone
---

<!-- PRIVATE working material. Lives in research/dossiers/ and is never
     published. May be provisional, contradictory and wrong — that is the
     point of having it. Public content may not be. -->

# Research Question

# Why This Might Be Interesting

<!-- Which reader reaction is this reaching for? They asked this / they did
     this / I misunderstood this / they disagreed about this. -->

# Primary Text Evidence

## Passage Candidates

<!-- Corpus text id, locator, and WHICH edition the locator follows. Note
     whether a passage note exists yet or needs creating. -->

## Source / Edition Notes

<!-- Which source record is being read. Recension, coverage limits, whether
     the text is source-gap, and anything in data/sources.yaml that
     constrains how the passage may be used. -->

# Traditional Perspectives

<!-- Named commentators. Attribute; do not merge schools into one view. -->

# Scholarly Perspectives

# Modern Connection

<!-- Optional, and legitimately often empty. If present, name the
     relationship type and say where the comparison stops. -->

# Claim Audit

<!-- For each claim that matters:
     - claim
     - claim type: TEXTUAL | COMMENTARIAL | HISTORICAL | MODERN | EDITORIAL | CONTESTED
     - supporting evidence
     - confidence
     - caveat
     - safe wording
     Scientific, medical, priority, transmission and controversial claims
     need stronger evidence here, not later. -->

# Counterevidence / Disagreement

<!-- What argues against the reading. A dossier with nothing here has
     usually been assembled rather than researched. -->

# What We Should Not Say

<!-- Specific formulations the entry must avoid, and why. -->

# Entry Direction

<!-- Proposed hook, which passage carries it, rough shape of the sections. -->

# Open Questions

# Editor Decision

<!-- Human editor only. -->
