import { call, put } from 'redux-saga/effects';
import { sessionActionCreators } from '../Redux/SessionRedux';
import { userActionCreators } from '../Redux/UserRedux';
import PrimaryNavigation from '../Navigation/AppNavigation';

export function* LogIn(api, action) {
  const { email, password } = action.payload;

  const response = yield call(api.logIn, email, password);

  if (response.ok) {
    const user = getUserData(response);

    yield put(userActionCreators.setUser(user));
    yield put(PrimaryNavigation.router.getActionForPathAndParams('newDrivingSchool'));
  } else {
    // TODO :how to handle server turned off or 500 errors
    const errorMessage = response.data.errors[0];
    yield put(sessionActionCreators.setAuthenticationErrorMessage(errorMessage));
  }
}

const getUserData = response => {
  const user = response.data;
  // override sneak cased keys
  user['timeZone'] = user.time_zone;
  user['birthDate'] = user.birth_date;

  return user;
};
