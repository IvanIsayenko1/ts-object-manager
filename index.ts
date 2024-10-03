/**
 * Checks if the given value is an object.
 *
 * This function returns true if the value is of type 'object'
 * and is not null. This includes arrays and plain objects, but
 * excludes other types such as null, strings, numbers, etc.
 *
 * @param {T} obj - The value to be checked.
 * @returns {boolean} True if the value is an object, false otherwise.
 * @example
 * console.log(isObject({})); // true
 * console.log(isObject(null)); // false
 * console.log(isObject([])); // true
 * console.log(isObject(42)); // false
 */
export const isObject = <T>(obj: T): boolean =>
  typeof obj === "object" && obj !== null;

/**
 * Checks if the given value is a plain object.
 *
 * A plain object is an object created by the `Object` constructor
 * or one that inherits from `Object.prototype`. This function
 * first checks if the value is an object and then verifies its
 * prototype.
 *
 * @param {T} obj - The value to be checked.
 * @returns {boolean} True if the value is a plain object, false otherwise.
 * @example
 * console.log(isPlainObject({})); // true
 * console.log(isPlainObject(new Date())); // false
 * console.log(isPlainObject([])); // false
 * console.log(isPlainObject(Object.create(null))); // true
 */
export const isPlainObject = <T>(obj: T): boolean =>
  isObject(obj) && Object.getPrototypeOf(obj) === Object.prototype;

/**
 * Checks if the given object is empty.
 *
 * An object is considered empty if it has no own properties.
 * This function first checks if the value is an object and then
 * iterates over its keys to determine if there are any own
 * properties present.
 *
 * @param {T} obj - The object to be checked.
 * @returns {boolean} True if the object is empty, false otherwise.
 * @example
 * console.log(isObjectEmpty({})); // true
 * console.log(isObjectEmpty({ a: 1 })); // false
 * console.log(isObjectEmpty(null)); // false
 * console.log(isObjectEmpty([])); // true
 * console.log(isObjectEmpty({ a: undefined })); // false
 */
export const isObjectEmpty = <T>(obj: T): boolean => {
  if (!isObject(obj)) {
    return false;
  }

  for (const key in obj) {
    if ((obj as Object).hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
};

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * This function recursively checks for deep equality of objects and arrays.
 * It compares their keys and elements, ensuring they exist and are equal
 * in both structures. Primitives are compared using strict equality.
 *
 * @param {T} obj1 - The first value to compare.
 * @param {T} obj2 - The second value to compare.
 * @returns {boolean} True if the values are deeply equal, false otherwise.
 * @example
 * const objA = { a: 1, b: { c: 2 } };
 * const objB = { a: 1, b: { c: 2 } };
 * console.log(isObjectDeepEqual(objA, objB)); // true
 *
 * const objC = { a: 1, b: { c: 3 } };
 * console.log(isObjectDeepEqual(objA, objC)); // false
 *
 * console.log(isObjectDeepEqual([1, 2, 3], [1, 2, 3])); // true
 * console.log(isObjectDeepEqual([1, 2, 3], [1, 2])); // false
 */
export const isObjectDeepEqual = <T>(obj1: T, obj2: T): boolean => {
  if (typeof obj1 !== typeof obj2) {
    return false;
  }

  if (
    typeof obj1 === "object" &&
    typeof obj2 === "object" &&
    obj1 !== null &&
    obj2 !== null
  ) {
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
      if (obj1.length !== obj2.length) {
        return false;
      }
      for (let i = 0; i < obj1.length; i++) {
        if (!isObjectDeepEqual(obj1[i], obj2[i])) {
          return false;
        }
      }
      return true;
    } else {
      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);
      if (keys1.length !== keys2.length) {
        return false;
      }
      for (const key of keys1) {
        if (!isObjectDeepEqual((obj1 as any)[key], (obj2 as any)[key])) {
          return false;
        }
      }
      return true;
    }
  } else {
    return obj1 === obj2;
  }
};

