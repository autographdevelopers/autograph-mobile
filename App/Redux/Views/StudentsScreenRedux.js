import { createReducer, createActions } from 'reduxsauce';
import { FETCHING_STATUS } from '../../Lib/utils';

const INITIAL_STATE = {
  status: FETCHING_STATUS.READY,
  refreshing: false
};

const { Types, Creators } = createActions({
  toggleRefreshingFlag: null,
  requestDataForView: null,
  changeStatus: ['status']
});

export const studentsScreenActionCreators = Creators;

const toggleRefreshingFlagHandler = state =>
  ({...state, refreshing: !state.refreshing});

const changeStatusHandler = (state, { status }) =>
  ({...state, status});

export const studentsScreenReducer = createReducer(INITIAL_STATE, {
  [Types.TOGGLE_REFRESHING_FLAG]: toggleRefreshingFlagHandler,
  [Types.CHANGE_STATUS]: changeStatusHandler
});
