// Every skill folder must load in a host: front matter with the folder's name and a description within the
// hosts' limit, and relative links that open (a symlink to a shared file counts when its target exists).
// Run with `node --test`.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";

const ROOT = path.join(import.meta.dirname, "..");
const DESCRIPTION_MAX = 1024;

const skills = fs.readdirSync(ROOT).filter((d) => fs.existsSync(path.join(ROOT, d, "SKILL.md")));

test("there are skills to check", () => assert.ok(skills.length >= 2, skills.join(", ")));

for (const skill of skills) {
  const dir = path.join(ROOT, skill);
  const text = fs.readFileSync(path.join(dir, "SKILL.md"), "utf8");

  test(`${skill} has front matter a host can load`, () => {
    const front = text.match(/^---\n([\s\S]*?)\n---\n/);
    assert.ok(front, "no front matter");
    const field = (name) => front[1].match(new RegExp(`^${name}: (.*)$`, "m"))?.[1] ?? "";
    assert.equal(field("name"), skill);
    const description = field("description");
    assert.ok(description.length > 0, "no description");
    assert.ok(description.length <= DESCRIPTION_MAX, `description is ${description.length} characters`);
  });

  test(`${skill} links to files that exist`, () => {
    const links = [...text.matchAll(/\]\(([^)#\s]+)(?:#[^)]*)?\)/g)].map((m) => m[1]).filter((l) => !/^[a-z]+:/.test(l));
    for (const link of links) assert.ok(fs.existsSync(path.join(dir, link)), `${link} does not resolve`);
  });
}
