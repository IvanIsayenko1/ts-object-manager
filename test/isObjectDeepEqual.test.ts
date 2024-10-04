import { isObjectDeepEqual } from "..";

describe("isObjectDeepEqual", () => {
  it("should return true for identical objects", () => {
    const objA = { a: 1, b: { c: 2 } };
    const objB = { a: 1, b: { c: 2 } };
    expect(isObjectDeepEqual(objA, objB)).toBe(true);
  });

  it("should return false for objects with different properties", () => {
    const objA = { a: 1, b: { c: 2 } };
    const objC = { a: 1, b: { c: 3 } };
    expect(isObjectDeepEqual(objA, objC)).toBe(false);
  });

  it("should return false for objects with different length", () => {
    const objA = { a: 1, b: { c: 2 } };
    const objC = { a: 1, b: { c: 3 }, d: 4 };
    expect(isObjectDeepEqual(objA, objC)).toBe(false);
  });

  it("should return true for identical arrays", () => {
    expect(isObjectDeepEqual([1, 2, 3], [1, 2, 3])).toBe(true);
  });

  it("should return false for arrays of different lengths", () => {
    expect(isObjectDeepEqual([1, 2, 3], [1, 2])).toBe(false);
  });

  it("should return false for arrays with different elements", () => {
    expect(isObjectDeepEqual([1, 2, 3], [3, 2, 1])).toBe(false);
  });

  it("should return false for identical objects with different key order", () => {
    const objA = { a: 1, b: 2 };
    const objB = { b: 2, a: 1 };
    expect(isObjectDeepEqual(objA, objB)).toBe(true);
  });

  it("should return false for deeply unequal nested objects", () => {
    const obj1 = { a: { b: { c: 1 } } };
    const obj2 = { a: { b: { c: 2 } } };
    expect(isObjectDeepEqual(obj1, obj2)).toBe(false);
  });

  it("should return false for comparing an object with null", () => {
    const obj = { a: 1 };
    expect(isObjectDeepEqual(obj, null)).toBe(false);
  });

  it("should return false for comparing an object with undefined", () => {
    const obj = { a: 1 };
    expect(isObjectDeepEqual(obj, undefined)).toBe(false);
  });

  it("should return false for different types like object and array", () => {
    expect(isObjectDeepEqual({}, [])).toBe(false);
  });
});
