import { Meeting, MeetingRequest, zoomerRequest } from 'services/zoomer-api';
import { Occurrence } from './types';

export const createMeeting = (meetingOpts: MeetingRequest) => {
  return zoomerRequest<CreateResp>({ path: '/meetings', method: 'POST', body: meetingOpts });
  type CreateResp = {
    hostJoinKey: string;
    meetingID: string;
  };
};

export const getMeeting = (meetingID: string) => {
  return zoomerRequest<Meeting>({ path: `/meetings/${meetingID}` });
};

export const updateMeeting = (meetingID: string, meetingOpts: MeetingRequest) => {
  return zoomerRequest<UpdateResp>({ path: `/meetings/${meetingID}`, method: 'PUT', body: meetingOpts });
  type UpdateResp = {
    meetingID: string;
    newMeeting: boolean;
  };
};

export const deleteMeeting = (meetingID: string) => {
  return zoomerRequest<void>({ path: `/meetings/${meetingID}`, method: 'DELETE' });
};

export const getStartURL = (meetingID: string, hostJoinKey?: string) => {
  const path = `/meetings/${meetingID}/start_url`;

  if (hostJoinKey) {
    return zoomerRequest<StartURL>({ path, method: 'POST', body: { hostJoinKey } });
  }

  return zoomerRequest<StartURL>({ path, method: 'GET' });
  type StartURL = { startURL: string };
};

export const getMeetings = () => {
  return zoomerRequest<Occurrence[]>({ path: '/meetings?as=occurrences' });
};
