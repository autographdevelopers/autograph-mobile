import { ACTIVITY_DISPLAY_TYPE } from '../Lib/ActivitiesHelper';

export const getActionsPayloadsForSaga = state => {
  const studentId = state.support.context.currentStudentID;
  const activitiesPayload = {
    params: {
      related_user_id: studentId
    },
    activityDisplayType: ACTIVITY_DISPLAY_TYPE.USER_ACTIVITIES_FEED
  };
  const drivingLessonsPayload = {
    student_id: studentId
  };

  const drivingCoursePayload = {
    studentId
  };

  return {
    activitiesPayload,
    drivingLessonsPayload,
    drivingCoursePayload
  }
};
