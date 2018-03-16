import { View, ScrollView } from 'react-native';
export const deepClone = entity => ( JSON.parse(JSON.stringify(entity)) );
export const arrayToHash = array => array.reduce((accumulator, current) => {
  accumulator[current.id] = current;
  return accumulator;
}, {});
export const mergeArraysUniq = (a, b) => [...new Set([...a, ...b])];

export const FETCHING_STATUS = {
  READY: 'READY',
  FETCHING: 'FETCHING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

export const isTemplateEmpty = template => {
  return template['monday'] && template['monday'].length === 0
    && template['tuesday'] && template['tuesday'].length === 0
    && template['wednesday'] && template['wednesday'].length === 0
    && template['thursday'] && template['thursday'].length === 0
    && template['friday'] && template['friday'].length === 0
    && template['saturday'] && template['saturday'].length === 0
    && template['sunday'] && template['sunday'].length === 0
};

String.prototype.capitalize = function() {
  return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

Array.prototype.last = function() {
  return this[this.length-1];
};

Array.prototype.first = function() {
  return this[0];
};
