import { combineReducers } from 'redux';
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

export const viewsReducer = combineReducers({
  employeeDailyAgenda: employeeDailyAgendaReducer,
  employeesSummaryAgenda: employeesSummaryAgendaReducer,
  employeeProfileScreen: employeeProfileScreenReducer,
  myActivitiesScreen: myActivitiesScreenReducer,
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
