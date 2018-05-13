import { call, put } from 'redux-saga/effects';
import { drivingSchoolActionCreators } from '../Redux/Entities/DrivingSchoolRedux';
import { FETCHING_STATUS } from '../Lib/utils';
import { contextActionCreators } from '../Redux/Support/ContextRedux';
import { gatherErrorsFromResponse } from '../Lib/apiErrorHandlers';
import { SubmissionError } from 'redux-form';
import { schoolActivationActionCreators } from '../Redux/Views/Modals/SchoolActivationRedux';
import { change } from 'redux-form';

import FORM_IDS from '../Screens/NewDrivingSchool/Constants';

/** redux-form-sagas actions */
import {
  createDrivingSchool,
  updateDrivingSchool,
  confirmDrivingSchoolRegistration
} from '../Redux/Entities/DrivingSchoolRedux';

export function* create(api, action) {
  const response = yield call(api.drivingSchools.create, { driving_school: action.payload });
  if (response.ok) {
    yield put(change(FORM_IDS.BASIC_INFO, 'id', response.data.id));
    yield put(drivingSchoolActionCreators.saveSingle(response.data));
    yield put(createDrivingSchool.success());
  } else {
    const errors = gatherErrorsFromResponse(response, api);
    const formError = new SubmissionError(errors);
    yield put(createDrivingSchool.failure(formError));
  }
}

export function* update(api, action) {
  const response = yield call(api.drivingSchools.update, { driving_school: action.payload }, action.payload.id);
  if (response.ok) {
    yield put(drivingSchoolActionCreators.saveSingle(response.data));
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
    return response.data
  } else {
    yield put(drivingSchoolActionCreators.changeStatus(FETCHING_STATUS.ERROR));
  }
}

export function* confirmRegistration(api, action) {
  const response = yield call(
    api.drivingSchools.confirm_registration,
    action.payload.driving_school_id
  );

  if (response.ok) {
    yield put(drivingSchoolActionCreators.saveSingle(response.data));
    yield put(confirmDrivingSchoolRegistration.success());
  } else {
    const errors = gatherErrorsFromResponse(response, api);
    const formError = new SubmissionError(errors);
    yield put(confirmDrivingSchoolRegistration.failure(formError));
  }
}

export function* activate(api, action) {
  yield put(schoolActivationActionCreators.changeStatus(FETCHING_STATUS.FETCHING));

  const response = yield call(api.drivingSchools.activate, action.id, {verification_code: action.code});

  if (response.ok) {
    yield put(drivingSchoolActionCreators.saveSingle(response.data)); // add in redux
    yield put(schoolActivationActionCreators.changeStatus(FETCHING_STATUS.SUCCESS));
  } else {
    if (response.status === 403) {
      yield put(schoolActivationActionCreators.changeStatus(FETCHING_STATUS.READY));
      yield put(schoolActivationActionCreators.raiseError('Wprowadzono niepoprawny kod potwierdzający.'));
    } else {
      yield put(schoolActivationActionCreators.changeStatus(FETCHING_STATUS.ERROR));
    }
  }
}
