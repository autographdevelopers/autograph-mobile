import { startSubmit, stopSubmit } from 'redux-form'
import { call, put } from 'redux-saga/effects';
import { gatherErrorsFromResponse } from '../Lib/apiErrorHandlers';
import { View } from 'react-native';
import { invitationActionCreators } from '../Redux/InvitationsRedux';
import { STATUS } from '../Redux/InvitationsRedux';

export function* invite(api, action) {
  yield put(startSubmit(action.formID));
  yield put(invitationActionCreators.changeInvitationStatus(STATUS.SENDING));
  const response = yield call(api.inviteUser, action.params);
  if (response.ok) {
    yield put(stopSubmit(action.formID));
    yield put(invitationActionCreators.changeInvitationStatus(STATUS.SUCCESS));
  } else {
    yield put(invitationActionCreators.changeInvitationStatus(STATUS.ERROR));
    const errors = gatherErrorsFromResponse(response, api);
    yield put(stopSubmit(action.formID, errors));
  }
}

//shouldn't actions be in user saga?
//Ask maciek Can I send multiple invitation to the same person????
