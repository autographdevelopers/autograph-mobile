import { createReducer, createActions } from 'reduxsauce';
import moment from 'moment'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setDay: ['daySelected'],
  setEmployee: ['employeeId'],
  init: ['daySelected', 'employeeId']
});

export const employeeDailyAgendaActionTypes = Types;
export const employeeDailyAgendaActionCreators = Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  daySelected: moment().format('YYYY-MM-DD'),
  employeeId: null,
};

/* ------------- Handlers ------------- */

export const setDayHandler = (state, { daySelected }) =>
  ({ ...state, daySelected });

export const setEmployeeHandler = (state, { employeeId }) =>
  ({ ...state, employeeId });

export const initHandler = (state, { daySelected, employeeId}) =>
  ({ ...state, daySelected, employeeId });

/* ------------- Hookup Reducers To Types ------------- */

export const employeeDailyAgendaReducer = createReducer(INITIAL_STATE, {
  [Types.SET_DAY]: setDayHandler,
  [Types.SET_EMPLOYEE]: setEmployeeHandler,
  [Types.INIT]: initHandler,
});


