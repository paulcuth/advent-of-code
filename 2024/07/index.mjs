/**
 * @typedef {Object} Equation
 * @prop {number} result
 * @prop {number[]} operands
 */

/**
 * @typedef {(n1: number, n2: number) => number} Operator
 */

/** @type {Operator} */
export const ADD = (n1, n2) => n1 + n2;

/** @type {Operator} */
export const MUL = (n1, n2) => n1 * n2;

/** @type {Operator} */
export const CONCAT = (n1, n2) => Number(`${n1}${n2}`);

/*******************************************************************************
  Utils
 ******************************************************************************/

/**
 *
 * @param {Buffer} file
 * @returns {Equation[]}
 */
function parseFile(file) {
  const lines = file.toString().split("\n");
  return lines.map((line) => {
    const [resultStr, operandStr] = line.split(": ");
    return {
      result: Number(resultStr),
      operands: operandStr.split(" ").map(Number),
    };
  });
}

/**
 * Whether the equation is solvable
 * @param {Equation} equation
 * @param {Operator[]} operators
 * @return {boolean}
 */
function isSolvable(equation, operators) {
  const operands = equation.operands;
  const operatorSeqs = getOperatorCombinations(operands.length - 1, operators);

  const success = operatorSeqs.find((opSeq) => {
    const total = operands.reduce((result, operand, index) => {
      if (index === 0) {
        return operand;
      }
      return opSeq[index - 1](result, operand);
    });
    return equation.result === total;
  });

  return success != undefined;
}

/**
 *
 * @param {number} count
 * @param {Operator[]} operators
 * @returns {Operator[][]}
 */
export function getOperatorCombinations(count, operators) {
  if (count === 0) {
    return [];
  }
  if (count === 1) {
    return operators.map((op) => [op]);
  }

  /** @type {Operator[][]} */
  const ops = [];
  const nestedOps = getOperatorCombinations(count - 1, operators);

  operators.forEach((operator) => {
    nestedOps.forEach((nested) => {
      ops.push([operator, ...nested]);
    });
  });
  return ops;
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
  const equations = parseFile(file);
  const solvable = equations.filter((eq) => isSolvable(eq, [ADD, MUL]));
  return solvable.reduce((sum, equation) => sum + equation.result, 0);
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
  const equations = parseFile(file);
  const solvable = equations.filter((eq) => isSolvable(eq, [ADD, MUL, CONCAT]));
  return solvable.reduce((sum, equation) => sum + equation.result, 0);
}
