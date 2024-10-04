declare module "ts-object-manager" {
  export const isObject: <T>(obj: T) => boolean;
  export const isPlainObject: <T>(obj: T) => boolean;
  export const isObjectEmpty: <T>(obj: T) => boolean;
  export const isObjectDeepEqual: <T>(obj1: T, obj2: T) => boolean;
  export const isPropertyDefined: <T>(
    obj: T,
    prop: string
  ) => boolean | undefined;
  export const cloneObject: <T>(obj: T) => T;
  export const getObjectDiffIterative: (
    objA: any,
    objB: any,
    visited?: WeakMap<object, any>
  ) => any;
  export const getAllObjectKeys: <T>(
    obj: T,
    parentKey?: string,
    visited?: WeakSet<any>
  ) => string[];
  export const removeEmptyObjects: <T>(obj: T) => any;
  export const removeUndefinedKeys: <T>(obj: T) => any;
  export const removeKeysFromObject: <T>(obj: T, keysToRemove: string[]) => any;
  export const mergeTwoObjects: <
    T extends Record<string, any>,
    U extends Record<string, any>
  >(
    obj1: T,
    obj2: U
  ) => any;
  export const omitKeysOfObject: <T, K extends keyof T>(
    obj: T,
    keys: K[]
  ) => any;
  export const transformToFlattenObject: <T>(obj: T) => any;
  export const transformToUnflattenObject: <T>(obj: T) => any;
  export const getNestedValueOfObject: <T>(
    obj: any,
    path: string
  ) => T | undefined;
  export const deepFreezeObject: <T>(obj: T) => T | undefined;
  export const mapValuesObject: <T, U>(
    obj: { [key: string]: T },
    fn: (value: T) => U
  ) => { [key: string]: U } | undefined;
}
