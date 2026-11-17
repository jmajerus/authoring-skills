---
name: quote-harvest
description: Read one e-book from the owner's library and collect its passages worth keeping as verified quotes in the quote store, tagged with the owner's concepts, through the Authoring Portal MCP servers (holdings, corpus, quote). Proposes passages first and saves only the ones the person approves; each saved quote is checked word for word against the book. Use this whenever the session has the portal's tools (names ending in find_work, read_book, add_quote) and the person asks to pull, collect, harvest, mine, or save quotes, passages, or highlights from a book, to take reading notes on a book, or to find what a particular book says about a theme, with or without a piece in mind. For passages across many books on one topic, use source-survey; to write a piece from them, portal-article.
---

# Quote harvest

The owner's quote store is their memory of what they have read. Most of it was typed from
paper books years ago; their e-books are mostly unread by it. You read one e-book and offer
the passages worth keeping. The ones they approve are saved, checked against the book, under
the concepts they already use, so the next piece of writing finds them.

Read [library.md](library.md) first: the tools, the three kinds of holding, and the two page
numbers.

This skill writes to the quote store, once, after one question.

## 1. The book

`find_work` with the title, author, or key. You need `holdings.text`; its `book_id` is what the
corpus tools take.

- **No text holding.** There is nothing for you to read. If the person has the paper book and
  gives you a passage and its printed page, `add_quote` saves it as `transcribed`. Say that it
  was not checked.
- **Several matches or editions.** Ask which.

Then see what is already there: `search_quotes` with `work` (see library.md if it returns none
when holdings says the work has quotes). Read those quotes. They show what this owner keeps
from this book, and you will not offer them again.

## 2. What to look for

If the person named a theme, that is the brief. If they asked for "the best passages", the
brief is the owner's own interests: `list_concepts` with a `query` drawn from the book's
subject shows which concepts they collect under.

## 3. Read

`get_book_outline` first. Then choose by the size of the job:

- **A theme in a long book.** `search_corpus` with `book_id` and several phrasings, then
  `read_book` the sections where hits cluster.
- **The whole of a short book, or named chapters.** `read_book` by `section` or page range,
  with `max_chars` up to 40000, following "Continue with file_page" to the end.

Skip front matter, the index, notes, and the bibliography. Keep track of what you read. A
book of four hundred pages read through twelve search hits has not been read, and the
handover must say which.

## 4. Choose

A passage is worth offering when it:

- makes one complete point and can be understood on its own
- says it well enough that a paraphrase would lose something
- is an exact, unbroken run of the book's words, at most 2,000 characters
- is the author's own. When the author is quoting someone else, either leave it or offer it
  and say in the `comment` who is being quoted
- is not already saved

Prefer a passage of two to five sentences. A single aphorism without its reasoning is easy to
misuse; a whole page is not a quote. Offer eight to twelve unless told otherwise, and fewer
if the book does not hold that many. Do not pad.

For each, choose tags. Look each candidate tag up with `list_concepts` and use the store's own
label when there is one. A tag that is not a concept is kept as written and joins a list the
owner reviews later, so add one only when no concept fits, and say so.

## 5. One question

Ask once. The question must stand alone. Give the book, how much of it you read, and each
candidate with: a number, its chapter or printed page, its first dozen words and its length,
why it is worth keeping, and its tags (marking any that are not yet concepts). Offer the full
set first, then a shorter set, and let them pick by number. Say that nothing has been saved.

## 6. Save

For each approved passage, `add_quote` with:

- `work`: the book id
- `text`: the passage as `read_book` gave it
- `file_page`: the page `read_book` showed it on
- `tags`: the concept labels, and `project:<slug>` when the harvest is for a piece
- `comment`: one line on what the passage says or who is quoted in it
- `request_id`: `harvest-<book id>-<file_page>-<n>`, so a retry does not save it twice

`verified` means the words were found in the book and saved in the book's exact wording. If
nothing is saved, the error lists the closest passages: quote again from those. Never adjust
the text to make it pass. A `page-mismatch` error shows where the words were found; correct
your `file_page` and try again.

Do not file the book in Zotero here. If `cannot_cite` is set, say so in the handover: the
article skills file a book the first time a piece cites it.

## 7. Hand over

- how many were saved, and each one: id, chapter or printed page, first words, status, tags
- tags that matched no concept
- passages that could not be verified, and what the book says instead
- what you read and what you did not
- that the saved quotes can be found with `search_quotes` by work or concept, and that removing
  one is the owner's to do
