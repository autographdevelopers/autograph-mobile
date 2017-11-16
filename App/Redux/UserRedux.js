import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setUser: ['user'],
  clearUser: null
});

export const USER_ACTION_TYPES = Types;
export const userActionCreators = Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  name: null,
  surname: null,
  email: null,
  gender: null,
  type: null,
  birthDate: null,
  timeZone: null
};

/* ------------- Handlers ------------- */

export const setUserHandler = (state, {user: {name, surname, email, gender, type, birthDay, timeZone}}) => {
  return {...state, name, surname, email, gender, type, birthDay, timeZone}
};

export const clearUserHandler = (state, _) => {
  return {...state, ...INITIAL_STATE}
};

/* ------------- Gather all handlers to create single reducer ------------- */

export const userReducer = createReducer(INITIAL_STATE, {
  [Types.SET_USER]: setUserHandler,
  [Types.CLEAR_USER]: clearUserHandler
});
