export type MeetingRequest = {
  ministry: string;
  topic: string;
  type: 2 | 8; // 1 | 2 (scheduled) | 3 | 8 (recurring);
  start_time: string; // [date-time];
  duration: number; // in mins
  schedule_for?: never; // string;
  timezone?: string;
  password: string;
  agenda: string; // description
  recurrence?: {
    type: 1 | 2 | 3; // 1 (daily) | 2 (weekly) | 3 (monthly)
    repeat_interval: number;
    weekly_days?: string;
    monthly_day?: number;
    monthly_week?: '-1' | 1 | 2 | 3 | 4;
    monthly_week_day?: number;
    end_times?: number;
    end_date_time?: string; //  [date-time];
  };
  settings: {
    host_video: boolean;
    participant_video: boolean;
    cn_meeting?: never; // boolean;
    in_meeting?: never; // boolean;
    join_before_host: boolean;
    mute_upon_entry: boolean;
    watermark?: never; // boolean;
    use_pmi: false; // boolean;
    approval_type?: never; // 0 | 1 | 2 (default, no registration);
    registration_type?: never; // 1  | 2 | 3;
    audio?: never; //'both' (default) | 'telephony' | 'voip';
    auto_recording?: 'local'; //'local' | 'cloud' | 'none';
    enforce_login?: never; // boolean;
    enforce_login_domains?: never; // string;
    alternative_hosts?: never; // string;
    waiting_room: boolean;
    global_dial_in_countries?: never; //string[];
    registrants_email_notification?: never; // boolean;
  };
};

export type Meeting = {
  uuid: string;
  id: number;
  host_id: string;
  assistant_id?: string;
  host_email: string;
  created_at: string;
  start_url: string;
  join_url: string;
  occurrences?: { occurrence_id: string; start_time: string; duration: number; status: string }[];
  share_url?: string;
  host: {
    ministry: string;
    email: string;
    name: string;
  };
} & Omit<MeetingRequest, 'ministry'>;
