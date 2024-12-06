/*******************************************************************************
  Utils
 ******************************************************************************/

/**
 * Assesses whether the given levels are safe
 * @param {number[]} levels
 * @returns
 */
function isSafe(levels) {
  const deltas = levels.map((level, index) => levels[index + 1] - level);
  deltas.pop();

  const dir = deltas[0] / Math.abs(deltas[0]);
  const invalid = deltas.find(
    (d) => d < -3 || d > 3 || d / Math.abs(d) !== dir
  );

  return invalid == null;
}

/**
 * Assesses whether the levels are safe when using a problem dampener
 * @param {number[]} levels
 * @returns
 */
function isSafeWithProblemDampener(levels) {
  if (isSafe(levels)) {
    return true;
  }

  const safe = levels.find((level, index) => {
    const levelsWithOmission = [...levels];
    levelsWithOmission.splice(index, 1);
    return isSafe(levelsWithOmission);
  });

  return safe != null;
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
  const lines = file.toString().split("\n");

  const safe = lines.filter((line) => {
    const levels = line.split(/\s+/).map(Number);
    return isSafe(levels);
  });

  return safe.length;
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
  const lines = file.toString().split("\n");

  const safe = lines.filter((line) => {
    const levels = line.split(/\s+/).map(Number);
    return isSafeWithProblemDampener(levels);
  });

  return safe.length;
}
