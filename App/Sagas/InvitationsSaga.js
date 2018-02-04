import { call, put } from 'redux-saga/effects';
import { gatherErrorsFromResponse } from '../Lib/apiErrorHandlers';
import { SubmissionError } from 'redux-form';
import { invite } from '../Redux/InvitationsRedux';

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

//TODO shouldn't actions be in user saga?
//Ask maciek Can I send multiple invitation to the same person????
