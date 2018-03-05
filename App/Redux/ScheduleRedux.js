import { createReducer, createActions } from 'reduxsauce';
import { deepClone, FETCHING_STATUS } from '../Lib/utils';

const { Types, Creators } = createActions({
  showRequest: null,
  save: ['data'],
  changeStatus: ['status'],
}, { prefix: 'SCHEDULE_' });

export const scheduleActionCreators = Creators;
export const scheduleActionTypes = Types;

const INITIAL_STATE = {
  new_template_binding_from: null,
  new_template: {},
  current_template: {},
  status: FETCHING_STATUS.READY,
};

export const saveHandler = (state, { data }) => ({ ...state, ...data } );

export const changeStatusHandler = (state, { status }) => {
  return { ...deepClone(state), status };
};

export const scheduleReducer = createReducer(INITIAL_STATE, {
  [Types.SAVE]: saveHandler,
  [Types.CHANGE_STATUS]: changeStatusHandler,
});
