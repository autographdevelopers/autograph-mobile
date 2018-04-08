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
    return slots.filter( slot => slot.driving_lesson_id === null)
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
            .map(slot => slot.driving_lesson_id)
            .uniq()
            .map(id => lessons[id])
            .value();
  }
);

export const getEmployeeDailyAgenda = createSelector(
  [getSlotsNotBelongingToLesson, lessonsForSlots],
  (slots, lessons) => {
    const lessonsAndSlots = [...slots, ...lessons]
      .sort((left, right) => moment.utc(left.start_time).diff(moment.utc(right.start_time)));

    return _.groupBy(lessonsAndSlots, item => moment(item.start_time).format('YYYY-MM-DD'))
  }
);

export const getSelectedSlots = createSelector(
  [getEmployeeSlotsForADay, getCurrentUser],
  (slots, currentUser) => slots.filter( slot => {
    return moment(slot.release_at).isAfter(moment.utc()) && currentUser.id === slot.locking_user_id && slot.driving_lesson_id === null
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
