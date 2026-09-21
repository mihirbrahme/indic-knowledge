# Indic Knowledge Project

This repository is a source-first editorial knowledge system for authentic Indic textual and intellectual traditions.

## Core objective

Create a rigorous, accessible, curiosity-driven public knowledge garden based on authentic primary texts.

Every published entry must clearly distinguish:

1. What the original text says.
2. Traditional interpretation.
3. Historical or scholarly interpretation.
4. Modern analogy or conceptual parallel.
5. Modern scientific evidence.

Ancient ideas must not be made to sound more modern than the evidence supports.

## Repository boundaries

- `/content` contains material eligible for public publication through Quartz.
- `/research` contains working material and is never authoritative.
- `/data` contains canonical machine-readable registries and generated data.
- `/scripts` contains project automation and CLI tools.
- `/templates` contains reusable note and data templates.
- `/docs` contains technical and workflow documentation.

## Authority hierarchy

When instructions conflict, follow this order:

1. `AGENTS.md`
2. `EDITORIAL_STANDARD.md`
3. `SOURCE_POLICY.md`
4. `CLAIM_POLICY.md`
5. `data/corpus.yaml`
6. `data/sources.yaml`
7. Task-specific instructions

Never override source or claim rules merely to make an entry more interesting.

## Primary-text rule

Do not create or publish a canonical passage unless:

1. The work is approved in `data/corpus.yaml`.
2. Its permitted sources are registered in `data/sources.yaml`.
3. The exact chapter, section, verse, sutra, mantra, karika, or equivalent coordinate has been verified.
4. The original-language text has been checked against the approved source witnesses.
5. Material textual variants are recorded when relevant.

Never invent, reconstruct, silently normalize, or paraphrase a primary text as though it were a quotation.

## Translation rule

Always distinguish:

- original text;
- transliteration;
- literal working translation;
- readable editorial translation;
- quoted published translations.

Do not silently present a modern paraphrase as a literal translation.

Important Sanskrit or technical terms should be retained where translation would materially flatten the concept.

## Ancient-modern connection rule

Every modern connection must be classified.

Permitted relationship types include:

- still-the-same-question
- conceptual-parallel
- historical-connection
- historical-continuity
- scientific-correspondence
- modern-interpretation
- contested-connection
- not-the-same-thing

Similarity alone does not establish influence, prediction, discovery, or scientific equivalence.

Do not make claims such as "the Vedas discovered modern physics" unless exceptionally strong primary and historical evidence genuinely supports the specific claim.

## Scientific claims

For any scientific or technical comparison:

1. State precisely what the ancient source claims.
2. State precisely what modern evidence establishes.
3. Explain the actual point of comparison.
4. Explain where the comparison breaks.
5. Distinguish conceptual similarity from historical transmission.
6. Record contrary evidence or limitations where material.

## Medical material

Historical medical texts may be described and analysed.

Do not turn historical prescriptions into modern medical advice.

Always distinguish:

- historical medical theory;
- traditional interpretation;
- empirical observation;
- modern biomedical evidence;
- current clinical guidance.

## Editorial tone

Prefer curiosity over triumphalism.

Avoid:
- sensational claims;
- civilisational boasting;
- "ancient Indians knew everything" framing;
- forced modern relevance;
- treating modern science as the only measure of intellectual value;
- flattening competing traditions into one view.

Rigor should not remove wonder.

## AI role

AI may:

- identify candidate passages from the approved corpus;
- collect source references;
- compare editions and translations;
- create research dossiers;
- identify commentarial perspectives;
- research modern connections;
- draft reader-facing explanations;
- challenge unsupported claims;
- validate metadata and links;
- propose scheduling and cross-links.

AI may not independently:

- approve a new canonical source;
- promote research material into authoritative content;
- publish an entry as verified;
- invent missing textual evidence;
- hide material uncertainty;
- decide that a speculative scientific analogy is an established correspondence.

Human editorial approval is required before an entry becomes publishable.

## Research versus publication

Material in `/research` may be speculative, incomplete, contradictory, or AI-generated.

Never cite `/research` as authoritative evidence merely because it exists in the repository.

Only verified material should move into `/content`.

## Scheduling principle

Daily entries may be produced in batches.

Each entry will eventually contain its own publication metadata.

The publication schedule must be generated from entry metadata rather than maintained as an independent manual source of truth.

Scheduling should aim for intellectual variety across:

- source family;
- historical period;
- discipline;
- theme;
- difficulty;
- surprise type;
- modern connection type.

## Long-term knowledge model

Treat passages, texts, concepts, people, traditions, deep dives, pathways, and daily entries as separate but linked knowledge objects.

A daily entry is an editorial experience built from verified knowledge objects. It is not itself the canonical representation of the underlying source.

## When uncertain

Do not guess.

Record the uncertainty, identify what must be verified, and keep the material in `/research` until it is resolved.
