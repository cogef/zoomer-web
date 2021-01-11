export type MeetingRequest = {
  topic: string;
  type: 2 | 8; // 1 | 2 | 3 | 8;
  start_time: string; // [date-time];
  duration: number;
  schedule_for?: never; // string;
  timezone: string;
  password: string;
  agenda: string;
  recurrence?: {
    type: number;
    repeat_interval: number;
    weekly_days?: string;
    monthly_day?: number;
    monthly_week?: number;
    monthly_week_day?: number;
    end_times?: number;
    end_date_time?: string; //  [date-time];
  };
  settings: {
    host_video: boolean;
    participant_video: boolean;
    cn_meeting: boolean;
    in_meeting: boolean;
    join_before_host: boolean;
    mute_upon_entry: boolean;
    watermark: boolean;
    use_pmi: boolean;
    approval_type: number;
    registration_type: number;
    audio?: never; //'both' | 'telephony' | 'voip';
    auto_recording?: 'local'; //'local' | 'cloud' | 'none';
    enforce_login: boolean;
    enforce_login_domains: string;
    alternative_hosts: string;
    global_dial_in_countries?: string[];
    registrants_email_notification: boolean;
  };
};
