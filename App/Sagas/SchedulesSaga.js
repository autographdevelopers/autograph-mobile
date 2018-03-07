import { FETCHING_STATUS } from '../Lib/utils';
import { call, put } from 'redux-saga/effects';
import { scheduleFormActionCreators } from '../Redux/ScheduleFormRedux';
import { scheduleActionCreators } from '../Redux/ScheduleRedux';

export function* show(api, action) {
  yield put(scheduleActionCreators.changeStatus(FETCHING_STATUS.FETCHING));

  const response = yield call(api.schedule.show);

  if (response.ok) {
    yield put(scheduleActionCreators.save(response.data));
    yield put(
      scheduleActionCreators.changeStatus(FETCHING_STATUS.SUCCESS));
  } else {
    yield put(scheduleActionCreators.changeStatus(FETCHING_STATUS.ERROR));
  }
}

export function* update(api, action) {
  yield put(scheduleFormActionCreators.changeStatus(FETCHING_STATUS.FETCHING));

  const response = yield call(api.schedule.update, action.data);

  if (response.ok) {
    // yield put(scheduleActionCreators.save(response.data));
    // yield put(
    //   scheduleFormActionCreators.changeStatus(FETCHING_STATUS.SUCCESS));
  } else {
    yield put(scheduleFormActionCreators.changeStatus(FETCHING_STATUS.ERROR));
  }
}
