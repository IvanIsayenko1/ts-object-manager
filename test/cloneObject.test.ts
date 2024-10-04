import { cloneObject } from "..";

describe("cloneObject", () => {
  it("should return a new object with the same properties", () => {
    const original = { a: 1, b: 2 };
    const cloned = cloneObject(original);
    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original); // Check if they are different references
  });

  it("should create a deep clone of a nested object", () => {
    const original = { a: 1, b: { c: 2 } };
    const cloned = cloneObject(original);
    expect(cloned).toEqual(original);
    expect(cloned.b).not.toBe(original.b); // Ensure nested object is a different reference
  });

  it("should clone an array", () => {
    const original = [1, 2, 3];
    const cloned = cloneObject(original);
    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original); // Check if they are different references
  });

  it("should create a deep clone of an array with nested objects", () => {
    const original = [{ a: 1 }, { b: 2 }];
    const cloned = cloneObject(original);
    expect(cloned).toEqual(original);
    expect(cloned[0]).not.toBe(original[0]); // Ensure nested object is a different reference
  });

  it("should return an empty object when cloning an empty object", () => {
    const original = {};
    const cloned = cloneObject(original);
    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
  });

  it("should handle arrays with mixed types", () => {
    const original = [1, "string", { a: 1 }, [1, 2]];
    const cloned = cloneObject(original);
    expect(cloned).toEqual(original);
    expect(cloned[2]).not.toBe(original[2]); // Ensure objects within the array are cloned
  });

  it("should handle cloning of primitive values", () => {
    const original = 42;
    const cloned = cloneObject(original);
    expect(cloned).toEqual(original);
    expect(cloned).toBe(original); // Primitives should be the same reference
  });

  it("should clone nested arrays inside objects", () => {
    const original = { a: [1, 2, 3], b: { c: [4, 5] } };
    const cloned = cloneObject(original);
    expect(cloned).toEqual(original);
    expect(cloned.a).not.toBe(original.a); // Ensure array is a different reference
    expect(cloned.b.c).not.toBe(original.b.c); // Ensure nested array is a different reference
  });

  it("should return an empty array when cloning an empty array", () => {
    const original: any[] = [];
    const cloned = cloneObject(original);
    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
  });

  it("should handle cloning objects with functions", () => {
    const original = { a: 1, b: () => 2 };
    const cloned = cloneObject(original);
    console.log(cloned);
    expect(cloned.b).toBe(original.b);
  });

  it("should handle circular references gracefully", () => {
    const original: any = {};
    original.self = original;
    const cloned = cloneObject(original);
    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original); // Should not be the same reference
  });
});
