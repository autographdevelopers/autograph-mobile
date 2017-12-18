import { createReducer, createActions } from 'reduxsauce';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({ setCurrentDrivingSchool: ['currentDrivingSchoolID'] });

export const contextTypes = Types;
export const contextActionCreators = Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  currentDrivingSchoolID: null
};

/* ------------- Handlers ------------- */

export const setCurrentSchoolHandler = (state, { currentDrivingSchoolID }) => ({ ...state, currentDrivingSchoolID });

/* ------------- Hookup Reducers To Types ------------- */

export const contextReducer = createReducer(INITIAL_STATE, {
  [Types.SET_CURRENT_DRIVING_SCHOOL]: setCurrentSchoolHandler
});
