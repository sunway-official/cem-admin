import { functions } from './helpers';
import moment from 'moment';

const validate = (values, props) => {
  const errors = {};
  const ArrayErrors = [];
  const requiredFields = [
    'title',
    'description',
    'date',
    'start',
    'end',
    'room',
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  if (values.end <= values.start) {
    errors.end = 'End time of schedule must be greater than start time!!!';
  }
  if (!values.schedules || !values.schedules.length) {
    errors.schedules = { _error: '.' };
  } else {
    const allSchedules = props.allSchedules;
    // console.log(scheduleIndex);
    // const checkAllSchedules = checkAllSchedules
    let checkError1 = true;
    console.log(values.schedules.length);
    const schedules = values.schedules;
    const length = schedules.length;
    let scheduleErrors = {};

    if (schedules.length > 0 && schedules[length - 1].date) {
      checkError1 = functions.checkAllSchedules(allSchedules, values.schedules);
      if (checkError1) {
        scheduleErrors.room = 'This room is choosing';
        ArrayErrors[length - 1] = scheduleErrors;
      }
    }

    // const checkError = functions.checkSchedules(values.schedules);
    console.log(checkError1);

    values.schedules.forEach((schedule, scheduleIndex) => {
      scheduleErrors = {};
      if (!schedule || !schedule.date) {
        scheduleErrors.date = 'Required';
        ArrayErrors[scheduleIndex] = scheduleErrors;
      }
      if (!schedule || !schedule.room) {
        scheduleErrors.room = 'Required';
        ArrayErrors[scheduleIndex] = scheduleErrors;
      }
      if (!schedule || !schedule.start) {
        scheduleErrors.start = 'Required';
        ArrayErrors[scheduleIndex] = scheduleErrors;
      }
      let startHours = 0;
      let endHours = 0;
      let startMinutes = 0;
      let endMinutes = 1;
      if (!schedule || !schedule.end) {
        scheduleErrors.end = 'Required';
        ArrayErrors[scheduleIndex] = scheduleErrors;
      } else if (schedule.start && schedule.end) {
        startHours = moment(schedule.start).hours();
        endHours = moment(schedule.end).hours();
        startMinutes = moment(schedule.start).minutes();
        endMinutes = moment(schedule.end).minutes();
      }

      if (
        startHours > endHours ||
        (startHours === endHours && startMinutes >= endMinutes)
      ) {
        scheduleErrors.end =
          'End time of schedule must be greater than start time and in the same day!!!';
        ArrayErrors[scheduleIndex] = scheduleErrors;
      }

      if (
        schedule.date &&
        (moment(schedule.date, 'DD/MM/YYYY HH:mm').isBefore(
          moment(props.start_date, 'DD/MM/YYYY HH:mm'),
        ) ||
          moment(schedule.date, 'DD/MM/YYYY HH:mm').isAfter(
            moment(props.end_date, 'DD/MM/YYYY HH:mm'),
          ))
      ) {
        scheduleErrors.date =
          'Please choose date from ' +
          moment(props.start_date).format('DD/MM/YYYY') +
          ' to ' +
          moment(props.end_date).format('DD/MM/YYYY');
        ArrayErrors[scheduleIndex] = scheduleErrors;
      }

      // check allschedules

      if (
        scheduleIndex === values.schedules.length - 1 &&
        values.schedules.length !== 1
      ) {
        const checkError = functions.checkSchedules(values.schedules);
        if (checkError) {
          scheduleErrors.room = 'This room is choosing';
          ArrayErrors[scheduleIndex] = scheduleErrors;
        }
      }
    });
    // console.log(ArrayErrors);
    if (ArrayErrors.length) {
      errors.schedules = ArrayErrors;
      props.checkError(true);
    } else {
      props.checkError(false);
    }
  }
  return errors;
};

export default validate;
