import { createReducer, createActions } from 'reduxsauce';
import { deepClone, FETCHING_STATUS } from '../Lib/utils';

const { Types, Creators } = createActions({
  showRequest: null,
  save: ['data'],
  changeStatus: ['status']
}, { prefix: 'EMPLOYEE_PRIVILEGES_' });

export const employeePrivilegesActionCreators = Creators;
export const employeePrivilegesActionTypes = Types;

const INITIAL_STATE = {
  // data: {
  //   monday: ['9:00 TIMEZONE', '9:30 TIMEZONE']
  // },
  // status: FETCHING_STATUS.READY
};

export const saveHandler = (state, { data }) => ({...state, data});

export const changeStatusHandler = (state, { status }) => {
  return {...deepClone(state), status}
};

export const employeePrivilegesReducer = createReducer(INITIAL_STATE, {
  [Types.SAVE]: saveHandler,
  [Types.CHANGE_STATUS]: changeStatusHandler,
});

