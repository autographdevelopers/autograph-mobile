import { combineReducers } from 'redux';
import { activitiesReducer } from './ActivityRedux';
import { drivingCourseReducer } from './DrivingCourseRedux';
import { drivingLessonReducer } from './DrivingLessonRedux';
import { drivingSchoolReducer } from './DrivingSchoolRedux';
import { notificationsSettingsSetReducer } from './EmployeeNotificationsSettingsSetRedux';
import { employeePrivilegesReducer } from './EmployeePrivileges';
import { employeesReducer } from './EmployeesRedux';
import { scheduleReducer } from './ScheduleRedux';
import { scheduleSettingsReducer } from './ScheduleSettingsRedux';
import { slotsReducer } from './SlotsRedux';
import { studentsReducer } from './StudentsRedux';
import { contextActionTypes } from '../Support/ContextRedux';

export const reducer = combineReducers({
  activities: activitiesReducer,
  drivingCourse: drivingCourseReducer,
  drivingLessons: drivingLessonReducer,
  drivingSchools: drivingSchoolReducer,
  notificationsSettingsSet: notificationsSettingsSetReducer,
  employeePrivileges: employeePrivilegesReducer,
  employees: employeesReducer,
  schedule: scheduleReducer,
  scheduleSettings: scheduleSettingsReducer,
  slots: slotsReducer,
  students: studentsReducer,
});

/** Clears entities part of the store tree when changing driving school context */
export const entitiesReducer = (state, action) => {
  if (action.type === contextActionTypes.SET_CURRENT_DRIVING_SCHOOL)
    state = undefined;

  return reducer(state, action);
};
