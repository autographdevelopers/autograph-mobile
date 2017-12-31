import { startSubmit, stopSubmit } from 'redux-form'
import { call, put } from 'redux-saga/effects';
import { gatherErrorsFromResponse } from '../Lib/apiErrorHandlers';
import { View } from 'react-native';
import { invitationActionCreators } from '../Redux/InvitationsRedux';
import { STATUS } from '../Redux/InvitationsRedux';

export function* invite(api, action) {
  console.log('action');
  console.log(action);
  yield put(invitationActionCreators.changeInvitationStatus(STATUS.SENDING));
  const response = yield call(api.inviteUser, action.params);
  if (response.ok) {
    yield put(invitationActionCreators.changeInvitationStatus(STATUS.SUCCESS));
  } else {
    yield put(invitationActionCreators.changeInvitationStatus(STATUS.ERROR));
    const errors = gatherErrorsFromResponse(response, api);
    yield put(stopSubmit(action.formID, errors));
  }
}
// TODO ADD start submit and verify if spinner works
//Ask maciek Can I send multiple invitation to the same person????
