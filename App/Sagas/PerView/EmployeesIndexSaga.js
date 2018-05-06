import { FETCHING_STATUS } from '../../Lib/utils';
import { call, put } from 'redux-saga/effects';
import { index as employeesIndex } from '../EmployeesSaga';
import { employeesScreenActionCreators } from '../../Redux/Views/EmploeesScreenRedux';

export function* requestDataForEmployeesScreen(api, action) {
  try {
    yield put(employeesScreenActionCreators.changeStatus(FETCHING_STATUS.FETCHING));
    yield call(employeesIndex, api, action.payloads.employeesPayload || {});
    yield put(employeesScreenActionCreators.changeStatus(FETCHING_STATUS.SUCCESS));
  } catch(error) {
    yield put(employeesScreenActionCreators.changeStatus(FETCHING_STATUS.ERROR));
  }
}

export function* refreshEmployeesList(api, action) {
  yield put(employeesScreenActionCreators.toggleRefreshingFlag());
  yield call(employeesIndex, api, action.payloads.employeesPayload || {});
  yield put(employeesScreenActionCreators.toggleRefreshingFlag());
}
