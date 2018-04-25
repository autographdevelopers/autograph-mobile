import moment from 'moment/moment';
import _ from 'lodash';

export const DRIVING_LESSON_STATUSES = {
  ACTIVE: 'active',
  CANCELED: 'canceled',
  ALL: 'all',
};

export const AFTER_SAVE_CALLBACKS = {
  APPEND_ID: 'ADD_ID',
  SUBTRACT_ID: 'SUBTRACT_ID',
  OVERRIDE_ID: 'OVERRIDE_ID'
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
