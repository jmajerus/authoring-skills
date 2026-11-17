---
name: draft-check
description: Check the quotations and citations in a draft the person wrote themselves against their own library, through the Authoring Portal MCP servers (holdings, corpus, quote, iasp). Compares every quoted passage word for word with the saved quote or the e-book's text, checks each citation's work and page, and reports what matches, what differs, and what cannot be checked. Read-only: it never edits the draft or the library. Use this whenever the session has the portal's tools (names ending in find_work, search_corpus, search_quotes, validate_markdown) and the person asks to check, verify, fact-check, or proof the quotes, sources, attributions, or references in an article, essay, chapter, or post, including a draft with no quote markers and no citekeys. For a draft made by cited-article, that skill's own Verify step also checks the bibliography.
---

# Draft check

A writer has a draft that quotes books, and wants to know that every quoted word and every
page number is right before it is published. You find each quotation, trace it to the library,
and compare. You report; the writer decides.

Read [library.md](library.md) first: the tools, the three kinds of holding, and the two page
numbers.

You change nothing: not the draft, not the quote store, not Zotero.

## 1. List what the draft claims

Read the whole draft (a path, or pasted text). List every place it leans on a source:

- block quotes
- quoted words inside a sentence, when they are attributed to a work or author. A phrase of
  four words or fewer is too short to check unless it is distinctive.
- `<!-- quote <id> -->` markers, which name a saved quote
- citations: `[@key, p. 44]`, a footnote, or prose such as "(*Title*, p. 74)"
- paraphrases with a source ("Lerner argues that…")

Give each a number and its line. This list is the backbone of the report.

## 2. Marked quotes

If the draft has any `<!-- quote <id> -->` markers, call `validate_markdown` with the draft's
text in `markdown` (the server usually cannot open your files). `quotes.checks` compares each
marked passage with the saved quote:

- `text: "differs"` gives the saved words and the draft's around the first difference.
- `text: "excerpt"` means the draft uses a run of the saved quote, or runs joined by an
  ellipsis. That is allowed; check that what was left out does not change the meaning.
- `citekey: "differs"` and `locator: "differs"` compare the citation with the quote's own.
- `unmarked_block_quotes` lists block quotes with no marker. Check those in step 3.

The same call reports on block structure. In a draft that does not use IASP blocks, ignore
anything that is not about a quote.

## 3. Unmarked quotes

For each remaining quotation, look in two places, in this order.

**The quote store.** `search_quotes` with `query` set to a run of four to six words from the
quotation, in double quotes. If that finds nothing, try a run from another part of it: one
wrong word in the draft defeats a phrase search, and the wrong word may be in your first run.
Add `author` or `work` when the draft names one.

**The e-book.** If the store has nothing, find the work with `find_work` (the title or author
the draft gives). If it has `holdings.text`, `search_corpus` with `book_id` and the same short
runs, then `read_book` at the hit's `file_page`, with the page before or after when the passage
runs across a page break.

Then compare word for word, and give one verdict:

| Verdict | Means |
|---|---|
| matches | the same words, in order |
| excerpt | a run of the source, or runs joined by "…" or "[…]" |
| differs | words changed, added, dropped, or reordered. Show both versions around each difference |
| not found | the work has text and the passage is not in it |
| cannot check | the work has no text and no saved quote, or the library does not hold it |

These are not differences: curly or straight quotation marks, dash styles, line wrapping,
emphasis markers, a capital or full stop changed to fit the sentence, and words in square
brackets that the writer added.

Which side is right depends on the source:

- Against **e-book text**, the book is right, unless the text itself looks damaged (broken
  words, stray hyphens from line ends). Then say that.
- Against a **verified** quote, the saved words are the book's.
- Against a **transcribed** quote, either could be the typing error. Say that they differ and
  that only the printed book settles it. Mention the quote's grade and flags.

"Not found" needs care before you report it. Try a third run of words, try without `book_id`
in case the draft names the wrong book, and check for another edition (`get_work` lists
candidates). A passage found in a different work from the one cited is a finding of its own.

## 4. Citations

For each citation:

- **The work.** `find_work` with `key` set to the citekey, or with the title and author. An
  unknown citekey, or a work the library does not hold, is reported. So is `cannot_cite`.
- **The place.** Compare with where you found the passage. A printed page must equal
  `page_label`, not `file_page`. An EPUB or MOBI has no printed pages, so a page number cited
  for one is wrong whatever the number: it should be cited by chapter. For a transcribed
  quote, compare with its `locator`.
- **The match.** The citation's work must be the work the words came from.

## 5. Attributions and paraphrases

For a paraphrase, find the passage it rests on, as in step 3, and read it. Say whether the
passage supports the claim, supports something narrower, or says something else. If you
cannot find a passage, say so; do not judge the claim from general knowledge.

List separately what the draft says about an author or a book that the library cannot confirm
(a profession, a date, "the first to argue"). You are not saying these are wrong, only that
nothing here checks them.

## 6. Report

Start with the count: how many quotations and citations, and how many in each verdict. Then
the problems first, in draft order, each with its line, the draft's words, the source's words,
and the source reported the way library.md describes. Then one line for each item that passed.
Then what could not be checked and why.

Write it for someone who has never heard of the tools: "On line 9 the draft says 'the
quickest way to ruin your career'; the saved quote from Lerner, p. 107, says 'the easiest
way'. That quote was typed from the print edition, so the book settles it."

Close with what you can do next, if they want it: apply the corrections to the draft, or save
the quotations that matched an e-book as verified quotes and add their markers so the draft
can be checked mechanically from now on. Both change something, so wait to be asked.
