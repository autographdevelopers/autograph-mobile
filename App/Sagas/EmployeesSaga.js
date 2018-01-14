import { FETCHING_STATUS } from '../Lib/utils';
import { call, put } from 'redux-saga/effects';
import { employeesActionCreators } from '../Redux/EmployeesRedux';

export function* index(api, action) {
  console.tron.log('in sagagagga');
  yield put(employeesActionCreators.changeStatus(FETCHING_STATUS.FETCHING));

  const response = yield call(api.employees.index);

  if (response.ok) {
    yield put(employeesActionCreators.saveCollection(response.data)); // add in redux
    yield put(
      employeesActionCreators.changeStatus(FETCHING_STATUS.SUCCESS));
  } else {
    yield put(employeesActionCreators.changeStatus(FETCHING_STATUS.ERROR));
  }
}
