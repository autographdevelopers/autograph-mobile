import { createActions, createReducer } from 'reduxsauce';

export const MODALS_IDS = {
  ACTIVATE_SCHOOL: 'ACTIVATE_SCHOOL',
  SAVE_EMPLOYEE_AVAILABILITY: 'SAVE_EMPLOYEE_AVAILABILITY',
  CHANGE_NEW_SCHEDULE_BINDING_FROM_DATE: 'CHANGE_NEW_SCHEDULE_BINDING_FROM_DATE',
  REMOVE_SCHEDULE: 'REMOVE_SCHEDULE',
  DESTROY_STUDENT_INVITATION: 'DESTROY_STUDENT_INVITATION',
  DESTROY_EMPLOYEE_INVITATION: 'DESTROY_EMPLOYEE_INVITATION',
};

const { Types, Creators } = createActions({
  open: ['id'],
  close: null,
}, { prefix: 'MODAL_' });

export const modalActionTypes = Types;
export const modalActionCreators = Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  openedModalId: null,
};

/* ------------- Handlers ------------- */

export const closeModalHandler = (state) => ( {
  ...state,
  openedModalId: null,
} );

export const openModalHandler = (state, { id }) => ( {
  ...state,
  openedModalId: id,
} );

/* ------------- Gather all handlers to create single reducer ------------- */

export const modalsReducer = createReducer(INITIAL_STATE, {
  [Types.OPEN]: openModalHandler,
  [Types.CLOSE]: closeModalHandler,
});
