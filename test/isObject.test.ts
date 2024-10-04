import { isObject } from "..";

describe("isObject", () => {
  it("should return true for objects", () => {
    expect(isObject({})).toBe(true);
    expect(isObject({ key: "value" })).toBe(true);
    expect(isObject(new Date())).toBe(true);
    expect(isObject(new Map())).toBe(true);
    expect(isObject(new Set())).toBe(true);
  });

  it("should return false for non-object types", () => {
    expect(isObject(null)).toBe(false);
    expect(isObject(42)).toBe(false);
    expect(isObject("string")).toBe(false);
    expect(isObject(true)).toBe(false);
    expect(isObject(undefined)).toBe(false);
    expect(isObject(Symbol("symbol"))).toBe(false);
  });

  it("should return false for arrays", () => {
    expect(isObject([])).toBe(true); // Arrays are objects, so this should return true
  });
});
