/** == Vendor modules ======================================= */
import { call, put, all, race, take, select } from 'redux-saga/effects';
import Toast from 'react-native-root-toast';
/** == SAGA TASKS ======================================= */
import { index as employeesIndex } from '../EmployeesSaga';
import { index as studentsIndex } from '../StudentsSaga';
import { index as slotsIndex } from '../SlotsSaga';
import { show as scheduleSettingsShow } from '../ScheduleSettingsSaga';
/** == Selectors ======================================= */
import { getFetchedIntervalsForSummaryAgenda } from '../../Selectors/EmployeesSummaryAgenda';
/** == Action Creators ======================================= */
import { employeesSummaryAgendaActionCreators } from '../../Redux/Views/AgendaRedux';
/** == Constants ======================================= */
import { FETCHING_STATUS } from '../../Lib/utils';
import { SLOTS_FETCHED_CALLBACKS } from '../../Redux/Entities/SlotsRedux';


const delay = (ms) => new Promise(res => setTimeout(res, ms));

export function* requestDataForSummaryAgendaScreenSaga(api, action) {
  try {
    yield put(employeesSummaryAgendaActionCreators.changeStatus(FETCHING_STATUS.FETCHING));
    yield all([
      call(employeesIndex, api, action.payloads.employeesPayload || {} ),
      call(studentsIndex, api, action.payloads.studentsPayload || {} ),
      call(slotsIndex, api, action.payloads.slotsPayload || {} ),
      call(scheduleSettingsShow, api, action.payloads.scheduleSettingsPayload || {} ),
    ]);
    yield put(employeesSummaryAgendaActionCreators.changeStatus(FETCHING_STATUS.SUCCESS));
  } catch(error) {
    yield put(employeesSummaryAgendaActionCreators.changeStatus(FETCHING_STATUS.ERROR));
  }
}

export function* requestSlotsForAnotherWeekSaga(api, action) {
  try {
    yield put(employeesSummaryAgendaActionCreators.changeStatus(FETCHING_STATUS.FETCHING));
    yield call(slotsIndex, api, action.slotsAction);
    yield put(employeesSummaryAgendaActionCreators.changeStatus(FETCHING_STATUS.SUCCESS));
  } catch(error) {
    yield put(employeesSummaryAgendaActionCreators.changeStatus(FETCHING_STATUS.ERROR));
  }
}

const LONG_POLLING_INTERVAL_IN_MILISEC = 60000 * 6;

function* longPollTaskSummaryAgenda(api) {
  while (true) {
    try {
      yield call(delay, LONG_POLLING_INTERVAL_IN_MILISEC);

      let toast = Toast.show('Synchronizowanie..', {
        position: Toast.positions.TOP,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
      });

      const intervals = yield select(getFetchedIntervalsForSummaryAgenda);
      const sagaCalls = intervals.map(interval => {
        const actionParams = {
          params: {
            by_start_time: { from: interval.dataFrom, to: interval.dataTo }
          },
          callback: SLOTS_FETCHED_CALLBACKS.SUMMARY_AGENDA_PUSH_CACHE_HISTORY
        };

        return call(slotsIndex, api, actionParams)
      });
      yield put(employeesSummaryAgendaActionCreators.clearCacheHistory());
      yield all(sagaCalls);

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
//TODO: does it stop when school changed?
export function* longPollSummaryAgenda(api, action) {
  yield(
    race([
      call(longPollTaskSummaryAgenda, api),
      take('USER_LOGOUT')
    ])
  )
}
