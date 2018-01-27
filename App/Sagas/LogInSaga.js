import { call, put } from 'redux-saga/effects';
import { sessionActionCreators } from '../Redux/SessionRedux';
import { userActionCreators } from '../Redux/UserRedux';
import { NavigationActions } from 'react-navigation';
import { gatherErrorsFromResponse } from '../Lib/apiErrorHandlers';

export function* LogIn(api, action) {
  const { email, password } = action.payload;

  const response = yield call(api.logIn, email, password);

  if (response.ok) {
    const user = getUserData(response);
    yield put(userActionCreators.setUser(user));
    const resetNav = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'mySchoolsScreen'})
      ]
    });
    yield put(resetNav);
  } else {
    // TODO :how to handle server turned off or 500 errors - rewrite to use redu-xform
    const errorMessage = response.data.errors[0];
    yield put(sessionActionCreators.setAuthenticationErrorMessage(errorMessage));
  }
}

const getUserData = response => {
  // mutating here!! f not pure
  const user = response.data;
  // override sneak cased keys
  user['timeZone'] = user.time_zone;
  user['birthDate'] = user.birth_date;

  return user;
};
