import { call, put } from 'redux-saga/effects';
import { gatherErrorsFromResponse } from '../Lib/apiErrorHandlers';
import { updateScheduleBoundaries } from '../Redux/ScheduleBoundariesRedux';
import { SubmissionError } from 'redux-form';
import { FETCHING_STATUS } from '../Lib/utils';
import { scheduleBoundariesActionCreators } from '../Redux/ScheduleBoundariesRedux';

export function* update(api, action) {
  const response = yield call(api.scheduleBoundaries.update, action.payload);
  if (response.ok) {
    yield put(updateScheduleBoundaries.success());
  } else {
    const errors = gatherErrorsFromResponse(response, api);
    const formError = new SubmissionError(errors);
    yield put(updateScheduleBoundaries.failure(formError));
  }
}

export function* show(api, action) {
  yield put(scheduleBoundariesActionCreators.changeStatus(FETCHING_STATUS.FETCHING));
  const response = yield call(api.scheduleBoundaries.show);
  if (response.ok) {
    yield put(scheduleBoundariesActionCreators.save(response.data));
    yield put(scheduleBoundariesActionCreators.changeStatus(FETCHING_STATUS.SUCCESS));
  } else {
    yield put(scheduleBoundariesActionCreators.changeStatus(FETCHING_STATUS.ERROR));
  }
}
