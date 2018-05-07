import { createReducer, createActions } from 'reduxsauce';
import { FETCHING_STATUS } from '../../Lib/utils';

const INITIAL_STATE = {
  status: FETCHING_STATUS.READY,
};

const { Types, Creators } = createActions({
  requestDataForView: { payloads: {} },
  changeStatus: ['status']
}, { prefix: 'STUDENT_PROFILE_SCREEN/' } );

export const studentProfileActionCreators = Creators;
export const studentProfileActionTypes = Types;

const changeStatusHandler = (state, { status }) =>
  ({...state, status});

export const studentProfileScreenReducer = createReducer(INITIAL_STATE, {
  [Types.CHANGE_STATUS]: changeStatusHandler
});

