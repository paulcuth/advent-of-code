const fs = require("node:fs");

/*******************************************************************************
  Constants
 ******************************************************************************/

const ANSWER_PART_ONE = 0;
const ANSWER_PART_TWO = 0;

/*******************************************************************************
  Setup
 ******************************************************************************/

const input = fs.readFileSync(__dirname + "/input.txt");
const day = (__dirname.match(/\d{4}\/\d\d$/) ?? [])[0] ?? __dirname;

/*******************************************************************************
  Tests
 ******************************************************************************/

describe(day, () => {
  it("Part 1", async () => {
    const { part1 } = await import("./index.mjs");
    expect(part1(input)).toEqual(ANSWER_PART_ONE);
  });

  it("Part 2", async () => {
    const { part2 } = await import("./index.mjs");
    expect(part2(input)).toEqual(ANSWER_PART_TWO);
  });
});
