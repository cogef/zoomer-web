/** Returns an array with values from 1 to `num` inclusively */
export const range = (start: number, end: number): number[] => {
  return new Array(1 + end - start).fill(null).reduce((acc, _, idx) => [...acc, idx + start], []);
};
