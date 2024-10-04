import { getAllObjectKeys } from "..";

describe("getAllObjectKeys", () => {
  it("should return keys from a flat object", () => {
    const obj = { a: 1, b: 2 };
    const result = getAllObjectKeys(obj);
    expect(result).toEqual(["a", "b"]);
  });

  it("should return keys from a nested object", () => {
    const obj = { a: { b: { c: 1 } }, d: 2 };
    const result = getAllObjectKeys(obj);
    expect(result).toEqual(["a.b.c", "d"]);
  });

  it("should return keys from a more complex nested object", () => {
    const obj = { a: { b: { c: 1, d: 2 } }, e: 3, f: { g: { h: 4 } } };
    const result = getAllObjectKeys(obj);
    expect(result).toEqual(["a.b.c", "a.b.d", "e", "f.g.h"]);
  });

  it("should include keys from arrays", () => {
    const obj = { a: [1, 2, 3], b: { c: 4 } };
    const result = getAllObjectKeys(obj);
    expect(result).toEqual(["a", "b.c"]);
  });

  it("should return keys from an empty object", () => {
    const obj = {};
    const result = getAllObjectKeys(obj);
    expect(result).toEqual([]);
  });

  it("should return keys from an object with various data types", () => {
    const obj = {
      a: "string",
      b: 42,
      c: true,
      d: null,
      e: { f: "nested" },
    };
    const result = getAllObjectKeys(obj);
    expect(result).toEqual(["a", "b", "c", "d", "e.f"]);
  });

  it("should return keys from a deeply nested object", () => {
    const obj = {
      a: {
        b: {
          c: {
            d: {
              e: 5,
            },
          },
        },
      },
    };
    const result = getAllObjectKeys(obj);
    expect(result).toEqual(["a.b.c.d.e"]);
  });

  it("should handle an object with an empty nested object", () => {
    const obj = { a: {}, b: 1 };
    const result = getAllObjectKeys(obj);
    expect(result).toEqual(["b"]); // No keys from the empty object
  });

  it("should handle nested arrays including their indices", () => {
    const obj = { a: { b: [1, 2, 3], c: { d: 4 } } };
    const result = getAllObjectKeys(obj);
    expect(result).toEqual(["a.b", "a.c.d"]); // Only nested object keys should be included
  });

  // Test case for circular references (if applicable)
  it("should handle circular references gracefully (without infinite loops)", () => {
    const obj: any = {};
    obj.self = obj;
    const result = getAllObjectKeys(obj);
    expect(result).toEqual([]); // Should correctly identify the circular reference key
  });
});
