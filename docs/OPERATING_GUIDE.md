# Operating Guide

How the project runs day to day.

**The interface is a conversation.** Open a CLI agent in the repository and
talk to it. The commands at the bottom of this page exist so that you and the
agent can inspect state when something looks wrong — they are support and debug
tools, not the way work normally gets done.

---

## For Mihir

You should never have to think about IDs, YAML, filenames, frontmatter,
dossier status or transclusion syntax. Say what you want. The agent handles the
mechanics and tells you only what actually matters.

### Finding something to write about

> **You:** Find me interesting ideas about mind in the Upanishads.
>
> **Agent:** *(reads texts and scholarship, comes back with five)* Here are
> five. Number 2 is the one I would push — the Kena opens by asking what
> *impels* the mind, and groups the mind with breath and hearing as something
> driven rather than the driver. Most popular summaries turn this into a
> statement about consciousness, which the Sanskrit does not support.

Other openings that work:

- "Give me stranger things from Ayurveda."
- "Anything surprising in Panini?"
- "What does this text disagree with itself about?"

Nothing is written to disk at this stage. These are just ideas.

### Going deeper

> **You:** I like number 3 — research it.

Now the agent opens a dossier and starts gathering evidence. From here you can
push on it in ordinary language:

- "Go deeper."
- "What does the original Sanskrit actually say?"
- "What do commentators disagree about?"
- "Is the modern connection legitimate?"

Expect to be argued with. If a modern parallel does not hold up, the agent
should say so rather than write it up and let a reviewer catch it later.

### Making the post

> **You:** Make this into a post.

The agent creates the evidence notes and the entry, validates, builds, and
shows you the draft. Then:

- "Make it simpler."
- "This sounds too spiritual — sharpen it."
- "The hook is weak."

### Getting it out

> **You:** Approve this. → moves to `editor-approved`
>
> **You:** Make it ready. → validates, moves to `ready`
>
> **You:** Add this to the publishing queue. / Schedule it for next week.
>
> **You:** What do I have ready to publish?
>
> **You:** Publish.

**Approval is explicit.** Saying "nice" or "looks interesting" does not approve
anything — the agent will not read casual enthusiasm as a decision.

---

## For agents

`AGENTS.md` is authoritative; this is the operational summary.

### When to create files

| Mihir says | What happens |
|---|---|
| Browsing, speculating, "what about…" | **Nothing is written.** Discuss. |
| "Research this", "develop this" | Create or update a dossier. |
| Evidence becomes relevant to a real piece | Create passage notes. |
| "Make this into a post" | Create or update the entry. |

Do not create a dossier for every passing thought. Do not create a passage note
until a specific piece needs that evidence.

### The standard sequences

**"Research this"** — find or create the dossier, gather evidence, update it,
discuss the findings. Lead with what you found, not with the file you wrote.

**"Make this into a post"** — create the passage note(s), create or update the
entry, preserve the evidence relationships, run `ik validate`, run
`npx quartz build`, report the draft.

**"Approve this"** — `editor-approved`, and only on an explicit instruction.

**"Make it ready"** — validate, then `ready` if structurally valid.

**"Schedule it"** — next free date unless Mihir names one; status to
`scheduled`; keep `draft` consistent.

**"Publish"** — validate, update status and date, build, commit, push.

### What the tooling will not decide

`ik` validates structure. It does not decide whether an interpretation is good,
whether an entry is worth publishing, whether a contested claim is correct, or
whether a modern connection is compelling. Those stay with the agent and Mihir.

A green `ik validate` means the repository is consistent. It does not mean the
writing is any good.

### Git rhythm

Exploratory research may stay uncommitted. Commit at editorial checkpoints — a
batch of drafts, a scheduling batch, a publication, a tooling change. For
publishing: validate → build → commit → push.

---

## Configuration

`ik.config.yaml` at the repository root. It holds the publishing timezone
(default **Asia/Kolkata**) and the daily rhythm. All date logic — "today", the
next publishing day, the runway — resolves in that zone.

`publish_date` in entry frontmatter is the **only** schedule authority. There is
no separate schedule file to keep in step.

---

## Useful manual commands

Run from the repository root.

```
npm run ik -- <command>      # works everywhere
.\ik.cmd <command>           # Windows shorthand
node scripts/ik.mjs <command>
```

| Command | What it does |
|---|---|
| `ik status` | Project state at a glance: corpus, dossiers, entries, runway, warning count. |
| `ik find <query>` | Text search across corpus, families, candidates, passages, entries and dossiers. |
| `ik validate` | Structural validation. Errors and warnings reported separately; exits non-zero on errors. |
| `ik schedule show` | Upcoming entries ordered by `publish_date`, with collision marks and runway. |
| `ik schedule next <entry-id>` | Assign the next free publishing date. Advances `ready` → `scheduled`. |
| `ik schedule move <entry-id> <YYYY-MM-DD>` | Move an entry. Warns on collisions and past dates. Never publishes. |
| `ik publish-check <entry-id>` | `READY` or `NOT READY`, with concrete reasons. |
| `ik stats` | Distributions: family, discipline, status, runway, source gaps. |

**Publishing runway** is the number of consecutive future dates, starting from
the next publishing day, that already hold a scheduled entry. It stops at the
first gap — so a runway of 7 means the next seven days are covered.

`ik validate` and `ik publish-check` exit non-zero on failure, so they can gate
a publish step. The rest exit zero.
