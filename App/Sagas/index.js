import { takeLatest, all } from 'redux-saga/effects';
import { API as api } from '../Services/Api';
import formActionSaga from 'redux-form-saga';

import { invite } from '../Redux/InvitationsRedux';

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux';
import { SESSION_ACTION_TYPES, sessionActionCreators } from '../Redux/SessionRedux';

import { resetPasswordTypes } from '../Redux/ResetPasswordRedux';
import { drivingSchoolActionTypes } from '../Redux/DrivingSchoolRedux';
import { invitationActionTypes } from '../Redux/InvitationsRedux';
import { notificationActionTypes } from '../Redux/EmployeeNotificationsSettingsSetRedux';
/* ------------- Sagas ------------- */

import { LogIn } from './LogInSaga';
import { resetPassword } from './ResetPasswordSaga';
import { create as createDrivingSchool, update as updateDrivingSchool } from './DrivingSchoolSagas';
import { updateNotificationSettings, fetchNotificationSettings } from './NotificationSaga';
import { updateScheduleBoundaries } from './DrivingSchoolSagas';
import { updateScheduleSettings } from './DrivingSchoolSagas';
import { index as fetchDrivingSchools } from './DrivingSchoolSagas';
import { inviteUser } from './UserSaga';


/* ------------- API ------------- */

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    takeLatest(SESSION_ACTION_TYPES.REQUEST_LOGIN_PROCEDURE, LogIn, api),
    takeLatest(resetPasswordTypes.RESET_PASSWORD_REQUEST, resetPassword, api),
    takeLatest(drivingSchoolActionTypes.CREATE_DRIVING_SCHOOL_REQUEST, createDrivingSchool, api),
    takeLatest(drivingSchoolActionTypes.UPDATE_SCHEDULE_BOUNDARIES_REQUEST, updateScheduleBoundaries, api),
    takeLatest(drivingSchoolActionTypes.UPDATE_DRIVING_SCHOOL_REQUEST, updateDrivingSchool, api),
    takeLatest(drivingSchoolActionTypes.UPDATE_SCHEDULE_SETTINGS_REQUEST, updateScheduleSettings, api),
    takeLatest(drivingSchoolActionTypes.FETCH_DRIVING_SCHOOLS_REQUEST, fetchDrivingSchools, api),

    takeLatest(invite.REQUEST, inviteUser, api),
    // takeLatest(invitationActionTypes.INVITE_USER_REQUEST, inviteUser, api),


    takeLatest(notificationActionTypes.UPDATE_NOTIFICATION_SETTINGS_SET_REQUEST, updateNotificationSettings, api),
    // takeLatest(notificationActionTypes.FETCH_NOTIFICATIONS_SETTINGS_SET_REQUEST, fetchNotificationSettings, api),
    // formActionSaga
  ])
}
