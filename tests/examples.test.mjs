// Each example is a draft the cited-article skill produced, with its quotes' saved text; the checker must pass it.
// Run with `node --test tests/`. Needs pandoc on the PATH for the build step to count.
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";

const ROOT = path.join(import.meta.dirname, "..");
const CHECK = path.join(ROOT, "cited-article/check-draft.mjs");
const EXAMPLES = path.join(ROOT, "examples/cited-article");

for (const slug of fs.readdirSync(EXAMPLES).filter((d) => fs.statSync(path.join(EXAMPLES, d)).isDirectory())) {
  test(`${slug} passes check-draft`, () => {
    const dir = path.join(EXAMPLES, slug);
    const run = spawnSync(process.execPath, [CHECK, path.join(dir, `${slug}.md`), "--quotes", path.join(dir, "quotes.json")], { encoding: "utf8" });
    const report = JSON.parse(run.stdout);
    assert.ok(report.quotes.length > 0);
    assert.equal(report.ok, true, JSON.stringify(report, null, 2));
  });
}
