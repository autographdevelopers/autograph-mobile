import { createReducer, createActions } from 'reduxsauce';

const INITIAL_STATE = {
  show: false
};

const { Types, Creators } = createActions({
  show: null,
  hide: null,
}, { prefix: 'OVERLAY/' });

export const overlayActionTypes = Types;
export const overlayActionCreators = Creators;

const showHandler = state => ({...state, show: true});
const hideHandler = state => ({...state, show: false});

export const overlayReducer = createReducer(INITIAL_STATE, {
  [Types.SHOW]: showHandler,
  [Types.HIDE]: hideHandler,
});
