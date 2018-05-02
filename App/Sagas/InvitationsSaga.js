import { call, put } from 'redux-saga/effects';
import { gatherErrorsFromResponse } from '../Lib/apiErrorHandlers';
import { SubmissionError } from 'redux-form';
import { invite } from '../Redux/Views/InvitationsRedux';
import { employeesActionCreators } from '../Redux/Entities/EmployeesRedux';
import { studentsActionCreators } from '../Redux/Entities/StudentsRedux';
import { invitationActionCreators } from '../Redux/Views/InvitationsRedux';
import { drivingSchoolActionCreators } from '../Redux/Entities/DrivingSchoolRedux';
import { FETCHING_STATUS } from '../Lib/utils';

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

export function* accept(api, action) {
  yield put(invitationActionCreators.changeStatus(FETCHING_STATUS.FETCHING));

  const response = yield call(api.invitations.accept, action.id);
  if (response.ok) {
    yield put(drivingSchoolActionCreators.saveSingle(response.data));
    yield put(invitationActionCreators.changeStatus(FETCHING_STATUS.READY));
  } else {
    yield put(invitationActionCreators.changeStatus(FETCHING_STATUS.ERROR));
  }
}

export function* reject(api, action) {
  yield put(invitationActionCreators.changeStatus(FETCHING_STATUS.FETCHING));

  const response = yield call(api.invitations.reject, action.id);
  if (response.ok) {
    yield put(drivingSchoolActionCreators.destroySingle(action.id));
    yield put(invitationActionCreators.changeStatus(FETCHING_STATUS.READY));
  } else {
    yield put(invitationActionCreators.changeStatus(FETCHING_STATUS.ERROR));
  }
}

export function* destroy(api, action) {
  yield put(invitationActionCreators.changeStatus(FETCHING_STATUS.FETCHING));

  const response = yield call(api.invitations.destroy, action.params, action.id);
  if (response.ok) {
    if(action.params.type === 'Student')
      yield put(studentsActionCreators.destroySinglePending(action.params.user_id));
    else if(action.params.type === 'Employee')
      yield put(employeesActionCreators.destroySinglePending(action.params.user_id));

    yield put(invitationActionCreators.changeStatus(FETCHING_STATUS.SUCCESS));
  } else {
    yield put(invitationActionCreators.changeStatus(FETCHING_STATUS.ERROR));
  }
}
