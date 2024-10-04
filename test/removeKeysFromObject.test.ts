import { removeKeysFromObject } from "..";

describe("removeKeysFromObject", () => {
  it("should remove specified keys from an object", () => {
    const data = {
      name: "Alice",
      age: 30,
      location: {
        city: "Wonderland",
        country: "Fantasy",
      },
      hobbies: ["reading", "traveling"],
    };

    const cleanedData = removeKeysFromObject(data, ["age", "location"]);
    expect(cleanedData).toEqual({
      name: "Alice",
      hobbies: ["reading", "traveling"],
    });
  });

  it("should remove specified keys from an array of objects", () => {
    const arrayData = [
      { id: 1, value: "Item 1", toRemove: true },
      { id: 2, value: "Item 2", toRemove: false },
    ];

    const cleanedArray = removeKeysFromObject(arrayData, ["toRemove"]);
    expect(cleanedArray).toEqual([
      { id: 1, value: "Item 1" },
      { id: 2, value: "Item 2" },
    ]);
  });

  it("should return the same object if no keys match", () => {
    const data = {
      name: "Alice",
      age: 30,
      location: {
        city: "Wonderland",
        country: "Fantasy",
      },
    };

    const cleanedData = removeKeysFromObject(data, ["unknownKey"]);
    expect(cleanedData).toEqual(data);
  });

  it("should handle empty objects gracefully", () => {
    const emptyObject = {};
    const cleanedData = removeKeysFromObject(emptyObject, ["toRemove"]);
    expect(cleanedData).toEqual({});
  });

  it("should handle empty arrays gracefully", () => {
    const emptyArray: any[] = [];
    const cleanedArray = removeKeysFromObject(emptyArray, ["toRemove"]);
    expect(cleanedArray).toEqual([]);
  });

  it("should remove keys recursively from nested objects", () => {
    const nestedData = {
      user: {
        id: 1,
        name: "Alice",
        credentials: {
          password: "secret",
          token: "abc123",
        },
      },
      metadata: {
        created: "2024-01-01",
        updated: "2024-01-02",
      },
    };

    const cleanedData = removeKeysFromObject(nestedData, [
      "password",
      "updated",
    ]);
    expect(cleanedData).toEqual({
      user: {
        id: 1,
        name: "Alice",
        credentials: {
          token: "abc123",
        },
      },
      metadata: {
        created: "2024-01-01",
      },
    });
  });

  it("should handle non-object and non-array inputs gracefully", () => {
    expect(removeKeysFromObject(null, ["toRemove"])).toBeNull();
    expect(removeKeysFromObject(42, ["toRemove"])).toBe(42);
    expect(removeKeysFromObject("string", ["toRemove"])).toBe("string");
    expect(removeKeysFromObject(true, ["toRemove"])).toBe(true);
  });

  it("should handle nested arrays and remove specified keys", () => {
    const dataWithNestedArrays = [
      { id: 1, value: "Item 1", toRemove: true },
      {
        id: 2,
        value: "Item 2",
        details: { toRemove: false, description: "Second item" },
      },
    ];

    const cleanedData = removeKeysFromObject(dataWithNestedArrays, [
      "toRemove",
    ]);
    expect(cleanedData).toEqual([
      { id: 1, value: "Item 1" },
      { id: 2, value: "Item 2", details: { description: "Second item" } },
    ]);
  });

  it("should remove keys from deeply nested structures", () => {
    const deepData = {
      a: 1,
      b: {
        c: 2,
        d: {
          e: 3,
          f: undefined,
          g: { h: "removeMe" },
        },
      },
    };

    const cleanedData = removeKeysFromObject(deepData, ["g", "f"]);
    expect(cleanedData).toEqual({
      a: 1,
      b: {
        c: 2,
        d: {
          e: 3,
        },
      },
    });
  });
});
