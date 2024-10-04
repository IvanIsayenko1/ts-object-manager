import { removeUndefinedKeys } from "..";

describe("deleteEmptyKeys", () => {
  it("should return the same primitive value", () => {
    expect(removeUndefinedKeys(42)).toBe(42);
    expect(removeUndefinedKeys("Hello")).toBe("Hello");
    expect(removeUndefinedKeys(null)).toBe(null);
    expect(removeUndefinedKeys(undefined)).toBe(undefined);
  });

  it("should remove keys with undefined values from an object", () => {
    const input = {
      a: 1,
      b: undefined,
      c: {
        d: undefined,
        e: 3,
      },
      f: [],
      g: null,
    };

    const expectedOutput = {
      a: 1,
      c: {
        e: 3,
      },
      f: [],
      g: null,
    };

    expect(removeUndefinedKeys(input)).toEqual(expectedOutput);
  });

  it("should remove keys with undefined values from an array of objects", () => {
    const input = [
      { id: 1, value: undefined },
      { id: 2, value: { name: "Test" } },
      { id: 3, value: null },
    ];

    const expectedOutput = [
      { id: 1 },
      { id: 2, value: { name: "Test" } },
      { id: 3, value: null },
    ];

    expect(removeUndefinedKeys(input)).toEqual(expectedOutput);
  });

  it("should handle nested objects with undefined values", () => {
    const input = {
      a: {
        b: {
          c: undefined,
          d: 4,
        },
        e: undefined,
      },
      f: 5,
    };

    const expectedOutput = {
      a: {
        b: {
          d: 4,
        },
      },
      f: 5,
    };

    expect(removeUndefinedKeys(input)).toEqual(expectedOutput);
  });

  it("should return an empty object if all keys are undefined", () => {
    const input = {
      a: undefined,
      b: {
        c: undefined,
        d: undefined,
      },
    };

    const expectedOutput = { b: {} };

    expect(removeUndefinedKeys(input)).toEqual(expectedOutput);
  });

  it("should handle arrays with mixed undefined and null values", () => {
    const input = [undefined, null, { a: undefined, b: 2 }, undefined];

    const expectedOutput = [null, { b: 2 }];

    expect(removeUndefinedKeys(input)).toEqual(expectedOutput);
  });

  it("should remove undefined values from deeply nested structures", () => {
    const input = {
      a: {
        b: {
          c: undefined,
          d: {
            e: undefined,
            f: 6,
          },
        },
      },
      g: undefined,
    };

    const expectedOutput = {
      a: {
        b: {
          d: {
            f: 6,
          },
        },
      },
    };

    expect(removeUndefinedKeys(input)).toEqual(expectedOutput);
  });

  it("should handle empty objects and arrays", () => {
    expect(removeUndefinedKeys({})).toEqual({});
    expect(removeUndefinedKeys([])).toEqual([]);
  });

  it("should retain properties that are null", () => {
    const input = {
      a: null,
      b: {
        c: undefined,
        d: null,
      },
      e: undefined,
    };

    const expectedOutput = {
      a: null,
      b: {
        d: null,
      },
    };

    expect(removeUndefinedKeys(input)).toEqual(expectedOutput);
  });

  it("should handle an object with no properties gracefully", () => {
    const input = {};
    expect(removeUndefinedKeys(input)).toEqual({});
  });
});
