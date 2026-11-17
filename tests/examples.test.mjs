// Each example (examples/<skill>/<slug>/) is a draft a skill produced, with its quotes' saved text; the checker
// must pass it. Run with `node --test`. Needs pandoc on the PATH for the build step to count.
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";

const ROOT = path.join(import.meta.dirname, "..");
const CHECK = path.join(ROOT, "scripts/check-draft.mjs");
const EXAMPLES = path.join(ROOT, "examples");
const folders = (dir) => fs.readdirSync(dir).filter((d) => fs.statSync(path.join(dir, d)).isDirectory()).map((d) => path.join(dir, d));

for (const dir of folders(EXAMPLES).flatMap(folders)) {
  const slug = path.basename(dir);
  test(`${path.relative(EXAMPLES, dir)} passes check-draft`, () => {
    const run = spawnSync(process.execPath, [CHECK, path.join(dir, `${slug}.md`), "--quotes", path.join(dir, "quotes.json")], { encoding: "utf8" });
    const report = JSON.parse(run.stdout);
    assert.ok(report.quotes.length > 0);
    assert.equal(report.ok, true, JSON.stringify(report, null, 2));
  });
}
