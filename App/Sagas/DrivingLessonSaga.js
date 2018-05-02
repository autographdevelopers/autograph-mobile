import { FETCHING_STATUS } from '../Lib/utils';
import { call, put } from 'redux-saga/effects';
import { drivingLessonActionCreators } from '../Redux/Entities/DrivingLessonRedux';
import { slotActionCreators } from '../Redux/Entities/SlotsRedux';
import { cancelDrivingLessonModalActionCreators } from '../Redux/Views/Modals/CancelDrivingLesson';
import { bookLessonActionCreators } from '../Redux/Views/Modals/BookLesson';
import { AFTER_SAVE_CALLBACKS } from '../Lib/DrivingLessonHelpers';

export function* index(api, action) {
  yield put(drivingLessonActionCreators.changeStatus(FETCHING_STATUS.FETCHING));

  const response = yield call(api.drivingLesson.index, action.params);

  if (response.ok) {
    yield put(drivingLessonActionCreators.save(response.data, action.after_save_callback_type));
    yield put(drivingLessonActionCreators.changeStatus(FETCHING_STATUS.READY));
  } else {
    yield put(drivingLessonActionCreators.changeStatus(FETCHING_STATUS.ERROR));
  }
}

export function* cancel(api, action) {
  yield put(cancelDrivingLessonModalActionCreators.changeStatus(FETCHING_STATUS.FETCHING));

  const response = yield call(api.drivingLesson.cancel, action.id);

  if (response.ok) {
    yield put(slotActionCreators.releaseLesson(action.id));
    yield put(drivingLessonActionCreators.destroySingle(action.id));
    yield put(cancelDrivingLessonModalActionCreators.changeStatus(FETCHING_STATUS.SUCCESS));
  } else {
    yield put(cancelDrivingLessonModalActionCreators.changeStatus(FETCHING_STATUS.ERROR));
  }
}

export function* create(api, action) {
  yield put(bookLessonActionCreators.changeStatus(FETCHING_STATUS.FETCHING));

  const response = yield call(api.drivingLesson.create, action.params);

  if (response.ok) {
    yield put(drivingLessonActionCreators.save(response.data, AFTER_SAVE_CALLBACKS.APPEND_ID));
    yield put(slotActionCreators.save(response.data.slots));
    yield put(bookLessonActionCreators.changeStatus(FETCHING_STATUS.SUCCESS));
  } else {
    yield put(bookLessonActionCreators.changeStatus(FETCHING_STATUS.ERROR));
  }
}
