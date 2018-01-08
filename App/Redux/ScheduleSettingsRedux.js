import { createFormAction } from 'redux-form-saga';
import { deepClone, FETCHING_STATUS, mergeArraysUniq } from '../Lib/utils';
import { createReducer, createActions } from 'reduxsauce';

export const INITIAL_STATE = {
  hashMap: {},
  allIDs: [],
  status: FETCHING_STATUS.READY
};

/** Action Types/Creators */
export const updateScheduleSettings = createFormAction('UPDATE_SCHEDULE_SETTINGS'); /** redux-form-saga*/

const { Types, Creators } = createActions({
  save: ['data'],
  changeStatus: ['status'],
  showRequest: null /* SAGA */
}, { prefix: 'SCHEDULE_SETTINGS_' });

export const scheduleSettingsActionCreators = Creators;
export const scheduleSettingsTypes = Types;
/** Handlers */
export const save = (state, { data }) => {
  console.log('save reducer:::');
  console.log(data);
  const hashMap = deepClone(state.hashMap);
  hashMap[data.id] = data;
  const allIDs = mergeArraysUniq(state.allIDs, [data.id]);

  return {
    ...state,
    hashMap,
    allIDs
  }
};

export const updateStatus = (state, { status }) => ({ ...state, status });

/** Reducer */

export const scheduleSettingsReducer = createReducer(INITIAL_STATE, {
  [Types.SAVE]: save,
  [Types.CHANGE_STATUS]: updateStatus
});

// TODO add error field

