import { Button, Paper, TextField, Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import { Topbar } from 'layouts/components/Topbar';
import { getDotNotationProp } from 'utils/functions';
import { getStartURL } from 'utils/zoomer';
import * as yup from 'yup';
import './styles.scss';

export const HostJoinPage = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      console.log({ values });
      const res = await getStartURL(values.meetingID, values.hostJoinKey);
      setSubmitting(false);
      if (res.status === 404) {
        alert('Meeting not found');
      } else if (res.status === 401) {
        alert('Incorrect host join key');
      } else if (res.err !== null) {
        alert('An unknown error has occurred');
      } else {
        window.open(res.data.startURL);
      }
    },
  });

  const hasError = (name: Value) => {
    return Boolean(getDotNotationProp(name, formik.touched) && getDotNotationProp(name, formik.errors));
  };

  const getHelperText = (name: Value) => {
    return getDotNotationProp(name, formik.touched) && getDotNotationProp(name, formik.errors);
  };

  return (
    <div className='host-join-page'>
      <Topbar />
      <Paper className='card'>
        <Typography variant='h4'>Join a meeting as the host</Typography>
        <hr />
        <form className='form' onSubmit={formik.handleSubmit}>
          <TextField
            name='meetingID'
            label='Meeting ID'
            className='textfield'
            value={formik.values.meetingID}
            onChange={formik.handleChange}
            error={hasError('meetingID')}
            helperText={getHelperText('meetingID')}
          />
          <TextField
            name='hostJoinKey'
            label='Host Join Key'
            className='textfield'
            value={formik.values.hostJoinKey}
            onChange={formik.handleChange}
            error={hasError('hostJoinKey')}
            helperText={getHelperText('hostJoinKey')}
          />
          <Button type='submit' className='btn-join' color='primary' variant='contained' disabled={formik.isSubmitting}>
            Join
          </Button>
        </form>
      </Paper>
    </div>
  );
};

const initialValues = {
  hostJoinKey: '',
  meetingID: '',
};

type Values = typeof initialValues;
type Value = keyof Values;

const validationSchema = yup.object({
  hostJoinKey: yup.string().required('host join key is required'),
  meetingID: yup.string().required('meeting ID is required'),
});
