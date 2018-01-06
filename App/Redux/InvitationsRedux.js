import { createReducer, createActions } from 'reduxsauce';
import { createFormAction } from 'redux-form-saga';

export const invite = createFormAction('INVITE');

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  inviteUserRequest: ['params', 'formID'], /* SAGA */
});

// Look out for conflict in type names

export const invitationActionTypes = Types;
export const invitationActionCreators = Creators;
