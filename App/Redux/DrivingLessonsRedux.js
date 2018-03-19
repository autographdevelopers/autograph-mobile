import { createReducer, createActions } from 'reduxsauce';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
});

export const drivingLessonTypes = Types;
export const drivingLessonActionCreators = Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = [
  // {
// start_time
// student_driving_school_id
// employee_driving_school_id
// created_at
// updated_at
//   }, ...
];

/* ------------- Handlers ------------- */

/* ------------- Hookup Reducers To Types ------------- */

export const drivingLessonReducer = createReducer(INITIAL_STATE, {
});
