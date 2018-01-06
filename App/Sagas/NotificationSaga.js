import { startSubmit, stopSubmit } from 'redux-form'
import { call, put } from 'redux-saga/effects';
import { drivingSchoolActionCreators } from '../Redux/DrivingSchoolRedux';
import { contextActionCreators } from '../Redux/ContextRedux';
import { gatherErrorsFromResponse } from '../Lib/apiErrorHandlers';

export function* updateNotificationSettings(api, action) {
  yield put(startSubmit(action.formID));
  const response = yield call(api.updateEmployeeNotifications, { employee_notifications_settings_set: action.params });
  if (response.ok) {
    yield put(stopSubmit(action.formID));
    yield put(action.redirectionAction);
  } else {
    const errors = gatherErrorsFromResponse(response, api);
    yield put(stopSubmit(action.formID, errors));
  }
}


export function* fetchNotificationSettings(api, action) {

}
