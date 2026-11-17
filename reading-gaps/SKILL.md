---
name: reading-gaps
description: Find what the owner's library is missing on a topic, through the Authoring Portal MCP servers (holdings, corpus, quote, terminology). Reports four kinds of gap: works held that cannot yet be cited and why, paper books quoted from memory with no text to check against, e-books that treat the topic and have never been quoted from, and works the owner's own books cite on the topic that the library does not hold. Read-only. Use this whenever the session has the portal's tools (names ending in find_work, get_work, search_corpus, search_quotes) and the person asks what they are missing, what to read or get next, where their sources are weak, for a reading list or acquisition list on a subject, or why a book cannot be cited. For what the library does hold, use source-survey.
---

# Reading gaps

A library has two kinds of hole: books it lacks, and books it has that cannot yet do their
work. The second kind is the cheaper to fix and the easier to miss. You report both, from
evidence in the library itself, and you do not guess at what a well-read person ought to own.

Read [library.md](library.md) first: the tools, the three kinds of holding, and `cannot_cite`.

Nothing is saved, filed, or ordered.

## 1. What is held on the topic

You need the list of works that bear on the topic before you can see what is wrong with it.

- `list_concepts` with the topic as `query`, for the owner's name for it and its alternative
  labels.
- `search_quotes` by `concept` and by `query`: the works already quoted.
- `search_corpus` for three or four phrasings, `limit: 20`: group the hits by book and keep
  the books with hits in more than one section.
- `find_work` with the topic's main word as `query`: works with the word in the title,
  including catalogue records with no text and no quotes.

For each work kept, `find_work` with `key`, for its `holdings` and `cannot_cite`.

## 2. Held, but not ready

**Cannot be cited.** A work with `cannot_cite` set:

- `not_in_zotero`: the book is not catalogued. The article skills file it the first time a
  piece cites it; the owner can also file it themselves.
- `no_citekey`: catalogued without a citation key.
- `ambiguous_edition`: more than one catalogue item could be this book. `get_work` lists the
  candidates, and only the owner can say which copy they mean.

Count them. If most of the e-books on the topic are uncatalogued, say that once and list the
few that matter most; a list of forty is not a finding.

**Quoted, with no text.** Works with `holdings.quotes` and no `holdings.text`. Their quotes
are transcribed and cannot be rechecked. List the ones a piece on this topic would lean on,
most quoted first, with any quotes flagged `ocr_suspect` or `no_locator`. An e-book of one of
these would let every quote from it be verified.

**Text, never quoted.** Books with several hits in `search_corpus` and no `holdings.quotes`.
The owner has them and has taken nothing from them. Name the two or three with the fullest
treatment as candidates for quote-harvest, with the section where the topic is treated.

## 3. Leaned on, and not held

The best evidence for a missing book is that the owner's own books keep citing it.

1. Take the three or four held e-books that treat the topic most fully.
2. In each, find what it cites on the topic. `get_book_outline` shows whether it has a
   bibliography, references, or notes section. Those sections run to hundreds of entries, so
   do not read them through: `search_corpus` with `book_id` and the topic's words finds the
   entries whose titles carry them, and the passages you read in step 1 name the authors the
   book argues with.
3. For each cited work, `find_work` with `author` and a word from the title. Held in any form
   means it is not a gap.

Report a work as leaned on when it is cited by two or more of the owner's books, or when one
book builds its argument on it. Give the entry as the citing book prints it, and say which
books cite it and where. You have not read the missing work, so say nothing about what it
argues beyond what the citing book says.

## 4. Thin places

- Shelves where the topic found nothing (`list_shelves` names them), when the topic plainly
  belongs to that field.
- Opposite or related concepts (`get_concept`) with no quotes: sides of the question nothing
  has been collected on.
- A spread of years that stops early, or one author supplying most of the material.

## 5. Report

Start with one paragraph: how many works bear on the topic, how many are ready to quote and
cite today, and the single most useful thing to fix. Then the gaps in this order, because it
runs from cheapest to dearest:

1. held and not citable
2. held as text, never quoted
3. quoted with no text
4. leaned on and not held
5. thin places

For each item, the work, the evidence, and the step that would close the gap.

Keep to what the library shows. If the person asks what else they should read, you may add a
short list from general knowledge, under a heading that says so, and without claiming any
book on it is cited by theirs.
