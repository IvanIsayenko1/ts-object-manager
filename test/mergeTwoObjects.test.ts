import { mergeTwoObjects } from "..";

describe("mergeTwoObjects", () => {
  it("should merge two simple objects", () => {
    const object1 = { a: 1, b: 2 };
    const object2 = { b: 3, c: 4 };

    const merged = mergeTwoObjects(object1, object2);
    expect(merged).toEqual({ a: 1, b: 3, c: 4 });
  });

  it("should merge nested objects recursively", () => {
    const object1 = {
      a: 1,
      b: {
        c: 2,
        d: 3,
      },
    };

    const object2 = {
      b: {
        d: 4,
        e: 5,
      },
      f: 6,
    };

    const merged = mergeTwoObjects(object1, object2);
    expect(merged).toEqual({ a: 1, b: { c: 2, d: 4, e: 5 }, f: 6 });
  });

  it("should merge deeply nested objects", () => {
    const objA = { x: 10, y: { z: 20, w: { m: 30 } } };
    const objB = { y: { w: { n: 40 }, a: 30 } };

    const result = mergeTwoObjects(objA, objB);
    expect(result).toEqual({
      x: 10,
      y: {
        z: 20,
        w: { m: 30, n: 40 },
        a: 30,
      },
    });
  });

  it("should prioritize properties from the second object", () => {
    const objA = { a: 1, b: 2 };
    const objB = { b: 3, c: 4 };

    const result = mergeTwoObjects(objA, objB);
    expect(result).toEqual({ a: 1, b: 3, c: 4 });
  });

  it("should keep properties from the first object if not present in the second", () => {
    const objA = { a: 1, b: 2 };
    const objB = { c: 4 };

    const result = mergeTwoObjects(objA, objB);
    expect(result).toEqual({ a: 1, b: 2, c: 4 });
  });

  it("should merge objects with conflicting keys where the value is an object", () => {
    const objA = { a: 1, b: { c: 2 } };
    const objB = { b: { d: 3 } };

    const result = mergeTwoObjects(objA, objB);
    expect(result).toEqual({ a: 1, b: { c: 2, d: 3 } });
  });

  it("should handle empty objects correctly", () => {
    const objA = {};
    const objB = { a: 1, b: 2 };

    const result = mergeTwoObjects(objA, objB);
    expect(result).toEqual({ a: 1, b: 2 });

    const result2 = mergeTwoObjects(objB, objA);
    expect(result2).toEqual({ a: 1, b: 2 });
  });

  it("should handle nested arrays inside objects correctly", () => {
    const objA = { a: 1, b: [2, 3] };
    const objB = { b: [4, 5], c: 6 };

    const result = mergeTwoObjects(objA, objB);
    expect(result).toEqual({ a: 1, b: [2, 3, 4, 5], c: 6 });
  });
});
