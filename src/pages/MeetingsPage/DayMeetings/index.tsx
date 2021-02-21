import { Button, Grid, Typography } from '@material-ui/core';
import { format } from 'date-fns';
import { Link, useHistory } from 'react-router-dom';
import { routes } from 'routes';
import { classes } from 'utils/functions/react';
import { formatMeetingID } from 'utils/functions/zoom';
import { deleteMeeting, getStartURL } from 'utils/zoomer';
import { Occurrence } from 'utils/zoomer/types';
import styles from './styles.module.scss';

export const DayMeetings = (props: Props) => {
  const history = useHistory();

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
        props.reloadMeetings();
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

  return (
    <div className={styles.dayMeetings}>
      <Typography variant='body2' className={styles.day}>
        {props.day}
      </Typography>
      {props.meetings.map(meeting => (
        <div key={meeting.occurrenceID} className={styles.meeting}>
          {props.showHost && <Typography className={styles.host}>Hosted by {meeting.host.name}</Typography>}
          <Grid container spacing={5}>
            <Grid item xs={6} md={6} className={styles.info}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6} className={styles.left}>
                  <Typography className={styles.top}>{formatDuration(meeting)}</Typography>
                  <Typography className={styles.bottom}>{formatSeq(meeting)}</Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography className={classes(styles.top, styles.title)}>
                    {<Link to={`${routes.MANAGE}/${meeting.meetingID}/view`}>{meeting.title}</Link>}
                  </Typography>
                  <Typography className={styles.bottom}>Meeting ID: {formatMeetingID(meeting.meetingID)}</Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid className={styles.options} item xs={6} md={6}>
              <Button
                className={styles.btn}
                size='small'
                variant='outlined'
                onClick={() => handleJoin(meeting.meetingID)}
              >
                Join
              </Button>
              <Button
                className={styles.btn}
                size='small'
                variant='outlined'
                onClick={() => handleEdit(meeting.meetingID)}
              >
                Edit
              </Button>
              <Button
                className={styles.btn}
                size='small'
                variant='outlined'
                onClick={() => handleDelete(meeting.meetingID)}
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
  showHost?: boolean;
  day: string;
  meetings: Occurrence[];
  reloadMeetings: () => void;
};
