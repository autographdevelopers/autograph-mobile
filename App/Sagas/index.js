import { takeLatest, all } from 'redux-saga/effects';
import {API as api} from '../Services/Api';
/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux';
import { SESSION_ACTION_TYPES, sessionActionCreators } from '../Redux/SessionRedux';

import { resetPasswordTypes } from '../Redux/ResetPasswordRedux';
import { drivingSchoolActionTypes } from '../Redux/DrivingSchoolRedux';
import { invitationActionTypes } from '../Redux/InvitationsRedux';

/* ------------- Sagas ------------- */

import { LogIn } from './LogInSaga';
import { resetPassword } from './ResetPasswordSaga';
import { create as createDrivingSchool, update as updateDrivingSchool } from './DrivingSchoolSagas';
import { updateEmployeesNotificationSettings } from './DrivingSchoolSagas';
import { updateScheduleBoundaries} from './DrivingSchoolSagas';
import { updateScheduleSettings} from './DrivingSchoolSagas';
import { index as fetchDrivingSchools } from './DrivingSchoolSagas';

import { invite as inviteUser } from './UserSaga';

/* ------------- API ------------- */

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    takeLatest(SESSION_ACTION_TYPES.REQUEST_LOGIN_PROCEDURE, LogIn, api),
    takeLatest(resetPasswordTypes.RESET_PASSWORD_REQUEST, resetPassword, api),
    takeLatest(drivingSchoolActionTypes.CREATE_DRIVING_SCHOOL_REQUEST, createDrivingSchool, api),
    takeLatest(drivingSchoolActionTypes.UPDATE_EMPLOYEE_NOTIFICATIONS_REQUEST, updateEmployeesNotificationSettings, api),
    takeLatest(drivingSchoolActionTypes.UPDATE_SCHEDULE_BOUNDARIES_REQUEST, updateScheduleBoundaries, api),
    takeLatest(drivingSchoolActionTypes.UPDATE_DRIVING_SCHOOL_REQUEST, updateDrivingSchool, api),
    takeLatest(drivingSchoolActionTypes.UPDATE_SCHEDULE_SETTINGS_REQUEST, updateScheduleSettings, api),
    takeLatest(drivingSchoolActionTypes.FETCH_DRIVING_SCHOOLS_REQUEST, fetchDrivingSchools, api),
    takeLatest(invitationActionTypes.INVITE_USER_REQUEST, inviteUser, api),
  ])
}
