---
name: portal-article
description: Write a standalone article or essay from the owner's own library through the Authoring Portal MCP servers (holdings, corpus, quote, terminology, zotero, iasp). Finds a topic the library can support, mixes passages checked against e-book text with quotes already transcribed from paper books, files uncatalogued books to Zotero staging, marks the piece up with IASP blocks, and renders it to HTML, Markdown, Ghost, PDF, and EPUB. Use this whenever the session has the portal's tools (names ending in find_work, search_corpus, add_quote, cite_quote, render_document) and the person asks for an article, essay, blog post, or demonstration piece drawn from their books, quotes, or reading notes, even if they name no topic and never say "skill". For a piece that only needs Corpus and Quote tools and local Pandoc, cited-article is enough.
---

# Portal article

You are writing an essay that a stranger could read with pleasure, built from one person's
library. Six MCP servers hold that library. The reader of the essay should never need to know
they exist; the person who asked should be able to trace every quoted word back to its book.

Those two aims pull against each other, and the skill is mostly about keeping both. An essay
that lists its servers is a test report. An essay whose quotes can't be traced is a liability.
So the essay carries its provenance quietly (comment markers, footnotes, one disclosure note)
and your handover message carries the tool story.

## The tools

Tool names carry a prefix that depends on how the portal is configured, and prefixes have
changed between sessions. Find tools by the end of the name. If a name below isn't there,
search your tool list for the last word before giving up.

| Server | It answers | Tools you will use |
|---|---|---|
| holdings | What does the owner have, and in what form? | `find_work`, `get_work`, `status` |
| corpus | What do the e-books say? | `search_corpus`, `read_book`, `cite_passage`, `pin_citekey`, `list_shelves`, `list_books` |
| quote | What has been quoted, and is it verified? | `search_quotes`, `get_concept`, `list_concepts`, `add_quote`, `cite_quote` |
| terminology | How do the concepts relate? | `search_terms`, `get_term` |
| zotero | Is the work catalogued? | `zotero_search_items`, `zotero_add_item`, `zotero_get_item_metadata` |
| iasp | What is each block doing, and how does it render? | `get_authoring_guide`, `validate_markdown`, `render_document` |

Three kinds of holding matter, because they decide how far a quote can be trusted:

- **E-book with text** (Calibre). `add_quote` checks your words against the file and saves
  them as `verified`. This is the only kind you can check yourself.
- **Paper book** with quotes the owner typed in earlier. These are `transcribed`: accurate
  as far as the owner's typing goes, with a real printed page. You cannot recheck them.
- **Catalogue record only** (Zotero, no text, no quotes). Citable, not quotable.

Some calls return far more than you can read. `status` on corpus or holdings and
`list_concepts` with no filter each return tens of thousands of characters. Pass a `query`,
a `shelf`, or a `limit`, or read the saved result with a script and pull out only what you need.

## 1. Find a topic the library can carry

Skip this if the person named a topic. If they left it open, don't pick from your own
interests: pick where the library is deep in more than one place.

1. `list_shelves` shows what subjects the e-books cover.
2. `list_concepts` (filtered, or sorted by quote count from the saved result) shows what the
   owner has been collecting quotes about. A concept with ten or more quotes is a theme they
   care about.
3. Take two or three promising concepts and run `search_corpus` for each. You want a concept
   that has transcribed quotes in the store *and* hits on at least two different shelves.
   The good essays come from books that don't usually sit together.
4. Call `get_concept` on the winner. Read its `opposite`, `broader`, and `related` links.
   These are the owner's own map of the idea, and an unexpected link is often the essay's
   argument. (In the first piece written this way, the store recorded the opposite of *blame*
   as *inner security*, and that became the thesis.)

Before settling, check `docs/` or the working folder for earlier pieces so you don't repeat
a topic.

`get_term` and `get_graph` want a term id or a full alias such as
`quote-mcp:human-work:blame`. A bare `scheme:slug` may not resolve. `search_terms` with the
label returns the id and aliases; `get_concept` on the quote server takes `scheme:slug`
directly and is usually all you need.

