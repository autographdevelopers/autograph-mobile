import { takeLatest, all } from 'redux-saga/effects';
import { API as api } from '../Services/Api';

import { invite } from '../Redux/InvitationsRedux';

/* ------------- Types ------------- */

import { SESSION_ACTION_TYPES } from '../Redux/SessionRedux';

import { resetPasswordTypes } from '../Redux/ResetPasswordRedux';
import { drivingSchoolActionTypes } from '../Redux/DrivingSchoolRedux';
import { scheduleSettingsTypes } from '../Redux/ScheduleSettingsRedux';
import { scheduleBoundariesTypes } from '../Redux/ScheduleBoundariesRedux';
/* ------------- Sagas ------------- */

import { LogIn } from './LogInSaga';
import { resetPassword } from './ResetPasswordSaga';
import {
  create as createDrivingSchoolSaga,
  update as updateDrivingSchoolSaga,
  index as fetchDrivingSchools,
  show as showDrivingSchoolSaga
} from './DrivingSchoolSagas';
import {
  update as updateNotificationSettingsSaga,
  show as fetchNotificationSettingsSaga
} from './NotificationSettingsSaga';
import {
  update as updateScheduleBoundariesSaga,
  show as  showScheduleBoundariesSaga
} from './ScheduleBoundariesSaga';
import { update as updateScheduleSettingsSaga, show as  showScheduleSettingsSaga } from './ScheduleSettingsSaga';
import { inviteUser } from './UserSaga';

/* ------------- ReduxForm - Sagas actions------------- */
import { createDrivingSchool } from '../Redux/DrivingSchoolRedux';
import { updateDrivingSchool } from '../Redux/DrivingSchoolRedux';
import { updateNotificationSettings } from '../Redux/EmployeeNotificationsSettingsSetRedux';
import { updateScheduleBoundaries } from '../Redux/ScheduleBoundariesRedux';
import { updateScheduleSettings } from '../Redux/ScheduleSettingsRedux';
/* ------------- API ------------- */

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    takeLatest(SESSION_ACTION_TYPES.REQUEST_LOGIN_PROCEDURE, LogIn, api),
    takeLatest(resetPasswordTypes.RESET_PASSWORD_REQUEST, resetPassword, api),

    takeLatest(createDrivingSchool.REQUEST, createDrivingSchoolSaga, api),
    takeLatest(updateDrivingSchool.REQUEST, updateDrivingSchoolSaga, api),

    takeLatest(drivingSchoolActionTypes.FETCH_DRIVING_SCHOOLS_REQUEST, fetchDrivingSchools, api),
    takeLatest(drivingSchoolActionTypes.SHOW_DRIVING_SCHOOL_REQUEST, showDrivingSchoolSaga, api),

    takeLatest(updateScheduleBoundaries.REQUEST, updateScheduleBoundariesSaga, api),

    takeLatest(scheduleBoundariesTypes.SHOW_REQUEST, showScheduleBoundariesSaga, api),

    takeLatest(updateScheduleSettings.REQUEST, updateScheduleSettingsSaga, api),

    takeLatest(updateNotificationSettings.REQUEST, updateNotificationSettingsSaga, api),

    takeLatest(invite.REQUEST, inviteUser, api),

    takeLatest(scheduleSettingsTypes.SHOW_REQUEST, showScheduleSettingsSaga, api)
  ])
}
