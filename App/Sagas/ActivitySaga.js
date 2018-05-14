import { FETCHING_STATUS } from '../Lib/utils';
import { call, put } from 'redux-saga/effects';
import { activityActionCreators } from '../Redux/Entities/ActivityRedux';

export function* index(api, action) {
  yield put(activityActionCreators.changeStatus(FETCHING_STATUS.FETCHING));

  const response = yield call(api.activities.index, action.params);

  if (response.ok) {
    yield put(activityActionCreators.saveCollection(response.data));
    yield put(activityActionCreators.changeStatus(FETCHING_STATUS.READY));
    return response.data;
  } else {
    yield put(activityActionCreators.changeStatus(FETCHING_STATUS.ERROR));
  }
}

export function* myActivities(api, action) {
  yield put(activityActionCreators.changeStatus(FETCHING_STATUS.FETCHING));

  const response = yield call(api.activities.myActivities, action.params);

  if (response.ok) {
    yield put(activityActionCreators.saveCollection(response.data));
    yield put(activityActionCreators.changeStatus(FETCHING_STATUS.READY));
    return response.data;
  } else {
    yield put(activityActionCreators.changeStatus(FETCHING_STATUS.ERROR));
  }
}
