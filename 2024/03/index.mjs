/*******************************************************************************
  Part 1
 ******************************************************************************/

/**
 * Solution to part 1
 * @param {Buffer} file
 * @returns {number}
 */
export function part1(file) {
  const PATTERN = /mul\((\d{1,3}),(\d{1,3})\)/m;
  let instructions;
  let index = 0;
  let total = 0;

  while ((instructions = file.toString().substring(index).match(PATTERN))) {
    const [phrase, op1, op2] = instructions;

    total = total + parseInt(op1, 10) * parseInt(op2, 10);
    index = index + (instructions.index ?? 0) + phrase.length;
  }

  return total;
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
  const PATTERN = /(do\(\))|(don't\(\))|(mul\((\d{1,3}),(\d{1,3})\))/m;
  let instructions;
  let index = 0;
  let total = 0;
  let isEnabled = true;

  while ((instructions = file.toString().substring(index).match(PATTERN))) {
    const [phrase, doo, dont, _, op1, op2] = instructions;

    if (doo) {
      isEnabled = true;
    } else if (dont) {
      isEnabled = false;
    } else if (isEnabled) {
      total = total + parseInt(op1, 10) * parseInt(op2, 10);
    }

    index = index + (instructions.index ?? 0) + phrase.length;
  }

  return total;
}
