import { createFormAction } from 'redux-form-saga';
import { FETCHING_STATUS, mergeArraysUniq } from '../Lib/utils';
import { createReducer, createActions } from 'reduxsauce';
import _ from 'lodash';

export const INITIAL_STATE = {
  status: FETCHING_STATUS.READY,
  valid_time_frames: {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  },
  last_minute_booking_enabled: false,
  last_minute_booking_enabled: false,
  minimum_slots_count_per_driving_lesson: null,
  maximum_slots_count_per_driving_lesson: null,
  can_student_book_driving_lesson: false,
  booking_advance_period_in_weeks: null
};

/** Action Types/Creators */
export const updateScheduleSettings = createFormAction('UPDATE_SCHEDULE_SETTINGS'); /** redux-form-saga */

const { Types, Creators } = createActions({
  save: ['data'],
  changeStatus: ['status'],
  showRequest: null, /* SAGA */
}, { prefix: 'SCHEDULE_SETTINGS_' });

export const scheduleSettingsActionCreators = Creators;
export const scheduleSettingsTypes = Types;
/** Handlers */
export const save = (state, { data }) => {
  const newState = data;
  newState.status = state.status;

  return newState;
};

export const updateStatus = (state, { status }) => ({ ...state, status });

/** Reducer */

export const scheduleSettingsReducer = createReducer(INITIAL_STATE, {
  [Types.SAVE]: save,
  [Types.CHANGE_STATUS]: updateStatus,
});

// TODO add error field everywhere!
