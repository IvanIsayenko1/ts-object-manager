import { getNestedValueOfObject } from "..";

describe("getNestedValueOfObject", () => {
  it("should retrieve a value from a nested object", () => {
    const data = {
      user: {
        id: 1,
        profile: {
          name: "Alice",
          age: 28,
        },
      },
    };

    const result = getNestedValueOfObject(data, "user.profile.name");
    expect(result).toBe("Alice");
  });

  it("should return undefined for a non-existent nested path", () => {
    const data = {
      user: {
        id: 1,
        profile: {
          name: "Alice",
          age: 28,
        },
      },
    };

    const result = getNestedValueOfObject(data, "user.profile.email");
    expect(result).toBeUndefined();
  });

  it("should return undefined for a partially invalid path", () => {
    const data = {
      user: {
        id: 1,
      },
    };

    const result = getNestedValueOfObject(data, "user.profile.name");
    expect(result).toBeUndefined();
  });

  it("should return undefined if the object is null or undefined", () => {
    expect(getNestedValueOfObject(null, "some.path")).toBeUndefined();
    expect(getNestedValueOfObject(undefined, "some.path")).toBeUndefined();
  });

  it("should return undefined for an invalid path (empty string)", () => {
    const data = {
      user: {
        id: 1,
        profile: {
          name: "Alice",
        },
      },
    };

    const result = getNestedValueOfObject(data, "");
    expect(result).toBeUndefined();
  });

  it("should return undefined if the object is not an object (primitive)", () => {
    expect(getNestedValueOfObject(42, "some.path")).toBeUndefined();
    expect(getNestedValueOfObject("string", "some.path")).toBeUndefined();
    expect(getNestedValueOfObject(true, "some.path")).toBeUndefined();
  });

  it("should handle edge cases with array indexing", () => {
    const data = {
      users: [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
      ],
    };

    const result = getNestedValueOfObject(data, "users.1.name");
    expect(result).toBe("Bob");
  });

  it("should return undefined if accessing an out-of-bounds array index", () => {
    const data = {
      users: [{ id: 1, name: "Alice" }],
    };

    const result = getNestedValueOfObject(data, "users.2.name");
    expect(result).toBeUndefined();
  });

  it("should retrieve a value from the top level of the object", () => {
    const data = {
      id: 1,
      name: "Alice",
    };

    const result = getNestedValueOfObject(data, "name");
    expect(result).toBe("Alice");
  });
});
