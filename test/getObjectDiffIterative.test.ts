import { getObjectDiffIterative } from "..";

describe("getObjectDiffIterative", () => {
  it("should return undefined if provided objects are null", () => {
    expect(getObjectDiffIterative(null, null)).toBeUndefined();
  });

  it("should return first object if the second is null", () => {
    const objA = { a: 1, b: 2 };
    expect(getObjectDiffIterative(objA, null)).toEqual(objA);
  });

  it("should return an empty object for identical objects", () => {
    const objA = { a: 1, b: 2 };
    const objB = { a: 1, b: 2 };
    expect(getObjectDiffIterative(objA, objB)).toEqual({});
  });

  it("should return added properties", () => {
    const objA = { a: 1 };
    const objB = { a: 1, b: 2 };
    expect(getObjectDiffIterative(objA, objB)).toEqual({ b: 2 });
  });

  it("should return removed properties", () => {
    const objA = { a: 1, b: 2 };
    const objB = { a: 1 };
    expect(getObjectDiffIterative(objA, objB)).toEqual({ b: undefined });
  });

  it("should return modified properties", () => {
    const objA = { a: 1, b: 2 };
    const objB = { a: 1, b: 3 };
    expect(getObjectDiffIterative(objA, objB)).toEqual({ b: 3 });
  });

  it("should return nested property changes", () => {
    const objA = { a: 1, b: { c: 1 } };
    const objB = { a: 1, b: { c: 2 } };
    expect(getObjectDiffIterative(objA, objB)).toEqual({ b: { c: 2 } });
  });

  it("should return added nested properties", () => {
    const objA = { a: 1, b: { c: 1 } };
    const objB = { a: 1, b: { c: 1, d: 2 } };
    expect(getObjectDiffIterative(objA, objB)).toEqual({ b: { d: 2 } });
  });

  it("should return removed nested properties", () => {
    const objA = { a: 1, b: { c: 1, d: 2 } };
    const objB = { a: 1, b: { c: 1 } };
    expect(getObjectDiffIterative(objA, objB)).toEqual({ b: { d: undefined } });
  });

  it("should handle deep nested objects", () => {
    const objA = { a: 1, b: { c: { d: 1 } } };
    const objB = { a: 1, b: { c: { d: 2 } } };
    expect(getObjectDiffIterative(objA, objB)).toEqual({ b: { c: { d: 2 } } });
  });

  it("should return an empty object when both objects are empty", () => {
    const objA = {};
    const objB = {};
    expect(getObjectDiffIterative(objA, objB)).toEqual({});
  });

  it("should handle non-object values", () => {
    const objA = { a: 1, b: "string" };
    const objB = { a: 1, b: 2 };
    expect(getObjectDiffIterative(objA, objB)).toEqual({ b: 2 });
  });

  it("should return true if one object is null and the other is an empty object", () => {
    const objA = null;
    const objB = {};
    expect(getObjectDiffIterative(objA, objB)).toEqual({});
  });

  it("should handle circular references gracefully", () => {
    const objA: any = {};
    const objB: any = {};
    objA.self = objA;
    objB.self = objB;
    expect(getObjectDiffIterative(objA, objB)).toEqual({});
  });
});
