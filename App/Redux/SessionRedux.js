import { createReducer, createActions } from 'reduxsauce';
import { createFormAction } from 'redux-form-saga';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setUserSession: ['sessionMetadata'],
  setAuthenticationErrorMessage: ['errorMessage'],
  clearAuthenticationErrorMessage: null,
  destroyRequest: null,
  resetState: null
});

export const login = createFormAction('LOGIN');

export const sessionActionTypes = Types;
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

export const setUserSessionHandler = (state, { sessionMetadata }) => {
  return { ...state, ...sessionMetadata, errorMessage: null }
};

export const setAuthenticationErrorMessageHandler = (state, { errorMessage }) => {
  return { ...state, errorMessage };
};

export const clearAuthenticationErrorMessageHandler = (state, _) => {
  return { ...state, errorMessage: null };
};

export const resetStateHandler = state => INITIAL_STATE;

/* ------------- Gather all handlers to create single reducer ------------- */

export const sessionReducer = createReducer(INITIAL_STATE, {
  [Types.SET_USER_SESSION]: setUserSessionHandler,
  [Types.SET_AUTHENTICATION_ERROR_MESSAGE]: setAuthenticationErrorMessageHandler,
  [Types.CLEAR_AUTHENTICATION_ERROR_MESSAGE]: clearAuthenticationErrorMessageHandler,
  [Types.RESET_STATE]: resetStateHandler
});
