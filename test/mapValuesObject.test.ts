import { mapValuesObject } from "..";

describe("mapValuesObject", () => {
  it("should apply the mapping function to all values of the object", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = mapValuesObject(obj, (value) => value * 2);
    expect(result).toEqual({ a: 2, b: 4, c: 6 });
  });

  it("should return undefined if the input is not an object", () => {
    expect(
      mapValuesObject(42 as any, (value: any) => value * 2)
    ).toBeUndefined();
    expect(
      mapValuesObject(null as any, (value: any) => value * 2)
    ).toBeUndefined();
    expect(
      mapValuesObject(undefined as any, (value: any) => value * 2)
    ).toBeUndefined();
    expect(
      mapValuesObject("string" as any, (value: any) => value * 2)
    ).toBeUndefined();
  });

  it("should handle an empty object", () => {
    const obj = {};
    const result = mapValuesObject(obj, (value: any) => value * 2);
    expect(result).toEqual({});
  });

  it("should work with different data types in the object", () => {
    const obj = { a: 1, b: true, c: "hello" };

    // Mapping values to their type
    const result = mapValuesObject(obj, (value) => typeof value);
    expect(result).toEqual({ a: "number", b: "boolean", c: "string" });
  });

  it("should handle functions as values", () => {
    const obj = { a: () => 1, b: () => 2 };

    const result = mapValuesObject(obj, (fn) => fn() * 10);
    expect(result).toEqual({ a: 10, b: 20 });
  });

  it("should apply the mapping function to nested objects as values", () => {
    const obj = {
      a: { nested: 1 },
      b: { nested: 2 },
    };

    const result = mapValuesObject(obj, (value) => value.nested * 3);
    expect(result).toEqual({ a: 3, b: 6 });
  });

  it("should work with arrays as values", () => {
    const obj = {
      a: [1, 2, 3],
      b: [4, 5, 6],
    };

    const result = mapValuesObject(obj, (arr) => arr.map((x) => x * 2));
    expect(result).toEqual({
      a: [2, 4, 6],
      b: [8, 10, 12],
    });
  });
});
