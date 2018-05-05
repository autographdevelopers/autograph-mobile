import { FETCHING_STATUS } from '../../Lib/utils';
import { call, put, all, race, take } from 'redux-saga/effects';
import { index as employeesIndex } from '../EmployeesSaga';
import { index as studentsIndex } from '../StudentsSaga';
import { index as slotsIndex } from '../SlotsSaga';
import { show as scheduleSettingsShow } from '../ScheduleSettingsSaga';
import { employeesSummaryAgendaActionCreators } from '../../Redux/Views/AgendaRedux';
import Toast from 'react-native-root-toast';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

export function* requestDataForSummaryAgendaScreenSaga(api, action) {
  try {
    // TODO UNIFY ALL SUBSAGAS PARAMS WITH NEW APPROACH
    yield put(employeesSummaryAgendaActionCreators.changeStatus(FETCHING_STATUS.FETCHING));
    yield all([
      call(employeesIndex, api, action.payloads.employeesPayload || {} ),
      call(studentsIndex, api, action.payloads.studentsPayload || {} ),
      call(slotsIndex, api, action.payloads.slotsPayload || {} ),
      call(scheduleSettingsShow, api, action.payloads.scheduleSettingsPayload || {}),
    ]);
    yield put(employeesSummaryAgendaActionCreators.changeStatus(FETCHING_STATUS.SUCCESS));
  } catch(error) {
    yield put(employeesSummaryAgendaActionCreators.changeStatus(FETCHING_STATUS.ERROR));
  }
}

const LONG_POLLING_INTERVAL_IN_MILISEC = 60000 * 5;

function* longPollTaskSummaryAgenda(api, action) {
  while (true) {
    try {
      console.log(1);
      yield call(delay, LONG_POLLING_INTERVAL_IN_MILISEC);
      console.log(2);

      let toast = Toast.show('Synchronizowanie..', {
        position: Toast.positions.TOP,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
      });

      yield call(slotsIndex, api, action.payloads.slotsPayload || {});
      console.log(3);
      Toast.hide(toast);
    } catch ( error ) {
      Toast.show('Nie udało sie zsynchronizowac..', {
        position: Toast.positions.TOP,
        duration: Toast.durations.LONG,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
      });
    }
  }
}

export function* longPollSummaryAgenda(api, action) {
  console.log(0);
  yield(
    race([
      call(longPollTaskSummaryAgenda, api, action),
      take('USER_LOGOUT')
    ])
  )
}
