import { ACTIVITY_DISPLAY_TYPE } from '../Lib/ActivitiesHelper';

export const getActionsPayloadsForSaga = state => {
  const employeeId = state.support.context.currentEmployeeID;

  const activitiesPayload = {
    params: {
      related_user_id: employeeId,
    },
    activityDisplayType: ACTIVITY_DISPLAY_TYPE.USER_ACTIVITIES_FEED,
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