/**
 * Checks if a property is defined on an object or any of its nested objects.
 *
 * @template T - Type of the object.
 * @param {T} obj - The object to check for the property.
 * @param {string} prop - The property name to check.
 * @returns {boolean | undefined} - Returns true if the property exists, false if it does not exist, or undefined if the input is not an object.
 *
 * @example
 * const sample = { a: 1, b: { c: 2 } };
 * console.log(isPropertyDefined(sample, 'a')); // true
 * console.log(isPropertyDefined(sample, 'b')); // true
 * console.log(isPropertyDefined(sample, 'c')); // false
 * console.log(isPropertyDefined(sample, 'b.c')); // true
 */
export const isPropertyDefined = <T>(
  obj: T,
  prop: string
): boolean | undefined => {
  if (!isObject(obj)) {
    return undefined;
  }

  let current: any = obj;
  const keys = prop.split(".");
  for (const key of keys) {
    if (current && Object.prototype.hasOwnProperty.call(current, key)) {
      current = current[key];
    } else {
      return false;
    }
  }

  return true;
};

/**
 * Creates a deep clone of the given object.
 *
 * This function utilizes JSON serialization to create a deep copy of the
 * input object. Be aware that this method does not work with functions,
 * undefined, or symbols. It is suitable for simple objects and arrays.
 *
 * @param {T} obj - The object to be cloned.
 * @returns {T} A deep clone of the input object.
 * @example
 * const original = { a: 1, b: { c: 2 } };
 * const cloned = cloneObject(original);
 * console.log(cloned); // { a: 1, b: { c: 2 } }
 * console.log(cloned === original); // false
 * console.log(cloned.b === original.b); // false
 */
export const cloneObject = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj)) as T;
};
/**
 * Compares two objects or arrays iteratively and returns the differences between them.
 * If the objects are not of the same type, it assigns `obj2` to the corresponding key.
 * For arrays, if their lengths differ, it assigns `obj2` to the corresponding key.
 * For objects, if the keys count differs, it assigns `obj2` to the corresponding key.
 *
 * @param {T} obj1 - The first object or array to compare.
 * @param {T} obj2 - The second object or array to compare.
 * @returns {any | undefined} - An object or array representing the differences,
 *                              or `undefined` if there are no differences.
 * @example
 * const objA = { a: 1, b: { c: 2 } };
 * const objB = { a: 1, b: { c: 3 } };
 * const diff = getObjectDiffIterative(objA, objB);
 * console.log(diff); // { b: { c: 3 } }
 *
 * const arrA = [1, 2, 3];
 * const arrB = [1, 2, 4];
 * const diff = getObjectDiffIterative(arrA, arrB);
 * console.log(diff); // [3, 4]
 */
export const getObjectDiffIterative = (obj1: any, obj2: any): any => {
  const stack: Array<{ obj1: any; obj2: any; diff: any; key?: string }> = [
    { obj1, obj2, diff: {} },
  ];

  while (stack.length > 0) {
    const { obj1, obj2, diff, key } = stack.pop()!;

    if (typeof obj1 !== typeof obj2) {
      if (key) diff[key] = obj2;
    } else if (typeof obj1 === "object" && obj1 !== null) {
      if (Array.isArray(obj1)) {
        if (obj1.length !== obj2.length) {
          if (key) diff[key] = obj2;
        } else {
          const newArrayDiff: any[] = [];
          for (let i = 0; i < obj1.length; i++) {
            stack.push({ obj1: obj1[i], obj2: obj2[i], diff: newArrayDiff });
          }
          if (key && newArrayDiff.length > 0) diff[key] = newArrayDiff;
        }
      } else {
        const newObjDiff: { [key: string]: any } = {};
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
        if (keys1.length !== keys2.length) {
          if (key) diff[key] = obj2;
        } else {
          for (const propKey of keys1) {
            stack.push({
              obj1: obj1[propKey],
              obj2: obj2[propKey],
              diff: newObjDiff,
              key: propKey,
            });
          }
          if (key && Object.keys(newObjDiff).length > 0) diff[key] = newObjDiff;
        }
      }
    } else {
      if (obj1 !== obj2 && key) {
        diff[key] = obj2;
      }
    }
  }

  return Object.keys(stack[0]?.diff || {}).length > 0
    ? stack[0].diff
    : undefined;
};

