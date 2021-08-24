import { Values } from 'components/ZoomInputs';
import { Meeting } from 'services/zoomer-api';
import { getInitFormVals } from './initialFormVals';

export const meetingToFormVals = (meeting: Meeting): Values => {
  const initVals = getInitFormVals();
  const isRecurring = Boolean(meeting.recurrence);
  return {
    topic: meeting.topic,
    agenda: meeting.agenda,
    ministry: meeting.host.ministry,
    start_time: new Date(meeting.start_time),
    duration: formatDuration(meeting.duration),
    isRecurring,
    recurrence: isRecurring ? formatReccurrence(meeting.recurrence!, initVals.recurrence) : initVals.recurrence,
    passcode: meeting.password,
    settings: {
      ...meeting.settings,
      auto_recording: meeting.settings.auto_recording === 'local',
    },
  };
};

const formatDuration = (min: number) => {
  return {
    hours: Math.floor(min / 60),
    minutes: min % 60,
  };
};

const formatReccurrence = (
  recur: Required<Meeting>['recurrence'],
  initRecur: Values['recurrence']
): Values['recurrence'] => {
  return {
    type: recur.type,
    repeat_interval: recur.repeat_interval,
    weekly_days: formatWeeklyDays(recur.weekly_days),
    monthlyType: recur.monthly_day ? 'day' : 'week',
    monthly_day: recur.monthly_day || initRecur.monthly_day,
    monthly_week: recur.monthly_week || initRecur.monthly_week,
    monthly_week_day: recur.monthly_week_day || initRecur.monthly_week_day,
    endType: recur.end_times ? 'occ' : 'date',
    end_times: recur.end_times || initRecur.end_times,
    end_date_time: recur.end_date_time ? new Date(recur.end_date_time) : initRecur.end_date_time,
  };
};

const formatWeeklyDays = (
  days: Required<Meeting>['recurrence']['weekly_days']
): Values['recurrence']['weekly_days'] => {
  const dayNums = new Set(days?.split(','));
  return [
    dayNums.has('1'),
    dayNums.has('2'),
    dayNums.has('3'),
    dayNums.has('4'),
    dayNums.has('5'),
    dayNums.has('6'),
    dayNums.has('7'),
  ];
};
