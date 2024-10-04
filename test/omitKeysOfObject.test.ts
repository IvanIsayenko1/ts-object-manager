import { omitKeysOfObject } from "..";

describe("omitKeysOfObject", () => {
  it("should return undefined if provided param is not object", () => {
    expect(omitKeysOfObject(1, [])).toBeUndefined();
  });

  it("should omit a single key from an object", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = omitKeysOfObject(obj, ["b"]);
    expect(result).toEqual({ a: 1, c: 3 });
  });

  it("should omit multiple keys from an object", () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 };
    const result = omitKeysOfObject(obj, ["b", "d"]);
    expect(result).toEqual({ a: 1, c: 3 });
  });

  it("should return the same object if no keys are provided", () => {
    const obj = { a: 1, b: 2 };
    const result = omitKeysOfObject(obj, []);
    expect(result).toEqual(obj);
  });

  it("should omit keys from a nested object", () => {
    const obj = { a: 1, b: { x: 10, y: 20 }, c: 3 };
    const result = omitKeysOfObject(obj, ["b"]);
    expect(result).toEqual({ a: 1, c: 3 });
  });

  it("should handle objects with array values", () => {
    const obj = { a: 1, b: [1, 2, 3], c: "test" };
    const result = omitKeysOfObject(obj, ["b"]);
    expect(result).toEqual({ a: 1, c: "test" });
  });

  it("should not modify the original object", () => {
    const obj = { a: 1, b: 2 };
    const result = omitKeysOfObject(obj, ["b"]);
    expect(result).toEqual({ a: 1 });
    expect(obj).toEqual({ a: 1, b: 2 }); // Original object unchanged
  });

  it("should omit all keys if all are passed", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = omitKeysOfObject(obj, ["a", "b", "c"]);
    expect(result).toEqual({});
  });

  it("should work with objects containing undefined or null values", () => {
    const obj = { a: 1, b: undefined, c: null };
    const result = omitKeysOfObject(obj, ["b", "c"]);
    expect(result).toEqual({ a: 1 });
  });

  it("should handle arrays as values, not objects", () => {
    const obj = { a: 1, b: [1, 2, 3] };
    const result = omitKeysOfObject(obj, ["b"]);
    expect(result).toEqual({ a: 1 });
  });
});
