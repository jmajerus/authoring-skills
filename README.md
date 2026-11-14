# authoring-skills

The skills an agent follows to write from the library through the Authoring MCP portal's six servers
(holdings, corpus, quote, terminology, zotero, iasp). They lived in holdings-mcp and corpus-mcp until 2026-11-14.

| Skill | For |
|---|---|
| [portal-article](portal-article/SKILL.md) | A standalone essay through all six servers, rendered by iasp-mcp to HTML, Markdown, Ghost, PDF, and EPUB |
| [cited-article](cited-article/SKILL.md) | An article or chapter that needs only the corpus and quote servers, built with local Pandoc |

[scripts/check-draft.mjs](scripts/check-draft.mjs) is the one draft checker; each skill reaches it through a
symlink in its own folder.

[examples/cited-article/](examples/cited-article/) holds a finished cited-article piece with its saved quotes.
`node --test` runs the checker over each example.

## Installing

Link each skill into `~/.claude/skills`:

```bash
ln -sfn "$PWD/portal-article" ~/.claude/skills/portal-article
ln -sfn "$PWD/cited-article" ~/.claude/skills/cited-article
```

## Keeping in step with the servers

holdings-mcp checks every ten minutes that each server still lists the tools these skills call
(`TOOLS_SKILLS_USE` in its `src/tools.ts`, the `tools-skills-use` check). When a skill starts or stops calling a
tool, change that list in the same piece of work.
