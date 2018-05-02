import { FETCHING_STATUS } from '../Lib/utils';
import { call, put } from 'redux-saga/effects';
import { scheduleFormActionCreators } from '../Redux/Views/ScheduleFormRedux';
import { scheduleActionCreators } from '../Redux/Entities/ScheduleRedux';

export function* show(api, action) {
  yield put(scheduleActionCreators.changeStatus(FETCHING_STATUS.FETCHING));

  const response = yield call(api.schedule.show);

  if (response.ok) {
    yield put(scheduleActionCreators.save(response.data));
    yield put(scheduleFormActionCreators.changeNewTemplateBindingFrom(response.data.new_template_binding_from));
    yield put(scheduleActionCreators.changeStatus(FETCHING_STATUS.SUCCESS));
  } else {
    yield put(scheduleActionCreators.changeStatus(FETCHING_STATUS.ERROR));
  }
}

export function* update(api, action) {
  yield put(scheduleFormActionCreators.changeStatus(FETCHING_STATUS.FETCHING));

  const response = yield call(api.schedule.update, action.data);

  if (response.ok) {
    yield put(scheduleActionCreators.save(response.data));
    yield put(scheduleFormActionCreators.changeNewTemplateBindingFrom(response.data.new_template_binding_from));
    yield put(scheduleFormActionCreators.changeStatus(FETCHING_STATUS.SUCCESS));
  } else {
    yield put(scheduleFormActionCreators.changeStatus(FETCHING_STATUS.ERROR));
  }
}
