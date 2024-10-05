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
export const isPlainObject = <T>(obj: T): boolean => {
  if (!isObject(obj)) {
    return false;
  }

  return (
    Object.getPrototypeOf(obj) === Object.prototype ||
    Object.getPrototypeOf(obj) === null
  );
};

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
    const isObj1Array = Array.isArray(obj1);
    const isObj2Array = Array.isArray(obj2);

    if (isObj1Array !== isObj2Array) {
      return false;
    }

    if (isObj1Array && isObj2Array) {
      if (obj1.length !== obj2.length) {
        return false;
      }
      for (let i = 0; i < obj1.length; i++) {
        if (!isObjectDeepEqual(obj1[i], obj2[i])) {
          return false;
        }
      }
      return true;
    }

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

  return obj1 === obj2;
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
  // A WeakMap to keep track of already cloned objects to handle circular references
  const clonedObjects = new WeakMap<any, any>();

  const clone = (input: any): any => {
    // Check if the input is a primitive type or null
    if (input === null || typeof input !== "object") {
      return input; // Return the primitive value as is
    }

    // Handle circular references using WeakMap
    if (clonedObjects.has(input)) {
      return clonedObjects.get(input); // Return the existing clone
    }

    // Create an array or object based on the input type
    const output = Array.isArray(input) ? [] : {};

    // Store the reference of the original object in the WeakMap
    clonedObjects.set(input, output);

    // Recursively clone the properties
    for (const key in input) {
      if (input.hasOwnProperty(key)) {
        (output as any)[key] = clone(input[key]); // Recursion for nested objects
      }
    }

    return output; // Return the cloned object/array
  };

  return clone(obj); // Start cloning the original object
};
/**
 * Compares two objects or arrays iteratively and returns the differences between them.
 * If the objects are not of the same type, it assigns `obj2` to the corresponding key.
 * For arrays, if their lengths differ, it assigns `obj2` to the corresponding key.
 * For objects, if the keys count differs, it assigns `obj2` to the corresponding key.
 *
 * @param {T} obj1 - The first object or array to compare.
 * @param {T} obj2 - The second object or array to compare.
 * @returns {any} - An object or array representing the differences.
 *
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
export const getObjectDiffIterative = (
  objA: any,
  objB: any,
  visited: WeakMap<any, any> = new WeakMap()
): any => {
  if (objA === null && objB === null) return undefined;
  if (objA === null) return { ...objB };
  if (objB === null) return { ...objA };

  const diff: Record<string, any> = {};

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  const allKeys = new Set([...keysA, ...keysB]);

  for (const key of allKeys) {
    const valueA = objA[key];
    const valueB = objB[key];

    if (!(key in objA)) {
      diff[key] = valueB;
    } else if (!(key in objB)) {
      diff[key] = undefined;
    } else if (valueA !== valueB) {
      const isValueAObject = typeof valueA === "object" && valueA !== null;
      const isValueBObject = typeof valueB === "object" && valueB !== null;

      if (isValueAObject && isValueBObject) {
        if (visited.has(valueA)) {
          if (visited.get(valueA) === valueB) {
            continue;
          }
        } else {
          visited.set(valueA, valueB);
        }

        const nestedDiff = getObjectDiffIterative(valueA, valueB, visited);
        if (Object.keys(nestedDiff).length > 0) {
          diff[key] = nestedDiff;
        }
      } else {
        diff[key] = valueB;
      }
    }
  }

  return Object.keys(diff).length > 0 ? diff : {};
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
  parentKey: string = "",
  visited: WeakSet<any> = new WeakSet<any>()
): string[] => {
  let keys: string[] = [];

  const isObject = (value: any): value is Record<string, any> =>
    value !== null && typeof value === "object" && !Array.isArray(value);

  if (visited.has(obj)) {
    return keys;
  }
  visited.add(obj);

  if (isObject(obj)) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const fullKey = parentKey ? `${parentKey}.${key}` : key;

        if (isObject(obj[key])) {
          keys = keys.concat(getAllObjectKeys(obj[key], fullKey, visited));
        } else {
          keys.push(fullKey);
        }
      }
    }
  }

  return keys;
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
 * const cleanedData = removeUndefinedKeys(data);
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
 * const cleanedArray = removeUndefinedKeys(arrayData);
 * console.log(cleanedArray);
 * // Output: [ { id: 2, value: { name: "Test" } }, { id: 3, value: null } ]
 */
export const removeUndefinedKeys = <T>(obj: T): any => {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    const result = obj.filter((e) => e !== undefined).map(removeUndefinedKeys);
    return result;
  }

  const newObj: any = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = removeUndefinedKeys(obj[key]);

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
export const mergeTwoObjects = <
  T extends Record<string, any>,
  U extends Record<string, any>
>(
  obj1: T,
  obj2: U
): any => {
  const mergedObj: any = {};

  for (const key in obj1) {
    if (obj1.hasOwnProperty(key)) {
      if (obj2.hasOwnProperty(key)) {
        if (Array.isArray(obj1[key]) && Array.isArray(obj2[key])) {
          mergedObj[key] = [...obj1[key], ...obj2[key]];
        } else if (typeof obj1[key] === "object" && obj1[key] !== null) {
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
export const omitKeysOfObject = <T, K extends keyof T>(
  obj: T,
  keys: K[]
): any => {
  if (typeof obj !== "object" || obj === null) {
    return undefined;
  }

  const result = { ...obj };
  keys.forEach((key) => {
    delete result[key];
  });
  return result;
};

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
