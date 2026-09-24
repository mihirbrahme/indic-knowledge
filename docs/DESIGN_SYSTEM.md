# Design System

The visual language of Indic Knowledge. Implementation-ready: every token here
exists in `design-prototypes/styles.css`.

**Status: proposed.** Nothing in this document is wired into Quartz. The
production implementation happens after review.

---

## Philosophy

The site should read as a serious contemporary editorial publication about
India's textual traditions — a literary journal that happens to be a research
environment.

Five commitments drive every decision below.

**Question first.** The reader meets *What makes the mind able to think?*
before *Kena Upaniṣad 1.1*. The question creates curiosity; the source supplies
authority. Both matter, in that order.

**The original text matters.** Sanskrit is set large, given room, and treated
as the evidence it is — never as decoration, and never in a way that makes a
reader without Sanskrit feel shut out. The translation is always within reach.

**Layered depth.** Three to five minutes is a complete experience. Everything
beyond that — passage, concept, commentary, source notes — is available and
never compulsory.

**Quiet authority.** Provenance is one click away, not in the reader's face.
The default article must not look like an academic paper.

**Indic, not ornamental.** Geometry, proportion, a bindu, fine rules, generous
margins, typography. No mandalas, no lotuses, no diyas, no parchment texture,
no temple silhouettes, no religious iconography.

---

## Palette

| Token | Hex | Role |
|---|---|---|
| `--ink` | `#17263C` | Deep Ink Navy. Headings, the question, wordmark, structural rules. |
| `--ivory` | `#F7F3EA` | Warm Ivory. The page ground. |
| `--copper` | `#A6633C` | Burnished Copper. **Graphic accent only.** |
| `--charcoal` | `#262626` | Body prose. |
| `--stone` | `#D9D3C7` | Muted Stone. Marginal rules, quiet borders. |

Derived:

| Token | Hex | Role |
|---|---|---|
| `--ivory-2` | `#F1EBDE` | Recessed ground for the passage block. |
| `--ivory-3` | `#EDE6D6` | Hover / pressed ground. |
| `--copper-text` | `#8A5130` | Copper dark enough for small text. |
| `--ink-muted` | `#4A5A72` | Metadata, secondary prose. |
| `--rule` | `#DED8CB` | Hairlines. |
| `--rule-strong` | `#C6BFAF` | Structural rules. |
| `--focus` | `#1F6FEB` | Focus ring. Deliberately *not* copper. |

### The copper rule

`--copper` measures **4.24:1** on ivory. That passes AA for large text and for
graphics, and **fails for body text**. So:

- `--copper` is for the bindu, rules, marks and hover states;
- `--copper-text` (**5.75:1**) is for any copper-coloured text at reading size;
- copper is never a background, never a fill, and never more than a few percent
  of the page.

No gradients anywhere. The focus ring is blue rather than copper so that focus
never reads as decoration.

### Dark mode

Quartz ships with `mode: both`, so dark is not optional.

| Token | Dark |
|---|---|
| `--ivory` | `#131A28` |
| `--ivory-2` | `#18202F` |
| `--ink` | `#E8E3D8` |
| `--charcoal` | `#DDD8CC` |
| `--copper` | `#C9855A` |
| `--rule` | `#26303F` |

Ivory and ink swap roles; copper lightens to hold 5.69:1. Applied via
`prefers-color-scheme` and overridable with `data-theme`.

---

## Typography

Three families. Each has one job.

| Role | Family | Used for |
|---|---|---|
| Editorial serif | **Source Serif 4** | The question, all body prose, pull lines, translations |
| Neutral sans | **Inter** | Navigation, metadata, labels, controls, filters |
| Devanagari | **Noto Serif Devanagari** | All original-language text |

**Why one serif, not two.** A display serif plus a text serif is the obvious
editorial move and the wrong one here. Source Serif 4 carries 62px display and
17px prose from a single family, which keeps the voice disciplined — closer to
quiet authority than to a magazine's range of registers. Size, weight and
tracking do the work that a second family would otherwise do.

**Why Noto Serif Devanagari.** Excellent conjunct rendering (verified on
`क्षु`, `श्रो`, `न्ति`, `क्तः` at 23px), generous metrics, Unicode-complete,
actively maintained, and it is a serif — so the Sanskrit sits in the same
typographic world as the English rather than looking pasted in. It is a text
face, not a calligraphic or "Sanskrit-style" display font.

Fallbacks: `ui-serif → Georgia` for the serif; `system-ui → Segoe UI` for the
sans; `Noto Sans Devanagari → Nirmala UI → Mangal` for Devanagari, so Windows
readers get a real Devanagari face even offline.

