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
import { scheduleBoundariesReducer } from './ScheduleBoundariesRedux';
import formActionSaga from 'redux-form-saga';
import { employeesReducer } from './EmployeesRedux';
import { studentsReducer } from './StudentsRedux';
import { employeePrivilegesReducer } from './EmployeePrivileges';

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  nav: require('./NavigationRedux').reducer,
  session: sessionReducer,
  user: userReducer,
  form: formReducer,
  resetPassword: resetPasswordReducer,
  drivingSchools: drivingSchoolReducer,
  context: contextReducer,
  notificationsSettingsSet: notificationsSettingsSetReducer,
  scheduleSettings: scheduleSettingsReducer,
  scheduleBoundaries: scheduleBoundariesReducer,
  employees: employeesReducer,
  students: studentsReducer,
  employeePrivileges: employeePrivilegesReducer
});

export default () => {
  let { store, sagasManager, sagaMiddleware } = configureStore(reducers,
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
