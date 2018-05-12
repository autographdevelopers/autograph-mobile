import { DRIVING_LESSON_STATUSES } from '../Lib/DrivingLessonHelpers';
import moment from 'moment/moment';

export const getStudentsDashboardRequestParams = state => {
  const coursePayload =  { studentId: state.access.currentUser.id };
  const lessonsPayload = { params: { student_id: state.access.currentUser }};

  return {
    coursePayload,
    lessonsPayload
  }
};

export const getUpcomingDrivingLessons = state => {
  const { drivingLessons } = state.entities;

  return state.views.studentDashboardScreen.lessonsIds
              .map(id => drivingLessons.hashMap[id])
              .filter(drivingLesson =>
                (DRIVING_LESSON_STATUSES.ACTIVE === drivingLesson.status
                  && moment().isBefore(drivingLesson.start_time))
  )
};

