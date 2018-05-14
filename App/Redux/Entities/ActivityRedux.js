import { createReducer, createActions } from 'reduxsauce';
import { FETCHING_STATUS } from '../../Lib/utils';
import _ from 'lodash';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  saveCollection: ['activities', 'activityDisplayType'],
  changeStatus: ['status'],
  indexRequest: ['params'],
  myActivitiesRequest: ['params'],
}, { prefix: 'ACTIVITY_' });

export const activityActionTypes = Types;
export const activityActionCreators = Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  data: {},
  status: FETCHING_STATUS.READY
};

/* ------------- Handlers ------------- */

export const saveCollectionHandler = (state, { activities }) => {
  const newState = _.cloneDeep(state);
  _.each(activities, activity =>
    newState.data[activity.id] = activity
  );

  return newState
};

export const changeStatusHandler = (state, { status }) => ({ ...state, status });

/* ------------- Gather all handlers to create single reducer ------------- */

export const activitiesReducer = createReducer(INITIAL_STATE, {
  [Types.SAVE_COLLECTION]: saveCollectionHandler,
  [Types.CHANGE_STATUS]: changeStatusHandler,
});
