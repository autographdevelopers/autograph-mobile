import { call, put } from 'redux-saga/effects';
import { drivingSchoolActionCreators } from '../Redux/DrivingSchoolRedux';
import { FETCHING_STATUS } from '../Lib/utils';
import { contextActionCreators } from '../Redux/ContextRedux';
import { gatherErrorsFromResponse } from '../Lib/apiErrorHandlers';
import { SubmissionError } from 'redux-form';
import { schoolActivationActionCreators } from '../Redux/SchoolActivationRedux';

/** redux-form-sagas actions */
import { createDrivingSchool } from '../Redux/DrivingSchoolRedux';
import { updateDrivingSchool } from '../Redux/DrivingSchoolRedux';

export function* create(api, action) {
  const response = yield call(api.drivingSchools.create, { driving_school: action.payload });
  if (response.ok) {
    yield put(drivingSchoolActionCreators.saveSingle(response.data));
    yield put(contextActionCreators.setCurrentDrivingSchool(response.data.id));
    yield put(createDrivingSchool.success());
  } else {
    const errors = gatherErrorsFromResponse(response, api);
    const formError = new SubmissionError(errors);
    yield put(createDrivingSchool.failure(formError));
  }
}

export function* update(api, action) {
  const response = yield call(api.drivingSchools.update, { driving_school: action.payload });
  if (response.ok) {
    yield put(drivingSchoolActionCreators.saveSingle(response.data));
    yield put(contextActionCreators.setCurrentDrivingSchool(response.data.id));
    yield put(updateDrivingSchool.success());
  } else {
    const errors = gatherErrorsFromResponse(response, api);
    const formError = new SubmissionError(errors);
    yield put(updateDrivingSchool.failure(formError));
  }
}

export function* index(api, action) {
  yield put(drivingSchoolActionCreators.changeStatus(FETCHING_STATUS.FETCHING));

  const response = yield call(api.drivingSchools.index);

  if (response.ok) {
    yield put(drivingSchoolActionCreators.saveCollection(response.data)); // add in redux
    yield put(drivingSchoolActionCreators.changeStatus(FETCHING_STATUS.SUCCESS));
  } else {
    yield put(drivingSchoolActionCreators.changeStatus(FETCHING_STATUS.ERROR));
  }
}

export function* show(api, action) {
  yield put(drivingSchoolActionCreators.changeStatus(FETCHING_STATUS.FETCHING));

  const response = yield call(api.drivingSchools.show);

  if (response.ok) {
    yield put(drivingSchoolActionCreators.saveSingle(response.data)); // add in redux
    yield put(drivingSchoolActionCreators.changeStatus(FETCHING_STATUS.SUCCESS));
  } else {
    yield put(drivingSchoolActionCreators.changeStatus(FETCHING_STATUS.ERROR));
  }
}

export function* activate(api, action) {
  yield put(schoolActivationActionCreators.changeStatus(FETCHING_STATUS.FETCHING));

  const response = yield call(api.drivingSchools.activate, action.id, {verification_code: action.code});

  if (response.ok) {
    yield put(drivingSchoolActionCreators.saveSingle(response.data)); // add in redux
    yield put(schoolActivationActionCreators.changeStatus(FETCHING_STATUS.SUCCESS));
  } else {
    yield put(schoolActivationActionCreators.changeStatus(FETCHING_STATUS.ERROR));
  }
}
