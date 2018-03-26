import { createReducer, createActions } from 'reduxsauce';
import moment from 'moment'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setDay: ['daySelected'],
});

export const calendarActionTypes = Types;
export const calendarActionCreators = Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  // date format: YYYY-mm-dd
  daySelected: moment().format('YYYY-MM-DD')
};

/* ------------- Handlers ------------- */

export const setDayHandler = (state, { daySelected }) =>
  ({ ...state, daySelected });

/* ------------- Hookup Reducers To Types ------------- */

export const calendarReducer = createReducer(INITIAL_STATE, {
  [Types.SET_DAY]: setDayHandler,
});
