---
name: book-review
description: Write a review of one book from the owner's library through the Authoring Portal MCP servers (holdings, corpus, quote, terminology, zotero, iasp). Plans the reading against the context budget, reads the book in passes, tests it against its own title, finds comparison works elsewhere in the library, saves the words the review quotes as citations (verified against the e-book, or transcribed from a paper book), files the books to Zotero staging, marks the review up with IASP blocks, and renders it to Ghost, HTML, Markdown, PDF, and EPUB. Use this whenever the session has the portal's tools (names ending in find_work, read_book, add_quote, render_document) and the person asks for a review, critique, assessment, or verdict on a particular book they hold, for a blog or otherwise, even if they never say "skill". For an essay on a topic drawn from many books, use portal-article; to collect a book's passages for the owner's quote store, quote-harvest.
---

# Book review

You are reviewing one book for readers who have not read it, from one person's library. A
review is book-first: you read a single work through, judge it, and set it beside others. The
library supplies the book, the comparisons, and the means to trace every quoted word to its
page. The reader of the review should never need to know any of that exists.

Read [library.md](library.md) first: the tools, the three kinds of holding, keys, and the two
page numbers. This skill also uses `get_book_outline`, `propose_quote_fix`, `cite_passage`,
`pin_citekey`, the zotero tools, and iasp's `get_authoring_guide`, `validate_markdown`, and
`render_document`. Tool names carry a prefix that changes between sessions; find a tool by the
end of its name.

[portal-article](../portal-article/SKILL.md) is this skill's model, and several steps below
say "as portal-article step N". Read that step there when you reach it; what follows says only
where a review differs.

**Citations are not collected passages.** Every quote you save is saved because the review
cites it. It is a citation, evidence for one point in one piece, and it is not an addition to
the owner's collection. Deciding which passages are worth keeping for their own sake is the
owner's judgment, so you propose none of them for the collection, not even a shortlist: a
shortlist is a filter, and you would still be choosing what is interesting. Say in the handover
that the quotes are citations and give their project tag. (quote-harvest is the exception,
because there the owner asked for proposals.)

## 1. Find the book and plan the reading

`find_work` with the title, author, or key. You need `holdings.text`; its `book_id` is what the
corpus tools take. With no text holding there is nothing to read and quote, so say so and stop,
unless the owner's transcribed quotes from a paper copy are enough for what they want.

`get_book_outline` next. A PDF often has no outline; then read the printed contents pages
(usually within the first dozen file pages) and write down each part and chapter with the
file page it starts on. Compare one or two printed numbers with the `page_label` `read_book`
shows for the same page: if they disagree by a constant (the contents says 15, the page label
says 16), note the offset now. It matters in step 6.

Then plan against your context budget, before reading anything long. `read_book` returns at
most 40,000 characters a call, which is roughly 15 to 20 pages of a dense book; a 250-page book
read whole is about 16 calls and much of a session. Decide up front:

- what you will read in full: the introduction, the conclusion, and the chapters that carry
  the book's argument or its title's promise
- what you will sample: the opening and closing pages of each remaining chapter
- what you will skip, and why

Write this plan down. It becomes the review's scope note, so it has to be true.

## 2. Read in passes

Read the planned parts, keeping notes as you go. For each note record the `file_page` and the
`page_label`:

- passages you may quote, with their exact first and last words
- claims the book makes that you will want to test or compare
- errors: wrong dates, misattributed quotations, garbled names, factual slips
- anything that sounds like a fact you would have to take from general knowledge

Never quote from a search snippet. Words copied from `read_book` are read, not saved, until
`add_quote` checks them.

PDF text sometimes drops ligatures ("Te" for "The", "afer" for "after"). A quote whose words
the file has garbled will be refused as not found. Choose another passage, or quote a run that
avoids the damaged word, and mention the damage in the handover.

## 3. Test the book against its title

A title is a promise. `search_corpus` with `book_id` set, `advanced: true`, and the title's key
terms and their likely companions (`"collaboration OR collective OR participation"`, names of
the thinkers the subject calls for). Read where the hits cluster. You want to know where the
book treats its subject seriously and where it only names it. A book whose subject gets five
pages in two hundred and fifty is a finding, and often the review's argument.

## 4. Find comparisons

`search_corpus` across the library (no `book_id`) for the book's two or three central
concepts. `get_concept` on each concept the owner has, and read its `opposite`, `broader`,
and `related` links; `get_term` or `get_graph` on the terminology server shows the same map.
You want one or two works that do what this book attempts, better or differently. Read the
comparison passage in context as in step 2. A comparison quoted from a paper book is
`transcribed`; say so in its footnote.

## 5. One question, or none

Saving quotes and filing books change the owner's records. Ask once, in a question that stands
on its own: the book, your working verdict in a sentence, the passages you will quote (book,
page, first words, new or already saved), the comparison works, and that nothing is saved yet.

