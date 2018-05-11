import { DRIVING_LESSON_STATUSES } from '../Lib/DrivingLessonHelpers';
import moment from 'moment/moment';

export const getStudentsUpcomingLessons = state => {
  const { drivingLessons } = state.entities;

  return state.views.studentProfileScreen.lessonsIds
                       .map(id => drivingLessons.hashMap[id])
                       .filter(drivingLesson => {
                         return DRIVING_LESSON_STATUSES.ACTIVE === drivingLesson.status
                         && moment().isBefore(drivingLesson.start_time)
                       });
};

export const getEmployeeUpcomingLessons = state => {
  const { drivingLessons } = state.entities;

  return state.views.employeeProfileScreen.lessonsIds.map(id => drivingLessons.hashMap[id])
};
