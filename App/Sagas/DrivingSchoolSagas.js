import { startSubmit, stopSubmit } from 'redux-form'
import { call, put } from 'redux-saga/effects';
import { drivingSchoolActionCreators } from '../Redux/DrivingSchoolRedux';
import { contextActionCreators } from '../Redux/ContextRedux';
import { gatherErrorsFromResponse } from '../Lib/apiErrorHandlers';

export function* create(api, action) {
  yield put(startSubmit(action.formID));
  const response = yield call(api.createDrivingSchool, { driving_school: action.params });
  if (response.ok) {
    yield put(drivingSchoolActionCreators.saveDrivingSchool(response.data)); // add in redux
    yield put(contextActionCreators.setCurrentDrivingSchool(response.data.id));
    yield put(stopSubmit(action.formID));
    yield put(action.redirectionAction);
  } else {
    const errors = gatherErrorsFromResponse(response, api);
    yield put(stopSubmit(action.formID, errors));
  }
}

export function* updateEmployeesNotificationSettings(api, action) {
  yield put(startSubmit(action.formID));
  console.log('saga before api call');

  console.log('action');
  console.log(action);
  const response = yield call(api.updateEmployeeNotifications, { employee_notifications_settings_set: action.params });
  console.log('saga after api call');
  if (response.ok) {
    console.log('response OK');

    // yield put(drivingSchoolActionCreators.saveDrivingSchool(response.data)); // add in redux
    // yield put(contextActionCreators.setCurrentDrivingSchool(response.data.id));
    yield put(stopSubmit(action.formID));
    yield put(action.redirectionAction);
  } else {
    console.log('response Error');
    const errors = gatherErrorsFromResponse(response, api);
    yield put(stopSubmit(action.formID, errors));
  }
}

export function* updateScheduleBoundaries(api, action) {
  yield put(startSubmit(action.formID));
  console.log('saga before api call');

  console.log('action');
  console.log(action);
  const response = yield call(api.updateScheduleBoundaries, action.params);
  console.log('saga after api call');
  if (response.ok) {
    console.log('response OK');

    // yield put(drivingSchoolActionCreators.saveDrivingSchool(response.data)); // add in redux
    // yield put(contextActionCreators.setCurrentDrivingSchool(response.data.id));
    yield put(stopSubmit(action.formID));
    yield put(action.redirectionAction);
  } else {
    console.log('response Error');
    const errors = gatherErrorsFromResponse(response, api);
    yield put(stopSubmit(action.formID, errors));
  }
}
