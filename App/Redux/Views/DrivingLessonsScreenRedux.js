import { createReducer, createActions } from 'reduxsauce';
import { FETCHING_STATUS } from '../../Lib/utils';
import _ from 'lodash';

const INITIAL_STATE = {
  status: FETCHING_STATUS.READY,
  refreshing: false,
  ids: []
};

const { Types, Creators } = createActions({
  toggleRefreshingFlag: null,
  requestDataForView: { payloads: {} },
  refreshListRequest: { payloads: {} },
  saveLessons: ['lessons'],
  changeStatus: ['status'],
  resetState: null
}, { prefix: 'DRIVING_LESSONS_FULL_LIST_SCREEN/' });

export const drivingLessonsScreenActionCreators = Creators;
export const drivingLessonsScreenActionTypes = Types;

const toggleRefreshingFlagHandler = state => {
  const newState =  _.cloneDeep(state);
  newState.refreshing = !state.refreshing;

  return newState;
};

const resetStateHandler = state => INITIAL_STATE;

const changeStatusHandler = (state, { status }) => {
  const newState =  _.cloneDeep(state);
  newState.status = status;

  return newState;
};

const saveLessonsIdsHandler = (state, { lessons }) => {
  const newState =  _.cloneDeep(state);
  newState.ids = lessons.map(l => l.id);

  return newState;
};

export const drivingLessonsScreenReducer = createReducer(INITIAL_STATE, {
  [Types.TOGGLE_REFRESHING_FLAG]: toggleRefreshingFlagHandler,
  [Types.CHANGE_STATUS]: changeStatusHandler,
  [Types.SAVE_LESSONS]: saveLessonsIdsHandler,
  [Types.RESET_STATE]: resetStateHandler,
});
