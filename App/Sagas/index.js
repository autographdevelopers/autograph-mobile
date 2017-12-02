import { takeLatest, all } from 'redux-saga/effects';
import API from '../Services/Api';
import FixtureAPI from '../Services/FixtureApi';
import DebugConfig from '../Config/DebugConfig';

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import {SESSION_ACTION_TYPES} from '../Redux/SessionRedux';
import {USER_ACTION_TYPES} from '../Redux/UserRedux';

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas';
import { LogIn } from './LogInSaga';
import { SignUp } from './SignUpSaga';

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create();

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    takeLatest(SESSION_ACTION_TYPES.REQUEST_LOGIN_PROCEDURE, LogIn, api),
    takeLatest(USER_ACTION_TYPES.REQUEST_REGISTRATION_PROCEDURE, SignUp, api)

  ])
}
