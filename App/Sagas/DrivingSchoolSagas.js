import { startSubmit, stopSubmit } from 'redux-form'
import { call, put } from 'redux-saga/effects';
import { drivingSchoolActionCreators, STATUS } from '../Redux/DrivingSchoolRedux';
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

export function* update(api, action) {
  yield put(startSubmit(action.formID));
  const response = yield call(api.updateDrivingSchool, { driving_school: action.params });
  if (response.ok) {
    yield put(drivingSchoolActionCreators.updateDrivingSchool(response.data));
    yield put(contextActionCreators.setCurrentDrivingSchool(response.data.id));
    yield put(stopSubmit(action.formID));
    yield put(action.redirectionAction);
  } else {
    const errors = gatherErrorsFromResponse(response, api);
    yield put(stopSubmit(action.formID, errors));
  }
}

export function* updateScheduleSettings(api, action) {
  yield put(startSubmit(action.formID));
  const response = yield call(api.updateScheduleSettings, { schedule_settings_set: action.params });
  if (response.ok) {
    // yield put(drivingSchoolActionCreators.saveDrivingSchool(response.data)); // add in redux
    // yield put(contextActionCreators.setCurrentDrivingSchool(response.data.id));
    yield put(stopSubmit(action.formID));
    yield put(action.redirectionAction);
  } else {
    const errors = gatherErrorsFromResponse(response, api);
    yield put(stopSubmit(action.formID, errors));
    }
}

export function* updateEmployeesNotificationSettings(api, action) {
  yield put(startSubmit(action.formID));


  const response = yield call(api.updateEmployeeNotifications, { employee_notifications_settings_set: action.params });

  if (response.ok) {


    // yield put(drivingSchoolActionCreators.saveDrivingSchool(response.data)); // add in redux
    // yield put(contextActionCreators.setCurrentDrivingSchool(response.data.id));
    yield put(stopSubmit(action.formID));
    yield put(action.redirectionAction);
  } else {

    const errors = gatherErrorsFromResponse(response, api);
    yield put(stopSubmit(action.formID, errors));
  }
}

export function* updateScheduleBoundaries(api, action) {
  yield put(startSubmit(action.formID));

  const response = yield call(api.updateScheduleBoundaries, action.params);

  if (response.ok) {


    // yield put(drivingSchoolActionCreators.saveDrivingSchool(response.data)); // add in redux
    // yield put(contextActionCreators.setCurrentDrivingSchool(response.data.id));
    yield put(stopSubmit(action.formID));
    yield put(action.redirectionAction);
  } else {

    const errors = gatherErrorsFromResponse(response, api);
    yield put(stopSubmit(action.formID, errors));
  }
}

export function* index (api, action) {

  yield put(drivingSchoolActionCreators.changeStatus(STATUS.FETCHING));

  const response = yield call(api.fetchDrivingSchools);

  if (response.ok) {
    yield put(drivingSchoolActionCreators.saveDrivingSchools(response.data)); // add in redux
    yield put(drivingSchoolActionCreators.changeStatus(STATUS.SUCCESS));
  } else {
    yield put(drivingSchoolActionCreators.changeStatus(STATUS.ERROR));
  }
}
