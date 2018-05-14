
export const getActionsPayloadsForSaga = state => {
  const employeeId = state.support.context.currentEmployeeID;

  const activitiesPayload = {
    params: {
      related_user_id: employeeId,
    }
  };

  const drivingLessonsPayload = {
    params: {
      employee_id: employeeId,
      upcoming: true,
      active: true,
    }
  };

  return {
    activitiesPayload,
    drivingLessonsPayload,
  };
};
