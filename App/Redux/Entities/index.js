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

export const entitiesReducer = combineReducers({
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
