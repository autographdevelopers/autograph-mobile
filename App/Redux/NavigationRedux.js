import AppNavigation from '../Navigation/AppNavigation';
import { NavigationActions } from 'react-navigation';

const INITIAL_STATE = AppNavigation.router.getStateForAction(NavigationActions.init())

export const reducer = (state = INITIAL_STATE, action) => {
  const newState = AppNavigation.router.getStateForAction(action, state)
  return newState || state;
}
