import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  displayToastMessage: ['message', 'configuration'],
}, { prefix: 'TOAST_MESSAGE' });

console.log("**********************");
console.log("**********************");
console.log("**********************");
console.log(Creators.displayToastMessage);
console.log("**********************");
console.log("**********************");
console.log("**********************");

export const toastActionTypes = Types;
export const toastActionCreators = Creators;
