import { call, put } from 'redux-saga/effects';
import { userActionCreators } from '../Redux/UserRedux';
import { gatherErrorsFromResponse } from '../Lib/apiErrorHandlers';
import { login } from '../Redux/SessionRedux';
import { SubmissionError } from 'redux-form';
import { NavigationActions } from 'react-navigation';
import { sessionActionCreators } from '../Redux/SessionRedux';

export function* create(api, action) {
  const { email, password } = action.payload;

  const response = yield call(api.session.create, email, password);

  if (response.ok) {
    yield put(userActionCreators.setUser(response.data));
    yield(put(login.success()));
  } else {
    const errors = gatherErrorsFromResponse(response, api);
    const formError = new SubmissionError(errors);
    yield(put(login.failure(formError)));
  }
}

export function* destroy(api, action) {
  const response = yield call(api.session.destroy);

  if (response.ok) {
    yield put(userActionCreators.clearUser());
    yield put(sessionActionCreators.resetState());
    const resetAction = NavigationActions.reset({
      key: null,
      index: 0,
      actions: [ NavigationActions.navigate({ routeName: 'loginLaunch' }) ]
    });
    yield put(resetAction);
  }
}
