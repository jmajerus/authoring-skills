# Plan: the skills on local models

Status on 2026-11-17: **waiting on setup.** Nothing below has been run. Results from the one
model tested so far, Claude Haiku 5.5, are in [LITE-MODELS.md](LITE-MODELS.md).

## The question

Can a model that runs comfortably on a Mac Mini M4 with 16GB of memory (`gemma4:12b`,
`deepseek-r1:14b`, or another of that size) do useful research work on the library through
the portal, and with which skills?

## What is known

- **The current skills will not fit.** On Haiku 5.5 the three research aids reached a context
  of 64,000 to 102,000 tokens. A 12B model at 4-bit takes about 8GB, and a 16GB Mac leaves
  roughly 11GB usable, so a context of about 16,000 tokens is realistic and 32,000 is tight.
- **The tool list may not fit either.** The portal presents about a hundred tool definitions,
  estimated (not measured) at 25,000 to 30,000 tokens.
- **Ollama's default context is 4,096 tokens** whatever the model supports. `num_ctx` has to be
  set.
- **Tool calling is the weak link.** `gemma4:12b` is advertised with it; reports say it needs
  Ollama 0.22.0 or later and still fails now and then. Reports on the official
  `deepseek-r1:14b` tag conflict, and a reasoning model spends context on thinking.

The last two points come from blog posts and forum threads, not from the vendors. Treat them
as things to confirm in the test.

## Setup needed first

On the Mac:

1. Ollama 0.22.0 or later, with `gemma4:12b` pulled. `deepseek-r1:14b` and one small Qwen
   model as comparisons, if there is room.
2. Ollama listening on the network (`OLLAMA_HOST=0.0.0.0`), and the Mac's address, so the test
   can be driven from the workstation.
3. For stage 2 only: an MCP client in front of Ollama (Cline, Kilo, or similar) that can sign
   in to the portal.

On the portal, for stage 2 only: a profile that exposes six to eight tools. A first list:
`find_work`, `search_corpus`, `read_book`, `search_quotes`, `get_concept`, `add_quote`,
`validate_markdown`.

## The test

**Offer on the table:** once step 2 of the setup is done, Claude runs stage 1 from the
workstation and reports the scores. It needs only the Mac's address and port.

### Stage 1: can the model call the tools?

No portal access is needed. Each model is sent the real tool definitions and a request, and
its first tool call is scored.

- **Requests**, about ten, taken from the skills: find a saved quote by a phrase, search one
  book for a phrase, read a page, look up a concept, find a work by author.
- **Scored on**: a tool call was made at all; the right tool; arguments that match the schema;
  `file_page` not confused with a printed page; a `limit` set when asked for.
- **Varied by**: the number of tools offered (7, 30, all), and `num_ctx` (8,000, 16,000,
  32,000), with memory use and speed noted for each.

A model that cannot pass stage 1 with seven tools is dropped.

### Stage 2: can it finish a task?

On the Mac, in the MCP client, through the reduced portal profile. The same material as the
Haiku test (the topic of blame, and the test draft with six planted errors), so the results
can be set side by side.

## The lite set to build

To be written against the stage 1 results, not before. The working sketch:

| Lite skill | It does | Why it should hold up |
|---|---|---|
| Find saved quotes | Lists the quotes saved on a topic, with places | One or two calls, and nothing to interpret |
| Check one quotation | Compares one quoted passage with its book | A short chain, and the answer is yes or no |
| Check marked quotes | Runs the draft's marked quotes through the validator | The server does the comparing |
| Save one passage | Saves a passage the person points to | The server refuses words that are not in the book |

Each would be one self-contained file of about sixty lines, with five to eight tool calls,
a small `limit` on every call, and a fill-in form for the reply. The survey, the dossier,
counter-reading, and gap-finding are left out: they need many passages held in mind at once.

## Also outstanding

- Rerun the three Haiku trials against the tightened skill text.
- Try quote-harvest, concept-dossier, and reading-gaps on Haiku 5.5. quote-harvest writes to
  the quote store, so it needs a go-ahead and a book chosen for it.
- Measure the size of the full tool list instead of estimating it.

## Open questions

- Which MCP client on the Mac, and does it handle the portal's sign-in?
- Can the portal offer a profile by tool, or only by server?
- Is a context of 16,000 tokens enough for even the four lite skills once tool results come
  back? `read_book` and `search_quotes` would both need small limits.
