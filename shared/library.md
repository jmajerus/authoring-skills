# The library and its tools

The research skills all work on one person's library through the Authoring Portal's MCP
servers. This file is what they share. Read it once before the first tool call.

## Finding the tools

Tool names carry a prefix that depends on how the portal is configured (`corpus_search_corpus`,
`mcp__…__corpus_search_corpus`), and prefixes have changed between sessions. Find a tool by the
end of its name. If the portal's tools are not in the session at all, say so and stop: nothing
here can be done from memory.

| Server | It answers | Tools the research skills use |
|---|---|---|
| holdings | What does the owner have, and in what form? | `find_work`, `get_work` |
| corpus | What do the e-books say? | `search_corpus`, `read_book`, `get_book_outline`, `list_shelves`, `list_books` |
| quote | What has been quoted, and is it verified? | `search_quotes`, `get_quote`, `get_concept`, `list_concepts`, `add_quote`, `cite_quote` |
| terminology | How do the concepts relate? | `search_terms`, `get_term`, `get_graph` |
| iasp | Do a draft's marked quotes match the saved ones? | `validate_markdown` |

## Three kinds of holding

`find_work` returns one row per work with its `holdings`. What a work has decides how far its
words can be trusted, so say which kind it is whenever you report a passage.

- **Text** (`holdings.text`, a Calibre e-book). You can search it, read it, and check a quote
  against it. A quote saved from it is `verified`.
- **Quotes only** (`holdings.quotes`, no text): a paper book the owner typed passages from.
  These quotes are `transcribed`: as accurate as the typing, with a real printed page. You
  cannot recheck them. Prefer grade A, and mention a flag such as `ocr_suspect` or `no_locator`.
- **Neither**: a catalogue record. It can be cited, not quoted.

`cannot_cite` on a work says what stands in the way of citing it: `not_in_zotero`, `no_citekey`,
or `ambiguous_edition`. Most e-books have text and still cannot be cited until they are filed.

Words you copy out of `read_book` are **read, not saved**. They are the book's words as the
file has them, but nothing has checked your copy. Label them that way until `add_quote` saves
them as `verified`.

## Keys

- A book in the corpus is `main:42` (its book id) or its citekey.
- A work in holdings has a `key`: `zotero:<library>/<item>`, `calibre:<uuid>`, or `quote:<id>`.
  Every holdings tool takes any key the work has.
- `search_quotes` takes a work key as `work`. If holdings says a work has quotes and
  `search_quotes` with `holdings.quotes.work` returns none, try the `quote:<id>` from the
  work's `keys.quote`. Some works are known to the quote store only by that key.
- A concept is `scheme:slug` (`human-work:blame`) on every server.
- A quote's id is the `id` at the top of its result. `work.id` inside the same result is a
  different number, the work's; never report it as the quote's.

## Two page numbers

`file_page` is the position in the book's file, the number `search_corpus` and `read_book` work
in. `page_label` is the number printed on the page, the only one a reader can look up. They are
never interchangeable. An EPUB or MOBI has no printed pages (`page_kind: "location"`), so it is
cited by chapter, from `section`.

## Searching

- `search_corpus` ANDs its words. Put a phrase in double quotes. With `advanced: true` the query
  goes to the search engine unchanged, so `OR`, `NOT`, and `NEAR(blame accountability, 12)` work.
  Narrow with `shelf`, `tag`, `author`, or `book_id`.
- A result is a snippet. Never report what an author says from a snippet: `read_book` a page
  either side first, so you know where the sentences begin and end and whether the author is
  stating a view or arguing against it.
- A phrase search fails if one word differs. To find a passage whose wording you are unsure of,
  search for two or three short runs (four to six words) from different parts of it.
- A `search_corpus` result does not say which shelf its book is on, and gives no total. To
  learn whether a shelf has the topic, search again with `shelf` set. A `count` equal to your
  `limit` means there may be more.
- A common word alone ("blame") finds fiction, scripture, and software manuals. Pair it with a
  second word, or use `shelf`, before reading anything.
- `find_work` searches titles and creators, not subjects. A topic is found through
  `search_corpus` (what the books say), `search_quotes` (what was collected), and
  `list_concepts` (how the owner names it).

Some calls return far more than you can read: `list_concepts` with no filter, `status` on any
server, `get_book_outline` on a book with hundreds of sections. Pass a `query` or a `limit`, or
read the saved result with a script and pull out what you need.

## Reading and writing

Every tool in the table above only reads, except `add_quote`, which adds to the owner's quote
store. A research skill is read-only unless its own instructions name a write. Before any
write, ask once, in a question that is complete in itself (the person may see only the
question): what would be saved, where, and that nothing has been saved yet.

## Reporting a passage

Give each passage the same four things, so the person can find it and knows what it is worth:

- the work, by author and title as the book gives them
- the place: printed page (`p. 145`) or chapter for an e-book, never a `file_page` alone
- its standing: verified, transcribed, or read and not saved
- the id to pick it up with: the quote id, or the book id and `file_page`

Words inside quotation marks are copied character for character from the tool's result. To
shorten, mark every cut with "…". If you want to put it your own way, drop the quotation
marks. A near-quote inside quotation marks is the one error the person cannot see.

Keep your own summary of an author apart from their words, and say only what the passage you
read supports. Before a sentence that names two authors as holding the same view, check that
each one's passage says it. A fact from your general knowledge is labelled as that.
