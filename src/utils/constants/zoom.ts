export const recurrenceTypes = {
  1: { label: 'Daily', unit: 'day' },
  2: { label: 'Weekly', unit: 'week' },
  3: { label: 'Monthly', unit: 'month' },
} as const;

/** Returns an array with values from 1 to `num` inclusively */
const range = (num: number): number[] => {
  return new Array(num).fill(null).reduce((acc, _, idx) => [...acc, idx + 1], []);
};
/** Interval options for each recurrence type */
export const recurrenceIntervals = {
  1: range(90),
  2: range(12),
  3: range(3),
} as Record<keyof typeof recurrenceTypes, number[]>;

export const recurrencesOcurrs = range(50);
