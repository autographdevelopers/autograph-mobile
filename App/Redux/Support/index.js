import { combineReducers } from 'redux';
import { contextReducer } from './ContextRedux';

export const supportReducer = combineReducers({
  context: contextReducer
});
