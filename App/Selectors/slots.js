import { createSelector } from 'reselect';
import _ from 'lodash';
import moment from 'moment/moment';

const getCurrentDrivingSchool = state => state.context.currentDrivingSchoolID;
const getSlots = state => Object.values(state.slots.data);
const getLessons = state => state.drivingLessons.hashMap;
const getSelectedEmployeeId = state => state.calendar.selectedEmployeeId;
const getCurrentDay = state => state.calendar.daySelected;
const getCurrentUser = state => state.user;
const employeesSummaryAgendaDay = state => state.employeesSummaryAgenda.daySelected;

export const getEmployeesSummaryAgenda = createSelector(
  [getSlots, employeesSummaryAgendaDay],
  // PROBLEM HERE 
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


// export const allEmployeesSlotsForDay = createSelector(
//   [getSlots, getCurrentDay],
//   (slots, selectedDay) => {
//     return _.chain(slots).filter(slot => moment(slot.start_time).isSame(selectedDay, 'day'))
//             .groupBy(slot => moment(slot.start_time).format('YYYY-MM-DD'))
//             .value()
//   }
// );
//
//
// export const dailySlotsForEachEmployee = createSelector(
//   [allEmployeesSlotsForDay],
//   slots => {
//     return _.chain(slots)
//             .mapValues((value, key, object) => {
//                 return _.chain(value)
//                         .groupBy('employee_id')
//                         .values()
//                         .value()
//             })
//             .value()
//   }
// );
// export const getSlotsForDrivingSchool = createSelector(
//   [getSlots, getCurrentDrivingSchool],
//   (slots, schoolId )=> slots.filter(slot => slot.driving_school_id === schoolId)
// );
// TODO don't I need to filter by school id?'
export const employeeSlots = createSelector(
  [getSlots, getSelectedEmployeeId],
  (slots, id) => slots.filter( slot => slot.employee_id === id)
);

export const slotsNotBelongingToLesson = createSelector(
  [employeeSlots],
  slots => slots.filter( slot => slot.driving_lesson_id === null)
);

export const slotsBelongingToLesson = createSelector(
  [employeeSlots],
  slots => slots.filter( slot => slot.driving_lesson_id !== null)
);

export const lessonsForSlots = createSelector(
  [slotsBelongingToLesson, getLessons],
  (slots, lessons) => {
    console.log('lessonsForSlots');
    return _.chain(slots)
            .map(slot => slot.driving_lesson_id)
            .uniq()
            .map(id => lessons[id])
            .value();
  }
);

export const slotsAndLessons = createSelector(
  [slotsNotBelongingToLesson, lessonsForSlots],
  (slots, lessons) => {
    console.log('slotsAndLessons');
    console.log(slots);
    console.log(lessons);

    return [...slots, ...lessons]
      .sort((left, right) => {
        return moment.utc(left.start_time).diff(moment.utc(right.start_time))
      });
  }
);

export const slotsAndLessonsForDay = createSelector(
  [slotsAndLessons, getCurrentDay],
  (slotsAndLessons, day) => {
    console.log('slotsAndLessonsForDay');
    console.log(slotsAndLessons);
    console.log(day);

    return _.chain(slotsAndLessons)
            .groupBy(slot => moment(slot.start_time).format('YYYY-MM-DD'))
            .pick([day])
            .value();
  }
);

export const selectedSlots = createSelector(
  [slotsNotBelongingToLesson, getCurrentUser],
  (slots, currentUser) => slots.filter( slot => {
    console.log('selectedSlots');

    return moment(slot.release_at).isAfter(moment.utc())
      && currentUser.id === slot.locking_user_id
  })
);

export const lessonInterval = createSelector(
  [selectedSlots],
  slots => {
    console.log('lessonInterval');

    if(slots.length === 0) return null;

    const from = moment(_.first(slots).start_time).format('HH:mm');
    const to = moment(_.last(slots).start_time).add(30, 'minutes').format('HH:mm');

    return {
      from,
      to
    }
  }
);
