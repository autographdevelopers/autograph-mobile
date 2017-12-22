// create driving school request, save driving school
import { createReducer, createActions } from 'reduxsauce';

/* ------------- Types and Action Creators ------------- */
export const STATUS = { READY: 'READY', FETCHING: 'FETCHING', SUCCESS: 'SUCCESS' };

const { Types, Creators } = createActions({
  saveDrivingSchool: ['data'],
  saveDrivingSchools: ['schools'],
  changeStatus: ['status'],
  createDrivingSchoolRequest: ['params', 'formID', 'redirectionAction'], /* SAGA */
  updateDrivingSchoolRequest: ['params', 'formID', 'redirectionAction'], /* SAGA */
  updateEmployeeNotificationsRequest: ['params', 'formID', 'redirectionAction'], /* SAGA */
  updateScheduleBoundariesRequest: ['params', 'formID', 'redirectionAction'], /* SAGA */
  updateScheduleSettingsRequest: ['params', 'formID', 'redirectionAction'], /* SAGA */
  fetchDrivingSchoolsRequest: null, /* SAGA */
});

export const drivingSchoolActionTypes = Types;
export const drivingSchoolActionCreators = Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  collection: [],
  status: STATUS.READY
};

/* ------------- Handlers ------------- */

export const saveDrivingSchoolHandler = (state, { data }) => ({ ...state, collection: [...state.collection, data] });

export const saveDrivingSchoolsHandler = (state, { schools }) => ({ ...state, collection: schools });

export const changeStatusHandler = (state, { status }) => ({ ...state, status });

/* ------------- Gather all handlers to create single reducer ------------- */

export const drivingSchoolReducer = createReducer(INITIAL_STATE, {
  [Types.SAVE_DRIVING_SCHOOL]: saveDrivingSchoolHandler,
  [Types.SAVE_DRIVING_SCHOOLS]: saveDrivingSchoolsHandler,
  [Types.CHANGE_STATUS]: changeStatusHandler
});
