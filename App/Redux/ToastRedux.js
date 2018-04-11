import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  displayToastMessage: ['message', 'configuration'],
}, { prefix: 'TOAST_MESSAGE' });

export const toastActionTypes = Types;
export const toastActionCreators = Creators;
