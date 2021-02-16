import { Button, Grid, Typography } from '@material-ui/core';
import { format } from 'date-fns';
import { formatMeetingID } from 'utils/functions/zoom';
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
          <Grid container spacing={5}>
            <Grid item xs={6} md={6} className={styles.info}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6} className={styles.left}>
                  <Typography className={styles.top}>{formatDuration(meeting)}</Typography>
                  <Typography className={styles.bottom}>{formatSeq(meeting)}</Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography className={styles.top}>{meeting.title}</Typography>
                  <Typography className={styles.bottom}>Meeting ID: {formatMeetingID(meeting.meetingID)}</Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid className={styles.options} item xs={6} md={6}>
              <Button
                className={styles.btn}
                size='small'
                variant='outlined'
                onClick={() => props.onJoin(meeting.meetingID)}
              >
                Join
              </Button>
              <Button
                className={styles.btn}
                size='small'
                variant='outlined'
                onClick={() => props.onEdit(meeting.meetingID)}
              >
                Edit
              </Button>
              <Button
                className={styles.btn}
                size='small'
                variant='outlined'
                onClick={() => props.onDelete(meeting.meetingID)}
              >
                Delete
              </Button>
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

type Props = {
  day: string;
  meetings: Occurrence[];
  onJoin: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};
