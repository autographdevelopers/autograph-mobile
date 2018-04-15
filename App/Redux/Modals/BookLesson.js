import { createReducer, createActions } from 'reduxsauce';
import moment from 'moment'
import { FETCHING_STATUS } from '../../Lib/utils';
import _ from 'lodash';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setParams: ['params'],
  createRequest: ['params'],
  changeStatus: ['status']
}, { prefix: 'BOOK_LESSON_MODAL/' });

export const bookLessonActionTypes = Types;
export const bookLessonActionCreators = Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  slot_ids: [],
  employee_id: null,
  student_id: null,

  driving_school_id: null,
  fromHour: null,
  toHour: null,
  date: null,
  status: FETCHING_STATUS.READY
};

/* ------------- Handlers ------------- */

export const setParamsHandler = (state, { params }) => {
  return { ...state, ...params }
};

export const changeStatusHandler = (state, { status }) => {
  const newState = _.cloneDeep(state);
  newState.status = status;

  return newState;
};

/* ------------- Hookup Reducers To Types ------------- */

export const bookLessonReducer = createReducer(INITIAL_STATE, {
  [Types.SET_PARAMS]: setParamsHandler,
  [Types.CHANGE_STATUS]: changeStatusHandler,
});
