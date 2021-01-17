import { range } from 'utils/functions';

export const recurrenceTypes = {
  1: { label: 'Daily', unit: 'day' },
  2: { label: 'Weekly', unit: 'week' },
  3: { label: 'Monthly', unit: 'month' },
} as const;

/** Interval options for each recurrence type */
export const recurrenceMaxIntervals = {
  1: 90,
  2: 12,
  3: 3,
} as Record<keyof typeof recurrenceTypes, number>;

export const recurrenceOcurrs = range(1, 50);

export const recurrenceWeekDays = {
  1: { short: 'Sun', long: 'Sunday' },
  2: { short: 'Mon', long: 'Monday' },
  3: { short: 'Tue', long: 'Tuesday' },
  4: { short: 'Wed', long: 'Wednesday' },
  5: { short: 'Thu', long: 'Thursday' },
  6: { short: 'Fri', long: 'Friday' },
  7: { short: 'Sat', long: 'Saturday' },
};

export const recurrenceMonthlyWeeks = {
  '-1': 'Last',
  1: 'First',
  2: 'Second',
  3: 'Third',
  4: 'Forth',
};
