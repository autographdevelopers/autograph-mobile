import { takeLatest, all } from 'redux-saga/effects';
import { API as api } from '../Services/Api';

/* ------------- Types ------------- */
import { sessionActionTypes } from '../Redux/SessionRedux';
import { resetPasswordTypes } from '../Redux/ResetPasswordRedux';
import { drivingSchoolActionTypes } from '../Redux/DrivingSchoolRedux';
import { scheduleSettingsTypes } from '../Redux/ScheduleSettingsRedux';
import { notificationSettingsActionTypes } from '../Redux/EmployeeNotificationsSettingsSetRedux';
import { employeesActionTypes } from '../Redux/EmployeesRedux';
import { studentsActionTypes } from '../Redux/StudentsRedux';
import { employeePrivilegesActionTypes } from '../Redux/EmployeePrivileges';
import { invitationActionTypes } from '../Redux/InvitationsRedux';
import { scheduleActionTypes } from '../Redux/ScheduleRedux';
import { scheduleFormActionTypes } from '../Redux/ScheduleFormRedux';
import { schoolActivationActionTypes } from '../Redux/SchoolActivationRedux';
import { drivingCourseActionTypes } from '../Redux/DrivingCourseRedux';
import { drivingLessonActionTypes } from '../Redux/DrivingLessonRedux';
import { slotActionTypes } from '../Redux/SlotsRedux';
import { calendarActionTypes } from '../Redux/CalendarRedux';
import { activityActionTypes } from '../Redux/ActivityRedux';

/* ------------- Sagas ------------- */

import {
  create as LoginSaga,
  destroy as LogoutSaga,
} from './SessionSaga';

import { resetPassword } from './ResetPasswordSaga';

import { index as employeesIndexSaga } from './EmployeesSaga';

import { index as studentsIndexSaga } from './StudentsSaga';

import {
  create as createDrivingSchoolSaga,
  update as updateDrivingSchoolSaga,
  index as indexDrivingSchoolsSaga,
  show as showDrivingSchoolSaga,
  activate as activateDrivingSchoolSaga,
  confirmRegistration as confirmDrivingSchoolRegistrationSaga
} from './DrivingSchoolSagas';

import {
  update as updateNotificationSettingsSaga,
  show as showNotificationSettingsSaga
} from './NotificationSettingsSaga';

import {
  update as updateScheduleSettingsSaga,
  show as showScheduleSettingsSaga } from './ScheduleSettingsSaga';

import {
  create as createInvitationSaga,
  accept as acceptInvitationSaga,
  reject as rejectInvitationSaga,
  destroy as destroyInvitationSaga
} from './InvitationsSaga';

import {
  update as updateEmployeePrivilegesSaga,
  show as showEmployeePrivilegesSaga
} from './EmployeePrivilegesSaga';

import {
  show as showEmployeeScheduleSaga,
  update as updateEmployeeScheduleSaga
} from './SchedulesSaga';

import {
  show as showDrivingCourseSaga,
  update as updateDrivingCourseSaga
} from './DrivingCourseSaga';

import {
  index as indexDrivingLessonSaga,
  cancel as cancelDrivingLessonSaga,
} from './DrivingLessonSaga';

import {
  index as indexActivitySaga,
  myActivities as myActivitiesActivitySaga,
} from './ActivitySaga';

import { index as indexSlotsSaga } from './SlotsSaga';

/* ------------- ReduxForm - Sagas actions------------- */
import { invite } from '../Redux/InvitationsRedux';
import {
  createDrivingSchool,
  updateDrivingSchool,
  confirmDrivingSchoolRegistration
} from '../Redux/DrivingSchoolRedux';

import { updateNotificationSettings } from '../Redux/EmployeeNotificationsSettingsSetRedux';
import { updateScheduleSettings } from '../Redux/ScheduleSettingsRedux';
import { login } from '../Redux/SessionRedux';
import { update as updateEmployeePrivileges } from '../Redux/EmployeePrivileges';

/* ------------- Connect Types To Sagas ------------- */
export default function* root() {
  yield all([
    takeLatest(login.REQUEST, LoginSaga, api),
    takeLatest(sessionActionTypes.DESTROY_REQUEST, LogoutSaga, api),

    takeLatest(resetPasswordTypes.RESET_PASSWORD_REQUEST, resetPassword, api),

    takeLatest(createDrivingSchool.REQUEST, createDrivingSchoolSaga, api),
    takeLatest(updateDrivingSchool.REQUEST, updateDrivingSchoolSaga, api),
    takeLatest(drivingSchoolActionTypes.INDEX_REQUEST, indexDrivingSchoolsSaga, api),
    takeLatest(drivingSchoolActionTypes.SHOW_REQUEST, showDrivingSchoolSaga, api),
    takeLatest(schoolActivationActionTypes.REQUEST, activateDrivingSchoolSaga, api),
    takeLatest(confirmDrivingSchoolRegistration.REQUEST, confirmDrivingSchoolRegistrationSaga, api),

    takeLatest(updateScheduleSettings.REQUEST, updateScheduleSettingsSaga, api),
    takeLatest(scheduleSettingsTypes.SHOW_REQUEST, showScheduleSettingsSaga, api),

    takeLatest(updateNotificationSettings.REQUEST, updateNotificationSettingsSaga, api),
    takeLatest(notificationSettingsActionTypes.SHOW_REQUEST, showNotificationSettingsSaga, api),

    takeLatest(invite.REQUEST, createInvitationSaga, api),
    takeLatest(invitationActionTypes.ACCEPT_REQUEST, acceptInvitationSaga, api),
    takeLatest(invitationActionTypes.REJECT_REQUEST, rejectInvitationSaga, api),
    takeLatest(invitationActionTypes.DESTROY_REQUEST, destroyInvitationSaga, api),

    takeLatest(employeesActionTypes.INDEX_REQUEST, employeesIndexSaga, api),
    takeLatest(studentsActionTypes.INDEX_REQUEST, studentsIndexSaga, api),

    takeLatest(updateEmployeePrivileges.REQUEST, updateEmployeePrivilegesSaga, api),
    takeLatest(employeePrivilegesActionTypes.SHOW_REQUEST, showEmployeePrivilegesSaga, api),

    takeLatest(scheduleActionTypes.SHOW_REQUEST, showEmployeeScheduleSaga, api),
    takeLatest(scheduleFormActionTypes.UPDATE_REQUEST, updateEmployeeScheduleSaga, api),

    takeLatest(drivingCourseActionTypes.SHOW_REQUEST, showDrivingCourseSaga, api),
    takeLatest(drivingCourseActionTypes.UPDATE_REQUEST, updateDrivingCourseSaga, api),

    takeLatest(drivingLessonActionTypes.INDEX_REQUEST, indexDrivingLessonSaga, api),
    takeLatest(drivingLessonActionTypes.CANCEL_REQUEST, cancelDrivingLessonSaga, api),

    takeLatest(slotActionTypes.INDEX_REQUEST, indexSlotsSaga, api),

    takeLatest(activityActionTypes.INDEX_REQUEST, indexActivitySaga, api),
    takeLatest(activityActionTypes.MY_ACTIVITIES_REQUEST, myActivitiesActivitySaga, api),
  ])
}
