import { call, put } from 'redux-saga/effects';
import { userActionCreators } from '../Redux/UserRedux';
import PrimaryNavigation from '../Navigation/AppNavigation';

export function* SignUp(api, action) {
  const { payload } = action;
  console.tron.log("REGISTATIONS PARAMS");
  console.tron.log(action);

  const response = yield call(api.signUp, payload);

  if (response.ok) {
    yield put(PrimaryNavigation.router.getActionForPathAndParams('login'));
  } else {
    // yield put(PrimaryNavigation.router.getActionForPathAndParams('main'));
  }
}
