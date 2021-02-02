import { Button, Grid, Typography } from '@material-ui/core';
import { format } from 'date-fns';
import { deleteMeeting } from 'utils/zoomer';
import { Occurrence } from 'utils/zoomer/types';
import styles from './styles.module.scss';

export const DayMeetings = (props: Props) => {
  const handleDelete = (id: string) => () => {
    props.onDelete(id);
  };

  return (
    <div className={styles.dayMeetings}>
      <Typography variant='body2' className={styles.day}>
        {props.day}
      </Typography>
      {props.meetings.map(meeting => (
        <div key={meeting.occurrenceID} className={styles.meeting}>
          <Grid container spacing={5}>
            <Grid item xs={6} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography className={styles.top}>{formatDuration(meeting)}</Typography>
                  <Typography className={styles.bottom}>{formatSeq(meeting)}</Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography className={styles.top}>{meeting.title}</Typography>
                  <Typography className={styles.bottom}>{formatID(meeting.meetingID)}</Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid className={styles.options} item xs={6} md={6}>
              <div>
                <Button
                  className={styles.btn_delete}
                  size='small'
                  variant='contained'
                  onClick={handleDelete(meeting.meetingID)}
                >
                  Delete
                </Button>
              </div>
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
  onDelete: (id: string) => void;
};
