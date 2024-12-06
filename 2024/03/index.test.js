const fs = require("node:fs");
const input = fs.readFileSync(__dirname + "/input.txt");

const day = (__dirname.match(/\d{4}\/\d\d$/) ?? [])[0] ?? __dirname;

describe(day, () => {
  it("Part 1", async () => {
    const { part1 } = await import("./index.mjs");
    expect(part1(input)).toEqual(196826776);
  });

  it("Part 2", async () => {
    const { part2 } = await import("./index.mjs");
    expect(part2(input)).toEqual(106780429);
  });
});
