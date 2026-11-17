# authoring-skills

The skills an agent follows to write from the library through the Authoring MCP portal's six servers
(holdings, corpus, quote, terminology, zotero, iasp). They lived in holdings-mcp and corpus-mcp until 2026-11-14.

| Skill | For |
|---|---|
| [portal-article](portal-article/SKILL.md) | A standalone essay through all six servers, rendered by iasp-mcp to HTML, Markdown, Ghost, PDF, and EPUB |
| [cited-article](cited-article/SKILL.md) | An article or chapter that needs only the corpus and quote servers, built with local Pandoc |

## Research aids

For a writer who does the writing themselves. Each hands back a report, and all but quote-harvest only read.

| Skill | The writer asks | It hands back |
|---|---|---|
| [source-survey](source-survey/SKILL.md) | What do I have on this topic? | Works by what can be done with them, the strongest passages, and thin spots |
| [draft-check](draft-check/SKILL.md) | Are the quotes and citations in my draft right? | Each quotation compared with the saved quote or the e-book, and each citation's work and page |
| [quote-harvest](quote-harvest/SKILL.md) | Collect the passages worth keeping from this book | Candidate passages, saved as verified quotes once approved |
| [concept-dossier](concept-dossier/SKILL.md) | Trace this idea through my books | The concept's neighbours and opposites, what the authors say it is, and where they differ |
| [counter-reading](counter-reading/SKILL.md) | Who in my library argues against this? | The case against a claim, read in context, or a plain statement that the library holds none |
| [reading-gaps](reading-gaps/SKILL.md) | What am I missing on this topic? | Works held but not citable, never quoted, or without text, and works the owner's books cite that are not held |

[shared/library.md](shared/library.md) is what these six have in common: the tools, the three kinds of holding,
keys, and page numbers. Each skill folder reaches it through a `library.md` symlink.

## Smaller models

[LITE-MODELS.md](LITE-MODELS.md) records how the skills behave on smaller models, one section per model tested.
[LITE-MODELS-PLAN.md](LITE-MODELS-PLAN.md) is the plan for local models that have not been tested yet.

## Checks

[scripts/check-draft.mjs](scripts/check-draft.mjs) checks a cited-article draft, through a symlink in that
skill's folder. portal-article needs no script: iasp-mcp compares every marked quote with the quote store and builds
the bibliography when it validates and renders.

[examples/cited-article/](examples/cited-article/) holds a finished cited-article piece with its saved quotes.
`node --test` runs the checker over each example, and checks that every skill folder has a well-formed `SKILL.md`
whose links resolve.

## Installing

See [INSTALLING.md](INSTALLING.md) for Claude Code, Codex, GitHub Copilot,
Kilo Code, Cline, and ZCode, including the MCP and local tool prerequisites.
The author's private Authoring MCP Portal exposes all six servers through one
connection; access requires explicit authorization. You can deploy your own
portal subject to the applicable project licenses.

## License

This repository is licensed under the [PolyForm Noncommercial License 1.0.0](LICENSE.md),
matching the related server projects. The license does not grant access to the
author's hosted services or rights to third-party works quoted in the examples.

## Keeping in step with the servers

holdings-mcp checks every ten minutes that each server still lists the tools these skills call
(`TOOLS_SKILLS_USE` in its `src/tools.ts`, the `tools-skills-use` check). When a skill starts or stops calling a
tool, change that list in the same piece of work.