When the person has already given broad permission ("use the full suite", "go ahead and save
what you need"), don't ask: save and file, and say in the handover that you did.

## 6. Secure the quotes

As portal-article step 4, with these differences:

- **Save exactly the words the review quotes.** Not the full sentence for later trimming:
  `validate_markdown` may treat a run-in quote shorter than its saved text as an error, and a
  longer saved quote looks like a passage chosen to keep. If two places quote the same
  sentence in different lengths, save each run you use.
- **Tags:** `project:<slug>` plus concept labels, as portal-article says. The `comment` says
  what the quote is evidence for ("evidence of the misdated chronology", "the book's claim
  about authorship").
- **Printed pages.** If step 1 found an offset, `page_label` is wrong for this book. Save with
  `file_page` only, so the check can pass, and cite the printed page in the draft. Then call
  `propose_quote_fix` for each such quote with `page_label` = the printed number, a
  `rationale` naming the offset, and `evidence` saying where you saw it (the contents page and
  a chapter opening). A person accepts it. Until then `validate_markdown` will warn
  `locator: "differs"` on those quotes; list them in the handover so the warnings are expected.
- **Edited volumes.** When a quote comes from a chapter by someone other than the book's
  author or editor, `add_quote` cannot record that. Call `propose_quote_fix` with
  `chapter_author`, and in the prose and footnote name the chapter's author, not the editor.

Then `cite_quote` for every quote, and `cite_passage` once per new book.

## 7. File and pin the books

As portal-article step 5: look first, file to `Corpus MCP/Staging` from `cite_passage`'s BibTeX,
read each item back, and `pin_citekey` until it answers `matched`. File the metadata as given,
and list each oddity for the owner: a year that disagrees with the book's own title page, no
publisher, an editor filed as author, a missing ISBN the book prints.

## 8. Write

Read [assets/template.md](assets/template.md) for the skeleton. Aim for 1,200–2,000 words unless
told otherwise. Portal-article step 6 governs the quote markers, citations, IASP blocks, byline,
bibliography, and where files go. A review differs in shape:

1. **A bibliographic line** under the title: author, *title*, publisher, year, pages, as the
   book itself gives them.
2. **What the book is**: its subject, its form, its claim, in your words with one quote.
3. **What it does well**, with quotes.
4. **Where it fails**, with quotes. Errors you found go here, each tied to its page. Be exact
   and fair: quote enough of the passage that a reader can see the error is the book's.
5. **The comparison**: what the other work does with the same idea.
6. **A verdict**: who should read it, and for what.
7. **`{.note .scope}`**: what you read in full, what you sampled, what you skipped. Every
   review needs one; it is the reader's measure of your judgment.
8. **`{.note .disclosure}`** at the end: an AI wrote this review for the owner from their
   library, which quotes were checked against the e-book and which were transcribed, and the
   facts taken from general knowledge (step 9).

**Footnotes:** one per source, not one per quote. Each says the edition, how it was read (the
e-book, the print edition), and for the reviewed book, what the scope note says in brief.

**Quote markers.** `<!-- quote <id> -->` on the line before each block quote and each paragraph
that quotes inside a sentence. When one paragraph quotes two saved quotes, put each marker on
its own line before the paragraph. An iasp server older than this rule checks only the last
marker against the paragraph and the others against nothing; if `validate_markdown` reports a
quote with an empty passage, split the paragraph so each has its own marker.

## 9. List the claims to check

Before validating, go through the draft and list every fact that did not come from a book in
the library: a date, a biography, the source of an epigraph, a historical event. Where the
session has web search, check each one and say what you found. Each unconfirmed fact goes in
the disclosure note and the handover. Don't silently drop a fact you could not confirm, and
don't present it as confirmed.

## 10. Validate, render, hand over

As portal-article steps 7–9, with these differences:

- `formats`: put `ghost` first when the review is for a blog, then `md`, `html`, `pdf`, `epub`.
- Expect the `locator: "differs"` warnings from step 6 and no others you can't explain.
- **Handover**, after the line saying who the review is written for:
  - the links to read first and to edit, and the other renders
  - what was read in full and what was sampled
  - each quote: source, page (printed and file), citekey, verified or transcribed
  - **the citations saved**: their ids and project tag, said plainly as citations saved for
    this review, with none of them proposed for the collection
  - the `propose_quote_fix` calls waiting for a person (page offsets, chapter authors)
  - what was filed to Zotero staging, and each metadata oddity there
  - errors found in the book, by page
  - the claims to check from step 9, and what a web check found
  - text damage (dropped ligatures) that kept a passage from being quoted

Report plainly what passed and what did not. If a server was unavailable, say which checks were
skipped.
