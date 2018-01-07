import { call, put } from 'redux-saga/effects';
import { drivingSchoolActionCreators, STATUS } from '../Redux/DrivingSchoolRedux';
import { contextActionCreators } from '../Redux/ContextRedux';
import { gatherErrorsFromResponse } from '../Lib/apiErrorHandlers';
import { SubmissionError } from 'redux-form';
/** redux-form-sagas actions */
import { createDrivingSchool } from '../Redux/DrivingSchoolRedux';
import { updateDrivingSchool } from '../Redux/DrivingSchoolRedux';

export function* create(api, action) {
  const response = yield call(api.createDrivingSchool, { driving_school: action.payload });
  if (response.ok) {
    yield put(drivingSchoolActionCreators.saveDrivingSchool(response.data));
    yield put(contextActionCreators.setCurrentDrivingSchool(response.data.id));
    yield put(createDrivingSchool.success());
  } else {
    const errors = gatherErrorsFromResponse(response, api);
    const formError = new SubmissionError(errors);
    yield put(createDrivingSchool.failure(formError));
  }
}

export function* update(api, action) {
  const response = yield call(api.updateDrivingSchool, { driving_school: action.payload });
  if (response.ok) {
    yield put(drivingSchoolActionCreators.saveDrivingSchool(response.data));
    yield put(contextActionCreators.setCurrentDrivingSchool(response.data.id));
    yield put(updateDrivingSchool.success());
  } else {
    const errors = gatherErrorsFromResponse(response, api);
    const formError = new SubmissionError(errors);
    yield put(updateDrivingSchool.failure(formError));
  }
}

export function* index (api, action) {
  yield put(drivingSchoolActionCreators.changeSchoolsStatus(STATUS.FETCHING));

  const response = yield call(api.fetchDrivingSchools);

  if (response.ok) {
    yield put(drivingSchoolActionCreators.saveDrivingSchools(response.data)); // add in redux
    yield put(drivingSchoolActionCreators.changeSchoolsStatus(STATUS.SUCCESS));
  } else {
    yield put(drivingSchoolActionCreators.changeSchoolsStatus(STATUS.ERROR));
  }
}
