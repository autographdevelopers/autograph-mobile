import { takeLatest, takeEvery, all } from 'redux-saga/effects';
import { API as api } from '../Services/Api';

/* ------------- Types ------------- */
import { sessionActionTypes } from '../Redux/Access/SessionRedux';
import { resetPasswordTypes } from '../Redux/Views/ResetPasswordRedux';
import { drivingSchoolActionTypes } from '../Redux/Entities/DrivingSchoolRedux';
import { scheduleSettingsTypes } from '../Redux/Entities/ScheduleSettingsRedux';
import { notificationSettingsActionTypes } from '../Redux/Entities/EmployeeNotificationsSettingsSetRedux';
import { employeesActionTypes } from '../Redux/Entities/EmployeesRedux';
import { studentsActionTypes } from '../Redux/Entities/StudentsRedux';
import { employeePrivilegesActionTypes } from '../Redux/Entities/EmployeePrivileges';
import { invitationActionTypes } from '../Redux/Views/InvitationsRedux';
import { scheduleActionTypes } from '../Redux/Entities/ScheduleRedux';
import { scheduleFormActionTypes } from '../Redux/Views/ScheduleFormRedux';
import { schoolActivationActionTypes } from '../Redux/Views/Modals/SchoolActivationRedux';
import { drivingCourseActionTypes } from '../Redux/Entities/DrivingCourseRedux';
import { drivingLessonActionTypes } from '../Redux/Entities/DrivingLessonRedux';
import { slotActionTypes } from '../Redux/Entities/SlotsRedux';
import { activityActionTypes } from '../Redux/Entities/ActivityRedux';
import { toastActionTypes } from '../Redux/Support/ToastRedux';
import { employeesSummaryAgendaTypes } from '../Redux/Views/AgendaRedux';
import { employeeDailyAgendaTypes } from '../Redux/Views/AgendaRedux';
import { employeesScreenActionTypes } from '../Redux/Views/EmploeesScreenRedux';
import { studentsScreenActionTypes } from '../Redux/Views/StudentsScreenRedux';
import { employeeProfileActionTypes } from '../Redux/Views/EmployeeProfileRedux';
/* ------------- Sagas ------------- */

import { requestDataForSummaryAgendaScreenSaga } from './PerView/EmployeesSummaryAgendaSaga';
import { requestSlotsForAnotherWeekSaga } from './PerView/EmployeesSummaryAgendaSaga';
import { requestDataForEmployeeDailyAgendaScreenSaga } from './PerView/EmployeeDailyAgendaSaga';
import { longPollSummaryAgenda } from './PerView/EmployeesSummaryAgendaSaga';
import { requestDataForEmployeesScreen } from './PerView/EmployeesIndexSaga';
import { refreshEmployeesList } from './PerView/EmployeesIndexSaga';
import { refreshStudentsList } from './PerView/StudentsIndexSaga';
import { requestDataForStudentsScreen } from './PerView/StudentsIndexSaga';
import { requestDataForEmployeeProfileScreenSaga } from './PerView/EmployeeProfileSaga';
import { displayToastMessageSaga } from './ToastSaga';

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
  confirmRegistration as confirmDrivingSchoolRegistrationSaga,
} from './DrivingSchoolSagas';

import {
  update as updateNotificationSettingsSaga,
  show as showNotificationSettingsSaga,
} from './NotificationSettingsSaga';

import {
  update as updateScheduleSettingsSaga,
  show as showScheduleSettingsSaga,
} from './ScheduleSettingsSaga';

import {
  create as createInvitationSaga,
  accept as acceptInvitationSaga,
  reject as rejectInvitationSaga,
  destroy as destroyInvitationSaga,
} from './InvitationsSaga';

import {
  update as updateEmployeePrivilegesSaga,
  show as showEmployeePrivilegesSaga,
} from './EmployeePrivilegesSaga';

import {
  show as showEmployeeScheduleSaga,
  update as updateEmployeeScheduleSaga,
} from './SchedulesSaga';

import {
  show as showDrivingCourseSaga,
  update as updateDrivingCourseSaga,
} from './DrivingCourseSaga';

import {
  index as indexDrivingLessonSaga,
  cancel as cancelDrivingLessonSaga,
  create as createDrivingLessonSaga,
} from './DrivingLessonSaga';

import {
  index as indexActivitySaga,
  myActivities as myActivitiesActivitySaga,
} from './ActivitySaga';

import { index as indexSlotsSaga } from './SlotsSaga';

/* ------------- ReduxForm - Sagas actions------------- */
import { invite } from '../Redux/Views/InvitationsRedux';
import {
  createDrivingSchool,
  updateDrivingSchool,
  confirmDrivingSchoolRegistration,
} from '../Redux/Entities/DrivingSchoolRedux';

import { updateNotificationSettings } from '../Redux/Entities/EmployeeNotificationsSettingsSetRedux';
import { updateScheduleSettings } from '../Redux/Entities/ScheduleSettingsRedux';
import { login } from '../Redux/Access/SessionRedux';
import { update as updateEmployeePrivileges } from '../Redux/Entities/EmployeePrivileges';

