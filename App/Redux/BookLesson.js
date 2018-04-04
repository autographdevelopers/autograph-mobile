import { createReducer, createActions } from 'reduxsauce';
import moment from 'moment'
import { FETCHING_STATUS } from '../Lib/utils';
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setParams: ['params'],
  createRequest: ['params']
});

export const bookLessonActionTypes = Types;
export const bookLessonActionCreators = Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  fromHour: null,
  toHour: null,
  date: null,
  employee_id: null,
  student_id: null,
  driving_school_id: null,
  slot_ids: [],
  status: FETCHING_STATUS.READY
};

/* ------------- Handlers ------------- */

export const setParamsHandler = (state, { params }) => {
  return { ...state, ...params }
};

/* ------------- Hookup Reducers To Types ------------- */

export const bookLessonReducer = createReducer(INITIAL_STATE, {
  [Types.SET_PARAMS]: setParamsHandler,
});
