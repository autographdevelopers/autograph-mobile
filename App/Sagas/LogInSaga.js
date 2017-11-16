import { call, put } from 'redux-saga/effects'
import {sessionActionCreators} from '../Redux/SessionRedux';
import {userActionCreators} from '../Redux/UserRedux';

export function * LogIn (api, action) {
  const { email, password } = action.payload;

  const response = yield call(api.logIn, email, password);
  console.tron.log(response);

  if (response.ok) {
    const user = response.data;
    // override sneak cased keys
    user['timeZone'] = user.time_zone;
    user['birthDate'] = user.birth_date;

    const sessionMetadata = {}
    sessionMetadata['accessToken'] = response.headers['access-token'];
    sessionMetadata['tokenType'] = response.headers['token-type'];
    sessionMetadata['clientId'] = response.headers['client'];
    sessionMetadata['expirationDate'] = response.headers['expiry'];

    yield put(sessionActionCreators.setUserSession(sessionMetadata));
    yield put(userActionCreators.setUser(user));
  } else {

    const errorMessage = response.data.errors[0];
    yield put(sessionActionCreators.setAuthenticationErrorMessage(errorMessage));
  }
}
