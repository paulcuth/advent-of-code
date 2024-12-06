/*******************************************************************************
  Utils
 ******************************************************************************/

/**
 * Parses the file
 * @param {Buffer} file
 */
function parseFile(file) {
  /** @type {Object<string, string[]>} */
  const rules = {};
  /** @type {string[][]} */
  const orders = [];

  let section = 1;
  const lines = file.toString().split("\n");

  lines.forEach((line) => {
    if (line === "") {
      section = section + 1;
      return;
    }
    if (section === 1) {
      const [page, followingPage] = line.split("|");
      rules[page] = rules[page] ?? [];
      rules[page].push(followingPage);
    } else {
      orders.push(line.split(","));
    }
  });

  return { rules, orders };
}

/**
 * Checks that two pages are in order according to a rule set
 * @param {Object<string, string[]>} rules
 * @param {string} page1
 * @param {string} page2
 */
function isInOrder(rules, page1, page2) {
  const rulesPage2 = rules[page2] ?? [];

  const outOfOrder = rulesPage2.find((followingPage) => {
    if (followingPage === page1) {
      // || !isInOrder(rules, page1, followingPage)) {
      return true;
    }
  });

  return outOfOrder == undefined;
}

/**
 * Sorts pages by finding the first that is out of order, swapping it with the previous page and sorting again.
 * @param {Object<string, string[]>} rules
 * @param {string[]} pages
 * @returns {string[]} Sorted pages
 */
function sortPages(rules, pages) {
  const outOfOrderIndex = pages.findIndex((page, index) => {
    if (index === 0) {
      return false;
    }
    return !isInOrder(rules, pages[index - 1], page);
  });

  if (outOfOrderIndex >= 0) {
    const newPages = [...pages];
    const [p1, p2] = newPages.splice(outOfOrderIndex - 1, 2);
    newPages.splice(outOfOrderIndex - 1, 0, p2, p1);
    return sortPages(rules, newPages);
  }

  return pages;
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
  const { rules, orders } = parseFile(file);

  const correct = orders.filter((order) => {
    const outOfOrder = order.find((item, index) => {
      if (index === 0) {
        return false;
      }
      return !isInOrder(rules, order[index - 1], item);
    });
    return outOfOrder == undefined;
  });

  return correct.reduce((result, pages) => {
    const index = Math.floor(pages.length / 2);
    const value = Number(pages[index]);
    return result + value;
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
  const { rules, orders } = parseFile(file);

  const incorrect = orders.filter((order) => {
    const outOfOrder = order.find((item, index) => {
      if (index === 0) {
        return false;
      }
      return !isInOrder(rules, order[index - 1], item);
    });
    return outOfOrder != undefined;
  });

  return incorrect.reduce((result, pages) => {
    const sorted = sortPages(rules, pages);
    const index = Math.floor(sorted.length / 2);
    const value = Number(sorted[index]);
    return result + value;
  }, 0);
}
