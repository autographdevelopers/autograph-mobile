import { FETCHING_STATUS } from '../../Lib/utils';
import { call, put } from 'redux-saga/effects';
import { myActivitiesScreenActionCreators } from '../../Redux/Views/MyActivitiesScreenRedux';
import { myActivities } from '../ActivitySaga';

export function* requestDataForMyActivitesScreen(api, action) {
  try {
    yield put(myActivitiesScreenActionCreators.changeStatus(FETCHING_STATUS.FETCHING));
    const activities = yield call(myActivities, api, action.payloads.activitiesPayload);
    yield put(myActivitiesScreenActionCreators.saveActivities(activities));
    yield put(myActivitiesScreenActionCreators.changeStatus(FETCHING_STATUS.SUCCESS));
  } catch(error) {
    yield put(myActivitiesScreenActionCreators.changeStatus(FETCHING_STATUS.ERROR));
  }
}

export function* requestMoreActivities(api, action) {
    yield put(myActivitiesScreenActionCreators.setFetchingMoreFlag(true));
    const activities = yield call(myActivities, api, action);
    yield put(myActivitiesScreenActionCreators.saveActivities(activities));
    yield put(myActivitiesScreenActionCreators.setFetchingMoreFlag(false));
}
