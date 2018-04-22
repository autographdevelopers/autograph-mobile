import { combineReducers } from 'redux';
import configureStore from './CreateStore';
import rootSaga from '../Sagas/';
import { reducer as formReducer } from 'redux-form';
import { sessionReducer } from './SessionRedux';
import { userReducer } from './UserRedux';
import { resetPasswordReducer } from './ResetPasswordRedux';
import { drivingSchoolReducer } from './DrivingSchoolRedux';
import { contextReducer } from './ContextRedux';
import { notificationsSettingsSetReducer } from './EmployeeNotificationsSettingsSetRedux';
import { scheduleSettingsReducer } from './ScheduleSettingsRedux';
import formActionSaga from 'redux-form-saga';
import { employeesReducer } from './EmployeesRedux';
import { studentsReducer } from './StudentsRedux';
import { employeePrivilegesReducer } from './EmployeePrivileges';
import { invitationsReducer } from './InvitationsRedux';
import { modalsReducer } from './ModalRedux';
import { schoolActivationReducer } from './SchoolActivationRedux';
import { scheduleFormReducer } from './ScheduleFormRedux';
import { scheduleReducer } from './ScheduleRedux';
import { calendarReducer } from './CalendarRedux';
import { slotReducer } from './SlotsRedux';
import { drivingCourseReducer } from './DrivingCourseRedux';
import { drivingLessonReducer } from './DrivingLessonRedux';
import { bookLessonReducer } from './Modals/BookLesson';
import { employeeDailyAgendaReducer } from './AgendaRedux';
import { employeesSummaryAgendaReducer } from './AgendaRedux';
import { cancelDrivingLessonModalReducer } from './Modals/CancelDrivingLesson';

const lessonModalsReducers = combineReducers({
  book: bookLessonReducer,
  cancel: cancelDrivingLessonModalReducer,
});

/* ------------- Assemble The Reducers ------------- */
export const appReducer = combineReducers({
  session: sessionReducer,
  user: userReducer,
  form: formReducer,
  resetPassword: resetPasswordReducer,
  drivingSchools: drivingSchoolReducer,
  context: contextReducer,
  notificationsSettingsSet: notificationsSettingsSetReducer,
  scheduleSettings: scheduleSettingsReducer,
  employees: employeesReducer,
  students: studentsReducer,
  employeePrivileges: employeePrivilegesReducer,
  invitations: invitationsReducer,
  modals: modalsReducer,
  schoolActivation: schoolActivationReducer,
  schedule: scheduleReducer,
  scheduleForm: scheduleFormReducer,
  calendar: calendarReducer,
  slots: slotReducer,
  drivingCourse: drivingCourseReducer,
  drivingLessons: drivingLessonReducer,
  bookLesson: bookLessonReducer,
  employeeDailyAgenda: employeeDailyAgendaReducer,
  employeesSummaryAgenda: employeesSummaryAgendaReducer,
  lessonModal: lessonModalsReducers
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }

  return appReducer(state, action)
};

export default () => {
  let { store, sagasManager, sagaMiddleware } = configureStore(rootReducer,
    rootSaga);

  sagaMiddleware.run(formActionSaga); // To integrate redux-from and redux-saga

  if ( module.hot ) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers;
      store.replaceReducer(nextRootReducer);

      const newYieldedSagas = require('../Sagas').default;
      sagasManager.cancel();
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas);
        sagasManager = sagaMiddleware.run(formActionSaga);
      });
    });
  }

  return store;
}
