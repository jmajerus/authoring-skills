# Using the skills with smaller models

The skills in this repository were written and first run on large models. This document
records what happens on smaller ones, one section per model, and only from tests that were
actually run. A model with no section here has not been tested; the plan for the ones still
to do is in [LITE-MODELS-PLAN.md](LITE-MODELS-PLAN.md).

Each section says what was tested and how, what worked, what went wrong, and what a person
using that model should do differently.

## Claude Haiku 5.5 (`claude-haiku-5-5`)

**Tested 2026-11-17. Verdict: use the full skills. No reduced set is needed for this model.**

Three research aids were run once each, on the topic of blame, against the author's library.
Haiku finished all three, followed the steps in order, and read the shared `library.md` first
each time. Its mistakes were slips in copying and summarising, listed below, and the last
section says how to catch them.

### How it was tested

| | |
|---|---|
| Host | Claude Code (VS Code extension), each skill run by a subagent |
| Model | Every reply came from `claude-haiku-5-5`, with extended thinking on |
| Advisor | The session had Claude Opus 5.5 set as an advisor model. No call to it appears in any of the three transcripts, but it was available |
| Tools | The portal's tools were loaded on demand: the model fetched only the definitions it needed (eight, in the run that reported a number) out of about a hundred. A host that loads every definition at the start was not tested |
| Skill text | As first written. The skills were tightened afterwards in response to these results, and have not been rerun |
| Runs | One per skill, one topic |

### Results

| Skill | Outcome | Portal calls | Largest context |
|---|---|---|---|
| draft-check | Found all six errors planted in a test draft, and passed the one correct quotation | 22 | 64,000 tokens |
| counter-reading | Read each e-book passage in context before reporting it, set aside one that only appeared to disagree, and said plainly that the library holds no outright contradiction | 18 | 93,000 tokens |
| source-survey | A usable brief with correct counts, kinds of holding, and places. Three errors of detail, below | 27 | 102,000 tokens |

The six planted errors in the draft were: a changed word in a transcribed quote, a wrong page
on a marked quote, a paraphrase that said the opposite of its source, an e-book cited by page
when it has none, a changed word in an e-book quote, and a book that cannot yet be cited.

### What went wrong

- **A near-quote inside quotation marks.** The survey quoted a saved passage with a word
  dropped and no mark to show it.
- **A wrong id.** It gave a work's number where the quote's id was wanted.
- **Two authors joined under one view.** It said two authors both grant a point that only one
  of them makes; the other says the opposite.
- **Steps skipped when the call budget ran short.** The survey left out the searches on
  neighbouring concepts and half the holdings checks. It listed what it skipped.
- **Candidates set aside on their snippets.** Counter-reading left three passages unread
  because their search snippets looked unpromising.
- **A summary count that did not add up**, above findings that were each correct.
- **One over-strict flag.** Draft-check reported a sentence that only introduced a quotation
  as an unsupported claim.

None of these is a failure to follow the procedure, and a larger model can make the same
slips. Each now has a sentence in the skill text aimed at it.

### If you use this model

- **Check quoted words before you use them.** A passage in a brief or dossier comes with a
  quote id or a book and place. Look it up, or ask for the passage again by id, before it goes
  into your own writing. The article skills and draft-check do this checking on the server;
  the briefs do not.
- **Ask what was skipped.** End a request with "and list anything you did not look at". Haiku
  answered this candidly every time.
- **Distrust a sentence that names two authors as agreeing.** Read both passages.
- **Trust the itemised findings over the summary count** in a draft-check report.
- **Allow about 100,000 tokens of context.** Haiku has that; a host that trims context
  aggressively may not give it.

### Not tested on this model

- quote-harvest (it writes to the quote store), concept-dossier, and reading-gaps
- portal-article and cited-article
- any topic other than blame, and any second run
- a host that loads all tool definitions at once
- the skills as tightened after the test

## Local models on a 16GB machine

Not yet tested. `gemma4:12b`, `deepseek-r1:14b`, and similar models are a different case from
the one above: the limit is the context a 16GB machine can hold, which is well under what the
three runs above used. These are expected to need a reduced set of tools and skills. See
[LITE-MODELS-PLAN.md](LITE-MODELS-PLAN.md).
