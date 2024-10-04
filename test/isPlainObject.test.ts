import { isPlainObject } from "..";

describe("isPlainObject", () => {
  it("should return true for plain objects", () => {
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject({ key: "value" })).toBe(true);
    expect(isPlainObject(Object.create(null))).toBe(true);
  });

  it("should return false for non-plain objects", () => {
    expect(isPlainObject(null)).toBe(false);
    expect(isPlainObject(42)).toBe(false);
    expect(isPlainObject("string")).toBe(false);
    expect(isPlainObject(true)).toBe(false);
    expect(isPlainObject(undefined)).toBe(false);
    expect(isPlainObject(Symbol("symbol"))).toBe(false);
  });

  it("should return false for array objects", () => {
    expect(isPlainObject([])).toBe(false);
    expect(isPlainObject([1, 2, 3])).toBe(false);
  });

  it("should return false for function objects", () => {
    expect(isPlainObject(function () {})).toBe(false);
    expect(isPlainObject(() => {})).toBe(false);
  });

  it("should return false for instances of classes", () => {
    class MyClass {}
    const instance = new MyClass();
    expect(isPlainObject(instance)).toBe(false);
  });

  it("should return false for Date objects", () => {
    expect(isPlainObject(new Date())).toBe(false);
  });

  it("should return false for other built-in objects", () => {
    expect(isPlainObject(new Map())).toBe(false);
    expect(isPlainObject(new Set())).toBe(false);
    expect(isPlainObject(new RegExp("abc"))).toBe(false);
  });
});
