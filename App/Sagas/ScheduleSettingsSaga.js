import { call, put } from 'redux-saga/effects';
import { gatherErrorsFromResponse } from '../Lib/apiErrorHandlers';
import { updateScheduleSettings } from '../Redux/ScheduleSettingsRedux';
import { SubmissionError } from 'redux-form';

export function* update(api, action) {
  const response = yield call(api.updateScheduleSettings, { schedule_settings_set: action.payload });
  if (response.ok) {
    yield put(updateScheduleSettings.success());
  } else {
    const errors = gatherErrorsFromResponse(response, api);
    const formError = new SubmissionError(errors);
    yield put(updateScheduleSettings.failure(formError));
  }
}
