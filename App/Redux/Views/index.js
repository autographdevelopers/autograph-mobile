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

export const viewsReducer = combineReducers({
  employeeDailyAgenda: employeeDailyAgendaReducer,
  employeesSummaryAgenda: employeesSummaryAgendaReducer,
  employeeProfileScreen: employeeProfileScreenReducer,
  studentsScreen: studentsScreenReducer,
  employeesScreen: employeesScreenReducer,
  invitations: invitationsReducer,
  scheduleForm: scheduleFormReducer,
  resetPassword: resetPasswordReducer,
  modals: modalsReducer
});
