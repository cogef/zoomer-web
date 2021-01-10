import './styles.scss';
import { Button, Checkbox, FormControl, FormControlLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { Page } from 'components/Page';
import { InputRow } from './components/InputRow';
import { Section } from './components/Section';
import { useFormik } from 'formik';
import * as yup from 'yup';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { addMinutes, addMonths } from 'date-fns';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { InputSubRow } from './components/InputSubRow';
import { recurrenceIntervals, recurrencesOcurrs, recurrenceTypes, ministries } from 'utils/constants';
import { formatSingularity, entriesOf, getDotNotationProp, keysOf } from 'utils/functions';

export const SchedulePage = () => {
  const formik = useFormik({
    initialValues,
    validationSchema: () => yup.lazy(values => getSchema(values)),
    onSubmit: values => {
      console.log({ values });
    },
  });

  const hasError = (name: Value) => {
    return Boolean(getDotNotationProp(name, formik.touched) && getDotNotationProp(name, formik.errors));
  };

  const getHelperText = (name: Value) => {
    return getDotNotationProp(name, formik.touched) && getDotNotationProp(name, formik.errors);
  };

  console.log({ errors: formik.errors, values: formik.values });

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
                className='duration-control'
                control={
                  <Select
                    className='form-control-select'
                    MenuProps={{ PaperProps: { className: 'select-menu' } }}
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
                className='duration-control'
                control={
                  <Select
                    className='form-control-select'
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
            <FormControl margin='dense' fullWidth>
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
          {formik.values.isRecurring && (
            <>
              <InputSubRow label='Recurrence'>
                <Select
                  variant='outlined'
                  name='recurrence.type'
                  value={formik.values.recurrence.type}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={hasError('recurrence.type' as any)}
                >
                  {entriesOf(recurrenceTypes).map(([id, { label }]) => (
                    <MenuItem key={id} value={id}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
              </InputSubRow>
              <InputSubRow label='Repeat every'>
                <FormControl className='select-control' margin='dense' fullWidth>
                  <FormControlLabel
                    label={formatSingularity(
                      recurrenceTypes[formik.values.recurrence.type].unit,
                      formik.values.recurrence.interval
                    )}
                    className='duration-control'
                    control={
                      <Select
                        className='form-control-select'
                        variant='outlined'
                        name='recurrence.interval'
                        value={formik.values.recurrence.interval}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={hasError('recurrence.interval' as any)}
                      >
                        {recurrenceIntervals[formik.values.recurrence.type].map(interval => (
                          <MenuItem key={interval} value={interval}>
                            {interval}
                          </MenuItem>
                        ))}
                      </Select>
                    }
                  />
                </FormControl>
              </InputSubRow>
              <InputSubRow label='End date'>
                <FormControl className='select-control' margin='dense'>
                  <FormControlLabel
                    label='occurrences'
                    className='duration-control'
                    control={
                      <Select
                        className='form-control-select'
                        MenuProps={{ PaperProps: { className: 'select-menu' } }}
                        variant='outlined'
                        name='recurrence.end_times'
                        value={formik.values.recurrence.end_times}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={hasError('recurrence.end_times' as any)}
                      >
                        {recurrencesOcurrs.map(occ => (
                          <MenuItem key={occ} value={occ}>
                            {occ}
                          </MenuItem>
                        ))}
                      </Select>
                    }
                  />
                </FormControl>
              </InputSubRow>
            </>
          )}
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
                label='Waiting Room'
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

const minDate = () => addMinutes(new Date(), 15);

const initialValues = {
  topic: '',
  description: '',
  ministry: '',
  date: minDate(),
  hours: 1,
  minutes: 0,
  isRecurring: false,
  recurrence: {
    type: 1 as keyof typeof recurrenceTypes,
    interval: 1,
    endType: 'date' as 'date' | 'occ',
    end_times: 7,
    end_date_time: addMonths(minDate(), 3),
  },
  passcode: '',
  hasWaitingRoom: false,
  canJoinAnytime: false,
  muteParticipants: true,
  autoRecord: false,
};

type Value = keyof typeof initialValues;

const durMinutes = [0, 15, 30, 45];

const getSchema = (values: typeof initialValues) =>
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
    recurrence: values.isRecurring
      ? yup.object({
          type: yup.number().oneOf(keysOf(recurrenceTypes).map(Number)).required(),
          interval: yup.number().oneOf(recurrenceIntervals[values.recurrence.type]).required(),
          endType: yup.string().oneOf(['date', 'occ']).required(),
          end_times:
            values.recurrence.endType === 'occ' ? yup.number().oneOf(recurrencesOcurrs).required() : yup.number(),
          end_date_time:
            values.recurrence.endType === 'date'
              ? yup.date().min(minDate(), 'date must be in the future').typeError('invalid date').required()
              : yup.date(),
        })
      : yup.object(),
    passcode: yup.string().required(),
    hasWaitingRoom: yup.boolean().required(),
    canJoinAnytime: yup.boolean().required(),
    muteParticipants: yup.boolean().required(),
    autoRecord: yup.boolean().required(),
  });
