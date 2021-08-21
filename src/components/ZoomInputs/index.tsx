import DateFnsUtils from '@date-io/date-fns';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from '@material-ui/core';
import { KeyboardDatePicker, KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import 'date-fns';
import { addMinutes } from 'date-fns';
import { useFormik } from 'formik';
import { useMemo } from 'react';
import { rrulestr } from 'rrule';
import {
  ministries,
  recurrenceMaxIntervals,
  recurrenceMonthlyWeeks,
  recurrenceOcurrs,
  recurrenceTypes,
  recurrenceWeekDays,
} from 'utils/constants';
import { entriesOf, formatSingularity, getDotNotationProp, keysOf, range } from 'utils/functions';
import * as yup from 'yup';
import { InputRow } from '../../components/ZoomInputs/components/InputRow';
import { InputSubRow } from '../../components/ZoomInputs/components/InputSubRow';
import { Section } from '../../components/ZoomInputs/components/Section';
import { zoomToRFCRecurrence } from './recurrence';
import './styles.scss';

export const ZoomInputs = (props: Props) => {
  const formik = useFormik({
    initialValues: props.initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const weekly_days = [...values.recurrence.weekly_days] as typeof values.recurrence.weekly_days;
      // if no day chosen
      if (weekly_days.every(d => !d)) {
        const startDay = values.start_time.getDay();
        weekly_days[startDay] = true;
      }
      const recurrence: Values['recurrence'] = { ...values.recurrence, weekly_days };

      const shouldReset = await props.onSubmit({ ...values, recurrence });
      setSubmitting(false);

      if (shouldReset) {
        resetForm();
      }
    },
  });

  //Calculate last date for 50 occurrences
  const maxReccurDate = useMemo(() => {
    return getMaxReccurDate(formik.values.start_time, formik.values.recurrence);
  }, [formik.values.start_time, formik.values.recurrence]);

  const hasError = (name: Value) => {
    return Boolean(getDotNotationProp(name, formik.touched) && getDotNotationProp(name, formik.errors));
  };

  const getHelperText = (name: Value) => {
    return getDotNotationProp(name, formik.touched) && getDotNotationProp(name, formik.errors);
  };

  const HelperText = (props: { name: Value }) => (
    <FormHelperText variant='outlined' error={true}>
      {getHelperText(props.name)}
    </FormHelperText>
  );

  return (
    <div className='zoom-inputs'>
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
                name='agenda'
                value={formik.values.agenda}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={hasError('agenda')}
                helperText={getHelperText('agenda')}
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
                <HelperText name='ministry' />
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
                name='start_time'
                value={formik.values.start_time}
                onChange={value => formik.setFieldValue('start_time', value)}
                onBlur={formik.handleBlur}
                error={hasError('start_time')}
                helperText={getHelperText('start_time')}
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
                      name='duration.hours'
                      value={formik.values.duration.hours}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={hasError('duration.hours' as any)}
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
                      name='duration.minutes'
                      value={formik.values.duration.minutes}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={hasError('duration.minutes' as any)}
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
                        <>
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
                        </>
                      }
                    />
                    <HelperText name={'recurrence.repeat_interval' as Value} />
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
                          minDate={formik.values.start_time}
                          maxDate={maxReccurDate}
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
                      name='settings.waiting_room'
                      checked={formik.values.settings.waiting_room}
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
                      name='settings.join_before_host'
                      checked={formik.values.settings.join_before_host}
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
                      name='settings.mute_upon_entry'
                      checked={formik.values.settings.mute_upon_entry}
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
                      name='settings.auto_recording'
                      checked={formik.values.settings.auto_recording}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  }
                />
              </FormControl>
            </InputRow>
          </Section>

          <Button variant='contained' color='primary' type='submit' disabled={formik.isSubmitting}>
            {props.action}
          </Button>
        </form>
      </MuiPickersUtilsProvider>
    </div>
  );
};

type Props = {
  initialValues: Values;
  action: string;
  /** Returns weather or not to reset the form */
  onSubmit: (values: Values) => boolean | Promise<boolean>;
};

const minDate = () => addMinutes(new Date(), 15);

export type Values = {
  topic: string;
  agenda: string;
  ministry: string;
  start_time: Date;
  duration: {
    hours: number;
    minutes: number;
  };
  isRecurring: boolean;
  recurrence: {
    type: keyof typeof recurrenceTypes;
    repeat_interval: number;
    weekly_days: [boolean, boolean, boolean, boolean, boolean, boolean, boolean];
    monthlyType: 'day' | 'week';
    monthly_day: number;
    monthly_week: '-1' | 1 | 2 | 3 | 4;
    monthly_week_day: number;
    endType: 'date' | 'occ';
    end_times: number;
    end_date_time: Date;
  };
  passcode: string;
  settings: {
    waiting_room: boolean;
    host_video: boolean;
    participant_video: boolean;
    join_before_host: boolean;
    mute_upon_entry: boolean;
    auto_recording: boolean;
  };
};

type Value = keyof Values;

const getMaxReccurDate = (startDate: Values['start_time'], reccurrence: Values['recurrence']) => {
  const r = reccurrence;
  const weekly_days = [...r.weekly_days] as typeof r.weekly_days;
  // if no day chosen
  if (weekly_days.every(d => !d)) {
    const startDay = startDate.getDay();
    weekly_days[startDay] = true;
  }
  const maxReccurrence: Values['recurrence'] = { ...r, weekly_days, endType: 'occ', end_times: 50 };
  const rrule = zoomToRFCRecurrence(maxReccurrence, startDate.toISOString());
  const dates = rrulestr(rrule).all();
  return dates[dates.length - 1];
};

const durMinutes = [0, 15, 30, 45];

const validationSchema = () =>
  yup.lazy((values: Values) =>
    yup.object({
      topic: yup.string().required(),
      agenda: yup.string().max(1800, 'Must be 1800 characters or less'),
      ministry: yup
        .string()
        .oneOf(ministries.map(m => m[0]))
        .required(),
      start_time: yup.date().typeError('invalid date').required(),
      duration: yup
        .object({
          hours: yup.number().integer().min(0).max(24).required(),
          minutes: yup.number().oneOf(durMinutes).required(),
        })
        .required(),
      isRecurring: yup.boolean().required(),
      recurrence: values.isRecurring
        ? yup.object({
            type: yup.number().oneOf(keysOf(recurrenceTypes).map(Number)).required(),
            repeat_interval: yup
              .number()
              .integer()
              .min(1)
              .max(recurrenceMaxIntervals[values.recurrence.type])
              .required(),
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
              values.recurrence.endType === 'occ' ? yup.number().integer().min(1).max(50).required() : yup.mixed(),
            end_date_time:
              values.recurrence.endType === 'date'
                ? yup
                    .date()
                    .min(values.start_time, 'end date must be after start date')
                    .max(getMaxReccurDate(values.start_time, values.recurrence), 'cannot have more than 50 occurrences')
                    .typeError('invalid date')
                    .required()
                : yup.mixed(),
          })
        : yup.mixed(),
      passcode: yup.string().max(10).required(),
      settings: yup.object({
        waiting_room: yup.boolean().required(),
        host_video: yup.bool().required(),
        participant_video: yup.bool().required(),
        join_before_host: yup.boolean().required(),
        mute_upon_entry: yup.boolean().required(),
        auto_recording: yup.boolean().required(),
      }),
    })
  );
