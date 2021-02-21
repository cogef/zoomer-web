import { isToday, isThisYear, format } from 'date-fns';
import { Occurrence } from 'utils/zoomer/types';

export const groupMeetingsByDay = (meetings: Occurrence[]) =>
  meetings.reduce((acc, meeting) => {
    const date = formatDate(meeting.startDate);
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(meeting);
    return acc;
  }, {} as DayGroups);

type DayGroups = Record<string, Occurrence[]>;

const formatDate = (ts: number) => {
  if (isToday(ts)) {
    return 'Today';
  }
  if (isThisYear(ts)) {
    return format(ts, 'eee, MMM d');
  }
  return format(ts, 'MMM, d y');
};
