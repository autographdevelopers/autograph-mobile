import { FETCHING_STATUS } from '../Lib/utils';
import { call, put } from 'redux-saga/effects';
import { drivingCourseActionCreators } from '../Redux/DrivingCourseRedux';

export function* show(api, action) {
  yield put(drivingCourseActionCreators.changeStatus(FETCHING_STATUS.FETCHING));

  const response = yield call(api.drivingCourse.show, action.studentId);

  if (response.ok) {
    yield put(drivingCourseActionCreators.saveSingle(response.data));
    yield put(drivingCourseActionCreators.changeStatus(FETCHING_STATUS.READY));
  } else {
    yield put(drivingCourseActionCreators.changeStatus(FETCHING_STATUS.ERROR));
  }
}

export function* update(api, action) {
  yield put(drivingCourseActionCreators.changeStatus(FETCHING_STATUS.FETCHING));

  const response = yield call(api.drivingCourse.update, { driving_course: action.data });

  if (response.ok) {
    yield put(drivingCourseActionCreators.saveSingle(response.data));
    yield put(drivingCourseActionCreators.changeStatus(FETCHING_STATUS.SUCCESS));
  } else {
    yield put(drivingCourseActionCreators.changeStatus(FETCHING_STATUS.ERROR));
  }
}
