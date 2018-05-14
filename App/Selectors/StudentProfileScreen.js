
export const getActionsPayloadsForSaga = state => {
  const studentId = state.support.context.currentStudentID;
  const activitiesPayload = {
    params: {
      related_user_id: studentId
    }
  };
  const drivingLessonsPayload = {
    params: {
      student_id: studentId
    }
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
