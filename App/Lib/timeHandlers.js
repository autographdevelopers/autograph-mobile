import moment from 'moment-timezone';
import _ from 'lodash';

export const timeHelpers = {
  getWeekRange: (date, timeZone) => {
    const referenceDay = moment.tz(date, timeZone);

    const from = referenceDay.startOf('week').format();
    const to = referenceDay.endOf('week').format();

    return {
      by_start_time: { from, to }
    };
  },

  getTimzeZoneDate: (timeZone, date) => {
    return moment(date).tz(timeZone)
  },

  isCacheStale: (date, cacheHistory, timeZone) => {
    let isStale = true;

    _.each(cacheHistory, (frame) => {
      if( moment.tz(timeZone).isBefore(frame.expireAt) && moment.tz(date, timeZone).isBetween(frame.dataFrom, frame.dataTo, 'seconds', '[]')) {
        isStale = false;
      }
    });

    return isStale;
  }
};
