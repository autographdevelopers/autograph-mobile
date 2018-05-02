import { combineReducers } from 'redux';
import { employeesSummaryAgendaReducer } from './AgendaRedux';
import { employeeDailyAgendaReducer } from './AgendaRedux';
import { invitationsReducer } from './InvitationsRedux';
import { resetPasswordReducer } from './ResetPasswordRedux';
import { scheduleFormReducer } from './ScheduleFormRedux';
import { modalsReducer } from './Modals';

export const viewsReducer = combineReducers({
  employeeDailyAgenda: employeeDailyAgendaReducer,
  employeesSummaryAgenda: employeesSummaryAgendaReducer,
  invitations: invitationsReducer,
  scheduleForm: scheduleFormReducer,
  resetPassword: resetPasswordReducer,
  modals: modalsReducer
});
