import moment from 'moment';
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

export const SLOT_STATUS = { FREE: 'FREE', BOOKED: 'BOOKED' };

export const generateDailySlots = () => {
  const now = moment({hour: 0, minute: 0});

  return new Array(48).fill(0).map((_, index) => {
    const from = now.clone().add(index * 30, 'minutes').format('HH:mm');
    const to = now.clone().add((index+1) * 30, 'minutes').format('HH:mm');

      return { id: index, start_hour: from, end_hour: to, status: SLOT_STATUS.FREE };
    },
  );
};

String.prototype.capitalize = function() {
  return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};
