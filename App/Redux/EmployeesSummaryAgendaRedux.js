import { createReducer, createActions } from 'reduxsauce';
import moment from 'moment'
import _ from 'lodash';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setDay: ['daySelected'],
  setFetchedDataBoundaries: ['fromInclusive', 'toInclusive']
}, { prefix: 'EMPLOYEES_SUMMARY_AGENDA/'});

export const employeesSummaryAgendaActionTypes = Types;
export const employeesSummaryAgendaActionCreators = Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  daySelected: moment().format('YYYY-MM-DD'),
  fetchedDataBoundaries: {
    left: null,
    right: null
  }
};

/* ------------- Handlers ------------- */

export const setDayHandler = (state, { daySelected }) => {
  const newState = _.cloneDeep(state);
  newState.daySelected = daySelected;

  return newState;
};

export const setFetchedDataBoundariesHandler = (state, {fromInclusive, toInclusive}) => {
  const newState = _.cloneDeep(state);
  newState.fetchedDataBoundaries.left = fromInclusive;
  newState.fetchedDataBoundaries.right = toInclusive;

  return newState;
};

/* ------------- Hookup Reducers To Types ------------- */

export const employeesSummaryAgendaReducer = createReducer(INITIAL_STATE, {
  [Types.SET_DAY]: setDayHandler,
  [Types.SET_FETCHED_DATA_BOUNDARIES]: setFetchedDataBoundariesHandler
});
