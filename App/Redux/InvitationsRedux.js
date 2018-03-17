import { createFormAction } from 'redux-form-saga';
import { createReducer, createActions } from 'reduxsauce';
import { deepClone, FETCHING_STATUS } from '../Lib/utils'

export const invite = createFormAction('INVITE');

const { Types, Creators } = createActions({
  acceptRequest: ['id'],
  rejectRequest: ['id'],
  destroyRequest: ['params'],
  changeStatus: ['status']
}, { prefix: 'INVITATIONS_' });

export const invitationActionTypes = Types;
export const invitationActionCreators = Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  status: FETCHING_STATUS.READY
};

/* ------------- Handlers ------------- */

export const changeStatusHandler = (state, { status }) => ({ ...state, status });

/* ------------- Gather all handlers to create single reducer ------------- */

export const invitationsReducer = createReducer(INITIAL_STATE, {
  [Types.CHANGE_STATUS]: changeStatusHandler,
});
