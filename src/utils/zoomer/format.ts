import { Values } from 'components/ZoomInputs';
import { MeetingRequest } from 'services/zoomer-api';

export const formatRequest = (values: Values) => {
  const req: MeetingRequest = {
    ministry: values.ministry,
    topic: values.topic,
    type: values.isRecurring ? 8 : 2,
    start_time: values.start_time.toISOString(),
    duration: values.duration.hours * 60 + values.duration.minutes,
    password: values.passcode,
    agenda: values.agenda,
    recurrence: values.isRecurring ? formatRecurrence(values.recurrence) : undefined,
    settings: {
      host_video: values.settings.host_video,
      participant_video: values.settings.participant_video,
      join_before_host: values.settings.join_before_host,
      mute_upon_entry: values.settings.mute_upon_entry,
      auto_recording: values.settings.auto_recording ? 'local' : undefined,
      waiting_room: values.settings.waiting_room,
    },
  };
  return req;
};

const formatRecurrence = (recurr: Values['recurrence']) => {
  const recurrence: MeetingRequest['recurrence'] = {
    type: recurr.type,
    repeat_interval: recurr.repeat_interval,
    weekly_days: recurr.type === 2 ? formatWeeklyDays(recurr.weekly_days) : undefined,
    ...(recurr.type === 3
      ? {
          monthly_day: recurr.monthlyType === 'day' ? recurr.monthly_day : undefined,
          ...(recurr.monthlyType === 'week'
            ? {
                monthly_week: recurr.monthly_week,
                monthly_week_day: recurr.monthly_week_day,
              }
            : {}),
        }
      : {}),
    end_times: recurr.endType === 'occ' ? recurr.end_times : undefined,
    end_date_time: recurr.endType === 'date' ? recurr.end_date_time.toISOString() : undefined,
  };
  return recurrence;
};

const formatWeeklyDays = (weekly: Values['recurrence']['weekly_days']) => {
  const days: number[] = weekly.reduce((acc, isDay, idx) => {
    return isDay ? [...acc, idx + 1] : acc;
  }, [] as number[]);
  return days.join(',');
};
