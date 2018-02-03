import { createFormAction } from 'redux-form-saga';
import { createReducer, createActions } from 'reduxsauce';
import { deepClone, FETCHING_STATUS } from '../Lib/utils';

export const update = createFormAction('UPDATE_PRIVILEGES');

const { Types, Creators } = createActions({
  showRequest: null,
  save: ['data'],
  changeStatus: ['status']
}, { prefix: 'EMPLOYEE_PRIVILEGES_' });

export const employeePrivilegesActionCreators = Creators;
export const employeePrivilegesActionTypes = Types;

const INITIAL_STATE = {
// data:
// employee_driving_school_id
// can_manage_employees
// can_manage_students
// can_modify_schedules
// is_driving
// is_owner
// status: FETCHING_STATUS[?]
};

export const saveHandler = (state, { data }) => ({...state, data});
export const changeStatusHandler = (state, { status }) => {
  return {...deepClone(state), status}
};

export const employeePrivilegesReducer = createReducer(INITIAL_STATE, {
  [Types.SAVE]: saveHandler,
  [Types.CHANGE_STATUS]: changeStatusHandler,
});


// TODO here we keep privileges of currently browsed employee, create another educer for myPrivileges
// TODO change hashmap to array in schedule settings
