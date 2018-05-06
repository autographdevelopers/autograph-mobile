import { call, put } from 'redux-saga/effects';
import { employeeDailyAgendaActionCreators } from '../../Redux/Views/AgendaRedux';
import { index as slotsIndex } from '../SlotsSaga';
import { FETCHING_STATUS } from '../../Lib/utils';

export function* requestDataForEmployeeDailyAgendaScreenSaga(api, action) {
  try {
    yield put(employeeDailyAgendaActionCreators.changeStatus(FETCHING_STATUS.FETCHING));
    yield call(slotsIndex, api, action.payloads.slotsPayload);
    yield put(employeeDailyAgendaActionCreators.changeStatus(FETCHING_STATUS.SUCCESS));
  } catch(error) {
    yield put(employeeDailyAgendaActionCreators.changeStatus(FETCHING_STATUS.ERROR));
  }
}
