#!/usr/bin/env node
// `ik` — support tooling for the Indic Knowledge editorial workflow.
//
// This CLI validates structure and reports state. It never decides whether an
// interpretation is good, whether an entry is worth publishing, whether a
// claim is correct, or whether a modern connection is compelling. Those are
// editorial judgements and belong to the agent and to Mihir.
//
// The intended interface is a conversation with an AI agent. These commands
// are its support and debug surface. See docs/OPERATING_GUIDE.md.

import { validate } from "./ik/validate.mjs"
import { status, find, stats, publishCheck, scheduleShow, scheduleAssign } from "./ik/report.mjs"

const USAGE = `
ik — Indic Knowledge support tooling

  ik status                          project state at a glance
  ik find <query>                    search corpus, notes and dossiers
  ik validate                        structural validation (non-zero on errors)
  ik schedule show                   upcoming entries by publish_date
  ik schedule next <entry-id>        assign the next free publishing date
  ik schedule move <entry-id> <date> move an entry to YYYY-MM-DD
  ik publish-check <entry-id>        READY / NOT READY, with reasons
  ik stats                           distributions and runway

Run from the repository root. Natural-language agent interaction is the
intended interface; these are support and debug commands.
`

function runValidate() {
  const { errors, warnings } = validate()
  const out = []
  if (errors.length) {
    out.push("", `Errors (${errors.length})`, "")
    for (const e of errors) out.push(`  ✗ ${e.where}\n      ${e.msg}`)
  }
  if (warnings.length) {
    out.push("", `Warnings (${warnings.length})`, "")
    for (const w of warnings) out.push(`  ! ${w.where}\n      ${w.msg}`)
  }
  if (!errors.length && !warnings.length) out.push("", "Clean — no errors, no warnings.")
  out.push("", `${errors.length} error(s), ${warnings.length} warning(s)`, "")
  console.log(out.join("\n"))
  return errors.length ? 1 : 0
}

function main(argv) {
  const [cmd, ...rest] = argv
  switch (cmd) {
    case undefined:
    case "help":
    case "-h":
    case "--help":
      console.log(USAGE)
      return 0

    case "status": {
      const r = status()
      console.log(r.text)
      return 0
    }

    case "find": {
      if (!rest.length) { console.error("Usage: ik find <query>"); return 2 }
      console.log(find(rest.join(" ")))
      return 0
    }

    case "validate":
      return runValidate()

    case "stats":
      console.log(stats())
      return 0

    case "publish-check": {
      if (!rest[0]) { console.error("Usage: ik publish-check <entry-id>"); return 2 }
      const r = publishCheck(rest[0])
      console.log("\n" + r.text + "\n")
      return r.ready ? 0 : 1
    }

    case "schedule": {
      const [sub, ...args] = rest
      if (!sub || sub === "show") { console.log(scheduleShow()); return 0 }
      if (sub === "next") {
        if (!args[0]) { console.error("Usage: ik schedule next <entry-id>"); return 2 }
        const r = scheduleAssign(args[0], null)
        console.log(r.text)
        return r.ok ? 0 : 1
      }
      if (sub === "move") {
        if (args.length < 2) { console.error("Usage: ik schedule move <entry-id> <YYYY-MM-DD>"); return 2 }
        const r = scheduleAssign(args[0], args[1])
        console.log(r.text)
        return r.ok ? 0 : 1
      }
      console.error(`Unknown: ik schedule ${sub}\nTry: show | next | move`)
      return 2
    }

    default:
      console.error(`Unknown command: ${cmd}`)
      console.error(USAGE)
      return 2
  }
}

try {
  process.exitCode = main(process.argv.slice(2))
} catch (err) {
  console.error(`\nik failed: ${err.message}\n`)
  if (process.env.IK_DEBUG) console.error(err.stack)
  process.exitCode = 2
}
