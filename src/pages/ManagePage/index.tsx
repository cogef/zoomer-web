import { LinearProgress } from '@material-ui/core';
import { Page } from 'components/Page';
import { Values, ZoomInputs } from 'components/ZoomInputs';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { routes } from 'routes';
import { Meeting } from 'services/zoomer-api';
import { useQuery } from 'utils/hooks';
import { deleteMeeting, getMeeting, meetingToFormVals } from 'utils/zoomer';
import { IDInput, IDValues } from './components/IDInput';

export const ManagePage = () => {
  const [meeting, setMeeting] = useState<Meeting>();
  const [isLoading, setLoading] = useState(false);
  const params = useQuery();
  const history = useHistory();
  const qMeetingID = params.get('meetingID');

  const handleIDSubmit = async (values: IDValues) => {
    const id = values.meetingID.replace(/ +/g, '');
    if (id !== qMeetingID) {
      history.push(routes.MANAGE + `?meetingID=${id}`);
    }
  };

  useEffect(() => {
    let isMounted = true;

    if (qMeetingID) {
      setLoading(true);
      getMeeting(qMeetingID).then(res => {
        if (res.err !== null) {
          alert(res.status === 404 ? 'Meeting not found' : res.err);
        } else {
          if (isMounted) {
            setMeeting(res.data);
            setLoading(false);
          }
        }
      });
    }

    return () => {
      isMounted = false;
    };
  }, [qMeetingID]);

  const handleDelete = async () => {
    await deleteMeeting(String(meeting!.id));
    setMeeting(undefined);
  };

  const handleSubmit = async (values: Values) => {
    console.log({ values });
  };

  return (
    <Page className='manage-page' title='Manage a Meeting'>
      <IDInput meetingID={meeting?.id} onSubmit={handleIDSubmit} onDelete={handleDelete} />
      {isLoading ? (
        <LinearProgress />
      ) : (
        meeting && <ZoomInputs action='Update' initialValues={meetingToFormVals(meeting)} onSubmit={handleSubmit} />
      )}
    </Page>
  );
};
