---
name: concept-dossier
description: Trace one idea through the owner's library and hand back a dossier, through the Authoring Portal MCP servers (quote, terminology, corpus, holdings). Starts from the concept as the owner's thesaurus defines it, follows its broader, narrower, related, and opposite concepts, gathers the quotes under each and the e-book passages that treat it, and sets out how the authors define it and where they part company. Read-only. Use this whenever the session has the portal's tools (names ending in get_concept, get_graph, search_quotes, search_corpus) and the person asks to trace, map, or follow an idea, theme, or concept through their books, asks how their authors define or use a term, asks what connects two ideas, or wants a literature review of their own shelves on one concept. For a quick "what do I have on X", source-survey is lighter; for the opposing case to a claim, counter-reading.
---

# Concept dossier

The owner has spent years tagging passages with concepts and linking the concepts to each
other. That map is their thinking, and it is the way into this skill: you start from what
they decided an idea is next to and opposed to, and then show what their books say at each
of those points.

Read [library.md](library.md) first: the tools, the three kinds of holding, and how to report
a passage.

Nothing is saved, and you propose no terms.

## 1. Find the concept

`list_concepts` with the idea as `query` (it searches labels, alternative labels, and
definitions). Then:

- **One match.** Use it, as `scheme:slug`.
- **Several.** Take the one the person's wording fits; mention the others in the dossier.
- **None.** Try `search_terms` on the terminology server, then a synonym. If there is still
  none, say so: the owner has no concept for this. Carry on from step 4 with the word itself,
  and list it at the end as a concept they might want.

## 2. The map

- `get_concept` gives the definition, alternative labels, the broader, narrower, related, and
  opposite concepts, and the quote counts (`quotes`, and `quotes_with_narrower`).
- `get_graph` with `around` set to the key and `depth: 1` returns the neighbours with their
  own definitions, and the links that run between the neighbours. Two neighbours that are
  linked to each other form a cluster; an opposite that has a broader concept tells you what
  family the opposition belongs to.
- `list_sets` shows whether the owner has already drawn a named set around this idea.

Read the definitions. They came from a dictionary sense chosen years ago, and sometimes the
quotes use the word differently. That gap is worth a line.

## 3. The quotes

`search_quotes` with `concept` set to the key. Page through with `offset` until you have all
of them (`total` says how many); for more than about sixty, read them all and report the
strongest. Then, for each opposite concept and each related concept that has quotes, the same
call with a small `limit`.

As you read, note for each quote: the work and its year, what it says the idea *is*, what it
says causes it or follows from it, and its other tags. A quote tagged with this concept and
one of its neighbours is where the owner joined the two.

## 4. The e-books

The quote store mostly holds paper books. `search_corpus` for the concept's label and each
alternative label, `limit: 20`, to find what the e-books add. For the three to five books
that treat the idea most fully, `read_book` around the best hit. These passages are read and
not saved; label them so.

## 5. The dossier

The dossier is your reply. Save it as a file only when asked, or when the project keeps
research notes, and then say where.

1. **The concept**: label, definition, alternative labels, and the counts.
2. **Its neighbours**, as a short table: each broader, narrower, related, and opposite
   concept, how many quotes it has, and how many it shares with this one.
3. **What the authors say it is.** Group them by the account they give, not by book. Name
   each group in a phrase, and give its best one or two passages, reported the way library.md
   describes.
4. **Where they differ**: on what it is, what causes it, whether it is good, what to do about
   it. Set the passages side by side. If they all agree, say that, and say what kind of books
   they are.
5. **Over time**: the earliest and latest works, and whether the account changes between them.
   Use the year of the work. Leave this out when the works span only a few years.
6. **At the edges**: what the opposite concepts' quotes say, and the one or two links in the
   map that surprised you.
7. **What the map lacks**: themes that recur in these passages with no concept of their own,
   neighbours with no quotes, a definition the quotes do not fit. These are suggestions for
   the owner; you change nothing.

The grouping in parts 3 and 4 is your reading, and the person may read the passages
differently. Give them enough of each author's words to judge, and keep your summary of an
author within what the passage in front of you says.
