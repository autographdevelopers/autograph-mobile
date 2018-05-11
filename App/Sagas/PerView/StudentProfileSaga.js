import { call, put, all } from 'redux-saga/effects';
import { FETCHING_STATUS } from '../../Lib/utils';
import { studentProfileActionCreators } from '../../Redux/Views/StudentProfileRedux';
import { index as activitiesIndex } from '../ActivitySaga';
import { index as drivingLessonsIndex } from '../DrivingLessonSaga';
import { show as showDrivingCourse } from '../DrivingCourseSaga';

export function* requestDataForStudentProfileScreenSaga(api, action) {
  try {
    yield put(studentProfileActionCreators.changeStatus(FETCHING_STATUS.FETCHING));
    const { activities, drivingLessons, drivingCourse } = yield all({
      activities: call(activitiesIndex, api, action.payloads.activitiesPayload),
      drivingLessons: call(drivingLessonsIndex, api, action.payloads.drivingLessonsPayload),
      drivingCourse: call(showDrivingCourse, api, action.payloads.drivingCoursePayload)
    });
    yield put(studentProfileActionCreators.saveLessons(drivingLessons));
    yield put(studentProfileActionCreators.changeStatus(FETCHING_STATUS.SUCCESS));
  } catch(error) {
    yield put(studentProfileActionCreators.changeStatus(FETCHING_STATUS.ERROR));
  }
}
