import { call, put } from 'redux-saga/effects';
import { gatherErrorsFromResponse } from '../Lib/apiErrorHandlers';
import { employeePrivilegesActionCreators } from '../Redux/EmployeePrivileges';
import { update as updateForm } from '../Redux/EmployeePrivileges';
import { SubmissionError } from 'redux-form';
import { FETCHING_STATUS } from '../Lib/utils';

export function* update(api, action) {
  const response = yield call(api.employeePrivileges.update, { employee_privileges: action.payload });
  if (response.ok) {
    yield put(updateForm.success());
  } else {
    const errors = gatherErrorsFromResponse(response, api);
    const formError = new SubmissionError(errors);
    yield put(updateForm.failure(formError));
  }
}

export function* show(api, action) {
  yield put(employeePrivilegesActionCreators.changeStatus(FETCHING_STATUS.FETCHING));
  const response = yield call(api.employeePrivileges.show);
  if (response.ok) {
    yield put(employeePrivilegesActionCreators.save(response.data));
    yield put(employeePrivilegesActionCreators.changeStatus(FETCHING_STATUS.SUCCESS));
  } else {
    yield put(employeePrivilegesActionCreators.changeStatus(FETCHING_STATUS.ERROR));
  }
}
