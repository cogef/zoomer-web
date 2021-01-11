import { range } from 'utils/functions';

export const recurrenceTypes = {
  1: { label: 'Daily', unit: 'day' },
  2: { label: 'Weekly', unit: 'week' },
  3: { label: 'Monthly', unit: 'month' },
} as const;

/** Interval options for each recurrence type */
export const recurrenceIntervals = {
  1: range(90),
  2: range(12),
  3: range(3),
} as Record<keyof typeof recurrenceTypes, number[]>;

export const recurrenceOcurrs = range(50);

export const recurrenceWeeks = {
  1: 'Sun',
  2: 'Mon',
  3: 'Tue',
  4: 'Wed',
  5: 'Thu',
  6: 'Fri',
  7: 'Sat',
};
