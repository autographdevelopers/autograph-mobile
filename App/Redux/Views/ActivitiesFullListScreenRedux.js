import { createReducer, createActions } from 'reduxsauce';
import { FETCHING_STATUS } from '../../Lib/utils';
import _ from 'lodash';

const INITIAL_STATE = {
  status: FETCHING_STATUS.READY,
  ids: [],
  nextPage: 1,
  endReached: false,
  fetchingMore: false
};

const { Types, Creators } = createActions({
  requestDataForView: { payloads: {} },
  requestMoreActivities: ['params'],
  saveActivities: ['activities'],
  changeStatus: ['status'],
  setFetchingMoreFlag: ['value'],
  resetState: null
}, { prefix: 'ACTIVITIES_FULL_LIST_SCREEN/' });

export const activitiesFullListScreenScreenActionCreators = Creators;
export const activitiesFullListScreenScreenActionTypes = Types;

const changeStatusHandler = (state, { status }) => {
  const newState =  _.cloneDeep(state);
  newState.status = status;

  return newState;
};

const resetStateHandler = state => INITIAL_STATE;

const saveActivitiesIdsHandler = (state, { activities }) => {
  const newState =  _.cloneDeep(state);
  newState.ids = [...newState.ids, ...activities.map(a => a.id)];
  newState.endReached = !activities.length;
  if(activities.length) newState.nextPage = state.nextPage + 1;

  return newState;
};

const setFetchingMoreFlagHandler = (state, { value }) => {
  const newState =  _.cloneDeep(state);
  newState.fetchingMore = value;

  return newState;
};

export const activitiesFullListScreenReducer = createReducer(INITIAL_STATE, {
  [Types.CHANGE_STATUS]: changeStatusHandler,
  [Types.SAVE_ACTIVITIES]: saveActivitiesIdsHandler,
  [Types.SET_FETCHING_MORE_FLAG]: setFetchingMoreFlagHandler,
  [Types.RESET_STATE]: resetStateHandler,
});
