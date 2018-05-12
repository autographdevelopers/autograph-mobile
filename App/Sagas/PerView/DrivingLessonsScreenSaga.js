import { call, put } from 'redux-saga/effects';
import { FETCHING_STATUS } from '../../Lib/utils';
import { index as drivingLessonsIndex } from '../DrivingLessonSaga';
import { drivingLessonsScreenActionCreators } from '../../Redux/Views/DrivingLessonsList';

export function* requestDataForDrivingLessonsListScreenSaga(api, action) {
  try {
    yield put(drivingLessonsScreenActionCreators.changeStatus(FETCHING_STATUS.FETCHING));
    const lessons = yield call(drivingLessonsIndex, api, action.payloads.lessonsParams);
    yield put(drivingLessonsScreenActionCreators.saveLessons(lessons));
    yield put(drivingLessonsScreenActionCreators.changeStatus(FETCHING_STATUS.SUCCESS));
  } catch(error) {
    yield put(drivingLessonsScreenActionCreators.changeStatus(FETCHING_STATUS.ERROR));
  }
}
