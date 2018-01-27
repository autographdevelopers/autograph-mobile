import { createActions, createReducer } from 'reduxsauce';
import { FETCHING_STATUS } from '../Lib/utils';
import { createFormAction } from 'redux-form-saga';

export const updateNotificationSettings = createFormAction('UPDATE_NOTIFICATION_SETTINGS');

const { Types, Creators } = createActions({
  save: ['settings'],
  changeStatus: ['status'],
  showRequest: null /* SAGA */
}, { prefix: 'NOTIFICATION_SETTINGS_' });

export const notificationSettingsActionTypes = Types;
export const notificationSettingsActionCreators = Creators;

export const INITIAL_STATE = {
  settings: {
    // push_notifications_enabled: false,
    // weekly_emails_reports_enabled: false,
    // monthly_emails_reports_enabled: false
  },
  status: FETCHING_STATUS.READY
};

export const saveSettingSetHandler = (state, { settings }) =>
  ({ ...state, settings });
export const changeStatusHandler = (state, { status }) =>
  ({ ...state, status });

export const notificationsSettingsSetReducer = createReducer(INITIAL_STATE, {
  [Types.SAVE]: saveSettingSetHandler,
  [Types.CHANGE_STATUS]: changeStatusHandler,
});
