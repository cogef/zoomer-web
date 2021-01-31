import { Meeting, MeetingRequest, zoomerRequest } from 'services/zoomer-api';
import { Occurrence } from './types';

//export const testAPI = async () => {
//  const [, res] = await zoomerRequest({ path: '/meetings/41?hey=hi' });
//  console.log(res);
//};

export const createMeeting = (meetingOpts: MeetingRequest) => {
  return zoomerRequest<CreateResp>({ path: '/meetings', method: 'post', body: meetingOpts });
  type CreateResp = {
    hostJoinKey: string;
    meetingID: string;
  };
};

export const getMeeting = (meetingID: string) => {
  return zoomerRequest<Meeting>({ path: `/meetings/${meetingID}` });
};

export const updateMeeting = () => {
  //TODO:
};

export const deleteMeeting = (meetingID: string) => {
  return zoomerRequest({ path: `/meetings/${meetingID}`, method: 'DELETE' });
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
