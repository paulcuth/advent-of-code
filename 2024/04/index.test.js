const fs = require("node:fs");

/*******************************************************************************
  Constants
 ******************************************************************************/

const ANSWER_PART_ONE = 2549;
const ANSWER_PART_TWO = 2003;

/*******************************************************************************
  Setup
 ******************************************************************************/

const input = fs.readFileSync(__dirname + "/input.txt");
const day = (__dirname.match(/\d{4}\/\d\d$/) ?? [])[0] ?? __dirname;

/*******************************************************************************
  Tests
 ******************************************************************************/

describe(day, () => {
  it("rotates a grid 45deg", async () => {
    const { rotateGrid45 } = await import("./index.mjs");
    const grid = [
      ["1", "2", "3"],
      ["4", "5", "6"],
      ["7", "8", "9"],
    ];
    expect(rotateGrid45(grid)).toEqual([
      ["1"],
      ["4", "2"],
      ["7", "5", "3"],
      ["8", "6"],
      ["9"],
    ]);
  });

  it("rotates a grid 90deg", async () => {
    const { rotateGrid90 } = await import("./index.mjs");
    const grid = [
      ["1", "2", "3"],
      ["4", "5", "6"],
      ["7", "8", "9"],
    ];
    expect(rotateGrid90(grid)).toEqual([
      ["7", "4", "1"],
      ["8", "5", "2"],
      ["9", "6", "3"],
    ]);
  });

  it("solves the first example", async () => {
    const { part1 } = await import("./index.mjs");
    const input = Buffer.from(`..X...
.SAMX.
.A..A.
XMAS.S
.X....`);
    expect(part1(input)).toEqual(4);
  });

  it("solves the second example", async () => {
    const { part1 } = await import("./index.mjs");
    const input = Buffer.from(`MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`);
    expect(part1(input)).toEqual(18);
  });

  it("Part 1", async () => {
    const { part1 } = await import("./index.mjs");
    expect(part1(input)).toEqual(ANSWER_PART_ONE);
  });

  it("solves the third example", async () => {
    const { part2 } = await import("./index.mjs");
    const input = Buffer.from(`M.S
.A.
M.S`);
    expect(part2(input)).toEqual(1);
  });

  it("solves the forth example", async () => {
    const { part2 } = await import("./index.mjs");
    const input = Buffer.from(`.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........`);
    expect(part2(input)).toEqual(9);
  });

  it("Part 2", async () => {
    const { part2 } = await import("./index.mjs");
    expect(part2(input)).toEqual(ANSWER_PART_TWO);
  });
});
