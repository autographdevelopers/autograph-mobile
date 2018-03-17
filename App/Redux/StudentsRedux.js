import { deepClone, FETCHING_STATUS, mergeArraysUniq } from '../Lib/utils';
import { createReducer, createActions } from 'reduxsauce';

export const INITIAL_STATE = {
  pending: {},
  pendingIds: [],
  active: {},
  activeIds: [],
  status: FETCHING_STATUS.READY,
  errorMsg: null
};

/** Action Types/Creators */

const { Types, Creators } = createActions({
  saveSingle: ['data'],
  saveCollection: ['data'],
  changeStatus: ['status'],
  indicateError: ['msg'],
  destroySinglePending: ['studentId'],
  indexRequest: null, /* SAGA */
}, { prefix: 'STUDENTS_' });

export const studentsActionCreators = Creators;
export const studentsActionTypes = Types;

/** Handlers */
export const saveSingleHandler = (state, { data }) => {
  const dataKey = data.status;
  const idsKey = `${dataKey}Ids`;

  const collection = state[dataKey];
  const idsCollection = state[idsKey];

  const newCollection = deepClone(collection);
  newCollection[data.id] = data; // overwrite or add record returned from server

  const newIds = mergeArraysUniq(idsCollection, [data.id]);

  return {
    ...state,
    [data.status]: newCollection,
    [idsKey]: newIds
  };
};

export const indicateErrorHandler = (state, { msg }) => {
  return { ...deepClone(state), errorMsg: msg, status: FETCHING_STATUS.ERROR }
};

export const saveCollectionHandler = (state, { data }) => {
  const newData = data.reduce((prev, current) => {
    if(!!!prev[current.status]) {
      prev[current.status] = {};
      prev[`${current.status}Ids`] = [];
    }

    prev[current.status][current.id] = current;
    prev[`${current.status}Ids`].push(current.id);

    return prev;
  }, {});

  return {...deepClone(state), ...newData};
};

export const destroySinglePendingHandler = (state, { studentId }) => {
  const pending = deepClone(state).pending;
  delete pending[studentId];
  const pendingIds = state.pendingIds.filter(id => studentId !== id );

  return {
    ...state,
    pending,
    pendingIds
  }
};

export const updateStatusHandler = (state, { status }) => ({ ...deepClone(state), status });

/** Reducer */

export const studentsReducer = createReducer(INITIAL_STATE, {
  [Types.SAVE_SINGLE]: saveSingleHandler,
  [Types.SAVE_COLLECTION]: saveCollectionHandler,
  [Types.CHANGE_STATUS]: updateStatusHandler,
  [Types.INDICATE_ERROR]: indicateErrorHandler,
  [Types.DESTROY_SINGLE_PENDING]: destroySinglePendingHandler,
});
