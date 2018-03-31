import { createReducer, createActions } from 'reduxsauce';
import { FETCHING_STATUS } from '../Lib/utils';
import _ from 'lodash';

/* ------------- Types and Action Creators ------------- */

const INFINITY = 999;

const { Types, Creators } = createActions({
  indexRequest: ['params', 'daySelected'],
  save: ['data'],
  changeStatus: ['status']
}, { prefix: 'SLOTS_' });

export const slotActionTypes = Types;
export const slotActionCreators = Creators;

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

  const slots = _.flattenDepth([data], INFINITY);

  /**
   * Because I want a single handler for saving array of slots and single slot
   * I use this mechanism to make sure that I end up with an array of slots
   * even when there will be only one element so that I can process
   * single slot and collection in the same way.
   */

  console.tron.log(slots);

  _.forEach(slots, slot => newState.data[slot.id] = slot);

  newState.allIds = Object.values(newState.data).map(item => item.id);

  return newState;
};

export const changeStatusHandler = (state, {status}) => {
  const newState = _.cloneDeep(state);
  newState.status = status;

  return newState;
};

/* ------------- Hookup Reducers To Types ------------- */

export const slotReducer = createReducer(INITIAL_STATE, {
  [slotActionTypes.SAVE]: saveHandler,
  [slotActionTypes.CHANGE_STATUS]: changeStatusHandler
});
