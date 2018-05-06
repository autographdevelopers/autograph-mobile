import { createSelector } from 'reselect';
import moment from 'moment/moment';
import _ from 'lodash';
import { getCurrentDrivingSchool as getCurrentDrivingSchoolObject } from './DrivingSchool';
import { timeHelpers } from '../Lib/timeHandlers';
import { SLOTS_FETCHED_CALLBACKS } from '../Redux/Entities/SlotsRedux';

const getSlots = state => Object.values(state.entities.slots.data);
const getLessons = state => state.entities.drivingLessons.hashMap;
const getSelectedEmployee = state => state.views.employeeDailyAgenda.employeeId;
const getEmployeeDailyAgendaDay = state => state.views.employeeDailyAgenda.daySelected;
const getCurrentUser = state => state.access.currentUser;
const employeesSummaryAgendaDay = state => state.views.employeesSummaryAgenda.daySelected;
const getSelectedDayInSummaryAgenda = state => state.views.employeesSummaryAgenda.daySelected;
const getSelectedDayInEmployeeDailyAgenda = state => state.views.employeeDailyAgenda.daySelected;
const getEmployeeInEmployeeDailyAgenda = state => state.views.employeeDailyAgenda.employeeId;


const compareStartTimes = (left, right) => {
  return moment(left.start_time).diff(moment(right.start_time));
};

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
     .value(),
);

export const getDrivingSchoolsSlots = createSelector(
  [getSlots, getCurrentDrivingSchoolObject],
  (slots, school) => {
    if(!school) return; /** Guards for the scenarios when during logout store is cleared */

    return slots.filter(slot => slot.driving_school_id === school.id);
  },
);

export const getEmployeeSlots = createSelector(
  [getDrivingSchoolsSlots, getSelectedEmployee],
  (slots, id) => {
    return slots.filter(slot => slot.employee_id === id);
  },
);

export const getEmployeeSlotsForADay = createSelector(
  [getEmployeeSlots, getEmployeeDailyAgendaDay, getCurrentUser],
  (slots, day, currentUser) => {

    const filteringCondition = userType => {
      switch(userType) {
        case 'Employee':
          return slot => {
            return moment(slot.start_time).isSame(day, 'day');
          };
        case 'Student':
          return slot => {
            return moment(slot.start_time).isSame(day, 'day')
              && moment(slot.start_time).isAfter()
          }
      }
    };

    return slots.filter(filteringCondition(currentUser.type));
  }
);

export const getSlotsNotBelongingToLesson = createSelector(
  [getEmployeeSlotsForADay],
  slots => {
    return slots.filter(slot => slot.driving_lesson_id === null).map(slot => {
      const end_time = moment.utc(slot.start_time).add(30, 'minutes').format();
      return { ...slot, end_time };
    });
  },
);

export const getSlotsHavingLesson = createSelector(
  [getEmployeeSlotsForADay],
  slots => {
    return slots.filter(slot => slot.driving_lesson_id !== null);
  },
);

export const lessonsForSlots = createSelector(
  [getSlotsHavingLesson, getLessons],
  (slots, lessons) => {

    return _.chain(slots)
            .groupBy(slot => slot.driving_lesson_id)
            .values()
            .map(lessonSlots => {
              const lessonId = lessonSlots[0].driving_lesson_id;
              const sorted = lessonSlots
                .sort((left, right) => moment(left.start_time)
                  .diff(moment(right.start_time)));
              const lastSlotStartTime = _.last(sorted).start_time;
              const start_time = _.first(sorted).start_time;
              const end_time = moment.utc(lastSlotStartTime)
                                     .add(30, 'minutes')
                                     .format();
              return { ...lessons[lessonId], end_time, start_time, isLesson: true };
            })
            .value();
  },
);

export const getAgendaItemsArray = createSelector(
  [getSlotsNotBelongingToLesson, lessonsForSlots],
  (slots, lessons) => {
    const lessonsAndSlots = [...slots, ...lessons].sort(compareStartTimes);

    return lessonsAndSlots.reduce(
      (acc, current, index, array) => {
        let differenceInMinutes;

        if ( _.last(array) === current ) {
          differenceInMinutes = 0;
        } else {
          differenceInMinutes = moment(array[index + 1].start_time)
            .diff(current.end_time, 'minutes');
        }

        if ( !moment(current.start_time).isAfter() && !current.slots &&
          !current.isLesson ) {
          if ( _.last(acc) && _.last(acc).isWasted ) {
            _.last(acc).end_time = current.end_time;
          } else {
            current.isWasted = true;
            acc.push(current);
          }
        } else {
          acc.push(current);
        }

        if ( differenceInMinutes > 0 )
          acc.push({ isBreakSlot: true, start_time: current.end_time });

        return acc;
      }, []
    )
  }
);

export const getEmployeeDailyAgenda = createSelector(
  [getAgendaItemsArray],
  items => {
    return _.groupBy(items, slot => moment.utc(slot.start_time).format('YYYY-MM-DD'));
  },
);

export const getSelectedSlots = createSelector(
  [getAgendaItemsArray, getCurrentUser],
  (slots, currentUser) => slots.filter(slot => {
    return slot.release_at && moment(slot.release_at).isAfter() && currentUser.id ===
      slot.locking_user_id && slot.driving_lesson_id === null;
  }).sort(compareStartTimes),
);

export const getLessonInterval = createSelector(
  [getSelectedSlots],
  slots => {
    if ( slots.length === 0 ) return null;

    const from = moment(_.first(slots).start_time).format('HH:mm');
    const to = moment(_.last(slots).start_time)
      .add(30, 'minutes')
      .format('HH:mm');

    return {
      from,
      to,
    };
  },
);

export const getSlotsIndexParamsForSummaryAgenda = createSelector(
  [getCurrentDrivingSchoolObject, getSelectedDayInSummaryAgenda],
  (currentSchool, selectedDay) => {
    if(!currentSchool) return; /** Guards for the scenarios when during logout store is cleared */

    const dateRangeParams = timeHelpers.getWeekRange(selectedDay, currentSchool.time_zone);

    return {
      params: dateRangeParams,
      callback: SLOTS_FETCHED_CALLBACKS.SUMMARY_AGENDA_PUSH_CACHE_HISTORY
    }
  }
);

export const getSlotsIndexParamsForEmployeeDailyAgenda = createSelector(
  [getCurrentDrivingSchoolObject, getSelectedDayInEmployeeDailyAgenda, getEmployeeInEmployeeDailyAgenda],
  (currentSchool, selectedDay, employeeId) => {
    if(!currentSchool) return; /** Guards for the scenarios when during logout store is cleared */

    const dateRangeParams = timeHelpers.getWeekRange(selectedDay, currentSchool.time_zone);

    return {
      params: { ...dateRangeParams, employee_id: employeeId },
      callback: SLOTS_FETCHED_CALLBACKS.DAILY_AGENDA_PUSH_CACHE_HISTORY
    }
  }
);

