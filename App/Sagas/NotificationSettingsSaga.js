import { call, put } from 'redux-saga/effects';
import { gatherErrorsFromResponse } from '../Lib/apiErrorHandlers';
import { updateNotificationSettings } from '../Redux/EmployeeNotificationsSettingsSetRedux';
import { notificationSettingsActionCreators } from '../Redux/EmployeeNotificationsSettingsSetRedux';
import { SubmissionError } from 'redux-form';
import { FETCHING_STATUS } from '../Lib/utils';

export function* update(api, action) {
  const response = yield call(
    api.notificationSettings.update,
    { employee_notifications_settings: action.payload },
    action.payload.driving_school_id
  );

  if (response.ok) {
    yield put(updateNotificationSettings.success());
  } else {
    const errors = gatherErrorsFromResponse(response, api);
    const formError = new SubmissionError(errors);
    yield put(updateNotificationSettings.failure(formError));
  }
}

export function* show(api, action) {
  yield put(notificationSettingsActionCreators.changeStatus(FETCHING_STATUS.FETCHING));
  const response = yield call(api.notificationSettings.show, action.drivingSchoolId);
  if (response.ok) {
    yield put(notificationSettingsActionCreators.save(response.data));
    yield put(notificationSettingsActionCreators.changeStatus(FETCHING_STATUS.SUCCESS));
  } else {
    yield put(notificationSettingsActionCreators.changeStatus(FETCHING_STATUS.ERROR));
  }
}
