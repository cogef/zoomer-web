import { zoomerRequest } from 'services/zoomer-api';

export const testAPI = async () => {
  const [err, res] = await zoomerRequest({ path: 'meetings/41?hey=hi' });
  console.log(res);
};

export const createMeeting = () => {
  //TODO:
};

export const updateMeeting = () => {
  //TODO:
};

export const deleteMeeting = () => {
  //TODO:
};
