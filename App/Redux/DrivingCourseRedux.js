import { createReducer, createActions } from 'reduxsauce';
import { deepClone } from '../Lib/utils';
import { FETCHING_STATUS } from '../Lib/utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  saveSingle: ['data'],
  changeStatus: ['status'],
  updateRequest: ['data'],
  showRequest: null
}, { prefix: 'DRIVING_COURSE_' });

export const drivingCourseActionTypes = Types;
export const drivingCourseActionCreators = Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  data: {},
  status: FETCHING_STATUS.READY
};

/* ------------- Handlers ------------- */

export const saveSingleHandler = (state, { data }) => {
  const newState = deepClone(state);
  newState.data = data;

  return newState
};

export const changeStatusHandler = (state, { status }) => ({ ...state, status });

/* ------------- Gather all handlers to create single reducer ------------- */

export const drivingCourseReducer = createReducer(INITIAL_STATE, {
  [Types.SAVE_SINGLE]: saveSingleHandler,
  [Types.CHANGE_STATUS]: changeStatusHandler
});