/**
 * Recursively retrieves all keys of a given object, including keys from nested objects.
 *
 * @template T - The type of the input object.
 * @param {T} obj - The object from which to retrieve the keys.
 * @param {string} [parentKey=""] - The prefix for nested keys, defaults to an empty string.
 * @returns {string[]} An array of strings representing all the keys of the object, including nested keys.
 * @example
 * const obj = {
 *   name: 'Alice',
 *   details: {
 *     age: 30,
 *     city: 'Wonderland'
 *   },
 *   hobbies: ['reading', 'jogging']
 * };
 *
 * const keys = getAllObjectKeys(obj);
 * console.log(keys);
 * // Output: ["name", "details.age", "details.city", "hobbies"]
 */
export const getAllObjectKeys = <T>(
  obj: T,
  parentKey: string = ""
): string[] => {
  let keys: string[] = [];

  // Check if the input is a plain object
  const isObject = (value: any): value is Record<string, any> =>
    value !== null && typeof value === "object" && !Array.isArray(value);

  if (isObject(obj)) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const fullKey = parentKey ? `${parentKey}.${key}` : key;

        // Use the isObject function to determine if obj[key] is a plain object
        if (isObject(obj[key])) {
          keys = keys.concat(getAllObjectKeys(obj[key], fullKey)); // Recursively fetch keys from nested objects
        } else {
          keys.push(fullKey); // Push the key if it's not an object
        }
      }
    }
  }

  return keys; // Return the accumulated keys
};

/**
 * Recursively removes empty objects and undefined values from an object or array.
 *
 * @param {T} obj - The object or array to clean from empty objects.
 * @returns {any} - A new object or array with empty objects removed, or `undefined`
 *                  if the resulting object has no keys.
 *
 * @example
 * const data = {
 *   a: {
 *     b: {},
 *     c: 1,
 *   },
 *   d: [],
 *   e: {
 *     f: {
 *       g: {}
 *     }
 *   },
 *   h: null,
 * };
 *
 * const cleanedData = removeEmptyObjects(data);
 * console.log(cleanedData);
 * // Output: { a: { c: 1 }, d: [], h: null }
 *
 * @example
 * const arrayData = [
 *   { id: 1, value: {} },
 *   { id: 2, value: { name: "Test" } },
 *   {},
 * ];
 *
 * const cleanedArray = removeEmptyObjects(arrayData);
 * console.log(cleanedArray);
 * // Output: [ { id: 2, value: { name: "Test" } } ]
 */
export const removeEmptyObjects = <T>(obj: T): any => {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(removeEmptyObjects).filter((item) => item !== undefined);
  }

  const newObj: any = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = removeEmptyObjects(obj[key]);

      if (value !== undefined) {
        newObj[key] = value;
      }
    }
  }

  return Object.keys(newObj).length > 0 ? newObj : undefined;
};

/**
 * Recursively removes keys with undefined values from an object or array.
 *
 * @param {T} obj - The object or array from which to delete empty keys.
 * @returns {any} - A new object or array with empty keys removed.
 *
 * @example
 * const data = {
 *   a: 1,
 *   b: undefined,
 *   c: {
 *     d: undefined,
 *     e: 3,
 *   },
 *   f: [],
 *   g: null,
 * };
 *
 * const cleanedData = deleteEmptyKeys(data);
 * console.log(cleanedData);
 * // Output: { a: 1, c: { e: 3 }, f: [], g: null }
 *
 * @example
 * const arrayData = [
 *   { id: 1, value: undefined },
 *   { id: 2, value: { name: "Test" } },
 *   { id: 3, value: null },
 * ];
 *
 * const cleanedArray = deleteEmptyKeys(arrayData);
 * console.log(cleanedArray);
 * // Output: [ { id: 2, value: { name: "Test" } }, { id: 3, value: null } ]
 */
