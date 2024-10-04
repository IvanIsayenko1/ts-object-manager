import { transformToFlattenObject } from "..";

describe("transformToFlattenObject", () => {
  it("should flatten a simple nested object", () => {
    const nestedObject = {
      name: "John",
      address: {
        city: "New York",
        zip: "10001",
      },
      contact: {
        email: "john@example.com",
        phone: {
          home: "123-456-7890",
          mobile: "987-654-3210",
        },
      },
    };

    const result = transformToFlattenObject(nestedObject);
    expect(result).toEqual({
      name: "John",
      "address.city": "New York",
      "address.zip": "10001",
      "contact.email": "john@example.com",
      "contact.phone.home": "123-456-7890",
      "contact.phone.mobile": "987-654-3210",
    });
  });

  it("should return the same object if it is already flat", () => {
    const flatObject = {
      a: 1,
      b: 2,
    };

    const result = transformToFlattenObject(flatObject);
    expect(result).toEqual({
      a: 1,
      b: 2,
    });
  });

  it("should handle an empty object", () => {
    const emptyObject = {};
    const result = transformToFlattenObject(emptyObject);
    expect(result).toEqual({});
  });

  it("should handle objects with arrays as values without flattening the arrays", () => {
    const objWithArray = {
      name: "John",
      hobbies: ["reading", "coding"],
      scores: {
        math: [100, 95],
        science: [90, 88],
      },
    };

    const result = transformToFlattenObject(objWithArray);
    expect(result).toEqual({
      name: "John",
      "hobbies.0": "reading",
      "hobbies.1": "coding",
      "scores.math.0": 100,
      "scores.math.1": 95,
      "scores.science.0": 90,
      "scores.science.1": 88,
    });
  });

  it("should handle nested objects with null values", () => {
    const nestedWithNull = {
      a: 1,
      b: {
        c: null,
        d: 2,
      },
    };

    const result = transformToFlattenObject(nestedWithNull);
    expect(result).toEqual({
      a: 1,
      "b.c": null,
      "b.d": 2,
    });
  });

  it("should return undefined for non-object inputs", () => {
    expect(transformToFlattenObject(null)).toBeUndefined();
    expect(transformToFlattenObject(123)).toBeUndefined();
    expect(transformToFlattenObject("string")).toBeUndefined();
  });

  it("should handle deep nesting", () => {
    const deeplyNestedObject = {
      a: {
        b: {
          c: {
            d: 4,
            e: 5,
          },
        },
      },
    };

    const result = transformToFlattenObject(deeplyNestedObject);
    expect(result).toEqual({
      "a.b.c.d": 4,
      "a.b.c.e": 5,
    });
  });

  it("should handle nested objects with undefined values", () => {
    const objectWithUndefined = {
      a: 1,
      b: {
        c: undefined,
        d: 2,
      },
    };

    const result = transformToFlattenObject(objectWithUndefined);
    expect(result).toEqual({
      a: 1,
      "b.c": undefined,
      "b.d": 2,
    });
  });

  it("should work with boolean and number values", () => {
    const obj = {
      isActive: true,
      details: {
        age: 25,
        verified: false,
      },
    };

    const result = transformToFlattenObject(obj);
    expect(result).toEqual({
      isActive: true,
      "details.age": 25,
      "details.verified": false,
    });
  });

  it("should handle special characters in keys", () => {
    const specialKeysObj = {
      "some@key": {
        "another/key": 10,
      },
    };

    const result = transformToFlattenObject(specialKeysObj);
    expect(result).toEqual({
      "some@key.another/key": 10,
    });
  });
});
