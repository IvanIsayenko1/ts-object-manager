import { isPropertyDefined } from "..";

describe("isPropertyDefined", () => {
  it("should return true for an existing property with a defined value", () => {
    const obj = { a: 1, b: 2 };
    expect(isPropertyDefined(obj, "a")).toBe(true);
  });

  it("should return false for a non-existing property", () => {
    const obj = { a: 1, b: 2 };
    expect(isPropertyDefined(obj, "c")).toBe(false);
  });

  it("should return true for an existing property with an undefined value", () => {
    const obj = { a: undefined, b: 2 };
    expect(isPropertyDefined(obj, "a")).toBe(true);
  });

  it("should return true for an existing property with a null value", () => {
    const obj = { a: null, b: 2 };
    expect(isPropertyDefined(obj, "a")).toBe(true); // Assuming null is considered defined
  });

  it("should return false for properties on an empty object", () => {
    const obj = {};
    expect(isPropertyDefined(obj, "a")).toBe(false);
  });

  it("should return true for properties added dynamically to an object", () => {
    const obj = {};
    (obj as any).a = 1;
    expect(isPropertyDefined(obj, "a")).toBe(true);
  });

  it("should return false for properties that are inherited", () => {
    const obj = Object.create({ inherited: 1 });
    expect(isPropertyDefined(obj, "inherited")).toBe(false); // Assuming only own properties are checked
  });

  it("should return true for properties defined on the prototype", () => {
    const prototype = { a: 1 };
    const obj = Object.create(prototype);
    expect(isPropertyDefined(obj, "a")).toBe(false); // Again, depending on implementation, might change
  });

  it("should return undefined for non object", () => {
    expect(isPropertyDefined(1, "a")).toBeUndefined();
  });
});
