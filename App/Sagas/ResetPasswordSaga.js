import { put, call } from 'redux-saga/effects'
import { resetPasswordCreators } from '../Redux/ResetPasswordRedux'
import { resetPasswordFormAction } from '../Redux/ResetPasswordRedux'

export function* resetPassword (api, action) {
  const { email } = action.payload;

  const response = yield call(api.resetPassword, email)

  if (response.ok) {
    yield put(resetPasswordCreators.resetPasswordSuccess())
  } else {
    let error = ''

    if (response.data.errors) {
      error = response.data.errors[0]
    }else{
      error = 'Unexpected error. Please try again'
    }

    yield put(resetPasswordCreators.resetPasswordFailure(error))
  }
}
