---
name: source-survey
description: Survey what the owner's library holds on a topic before anything is written, through the Authoring Portal MCP servers (holdings, corpus, quote, terminology). Hands back a brief that names the works by what can be done with them (quotable e-book, transcribed quotes, catalogue record only), the strongest passages with their places, and where the library is thin. Read-only. Use this whenever the session has the portal's tools (names ending in find_work, search_corpus, search_quotes) and the person asks what they have on a subject, whether their books could support a piece, where to start reading, or for sources, material, or background on a topic, even if they never say "survey". If they want the piece written, use portal-article or cited-article.
---

# Source survey

The person is deciding whether and how to write about something. They want to know what their
own library can give them, and they will do the writing. Your brief answers three questions:
what do I have, how far can I trust it, and what is missing?

Read [library.md](library.md) first: the tools, the three kinds of holding, and how to report
a passage.

Nothing is saved. You add no quotes and file no books.

## 1. Fix the topic

Take the topic as given. Ask a question only if it could mean two quite different things.
Then widen it to the words the library uses:

- `list_concepts` with the topic as `query`. A concept that matches gives you the owner's own
  name for the idea, its alternative labels, and a count of quotes.
- For a matching concept, `get_concept` shows its broader, related, and opposite concepts.
  Keep the two or three closest; they are further search words and often the more interesting
  angle.

End with three to five phrasings: the topic, its concept label, a synonym or two, a neighbour.

## 2. Look in three places

**Quotes already collected.** `search_quotes` with `concept` for each concept you found, and
with `query` for each phrasing. Note the total, not only the first page.

**E-book text.** `search_corpus` for each phrasing with `limit: 20`. Group the hits by book.
A book with hits in several sections treats the topic; a book with one hit mentions it.
`list_shelves` tells you which shelves exist; a topic that turns up on two or more shelves has
more than one discipline behind it, and that is worth saying.

**The catalogue.** `find_work` with the topic's main word as `query` finds works with the word
in the title. This is the only way to find works that have neither text nor quotes.

## 3. Read before you report

For the five to eight books with the most promising hits, `read_book` a page either side of
the best one. Drop any that only mention the topic in passing or use the word in another
sense. From what you read, choose the passages worth reporting: a complete thought that says
something a writer could build on.

For every work that will appear in the brief, `find_work` with `key` set to its book id or
citekey, for its holdings and `cannot_cite`.

Keep the survey in proportion. About thirty tool calls is enough for a first brief. When that
is not enough for everything, read fewer books before you skip a search: the quote searches
for the neighbouring concepts and one `search_corpus` with `shelf` set for each of the two or
three likeliest shelves come first, and the holdings check can be kept to the works whose
passages you report. Say what you did not look at and offer to go deeper where the person
chooses.

## 4. The brief

The brief is your reply. Save it as a file only when asked, or when the project keeps research
notes (a `research/` or `notes/` folder), and then say where.

1. **Verdict**, two or three sentences: how much there is, from how many kinds of book, and
   the angle the library supports best. If the library holds little, say so plainly.
2. **The owner's map**: the concept, its definition, and its opposite and related concepts
   with quote counts. Leave this out when no concept matches, and say that none does.
3. **Works**, in three groups: e-books with text, paper books with transcribed quotes, and
   catalogue records. For each: author, title, year, how much it has on the topic, and what
   stands in the way of citing it.
4. **Strongest passages**, five to ten, each reported the way library.md describes, with a
   line on what it would do in a piece.
5. **Thin spots**: phrasings that found nothing, sides of the question no book takes, works
   that can be cited but not quoted.
6. **Next**: one line each for the steps that fit, such as collecting quotes from one book
   (quote-harvest), following the concept through the library (concept-dossier), or writing
   the piece (portal-article).

Report counts as you found them. "Fifteen quotes are tagged blame, from twelve works" is a
finding; "extensive coverage" is not.
