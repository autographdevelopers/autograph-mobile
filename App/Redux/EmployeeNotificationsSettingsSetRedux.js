import { createActions, createReducer } from 'reduxsauce';
import { FETCHING_STATUS } from '../Lib/utils';
import { createFormAction } from 'redux-form-saga';

export const updateNotificationSettings = createFormAction('UPDATE_NOTIFICATION_SETTINGS');

const { Types, Creators } = createActions({
  saveSettingsSet: ['data'],
  fetchNotificationSettingsSetRequest: null, /* SAGA */
  changeNotificationsSettingsStatus: ['status'],
});

export const notificationActionTypes = Types;
export const notificationActionCreators = Creators;

export const INITIAL_STATE = {
  // push_notifications_enabled: false,
  // weekly_emails_reports_enabled: false,
  // monthly_emails_reports_enabled: false
  STATUS: FETCHING_STATUS.READY
};

export const saveSettingSetHandler = (state, { data }) => ({ ...state, ...data });
export const changeStatusHandler = (state, { status }) => ({ ...state, status });

export const notificationsSettingsSetReducer = createReducer(INITIAL_STATE, {
  [Types.SAVE_SETTINGS_SET]: saveSettingSetHandler,
  [Types.CHANGE_NOTIFICATIONS_SETTINGS_STATUS]: changeStatusHandler,
});
