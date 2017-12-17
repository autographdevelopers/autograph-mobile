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
import { create as createDrivingSchool } from './DrivingSchoolSagas';

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it('should ', function() {


/** @ Automatic auth token management **/

const responseHook = response => {
  const sessionMetadata = {};
  sessionMetadata['accessToken'] = response.headers['access-token'];
  sessionMetadata['tokenType'] = response.headers['token-type'];
  sessionMetadata['clientId'] = response.headers['client'];
  sessionMetadata['expirationDate'] = response.headers['expiry'];

  store.dispatch(sessionActionCreators.setUserSession(sessionMetadata));
};

const requestHook = request => {
  const { accessToken, tokenType, clientId, expirationDate } = store.getState().session;
  const { email } = store.getState().user;

  request.headers['access-token'] = accessToken;
  request.headers['token-type'] = tokenType;
  request.headers['client'] = clientId;
  request.headers['expiry'] = expirationDate;
  request.headers['uid'] = email;
};

const api = API.create(requestHook, responseHook);
/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(SESSION_ACTION_TYPES.REQUEST_LOGIN_PROCEDURE, LogIn, api),
    takeLatest(resetPasswordTypes.RESET_PASSWORD_REQUEST, resetPassword, api),
    takeLatest(drivingSchoolActionTypes.CREATE_DRIVING_SCHOOL_REQUEST, createDrivingSchool, api)
  ])
}
