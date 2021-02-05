import { Page } from 'components/Page';
import { Values, ZoomInputs } from 'components/ZoomInputs';
import { createMeeting, formToMeetingRequest } from 'utils/zoomer';
import { getInitFormVals } from 'utils/zoomer/';

export const SchedulePage = () => {
  const handleSubmit = async (values: Values) => {
    const vals = formToMeetingRequest(values);
    console.log({ vals });
    const res = await createMeeting(vals);
    console.log({ res });
    if (res.err !== null) {
      alert(`Error: ${res.err}`);
    } else {
      alert(`Meeting Created with ID "${res.data.meetingID} :: Host Join Key: ${res.data.hostJoinKey}`);
    }
  };

  return (
    <Page className='schedule-page' title='Schedule a Meeting'>
      <ZoomInputs action='Schedule' initialValues={initialValues} onSubmit={handleSubmit} />
    </Page>
  );
};

const initialValues = getInitFormVals();
