import { FETCHING_STATUS } from '../Lib/utils';
import { call, put } from 'redux-saga/effects';
import { slotActionCreators } from '../Redux/SlotsRedux';
import { calendarActionCreators } from '../Redux/CalendarRedux';
import { drivingLessonActionCreators } from '../Redux/DrivingLessonRedux';
import { SLOTS_FETCHED_CALLBACKS } from '../Redux/SlotsRedux';
import { employeesSummaryAgendaActionCreators } from '../Redux/AgendaRedux';
import { employeeDailyAgendaActionCreators } from '../Redux/AgendaRedux';

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
    yield put(drivingLessonActionCreators.save(lessons_response.data));
    // ORDER OF SAVES MATTERS !
    yield put(slotActionCreators.save(slots_response.data));
    yield put(drivingLessonActionCreators.changeStatus(FETCHING_STATUS.SUCCESS));
    yield put(slotActionCreators.changeStatus(FETCHING_STATUS.SUCCESS));

    switch(action.callback) {
      case SLOTS_FETCHED_CALLBACKS.DAILY_AGENDA_PUSH_CACHE_HISTORY:
        yield put(employeeDailyAgendaActionCreators.pushCacheHistory(params.by_start_time.from, params.by_start_time.to));
        break;
      case SLOTS_FETCHED_CALLBACKS.SUMMARY_AGENDA_PUSH_CACHE_HISTORY:
        yield put(employeesSummaryAgendaActionCreators.pushCacheHistory(params.by_start_time.from, params.by_start_time.to));
        break;
    }
  } else {
    yield put(slotActionCreators.changeStatus(FETCHING_STATUS.ERROR));
    yield put(drivingLessonActionCreators.changeStatus(FETCHING_STATUS.ERROR));
  }
}
