import { createSelector } from 'reselect';
import moment from 'moment/moment';
import _ from 'lodash';

const getCurrentDrivingSchool = state => state.context.currentDrivingSchoolID;
const getSlots = state => Object.values(state.slots.data);
const getLessons = state => state.drivingLessons.hashMap;
const getSelectedEmployee = state => state.employeeDailyAgenda.employeeId;
const getEmployeeDailyAgendaDay = state => state.employeeDailyAgenda.daySelected;
const getCurrentUser = state => state.user;
const employeesSummaryAgendaDay = state => state.employeesSummaryAgenda.daySelected;

export const getEmployeesSummaryAgenda = createSelector(
  [getSlots, employeesSummaryAgendaDay],
  (slots, selectedDay) =>
    _.chain(slots)
    .filter(slot => moment(slot.start_time).isSame(selectedDay, 'day'))
    .groupBy(slot => moment(slot.start_time).format('YYYY-MM-DD'))
    .mapValues((arrayOfSlots, key, object) =>
      _.chain(arrayOfSlots)
      .groupBy('employee_id')
      .values()
      .value()
    )
    .value()
);

export const getDrivingSchoolsSlots = createSelector(
  [getSlots, getCurrentDrivingSchool],
  (slots, id) => {
    return slots.filter( slot => slot.driving_school_id === id)
  }
);

export const getEmployeeSlots = createSelector(
  [getDrivingSchoolsSlots, getSelectedEmployee],
  (slots, id) => {
    return slots.filter( slot => slot.employee_id === id)
  }
);

export const getEmployeeSlotsForADay = createSelector(
  [getEmployeeSlots, getEmployeeDailyAgendaDay],
  (slots, day) => {
    return slots.filter(slot => moment(slot.start_time).isSame(day, 'day'))
  }
);

export const getSlotsNotBelongingToLesson = createSelector(
  [getEmployeeSlotsForADay],
  slots => {
    return slots.filter( slot => slot.driving_lesson_id === null ).map(slot => {
      const end_time = moment.utc(slot.start_time).add(30, 'minutes').format();
      return { ...slot, end_time }
    })
  }
);

export const getSlotsHavingToLesson = createSelector(
  [getEmployeeSlotsForADay],
  slots => {
    return slots.filter( slot => slot.driving_lesson_id !== null)
  }
);

export const lessonsForSlots = createSelector(
  [getSlotsHavingToLesson, getLessons],
  (slots, lessons) => {
    return _.chain(slots)
            .groupBy( slot => slot.driving_lesson_id )
            .values()
            .map(lessonSlots => {
              const lessonId = lessonSlots[0].driving_lesson_id;
              const sorted = lessonSlots
                .sort((left, right) => moment(left.start_time).diff(moment(right.start_time)));
              const lastSlotStartTime = _.last(sorted).start_time;
              const end_time = moment.utc(lastSlotStartTime).add(30, 'minutes').format()
              return { ...lessons[lessonId], end_time }
            })
            .value()
  }
);


export const getEmployeeDailyAgenda = createSelector(
  [getSlotsNotBelongingToLesson, lessonsForSlots],
  (slots, lessons) => {
    console.log('************************************')
    console.log('************************************')
    console.log('************************************')
    console.log('************************************')
    console.log('slots');
    console.log(slots);
    console.log('lessons');
    console.log(lessons);

    const lessonsAndSlots = [...slots, ...lessons]
      .sort((left, right) => moment(left.start_time).diff(moment(right.start_time)));

    console.log('lessonsAndSlots');
    console.log(lessonsAndSlots);

    const withPossibleBreaks = lessonsAndSlots.reduce((acc, current, index, array) => {
      if(_.last(array) === current) {
        acc.push(current);
        return acc;
      }

      let differenceInMinutes = moment(array[index+1].start_time).diff(current.end_time, 'minutes');
      console.log('=========================');
      console.log('next');
      console.log(array[index+1]);
      console.log('current');
      console.log(current);
      console.log('differenceInMinutes');
      console.log(differenceInMinutes);

      if(differenceInMinutes > 0) {
        acc.push([current, { isBreakSlot: true, start_time: current.end_time }]);
        return acc;
      }

      acc.push(current);
      return acc;
    }, []);

    const all = _.flattenDeep(withPossibleBreaks);

    console.log('all');
    console.log(all);

    return  { [moment.utc(all[0].start_time).format('YYYY-MM-DD')]: all }
  }
);

export const getSelectedSlots = createSelector(
  [getEmployeeSlotsForADay, getCurrentUser],
  (slots, currentUser) => slots.filter( slot => {
    return moment(slot.release_at).isAfter() && currentUser.id === slot.locking_user_id && slot.driving_lesson_id === null
  })
);

export const getLessonInterval = createSelector(
  [getSelectedSlots],
  slots => {
    if(slots.length === 0) return null;

    const from = moment(_.first(slots).start_time).format('HH:mm');
    const to = moment(_.last(slots).start_time).add(30, 'minutes').format('HH:mm');

    return {
      from,
      to
    }
  }
);
