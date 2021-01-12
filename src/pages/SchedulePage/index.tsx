import './styles.scss';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from '@material-ui/core';
import { Page } from 'components/Page';
import { InputRow } from './components/InputRow';
import { Section } from './components/Section';
import { useFormik } from 'formik';
import * as yup from 'yup';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { addMinutes, addMonths } from 'date-fns';
import { KeyboardDatePicker, KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { InputSubRow } from './components/InputSubRow';
import {
  recurrenceMaxIntervals,
  recurrenceOcurrs,
  recurrenceTypes,
  ministries,
  recurrenceWeekDays,
  recurrenceMonthlyWeeks,
} from 'utils/constants';
import { formatSingularity, entriesOf, getDotNotationProp, keysOf, range } from 'utils/functions';

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
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <form onSubmit={formik.handleSubmit}>
          {/* Description Section */}
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

          {/* Time Section */}
          <Section>
            <InputRow label='When'>
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
            </InputRow>
            <InputRow label='Duration'>
              <FormControl className='select-control inline' margin='dense'>
                <FormControlLabel
                  label='hr'
                  className='form-control-label'
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
                      {range(0, 24).map(num => (
                        <MenuItem key={num} value={num}>
                          {num}
                        </MenuItem>
                      ))}
                    </Select>
                  }
                />
              </FormControl>
              <FormControl className='select-control inline' margin='dense'>
                <FormControlLabel
                  label='min'
                  className='form-control-label'
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
                      <MenuItem key={id} value={Number(id)}>
                        {label}
                      </MenuItem>
                    ))}
                  </Select>
                </InputSubRow>
                <InputSubRow label='Repeat every'>
                  <FormControl className='select-control inline' margin='dense' fullWidth>
                    <FormControlLabel
                      label={formatSingularity(
                        recurrenceTypes[formik.values.recurrence.type].unit,
                        formik.values.recurrence.repeat_interval
                      )}
                      className='form-control-label'
                      control={
                        <Select
                          className='form-control-select'
                          variant='outlined'
                          name='recurrence.repeat_interval'
                          value={formik.values.recurrence.repeat_interval}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={hasError('recurrence.repeat_interval' as any)}
                        >
                          {range(1, recurrenceMaxIntervals[formik.values.recurrence.type]).map(interval => (
                            <MenuItem key={interval} value={interval}>
                              {interval}
                            </MenuItem>
                          ))}
                        </Select>
                      }
                    />
                  </FormControl>
                </InputSubRow>
                {formik.values.recurrence.type === 2 && (
                  <InputSubRow label='Occurs on'>
                    <FormGroup row>
                      {entriesOf(recurrenceWeekDays).map(([id, { short }], idx) => (
                        <FormControl key={id} margin='dense'>
                          <FormControlLabel
                            label={short}
                            className='form-control-label'
                            control={
                              <Checkbox
                                name={`recurrence.weekly_days[${idx}]`}
                                checked={formik.values.recurrence.weekly_days[idx]}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                            }
                          />
                        </FormControl>
                      ))}
                    </FormGroup>
                  </InputSubRow>
                )}
                {formik.values.recurrence.type === 3 && (
                  <InputSubRow label='Occurs on'>
                    <RadioGroup
                      name='recurrence.monthlyType'
                      value={formik.values.recurrence.monthlyType}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <FormGroup row>
                        <FormControl margin='dense'>
                          <FormControlLabel label='Day' value='day' control={<Radio />} />
                        </FormControl>
                        <FormControl className='select-control inline' margin='dense'>
                          <FormControlLabel
                            className='form-control-label'
                            label='of the month'
                            control={
                              <Select
                                className='form-control-select'
                                MenuProps={{ PaperProps: { className: 'select-menu' } }}
                                variant='outlined'
                                name='recurrence.monthly_day'
                                value={formik.values.recurrence.monthly_day}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={hasError('recurrence.monthly_day' as any)}
                                disabled={formik.values.recurrence.monthlyType !== 'day'}
                              >
                                {range(1, 31).map(day => (
                                  <MenuItem key={day} value={day}>
                                    {day}
                                  </MenuItem>
                                ))}
                              </Select>
                            }
                          />
                        </FormControl>
                      </FormGroup>

                      <FormGroup row>
                        <FormControl margin='dense'>
                          <FormControlLabel label='The' value='week' control={<Radio />} />
                        </FormControl>
                        <FormControl className='select-control' margin='dense'>
                          <Select
                            //className='form-control-select'
                            MenuProps={{ PaperProps: { className: 'select-menu' } }}
                            variant='outlined'
                            name='recurrence.monthly_week'
                            value={formik.values.recurrence.monthly_week}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={hasError('recurrence.monthly_week' as any)}
                            disabled={formik.values.recurrence.monthlyType !== 'week'}
                          >
                            {entriesOf(recurrenceMonthlyWeeks).map(([id, label]) => (
                              <MenuItem key={id} value={Number(id)}>
                                {label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <FormControl className='select-control inline' margin='dense'>
                          <FormControlLabel
                            label='of the month'
                            className='form-control-label'
                            control={
                              <Select
                                className='form-control-select'
                                MenuProps={{ PaperProps: { className: 'select-menu' } }}
                                variant='outlined'
                                name='recurrence.monthly_week_day'
                                value={formik.values.recurrence.monthly_week_day}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={hasError('recurrence.monthly_week_day' as any)}
                                disabled={formik.values.recurrence.monthlyType !== 'week'}
                              >
                                {entriesOf(recurrenceWeekDays).map(([id, { long }]) => (
                                  <MenuItem key={id} value={id}>
                                    {long}
                                  </MenuItem>
                                ))}
                              </Select>
                            }
                          />
                        </FormControl>
                      </FormGroup>
                    </RadioGroup>
                  </InputSubRow>
                )}
                <InputSubRow label='End date'>
                  <RadioGroup
                    row
                    name='recurrence.endType'
                    value={formik.values.recurrence.endType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <FormGroup row>
                      <FormControl margin='dense'>
                        <FormControlLabel label='By' value='date' control={<Radio />} />
                      </FormControl>
                      <FormControl margin='dense' className='inline'>
                        <KeyboardDatePicker
                          variant='inline'
                          format='MM/dd/yyyy'
                          margin='dense'
                          minDate={minDate()}
                          name='recurrence.end_date_time'
                          value={formik.values.recurrence.end_date_time}
                          onChange={value => formik.setFieldValue('recurrence.end_date_time', value)}
                          onBlur={formik.handleBlur}
                          error={hasError('recurrence.end_date_time' as any)}
                          helperText={getHelperText('recurrence.end_date_time' as any)}
                          disabled={formik.values.recurrence.endType !== 'date'}
                        />
                      </FormControl>
                    </FormGroup>

                    <FormGroup row>
                      <FormControl margin='dense'>
                        <FormControlLabel label='After' value='occ' control={<Radio />} />
                      </FormControl>
                      <FormControl className='select-control inline' margin='dense'>
                        <FormControlLabel
                          label='occurrences'
                          className='form-control-label'
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
                              disabled={formik.values.recurrence.endType !== 'occ'}
                            >
                              {recurrenceOcurrs.map(occ => (
                                <MenuItem key={occ} value={occ}>
                                  {occ}
                                </MenuItem>
                              ))}
                            </Select>
                          }
                        />
                      </FormControl>
                    </FormGroup>
                  </RadioGroup>
                </InputSubRow>
              </>
            )}
          </Section>

          {/* Security Section */}
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

          {/* Video Section */}
          <Section>
            <InputSubRow topLabel='Video' label='Host'>
              <RadioGroup
                row
                name='settings.host_video'
                value={formik.values.settings.host_video ? 'on' : 'off'}
                onChange={e => formik.setFieldValue('settings.host_video', e.target.value === 'on')}
                onBlur={formik.handleBlur}
              >
                <FormControlLabel label='on' value={'on'} control={<Radio />} />
                <FormControlLabel label='off' value={'off'} control={<Radio />} />
              </RadioGroup>
            </InputSubRow>
            <InputSubRow label='Participant'>
              <RadioGroup
                row
                name='settings.participant_video'
                value={formik.values.settings.participant_video ? 'on' : 'off'}
                onChange={e => formik.setFieldValue('settings.participant_video', e.target.value === 'on')}
                onBlur={formik.handleBlur}
              >
                <FormControlLabel label='on' value={'on'} control={<Radio />} />
                <FormControlLabel label='off' value={'off'} control={<Radio />} />
              </RadioGroup>
            </InputSubRow>
          </Section>

          {/* Options Section */}
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
      </MuiPickersUtilsProvider>
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
    repeat_interval: 1,
    weekly_days: [false, false, false, false, false, false, false],
    monthlyType: 'day' as 'day' | 'week',
    monthly_day: 1,
    monthly_week: 1,
    monthly_week_day: 1,
    endType: 'date' as 'date' | 'occ',
    end_times: 7,
    end_date_time: addMonths(minDate(), 3),
  },
  passcode: '',
  hasWaitingRoom: false,
  settings: {
    host_video: false,
    participant_video: false,
  },
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
    hours: yup.number().integer().min(0).max(24).required(),
    minutes: yup.number().oneOf(durMinutes).required(),
    isRecurring: yup.boolean().required(),
    recurrence: values.isRecurring
      ? yup.object({
          type: yup.number().oneOf(keysOf(recurrenceTypes).map(Number)).required(),
          repeat_interval: yup.number().integer().min(1).max(recurrenceMaxIntervals[values.recurrence.type]).required(),
          weekly_days: values.recurrence.type === 2 ? yup.array().of(yup.bool()).required() : yup.mixed(),
          monthly_day:
            values.recurrence.type === 3 && values.recurrence.monthlyType === 'day'
              ? yup.number().integer().min(1).max(31).required()
              : yup.mixed(),
          monthly_week:
            values.recurrence.type === 3 && values.recurrence.monthlyType === 'week'
              ? yup.number().oneOf(keysOf(recurrenceMonthlyWeeks).map(Number)).required()
              : yup.mixed(),
          monthly_week_day:
            values.recurrence.type === 3 && values.recurrence.monthlyType === 'week'
              ? yup.number().integer().min(1).max(7).required()
              : yup.mixed(),
          endType: yup.string().oneOf(['date', 'occ']).required(),
          end_times:
            values.recurrence.endType === 'occ' ? yup.number().oneOf(recurrenceOcurrs).required() : yup.mixed(),
          end_date_time:
            values.recurrence.endType === 'date'
              ? yup.date().min(minDate(), 'date must be in the future').typeError('invalid date').required()
              : yup.mixed(),
        })
      : yup.mixed(),
    passcode: yup.string().max(10).required(),
    hasWaitingRoom: yup.boolean().required(),
    settings: yup.object({
      host_video: yup.bool().required(),
      participant_video: yup.bool().required(),
    }),
    canJoinAnytime: yup.boolean().required(),
    muteParticipants: yup.boolean().required(),
    autoRecord: yup.boolean().required(),
  });
