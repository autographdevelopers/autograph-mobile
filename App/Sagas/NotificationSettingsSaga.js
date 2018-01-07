import { call, put } from 'redux-saga/effects';
import { gatherErrorsFromResponse } from '../Lib/apiErrorHandlers';
import { updateNotificationSettings } from '../Redux/EmployeeNotificationsSettingsSetRedux';
import { SubmissionError } from 'redux-form';

export function* update(api, action) {
  const response = yield call(api.updateEmployeeNotifications, { employee_notifications_settings_set: action.payload });
  if (response.ok) {
    yield put(updateNotificationSettings.success());
  } else {
    const errors = gatherErrorsFromResponse(response, api);
    const formError = new SubmissionError(errors);
    yield put(updateNotificationSettings.failure(formError));
  }
}

export function* show(api, action) {

}
