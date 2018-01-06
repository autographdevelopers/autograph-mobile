// create driving school request, save driving school
import { createReducer, createActions } from 'reduxsauce';
import { deepClone, arrayToHash, mergeArraysUniq } from '../Lib/utils';

/* ------------- Types and Action Creators ------------- */
export const STATUS = { READY: 'READY', FETCHING: 'FETCHING', SUCCESS: 'SUCCESS', ERROR: 'ERROR' };

const { Types, Creators } = createActions({
  saveDrivingSchool: ['data'],
  updateDrivingSchool: ['data'],
  saveDrivingSchools: ['schools'],
  changeSchoolsStatus: ['status'],
  createDrivingSchoolRequest: ['params', 'formID', 'redirectionAction'], /* SAGA */
  updateDrivingSchoolRequest: ['params', 'formID', 'redirectionAction'], /* SAGA */
  updateScheduleBoundariesRequest: ['params', 'formID', 'redirectionAction'], /* SAGA */
  updateScheduleSettingsRequest: ['params', 'formID', 'redirectionAction'], /* SAGA */
  fetchDrivingSchoolsRequest: null /* SAGA */
});

export const drivingSchoolActionTypes = Types;
export const drivingSchoolActionCreators = Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  hashMap: {},
  allIDs: [],
  status: STATUS.READY
};

/* ------------- Handlers ------------- */

export const saveDrivingSchoolHandler = (state, { data }) => {
  const hashMap = deepClone(state.hashMap);
  hashMap[data.id] = data;
  const allIDs = mergeArraysUniq(state.allIDs, [data.id]);

  return {
    ...state,
    hashMap,
    allIDs
  }
};

export const saveDrivingSchoolsHandler = (state, { schools }) =>
  ({ ...state, hashMap: arrayToHash(schools), allIDs: schools.map( s => s.id) });

export const changeStatusHandler = (state, { status }) => ({ ...state, status });

/* ------------- Gather all handlers to create single reducer ------------- */

export const drivingSchoolReducer = createReducer(INITIAL_STATE, {
  [Types.SAVE_DRIVING_SCHOOL]: saveDrivingSchoolHandler,
  [Types.SAVE_DRIVING_SCHOOLS]: saveDrivingSchoolsHandler,
  [Types.CHANGE_SCHOOLS_STATUS]: changeStatusHandler
});
