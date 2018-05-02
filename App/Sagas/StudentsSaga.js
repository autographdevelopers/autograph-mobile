import { FETCHING_STATUS } from '../Lib/utils';
import { call, put } from 'redux-saga/effects';
import { studentsActionCreators } from '../Redux/Entities/StudentsRedux';

export function* index(api, action) {
  yield put(studentsActionCreators.changeStatus(FETCHING_STATUS.FETCHING));

  const response = yield call(api.students.index);

  if (response.ok) {
    yield put(studentsActionCreators.saveCollection(response.data)); // add in redux
    yield put(
      studentsActionCreators.changeStatus(FETCHING_STATUS.SUCCESS));
  } else {
    yield put(studentsActionCreators.changeStatus(FETCHING_STATUS.ERROR));
  }
}
