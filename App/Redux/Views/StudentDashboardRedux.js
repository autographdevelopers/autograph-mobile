import { createReducer, createActions } from 'reduxsauce';
import { FETCHING_STATUS } from '../../Lib/utils';
import _ from  'lodash';

const INITIAL_STATE = {
  status: FETCHING_STATUS.READY,
  lessonsIds: []
};

const { Types, Creators } = createActions({
  requestDataForView: { payloads: {} },
  changeStatus: ['status'],
  saveLessons: ['lessons'],
}, { prefix: 'STUDENT_DASHBOARD_SCREEN/' } );

export const studentDashboardActionCreators = Creators;
export const studentDashboardActionTypes = Types;

const changeStatusHandler = (state, { status }) =>
  ({...state, status});

const saveLessonsHandler = (state, { lessons }) => {
  const newState = _.cloneDeep(state);
  newState.lessonsIds = lessons.map(l => l.id);

  return newState;
};

export const studentDashboardScreenReducer = createReducer(INITIAL_STATE, {
  [Types.CHANGE_STATUS]: changeStatusHandler,
  [Types.SAVE_LESSONS]: saveLessonsHandler
});

