import { camelCase } from "lodash";

const shouldCamelCase = (obj: any) =>
  obj !== null &&
  typeof obj === "object" &&
  !(
    obj instanceof Date ||
    obj instanceof RegExp ||
    obj instanceof Set ||
    obj instanceof Map ||
    obj instanceof Error ||
    obj instanceof Uint8Array ||
    obj instanceof Float32Array ||
    obj instanceof String ||
    obj instanceof Number ||
    obj instanceof Boolean
  );

const toCamelCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(toCamelCase);
  } else if (obj instanceof Set) {
    return new Set([...obj].map(toCamelCase));
  } else if (obj instanceof Map) {
    return new Map(
      [...obj.entries()].map(([key, value]) => [key, toCamelCase(value)])
    );
  } else if (shouldCamelCase(obj)) {
    return Object.keys(obj).reduce((result, key) => {
      result[camelCase(key)] = toCamelCase(obj[key]);
      return result;
    }, {} as any);
  }
  return obj;
};

export default toCamelCase;
