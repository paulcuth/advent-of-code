/**
 * @typedef {object} Cell
 * @prop {number} row
 * @prop {number} col
 * @prop {string} value
 */

/**
 * @typedef {object} Coords
 * @prop {number} row
 * @prop {number} col
 */

/**
 * @typedef {"n" | "ne" | "e" | "se" | "s" | "sw" | "w" | "nw"} Direction
 */

/*******************************************************************************
  Utils
 ******************************************************************************/

/**
 * Returns the coordinates of a neighboring cell in the given direction
 * @param {Coords} coords
 * @param {Direction} direction
 */
function translateCoords(coords, direction) {
  const { row, col } = coords;
  switch (direction) {
    case "n":
      return { row: row - 1, col };
    case "ne":
      return { row: row - 1, col: col + 1 };
    case "e":
      return { row, col: col + 1 };
    case "se":
      return { row: row + 1, col: col + 1 };
    case "s":
      return { row: row + 1, col };
    case "sw":
      return { row: row + 1, col: col - 1 };
    case "w":
      return { row, col: col - 1 };
    case "nw":
      return { row: row - 1, col: col - 1 };
  }
}

/*******************************************************************************
  Class
 ******************************************************************************/

export default class Grid {
  /** @type {string[][]} */
  cells = [];

  /**
   * Creates a grid from a file buffer
   * @param {Buffer} file
   * @returns {Grid}
   */
  static from(file) {
    const lines = file.toString().split("\n");
    const cells = lines.map((line) => line.split(""));

    const grid = new Grid();
    grid.cells = cells;

    return grid;
  }

  /**
   * Loops through each possible direction
   * @param {(direction: Direction) => void} callback
   */
  static forEachDirection(callback) {
    /** @type {Direction[]} */
    const directions = ["n", "ne", "e", "se", "s", "sw", "w", "nw"];
    directions.forEach((direction) => callback(direction));
  }

  /**
   * Returns the value of a cell
   * @param {Coords} coords
   * @returns {Cell | undefined}
   */
  getCell(coords) {
    const { row, col } = coords;
    const value = this.cells[row]?.[col];
    return value ? { row, col, value } : undefined;
  }

  /**
   * Returns a neighbouring cell in a given direction
   * @param {Coords} start
   * @param {Direction} direction
   * @param {number} [length]
   * @returns {Cell | undefined}
   */
  getNeighbouringCell(start, direction, length) {
    const { row, col } = translateCoords(start, direction);
    const value = this.cells[row]?.[col];
    return value ? { row, col, value } : undefined;
  }

  /**
   * Returns a string starting at coords running in a given direction
   * @param {Coords} coords
   * @param {Direction} direction
   * @param {number} [length]
   * @returns {string | undefined}
   */
  lineFrom(coords, direction, length) {
    const { value } = this.getCell(coords) ?? {};
    if (value === undefined || length === 0) {
      return "";
    }

    return `${value}${this.lineFrom(
      translateCoords(coords, direction),
      direction,
      length && length - 1
    )}`;
  }

  /**
   * Loops over each cell
   * @param {(cell: Cell) => void} callback
   */
  forEachCell(callback) {
    this.cells.forEach((rowData, row) => {
      rowData.forEach((_, col) => {
        const cell = this.getCell({ row, col });
        if (cell != undefined) {
          callback(cell);
        }
      });
    });
  }
}
