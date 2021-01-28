import { MeetingRequest, zoomerRequest } from 'services/zoomer-api';

//export const testAPI = async () => {
//  const [, res] = await zoomerRequest({ path: '/meetings/41?hey=hi' });
//  console.log(res);
//};

export const createMeeting = (meetingOpts: MeetingRequest) => {
  return zoomerRequest({ path: '/meetings', method: 'post', body: meetingOpts });
};

export const getMeeting = (meetingID: string) => {
  return zoomerRequest({ path: `/meetings/${meetingID}` });
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
    return zoomerRequest({ path, method: 'POST', body: { hostJoinKey } });
  }

  return zoomerRequest({ path, method: 'GET' });
};
