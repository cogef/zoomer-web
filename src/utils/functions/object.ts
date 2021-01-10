/** `Object.entries` with typed keys */
export const entriesOf = Object.entries as <T extends Object, K extends keyof T>(obj: T) => [K, T[K]][];

/** `Object.keys` with typed keys */
export const keysOf = Object.keys as <T extends Object>(obj: T) => (keyof T)[];

/**
 * Returns the value of a nested object property using a dot notation path
 *
 *  E.g. Given `path = 'nested.prop'` and `obj = {nested: {prop: 1}}`
 *  Return `1`
 */
export const getDotNotationProp = (path: string, obj: Record<string, any>): any => {
  const props = path.split('.');

  return props.reduce((acc, prop) => {
    if (acc === undefined) return acc;
    return prop in acc ? acc[prop] : undefined;
  }, obj);
};
