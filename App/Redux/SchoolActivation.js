import { createActions, createReducer } from 'reduxsauce';
import { FETCHING_STATUS } from '../Lib/utils';

const { Types, Creators } = createActions({
  request: ['code'],
  resetState: null,
  setInputText: ['text'],
  setStatus: ['status'],
  raiseError: ['error'],
  setSchoolToBeActivated: ['id']
}, { prefix: 'SCHOOL_ACTIVATION_' });

export const schoolActivationActionTypes = Types;
export const schoolActivationActionCreators = Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  schoolId: null,
  status: FETCHING_STATUS.READY,
  inputVerificationCode: null,
  errorMessage: null
};

/* ------------- Handlers ------------- */

export const setSchoolToBeActivatedHandler = (state, { id }) => ({ ...state, schoolId: id });

export const setStatusHandler = (state, { status }) => ({ ...state, status });

export const raiseErrorHandler = (state, { error }) => ({ ...state, errorMessage: error });

export const setInputTextHandler = (state, { text }) => ({ ...state, inputVerificationCode: text });

export const resetStateHandler = _ => ({...INITIAL_STATE});

/* ------------- Gather all handlers to create single reducer ------------- */

export const schoolActivationReducer = createReducer(INITIAL_STATE, {
  [Types.SET_SCHOOL_TO_BE_ACTIVATED]: setSchoolToBeActivatedHandler,
  [Types.SET_STATUS]: setStatusHandler,
  [Types.RAISE_ERROR]: raiseErrorHandler,
  [Types.SET_INPUT_TEXT]: setInputTextHandler,
  [Types.RESET_STATE]: resetStateHandler,
});
