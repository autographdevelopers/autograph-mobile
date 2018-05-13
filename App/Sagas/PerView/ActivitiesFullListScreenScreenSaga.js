import { FETCHING_STATUS } from '../../Lib/utils';
import { call, put } from 'redux-saga/effects';
import { activitiesFullListScreenScreenActionCreators } from '../../Redux/Views/ActivitiesFullListScreenRedux';
import { index as activitiesIndex } from '../ActivitySaga';

export function* requestDataForActivitiesFullListScreen(api, action) {
  try {
    yield put(activitiesFullListScreenScreenActionCreators.changeStatus(FETCHING_STATUS.FETCHING));
    const activities = yield call(activitiesIndex, api, action.payloads.activitiesPayload);
    yield put(activitiesFullListScreenScreenActionCreators.saveActivities(activities));
    yield put(activitiesFullListScreenScreenActionCreators.changeStatus(FETCHING_STATUS.SUCCESS));
  } catch(error) {
    yield put(activitiesFullListScreenScreenActionCreators.changeStatus(FETCHING_STATUS.ERROR));
  }
}

export function* requestMoreFullListActivities(api, action) {
  yield put(activitiesFullListScreenScreenActionCreators.setFetchingMoreFlag(true));
  const activities = yield call(activitiesIndex, api, action);
  yield put(activitiesFullListScreenScreenActionCreators.saveActivities(activities));
  yield put(activitiesFullListScreenScreenActionCreators.setFetchingMoreFlag(false));
}
