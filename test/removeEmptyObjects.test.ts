import { removeEmptyObjects } from "..";

describe("removeEmptyObjects", () => {
  it("should return the same primitive value", () => {
    expect(removeEmptyObjects(42)).toBe(42);
    expect(removeEmptyObjects("Hello")).toBe("Hello");
    expect(removeEmptyObjects(null)).toBe(null);
    expect(removeEmptyObjects(undefined)).toBe(undefined);
  });

  it("should remove empty objects from a nested object", () => {
    const input = {
      a: 1,
      b: {},
      c: {
        d: {},
        e: 2,
      },
    };

    const expectedOutput = {
      a: 1,
      c: {
        e: 2,
      },
    };

    expect(removeEmptyObjects(input)).toEqual(expectedOutput);
  });

  it("should not remove empty arrays from a nested object", () => {
    const input = {
      a: [],
      b: {
        c: [],
        d: {
          e: 1,
        },
      },
    };

    const expectedOutput = {
      a: [],
      b: {
        c: [],
        d: {
          e: 1,
        },
      },
    };

    expect(removeEmptyObjects(input)).toEqual(expectedOutput);
  });

  it("should remove empty objects and retain non-empty objects", () => {
    const input = {
      a: {},
      b: { c: 1 },
      d: { e: {}, f: 2 },
    };

    const expectedOutput = {
      b: { c: 1 },
      d: { f: 2 },
    };

    expect(removeEmptyObjects(input)).toEqual(expectedOutput);
  });

  it("should handle arrays of empty objects", () => {
    const input = [{}, { a: 1 }, {}, { b: {} }, 3];

    const expectedOutput = [{ a: 1 }, 3];

    expect(removeEmptyObjects(input)).toEqual(expectedOutput);
  });

  it("should handle mixed empty and non-empty objects in arrays", () => {
    const input = [{ a: 1 }, { b: {} }, { c: { d: {} } }, 2, []];

    const expectedOutput = [{ a: 1 }, 2, []];

    expect(removeEmptyObjects(input)).toEqual(expectedOutput);
  });

  it("should return undefined if the entire object is empty", () => {
    const input = { a: {}, b: {} };
    expect(removeEmptyObjects(input)).toBeUndefined();
  });

  it("should handle deeply nested empty objects", () => {
    const input = {
      a: {
        b: {
          c: {},
          d: { e: 1 },
        },
        f: {},
      },
      g: 2,
    };

    const expectedOutput = {
      a: {
        b: {
          d: { e: 1 },
        },
      },
      g: 2,
    };

    expect(removeEmptyObjects(input)).toEqual(expectedOutput);
  });

  it("should handle an empty object", () => {
    const input = {};
    expect(removeEmptyObjects(input)).toBeUndefined();
  });
});
