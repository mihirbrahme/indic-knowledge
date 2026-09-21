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

## Multiple-witness rule

For a canonical primary-text passage, prefer:

1. one primary digital witness;
2. one independent verification witness;
3. one edition anchor where available.

Do not count three websites as independent witnesses if they derive from the same electronic transcription.

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
3. check at least the required source witnesses;
4. record material variants;
5. confirm the citation scheme;
6. verify transliteration;
7. distinguish source text from editorial normalization.

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
