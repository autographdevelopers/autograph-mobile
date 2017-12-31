import { createReducer, createActions } from 'reduxsauce';

/* ------------- Types and Action Creators ------------- */

export const STATUS = { READY: 'READY', SENDING: 'SENDING', SUCCESS: 'SUCCESS', ERROR: 'ERROR' };

const { Types, Creators } = createActions({
  inviteUserRequest: ['params', 'formID'], /* SAGA */
  changeInvitationStatus: ['status']
});

// Look out for conflict in type names

export const INITIAL_STATE = {
  status: STATUS.READY,
};

export const invitationActionTypes = Types;
export const invitationActionCreators = Creators;

export const changeStatus = (state=INITIAL_STATE, action) => {
  return { ...state, status: action.status }
};

export const invitationsReducer = createReducer(INITIAL_STATE, {
  [Types.CHANGE_INVITATION_STATUS]: changeStatus,
});
