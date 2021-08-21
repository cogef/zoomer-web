import { Page } from 'components/Page';
import { Values, ZoomInputs } from 'components/ZoomInputs';
import { useCurrentPageAnalytics } from 'utils/hooks/useAnalytics';
import { createMeeting, formToMeetingRequest } from 'utils/zoomer';
import { getInitFormVals } from 'utils/zoomer/';

export const SchedulePage = () => {
  useCurrentPageAnalytics('Schedule');

  const handleSubmit = async (values: Values) => {
    const vals = formToMeetingRequest(values);
    console.log({ vals });
    const res = await createMeeting(vals);
    console.log({ res });
    if (res.err !== null) {
      alert(`Error: ${res.err}`);
      return false;
    } else {
      alert(`Meeting Created with ID "${res.data.meetingID} :: Host Join Key: ${res.data.hostJoinKey}`);
      return true;
    }
  };

  return (
    <Page className='schedule-page' title='Schedule a Meeting'>
      <ZoomInputs action='Schedule' initialValues={initialValues} onSubmit={handleSubmit} />
    </Page>
  );
};

const initialValues = getInitFormVals();
