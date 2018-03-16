import { call, put } from 'redux-saga/effects';
import { gatherErrorsFromResponse } from '../Lib/apiErrorHandlers';
import { updateScheduleSettings } from '../Redux/ScheduleSettingsRedux';
import { scheduleSettingsActionCreators } from '../Redux/ScheduleSettingsRedux';
import { SubmissionError } from 'redux-form';
import { FETCHING_STATUS } from '../Lib/utils';

export function* update(api, action) {
  const response = yield call(api.scheduleSettings.update, { schedule_settings: action.payload });
  if (response.ok) {
    yield put(updateScheduleSettings.success());
  } else {
    const errors = gatherErrorsFromResponse(response, api);
    const formError = new SubmissionError(errors);
    yield put(updateScheduleSettings.failure(formError));
  }
}

export function* show(api, action) {
  yield put(scheduleSettingsActionCreators.changeStatus(FETCHING_STATUS.FETCHING));
  const response = yield call(api.scheduleSettings.show);
  if (response.ok) {
    yield put(scheduleSettingsActionCreators.save(response.data));
    yield put(scheduleSettingsActionCreators.changeStatus(FETCHING_STATUS.SUCCESS));
  } else {
    yield put(scheduleSettingsActionCreators.changeStatus(FETCHING_STATUS.ERROR));
  }
}

// TODO ADD ERROR MESSAGE FIELD do models