export const deleteEmptyKeys = <T>(obj: T): any => {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(deleteEmptyKeys);
  }

  const newObj: any = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = deleteEmptyKeys(obj[key]);

      if (value !== undefined) {
        newObj[key] = value;
      }
    }
  }

  return newObj;
};

/**
 * Recursively removes specified keys from an object or array.
 *
 * @param {T} obj - The object or array from which to remove keys.
 * @param {string[]} keysToRemove - An array of keys to be removed from the object.
 * @returns {any} - A new object or array with the specified keys removed.
 *
 * @example
 * const data = {
 *   name: "Alice",
 *   age: 30,
 *   location: {
 *     city: "Wonderland",
 *     country: "Fantasy"
 *   },
 *   hobbies: ["reading", "traveling"],
 * };
 *
 * const cleanedData = removeKeysFromObject(data, ["age", "location"]);
 * console.log(cleanedData);
 * // Output: { name: "Alice", hobbies: ["reading", "traveling"] }
 *
 * @example
 * const arrayData = [
 *   { id: 1, value: "Item 1", toRemove: true },
 *   { id: 2, value: "Item 2", toRemove: false },
 * ];
 *
 * const cleanedArray = removeKeysFromObject(arrayData, ["toRemove"]);
 * console.log(cleanedArray);
 * // Output: [ { id: 1, value: "Item 1" }, { id: 2, value: "Item 2" } ]
 */
export const removeKeysFromObject = <T>(
  obj: T,
  keysToRemove: string[]
): any => {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => removeKeysFromObject(item, keysToRemove));
  }

  const newObj: any = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (!keysToRemove.includes(key)) {
        const value = removeKeysFromObject(obj[key], keysToRemove);

        if (value !== undefined) {
          newObj[key] = value;
        }
      }
    }
  }

  return newObj;
};

/**
 * Merges two objects into one, combining their properties.
 * If a property exists in both objects and is itself an object, it is merged recursively.
 * If a property exists only in one of the objects, it is included in the merged result.
 *
 * @template T - The type of the input objects.
 * @param {T} obj1 - The first object to merge.
 * @param {T} obj2 - The second object to merge.
 * @returns {any} The merged object. Returns undefined if either input is not an object.
 *
 * @example
 * const object1 = {
 *   a: 1,
 *   b: {
 *     c: 2,
 *     d: 3
 *   }
 * };
 *
 * const object2 = {
 *   b: {
 *     d: 4,
 *     e: 5
 *   },
 *   f: 6
 * };
 *
 * const merged = mergeTwoObjects(object1, object2);
 * console.log(merged);
 * // Output: { a: 1, b: { c: 2, d: 4, e: 5 }, f: 6 }
 *
 * @example
 * const objA = { x: 10, y: { z: 20 } };
 * const objB = { y: { a: 30 } };
 *
 * const result = mergeTwoObjects(objA, objB);
 * console.log(result);
 * // Output: { x: 10, y: { z: 20, a: 30 } }
 */
export const mergeTwoObjects = <T>(obj1: T, obj2: T): any => {
  const mergedObj: any = {};

  // check if props are objects
  if (typeof obj1 !== "object" || obj1 === null) {
    return undefined;
  }

  if (typeof obj2 !== "object" || obj2 === null) {
    return undefined;
  }

  for (const key in obj1) {
    if (obj1.hasOwnProperty(key)) {
      if (obj2.hasOwnProperty(key)) {
        if (typeof obj1[key] === "object" && obj1[key] !== null) {
          mergedObj[key] = mergeTwoObjects(obj1[key], obj2[key]);
        } else {
          mergedObj[key] = obj2[key];
        }
      } else {
        mergedObj[key] = obj1[key];
      }
    }
  }

  for (const key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      if (!obj1.hasOwnProperty(key)) {
        mergedObj[key] = obj2[key];
      }
    }
  }

  return mergedObj;
};

