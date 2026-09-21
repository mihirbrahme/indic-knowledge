# Source Policy

## Purpose

This file defines how textual, historical, scientific, and interpretive sources are selected, verified, and recorded.

The project must prefer traceable, edition-aware sources over convenience.

## Source hierarchy

Use the strongest available source for each claim.

### Tier 1 — Primary textual evidence

Preferred:
- critical editions;
- established Sanskrit or other source-language editions;
- manuscript-based scholarly editions;
- official or institutional digital editions;
- stable academic electronic corpora that disclose their edition basis.

Examples may include:
- Vedic Heritage Portal;
- GRETIL;
- TITUS;
- SARIT;
- institutional e-Samhita portals;
- recognised critical editions.

### Tier 2 — Traditional commentaries

Prefer:
- original commentary text;
- recognised editions;
- reliable scholarly translations.

Do not rely on secondary summaries when the original commentary can reasonably be checked.

### Tier 3 — Scholarly translations and editions

Prefer:
- university presses;
- recognised specialist editions;
- academic publishers;
- translations by established scholars in the relevant field.

A translation is evidence for an interpretation, not a substitute for checking the underlying text when a claim depends on wording.

### Tier 4 — Contemporary academic scholarship

Use for:
- historical context;
- dating;
- intellectual history;
- transmission;
- modern scientific or technical comparison;
- specialist interpretation.

Prefer:
- peer-reviewed papers;
- scholarly monographs;
- major academic reference works;
- reputable university or research-institute publications.

### Tier 5 — Reliable explanatory sources

Use cautiously for:
- discovery;
- orientation;
- accessible explanation;
- locating better sources.

Do not use as the sole basis for a controversial textual, historical, or scientific claim.

### Tier 6 — Popular material

Examples:
- blogs;
- unsourced websites;
- social media;
- popular videos;
- quote sites.

Use only for:
- discovering candidate ideas;
- documenting a modern popular interpretation;
- identifying claims that require verification.

Never treat these as authoritative evidence merely because they are widely repeated.

## Source readiness model

This model governs whether a text may be worked on. It is the practical
counterpart to the multiple-witness rule below, which describes an ideal
rather than a precondition.

### usable

At least one credible source exists that:

- clearly corresponds to the intended text and recension;
- has identifiable institutional, scholarly, or edition provenance;
- allows passages to be located reliably enough for research.

This is sufficient to begin editorial work. A single good source is enough.

### well-supported

A usable source exists, plus one or more of:

- another useful textual witness;
- a printed or critical edition anchor;
- an institutional repository;
- a commentary or translation useful for interpretation.

### source-gap

No sufficiently trustworthy or identifiable source exists for reliable
passage-level work.

Do not require two independent witnesses merely to classify a text as usable.
A text is not blocked from research because its second witness is missing,
inaccessible, or derivative.

### Readiness does not relax recension discipline

Readiness asks whether we have a good enough source. It never asks whether we
have a source for something near enough.

A single good source is sufficient only where it actually matches the
intended:

- text;
- recension;
- shakha where material;
- textual layer where material.

A high-quality source for the wrong recension is not an acceptable
substitute, and no degree of institutional authority makes it one. Where the
matching source is weak and a non-matching source is strong, the text is a
source-gap, not a usable text.

## Editorial verification principle

Source verification is proportional to the claim being made.

A straightforward entry explaining a clearly attested passage may proceed
from one strong source.

Additional verification should be sought during the editorial pass when:

- the reading is disputed;
- recensions differ materially;
- translation choices affect the argument;
- the entry makes a historical priority claim;
- the entry claims scientific correspondence;
- the entry claims influence or transmission;
- the passage is medically sensitive;
- the passage is controversial;
- the text survives fragmentarily or through reconstruction.

The trigger is the claim, not the text. The same passage may need one source
to say what it says and several to support what an entry wants to argue from
it. Verification effort belongs where the argument carries weight.

## Controversial passages

Some approved texts contain material that is socially contested in the
present and is frequently quoted out of context. `CLAIM_POLICY.md` governs how
such material is written about. This section governs what sourcing it
requires.

Before a controversial passage is published, the editorial pass must secure:

1. the exact Sanskrit text;
2. identification of the edition it is taken from;
3. the immediate textual context surrounding it;
4. traditional commentary where available;
5. relevant scholarly discussion;
6. a clear distinction between descriptive historical analysis and
   present-day endorsement.

This is the proportionality principle applied, not an exception to it. A
contested passage is a high-stakes claim and earns a fuller chain.

Do not sanitise such passages. Do not sensationalise them. Omitting the
material is not neutrality, and quoting it without its edition, context and
reception is not accuracy.

