// tools-used.json lists the MCP tools the skills call, by each service's own names (the portal adds a prefix).
// The suite's ops server reads it and reports when a service stops listing one, so a rename shows before a
// skill trips over it mid-run. This test keeps the list honest in one direction: every tool it names is one a
// skill names. The other direction (a tool a skill names that the list leaves out) needs the services' live
// listings, so the ops server checks that.
// Run with `node --test`.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";

const ROOT = path.join(import.meta.dirname, "..");
const used = JSON.parse(fs.readFileSync(path.join(ROOT, "tools-used.json"), "utf8"));

const skills = fs.readdirSync(ROOT).filter((d) => fs.existsSync(path.join(ROOT, d, "SKILL.md")));
// A skill's text is its SKILL.md and the Markdown beside it (a symlink to a shared file is read through).
const text = skills.flatMap((skill) => fs.readdirSync(path.join(ROOT, skill)).filter((f) => f.endsWith(".md"))
  .map((f) => fs.readFileSync(path.join(ROOT, skill, f), "utf8"))).join("\n");
const named = new Set([...text.matchAll(/`([a-z][a-z0-9_]*)`/g)].map((m) => m[1]));

test("tools-used.json maps each service to the tools called on it", () => {
  assert.ok(Object.keys(used).length > 0);
  for (const [service, tools] of Object.entries(used)) {
    assert.match(service, /^[a-z][a-z0-9-]*$/, `${service} is not a service name`);
    assert.ok(Array.isArray(tools) && tools.length > 0, `${service} lists no tools`);
    assert.equal(new Set(tools).size, tools.length, `${service} lists a tool twice`);
  }
});

for (const [service, tools] of Object.entries(used)) {
  test(`every ${service} tool listed is named in a skill`, () => {
    const unnamed = tools.filter((tool) => !named.has(tool));
    assert.deepEqual(unnamed, [], `no skill names ${unnamed.join(", ")}; drop it from tools-used.json or name it in the skill`);
  });
}
