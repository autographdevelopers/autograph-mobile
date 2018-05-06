import moment from 'moment-timezone';
import _ from 'lodash';

export const timeHelpers = {
  getWeekRange: (date, timeZone) => {
    const referenceDay = moment.tz(date, timeZone);
    // isoWeek starts on Monday in opposite to week which start on Sunday
    const from = referenceDay.startOf('isoWeek').format();
    const to = referenceDay.endOf('isoWeek').format();

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
