import moment from 'moment/moment';

export const slotHelper = {
  summarizeDay: function(daySlots){
    const groupedSlots = this.groupAdjacentSlots(daySlots);
    console.log(groupedSlots);
    const intervals = this.mapToHumanReadableIntervals(groupedSlots);

    return intervals;
  },

  groupAdjacentSlots: function(daySlots){
    return daySlots.reduce((acc, current, index, _) => {
      if ( index === 0 ) {
        acc.push([current]);
      } else {
        const lastInterval = acc[acc.length - 1];
        const lastSlot = lastInterval[lastInterval.length - 1];

        if ( lastSlot + 1 === current )
          lastInterval.push(current);
        else
          acc.push([current]);
      }

      return acc;
    }, []);
  },

  mapToHumanReadableIntervals: function(slotGroups){
    return slotGroups.map(interval =>
      `${this.idToHour(interval[0])} - ${this.idToHour((interval[interval.length - 1]+1))}`
    );
  },

  getSlotInterval: function(id) {
    return `${this.idToHour(id)} - ${this.idToHour(id+1)}`
  },

  idToHour: function(id) {
    return moment({ hour: 0, minute: 0 }).add(id * 30, 'minutes').format('HH:mm')
  }
};
