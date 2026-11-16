# authoring-skills

The skills an agent follows to write from the library through the Authoring MCP portal's six servers
(holdings, corpus, quote, terminology, zotero, iasp). They lived in holdings-mcp and corpus-mcp until 2026-11-14.

| Skill | For |
|---|---|
| [portal-article](portal-article/SKILL.md) | A standalone essay through all six servers, rendered by iasp-mcp to HTML, Markdown, Ghost, PDF, and EPUB |
| [cited-article](cited-article/SKILL.md) | An article or chapter that needs only the corpus and quote servers, built with local Pandoc |

[scripts/check-draft.mjs](scripts/check-draft.mjs) checks a cited-article draft, through a symlink in that
skill's folder. portal-article needs no script: iasp-mcp compares every marked quote with the quote store and builds
the bibliography when it validates and renders.

[examples/cited-article/](examples/cited-article/) holds a finished cited-article piece with its saved quotes.
`node --test` runs the checker over each example.

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
