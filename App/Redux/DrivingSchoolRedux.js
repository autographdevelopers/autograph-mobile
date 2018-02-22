import { createReducer, createActions } from 'reduxsauce';
import { deepClone, arrayToHash, mergeArraysUniq } from '../Lib/utils';
import { createFormAction } from 'redux-form-saga';
import { FETCHING_STATUS } from '../Lib/utils';

export const createDrivingSchool = createFormAction('CREATE_DRIVING_SCHOOL');
export const updateDrivingSchool = createFormAction('UPDATE_DRIVING_SCHOOL');

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  saveSingle: ['data'],
  destroySingle: ['schoolId'],
  saveCollection: ['schools'],
  changeStatus: ['status'],
  /* SAGAS */
  indexRequest: null,
  showRequest: null
}, { prefix: 'DRIVING_SCHOOL_' });

export const drivingSchoolActionTypes = Types;
export const drivingSchoolActionCreators = Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  hashMap: {},
  allIDs: [],
  status: FETCHING_STATUS.READY
};

/* ------------- Handlers ------------- */

export const saveSingleHandler = (state, { data }) => {
  const hashMap = deepClone(state.hashMap);
  hashMap[data.id] = data;
  const allIDs = mergeArraysUniq(state.allIDs, [data.id]);

  return {
    ...state,
    hashMap,
    allIDs
  }
};

export const destroySingleHandler = (state, { schoolId }) => {
  const hashMap = deepClone(state.hashMap);
  delete hashMap[schoolId];
  const allIDs = state.allIDs.filter(id => schoolId !== id );

  return {
    ...state,
    hashMap,
    allIDs
  }
};

export const saveCollectionHandler = (state, { schools }) =>
  ({ ...state, hashMap: arrayToHash(schools), allIDs: schools.map(s => s.id) });

export const changeStatusHandler = (state, { status }) => ({ ...state, status });

/* ------------- Gather all handlers to create single reducer ------------- */

export const drivingSchoolReducer = createReducer(INITIAL_STATE, {
  [Types.SAVE_SINGLE]: saveSingleHandler,
  [Types.DESTROY_SINGLE]: destroySingleHandler,
  [Types.SAVE_COLLECTION]: saveCollectionHandler,
  [Types.CHANGE_STATUS]: changeStatusHandler
});
