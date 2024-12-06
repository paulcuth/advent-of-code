const fs = require("node:fs");

/*******************************************************************************
  Constants
 ******************************************************************************/

const ANSWER_PART_ONE = 5651;
const ANSWER_PART_TWO = 4743;

/*******************************************************************************
  Setup
 ******************************************************************************/

const input = fs.readFileSync(__dirname + "/input.txt");
const day = (__dirname.match(/\d{4}\/\d\d$/) ?? [])[0] ?? __dirname;

/*******************************************************************************
  Tests
 ******************************************************************************/

describe(day, () => {
  it("solves the first eaxmple", async () => {
    const input = Buffer.from(`47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`);
    const { part1 } = await import("./index.mjs");
    expect(part1(input)).toEqual(143);
  });

  it("Part 1", async () => {
    const { part1 } = await import("./index.mjs");
    expect(part1(input)).toEqual(ANSWER_PART_ONE);
  });

  it("solves the second eaxmple", async () => {
    const input = Buffer.from(`47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`);
    const { part2 } = await import("./index.mjs");
    expect(part2(input)).toEqual(123);
  });

  it("Part 2", async () => {
    const { part2 } = await import("./index.mjs");
    expect(part2(input)).toEqual(ANSWER_PART_TWO);
  });
});
