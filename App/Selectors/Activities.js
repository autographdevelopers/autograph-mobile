const toObject = state => id => state.entities.activities.data[id];

export const getMyActivites = state =>
  state.views.myActivitiesScreen.ids.map(toObject(state));

export const getEmployeeProfileActivities = state =>
  state.views.employeeProfileScreen.activitiesIds.map(toObject(state));

export const getStudentProfileActivities = state =>
  state.views.studentProfileScreen.activitiesIds.map(toObject(state));
