import { Grid, Typography } from '@material-ui/core';
import { format } from 'date-fns';
import { Occurrence } from 'utils/zoomer/types';
import styles from './styles.module.scss';

export const DayMeetings = (props: Props) => {
  return (
    <div className={styles.dayMeetings}>
      <Typography variant='body2' className={styles.day}>
        {props.day}
      </Typography>
      {props.meetings.map(meeting => (
        <div key={meeting.occurrenceID} className={styles.meeting}>
          <Grid container>
            <Grid item xs={12} md={2}>
              <Typography className={styles.top}>{formatDuration(meeting)}</Typography>
            </Grid>
            <Grid item xs={12} md={10}>
              <Typography className={styles.top}>{meeting.title}</Typography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} md={2}>
              <Typography className={styles.bottom}>{formatSeq(meeting)}</Typography>
            </Grid>
            <Grid item xs={12} md={10}>
              <Typography className={styles.bottom}>{formatID(meeting.meetingID)}</Typography>
            </Grid>
          </Grid>
        </div>
      ))}
    </div>
  );
};

const formatDuration = (occ: Occurrence) => {
  const startTime = format(occ.startDate, 'p');
  const endTime = format(occ.endDate, 'p');
  return `${startTime} - ${endTime}`;
};

const formatSeq = (occ: Occurrence) => {
  if (occ.isSeudo) {
    return '';
  }
  return `Occurrence ${occ.sequence} of ${occ.totalOccurrences}`;
};

const formatID = (id: string) => {
  const match = /^(.{3})(.{4})(.+)$/.exec(id);
  if (!match) return `Meeting ID: ${id}`;

  return `Meeting ID: ${match.slice(1).join(' ')}`;
};

type Props = {
  day: string;
  meetings: Occurrence[];
};
