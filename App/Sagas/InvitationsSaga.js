import { call, put } from 'redux-saga/effects';
import { gatherErrorsFromResponse } from '../Lib/apiErrorHandlers';
import { SubmissionError } from 'redux-form';
import { invite } from '../Redux/InvitationsRedux';
import { invitationActionCreators } from '../Redux/InvitationsRedux';
import { drivingSchoolActionCreators } from '../Redux/DrivingSchoolRedux';
import { FETCHING_STATUS } from '../Lib/utils';

export function* create(api, action) {
  const response = yield call(api.inviteUser, action.payload);
  if (response.ok) {
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
    yield put(invitationActionCreators.changeStatus(FETCHING_STATUS.SUCCESS));
  } else {
    yield put(invitationActionCreators.changeStatus(FETCHING_STATUS.ERROR));
  }
}

export function* reject(api, action) {
  yield put(invitationActionCreators.changeStatus(FETCHING_STATUS.FETCHING));

  const response = yield call(api.invitations.reject, action.id);
  if (response.ok) {
    yield put(drivingSchoolActionCreators.destroySingle(action.id));
    yield put(invitationActionCreators.changeStatus(FETCHING_STATUS.SUCCESS));
  } else {
    yield put(invitationActionCreators.changeStatus(FETCHING_STATUS.ERROR));
  }
}
