const fs = require("node:fs");

const arg = process.argv[2];
const now = new Date();

const path =
  arg === "today"
    ? `${now.getFullYear()}/${`0${now.getDate()}`.substring(-2)}`
    : arg;

(async () => {
  const mod = await import(`./${path}/index.mjs`);
  const input = fs.readFileSync(`./${path}/input.txt`);

  console.log(`${path}:`);
  if (mod.part1) {
    console.log("Part 1:", mod.part1(input));
  }
  if (mod.part2) {
    console.log("Part 2:", mod.part2(input));
  }
})();
