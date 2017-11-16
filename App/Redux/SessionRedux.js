import { createReducer, createActions } from 'reduxsauce';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setUserSession: ['sessionMetadata'],
  setAuthenticationErrorMessage: ['errorMessage'],
  clearAuthenticationErrorMessage: null
});

// Entry point for the login procedure - will be handled by saga
Types['REQUEST_LOGIN_PROCEDURE'] = 'REQUEST_LOGIN_PROCEDURE';

export const SESSION_ACTION_TYPES = Types;
export const sessionActionCreators = Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  errorMessage: null,
  accessToken: null,
  tokenType: null,
  clientId: null,
  expirationDate: null
};

/* ------------- Handlers ------------- */

export const setUserSessionHandler = (state, {sessionMetadata}) => {
  return {...state, ...sessionMetadata}
};

export const setAuthenticationErrorMessageHandler = (state, {errorMessage}) => {
  return {...state, errorMessage};
};

export const clearAuthenticationErrorMessageHandler = (state, _) => {
  return {...state, errorMessage: null};
};

/* ------------- Gather all handlers to create single reducer ------------- */

export const sessionReducer = createReducer(INITIAL_STATE, {
  [Types.SET_USER_SESSION]: setUserSessionHandler,
  [Types.SET_AUTHENTICATION_ERROR_MESSAGE]: setAuthenticationErrorMessageHandler,
  [Types.CLEAR_AUTHENTICATION_ERROR_MESSAGE]: clearAuthenticationErrorMessageHandler
});
