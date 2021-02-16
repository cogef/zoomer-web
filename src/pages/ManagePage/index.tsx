import { LinearProgress } from '@material-ui/core';
import { Page } from 'components/Page';
import { Values, ZoomInputs } from 'components/ZoomInputs';
import { useEffect, useState } from 'react';
import { Redirect, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { routes } from 'routes';
import { Meeting } from 'services/zoomer-api';
import { deleteMeeting, formToMeetingRequest, getMeeting, meetingToFormVals, updateMeeting } from 'utils/zoomer';
import { IDInput, IDValues } from './components/IDInput';
import { MeetingDetails } from './components/MeetingDetails';

export const ManagePage = () => {
  const [meeting, setMeeting] = useState<Meeting>();
  const [isLoading, setLoading] = useState(false);
  const [loadToggle, setLoadToggle] = useState(false);
  const match = useRouteMatch<PathParams>(`${routes.MANAGE}/:meetingID`)!;
  const history = useHistory();
  const qMeetingID = match?.params.meetingID;

  const handleIDSubmit = async (values: IDValues) => {
    const id = values.meetingID.replace(/ +/g, '');
    if (id && id !== qMeetingID) {
      history.push(routes.MANAGE + `/${id}/view`);
    }
  };

  useEffect(() => {
    let isMounted = true;

    if (qMeetingID) {
      setLoading(true);
      getMeeting(qMeetingID).then(res => {
        if (res.err !== null) {
          alert(res.status === 404 ? 'Meeting not found' : res.err);
          setLoading(false);
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
  }, [qMeetingID, loadToggle]);

  const handleDelete = async () => {
    if (!meeting) return;
    setLoading(true);
    await deleteMeeting(String(meeting.id));
    setLoading(false);
    setMeeting(undefined);
  };

  const handleEdit = () => {
    if (!meeting) return;
    history.push(routes.MANAGE + `/${meeting.id}/edit`);
  };

  const handleSubmit = async (values: Values) => {
    if (meeting) {
      const meetingReq = formToMeetingRequest(values);
      const res = await updateMeeting(String(meeting.id), meetingReq);
      if (res.err !== null) {
        alert(res.err);
        return;
      }

      let msg = 'Update Successful';
      let id = String(meeting.id);

      if (res.data.newMeeting) {
        id = res.data.meetingID;
        msg += `\nThere is a new Meeting ID: ${res.data.meetingID}`;
      }

      alert(msg);
      history.push(routes.MANAGE + `/${id}/view`);
      setLoadToggle(s => !s);
    }
  };

  return (
    <Page className='manage-page' title='Manage a Meeting'>
      <IDInput meetingID={meeting?.id} onSubmit={handleIDSubmit} onDelete={handleDelete} onEdit={handleEdit} />
      <hr />
      {isLoading ? (
        <LinearProgress />
      ) : (
        meeting && (
          <Switch>
            <Redirect exact from={`${routes.MANAGE}/:meetingID`} to={`${routes.MANAGE}/:meetingID/view`} />

            <Route path={`${routes.MANAGE}/:meetingID/view`}>
              <MeetingDetails meeting={meeting} />
            </Route>
            <Route path={`${routes.MANAGE}/:meetingID/edit`}>
              <ZoomInputs action='Update' initialValues={meetingToFormVals(meeting)} onSubmit={handleSubmit} />
            </Route>
          </Switch>
        )
      )}
    </Page>
  );
};

type PathParams = {
  meetingID: string;
};
