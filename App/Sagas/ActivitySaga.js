import { FETCHING_STATUS } from '../Lib/utils';
import { ACTIVITY_DISPLAY_TYPE } from '../Lib/ActivitiesHelper';
import { call, put } from 'redux-saga/effects';
import { activityActionCreators } from '../Redux/ActivityRedux';

export function* index(api, action) {
  yield put(activityActionCreators.changeStatus(FETCHING_STATUS.FETCHING));

  const response = yield call(api.activities.index, action.params);

  if (response.ok) {
    yield put(activityActionCreators.saveCollection(response.data, action.activityDisplayType));
    yield put(activityActionCreators.changeStatus(FETCHING_STATUS.READY));
  } else {
    yield put(activityActionCreators.changeStatus(FETCHING_STATUS.ERROR));
  }
}

export function* myActivities(api, action) {
  yield put(activityActionCreators.changeStatus(FETCHING_STATUS.FETCHING));

  const response = yield call(api.activities.myActivities, action.params);

  if (response.ok) {
    yield put(activityActionCreators.saveCollection(response.data, ACTIVITY_DISPLAY_TYPE.MY_ACTIVITIES));
    yield put(activityActionCreators.changeStatus(FETCHING_STATUS.READY));
  } else {
    yield put(activityActionCreators.changeStatus(FETCHING_STATUS.ERROR));
  }
}
