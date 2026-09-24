# Web Experience

The reader's journey through Indic Knowledge, and what each page is for.

Companion to `docs/DESIGN_SYSTEM.md`, which covers how it looks. This document
covers what it should feel like and why.

**Status: proposed.** Prototypes live in `design-prototypes/`. Nothing is wired
into Quartz yet.

---

## The journey

```
LAND → DISCOVER → READ → UNDERSTAND → CONNECT → EXPLORE
```

It maps onto the six-stage editorial model in `EDITORIAL_STANDARD.md`, with one
addition at the front: **LAND**, the first four seconds, where the site either
earns curiosity or loses it.

The journey is not a funnel. A reader who lands, reads one question, and
leaves has had a complete experience. Everything after UNDERSTAND is optional
by design.

---

## Homepage

**What the reader should see.** One question, large, in the middle of a lot of
space. A one-line teaser. A quiet credit — *Kena Upaniṣad · 1.1 · 4 min read*.
One link in.

Below the fold, three restrained bands: recently explored questions, four
routes into the material, three pathways.

**What the reader should feel.** That someone is asking them something
interesting, and that the person asking knows what they are talking about.

Not: that they have arrived at a database, a portal, a course, or a shrine.

**Why the question leads.** *What makes the mind able to think?* needs no
preparation and no Sanskrit. *Kena Upaniṣad 1.1* needs both. Putting the source
second does not hide it — it appears immediately underneath, and it is what
makes the question worth trusting. The order is: curiosity, then authority.

**Why there is no Sanskrit above the fold.** Devanagari on a homepage reads as
a signal about *who the site is for*. Placed first, it says "for people who
already read this". Placed inside the article, where it is the evidence for a
question the reader already cares about, it says "here is what the text
actually says". Same text, opposite effect.

**Recently explored** is five questions with their sources and reading times —
a list, not a grid of cards. It should read like a contents page.

**Explore the map** replaces folders with four intellectual routes: Texts,
Ideas, People, Disciplines. Each gets one sentence and a 2px rule. The reader
should understand that the site is organised by *kinds of curiosity*, not by
directory.

**Pathways** are three curated sequences. Editorial, not promotional.

---

## Entry

The daily reading experience, and the page that matters most.

**Top.** Small metadata, then the question at display size, then the hook. No
image, no byline block, no share furniture. The reader should be reading the
second sentence within a few seconds of arriving.

**Original.** The passage block — the signature component. Large Devanagari,
transliteration, a fine rule, the working translation, and a metadata footer
that includes *Source notes →*.

Two things must be simultaneously true here: the Sanskrit is visually
important, and a reader with no Sanskrit is never stranded. The translation is
one rule away, always.

The entry **transcludes** this block from the passage note. It never restates
the text. That is a content-model rule (`CONTENT_MODEL.md`), and the design
depends on it: one passage, one rendering, corrected in one place.

**Understand.** Roughly 150 words of plain prose. A small section marker, not
a headline. The prose is the page; the label is a signpost.

**Perspectives.** Attributed readings, separated by a marginal rule, never
merged into a single view. When there is no registered commentary the section
says so plainly — as it does on the Kena prototype. An honest absence is part
of the design, not a gap in it.

**Connect.** The most dangerous section on the site, and the one the design
works hardest on. A typed relationship label (`STILL THE SAME QUESTION`),
restrained prose, and a quiet caveat line. It must read as *here is why this
is still interesting* and never as *the ancients already knew this*.

**Explore.** Three links of different kinds — from this text, follow the idea,
another question. This is the rabbit hole, and it is the point: every entry
should leave the reader with somewhere to go.

**Source notes.** A closed disclosure. Canonical text, locator, the witness
actually inspected, the edition anchor, translation status, caveat.

The reader who wants provenance gets it in one click. The reader who does not
never sees an academic paper. Both are first-class.

**What the reader should feel.** That they have been told something true,
precisely, by someone who was careful — and that there is more.

---

## Future intent

Sketched, not designed. These pages get their own pass.

### Text page

The work itself: what it is, how it reaches us, what is still unsettled about
it. The natural home for recension, transmission and source-status material
that would clutter an entry. Reads as a museum catalogue entry rather than a
database record.

### Concept page

A single idea — *manas*, *pramāṇa*, *rasa* — followed across texts and
centuries. It accumulates. The design problem is showing a concept's movement
between traditions without flattening disagreement into a definition.

### Explore

The richer navigational surface, where a sidebar, filters and faceting are
appropriate. Explicitly *not* the reading experience: article pages stay
chrome-free.

### Pathways

Curated sequences with a sense of position — where you are, what came before,
what is next. Closer to a reading list than a course. No progress gamification.

### Explore → Map

**The knowledge graph lives here, and only here.**

It is supplementary exploration, not the navigation model. It does not appear
on the homepage and it does not appear on articles. A graph is what the site
looks like to someone who already understands it; a question is what it looks
like to someone who does not. The homepage is for the second reader.

---

## Navigation

Reading pages carry: a minimal top bar, a 2px reading-progress line, and
nothing else. No permanent file explorer, no backlinks panel, no graph, no
floating controls.

Quartz's default is a knowledge-garden interface — a sidebar-heavy view that
serves someone browsing a vault. This site is a publication that a stranger
lands on. The two need different chrome, and article pages get the publication
version.

---

## Mobile

Not a reduced desktop. Most readers will arrive on a phone, from a link.

The question and the passage must stay visually strong at 390px — the question
at 34px, the Devanagari at 23px with full conjunct legibility. Sidebars do not
exist. Source notes stay collapsible. Explore links are full-width taps.

The mobile reader should get the same *feeling* as the desktop reader — calm,
spacious, serious — not a compressed version of it.
