import { call, put } from 'redux-saga/effects';
import { gatherErrorsFromResponse } from '../Lib/apiErrorHandlers';
import { SubmissionError } from 'redux-form';
import { invite } from '../Redux/InvitationsRedux';
import { employeesActionCreators } from '../Redux/EmployeesRedux';
import { studentsActionCreators } from '../Redux/StudentsRedux';

export function* create(api, action) {
  const response = yield call(api.inviteUser, action.payload);
  if ( response.ok ) {
    if(response.data.type == 'Employee') {
      yield put(employeesActionCreators.saveSingle(response.data));
    } else if(response.data.type == 'Student') {
      yield put(studentsActionCreators.saveSingle(response.data));
    }
    yield put(invite.success());
  } else {
    const errors = gatherErrorsFromResponse(response, api);
    const formError = new SubmissionError(errors);
    yield put(invite.failure(formError));
  }
}
