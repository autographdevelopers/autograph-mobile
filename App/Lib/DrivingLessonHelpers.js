import moment from 'moment/moment';
import _ from 'lodash';

export const DRIVING_LESSON_STATUSES = {
  ACTIVE: 'active',
  CANCELED: 'canceled',
  ALL: 'all',
};

export const drivingLessonHelpers = {
  getEndTime: lesson => {
    if (lesson.slots.length === 0) return '';
    const sorted = lesson.slots
                         .sort((left, right) =>
                           moment(left.start_time).diff(moment(right.start_time)));

    return moment(_.last(sorted).start_time).add(30, 'minutes').format('HH:mm');
  }
};
