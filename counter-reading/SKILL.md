---
name: counter-reading
description: Find the case against a claim in the owner's own library, through the Authoring Portal MCP servers (quote, terminology, corpus, holdings). Takes a thesis, an argument, or a draft, works out what would contradict or qualify it, follows the opposite links in the owner's thesaurus, searches the e-books for the opposing vocabulary, reads each passage in context, and reports who disagrees, who only qualifies, and whether the library holds any opposition at all. Read-only. Use this whenever the session has the portal's tools (names ending in get_concept, search_quotes, search_corpus, read_book) and the person asks who disagrees, for counterarguments, objections, the other side, a devil's advocate, a steelman, or to stress-test or pressure-test a thesis or draft against their books. For the full picture of one idea, use concept-dossier.
---

# Counter-reading

A writer who collects passages on a theme collects the ones they agree with. Before they
publish, they want to know what their own shelves say against them. You look for it honestly:
the strongest opposition the library holds, and a plain statement when it holds none.

Read [library.md](library.md) first: the tools, the three kinds of holding, and how to report
a passage.

Nothing is saved.

## 1. State the claim and its opposites

Put the claim in one sentence. From a draft, take the thesis and at most two supporting
claims that the piece would fall without; show the person the sentences you settled on in
your report, so they can correct you.

Then write what would count against it. There are usually three kinds:

- **Denial.** The opposite is true.
- **Qualification.** True only under some condition, or only for some people.
- **Rival account.** The same facts, a different explanation.

For "blame ruins working relationships": blame is how people are held to account; blame harms
only when it is public; what harms is the fear that was already there, and blame is its sign.
These sentences give you the words to search for.

## 2. Through the owner's map

`list_concepts` for the claim's main ideas, then `get_concept` for each.

- **Opposite concepts.** `search_quotes` with `concept` for each. These are the passages the
  owner filed at the other pole.
- **Related concepts that pull the other way**, such as accountability beside blame.
- **The claim's own concept.** Read all its quotes. A tag names a topic and not a side; some of
  the passages filed under the claim's own concept will cut against the claim.

## 3. Through the text

`search_corpus` for the vocabulary of each opposing sentence. Three things help:

- `advanced: true` with `NEAR(blame accountability, 12)` finds the two ideas in one breath.
- Search with `shelf` set to shelves away from the claim's home, which is the shelf most of
  its supporting passages come from. A claim from the psychology books may be answered from
  management, law, or literature. `list_shelves` names them.
- Search for the words of disagreement beside the topic: "but", "however" are too common to
  help, while "myth", "mistake", "in fact", "contrary" beside the topic word often find an
  author arguing.

## 4. Read each one in context

`read_book` a page either side of every candidate. This step decides everything, because
authors state a view in order to reject it, and a snippet cannot tell you which they are
doing. You may set a candidate aside on its snippet only when the word is plainly used in
another sense; a snippet that looks as if it agrees with the claim is still read, and any
candidate you did not read is listed as unread in the report. Sort each passage:

| Standing | Means |
|---|---|
| contradicts | the author holds the opposite, in their own voice |
| qualifies | the author agrees in part and sets a limit |
| rival account | the author explains the same thing another way |
| only appears to | the author reports the opposing view and goes on to reject it, or uses the word in another sense |

Drop the last kind from the case, and mention it only if the person might have been misled
by the same passage.

## 5. Report

1. The claim as you understood it, and the opposing sentences you searched for.
2. **The case against**, strongest first. Each passage reported the way library.md describes,
   with its standing and one line on what it would cost the claim.
3. **What the claim survives.** Which objections qualify it without overturning it, and the
   wording that would take them into account ("in organisations", "when it is public").
4. **What the library does not hold.** If you found no one who contradicts the claim, say so,
   and say what that shows: that these shelves lean one way. It is not evidence for the claim.
   Name the kind of book that would hold the other side.

Do not build opposition out of weak material to fill part 2. Two real objections are worth
more than six strained ones.

If an objection is well known and the library lacks it, you may add it after the report,
under a heading that says it comes from general knowledge and not from their books. Keep it
to a line or two and name no source you have not read here.
