import { Page } from 'components/Page';
import { addMinutes, addMonths } from 'date-fns';
import { Values, ZoomInputs } from 'components/ZoomInputs';
import { createMeeting, formatRequest } from 'utils/zoomer';

export const SchedulePage = () => {
  const handleSubmit = async (values: Values) => {
    const vals = formatRequest(values);
    console.log({ vals });
    const { err, data } = await createMeeting(vals);
    console.log({ err, res: data });
    if (err) {
      alert(`Error: ${err}`);
    } else {
      alert(`Meeting Created with ID "${data.meetingID} :: Host Key: ${data.hostJoinKey}`);
    }
  };

  return (
    <Page className='schedule-page' title='Schedule a Meeting'>
      <ZoomInputs initialValues={initialValues} onSubmit={handleSubmit} />
    </Page>
  );
};

const minDate = () => addMinutes(new Date(), 15);

const initialValues: Values = {
  topic: '',
  agenda: '',
  ministry: '',
  start_time: minDate(),
  duration: {
    hours: 1,
    minutes: 0,
  },
  isRecurring: false,
  recurrence: {
    type: 1,
    repeat_interval: 1,
    weekly_days: [false, false, false, false, false, false, false],
    monthlyType: 'day',
    monthly_day: 1,
    monthly_week: 1,
    monthly_week_day: 1,
    endType: 'date',
    end_times: 7,
    end_date_time: addMonths(minDate(), 1),
  },
  passcode: '',
  settings: {
    waiting_room: false,
    host_video: false,
    participant_video: false,
    join_before_host: false,
    mute_upon_entry: true,
    auto_recording: false,
  },
};
