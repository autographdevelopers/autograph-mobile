import moment from 'moment/moment';
import momentTimezone from 'moment-timezone';

export const slotHelper = {
  TIME_FORMAT: 'HH:mm',
  validateFrames: function(frames) {
    if (frames.first() <= frames.last()) {
      return undefined;
    } else if (frames.length > 0){
      return 'Godzina otwarcia musi byc przed godzina zamkniecia.'
    }
  },
  summarizeDay: function(daySlots) {
    const sortedSlots = daySlots.sort();
    const groupedSlots = this.groupAdjacentSlots(sortedSlots);
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

        if ( Math.abs(lastSlot - current) === 1)
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
    if (!(typeof id == "number")) return undefined;


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

    const minutes = parseInt(time.minutes());
    const hours = parseInt(time.hours());

    if(minutes < 15) {
      time.minutes(0).hour(hours);
    } else if(minutes > 45) {
      time.minutes(0).hours(hours+1);
    } else if(minutes >= 15 && minutes <= 45) {
      time.minutes(30).hours(hours);
    }
    return time.format(this.TIME_FORMAT);
  },
  dateTimeToTimeZoneHour: function(datetime, timezone='Europe/Warsaw') {
    return momentTimezone(datetime).tz(timezone).format(this.TIME_FORMAT)
  }
};
