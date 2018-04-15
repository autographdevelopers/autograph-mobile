import { createReducer, createActions } from 'reduxsauce';
import { deepClone, arrayToHash } from '../Lib/utils';
import { FETCHING_STATUS } from '../Lib/utils';
import { ACTIVITY_DISPLAY_TYPE } from '../Lib/ActivitiesHelper';

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
  userActivitiesFeedIds: [],
  myActivitiesIds: [],
  activitiesListIds: [],
  status: FETCHING_STATUS.READY
};

/* ------------- Handlers ------------- */

export const saveCollectionHandler = (state, { activities, activityDisplayType }) => {
  switch(activityDisplayType) {
    case ACTIVITY_DISPLAY_TYPE.ACTIVITIES_LIST:
      return { ...state, data: arrayToHash(activities), activitiesListIds: activities.map(s => s.id) }
    case ACTIVITY_DISPLAY_TYPE.USER_ACTIVITIES_FEED:
      return { ...state, data: arrayToHash(activities), userActivitiesFeedIds: activities.map(s => s.id) }
    case ACTIVITY_DISPLAY_TYPE.MY_ACTIVITIES:
      return { ...state, data: arrayToHash(activities), myActivitiesIds: activities.map(s => s.id) }
    default:
      return state
  }
}

export const changeStatusHandler = (state, { status }) => ({ ...state, status });

/* ------------- Gather all handlers to create single reducer ------------- */

export const activityReducer = createReducer(INITIAL_STATE, {
  [Types.SAVE_COLLECTION]: saveCollectionHandler,
  [Types.CHANGE_STATUS]: changeStatusHandler,
});
