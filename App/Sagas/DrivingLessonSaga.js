import { FETCHING_STATUS } from '../Lib/utils';
import { call, put } from 'redux-saga/effects';
import { drivingLessonActionCreators } from '../Redux/Entities/DrivingLessonRedux';
import { slotActionCreators } from '../Redux/Entities/SlotsRedux';
import { cancelDrivingLessonModalActionCreators } from '../Redux/Views/Modals/CancelDrivingLesson';
import { bookLessonActionCreators } from '../Redux/Views/Modals/BookLesson';
import { studentsActionCreators } from '../Redux/Entities/StudentsRedux';

export function* index(api, action) {
  yield put(drivingLessonActionCreators.changeStatus(FETCHING_STATUS.FETCHING));

  const response = yield call(api.drivingLesson.index, action.params);

  if (response.ok) {
    yield put(drivingLessonActionCreators.save(response.data));
    yield put(drivingLessonActionCreators.changeStatus(FETCHING_STATUS.READY));
    return response.data;
  } else {
    yield put(drivingLessonActionCreators.changeStatus(FETCHING_STATUS.ERROR));
  }
}

export function* cancel(api, action) {
  yield put(cancelDrivingLessonModalActionCreators.changeStatus(FETCHING_STATUS.FETCHING));

  const response = yield call(api.drivingLesson.cancel, action.id);

  if (response.ok) {
    yield put(studentsActionCreators.addAvailableHours(
      action.studentId,
      action.slots.length
    ));

    yield put(slotActionCreators.releaseLesson(action.id));
    yield put(drivingLessonActionCreators.updateSingle(response.data));
    yield put(cancelDrivingLessonModalActionCreators.changeStatus(FETCHING_STATUS.SUCCESS));
  } else {
    yield put(cancelDrivingLessonModalActionCreators.changeStatus(FETCHING_STATUS.ERROR));
  }
}

export function* create(api, action) {
  yield put(bookLessonActionCreators.changeStatus(FETCHING_STATUS.FETCHING));

  const response = yield call(api.drivingLesson.create, action.params);

  if (response.ok) {
    yield put(studentsActionCreators.subtractAvailableHours(
      action.params.student_id,
      action.params.slot_ids.length
    ));

    yield put(drivingLessonActionCreators.save(response.data));
    yield put(slotActionCreators.save(response.data.slots));
    yield put(bookLessonActionCreators.changeStatus(FETCHING_STATUS.SUCCESS));
  } else {
    yield put(bookLessonActionCreators.changeStatus(FETCHING_STATUS.ERROR));
  }
}
