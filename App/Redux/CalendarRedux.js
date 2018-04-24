import { createReducer, createActions } from 'reduxsauce';
import moment from 'moment'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setDay: ['daySelected'],
  selectEmployee: ['id']
});

export const calendarActionTypes = Types;
export const calendarActionCreators = Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  // date format: YYYY-mm-dd
  daySelected: moment().format('YYYY-MM-DD'),
  selectedEmployeeId: null
};

/* ------------- Handlers ------------- */

export const setDayHandler = (state, { daySelected }) =>
  ({ ...state, daySelected });

export const selectEmployeeHandler = (state, { id }) => {
  return {...state, selectedEmployeeId: id}
};

/* ------------- Hookup Reducers To Types ------------- */

export const calendarReducer = createReducer(INITIAL_STATE, {
  [Types.SET_DAY]: setDayHandler,
  [Types.SELECT_EMPLOYEE]: selectEmployeeHandler,
});
