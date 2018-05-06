import { call, put, all } from 'redux-saga/effects';
import { FETCHING_STATUS } from '../../Lib/utils';
import { employeeProfileActionCreators } from '../../Redux/Views/EmployeeProfileRedux';
import { index as activitiesIndex } from '../ActivitySaga';
import { index as drivingLessonsIndex } from '../DrivingLessonSaga';

export function* requestDataForEmployeeProfileScreenSaga(api, action) {
  try {
    yield put(employeeProfileActionCreators.changeStatus(FETCHING_STATUS.FETCHING));
    yield all([
      call(activitiesIndex, api, action.payloads.activitiesPayload),
      call(drivingLessonsIndex, api, action.payloads.drivingLessonsPayload),
    ]);
    yield put(employeeProfileActionCreators.changeStatus(FETCHING_STATUS.SUCCESS));
  } catch(error) {
    yield put(employeeProfileActionCreators.changeStatus(FETCHING_STATUS.ERROR));
  }
}
