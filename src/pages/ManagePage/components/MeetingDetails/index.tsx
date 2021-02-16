import { Button, Icon, Typography } from '@material-ui/core';
import { InputRow } from 'components/ZoomInputs/components/InputRow';
import { InputSubRow } from 'components/ZoomInputs/components/InputSubRow';
import { Section } from 'components/ZoomInputs/components/Section';
import { format } from 'date-fns';
import { useState } from 'react';
import { Meeting } from 'services/zoomer-api';
import { formatMeetingID } from 'utils/functions/zoom';
import { ParentProps } from 'utils/propTypes';
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
      </Section>
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

type Props = {
  meeting: Meeting;
};