**No font binaries are committed.** The prototypes load from Google Fonts. The
production decision — self-host a subset, or keep the CDN — is deliberately
deferred.

### Type scale

Fluid via `clamp()`. Mobile value → desktop value.

| Token | Size | Line height | Use |
|---|---|---|---|
| `--t-micro` | 11px | 1.4 | Section labels, metadata caps |
| `--t-small` | 13px | 1.5 | Metadata, captions, caveats |
| `--t-meta` | 14px | 1.5 | Navigation, source terms |
| `--t-body` | 17 → 19px | **1.72** | All prose |
| `--t-lead` | 19 → 22px | 1.55 | Opening paragraph, teaser |
| `--t-h2` | 20 → 23px | 1.35 | Question list items, pathway titles |
| `--t-display` | 34 → 62px | **1.06** | The question |
| `--t-deva` | 23 → 30px | **2.00** | Devanagari |
| `--t-iast` | 15 → 17px | 1.75 | Transliteration |

Weights: 400 for prose and display, 500–600 for sans labels and emphasis.
Nothing is bolder than 600.

Three line-heights are load-bearing:

- **1.72 for prose** — long-form comfort on a warm ground.
- **1.06 for display** — the question must read as one object, not four lines.
- **2.00 for Devanagari** — conjuncts and vowel signs extend above and below
  the baseline far more than Latin. At 1.5 they collide. This is the single
  most important typographic setting on the site.

Tracking: `-0.022em` on display, `-0.012em` on mid-size serif, `+0.14em` on
uppercase sans labels. Devanagari gets **no letter-spacing at all** — it breaks
conjunct formation.

---

## Spacing and geometry

8px spine: `--s1` 4px through `--s10` 128px.

| Token | Value |
|---|---|
| `--s4` | 16px |
| `--s5` | 24px — paragraph rhythm |
| `--s6` | 32px — label to prose |
| `--s7` | 48px — passage block padding |
| `--s8` | 64px — between article sections |
| `--s9` | 96px |

**Reading widths.**

- `--measure` = **43rem (688px)** — all prose. Inside the 680–760px target.
- `--measure-wide` = **60rem (960px)** — homepage bands, explore grid, header.
- `--gutter` = `clamp(20px, …, 48px)`.

**Borders.** 1px `--rule` for hairlines. 2px `--ink` where a rule is
structural (route columns, the Explore divider). 2px `--stone` for the
perspective margin rule.

**Radius.** `--radius: 2px`, used only on the passage block. Nothing else is
rounded. There are no cards on either prototype.

---

## Signature mark

The **bindu** — a 5px copper dot. It is the project's printer's mark, and it is
the only ornament in the system.

It appears: before every section label; in the wordmark; at the centre of the
homepage's radial figure.

The **section marker** is a bindu, the label, and a hairline running to the
edge of the measure:

```
● UNDERSTAND ─────────────────────────────────
```

The **radial figure** on the homepage is two concentric circles, a vertical and
a horizontal axis, and a copper bindu at the centre — drawn in `--rule-strong`
at 50% opacity, hidden below 900px. It is a geometric cue, not an illustration.

The **passage mark** is a 28px copper bar at the shoulder of the passage block,
sitting on the same left margin as the text.

No logo. The wordmark **Indic Knowledge** plus a bindu is sufficient.

---

## The passage block

The signature component. A reader must understand at a glance: *this is the
evidence.*

```
▂▂  (copper axis mark)

ORIGINAL

ॐ केनेषितं पतति प्रेषितं मनः          ← Devanagari, 23–30px, lh 2.0
केन प्राणः प्रथमः प्रैति युक्तः ।

oṃ keneṣitaṃ patati preṣitaṃ manaḥ    ← IAST, italic, muted
kena prāṇaḥ prathamaḥ praiti yuktaḥ |

────────────────────────────────────   ← fine rule

Impelled by what does the mind fly     ← working translation, body size
out towards its object, sent forth?

────────────────────────────────────
Kena Upaniṣad · 1.1 · Working translation · Source notes →
```

Construction:

- Ground: `--ivory-2`, a 6% shift from the page. No border, no box, no texture.
- Padding: `--s7` vertical, `--passage-pad` horizontal.
- **Negative horizontal margin equal to its own padding**, so the Sanskrit sits
  on exactly the same optical margin as the prose above it. The panel recedes;
  the text does not shift. On mobile this becomes a near-full-bleed (the block
  reaches within ~5px of the viewport edge) which is the intended treatment.
- Devanagari carries `lang="sa"`; IAST carries `lang="sa-Latn"`.

The translation is never more than one rule away from the Sanskrit. A reader
with no Sanskrit is never stranded.

---

## Section markers

