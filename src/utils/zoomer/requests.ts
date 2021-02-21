import { analytics } from 'services/firebase';
import { Meeting, MeetingRequest, zoomerRequest } from 'services/zoomer-api';
import { Occurrence } from './types';

export const createMeeting = (meetingOpts: MeetingRequest) => {
  analytics.logEvent('fetch:create_meeting');
  return zoomerRequest<CreateResp>({ path: '/meetings', method: 'POST', body: meetingOpts });
  type CreateResp = {
    hostJoinKey: string;
    meetingID: string;
  };
};

export const getMeeting = (meetingID: string) => {
  analytics.logEvent('fetch:retrieve_meeting');
  return zoomerRequest<Meeting>({ path: `/meetings/${meetingID}` });
};

export const updateMeeting = (meetingID: string, meetingOpts: MeetingRequest) => {
  analytics.logEvent('fetch:update_meeting');
  return zoomerRequest<UpdateResp>({ path: `/meetings/${meetingID}`, method: 'PUT', body: meetingOpts });
  type UpdateResp = {
    meetingID: string;
    newMeeting: boolean;
  };
};

export const deleteMeeting = (meetingID: string) => {
  analytics.logEvent('fetch:delete_meeting');
  return zoomerRequest<void>({ path: `/meetings/${meetingID}`, method: 'DELETE' });
};

export const getStartURL = (meetingID: string, hostJoinKey?: string) => {
  analytics.logEvent('fetch:retrieve_start_url');
  const path = `/meetings/${meetingID}/start_url`;

  if (hostJoinKey) {
    return zoomerRequest<StartURL>({ path, method: 'POST', body: { hostJoinKey } });
  }

  return zoomerRequest<StartURL>({ path, method: 'GET' });
  type StartURL = { startURL: string };
};

export const getMeetings = (opts: MeetingsOptions) => {
  analytics.logEvent('fetch:retrieve_meetings');
  return zoomerRequest<Occurrence[]>({ path: '/meetings', qParams: { as: 'occurrences', ...opts } });
};

export const getAdminStatus = () => {
  analytics.logEvent('fetch:retrieve_admin_status');
  return zoomerRequest<{ isAdmin: boolean }>({ path: '/users/self/isAdmin' });
};

export type MeetingsOptions = {
  limit: number;
  start?: number;
  end?: number;
  hostEmail?: string;
  dir?: 'asc' | 'desc';
} & (
  | { lastOccurrenceID: string | number; lastMeetingID: string | number }
  | { lastOccurrenceID?: never; lastMeetingID?: never }
);
