import { createReducer, createActions } from 'reduxsauce';
import { FETCHING_STATUS } from '../../Lib/utils';
import moment from 'moment-timezone';
import _ from 'lodash';

/** == INIT STATES ================================ */

export const COMMON_STATE = {
  daySelected: moment.tz('Poland').format('YYYY-MM-DD'),
  cacheHistory: [
    // {
    // dataFrom,
    // dataTo,
    // expire_at
    // }, ...
  ],
  status: FETCHING_STATUS.READY,
};

export const DAILY_AGENDA_STATE = {
  ..._.cloneDeep(COMMON_STATE),
  employeeId: null,
};

/** == HANDLERS =================================== */

export const setDayHandler = (state, { daySelected }) => {
  const newState = _.cloneDeep(state);
  newState.daySelected = daySelected;

  return newState;
};

export const pushToCacheHistoryHandler = (state, { from, to }) => {
  const newState = _.cloneDeep(state);
  newState.cacheHistory.push({
    dataFrom: from,
    dataTo: to,
    expireAt: moment.tz('Poland').add(5, 'minutes').format(),
  });

  return newState;
};

export const changeStatusHandler = (state, { status }) => {
  const newState = _.cloneDeep(state);
  newState.status = status;

  return newState;
};

export const initHandler = (state, { templateState }) => {
  const newState = _.cloneDeep(state);

  return _.merge(newState, templateState);
};

/** == HOC REDUX HELPERS =================================== */

const createAgendaActions = (prefix, additionalActions = {}) => {
  return createActions({
    setDay: ['daySelected'],
    pushCacheHistory: ['from', 'to'],
    requestDataForView: ['payloads'], //{ payloads: { employeesPayload: null, studentsPayload: null, slotsPayload: null, scheduleSettingsPayload: null }},
    changeStatus: ['status'],
    ...additionalActions
  }, { prefix });
};

const createAgendaReducer = (initialState, types, additionalHandlers = {}) => {
  return createReducer(initialState, {
    [types.SET_DAY]: setDayHandler,
    [types.CHANGE_STATUS]: changeStatusHandler,
    [types.PUSH_CACHE_HISTORY]: pushToCacheHistoryHandler,
    ...additionalHandlers
  });
};

/** == SUMMARY AGENDA REDUX =================================== */

const employeesSummaryAgenda = createAgendaActions('EMPLOYEES_SUMMARY_AGENDA/');
export const employeesSummaryAgendaTypes = employeesSummaryAgenda.Types;
export const employeesSummaryAgendaActionCreators = employeesSummaryAgenda.Creators;
export const employeesSummaryAgendaReducer = createAgendaReducer(
  COMMON_STATE, employeesSummaryAgendaTypes,
);

/** == DAILY AGENDA REDUX =================================== */

const employeeDailyAgenda = createAgendaActions('EMPLOYEE_DAILY_AGENDA/', {
  setEmployee: ['employeeId'],
  init: ['templateState'],
});
export const employeeDailyAgendaTypes = employeeDailyAgenda.Types;
export const employeeDailyAgendaActionCreators = employeeDailyAgenda.Creators;
export const employeeDailyAgendaReducer = createAgendaReducer(
  DAILY_AGENDA_STATE, employeeDailyAgendaTypes, {
    [employeeDailyAgendaTypes.INIT]: initHandler,
  },
);
