/*******************************************************************************
  Utils
 ******************************************************************************/

/**
 * Wrangles input file into two arrays
 * @param {Buffer} file Input file
 * @returns
 */
function getGroups(file) {
  const lines = file.toString().split("\n");

  /** @type {number[]} */
  const group1 = [];
  /** @type {number[]} */
  const group2 = [];

  lines.forEach((line) => {
    const [, location1, location2] = line.match("(\\d+)\\s+(\\d+)") ?? [];
    group1.push(Number(location1));
    group2.push(Number(location2));
  });

  group1.sort();
  group2.sort();

  return [group1, group2];
}

/*******************************************************************************
  Part 1
 ******************************************************************************/

/**
 * Solution to part 1
 * @param {Buffer} file
 * @returns {number}
 */
export function part1(file) {
  const [group1, group2] = getGroups(file);

  return group1.reduce((result, g1, index) => {
    const delta = Math.abs(g1 - group2[index]);
    return result + delta;
  }, 0);
}

/*******************************************************************************
  Part 2
 ******************************************************************************/

/**
 * Solution to part 2
 * @param {Buffer} file
 * @returns {number}
 */
export function part2(file) {
  const [group1, group2] = getGroups(file);

  /** @type {number[]} */
  const counts = [];

  group2.forEach((g2) => {
    counts[g2] = (counts[g2] ?? 0) + 1;
  });

  return group1.reduce((result, g1) => {
    const r = g1 * (counts[g1] ?? 0);
    return result + r;
  }, 0);
}
