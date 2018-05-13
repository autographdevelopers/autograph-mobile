import { DRIVING_LESSON_STATUSES } from '../Lib/DrivingLessonHelpers';
import moment from 'moment/moment';

const upcomingLessons = lesson =>
  DRIVING_LESSON_STATUSES.ACTIVE === lesson.status
    && moment().isBefore(lesson.start_time);

const toLessonObject = state => id => state.entities.drivingLessons.hashMap[id];

export const getStudentsUpcomingLessons = state =>
  state.views.studentProfileScreen.lessonsIds
       .map(toLessonObject(state))
       .filter(upcomingLessons);

export const getEmployeeUpcomingLessons = state =>
  state.views.employeeProfileScreen.lessonsIds
       .map(toLessonObject(state))
       .filter(upcomingLessons);
