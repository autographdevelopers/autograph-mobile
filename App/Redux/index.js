import { combineReducers } from 'redux';
import configureStore from './CreateStore';
import rootSaga from '../Sagas/';
import { reducer as formReducer } from 'redux-form';
import { sessionReducer } from './SessionRedux';
import { userReducer } from './UserRedux';
import { resetPasswordReducer } from './ResetPasswordRedux'
import {drivingSchoolReducer} from './DrivingSchoolRedux';
import {contextReducer} from './ContextRedux';
import {invitationsReducer} from './InvitationsRedux';
/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  nav: require('./NavigationRedux').reducer,
  session: sessionReducer,
  user: userReducer,
  form: formReducer,
  resetPassword: resetPasswordReducer,
  drivingSchools: drivingSchoolReducer,
  context: contextReducer,
  invitations: invitationsReducer
});

export default () => {
  let { store, sagasManager, sagaMiddleware } = configureStore(reducers, rootSaga);

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers;
      store.replaceReducer(nextRootReducer);

      const newYieldedSagas = require('../Sagas').default;
      sagasManager.cancel();
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }

  return store;
}
