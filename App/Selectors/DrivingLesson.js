import { DRIVING_LESSON_STATUSES } from '../Lib/DrivingLessonHelpers';
import moment from 'moment/moment';

export const getUpcomingDrivingLessons = state => {
  const { drivingLessons } = state.entities;

  return drivingLessons.allIDs
                       .map(id => drivingLessons.hashMap[id])
                       .filter(drivingLesson => {
                         DRIVING_LESSON_STATUSES.ACTIVE === drivingLesson.status
                         && moment().isBefore(drivingLesson.start_time)
                       });
};
