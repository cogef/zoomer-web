import { FormControlLabel, LinearProgress, Switch } from '@material-ui/core';
import { Page } from 'components/Page';
import { format, isThisYear, isToday } from 'date-fns';
import { startOfDay } from 'date-fns/esm';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { routes } from 'routes';
import { useAuth } from 'utils/auth';
import { entriesOf } from 'utils/functions';
import { useDynamicRef, useScrollBottom } from 'utils/hooks';
import { useCurrentPageAnalytics } from 'utils/hooks/useAnalytics';
import { deleteMeeting, getStartURL } from 'utils/zoomer';
import { useIsAdmin } from 'utils/zoomer/adminContext';
import { useMeetings } from 'utils/zoomer/hooks';
import { Occurrence } from 'utils/zoomer/types';
import { DayMeetings } from './DayMeetings';

export const UpcomingPage = () => {
  useCurrentPageAnalytics('Upcoming');

  const history = useHistory();
  const PAGE_SIZE = 20;
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [showAll, setShowAll] = useState(false);

  const [user] = useAuth();
  const isAdmin = useIsAdmin();

  const [meetings, isLoading, err, reloadMeetings] = useMeetings({
    limit: limit,
    start: startOfDay(new Date()).valueOf(),
    ...(showAll ? {} : { hostEmail: user!.email! }),
  });

  const scrollBottom = useScrollBottom();

  const meetingsRef = useDynamicRef(meetings);
  useEffect(() => {
    if (scrollBottom <= 200) {
      setLimit((meetingsRef.current || []).length + PAGE_SIZE);
    }
  }, [scrollBottom, meetingsRef]);

  if (err !== null) {
    return (
      <Page className='manage-page' title='Upcoming Meetings'>
        Error: {err}
      </Page>
    );
  }

  const handleDelete = async (id: string) => {
    const ok = window.confirm(
      'Deleting this meeting will delete all of its occurrences. Are you sure you want to delete this meeting?'
    );
    if (ok) {
      const res = await deleteMeeting(id);
      if (res.err) {
        alert('An error has occurred');
      } else {
        alert('Meeting deleted');
        reloadMeetings();
      }
    }
  };

  const handleEdit = (id: string) => {
    history.push(`${routes.MANAGE}/${id}/edit`);
  };

  const handleJoin = async (id: string) => {
    const res = await getStartURL(id);
    if (res.status === 404) {
      alert('Meeting not found');
    } else if (res.status === 401) {
      alert('Incorrect host join key');
    } else if (res.err !== null) {
      alert('An unknown error has occurred');
    } else {
      window.open(res.data.startURL);
    }
  };

  const dayGroups = (meetings || []).reduce((acc, meeting) => {
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
      {isAdmin && (
        <div>
          <FormControlLabel
            label='Show All'
            control={<Switch color='primary' checked={showAll} onChange={() => setShowAll(s => !s)} />}
          />
        </div>
      )}
      {entriesOf(dayGroups).map(([day, meetings]) => (
        <DayMeetings
          key={day}
          day={day}
          meetings={meetings}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onJoin={handleJoin}
          showHost={showAll}
        />
      ))}
      {isLoading && <LinearProgress />}
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
