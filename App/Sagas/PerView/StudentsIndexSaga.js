import { FETCHING_STATUS } from '../../Lib/utils';
import { call, put } from 'redux-saga/effects';
import { index as studentsIndex } from '../StudentsSaga';
import { studentsScreenActionCreators } from '../../Redux/Views/StudentsScreenRedux';

export function* requestDataForStudentsScreen(api, action) {
  try {
    yield put(studentsScreenActionCreators.changeStatus(FETCHING_STATUS.FETCHING));
    yield call(studentsIndex, api, action.payloads.studentsPayload || {} );
    yield put(studentsScreenActionCreators.changeStatus(FETCHING_STATUS.SUCCESS));
  } catch(error) {
    yield put(studentsScreenActionCreators.changeStatus(FETCHING_STATUS.ERROR));
  }
}

export function* refreshStudentsList(api, action) {
  yield put(studentsScreenActionCreators.toggleRefreshingFlag());
  yield call(studentsIndex, api, action.payloads.studentsPayload || {} );
  yield put(studentsScreenActionCreators.toggleRefreshingFlag());
}
