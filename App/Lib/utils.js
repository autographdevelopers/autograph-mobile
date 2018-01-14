export const deepClone = entity => (JSON.parse(JSON.stringify(entity)));
export const arrayToHash = array => array.reduce((accumulator, current) => {accumulator[current.id] = current; return accumulator}, {})
export const mergeArraysUniq = (a, b) => [...new Set([...a ,...b])];
export const FETCHING_STATUS = { READY: 'READY', FETCHING: 'FETCHING', SUCCESS: 'SUCCESS', ERROR: 'ERROR' };
export const findInObjectByPath = (obj, path) => {
  for (let i = 0, path = path.split('.'), len=path.length; i<len; i++){
    obj = obj[path[i]];
  }
  return obj;
};
