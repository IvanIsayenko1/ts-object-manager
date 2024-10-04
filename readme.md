# <p align="center">ts-object-manager</p>

An npm package that manages objects with TypeScript (TS) typically provides utilities to handle and manipulate objects in a type-safe way. It ensures strict typing, enhancing code reliability by leveraging TypeScript’s static type checking. Such packages might offer functions for deep cloning, merging, mutating, or transforming objects while preserving type definitions. They could also include helpers for safely accessing nested properties, handling immutability, or performing object validation, all with TypeScript’s rich type inference to avoid runtime errors

## 🛠️ Tech Stack

- [TypeScript](https://www.typescriptlang.org/)

## 🛠️ Install Dependencies

```bash
npm i ts-object-manager
```

## 📄 Documentation

All methods list

- [isObject](#isObject)
- [isPlainObject](#isPlainObject)
- [isObjectEmpty](#isObjectEmpty)
- [isObjectDeepEqual](#isObjectDeepEqual)
- [isPropertyDefined](#isPropertyDefined)
- [isObjectHasTheStructure](#isObjectHasTheStructure)
- [cloneObject](#cloneObject)
- [getObjectDiffIterative](#getObjectDiffIterative)
- [getAllObjectKeys](#getAllObjectKeys)
- [removeEmptyObjects](#removeEmptyObjects)
- [removeUndefinedKeys](#removeUndefinedKeys)
- [removeKeysFromObject](#removeKeysFromObject)
- [mergeTwoObjects](#mergeTwoObjects)
- [omitKeysOfObject](#omitKeysOfObject)
- [transformToFlattenObject](#transformToFlattenObject)
- [transformToUnflattenObject](#transformToUnflattenObject)
- [getNestedValueOfObject](#getNestedValueOfObject)
- [deepFreezeObject](#deepFreezeObject)
- [mapValuesObject](#mapValuesObject)

### <span id="isObject">isObject</span>

Checks if the given value is an object.

```
console.log(isObject({})); // true
console.log(isObject(null)); // false
console.log(isObject([])); // true
console.log(isObject(42)); // false
```

---

### <span id="isPlainObject">isPlainObject</span>

Checks if the given value is a plain object.

```
console.log(isPlainObject({})); // true
console.log(isPlainObject(new Date())); // false
console.log(isPlainObject([])); // false
console.log(isPlainObject(Object.create(null))); // true
```

---

### <span id="isObjectEmpty">isObjectEmpty</span>

Checks if the given object is empty.

```
// Empty object
const emptyObj = {};

// Check if the object is empty
const result1 = isObjectEmpty(emptyObj);

console.log(result1); // Output: true
```

```
// Non-empty object
const nonEmptyObj = {
  name: 'John',
  age: 25
};

// Check if the object is empty
const result2 = isObjectEmpty(nonEmptyObj);

console.log(result2); // Output: false
```

```
// Array is not considered an object for this function
const array = [1, 2, 3];

// Check if the array is empty (should return false because it's not an object)
const result3 = isObjectEmpty(array);

console.log(result3); // Output: false
```

---

### <span id="isObjectDeepEqual">isObjectDeepEqual</span>

Performs a deep comparison between two values to determine if they are equivalent.

```
const objA = { a: 1, b: { c: 2 } };
const objB = { a: 1, b: { c: 2 } };
console.log(isObjectDeepEqual(objA, objB)); // true
```

```
const objC = { a: 1, b: { c: 3 } };
console.log(isObjectDeepEqual(objA, objC)); // false
```

```
console.log(isObjectDeepEqual([1, 2, 3], [1, 2, 3])); // true
console.log(isObjectDeepEqual([1, 2, 3], [1, 2])); // false
```

---

### <span id="isPropertyDefined">isPropertyDefined</span>

Checks if a property is defined on an object or any of its nested objects.

```
const sample = { a: 1, b: { c: 2 } };
console.log(isPropertyDefined(sample, 'a')); // true
console.log(isPropertyDefined(sample, 'b')); // true
console.log(isPropertyDefined(sample, 'c')); // false
console.log(isPropertyDefined(sample, 'b.c')); // true
```

---

### <span id="isObjectHasTheStructure">isObjectHasTheStructure</span>

Checks if the given object has the same structure as the specified structure object.

```
const obj1 = { name: "Alice", age: 30, address: { city: "Wonderland" } };
const structure1 = { name: "", age: 0, address: { city: "" } };
console.log(isObjectHasTheStructure(obj1, structure1)); // Output: true
```

```
const obj2 = [ { name: "Bob" }, { name: "Charlie" } ];
const structure2 = [ { name: "" }, { name: "" } ];
console.log(isObjectHasTheStructure(obj2, structure2)); // Output: true
```

---

### <span id="cloneObject">cloneObject</span>

Creates a deep clone of the given object.

```
const original = { a: 1, b: { c: 2 } };
const cloned = cloneObject(original);console.log(isPropertyDefined(sample, 'b')); // true
console.log(cloned); // { a: 1, b: { c: 2 } }
console.log(cloned === original); // false
console.log(cloned.b === original.b); // false
```

---

### <span id="getObjectDiffIterative">getObjectDiffIterative</span>

Compares two objects or arrays iteratively and returns the differences between them.

```
const obj1 = {
  name: "John",
  age: 25,
  address: {
    city: "New York",
    zip: "10001"
  }
};

const obj2 = {
  name: "John",
  age: 30,  // Changed age
  address: {
    city: "Los Angeles",  // Changed city
    zip: "10001"
  }
};

const diff = getObjectDiffIterative(obj1, obj2);
console.log(diff);

// output
{
  "age": 30,
  "address": {
    "city": "Los Angeles"
  }
}
```

```
const obj1 = {
  items: [1, 2, 3],
  details: {
    color: "red",
    dimensions: [10, 20]
  }
};

const obj2 = {
  items: [1, 2, 4],  // Changed last element in array
  details: {
    color: "blue",  // Changed color
    dimensions: [10, 20]  // No change
  }
};

const diff = getObjectDiffIterative(obj1, obj2);
console.log(diff);

// output
{
  "items": [1, 2, 4],
  "details": {
    "color": "blue"
  }
}
```

---

### <span id="getAllObjectKeys">getAllObjectKeys</span>

Recursively retrieves all keys of a given object, including keys from nested objects.

```
const obj = {
    name: 'Alice',
    details: {
      age: 30,
      city: 'Wonderland'
    },
    hobbies: ['reading', 'jogging']
  };

const keys = getAllObjectKeys(obj);
console.log(keys);
// Output: ["name", "details.age", "details.city", "hobbies"]
```

---

### <span id="removeEmptyObjects">removeEmptyObjects</span>

Recursively removes empty objects and undefined values from an object or array.

```
const data = {
  a: {
    b: {},
    c: 1,
  },
  d: [],
  e: {
    f: {
      g: {},
    },
  },
  h: null,
};

const cleanedData = removeEmptyObjects(data);
console.log(cleanedData);
// Output: { a: { c: 1 }, d: [], h: null }
```

```
const arrayData = [
  { id: 1, value: {} },
  { id: 2, value: { name: "Test" } },
  {},
];

const cleanedArray = removeEmptyObjects(arrayData);
console.log(cleanedArray);
// Output: [ { id: 2, value: { name: "Test" } } ]
```

---

### <span id="removeUndefinedKeys">removeUndefinedKeys</span>

Recursively removes keys with undefined values from an object or array.

```
const data = {
  a: 1,
  b: undefined,
  c: {
    d: undefined,
    e: 3,
  },
  f: [],
  g: null,
};

const cleanedData = removeEmptyKeys(data);
console.log(cleanedData);
// Output: { a: 1, c: { e: 3 }, f: [], g: null }
```

```
const arrayData = [
    { id: 1, value: undefined },
    { id: 2, value: { name: "Test" } },
    { id: 3, value: null },
  ];
const cleanedArray = removeEmptyKeys(arrayData);
console.log(cleanedArray);
// Output: [ { id: 2, value: { name: "Test" } }, { id: 3, value: null } ]
```

---

### <span id="removeKeysFromObject">removeKeysFromObject</span>

Recursively removes specified keys from an object or array.

```
const data = {
  name: "Alice",
  age: 30,
  location: {
    city: "Wonderland",
    country: "Fantasy"
  },
  hobbies: ["reading", "traveling"],
};

const cleanedData = removeKeysFromObject(data, ["age", "location"]);
console.log(cleanedData);
// Output: { name: "Alice", hobbies: ["reading", "traveling"] }
```

```
const arrayData = [
  { id: 1, value: "Item 1", toRemove: true },
  { id: 2, value: "Item 2", toRemove: false },
];

const cleanedArray = removeKeysFromObject(arrayData, ["toRemove"]);
console.log(cleanedArray);
// Output: [ { id: 1, value: "Item 1" }, { id: 2, value: "Item 2" } ]
```

---

### <span id="mergeTwoObjects">mergeTwoObjects</span>

Merges two objects into one, combining their properties.

```
const object1 = {
  a: 1,
  b: {
    c: 2,
    d: 3
  }
};

const object2 = {
  b: {
    d: 4,
    e: 5
  },
  f: 6
};

const merged = mergeTwoObjects(object1, object2);
console.log(merged);
// Output: { a: 1, b: { c: 2, d: 4, e: 5 }, f: 6 }
```

```
const objA = { x: 10, y: { z: 20 } };
const objB = { y: { a: 30 } };

const result = mergeTwoObjects(objA, objB);
console.log(result);
// Output: { x: 10, y: { z: 20, a: 30 } }
```

---

### <span id="omitKeysOfObject">omitKeysOfObject</span>

Creates a new object by omitting specified keys from the input object.

```
const originalObj = {
  id: 1,
  name: 'Alice',
  age: 30,
  city: 'Wonderland'
};

const omittedObj = omitKeysOfObject(originalObj, ['age', 'city']);
console.log(omittedObj);
// Output: { id: 1, name: 'Alice' }
```

```
const sampleData = {
  x: 10,
  y: 20,
  z: 30
};

const result = omitKeysOfObject(sampleData, ['y']);
console.log(result);
// Output: { x: 10, z: 30 }
```

---

### <span id="transformToFlattenObject">transformToFlattenObject</span>

Transforms a nested object into a flattened object. It converts all nested properties into a single level by concatenating their keys with a dot (.) separator.

```
const nestedObject = {
  name: 'John',
  address: {
    city: 'New York',
    zip: '10001'
  },
  contact: {
    email: 'john@example.com',
    phone: {
      home: '123-456-7890',
      mobile: '987-654-3210'
    }
  }
};

const flattened = transformToFlattenObject(nestedObject);
console.log(flattened);
// Output: {
//   name: 'John',
//   address.city: 'New York',
//   address.zip: '10001',
//   contact.email: 'john@example.com',
//   contact.phone.home: '123-456-7890',
//   contact.phone.mobile: '987-654-3210'
// }
```

```
const simpleObj = {
  a: 1,
  b: 2
};

const result = transformToFlattenObject(simpleObj);
console.log(result);
// Output: { a: 1, b: 2 }
```

---

### <span id="transformToUnflattenObject">transformToUnflattenObject</span>

Converts a flattened object back into a nested object structure. It reconstructs the original object by splitting keys that are concatenated with a dot (.) separator.

```
const flattenedObject = {
  name: 'Alice',
  address: { city: 'Wonderland' },
  address: { zip: '12345' },
  contact: { email: 'alice@example.com' },
  contact: { phone: { home: '555-1234', mobile: '555-5678' } }
};

const nested = transformToUnflattenObject(flattenedObject);
console.log(nested);
// Output: {
//   name: 'Alice',
//   address: {
//     city: 'Wonderland',
//     zip: '12345'
//   },
//   contact: {
//     email: 'alice@example.com',
//     phone: {
//       home: '555-1234',
//       mobile: '555-5678'
//     }
//   }
// }
```

```
const flatData = {
  id: 1,
  name: 'Bob',
  details: { age: 30 },
  details: { location: { country: 'Wonderland' } }
};

const result = transformToUnflattenObject(flatData);
console.log(result);
// Output: {
//   id: 1,
//   name: 'Bob',
//   details: {
//     age: 30,
//     location: {
//       country: 'Wonderland'
//     }
//   }
// }
```

---

### <span id="getNestedValueOfObject">getNestedValueOfObject</span>

Retrieves a nested property value from an object using a dot-separated path.

```
const data = {
  user: {
    id: 1,
    profile: {
      name: 'Alice',
      age: 28
    }
  }
};

const name = getNestedValueOfObject(data, 'user.profile.name');
console.log(name);
// Output: 'Alice'
```

```
const missingProperty = getNestedValueOfObject(data, 'user.profile.email');
console.log(missingProperty);
// Output: undefined
```

---

### <span id="deepFreezeObject">deepFreezeObject</span>

Deep freezes an object, preventing any changes to its properties and nested objects.

```
const obj = { a: 1, b: { c: 2 } };
const frozenObj = deepFreezeObject(obj);
frozenObj.b.c = 3; // TypeError: Cannot assign to read only property 'c' of object '#<Object>'
```

---

### <span id="mapValuesObject">mapValuesObject</span>

Maps the values of an object to a new object using a provided mapping function.

```
const obj = { a: 1, b: 2, c: 3 };
const mappedObj = mapValuesObject(obj, (value) => value * 2);
console.log(mappedObj); // Output: { a: 2, b: 4, c: 6 }
```

## 🍰 Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

## 🙇 Author

#### Ivan Isayenko

- Github: [IvanIsayenko1](https://github.com/IvanIsayenko1)
