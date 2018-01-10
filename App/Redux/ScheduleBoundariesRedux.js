import { createFormAction } from 'redux-form-saga';
import { FETCHING_STATUS } from '../Lib/utils';
import { createReducer, createActions } from 'reduxsauce';
import moment from 'moment';

export const INITIAL_STATE = {
  collection: [],
  status: FETCHING_STATUS.READY
};

/** Action Types/Creators */
export const updateScheduleBoundaries = createFormAction('UPDATE_SCHEDULE_BOUNDARIES');

const { Types, Creators } = createActions({
  save: ['data'],
  changeStatus: ['status'],
  showRequest: null /* SAGA */
}, { prefix: 'SCHEDULE_BOUNDARIES_' });

export const scheduleBoundariesActionCreators = Creators;
export const scheduleBoundariesTypes = Types;

/** Handlers */
export const save = (state, { data }) => {
  const collection = data.map( element => {
    console.log(element);
    const start_time = moment(element.start_time);
    console.log(start_time);
    console.log(start_time.get('hours'));
    console.log(start_time.get('minutes'));
    const end_time = moment(element.end_time);
    console.log(end_time);
    console.log(end_time.get('hours'));
    console.log(end_time.get('minutes'));

    return {...element, start_time, end_time}
  });


  return { ...state, collection}
};

export const updateStatus = (state, { status }) => ({ ...state, status });

/** Reducer */

export const scheduleBoundariesReducer = createReducer(INITIAL_STATE, {
  [Types.SAVE]: save,
  [Types.CHANGE_STATUS]: updateStatus
});

// TODO add error field
