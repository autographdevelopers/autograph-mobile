import { call, put } from 'redux-saga/effects';
import { userActionCreators } from '../Redux/Access/CurrentUserRedux';
import { gatherErrorsFromResponse } from '../Lib/apiErrorHandlers';
import { login } from '../Redux/Access/SessionRedux';
import { SubmissionError } from 'redux-form';
import { NavigationActions } from 'react-navigation';
import { sessionActionCreators } from '../Redux/Access/SessionRedux';

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
  yield call(api.session.destroy);
  yield put({type: 'USER_LOGOUT'});
}
