import { createReducer, createActions } from 'reduxsauce';
import { FETCHING_STATUS } from '../../Lib/utils';
import _ from 'lodash';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  init: ['drivingLesson'],
  changeStatus: ['status']
}, { prefix: 'CANCEL_LESSON_MODAL/' });

export const cancelDrivingLessonModalActionTypes = Types;
export const cancelDrivingLessonModalActionCreators = Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  drivingLesson: null,
  status: FETCHING_STATUS.READY
};

/* ------------- Handlers ------------- */

export const initHandler = (state, { drivingLesson }) => {
  const newState = _.cloneDeep(state);
  newState.drivingLesson = drivingLesson;
  newState.status = FETCHING_STATUS.READY;

  return newState;
};

export const changeStatusHandler = (state, { status }) => {
  const newState = _.cloneDeep(state);
  newState.status = status;

  return newState;
};

/* ------------- Hookup Reducers To Types ------------- */

export const cancelDrivingLessonModalReducer = createReducer(INITIAL_STATE, {
  [Types.CHANGE_STATUS]: changeStatusHandler,
  [Types.INIT]: initHandler,
});
