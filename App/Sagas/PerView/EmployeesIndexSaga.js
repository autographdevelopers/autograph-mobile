import { FETCHING_STATUS } from '../../Lib/utils';
import { call, put } from 'redux-saga/effects';
import { index as employeesIndex } from '../EmployeesSaga';
import { employeesScreenActionCreators } from '../../Redux/Views/EmploeesScreenRedux';

export function* requestDataForEmployeesScreen(api, action) {
  try {
    console.tron.log(0);
    yield put(employeesScreenActionCreators.changeStatus(FETCHING_STATUS.FETCHING));
    console.tron.log(1);

    yield call(employeesIndex, api, action.payloads.employeesPayload || {});
    console.tron.log(2);
    yield put(employeesScreenActionCreators.changeStatus(FETCHING_STATUS.SUCCESS));
    console.tron.log(3);
  } catch(error) {
    yield put(employeesScreenActionCreators.changeStatus(FETCHING_STATUS.ERROR));
    console.tron.log(4);
  }
}

export function* refreshEmployeesList(api, action) {
  yield put(employeesScreenActionCreators.toggleRefreshingFlag());
  yield call(employeesIndex, api, action.payloads.employeesPayload || {});
  yield put(employeesScreenActionCreators.toggleRefreshingFlag());
}
