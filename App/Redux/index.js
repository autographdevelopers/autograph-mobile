import { combineReducers } from 'redux';
import configureStore from './CreateStore';
import rootSaga from '../Sagas/';
import formActionSaga from 'redux-form-saga';

import { reducer as formReducer } from 'redux-form';
import { entitiesReducer } from './Entities';
import { viewsReducer } from './Views';
import { supportReducer } from './Support';
import { accessReducer } from './Access';

/* ------------- Assemble The Reducers ------------- */
export const appReducer = combineReducers({
  form: formReducer,
  entities: entitiesReducer,
  views: viewsReducer,
  support: supportReducer,
  access: accessReducer
});

/* Very Top level reducer wrapper used for resetting store after logout */
const rootReducer = (state, action) => {
  if ( action.type === 'USER_LOGOUT' ) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default () => {
  let { store, sagasManager, sagaMiddleware } = configureStore(rootReducer, rootSaga);

  sagaMiddleware.run(formActionSaga); // To integrate redux-from and redux-saga

  if ( module.hot ) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers;
      store.replaceReducer(nextRootReducer);

      const newYieldedSagas = require('../Sagas').default;
      sagasManager.cancel();
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas);
        sagasManager = sagaMiddleware.run(formActionSaga);
      });
    });
  }

  return store;
}
