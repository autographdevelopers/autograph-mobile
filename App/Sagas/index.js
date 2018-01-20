import { takeLatest, all } from 'redux-saga/effects';
import { API as api } from '../Services/Api';

/* ------------- Types ------------- */
import { resetPasswordTypes } from '../Redux/ResetPasswordRedux';
import { drivingSchoolActionTypes } from '../Redux/DrivingSchoolRedux';
import { scheduleSettingsTypes } from '../Redux/ScheduleSettingsRedux';
import { scheduleBoundariesTypes } from '../Redux/ScheduleBoundariesRedux';
import { notificationSettingsActionTypes } from '../Redux/EmployeeNotificationsSettingsSetRedux';
import { employeesActionTypes } from '../Redux/EmployeesRedux';
import { studentsActionTypes } from '../Redux/StudentsRedux';
import { employeePrivilegesActionTypes } from '../Redux/EmployeePrivileges';

/* ------------- Sagas ------------- */
import { LogIn } from './LogInSaga';
import { resetPassword } from './ResetPasswordSaga';

import { index as employeesIndexSaga } from './EmployeesSaga';
import { index as studentsIndexSaga } from './StudentsSaga';

import {
  create as createDrivingSchoolSaga,
  update as updateDrivingSchoolSaga,
  index as indexDrivingSchools,
  show as showDrivingSchoolSaga
} from './DrivingSchoolSagas';

import {
  update as updateNotificationSettingsSaga,
  show as showNotificationSettingsSaga
} from './NotificationSettingsSaga';

import {
  update as updateScheduleBoundariesSaga,
  show as  showScheduleBoundariesSaga
} from './ScheduleBoundariesSaga';

import {
  update as updateScheduleSettingsSaga,
  show as  showScheduleSettingsSaga } from './ScheduleSettingsSaga';

import { create as createInvitation } from './InvitationsSaga';

import {
  update as updateEmployeePrivilegesSaga,
  show as showEmployeePrivilegesSaga
} from './EmployeePrivilegesSaga';

/* ------------- ReduxForm - Sagas actions------------- */
import { invite } from '../Redux/InvitationsRedux';
import { createDrivingSchool } from '../Redux/DrivingSchoolRedux';
import { updateDrivingSchool } from '../Redux/DrivingSchoolRedux';
import { updateNotificationSettings } from '../Redux/EmployeeNotificationsSettingsSetRedux';
import { updateScheduleBoundaries } from '../Redux/ScheduleBoundariesRedux';
import { updateScheduleSettings } from '../Redux/ScheduleSettingsRedux';
import { login } from '../Redux/SessionRedux';
import { update as updateEmployeePrivileges } from '../Redux/EmployeePrivileges';

/* ------------- Connect Types To Sagas ------------- */
export default function* root() {
  yield all([
    takeLatest(login.REQUEST, LogIn, api),
    takeLatest(resetPasswordTypes.RESET_PASSWORD_REQUEST, resetPassword, api),

    takeLatest(createDrivingSchool.REQUEST, createDrivingSchoolSaga, api),
    takeLatest(updateDrivingSchool.REQUEST, updateDrivingSchoolSaga, api),
    takeLatest(drivingSchoolActionTypes.INDEX_REQUEST, indexDrivingSchools, api),
    takeLatest(drivingSchoolActionTypes.SHOW_REQUEST, showDrivingSchoolSaga, api),

    takeLatest(updateScheduleBoundaries.REQUEST, updateScheduleBoundariesSaga, api),
    takeLatest(scheduleBoundariesTypes.SHOW_REQUEST, showScheduleBoundariesSaga, api),

    takeLatest(updateScheduleSettings.REQUEST, updateScheduleSettingsSaga, api),
    takeLatest(scheduleSettingsTypes.SHOW_REQUEST, showScheduleSettingsSaga, api),

    takeLatest(updateNotificationSettings.REQUEST, updateNotificationSettingsSaga, api),
    takeLatest(notificationSettingsActionTypes.SHOW_REQUEST, showNotificationSettingsSaga, api),

    takeLatest(invite.REQUEST, createInvitation, api),

    takeLatest(employeesActionTypes.INDEX_REQUEST, employeesIndexSaga, api),
    takeLatest(studentsActionTypes.INDEX_REQUEST, studentsIndexSaga, api),

    takeLatest(updateEmployeePrivileges.REQUEST, updateEmployeePrivilegesSaga, api),
    takeLatest(employeePrivilegesActionTypes.SHOW_REQUEST, showEmployeePrivilegesSaga, api)
  ])
}
