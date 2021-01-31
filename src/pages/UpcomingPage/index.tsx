import { CircularProgress } from '@material-ui/core';
import { Page } from 'components/Page';
import { format, isThisYear, isToday } from 'date-fns';
import { entriesOf } from 'utils/functions';
import { useMeetings } from 'utils/zoomer/hooks';
import { Occurrence } from 'utils/zoomer/types';
import { DayMeetings } from './DayMeetings';

export const UpcomingPage = () => {
  const [meetings, isLoading, err] = useMeetings();

  if (isLoading) {
    return (
      <Page className='manage-page' title='Upcoming Meetings'>
        <CircularProgress />
      </Page>
    );
  }

  if (err !== null) {
    return (
      <Page className='manage-page' title='Upcoming Meetings'>
        Error: {err}
      </Page>
    );
  }

  const dayGroups = meetings!.reduce((acc, meeting) => {
    const date = formatDate(meeting.startDate);
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(meeting);
    return acc;
  }, {} as DayGroups);
  type DayGroups = Record<string, Occurrence[]>;

  return (
    <Page className='manage-page' title='Upcoming Meetings'>
      {entriesOf(dayGroups).map(([day, meetings]) => (
        <DayMeetings key={day} day={day} meetings={meetings} />
      ))}
    </Page>
  );
};

const formatDate = (ts: number) => {
  if (isToday(ts)) {
    return 'Today';
  }
  if (isThisYear(ts)) {
    return format(ts, 'eee, MMM d');
  }
  return format(ts, 'MMM, d y');
};
