import { takeLatest, all } from 'redux-saga/effects';
import API from '../Services/Api';
import FixtureAPI from '../Services/FixtureApi';
import DebugConfig from '../Config/DebugConfig';
import { store } from '../Containers/App';

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux';
import { SESSION_ACTION_TYPES, sessionActionCreators } from '../Redux/SessionRedux';

import { resetPasswordTypes } from '../Redux/ResetPasswordRedux';
import { drivingSchoolActionTypes } from '../Redux/DrivingSchoolRedux';

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas';
import { LogIn } from './LogInSaga';
import { resetPassword } from './ResetPasswordSaga';
import { create as createDrivingSchool, update as updateDrivingSchool } from './DrivingSchoolSagas';
import { updateEmployeesNotificationSettings } from './DrivingSchoolSagas';
import { updateScheduleBoundaries} from './DrivingSchoolSagas';
import { updateScheduleSettings} from './DrivingSchoolSagas';

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it('should ', function() {


/** @ Automatic auth token management **/

const responseHook = response => {
  const sessionMetadata = {};
  // QUESTION: why response doesnt not return access token wehn validation on server falied?
  // QUESTION why lack of zip code triggers 500 error
  if (response.headers && response.headers['access-token'] && response.headers['token-type'] && response.headers['client'] && response.headers['expiry'] && response.headers['uid']) {
    sessionMetadata['accessToken'] = response.headers['access-token'];
    sessionMetadata['tokenType'] = response.headers['token-type'];
    sessionMetadata['clientId'] = response.headers['client'];
    sessionMetadata['expirationDate'] = response.headers['expiry'];
    sessionMetadata['uid'] = response.headers['uid'];

    store.dispatch(sessionActionCreators.setUserSession(sessionMetadata));
  }
};

const requestHook = request => {
  const { accessToken, tokenType, clientId, expirationDate, uid } = store.getState().session;
  const { currentDrivingSchoolID } = store.getState().context;
  request.headers['access-token'] = accessToken;
  request.headers['token-type'] = tokenType;
  request.headers['client'] = clientId;
  request.headers['expiry'] = expirationDate;
  request.headers['uid'] = uid;
  //
  request.url = request.url.replace(':driving_school_id', currentDrivingSchoolID);
};

export const api = API.create(requestHook, responseHook);
/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(SESSION_ACTION_TYPES.REQUEST_LOGIN_PROCEDURE, LogIn, api),
    takeLatest(resetPasswordTypes.RESET_PASSWORD_REQUEST, resetPassword, api),
    takeLatest(drivingSchoolActionTypes.CREATE_DRIVING_SCHOOL_REQUEST, createDrivingSchool, api),
    takeLatest(drivingSchoolActionTypes.UPDATE_EMPLOYEE_NOTIFICATIONS_REQUEST, updateEmployeesNotificationSettings, api),
    takeLatest(drivingSchoolActionTypes.UPDATE_SCHEDULE_BOUNDARIES_REQUEST, updateScheduleBoundaries, api),
    takeLatest(drivingSchoolActionTypes.UPDATE_DRIVING_SCHOOL_REQUEST, updateDrivingSchool, api),
    takeLatest(drivingSchoolActionTypes.UPDATE_SCHEDULE_SETTINGS_REQUEST, updateScheduleSettings, api)
  ])
}