/**
 * Creates a new object by omitting specified keys from the input object.
 * This function shallow copies the object and removes the specified keys,
 * returning the resulting object.
 *
 * @template T - The type of the input object.
 * @template K - The keys to omit.
 * @param {T} obj - The object from which to omit keys.
 * @param {K[]} keys - An array of keys to be omitted from the object.
 * @returns {any} A new object without the specified keys. Returns undefined if the input is not a valid object.
 *
 * @example
 * const originalObj = {
 *   id: 1,
 *   name: 'Alice',
 *   age: 30,
 *   city: 'Wonderland'
 * };
 *
 * const omittedObj = omitKeysOfObject(originalObj, ['age', 'city']);
 * console.log(omittedObj);
 * // Output: { id: 1, name: 'Alice' }
 *
 * @example
 * const sampleData = {
 *   x: 10,
 *   y: 20,
 *   z: 30
 * };
 *
 * const result = omitKeysOfObject(sampleData, ['y']);
 * console.log(result);
 * // Output: { x: 10, z: 30 }
 */
export function omitKeysOfObject<T, K extends keyof T>(obj: T, keys: K[]): any {
  // Check if obj is an object and not null
  if (typeof obj !== "object" || obj === null) {
    return undefined;
  }

  const result = { ...obj };
  keys.forEach((key) => {
    delete result[key];
  });
  return result;
}

/**
 * Transforms a nested object into a flattened object. It converts all nested properties
 * into a single level by concatenating their keys with a dot (.) separator.
 *
 * @template T - The type of the input object.
 * @param {T} obj - The object to be flattened.
 * @returns {any} A new flattened object. Returns undefined if the input is not a valid object.
 *
 * @example
 * const nestedObject = {
 *   name: 'John',
 *   address: {
 *     city: 'New York',
 *     zip: '10001'
 *   },
 *   contact: {
 *     email: 'john@example.com',
 *     phone: {
 *       home: '123-456-7890',
 *       mobile: '987-654-3210'
 *     }
 *   }
 * };
 *
 * const flattened = transformToFlattenObject(nestedObject);
 * console.log(flattened);
 * // Output: {
 * //   name: 'John',
 * //   address.city: 'New York',
 * //   address.zip: '10001',
 * //   contact.email: 'john@example.com',
 * //   contact.phone.home: '123-456-7890',
 * //   contact.phone.mobile: '987-654-3210'
 * // }
 *
 * @example
 * const simpleObj = {
 *   a: 1,
 *   b: 2
 * };
 *
 * const result = transformToFlattenObject(simpleObj);
 * console.log(result);
 * // Output: { a: 1, b: 2 }
 */
export const transformToFlattenObject = <T>(obj: T): any => {
  if (!isObject(obj)) return undefined;

  const flattenObj: any = {};
  const flatten = (obj: any, prefix = ""): void => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        const newKey = prefix ? `${prefix}.${key}` : key;
        if (typeof value === "object" && value !== null) {
          flatten(value, newKey);
        } else {
          flattenObj[newKey] = value;
        }
      }
    }
  };
  flatten(obj);
  return flattenObj;
};

/**
 * Converts a flattened object back into a nested object structure.
 * It reconstructs the original object by splitting keys that are concatenated
 * with a dot (.) separator.
 *
 * @template T - The type of the input object.
 * @param {T} obj - The flattened object to be converted back to a nested structure.
 * @returns {any} A new nested object. Returns undefined if the input is not a valid object.
 *
 * @example
 * const flattenedObject = {
 *   name: 'Alice',
 *   address.city: 'Wonderland',
 *   address.zip: '12345',
 *   contact.email: 'alice@example.com',
 *   contact.phone.home: '555-1234',
 *   contact.phone.mobile: '555-5678'
 * };
 *
 * const nested = transformToUnflattenObject(flattenedObject);
 * console.log(nested);
 * // Output: {
 * //   name: 'Alice',
 * //   address: {
 * //     city: 'Wonderland',
 * //     zip: '12345'
 * //   },
 * //   contact: {
 * //     email: 'alice@example.com',
 * //     phone: {
 * //       home: '555-1234',
 * //       mobile: '555-5678'
 * //     }
 * //   }
 * // }
 *
 * @example
 * const flatData = {
 *   id: 1,
 *   name: 'Bob',
 *   details.age: 30,
 *   details.location.country: 'Wonderland'
 * };
 *
 * const result = transformToUnflattenObject(flatData);
 * console.log(result);
 * // Output: {
 * //   id: 1,
 * //   name: 'Bob',
 * //   details: {
 * //     age: 30,
 * //     location: {
 * //       country: 'Wonderland'
 * //     }
 * //   }
 * // }
 */
