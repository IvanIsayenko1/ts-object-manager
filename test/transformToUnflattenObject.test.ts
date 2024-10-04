import { transformToUnflattenObject } from "..";

describe("transformToUnflattenObject", () => {
  it("should unflatten a simple object with dot notation keys", () => {
    const flattenedObject = {
      name: "Alice",
      "address.city": "Wonderland",
      "address.zip": "12345",
      "contact.email": "alice@example.com",
      "contact.phone.home": "555-1234",
      "contact.phone.mobile": "555-5678",
    };

    const result = transformToUnflattenObject(flattenedObject);
    expect(result).toEqual({
      name: "Alice",
      address: {
        city: "Wonderland",
        zip: "12345",
      },
      contact: {
        email: "alice@example.com",
        phone: {
          home: "555-1234",
          mobile: "555-5678",
        },
      },
    });
  });

  it("should return the same object if no keys are nested", () => {
    const flatObject = {
      id: 1,
      name: "Bob",
    };

    const result = transformToUnflattenObject(flatObject);
    expect(result).toEqual({
      id: 1,
      name: "Bob",
    });
  });

  it("should handle an empty object", () => {
    const emptyObject = {};
    const result = transformToUnflattenObject(emptyObject);
    expect(result).toEqual({});
  });

  it("should handle deeply nested objects", () => {
    const deepFlattenedObject = {
      "person.name.first": "John",
      "person.name.last": "Doe",
      "person.address.street": "123 Main St",
      "person.address.city": "Metropolis",
      "person.address.country.code": "US",
      "person.address.country.name": "United States",
    };

    const result = transformToUnflattenObject(deepFlattenedObject);
    expect(result).toEqual({
      person: {
        name: {
          first: "John",
          last: "Doe",
        },
        address: {
          street: "123 Main St",
          city: "Metropolis",
          country: {
            code: "US",
            name: "United States",
          },
        },
      },
    });
  });

  it("should return undefined for non-object inputs", () => {
    expect(transformToUnflattenObject(null)).toBeUndefined();
    expect(transformToUnflattenObject(123)).toBeUndefined();
    expect(transformToUnflattenObject("string")).toBeUndefined();
  });

  it("should handle keys with special characters", () => {
    const specialCharObject = {
      "user@name": "Alice",
      "address.city/zip": "Wonderland-12345",
    };

    const result = transformToUnflattenObject(specialCharObject);
    expect(result).toEqual({
      "user@name": "Alice",
      address: {
        "city/zip": "Wonderland-12345",
      },
    });
  });

  it("should handle nested keys with undefined values", () => {
    const flattenedWithUndefined = {
      a: 1,
      "b.c": undefined,
      "b.d": 2,
    };

    const result = transformToUnflattenObject(flattenedWithUndefined);
    expect(result).toEqual({
      a: 1,
      b: {
        c: undefined,
        d: 2,
      },
    });
  });

  it("should handle boolean and number values correctly", () => {
    const flatObject = {
      isActive: true,
      "details.age": 30,
      "details.isVerified": false,
    };

    const result = transformToUnflattenObject(flatObject);
    expect(result).toEqual({
      isActive: true,
      details: {
        age: 30,
        isVerified: false,
      },
    });
  });

  it("should handle arrays inside objects", () => {
    const flattenedWithArray = {
      "user.name": "John",
      "user.hobbies": ["reading", "coding"],
      "user.scores.math": [100, 95],
    };

    const result = transformToUnflattenObject(flattenedWithArray);
    expect(result).toEqual({
      user: {
        name: "John",
        hobbies: ["reading", "coding"],
        scores: {
          math: [100, 95],
        },
      },
    });
  });

  it("should handle edge case where keys contain dots but not nested structure", () => {
    const flattenedWithDotKeys = {
      "filename.extension": "image.png",
      "user.name": "John",
    };

    const result = transformToUnflattenObject(flattenedWithDotKeys);
    expect(result).toEqual({
      filename: {
        extension: "image.png",
      },
      user: {
        name: "John",
      },
    });
  });
});
