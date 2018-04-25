import { createReducer, createActions } from 'reduxsauce';
import { deepClone, arrayToHash } from '../Lib/utils';
import { FETCHING_STATUS } from '../Lib/utils';
import { ACTIVITY_DISPLAY_TYPE } from '../Lib/ActivitiesHelper';
import _ from 'lodash';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  saveCollection: ['activities', 'activityDisplayType'],
  changeStatus: ['status'],
  indexRequest: ['params', 'activityDisplayType'],
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
  userActivitiesFeedEndReached: false,
  myActivitiesEndReached: false,
  activitiesListEndReached: false,
  status: FETCHING_STATUS.READY
};

/* ------------- Handlers ------------- */

export const saveCollectionHandler = (state, { activities, activityDisplayType }) => {
  const activities_length = activities.length
  const newState = _.cloneDeep(state)
  _.each(activities, activity =>
    newState.data[activity.id] = activity
  )
  switch(activityDisplayType) {
    case ACTIVITY_DISPLAY_TYPE.ACTIVITIES_LIST:
      newState.activitiesListIds = activities.map(s => s.id);
      newState.activitiesListEndReached = !activities_length;
      break;
    case ACTIVITY_DISPLAY_TYPE.USER_ACTIVITIES_FEED:
      newState.userActivitiesFeedIds = activities.map(s => s.id);
      newState.userActivitiesFeedEndReached = !activities_length;
      break;
    case ACTIVITY_DISPLAY_TYPE.MY_ACTIVITIES:
      newState.myActivitiesIds = _.uniq(_.concat(newState.myActivitiesIds, activities.map(s => s.id)));
      newState.myActivitiesEndReached = !activities_length;
      break;
  }

  return newState
}

export const changeStatusHandler = (state, { status }) => ({ ...state, status });

/* ------------- Gather all handlers to create single reducer ------------- */

export const activityReducer = createReducer(INITIAL_STATE, {
  [Types.SAVE_COLLECTION]: saveCollectionHandler,
  [Types.CHANGE_STATUS]: changeStatusHandler,
});