export const transformToUnflattenObject = <T>(obj: T): any => {
  if (!isObject(obj)) return undefined;

  const result: any = {};
  for (const key in obj) {
    const keys = key.split(".");
    keys.reduce((acc, part, idx) => {
      if (idx === keys.length - 1) {
        acc[part] = obj[key];
      } else {
        acc[part] = acc[part] || {};
      }
      return acc[part];
    }, result);
  }
  return result;
};

/**
 * Retrieves a nested property value from an object using a dot-separated path.
 * If any part of the path does not exist, it returns undefined.
 *
 * @param {any} obj - The object from which to retrieve the nested value.
 * @param {string} path - A dot-separated string representing the path to the desired property.
 * @returns {T | undefined} The value at the specified path, or undefined if the path is invalid.
 *
 * @example
 * const data = {
 *   user: {
 *     id: 1,
 *     profile: {
 *       name: 'Alice',
 *       age: 28
 *     }
 *   }
 * };
 *
 * const name = getNestedValueOfObject(data, 'user.profile.name');
 * console.log(name);
 * // Output: 'Alice'
 *
 * @example
 * const missingProperty = getNestedValueOfObject(data, 'user.profile.email');
 * console.log(missingProperty);
 * // Output: undefined
 */
export const getNestedValueOfObject = <T>(
  obj: any,
  path: string
): T | undefined => {
  if (!isObject(obj)) return undefined;

  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
};

/**
 * Deep freezes an object, preventing any changes to its properties and nested objects.
 *
 * @template T - The type of the object to be frozen.
 * @param {T} obj - The object to be deeply frozen. If it's not an object, it returns undefined.
 * @returns {T | undefined} - Returns the frozen object or undefined if the input is not an object.
 *
 * @example
 * const obj = { a: 1, b: { c: 2 } };
 * const frozenObj = deepFreezeObject(obj);
 * frozenObj.b.c = 3; // TypeError: Cannot assign to read only property 'c' of object '#<Object>'
 */
export const deepFreezeObject = <T>(obj: T): T | undefined => {
  if (!isObject(obj)) return undefined;

  Object.freeze(obj);

  for (const key in obj) {
    if ((obj as Object).hasOwnProperty(key)) {
      const value = obj[key];
      if (isObject(value)) {
        deepFreezeObject(value);
      }
    }
  }

  return obj;
};

/**
 * Maps the values of an object to a new object using a provided mapping function.
 *
 * @template T - The type of the input object's values.
 * @template U - The type of the output object's values.
 * @param {{ [key: string]: T }} obj - The object whose values will be mapped.
 * @param {(value: T) => U} fn - The function that defines the mapping logic on each value.
 * @returns {{ [key: string]: U } | undefined} - Returns a new object with mapped values or undefined if the input is not an object.
 *
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * const mappedObj = mapValuesObject(obj, (value) => value * 2);
 * console.log(mappedObj); // Output: { a: 2, b: 4, c: 6 }
 */
export const mapValuesObject = <T, U>(
  obj: { [key: string]: T },
  fn: (value: T) => U
): { [key: string]: U } | undefined => {
  if (!isObject(obj)) return undefined;

  const result: { [key: string]: U } = {};
  for (const key in obj) {
    result[key] = fn(obj[key]);
  }
  return result;
};
