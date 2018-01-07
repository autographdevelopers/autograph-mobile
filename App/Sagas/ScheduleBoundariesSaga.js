import { call, put } from 'redux-saga/effects';
import { gatherErrorsFromResponse } from '../Lib/apiErrorHandlers';
import { updateScheduleBoundaries } from '../Redux/ScheduleBoundariesRedux';
import { SubmissionError } from 'redux-form';

export function* update(api, action) {
  const response = yield call(api.updateScheduleBoundaries, action.payload);
  if (response.ok) {
    yield put(updateScheduleBoundaries.success());
  } else {
    const errors = gatherErrorsFromResponse(response, api);
    const formError = new SubmissionError(errors);
    yield put(updateScheduleBoundaries.failure(formError));
  }
}
