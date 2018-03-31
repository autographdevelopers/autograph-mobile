import { FETCHING_STATUS } from '../Lib/utils';
import { call, put } from 'redux-saga/effects';
import { slotActionCreators } from '../Redux/SlotsRedux';
import { calendarActionCreators } from '../Redux/CalendarRedux';
import moment from 'moment';
import { drivingLessonActionCreators } from '../Redux/DrivingLessonRedux';

export function* index(api, action) {
  const { daySelected, params } = action;

  if (daySelected)
    yield put(calendarActionCreators.setDay(daySelected));


  yield put(slotActionCreators.changeStatus(FETCHING_STATUS.FETCHING));

  const slots_response = yield call(api.slots.index, params);
  const driving_lessons_ids = slots_response.data.filter( slot => slot.driving_lesson_id !== null).map(slot => slot.driving_lesson_id);

  const { employee_id } = params;
  const lessons_response = yield call(api.drivingLesson.index, { employee_id, driving_lessons_ids });

  if (slots_response.ok && lessons_response.ok) {
    yield put(slotActionCreators.save(slots_response.data));
    yield put(drivingLessonActionCreators.saveCollection(lessons_response.data));
    yield put(drivingLessonActionCreators.changeStatus(FETCHING_STATUS.SUCCESS));
    yield put(slotActionCreators.changeStatus(FETCHING_STATUS.SUCCESS));
  } else {
    yield put(slotActionCreators.changeStatus(FETCHING_STATUS.ERROR));
    yield put(drivingLessonActionCreators.changeStatus(FETCHING_STATUS.ERROR));
  }
}
