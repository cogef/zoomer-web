import { Page } from 'components/Page';
import { useState } from 'react';
import { Meeting } from 'services/zoomer-api';
import { deleteMeeting, getMeeting } from 'utils/zoomer';
import { IDInput, IDValues } from './components/IDInput';

export const ManagePage = () => {
  const [meeting, setMeeting] = useState<Meeting>();

  const handleIDSubmit = async (values: IDValues) => {
    const res = await getMeeting(values.meetingID.replace(/ +/g, ''));
    if (res.err) {
      alert(res.status === 404 ? 'Meeting not found' : res.err);
    } else {
      setMeeting(res.data);
    }
  };

  const handleDelete = async () => {
    await deleteMeeting(String(meeting!.id));
    setMeeting(undefined);
  };
  return (
    <Page className='manage-page' title='Manage a Meeting'>
      <IDInput meetingID={meeting?.id} onSubmit={handleIDSubmit} onDelete={handleDelete} />
      <pre>{JSON.stringify(meeting, undefined, 2)}</pre>
    </Page>
  );
};
