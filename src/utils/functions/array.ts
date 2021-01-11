/** Returns an array with values from 1 to `num` inclusively */
export const range = (num: number): number[] => {
  return new Array(num).fill(null).reduce((acc, _, idx) => [...acc, idx + 1], []);
};
