import { createReducer, createActions } from 'reduxsauce';
import { deepClone, arrayToHash } from '../Lib/utils';
import { FETCHING_STATUS } from '../Lib/utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  saveCollection: ['lessons'],
  changeStatus: ['status'],
  indexRequest: ['params'],
  cancelRequest: ['id'],
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

export const saveCollectionHandler = (state, { lessons }) =>
  ({...state, hashMap: arrayToHash(lessons), allIDs: lessons.map(l => l.id)});

export const changeStatusHandler = (state, { status }) => ({ ...state, status });

export const destroySingleHandler = (state, { lessonId }) => {
  const newState = deepClone(state);
  delete newState.hashMap[lessonId];
  newState.allIDs = newState.allIDs.filter(id => lessonId !== id );

  return newState
};

/* ------------- Gather all handlers to create single reducer ------------- */

export const drivingLessonReducer = createReducer(INITIAL_STATE, {
  [Types.SAVE_COLLECTION]: saveCollectionHandler,
  [Types.CHANGE_STATUS]: changeStatusHandler,
  [Types.DESTROY_SINGLE]: destroySingleHandler
});
