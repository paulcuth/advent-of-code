import Grid from "../../lib/Grid.mjs";

/*******************************************************************************
  Utils
 ******************************************************************************/

/**
 * Converts the input file to a 2-dimentional array
 * @param {Buffer} file
 * @returns {string[][]}
 */
function fileToArray(file) {
  const lines = file.toString().split("\n");
  return lines.map((line) => line.split(""));
}

/**
 * Rotate the grid 90deg clockwise
 * @param {string[][]} letters
 * @returns {string[][]}
 */
export function rotateGrid90(letters) {
  /** @type {string[][]} */
  const result = [];
  const cols = letters[0]?.length ?? 0;

  letters.forEach((line, index) => {
    line.forEach((letter, colIndex) => {
      const rowIndex = cols - index - 1;
      if (result[colIndex] == undefined) {
        result[colIndex] = [];
      }
      result[colIndex][rowIndex] = letter;
    });
  });

  return result;
}

/**
 * Rotate the grid 45deg clockwise
 * @param {string[][]} letters
 * @returns {string[][]}
 */
export function rotateGrid45(letters) {
  const result = letters.map((_, index) => {
    /** @type {string[]} */
    const row = [];

    let i = index;
    while (i >= 0) {
      row.push(letters[i][index - i]);
      i = i - 1;
    }

    return row;
  });

  const rowCount = letters.length;
  const colCount = letters[0]?.length ?? 0;

  letters[0].forEach((_, index) => {
    if (index === 0) {
      return;
    }

    /** @type {string[]} */
    const row = [];

    let i = index;
    while (i < colCount) {
      row.push(letters[rowCount + index - i - 1][i]);
      i = i + 1;
    }

    result.push(row);
  });

  // console.log(result);
  return result;
}

/**
 * Returns all the possible strings running horizontally forwards
 * @param {string[][]} letters
 * @returns {string[]}
 */
function getHorizontalForwardPaths(letters) {
  return letters.map((line) => line.join(""));
}

/**
 * Returns all the possible strings running horizontally backwards
 * @param {string[][]} letters
 * @returns {string[]}
 */
function getHorizontalReversePaths(letters) {
  return letters.map((line) => line.reverse().join(""));
}

/**
 * Returns all the possible strings running vertically downwards
 * @param {string[][]} letters
 * @returns {string[]}
 */
function getVerticalDownPaths(letters) {
  const rotatedGrid = rotateGrid90(letters);
  return getHorizontalForwardPaths(rotatedGrid);
}

/**
 * Returns all the possible strings running vertically upwards
 * @param {string[][]} letters
 * @returns {string[]}
 */
function getVerticalUpPaths(letters) {
  const rotatedGrid = rotateGrid90(letters);
  return getHorizontalReversePaths(rotatedGrid);
}

/**
 * Returns all the possible strings running diagonally up and forwards
 * @param {string[][]} letters
 * @returns {string[]}
 */
function getDiagonalForwardUpPaths(letters) {
  const rotatedGrid = rotateGrid45(letters);
  return getHorizontalForwardPaths(rotatedGrid);
}

/**
 * Returns all the possible strings running diagonally down and backwards
 * @param {string[][]} letters
 * @returns {string[]}
 */
function getDiagonalReverseDownPaths(letters) {
  const rotatedGrid = rotateGrid45(letters);
  return getHorizontalReversePaths(rotatedGrid);
}

/**
 * Returns all the possible strings running diagonally up and backwards
 * @param {string[][]} letters
 * @returns {string[]}
 */
function getDiagonalReverseUpPaths(letters) {
  const rotatedGrid = rotateGrid45(rotateGrid90(letters));
  return getHorizontalForwardPaths(rotatedGrid);
}

/**
 * Returns all the possible strings running diagonally down and forwards
 * @param {string[][]} letters
 * @returns {string[]}
 */
function getDiagonalForwardDownPaths(letters) {
  const rotatedGrid = rotateGrid45(rotateGrid90(letters));
  return getHorizontalReversePaths(rotatedGrid);
}

/*******************************************************************************
  Part 1, attempt 1 (working)
 ******************************************************************************/

/**
 * Solution to part 1
 * @param {Buffer} file
 * @returns {number}
 */
// export function part1(file) {
//   const letters = fileToArray(file);
//   const paths = [
//     ...getHorizontalForwardPaths(letters),
//     ...getHorizontalReversePaths(letters),
//     ...getVerticalDownPaths(letters),
//     ...getVerticalUpPaths(letters),
//     ...getDiagonalForwardDownPaths(letters),
//     ...getDiagonalForwardUpPaths(letters),
//     ...getDiagonalReverseDownPaths(letters),
//     ...getDiagonalReverseUpPaths(letters),
//   ];

//   const possibilities = paths.join("\n");
//   return paths.reduce((result, path) => {
//     return result + path.split("XMAS").length - 1;
//   }, 0);
// }

/*******************************************************************************
  Part 1
 ******************************************************************************/

/**
 * Solution to part 1
 * @param {Buffer} file
 * @returns {number}
 */
export function part1(file) {
  const grid = Grid.from(file);
  let count = 0;

  grid.forEachCell((cell) => {
    const { row, col } = cell;
    Grid.forEachDirection((direction) => {
      if (grid.lineFrom({ row, col }, direction, 4) === "XMAS") {
        count = count + 1;
      }
    });
  });

  return count;
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
  const grid = Grid.from(file);
  let count = 0;

  grid.forEachCell((cell) => {
    const { row, col } = cell;

    const d1 = grid.lineFrom({ row: row - 1, col: col - 1 }, "se", 3);
    const d2 = grid.lineFrom({ row: row + 1, col: col - 1 }, "ne", 3);

    if ((d1 === "MAS" || d1 === "SAM") && (d2 === "MAS" || d2 === "SAM")) {
      count = count + 1;
    }
  });

  return count;
}
