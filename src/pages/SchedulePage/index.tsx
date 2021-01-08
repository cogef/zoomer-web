import './styles.scss';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { Page } from 'components/Page';
import { InputRow } from './components/InputRow';
import { Section } from './components/Section';
import { ministries } from 'utils/constants/cogef';
import { useFormik } from 'formik';
import * as yup from 'yup';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import addMinutes from 'date-fns/addMinutes';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

export const SchedulePage = () => {
  const formik = useFormik({
    initialValues,
    validationSchema: getSchema(),
    onSubmit: values => {
      console.log({ values });
    },
  });

  const hasError = (name: Value) => {
    return Boolean(formik.touched[name] && formik.errors[name]);
  };

  const getHelperText = (name: Value) => {
    return formik.touched[name] && formik.errors[name];
  };

  return (
    <Page className='schedule-page' title='Schedule a Meeting'>
      <form onSubmit={formik.handleSubmit}>
        <Section>
          <InputRow label='Topic'>
            <TextField
              className='input'
              variant='outlined'
              size='small'
              fullWidth
              name='topic'
              value={formik.values.topic}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={hasError('topic')}
              helperText={getHelperText('topic')}
            />
          </InputRow>
          <InputRow label='Description (Optional)'>
            <TextField
              multiline
              rowsMax={10}
              className='input'
              variant='outlined'
              size='small'
              fullWidth
              name='description'
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={hasError('description')}
              helperText={getHelperText('description')}
            />
          </InputRow>
          <InputRow label='Ministry'>
            <FormControl className='select-control' margin='dense' fullWidth>
              <Select
                variant='outlined'
                name='ministry'
                value={formik.values.ministry}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={hasError('ministry')}
              >
                {ministries.map(([id, ministry]) => (
                  <MenuItem key={id} value={id}>
                    {ministry}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </InputRow>
        </Section>

        <Section>
          <InputRow label='When'>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDateTimePicker
                variant='inline'
                format='MM/dd/yyyy hh:mm a'
                margin='dense'
                minDate={minDate()}
                name='date'
                value={formik.values.date}
                onChange={value => formik.setFieldValue('date', value)}
                onBlur={formik.handleBlur}
                error={hasError('date')}
                helperText={getHelperText('date')}
              />
            </MuiPickersUtilsProvider>
          </InputRow>
          <InputRow label='Duration'>
            <FormControl className='select-control' margin='dense'>
              <FormControlLabel
                label='hr'
                control={
                  <Select
                    variant='outlined'
                    name='hours'
                    value={formik.values.hours}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={hasError('hours')}
                  >
                    {new Array(25).fill(null).map((_, idx) => (
                      <MenuItem key={idx} value={idx}>
                        {idx}
                      </MenuItem>
                    ))}
                  </Select>
                }
              />
            </FormControl>
            <FormControl className='select-control' margin='dense'>
              <FormControlLabel
                label='min'
                control={
                  <Select
                    variant='outlined'
                    name='minutes'
                    value={formik.values.minutes}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={hasError('minutes')}
                  >
                    {durMinutes.map(min => (
                      <MenuItem key={min} value={min}>
                        {min}
                      </MenuItem>
                    ))}
                  </Select>
                }
              />
            </FormControl>
          </InputRow>
          <InputRow label=''>
            <FormControl className='select-control' margin='dense' fullWidth>
              <FormControlLabel
                label='Recurring Meeting'
                control={
                  <Checkbox
                    name='isRecurring'
                    checked={formik.values.isRecurring}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                }
              />
            </FormControl>
          </InputRow>
        </Section>

        <Section>
          <InputRow label='Passcode'>
            <TextField
              className='input'
              variant='outlined'
              size='small'
              name='passcode'
              value={formik.values.passcode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={hasError('passcode')}
              helperText={getHelperText('passcode')}
            />
          </InputRow>
          <InputRow label=''>
            <FormControl className='select-control' margin='dense' fullWidth>
              <FormControlLabel
                label='Recurring Meeting'
                control={
                  <Checkbox
                    name='hasWaitingRoom'
                    checked={formik.values.hasWaitingRoom}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                }
              />
            </FormControl>
          </InputRow>
        </Section>

        <Section>
          <InputRow label='Meeting Options'>
            <FormControl className='select-control' margin='dense' fullWidth>
              <FormControlLabel
                label='Allow participants to join anytime'
                control={
                  <Checkbox
                    name='canJoinAnytime'
                    checked={formik.values.canJoinAnytime}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                }
              />
            </FormControl>
          </InputRow>
          <InputRow label=''>
            <FormControl className='select-control' margin='dense' fullWidth>
              <FormControlLabel
                label='Mute participants upon entry'
                control={
                  <Checkbox
                    name='muteParticipants'
                    checked={formik.values.muteParticipants}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                }
              />
            </FormControl>
          </InputRow>
          <InputRow label=''>
            <FormControl className='select-control' margin='dense' fullWidth>
              <FormControlLabel
                label='Automatically record meeting on the local computer'
                control={
                  <Checkbox
                    name='autoRecord'
                    checked={formik.values.autoRecord}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                }
              />
            </FormControl>
          </InputRow>
        </Section>

        <Button variant='contained' color='primary' type='submit'>
          Schedule
        </Button>
      </form>
    </Page>
  );
};

const initialValues = {
  topic: '',
  description: '',
  ministry: '',
  date: new Date(),
  hours: 1,
  minutes: 0,
  isRecurring: false,
  passcode: '',
  hasWaitingRoom: false,
  canJoinAnytime: false,
  muteParticipants: true,
  autoRecord: false,
};

type Value = keyof typeof initialValues;

const minDate = () => addMinutes(new Date(), 15);
const durMinutes = [0, 15, 30, 45];

const getSchema = () =>
  yup.object({
    topic: yup.string().required(),
    description: yup.string().max(1800, 'Must be 1800 characters or less'),
    ministry: yup
      .string()
      .oneOf(ministries.map(m => m[0]))
      .required(),
    date: yup
      .date()
      .min(minDate(), 'date must be at least 15 minutes in the future')
      .typeError('invalid date')
      .required(),
    hours: yup.number().min(0).max(24).required(),
    minutes: yup.number().oneOf(durMinutes).required(),
    isRecurring: yup.boolean().required(),
    passcode: yup.string().required(),
    hasWaitingroom: yup.boolean().required(),
    canJoinAnytime: yup.boolean().required(),
    muteParticipants: yup.boolean().required(),
    autoRecord: yup.boolean().required(),
  });