The source registry itself does not editorialise. It records what a source is
and what its limits are; the judgement belongs to the editorial pass.

## Multiple-witness rule

This rule describes the strongest evidence chain, which canonical passage
work should aim at. It is NOT a precondition for beginning research; see the
readiness model above.

For a canonical primary-text passage, prefer:

1. one primary digital witness;
2. one independent verification witness;
3. one edition anchor where available.

Do not count three websites as independent witnesses if they derive from the same electronic transcription.

Different repositories are not automatically independent witnesses.

Two independently typed electronic texts based on the same printed edition provide transcription verification, not fully independent textual verification.

Transcription verification establishes that the digital text faithfully reproduces its printed source. It says nothing about whether that source constituted the text correctly. Independent textual verification requires a materially separate edition, or independently consulted manuscript evidence.

Where a witness does not state the printed edition behind it, its independence cannot be assumed. Transcription independence is then the most that may be credited, and only where separate authorship of the transcription is itself documented.

## Edition awareness

For every approved text, record where relevant:

- title;
- language;
- recension;
- shakha;
- edition;
- editor;
- publication details;
- digital repository;
- transcription basis;
- citation scheme;
- known numbering differences;
- material textual variants.

When a repository discloses the printed edition behind its digital text, record that information.

## Recensions and variants

Do not silently merge recensions.

Where a work exists in materially different recensions or shakhas:

- identify the recension explicitly;
- preserve its own citation scheme;
- record variants that affect meaning;
- avoid presenting one recension as universally canonical.

## Web-source stability

Prefer sources with:

- stable URLs;
- institutional ownership;
- persistent identifiers;
- edition metadata;
- predictable citation structure.

Archive access dates in the source registry.

## Copyright and reuse

The underlying ancient text may be in the public domain while a modern:

- transcription;
- critical edition;
- translation;
- commentary;
- apparatus;
- annotation;
- TEI/XML encoding

may have separate copyright or licence restrictions.

For every reusable source, record:

- licence if known;
- whether the underlying text is public domain;
- whether the digital transcription may be redistributed;
- whether quoted translation is copyrighted;
- whether commercial reuse is restricted.

Do not copy an entire externally hosted digital corpus into this repository unless its licence clearly permits that use.

Prefer storing:
- source metadata;
- exact references;
- short permitted excerpts;
- our own notes;
- our own translations where appropriate.

## Source registry

All approved sources must eventually be represented in:

`data/sources.yaml`

Each source record should include, where applicable:

- source ID;
- name;
- institution;
- source type;
- URL;
- edition basis;
- languages;
- texts covered;
- role in verification;
- licence;
- access date;
- reliability notes.

## Corpus registry

A text may only be treated as an approved project text when it is listed in:

`data/corpus.yaml`

Each corpus record should identify the permitted source witnesses for that work.

## Primary passage verification

Before a passage becomes canonical:

1. verify its exact reference;
2. verify the source-language text;
3. check the source witnesses the claim requires, per the editorial
   verification principle;
4. record material variants;
5. confirm the citation scheme;
6. verify transliteration;
7. distinguish source text from editorial normalization.

Step 3 scales with the claim. A plainly attested passage may rest on the one
usable source; a disputed reading, a material recension difference, or a
priority, correspondence, or transmission claim calls for more. What must
always be recorded is which source was actually used and what its limits are.

## Translation sourcing

When using an external translation:

- identify the translator;
- identify the edition;
- preserve attribution;
- obey copyright limitations;
- quote only where legally and editorially appropriate.

When producing an internal translation:

- label it as an editorial or working translation;
- record difficult terms;
- note interpretive choices;
- compare against recognised translations.

## Commentary sourcing

For claims such as:

“Shankara interprets this as...”

verify against:
- the commentary itself where possible;
- a recognised edition or translation;
- a strong scholarly secondary source if necessary.

Do not attribute a view to a commentator based only on a popular summary.

## Historical claims

Claims about:
- dates;
- authorship;
- transmission;
- influence;
- priority;
- institutions;
- social practice

must be sourced separately from the primary text when the text itself does not establish the historical claim.

Traditional attribution and modern historical scholarship must remain distinguishable.

## Scientific and technical claims

Ancient textual evidence is not sufficient to establish a modern scientific conclusion.

Modern scientific claims require modern scientific sources.

Where a historical scientific achievement is asserted, verify both:
- the ancient technical source;
- modern historical scholarship about that source.

## Unresolved source problems

If:
- the edition is uncertain;
- witnesses conflict;
- numbering differs materially;
- a translation is disputed;
- a source cannot be verified;

keep the material in `/research`.

Do not resolve uncertainty by guessing.
