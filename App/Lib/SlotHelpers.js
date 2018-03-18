import moment from 'moment/moment';

export const slotHelper = {
  TIME_FORMAT: 'HH:mm',
  summarizeDay: function(daySlots){
    // const sortedSlots = daySlots.sort((prev, next) => prev > next);
    const groupedSlots = this.groupAdjacentSlots(daySlots);
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
    if (id == undefined) return undefined;

    return moment({ hour: 0, minute: 0 }).add(id * 30, 'minutes').format(this.TIME_FORMAT)
  },

  hourToId: function(hour) {
    const time = moment(hour, this.TIME_FORMAT);
    const formatted_time = time.format(this.TIME_FORMAT);
    const [hours, minutes] = formatted_time.split(':');

    if (!['30', '00'].includes(minutes))
      throw 'Minutes must be rounder to half an hour.';

    let id;
    let currentMoment;


    for (let i = 0; i < 48; i++) {
      currentMoment = moment({ hour: 0, minute: 0 }).add(i * 30, 'minutes');

      if(currentMoment.format(this.TIME_FORMAT) === time.format(this.TIME_FORMAT)) {
        id = i;
        break;
      }
    }
    return id;
  },
  roundTimeToHalfHourInterval: function(t) {
    let time = moment(t, this.TIME_FORMAT);

    if(time.minutes() < 15) {
      time.minutes(0);
    } else if(time.minutes() > 45) {
      time.add(1, 'hours');
      time.minutes(0);
    } else if(time.minutes() >= 15 && time.minutes() <= 45) {
      time.minutes(30);
    }
    return time.format(this.TIME_FORMAT);
  }
};
