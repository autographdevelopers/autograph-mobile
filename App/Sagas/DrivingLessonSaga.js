import { FETCHING_STATUS } from '../Lib/utils';
import { call, put } from 'redux-saga/effects';
import { drivingLessonActionCreators } from '../Redux/DrivingLessonRedux';
import { slotActionCreators } from '../Redux/SlotsRedux';

export function* index(api, action) {
  yield put(drivingLessonActionCreators.changeStatus(FETCHING_STATUS.FETCHING));

  const response = yield call(api.drivingLesson.index, action.params);

  if (response.ok) {
    yield put(drivingLessonActionCreators.save(response.data));
    yield put(drivingLessonActionCreators.changeStatus(FETCHING_STATUS.READY));
  } else {
    yield put(drivingLessonActionCreators.changeStatus(FETCHING_STATUS.ERROR));
  }
}

export function* cancel(api, action) {
  yield put(drivingLessonActionCreators.changeStatus(FETCHING_STATUS.FETCHING));

  const response = yield call(api.drivingLesson.cancel, action.id);

  if (response.ok) {
    yield put(drivingLessonActionCreators.destroySingle(action.id));
    yield put(drivingLessonActionCreators.changeStatus(FETCHING_STATUS.SUCCESS));
  } else {
    yield put(drivingLessonActionCreators.changeStatus(FETCHING_STATUS.ERROR));
  }
}

export function* create(api, action) {
  yield put(drivingLessonActionCreators.changeStatus(FETCHING_STATUS.FETCHING));

  const response = yield call(api.drivingLesson.create, action.params);

  if (response.ok) {
    yield put(drivingLessonActionCreators.save(response.data));
    yield put(slotActionCreators.save(response.data.slots));
    yield put(drivingLessonActionCreators.changeStatus(FETCHING_STATUS.SUCCESS));
  } else {
    yield put(drivingLessonActionCreators.changeStatus(FETCHING_STATUS.ERROR));
  }
}
