import { Button, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import classes from './IDInput.module.scss';

export const IDInput = (props: Props) => {
  const formik = useFormik({
    initialValues,
    onSubmit: async (values, { setSubmitting }) => {
      await props.onSubmit(values);
      setSubmitting(false);
    },
  });
  return (
    <form className={classes['id-input']} onSubmit={formik.handleSubmit}>
      <TextField
        className={classes.textfield}
        label='Meeting ID'
        value={formik.values.meetingID}
        onChange={formik.handleChange}
        name='meetingID'
      />
      <Button
        className={classes.btn_find}
        variant='contained'
        color='primary'
        type='submit'
        disabled={formik.isSubmitting}
      >
        Find
      </Button>
      <Button
        className={classes.btn_delete}
        color='primary'
        variant='contained'
        type='submit'
        disabled={formik.isSubmitting || !props.meetingID}
        onClick={props.onDelete}
      >
        Delete
      </Button>
    </form>
  );
};

const initialValues = {
  meetingID: '',
};

export type IDValues = typeof initialValues;

type Props = {
  onSubmit: (values: IDValues) => Promise<void>;
  onDelete: () => void;
  meetingID: number | undefined;
};
