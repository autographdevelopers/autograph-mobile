import { createSelector } from 'reselect';

const getCurrentDrivingSchoolId = state => state.support.context.currentDrivingSchoolID;
const getDrivingSchools = state => state.entities.drivingSchools;

export const getCurrentDrivingSchool = createSelector(
  [getCurrentDrivingSchoolId, getDrivingSchools],
  (id, schools ) => schools.hashMap[id]
);
