import { MeetingRequest, zoomerRequest } from 'services/zoomer-api';

export const testAPI = async () => {
  const [, res] = await zoomerRequest({ path: '/meetings/41?hey=hi' });
  console.log(res);
};

export const createMeeting = async (meetingOpts: MeetingRequest) => {
  return zoomerRequest({ path: '/meetings', method: 'post', body: meetingOpts });
};

export const updateMeeting = () => {
  //TODO:
};

export const deleteMeeting = () => {
  //TODO:
};