/* ------------- Connect Types To Sagas ------------- */
export default function* root() {
  yield all([
    takeEvery(toastActionTypes.DISPLAY_TOAST_MESSAGE, displayToastMessageSaga),

    takeLatest(login.REQUEST, LoginSaga, api),
    takeLatest(sessionActionTypes.DESTROY_REQUEST, LogoutSaga, api),

    takeLatest(resetPasswordTypes.RESET_PASSWORD_REQUEST, resetPassword, api),

    takeLatest(createDrivingSchool.REQUEST, createDrivingSchoolSaga, api),
    takeLatest(updateDrivingSchool.REQUEST, updateDrivingSchoolSaga, api),
    takeLatest(drivingSchoolActionTypes.INDEX_REQUEST, indexDrivingSchoolsSaga,
      api),
    takeLatest(drivingSchoolActionTypes.SHOW_REQUEST, showDrivingSchoolSaga,
      api),
    takeLatest(schoolActivationActionTypes.REQUEST, activateDrivingSchoolSaga,
      api),
    takeLatest(confirmDrivingSchoolRegistration.REQUEST,
      confirmDrivingSchoolRegistrationSaga, api),

    takeLatest(updateScheduleSettings.REQUEST, updateScheduleSettingsSaga, api),
    takeLatest(scheduleSettingsTypes.SHOW_REQUEST, showScheduleSettingsSaga,
      api),

    takeLatest(updateNotificationSettings.REQUEST,
      updateNotificationSettingsSaga, api),
    takeLatest(notificationSettingsActionTypes.SHOW_REQUEST,
      showNotificationSettingsSaga, api),

    takeLatest(invite.REQUEST, createInvitationSaga, api),
    takeLatest(invitationActionTypes.ACCEPT_REQUEST, acceptInvitationSaga, api),
    takeLatest(invitationActionTypes.REJECT_REQUEST, rejectInvitationSaga, api),
    takeLatest(invitationActionTypes.DESTROY_REQUEST, destroyInvitationSaga,
      api),

    takeLatest(employeesActionTypes.INDEX_REQUEST, employeesIndexSaga, api),
    takeLatest(studentsActionTypes.INDEX_REQUEST, studentsIndexSaga, api),

    takeLatest(updateEmployeePrivileges.REQUEST, updateEmployeePrivilegesSaga,
      api),
    takeLatest(employeePrivilegesActionTypes.SHOW_REQUEST,
      showEmployeePrivilegesSaga, api),

    takeLatest(scheduleActionTypes.SHOW_REQUEST, showEmployeeScheduleSaga, api),
    takeLatest(scheduleFormActionTypes.UPDATE_REQUEST,
      updateEmployeeScheduleSaga, api),

    takeLatest(drivingCourseActionTypes.SHOW_REQUEST, showDrivingCourseSaga,
      api),
    takeLatest(drivingCourseActionTypes.UPDATE_REQUEST, updateDrivingCourseSaga,
      api),

    takeLatest(drivingLessonActionTypes.INDEX_REQUEST, indexDrivingLessonSaga,
      api),
    takeLatest(drivingLessonActionTypes.CANCEL_REQUEST, cancelDrivingLessonSaga,
      api),
    takeLatest(drivingLessonActionTypes.CREATE_REQUEST, createDrivingLessonSaga,
      api),

    takeLatest(slotActionTypes.INDEX_REQUEST, indexSlotsSaga, api),

    takeLatest(activityActionTypes.INDEX_REQUEST, indexActivitySaga, api),
    takeLatest(activityActionTypes.MY_ACTIVITIES_REQUEST,
      myActivitiesActivitySaga, api),

    /** Employees summary agenda */
    takeLatest(employeesSummaryAgendaTypes.REQUEST_DATA_FOR_VIEW, requestDataForSummaryAgendaScreenSaga, api),
    takeLatest(employeesSummaryAgendaTypes.REQUEST_DATA_FOR_VIEW, longPollSummaryAgenda, api),
    takeLatest(employeesSummaryAgendaTypes.REQUEST_SLOTS_FOR_ANOTHER_WEEK, requestSlotsForAnotherWeekSaga, api),
    /** Employee daily agenda */
    takeLatest(employeeDailyAgendaTypes.REQUEST_DATA_FOR_VIEW, requestDataForEmployeeDailyAgendaScreenSaga, api),
    /** Employees index View */
    takeLatest(employeesScreenActionTypes.REQUEST_DATA_FOR_VIEW, requestDataForEmployeesScreen, api),
    takeLatest(employeesScreenActionTypes.REFRESH_LIST_REQUEST, refreshEmployeesList, api),
    /** Students index View */
    takeLatest(studentsScreenActionTypes.REQUEST_DATA_FOR_VIEW, requestDataForStudentsScreen, api),
    takeLatest(studentsScreenActionTypes.REFRESH_LIST_REQUEST, refreshStudentsList, api),
    /** EmployeeProfile */
    takeLatest(employeeProfileActionTypes.REQUEST_DATA_FOR_VIEW, requestDataForEmployeeProfileScreenSaga, api)
  ]);
}
