/*******************************************************************************
  Tests
 ******************************************************************************/

describe("Grid", () => {
  it("loads cells from a buffer", async () => {
    const Grid = (await import("./Grid.mjs")).default;
    const grid = Grid.from(Buffer.from("123\n456\n789"));
    expect(grid.cells).toEqual([
      ["1", "2", "3"],
      ["4", "5", "6"],
      ["7", "8", "9"],
    ]);
  });

  it("returns cells", async () => {
    const Grid = (await import("./Grid.mjs")).default;
    const grid = Grid.from(Buffer.from("123\n456\n789"));

    expect(grid.getCell({ row: 0, col: 0 })).toEqual({
      row: 0,
      col: 0,
      value: "1",
    });
    expect(grid.getCell({ row: 1, col: 1 })).toEqual({
      row: 1,
      col: 1,
      value: "5",
    });
    expect(grid.getCell({ row: 2, col: 2 })).toEqual({
      row: 2,
      col: 2,
      value: "9",
    });
    expect(grid.getCell({ row: 3, col: 3 })).toBeUndefined();
  });

  it("returns neighbouring cells", async () => {
    const Grid = (await import("./Grid.mjs")).default;
    const grid = Grid.from(Buffer.from("123\n456\n789"));

    expect(grid.getNeighbouringCell({ row: 1, col: 1 }, "n")).toEqual({
      row: 0,
      col: 1,
      value: "2",
    });
    expect(grid.getNeighbouringCell({ row: 1, col: 1 }, "ne")).toEqual({
      row: 0,
      col: 2,
      value: "3",
    });
    expect(grid.getNeighbouringCell({ row: 1, col: 1 }, "e")).toEqual({
      row: 1,
      col: 2,
      value: "6",
    });
    expect(grid.getNeighbouringCell({ row: 1, col: 1 }, "se")).toEqual({
      row: 2,
      col: 2,
      value: "9",
    });
    expect(grid.getNeighbouringCell({ row: 1, col: 1 }, "s")).toEqual({
      row: 2,
      col: 1,
      value: "8",
    });
    expect(grid.getNeighbouringCell({ row: 1, col: 1 }, "sw")).toEqual({
      row: 2,
      col: 0,
      value: "7",
    });
    expect(grid.getNeighbouringCell({ row: 1, col: 1 }, "w")).toEqual({
      row: 1,
      col: 0,
      value: "4",
    });
    expect(grid.getNeighbouringCell({ row: 1, col: 1 }, "nw")).toEqual({
      row: 0,
      col: 0,
      value: "1",
    });

    expect(grid.getNeighbouringCell({ row: 0, col: 0 }, "sw")).toBeUndefined();
    expect(grid.getNeighbouringCell({ row: 0, col: 0 }, "w")).toBeUndefined();
    expect(grid.getNeighbouringCell({ row: 0, col: 0 }, "nw")).toBeUndefined();
    expect(grid.getNeighbouringCell({ row: 0, col: 0 }, "n")).toBeUndefined();
    expect(grid.getNeighbouringCell({ row: 2, col: 2 }, "ne")).toBeUndefined();
    expect(grid.getNeighbouringCell({ row: 2, col: 2 }, "e")).toBeUndefined();
    expect(grid.getNeighbouringCell({ row: 2, col: 2 }, "s")).toBeUndefined();
    expect(grid.getNeighbouringCell({ row: 2, col: 2 }, "sw")).toBeUndefined();
  });

  it("returns a line", async () => {
    const Grid = (await import("./Grid.mjs")).default;
    const grid = Grid.from(Buffer.from("123\n456\n789"));
    expect(grid.lineFrom({ row: 0, col: 0 }, "se", 2)).toEqual("15");

    expect(grid.lineFrom({ row: 0, col: 0 }, "se")).toEqual("159");
    expect(grid.lineFrom({ row: 0, col: 1 }, "s")).toEqual("258");
    expect(grid.lineFrom({ row: 0, col: 2 }, "sw")).toEqual("357");
    expect(grid.lineFrom({ row: 1, col: 2 }, "w")).toEqual("654");
    expect(grid.lineFrom({ row: 2, col: 2 }, "nw")).toEqual("951");
    expect(grid.lineFrom({ row: 2, col: 1 }, "n")).toEqual("852");
    expect(grid.lineFrom({ row: 2, col: 0 }, "ne")).toEqual("753");
    expect(grid.lineFrom({ row: 1, col: 0 }, "e")).toEqual("456");
  });

  it("loops over each cell", async () => {
    const Grid = (await import("./Grid.mjs")).default;
    const grid = Grid.from(Buffer.from("123\n456\n789"));

    /** @type {string[]} */
    const cells = [];
    grid.forEachCell((cell) => cells.push(cell.value));

    expect(cells.join("")).toEqual("123456789");
  });
});
