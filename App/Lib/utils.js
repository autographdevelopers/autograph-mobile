import moment from 'moment';
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

export const SLOT_STATUS = { FREE: 'FREE', BOOKED: 'BOOKED' };

export const generateDailySlots = ( setStatus = index => SLOT_STATUS.FREE ) => {
  const now = moment({hour: 0, minute: 0});

  return new Array(48).fill(0).map((_, index) => {
    const from = now.clone().add(index * 30, 'minutes').format('HH:mm');
    const to = now.clone().add((index+1) * 30, 'minutes').format('HH:mm');

      return { id: index, start_hour: from, end_hour: to, status: setStatus(index) };
    },
  );
};

// {
//   status: 'ACTIVE',
//   start_hour: '13:30',
//   end_hour: '14:00',
//   id: 27
// }

export const groupBookedSlots = (slotsCollection, compare) => {
  return slotsCollection.reduce((acc, current, index, _) => {
    if(index === 0 ) {
      acc.push([current]);
    } else {
      const lastInterval = acc[acc.length - 1];
      const lastSlot = lastInterval[lastInterval.length - 1];
      if(lastSlot.id === current.id - 1) {
        lastInterval.push(current);
      } else {
        acc.push([current]);
      }
    }

    return acc;
  }, []);
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

export const mapToBookedSlotsSummary = slotsCollection => {
  return slotsCollection.map( item => `${item[0].start_hour} - ${item[item.length - 1].end_hour}`)
};

export const slotsSummary = slots => {
  const activeSlots = slots.filter(slot => slot.status === SLOT_STATUS.BOOKED);
  const groupedSlots = groupBookedSlots(activeSlots, (last, current) => last.id === current.id -1);
  const summarizedIntervals = mapToBookedSlotsSummary(groupedSlots);

  return summarizedIntervals;
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
