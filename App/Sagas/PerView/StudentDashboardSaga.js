import { FETCHING_STATUS } from '../../Lib/utils';
import { call, put, all } from 'redux-saga/effects';
import { studentDashboardActionCreators } from '../../Redux/Views/StudentDashboardRedux';
import { index as drivingLessonsIndex } from '../DrivingLessonSaga';
import { show as showDrivingCourse } from '../DrivingCourseSaga';

export function* requestDataForStudentDashboardScreenSaga(api, action) {
  try {
    yield put(studentDashboardActionCreators.changeStatus(FETCHING_STATUS.FETCHING));
    const { lessons, course } = yield all({
      lessons: call(drivingLessonsIndex, api, action.payloads.lessonsPayload),
      course: call(showDrivingCourse, api, action.payloads.coursePayload),
    });
    yield put(studentDashboardActionCreators.saveLessons(lessons));
    yield put(studentDashboardActionCreators.changeStatus(FETCHING_STATUS.SUCCESS));
  } catch ( error ) {
    yield put(studentDashboardActionCreators.changeStatus(FETCHING_STATUS.ERROR));
  }
}
