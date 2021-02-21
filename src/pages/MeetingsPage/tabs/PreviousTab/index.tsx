import { LinearProgress } from '@material-ui/core';
import { Page } from 'components/Page';
import { endOfDay } from 'date-fns';
import { DayMeetings } from 'pages/MeetingsPage/DayMeetings';
import { groupMeetingsByDay } from 'pages/MeetingsPage/helpers';
import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from 'utils/auth';
import { entriesOf } from 'utils/functions';
import { useDynamicRef, useScrollBottom } from 'utils/hooks';
import { useCurrentPageAnalytics } from 'utils/hooks/useAnalytics';
import { useMeetings } from 'utils/zoomer/hooks';

export const PreviousTab = (props: Props) => {
  useCurrentPageAnalytics('Previous Meetings');

  const PAGE_SIZE = 20;
  const [limit, setLimit] = useState(PAGE_SIZE);

  const [user] = useAuth();

  const [_meetings, isLoading, err, reloadMeetings] = useMeetings({
    limit: limit,
    // using end of day to keep `end` a relatively static dependency
    end: endOfDay(new Date()).valueOf(),
    dir: 'desc',
    ...(props.showAll ? {} : { hostEmail: user!.email! }),
  });

  // filter out only meetings that have ended before current time
  const meetings = useMemo(() => (_meetings || []).filter(m => m.endDate <= Date.now()), [_meetings]);

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

  const dayGroups = groupMeetingsByDay(meetings || []);

  return (
    <>
      {entriesOf(dayGroups).map(([day, meetings]) => (
        <DayMeetings key={day} day={day} meetings={meetings} showHost={props.showAll} reloadMeetings={reloadMeetings} />
      ))}
      {isLoading && <LinearProgress />}
    </>
  );
};

type Props = {
  showAll: boolean;
};
