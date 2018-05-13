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
  setFetchingMoreFlag: ['value']
}, { prefix: 'MY_ACTIVITIES_SCREEN/' });

export const myActivitiesScreenActionCreators = Creators;
export const myActivitiesScreenActionTypes = Types;

const changeStatusHandler = (state, { status }) => {
  const newState =  _.cloneDeep(state);
  newState.status = status;

  return newState;
};

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

export const myActivitiesScreenReducer = createReducer(INITIAL_STATE, {
  [Types.CHANGE_STATUS]: changeStatusHandler,
  [Types.SAVE_ACTIVITIES]: saveActivitiesIdsHandler,
  [Types.SET_FETCHING_MORE_FLAG]: setFetchingMoreFlagHandler,
});
