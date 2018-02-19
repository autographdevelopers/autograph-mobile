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
export const findInObjectByPath = (obj, path) => {
  for (let i = 0, path = path.split('.'), len = path.length; i < len; i++) {
    obj = obj[path[i]];
  }
  return obj;
};

export const padNumber = s => String('0' + s).slice(-2);

export const SLOT_STATUS = { FREE: 'FREE', BOOKED: 'BOOKED' };

export const generateDailySlots = () => {
  return new Array(48).fill(0).map((_, index) => {
      const hour = padNumber(( 0.25 * ( 2 * ( index + 1 ) + (Math.pow( -1, index + 2 ) ) - 3 ) ));
      const minute = padNumber((index * 30) % 60);

      return { start_hour: `${hour}:${minute}`, status: SLOT_STATUS.FREE };
    },
  );
};

String.prototype.capitalize = function() {
  return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};
