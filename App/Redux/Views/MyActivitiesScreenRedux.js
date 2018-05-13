import { createReducer, createActions } from 'reduxsauce';
import { FETCHING_STATUS } from '../../Lib/utils';
import _ from 'lodash';

const INITIAL_STATE = {
  status: FETCHING_STATUS.READY,
  ids: [],
  nextPage: 1,
  endReached: false,
  fetchingMore: false // TODO add handlers
};

const { Types, Creators } = createActions({
  requestDataForView: { payloads: {} },
  saveActivities: ['activities'],
  changeStatus: ['status']
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

export const myActivitiesScreenReducer = createReducer(INITIAL_STATE, {
  [Types.CHANGE_STATUS]: changeStatusHandler,
  [Types.SAVE_ACTIVITIES]: saveActivitiesIdsHandler,
});
