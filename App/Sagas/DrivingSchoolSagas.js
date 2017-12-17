import {startSubmit, stopSubmit} from 'redux-form'
import { call, put } from 'redux-saga/effects';
import {drivingSchoolActionCreators} from '../Redux/DrivingSchoolRedux';

export function* create(api, action) {
  console.log('action');
  console.log(action);
  yield put(startSubmit(action.formID));
  const response = yield call(api.createDrivingSchool, {driving_school: action.params});
  if(response.ok) {
    console.log('response ok');
    yield put(drivingSchoolActionCreators.saveDrivingSchool(response.data)); // add in redux
    yield put(stopSubmit(action.formID));
    yield put(action.redirectionAction);
  } else {
    console.log('response error');

    const errors = {}; // or set to undefined

    // TODO: extract and use as generic handler for api response errors everywhere
    switch (response.problem) {
      case api.problemCodes.CLIENT_ERROR:
        Object.keys(response.data).forEach(field => errors[field] = { all: response.data[field] } );
        break;
      case api.problemCodes.SERVER_ERROR:
        errors['_error'] = 'Upps server error occured - it\'s probably our fault, please try again later.';
        break;
      case api.problemCodes.TIMEOUT_ERROR:
        errors['_error'] = 'Timeout error occured - it took too long to respond to your request, please try again later.';
        break;
      case api.problemCodes.CONNECTION_ERROR:
        errors['_error'] = 'Connection error occured - server is not available or bad DNS..';
        break;
      case api.problemCodes.NETWORK_ERROR:
        errors['_error'] = 'Network error occured - please check your connection.';
        break;
      default:
        errors['_error'] = 'Unexpected error occured, please try again later.';
        break;
    }
    yield put(stopSubmit(action.formID, errors));
  }
}
