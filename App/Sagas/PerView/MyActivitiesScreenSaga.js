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

// export function* myActivities(api, action) {
//   yield put(activityActionCreators.changeStatus(FETCHING_STATUS.FETCHING));
//
//   const response = yield call(api.activities.myActivities, action.params);
//
//   if (response.ok) {
//     yield put(activityActionCreators.saveCollection(response.data, ACTIVITY_DISPLAY_TYPE.MY_ACTIVITIES));
//     yield put(activityActionCreators.changeStatus(FETCHING_STATUS.READY));
//     return response.data;
//   } else {
//     yield put(activityActionCreators.changeStatus(FETCHING_STATUS.ERROR));
//   }
// }
