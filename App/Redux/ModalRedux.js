import { createActions, createReducer } from 'reduxsauce';
import { schoolActivationActionTypes } from './SchoolActivation';

export const MODALS_IDS = { ACTIVATE_SCHOOL: 'ACTIVATE_SCHOOL', SAVE_EMPLOYEE_AVAILABILITY: 'SAVE_EMPLOYEE_AVAILABILITY' };

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

export const openSchoolActivationDialogHandler = state => ( {
  ...state,
  openedModalId: MODALS_IDS.ACTIVATE_SCHOOL,
} );

/* ------------- Gather all handlers to create single reducer ------------- */

export const modalsReducer = createReducer(INITIAL_STATE, {
  [Types.OPEN]: openModalHandler,
  [Types.CLOSE]: closeModalHandler,
});
