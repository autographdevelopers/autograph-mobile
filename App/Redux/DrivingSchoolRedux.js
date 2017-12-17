// create driving school request, save driving school
import { createReducer, createActions } from 'reduxsauce';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  saveDrivingSchool: ['data'],
  createDrivingSchoolRequest: ['params', 'formID', 'redirectionAction'] /* SAGA listens for this action */
});

export const drivingSchoolActionTypes = Types;
export const drivingSchoolActionCreators = Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  id: null,
  name: null,
  phone_numbers: null,
  emails: null,
  website_link: null,
  additional_information: null,
  city: null,
  street: null,
  zip_code: null,
  country: null,
  profile_picture: null,
  status: null
};

/* ------------- Handlers ------------- */

export const saveDrivingSchoolHandler = (state, { data }) => ({ ...state, ...data });

/* ------------- Gather all handlers to create single reducer ------------- */

export const drivingSchoolReducer = createReducer(INITIAL_STATE, {
  [Types.SAVE_DRIVING_SCHOOL]: saveDrivingSchoolHandler
});
