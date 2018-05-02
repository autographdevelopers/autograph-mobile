import { combineReducers } from 'redux';
import { sessionReducer } from './SessionRedux';
import { currentUserReducer } from './CurrentUserRedux';

export const accessReducer = combineReducers({
  currentUser: currentUserReducer,
  session: sessionReducer,
});