## 2. Gather

Run `search_corpus` with several phrasings, then `read_book` a page or two either side of
each good hit so you know where sentences begin and end and what the author was arguing.
Search results are snippets; never quote from a snippet.

For paper books, `search_quotes` by `concept` returns the transcribed quotes with their
grade and flags. Prefer grade A. A flag of `ocr_suspect` or `no_locator` is worth mentioning
when you offer the quote.

## 3. One question

Ask the person once, and make the question complete in itself, because they may see only the
question and not your earlier messages. State the working title and thesis in a clause, then
list each candidate passage with book, place, its first words, and whether it is new (to be
checked against the e-book) or already in the store. Offer a recommended set first, a
smaller set, and a way to change topic. Say that nothing has been saved yet.

This is the one decision that is theirs: quotes saved to the store and books filed to Zotero
are additions to their records. Everything after it you can carry through without asking.

## 4. Secure the quotes

For each new passage, `add_quote` with `work` = the book id (`main:42`), the exact text,
`page` = the location `read_book` showed, `tags` = `project:<slug>` plus concept labels,
a `comment` saying what the quote does in the piece, and `request_id` = `<slug>-<n>` so a
retry doesn't save it twice. A result other than `verified` means the words were not checked;
if nothing is saved, the error lists the closest passages, and you quote again from those.

- **Part of a sentence is fine** if it is an exact run of the book's words. Leave off a
  trailing reference such as "(Dahlgren and Alvares 2016)" and say so in the footnote.
- Tag with concept labels the store already has, so the quote joins the owner's existing
  themes. `add_quote` reports which tags it matched to concepts.

Then `cite_quote` for every quote, new and old, and keep its `quote`, `pandoc`, `citekey`,
`locator_text`, `position`, and `warnings`. For each new book call `cite_passage` once with
the same page; its `bibtex` is what you file. Note that `cite_passage`'s `page` is the
position in the file, not the number printed on the page.

## 5. File the books

A cited book needs a citekey that will not change. For each new book where `book.zotero` is
null:

1. Look first with `zotero_search_items` (title or author, short). When it finds nothing it
   falls back to looser matches and says so in a note at the top; read that note. A list of
   unrelated titles under "returned no results" means the book is not there.
2. File with `zotero_add_item`: `source` = the BibTeX from `cite_passage`, `source_type:
   "bibtex"`, `collections: ["Corpus MCP/Staging"]`, `create_missing_collections: true`,
   `tags: ["corpus-mcp"]`, adding `"corpus-mcp:needs-review"` when `cite_passage` warned
   about missing metadata. Several entries can go in one call.
3. Read each new item back (`zotero_get_item_metadata`, `format: "json"`) and confirm `extra`
   holds both `Citation Key: <key>` and `Calibre UUID: <uuid>`. The UUID line is how the other
   servers recognise the book.
4. `pin_citekey` for each book.

File from the metadata as given, even when it looks wrong: a compound surname split in two,
a title carrying its marketing copy, a missing ISBN. The staging collection exists so the
owner can review these, and a quiet fix in your bibliography would hide the problem from
them. Describe each oddity in the handover instead. In the essay's prose and footnotes,
write the author's name and the book's title the way the book itself gives them.

Don't delete Zotero items, move them out of staging, or replace a pinned key.

The servers copy from one another on a timer (about every half hour). Right after filing,
`find_work` and `cite_quote` may still show the book as unfiled. That is lag, not failure.

## 6. Write

Read `assets/template.md` for the skeleton. Aim for 900–1,200 words unless told otherwise.

**The essay stands alone.** No server names, tool names, ids, or "this demonstrates" in the
title, the body, or a sidebar. If a sentence would puzzle a reader who has never heard of
the portal, it belongs in your handover message.

**Let the quotes carry the argument and keep your own claims modest.** Describe an author
only as far as your sources support. "In *The Anxious Organization*, Miller describes…" is
safe; "Miller, a consultant who studied…" is something you would have to know. When you do
add a fact from general knowledge, list it in the handover so the owner can check it.

**Quotes**

