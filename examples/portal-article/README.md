# portal-article examples

Two essays the portal-article skill wrote on 2026-11-13, through the Authoring Portal's six servers, while the
skill was still kept in holdings-mcp. Each folder has:

- `<slug>.md`, the **source**: Markdown with IASP blocks (`::: {.note .context}`), citekeys, and a
  `<!-- quote <id> <concepts> -->` marker before each quote. This is the file to edit.
- `<slug>.html`, `<slug>.rendered.md` and `<slug>.ghost.md`, the **renders** iasp-mcp's `render_document` made
  from the source: a page to read, Markdown with the citations written out, and Markdown to paste into Ghost.
- `<slug>.bib`, the bibliography the renders were built from. The skill now leaves the bibliography to the
  renderer, which looks up each citekey itself; these drafts are from before that.
- `quotes.json`, each quote's saved text in quote-mcp, read back with `cite_quote` on 2026-11-17. `node --test`
  checks every marked quote in the source against it.

| Essay | What it shows |
|---|---|
| [Don't Blame the Lettuce](dont-blame-the-lettuce/dont-blame-the-lettuce.html) | Eight quotes from books, a web page, and paper-book transcriptions; EPUBs cited by chapter and PDFs by printed page; two run-in quotes |
| [Supper with the Enemy](supper-with-the-enemy/supper-with-the-enemy.html) | A topic found through the terminology's *opposite* link (conflict ↔ dialogue); three translations of one poem; a work cited from its catalogue record alone, and said so |

GitHub shows the `.html` files as code: [the Markdown render](supper-with-the-enemy/supper-with-the-enemy.rendered.md)
reads in place.
