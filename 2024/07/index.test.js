const fs = require("node:fs");

/*******************************************************************************
  Constants
 ******************************************************************************/

const ANSWER_PART_ONE = 7579994664753;
const ANSWER_PART_TWO = 438027111276610;

/*******************************************************************************
  Setup
 ******************************************************************************/

const input = fs.readFileSync(__dirname + "/input.txt");
const day = (__dirname.match(/\d{4}\/\d\d$/) ?? [])[0] ?? __dirname;

/*******************************************************************************
  Tests
 ******************************************************************************/

describe(day, () => {
  it("computes all the operators", async () => {
    const { getOperatorCombinations, ADD, MUL } = await import("./index.mjs");
    const operators0 = getOperatorCombinations(0, [ADD, MUL]);
    expect(operators0).toHaveLength(0);

    const operators1 = getOperatorCombinations(1, [ADD, MUL]);
    expect(operators1).toHaveLength(2);
    expect(operators1).toContainEqual([ADD]);
    expect(operators1).toContainEqual([MUL]);

    const operators = getOperatorCombinations(3, [ADD, MUL]);
    expect(operators).toHaveLength(8);
    expect(operators).toContainEqual([ADD, ADD, ADD]);
    expect(operators).toContainEqual([ADD, ADD, MUL]);
    expect(operators).toContainEqual([ADD, MUL, ADD]);
    expect(operators).toContainEqual([ADD, MUL, MUL]);
    expect(operators).toContainEqual([MUL, ADD, ADD]);
    expect(operators).toContainEqual([MUL, ADD, MUL]);
    expect(operators).toContainEqual([MUL, MUL, ADD]);
    expect(operators).toContainEqual([MUL, MUL, MUL]);
  });

  it("solves the first example", async () => {
    const { part1 } = await import("./index.mjs");
    const input = Buffer.from(`190: 10 19
  3267: 81 40 27
  83: 17 5
  156: 15 6
  7290: 6 8 6 15
  161011: 16 10 13
  192: 17 8 14
  21037: 9 7 18 13
  292: 11 6 16 20`);
    expect(part1(input)).toEqual(3749);
  });

  it("Part 1", async () => {
    const { part1 } = await import("./index.mjs");
    expect(part1(input)).toEqual(ANSWER_PART_ONE);
  });

  it("Part 2", async () => {
    const { part2 } = await import("./index.mjs");
    expect(part2(input)).toEqual(ANSWER_PART_TWO);
  });
});