- Put `<!-- quote <id> -->` on the line before every block quote, and before any paragraph
  that quotes inside a sentence. Concept tags may follow the id.
- Use `cite_quote`'s `quote` text unchanged. To shorten one, save the shorter passage as a
  new quote.
- End a block quote with its citation on a final `>` line.

**Citations** are Pandoc's: `[@key, p. 145]` for a printed page, `[@key, chap. 7]` for an
e-book (which has no pages). When the chapter has a title and no number, `cite_quote` returns
a form like `{chap. Lettuce}`; write `[@key, "Lettuce"]` instead, which reads properly.

**Footnotes**, one per quote, are where the reader learns what kind of evidence this is: the
work, chapter or page, edition, and either "checked against the e-book" or "transcribed from
the print edition". This is the honest way to show verification without talking about tools.

**IASP blocks** name what a passage is doing. Call `get_authoring_guide` with topics
`overview`, `wrappers`, and `note-variants` once to see the vocabulary. Use a block only
where it does something a paragraph can't, about one for every 300 words. Ones that have
earned their place:

- `{.note .context concepts="scheme:slug …"}` to bring in the concept links from step 1, told
  as an observation about a thesaurus of ideas, not about a server.
- `{.note .usage}` for something the reader can do tomorrow.
- `{.note .scope}` for the honest limit of the argument. An essay with a thesis needs one.
- `{.note .disclosure}` at the end: an AI drafted this for the owner, from their library,
  and which quotes were machine-checked and which were not.

Wrap the body in `::: {.article}`, give it one `# Title`, and end with `## References`
followed by the closing `:::`.

**Byline.** Leave `author` out of the front matter unless the person asked for their name
on it. The disclosure note says who did what.

**Bibliography.** Write `<slug>.bib` beside the draft: `cite_passage`'s BibTeX for the books
you filed, and for works already in Zotero an entry under the citekey `cite_quote` gave
(`zotero_get_item_metadata` with `format: "bibtex"` has the fields, under a different key).

**Where.** Put files where the project already keeps such pieces (look for `docs/demo/` or
`drafts/`); otherwise a scratch folder, and say where. Don't commit unless asked.

## 7. Check

Collect `{ "<id>": <cite_quote's quote> }` for every marker into a JSON file, then run:

```
node <skill dir>/scripts/check-draft.mjs <slug>.md --quotes quotes.json
```

It compares every marked quote, block or in-sentence, with the saved words, finds unmarked
block quotes, checks each citekey against the bibliography, and builds with Pandoc. Fix your
own prose freely. If a quote differs from its saved text, the draft is wrong, not the quote.

Then `validate_markdown`. The iasp server usually runs on another machine and cannot open
your files, so pass the text in `markdown`, not a `path`.

## 8. Render

`render_document` with `markdown` = the full source, `bibtex_content` = the bibliography's
entries, `formats: ["md", "ghost", "html", "pdf", "epub"]`, an `output_dir` and
`output_basename` of the slug, `return_content: true`, and `validate_epub: true`.

The reply is large and will usually be saved to a file instead of shown. Parse that file as
JSON and write `artifacts[].content` out for `md`, `ghost`, and `html`. PDF and EPUB stay on
the server at the `output_path` given; tell the person where. The reply's `provenance` shows
each marker resolved to its work and concepts, which is a useful last check.

Read the Markdown render through once. Look for a raw `[@…]` (a citation that did not
resolve), a doubled title, and reference-list entries that will embarrass the owner.

## 9. Hand over

Start with one line saying who the essay is written for. Then, briefly:

- the file to read first, the source to edit, and where the PDF and EPUB are
- each quote: source, place, citekey, and verified or transcribed
- what was filed to Zotero staging and what needs review there
- decisions you made on their behalf (byline, citation form, file location)
- facts in the essay that came from your general knowledge, not their books
- how to edit: change anything except the words inside quotes and the bracketed citation
  codes, then ask for the draft to be checked and rendered again

Report plainly what passed and what did not. If Pandoc or the iasp server was unavailable,
say which checks were skipped.
