import { Values } from 'components/ZoomInputs';
import { addMonths, addMinutes } from 'date-fns';

export const getInitFormVals = (): Values => {
  return {
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
};

const minDate = () => addMinutes(new Date(), 15);