`UNDERSTAND`, `PERSPECTIVES`, `CONNECT` are **11px uppercase sans labels**,
not headings. They behave like magazine section markers: the prose stays
dominant.

Semantically they are still `<h2>` inside `<section aria-labelledby>`, so the
document outline is correct even though the visual weight is minimal.

`Continue exploring` is the one exception — a 23px serif heading, because it
marks the end of the article and the start of the rabbit hole.

---

## Perspectives

Designed for attributed readings that will disagree with each other.

- 2px `--stone` rule on the inline start, 24px padding.
- Attribution in sans 13px/600 with the school and date in `--ink-muted`.
- Prose at normal body weight.

No cards, no boxes, no portraits. **Nothing in the treatment ranks one
commentator above another** — disagreement must read as disagreement, never as
a single synthesised "Indian view" (`CLAIM_POLICY.md`).

---

## Connect

Must communicate *we are now making a modern connection* without ever implying
*this ancient text scientifically proved the following*.

- The relationship type as a small copper-text label: `STILL THE SAME QUESTION`.
  It comes from the `connection_types` vocabulary in `FRONTMATTER_SCHEMA.md`.
- Prose at normal weight, no special ground, no icon.
- A caveat line, 13px italic `--ink-muted`, above a hairline:
  *Conceptual connection — not historical or scientific equivalence.*

The caveat is set as a quiet footnote rather than a warning banner. It should
read as precision, not as defensiveness.

---

## Metadata and links

**Metadata voice**: sans, 11–14px, `--ink-muted`, lining numerals. Uppercase
with `+0.14em` tracking for labels; sentence case for inline credits. Separated
by a 3px stone dot, never a pipe.

**Prose links**: inherit colour, 1px `--rule-strong` underline at `0.18em`
offset. On hover the text becomes `--copper-text` and the underline copper.

**Navigation links**: sans 14px `--ink-muted`, no underline; a copper bottom
border on hover and on the current page.

**Directional links**: text plus a `→` in `--copper-text`, marked
`aria-hidden`. The arrow shifts 3px on hover.

---

## Source disclosure

A `<details>` element. Closed by default.

- Summary: sans 14px `--ink-muted`, preceded by a copper `+` that becomes `−`.
- Body: a two-column definition list — canonical text, locator, witness used,
  edition anchor, translation status — then the caveat.

It carries the real distinction the schema makes: the witness that was
**inspected** and the edition anchor that was **registered but not opened**.
The design must keep that visible, because it is the project's core discipline.

Visually quiet. A reader who wants provenance finds it in one click; a reader
who does not never sees an academic apparatus.

---

## Mobile

Designed at 390px as a first-class experience, not a fallback.

- Single column. No sidebars, ever.
- Gutter 20px; the passage block bleeds to within ~5px of the edge.
- Devanagari floors at **23px** — raised from 21px after testing, because
  conjuncts need the size more than Latin does.
- Body 17px, question 34px, IAST 15px.
- Nav wraps below the wordmark and stays visible. No hamburger, no drawer.
- Explore groups stack with hairline separators; every link is a full-width
  tap target.
- Verified: **no horizontal overflow at 390, 768, 1024 or 1440.**

---

## Accessibility

Measured on the prototypes, not asserted.

| Pair | Ratio |
|---|---|
| Body on ivory | 13.67:1 |
| Question on ivory | 13.75:1 |
| Labels on ivory | 6.33:1 |
| `--copper-text` on ivory | 5.75:1 |
| Devanagari on passage ground | 12.82:1 |
| IAST on passage ground | 5.90:1 |
| `--copper` accent on ivory | 4.24:1 — **graphics and large text only** |

Zero contrast failures across both prototypes.

Also enforced:

- Semantic HTML: `header`, `main`, `article`, `section[aria-labelledby]`,
  `nav[aria-label]`, `figure`/`figcaption` for the passage.
- One `<h1>` per page; no skipped heading levels.
- Visible focus: 2px `--focus` ring at 3px offset on every focusable element,
  verified via `:focus-visible`.
- A skip link to `#main`.
- `lang` on Sanskrit and transliteration so screen readers do not mispronounce.
- All text scales with the root; no fixed pixel bodies.
- **No meaning carried by colour alone** — the `connection_types` label is
  always words, never a coloured chip on its own.
- `prefers-reduced-motion` disables the two transitions and the progress bar.
- A print stylesheet that expands the source notes and drops the chrome.

---

## What the system deliberately excludes

- No cards. A card would turn every section into a container and flatten the
  editorial hierarchy.
- No sidebar file explorer on reading pages.
- No knowledge graph on the homepage or the article — see
  `WEB_EXPERIENCE.md`.
- No gradients, shadows, or fills beyond the single passage ground.
- No illustration, iconography or imagery of any kind so far.
