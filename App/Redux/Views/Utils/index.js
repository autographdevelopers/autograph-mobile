import { combineReducers } from 'redux';
import { overlayReducer } from './OverlayRedux';

export const utilsReducer = combineReducers({
  overlay: overlayReducer
});
