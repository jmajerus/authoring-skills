# Installing the authoring skills

These skills are folders of instructions and supporting files. Install them in a
location your agent reads, then connect that agent to an Authoring MCP Portal
you are authorized to use. Installing a skill does not configure the MCP connection.

The paths below were checked against the host documentation on 2026-11-16.
They cover local installations; remote workspaces, containers, WSL, and cloud
agents need the files and dependencies in the environment where the agent runs.

## Prerequisites

- Keep a checkout of this repository on the machine where the agent runs.
- `portal-article` uses the holdings, corpus, quote, terminology, zotero, and
  iasp MCP servers, all available through the single portal connection below.
- `cited-article` uses corpus and quote, and its default Zotero filing workflow
  also uses zotero. Node.js runs its draft checker; Pandoc with citeproc is
  needed for automated checking and formatted output. See the skill for its
  fallback when Pandoc is unavailable.
- The research aids (`source-survey`, `draft-check`, `quote-harvest`,
  `concept-dossier`, `counter-reading`, `reading-gaps`) use holdings, corpus,
  quote, and terminology; `draft-check` also uses iasp. They need no local tools.
- The agent needs access to the skill files, the relevant MCP tools, and, for
  local checking, permission to run the commands and read the draft files.

## Connect to an Authoring MCP Portal

The author's Cloudflare-hosted portal at `http://authoring.majerus.us/mcp`
is a private installation. Access requires the owner's explicit authorization;
the repository license does not grant access to it or its data.

For your own deployment, you can follow the portal model subject to the
applicable project licenses and configure it for your own servers and data.
In your host's MCP settings, add a remote server connection using the URL of
your deployment, or a portal you have explicit authorization to use. A portal
configured like the author's exposes all six servers through one connection.
Complete any authentication required by that deployment. Each host or extension
has its own MCP configuration, so add the connection to each one you intend to
use. Installing the skills below is a separate step.

## Choose a location

Personal locations apply across projects on that machine; project locations
apply to the workspace containing them. Choose one location per host and scope.
For a project location, place it in the **writing project's root**, not
necessarily this repository. Paths and features may vary with host versions.

| Host | Personal skills directory | Project skills directory | Notes |
|---|---|---|---|
| [Claude Code](https://code.claude.com/docs/en/skills), including its VS Code extension | `~/.claude/skills` | `.claude/skills` | Use the same skill locations for the extension and CLI. |
| [Codex](https://developers.openai.com/api/reference/cli), including its VS Code extension | `~/.agents/skills` | `.agents/skills` | The VS Code Copilot Codex integration also discovers workspace `.github/skills`; see [VS Code skills](https://code.visualstudio.com/docs/agent-customization/agent-skills). |
| [GitHub Copilot in VS Code](https://code.visualstudio.com/docs/agent-customization/agent-skills) | `~/.copilot/skills` | `.github/skills` | Copilot is the host; MCP is configured separately. |
| [Kilo Code](https://kilo.ai/docs/customize/skills), including its VS Code extension | `~/.kilo/skills` | `.kilo/skills` | Also discovers `.agents/skills` at both scopes by default. |
| [Cline](https://github.com/cline/cline/blob/main/docs/customization/skills.mdx), including its VS Code extension | `~/.cline/skills` | `.cline/skills` | Manage discovered skills in the panel's Skills tab. |
| [ZCode Agent](https://zcode.z.ai/en/docs/skill) | `~/.zcode/skills` | Use its Skills import dialog for a project target | In Settings → Skills, refresh and enable the skills. |

## Link the checkout

On macOS or Linux, the following commands install every skill for Claude Code;
shorten the list to install only some.
Run them **from the root of this checkout**. To use another host or project
scope, replace the `skill_dir` value with the matching directory from the
table; use an absolute path for a project directory.

```bash
skill_dir="$HOME/.claude/skills"
mkdir -p "$skill_dir"
for skill in portal-article cited-article source-survey draft-check \
  quote-harvest concept-dossier counter-reading reading-gaps; do
  if [ -e "$skill_dir/$skill" ] || [ -L "$skill_dir/$skill" ]; then
    printf 'Already exists: %s\n' "$skill_dir/$skill"
  else
    ln -s "$PWD/$skill" "$skill_dir/$skill"
  fi
done
```

The commands do not replace existing entries. If a name already exists, inspect
it and remove or move it only if you intend to replace it, then retry. Links
follow updates to this checkout, so keep the checkout at the same path. They
are local to this machine and should not be committed as a team installation.
Some hosts or sandbox settings may restrict access to links outside a workspace;
use a copy if the host cannot follow them.

On Windows, use your host's import facility where available, or copy the files
as described below. ZCode can import skills from another agent in Settings →
Skills, choosing either a link or a copy and a global or project target.

## Copy instead of linking

Copy the complete skill directories into the chosen skills directory, preserving
their names. **Do not copy only `SKILL.md`.** Two files in this checkout are
relative symlinks, and a copied skill folder alone leaves them broken:

- `cited-article/check-draft.mjs` links to `../scripts/check-draft.mjs`.
- `library.md` in each research aid's folder links to `../shared/library.md`.

Replace each copied link with the actual file it points to (`cp -rL` does this
while copying). Include the templates and assets too. Copies
do not receive updates automatically; repeat the copy after updating the checkout.
This also applies to import tools that copy the skill directory.

## Verify and use

1. Start a new agent session or reload its skills. In VS Code, open the writing
   workspace and select the intended extension or agent; each host has its own
   configuration. ZCode has a Refresh button in Settings → Skills; Kilo also
   supports `/reload`.
2. Check the host's skills list, or ask it whether `portal-article` and
   `cited-article` are available. If needed, invoke the desired skill by name.
3. Ask the agent to list the relevant MCP tools. If they are missing, check the
   portal connection and authentication in that host.
4. For `cited-article`, check that `check-draft.mjs` resolves and that `node`
   and `pandoc` are available in the agent's execution environment. For a
   research aid, check that `library.md` in its folder opens.

If a skill is missing, check the scope, exact directory names and `SKILL.md`
locations, then reload. Check for duplicate names in another scope or disabled
skills in the host. A discovered skill may still need permission to access its
files, run commands, or call MCP tools. Remove the installed links or copied
folders to uninstall; removing links leaves the checkout intact.
