import { deepFreezeObject } from "..";

describe("deepFreezeObject", () => {
  it("should deeply freeze a simple object", () => {
    const obj = { a: 1, b: 2 };
    const frozenObj = deepFreezeObject(obj);

    expect(Object.isFrozen(frozenObj)).toBe(true);
    if (frozenObj)
      expect(() => {
        // Attempting to modify should throw an error in strict mode
        // If strict mode is not on, this line will silently fail.
        frozenObj.a = 10;
      }).toThrowError(TypeError);
  });

  it("should deeply freeze nested objects", () => {
    const obj = { a: 1, b: { c: 2, d: { e: 3 } } };
    const frozenObj = deepFreezeObject(obj);

    // Ensure the root object is frozen
    expect(Object.isFrozen(frozenObj)).toBe(true);

    if (frozenObj) {
      // Ensure nested objects are frozen
      expect(Object.isFrozen(frozenObj.b)).toBe(true);
      expect(Object.isFrozen(frozenObj.b.d)).toBe(true);

      expect(() => {
        frozenObj.b.c = 10;
      }).toThrowError(TypeError);

      expect(() => {
        frozenObj.b.d.e = 20;
      }).toThrowError(TypeError);
    }
  });

  it("should return undefined for non-object inputs", () => {
    expect(deepFreezeObject(42)).toBeUndefined();
    expect(deepFreezeObject("string")).toBeUndefined();
    expect(deepFreezeObject(null)).toBeUndefined();
    expect(deepFreezeObject(undefined)).toBeUndefined();
    expect(deepFreezeObject(true)).toBeUndefined();
  });

  it("should freeze arrays as well", () => {
    const arr = [1, 2, { a: 3 }];
    const frozenArr = deepFreezeObject(arr);

    // Ensure the array itself is frozen
    expect(Object.isFrozen(frozenArr)).toBe(true);

    if (frozenArr) {
      expect(Object.isFrozen(frozenArr[2])).toBe(true);

      expect(() => {
        frozenArr[0] = 100;
      }).toThrowError(TypeError);
    }
  });

  it("should handle objects with functions correctly", () => {
    const obj = {
      a: 1,
      b: function () {
        return "hello";
      },
    };

    const frozenObj = deepFreezeObject(obj);

    expect(Object.isFrozen(frozenObj)).toBe(true);
    if (frozenObj) {
      expect(() => {
        frozenObj.a = 10;
      }).toThrowError(TypeError);

      expect(typeof frozenObj.b).toBe("function");
      expect(frozenObj.b()).toBe("hello");
    }
  });

  it("should freeze objects with special keys", () => {
    const obj = { "user.name": "Alice", age: 30 };
    const frozenObj = deepFreezeObject(obj);

    expect(Object.isFrozen(frozenObj)).toBe(true);
    if (frozenObj)
      expect(() => {
        frozenObj["user.name"] = "Bob";
      }).toThrowError(TypeError);
  });

  it("should handle empty objects", () => {
    const obj = {};
    const frozenObj = deepFreezeObject(obj);

    expect(Object.isFrozen(frozenObj)).toBe(true);
    expect(frozenObj).toEqual({});
  });
});
