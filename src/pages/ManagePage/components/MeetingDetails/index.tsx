import { Button, Icon, Typography } from '@material-ui/core';
import { InputRow } from 'components/ZoomInputs/components/InputRow';
import { InputSubRow } from 'components/ZoomInputs/components/InputSubRow';
import { Section } from 'components/ZoomInputs/components/Section';
import { zoomToRFCRecurrence } from 'components/ZoomInputs/recurrence';
import { format } from 'date-fns';
import { useState } from 'react';
import { rrulestr } from 'rrule';
import { Meeting } from 'services/zoomer-api';
import { formatMeetingID } from 'utils/functions/zoom';
import { ParentProps } from 'utils/propTypes';
import { meetingToFormVals } from 'utils/zoomer';
import styles from './styles.module.scss';

export const MeetingDetails = (props: Props) => {
  const { meeting } = props;
  const [showPwd, setShowPwd] = useState(false);

  return (
    <div className={styles['manage-details']}>
      <Section>
        <InputRow label='Topic'>
          <Typography>{meeting.topic}</Typography>
        </InputRow>
      </Section>

      <Section>
        <InputRow label='Time'>
          <Typography>{formatDate(meeting.start_time)}</Typography>
        </InputRow>
        {meeting.recurrence && (
          <InputRow>
            <Typography>{getRecurrence(meeting)}</Typography>
          </InputRow>
        )}
      </Section>

      <Section>
        <InputRow label='Meeting ID'>
          <Typography>{formatMeetingID(meeting.id)}</Typography>
        </InputRow>
      </Section>

      <Section>
        <InputRow label='Security'>
          <Typography>
            Password: {showPwd ? meeting.password : '*********'}
            <Button className={styles['show-btn']} variant='text' onClick={() => setShowPwd(s => !s)}>
              {showPwd ? 'Hide' : 'Show'}
            </Button>
          </Typography>
        </InputRow>
        <InputRow>
          <Typography>
            <CheckedOpt checked={meeting.settings.waiting_room}>Waiting Room</CheckedOpt>
          </Typography>
        </InputRow>
      </Section>

      <Section>
        <InputRow label='Invite Link'>
          <a href={meeting.join_url}>{meeting.join_url}</a>
        </InputRow>
      </Section>

      <Section>
        <InputSubRow topLabel='Video' label='Host'>
          {meeting.settings.host_video ? 'On' : 'Off'}
        </InputSubRow>
        <InputSubRow label='Participant'>{meeting.settings.participant_video ? 'On' : 'Off'}</InputSubRow>
        <InputRow label='Meeting Options'>
          <CheckedOpt checked={meeting.settings.join_before_host}>Allow participants to join anytime</CheckedOpt>
        </InputRow>
        <InputRow>
          <CheckedOpt checked={meeting.settings.mute_upon_entry}>Mute participants upon entry</CheckedOpt>
        </InputRow>
        <InputRow>
          <CheckedOpt checked={meeting.settings.auto_recording === 'local'}>
            Automatically record meeting on the local computer
          </CheckedOpt>
        </InputRow>
      </Section>

      {meeting.share_url && (
        <Section>
          <InputRow label='Recordings'>
            <a href={meeting.share_url} target='blank' className={styles['nowrap']}>
              {meeting.share_url}
            </a>
          </InputRow>
        </Section>
      )}
    </div>
  );
};

const CheckedOpt = (props: { checked: boolean } & ParentProps) => {
  const state = props.checked ? 'check' : 'clear';
  return (
    <span className={styles['checked-opt']}>
      <Icon className={styles[state]}>{state}</Icon>
      {props.children}
    </span>
  );
};

const formatDate = (dt: string) => {
  return format(new Date(dt), "PPPP 'at' p");
};

const getRecurrence = (meeting: Meeting) => {
  const formValues = meetingToFormVals(meeting);
  const rrule = zoomToRFCRecurrence(formValues.recurrence);
  let reccurrence = rrulestr(rrule).toText();
  reccurrence = reccurrence[0].toUpperCase() + reccurrence.substr(1);
  const occurrs = meeting.occurrences || [];
  reccurrence += ` (${occurrs.length} occurrences)`;
  return reccurrence;
};

type Props = {
  meeting: Meeting;
};
