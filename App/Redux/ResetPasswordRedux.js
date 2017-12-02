import { createReducer, createActions } from 'reduxsauce';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  resetPasswordRequest: ['email'],
  resetPasswordSuccess: null,
  resetPasswordFailure: ['error'],
  resetPasswordResetState: null
});

export const resetPasswordTypes = Types;
export const resetPasswordCreators = Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  error: '',
  isFetching: false,
  emailSent: false
};

/* ------------- Reducers ------------- */

export const resetPasswordRequest = state => {
  return { ...state, isFetching: true, error: '' }
}

export const resetPasswordSuccess = state => {
  return { ...state, isFetching: false, error: '', emailSent: true }
}

export const resetPasswordFailure = (state, { error }) => {
  return { ...state, isFetching: false, error: error }
}

export const resetPasswordResetState = (state) => {
  return { ...state, ...INITIAL_STATE }
}

/* ------------- Hookup Reducers To Types ------------- */

export const resetPasswordReducer = createReducer(INITIAL_STATE, {
  [Types.RESET_PASSWORD_REQUEST]: resetPasswordRequest,
  [Types.RESET_PASSWORD_SUCCESS]: resetPasswordSuccess,
  [Types.RESET_PASSWORD_FAILURE]: resetPasswordFailure,
  [Types.RESET_PASSWORD_RESET_STATE]: resetPasswordResetState
})
