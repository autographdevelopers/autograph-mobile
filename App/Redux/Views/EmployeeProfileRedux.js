import { createReducer, createActions } from 'reduxsauce';
import { FETCHING_STATUS } from '../../Lib/utils';

const INITIAL_STATE = {
  status: FETCHING_STATUS.READY,
};

const { Types, Creators } = createActions({
  requestDataForView: { payloads: {} },
  changeStatus: ['status']
}, { prefix: 'EMPLOYEE_PROFILE_SCREEN/' } );

export const employeeProfileActionCreators = Creators;
export const employeeProfileActionTypes = Types;

const changeStatusHandler = (state, { status }) =>
  ({...state, status});

export const employeeProfileScreenReducer = createReducer(INITIAL_STATE, {
  [Types.CHANGE_STATUS]: changeStatusHandler
});
