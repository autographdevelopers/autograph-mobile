import { createReducer, createActions } from 'reduxsauce';
import { FETCHING_STATUS } from '../../Lib/utils';
import _ from 'lodash';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  indexRequest: ['params', 'callback'],
  save: ['data'],
  changeStatus: ['status'],
  releaseLesson: ['id']
}, { prefix: 'SLOTS_' });

export const slotActionTypes = Types;
export const slotActionCreators = Creators;

export const SLOTS_FETCHED_CALLBACKS = {
  SUMMARY_AGENDA_PUSH_CACHE_HISTORY: 'SUMMARY_AGENDA_PUSH_CACHE_HISTORY',
  DAILY_AGENDA_PUSH_CACHE_HISTORY: 'DAILY_AGENDA_PUSH_CACHE_HISTORY',
};

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  // data: {
  //  id: {
  //    id
  //    start_time
  //    employee_driving_school_id
  //    status
  //    driving_lesson_id
  //  }, ...
  // },
  // allIds: [...],
  data: {},
  allIds: [],
  status: FETCHING_STATUS.READY
};

/* ------------- Handlers ------------- */

export const saveHandler = (state, { data }) => {
  const newState = _.cloneDeep(state);
  const slots = _.flattenDeep([data]);

  _.each(slots, slot => newState.data[slot.id] = slot);
  newState.allIds = Object.keys(newState.data);

  return newState;
};

export const releaseLessonHandler = (state, { id }) => {
  const newState = _.cloneDeep(state);
  newState.data = _.mapValues(newState.data, slot => {
    if(slot.driving_lesson_id === id) {
      slot.driving_lesson_id = null;
      slot.release_at = null;
    }
    return slot;
  })
  return newState;
};

export const changeStatusHandler = (state, {status}) => {
  const newState = _.cloneDeep(state);
  newState.status = status;

  return newState;
};

/* ------------- Hookup Reducers To Types ------------- */

export const slotsReducer = createReducer(INITIAL_STATE, {
  [slotActionTypes.SAVE]: saveHandler,
  [slotActionTypes.CHANGE_STATUS]: changeStatusHandler,
  [slotActionTypes.RELEASE_LESSON]: releaseLessonHandler
});
