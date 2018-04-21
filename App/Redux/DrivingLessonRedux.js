import { createReducer, createActions } from 'reduxsauce';
import { FETCHING_STATUS } from '../Lib/utils';
import _ from 'lodash';

/* ------------- Types and Action Creators ------------- */
const INFINITY = 999;

const { Types, Creators } = createActions({
  save: ['data'],
  changeStatus: ['status'],
  indexRequest: ['params'],
  cancelRequest: ['id'],
  createRequest: ['params'],
  destroySingle: ['lessonId']
}, { prefix: 'DRIVING_LESSON_' });

export const drivingLessonActionTypes = Types;
export const drivingLessonActionCreators = Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  hashMap: {},
  allIDs: [],
  status: FETCHING_STATUS.READY
};

/* ------------- Handlers ------------- */

export const changeStatusHandler = (state, { status }) => ({ ...state, status });

export const destroySingleHandler = (state, { lessonId }) => {
  const newState = _.cloneDeep(state);
  delete newState.hashMap[lessonId];
  // must be !=
  newState.allIDs = newState.allIDs.filter(id => lessonId != id );

  return newState;
};

export const saveHandler = (state, { data }) => {
  const newState = _.cloneDeep(state);
  const lessons = _.flattenDepth([data], INFINITY);
  _.each(lessons, lesson => newState.hashMap[lesson.id] = lesson);
  newState.allIDs = Object.keys(newState.hashMap);

  return newState;
};

/* ------------- Gather all handlers to create single reducer ------------- */

export const drivingLessonReducer = createReducer(INITIAL_STATE, {
  [Types.SAVE]: saveHandler,
  [Types.CHANGE_STATUS]: changeStatusHandler,
  [Types.DESTROY_SINGLE]: destroySingleHandler
});
