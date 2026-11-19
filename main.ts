// gta6-meme-x-01 entry — Node 22, standard library only.
//
// The entry itself is the X post: a GTA 6 meme whose picture shows make.fun's
// ghost mascot and whose text carries make.fun, @makefunai and our play code.
// This program does the one thing the bounty asks of it: it copies POST.json
// from the repository root into the output directory, where the gate reads it.
// The house reads the post from X itself; nothing written here is judged.
// A placeholder URL in POST.json means the gate refuses the entry, so the
// file must hold the real post address before submission.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const fileName = "POST.json";

mkdirSync(outputDir, { recursive: true });

try {
  copyFileSync(join(botDir, fileName), join(outputDir, fileName));
} catch (error) {
  const reason = error instanceof Error ? error.message : String(error);
  console.error(`Could not copy ${fileName} out of ${botDir}: ${reason}`);
  process.exit(1);
}

console.log(`Copied ${fileName} to ${outputDir}.`);
