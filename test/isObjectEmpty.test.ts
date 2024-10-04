import { isObjectEmpty } from "..";

describe("isObjectEmpty", () => {
  it("should return true for an empty object", () => {
    const obj = {};
    expect(isObjectEmpty(obj)).toBe(true);
  });

  it("should return false for an object with properties", () => {
    const obj = { a: 1, b: 2 };
    expect(isObjectEmpty(obj)).toBe(false);
  });

  it("should return false for a non object", () => {
    expect(isObjectEmpty(1)).toBe(false);
  });

  it("should return false for an object with a nested non-empty object", () => {
    const obj = { a: { b: 1 } };
    expect(isObjectEmpty(obj)).toBe(false);
  });

  it("should return true for an object with properties that are themselves empty objects", () => {
    const obj = { a: {}, b: {} };
    expect(isObjectEmpty(obj)).toBe(false);
  });

  it("should return false for an object with an empty array", () => {
    const obj = { a: [] };
    expect(isObjectEmpty(obj)).toBe(false);
  });

  it("should return true for an object with no properties defined", () => {
    const obj = Object.create(null);
    expect(isObjectEmpty(obj)).toBe(true);
  });

  it("should return false for an object with a function property", () => {
    const obj = { a: () => {} };
    expect(isObjectEmpty(obj)).toBe(false);
  });
});
