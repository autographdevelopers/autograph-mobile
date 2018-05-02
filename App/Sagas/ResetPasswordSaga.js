import { put, call } from 'redux-saga/effects'
import { resetPasswordCreators } from '../Redux/Views/ResetPasswordRedux'
import { resetPasswordFormAction } from '../Redux/Views/ResetPasswordRedux'

export function* resetPassword (api, action) {
  const { email } = action.payload;

  const response = yield call(api.resetPassword, email)

  if (response.ok) {
    yield put(resetPasswordCreators.resetPasswordSuccess())
  } else {
    let error = ''

    switch (response.problem) {
      case 'CLIENT_ERROR':
        error = response.data.errors[0];
        break;
      case 'SERVER_ERROR':
        error = 'Server error occured';
        break;
      default:
        error = 'Unexpected error occured';
    }

    yield put(resetPasswordCreators.resetPasswordFailure(error))
  }
}
