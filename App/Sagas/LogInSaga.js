import { call, put } from 'redux-saga/effects';
import { userActionCreators } from '../Redux/UserRedux';
import { gatherErrorsFromResponse } from '../Lib/apiErrorHandlers';
import { login } from '../Redux/SessionRedux';
import { SubmissionError } from 'redux-form';

export function* LogIn(api, action) {
  const { email, password } = action.payload;

  const response = yield call(api.logIn, email, password);

  if (response.ok) {
    yield put(userActionCreators.setUser(response.data));
    yield(put(login.success()));
  } else {
    const errors = gatherErrorsFromResponse(response, api);
    const formError = new SubmissionError(errors);
    yield(put(login.failure(formError)));
  }
}
