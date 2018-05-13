import { combineReducers } from 'redux';
import { contextActionTypes } from '../Support/ContextRedux';
import { employeesSummaryAgendaReducer } from './AgendaRedux';
import { employeeDailyAgendaReducer } from './AgendaRedux';
import { invitationsReducer } from './InvitationsRedux';
import { resetPasswordReducer } from './ResetPasswordRedux';
import { scheduleFormReducer } from './ScheduleFormRedux';
import { modalsReducer } from './Modals';
import { employeesScreenReducer } from './EmploeesScreenRedux';
import { studentsScreenReducer } from './StudentsScreenRedux';
import { employeeProfileScreenReducer } from './EmployeeProfileRedux';
import { studentProfileScreenReducer } from './StudentProfileRedux';
import { utilsReducer } from './Utils/index';
import { studentDashboardScreenReducer } from './StudentDashboardRedux';
import { drivingLessonsScreenReducer } from './DrivingLessonsScreenRedux';
import { myActivitiesScreenReducer } from './MyActivitiesScreenRedux';
import { activitiesFullListScreenReducer } from './ActivitiesFullListScreenRedux';

const reducer = combineReducers({
  employeeDailyAgenda: employeeDailyAgendaReducer,
  employeesSummaryAgenda: employeesSummaryAgendaReducer,
  employeeProfileScreen: employeeProfileScreenReducer,
  myActivitiesScreen: myActivitiesScreenReducer,
  activitiesFullListScreen: activitiesFullListScreenReducer,
  studentProfileScreen: studentProfileScreenReducer,
  studentDashboardScreen: studentDashboardScreenReducer,
  drivingLessonsScreen: drivingLessonsScreenReducer,
  studentsScreen: studentsScreenReducer,
  employeesScreen: employeesScreenReducer,
  invitations: invitationsReducer,
  scheduleForm: scheduleFormReducer,
  resetPassword: resetPasswordReducer,
  modals: modalsReducer,
  utils: utilsReducer
});

/** Clears views part of the store tree when changing driving school context */
export const viewsReducer = (state, action) => {
  if (action.type === contextActionTypes.SET_CURRENT_DRIVING_SCHOOL)
    state = undefined;

  return reducer(state, action);
};
