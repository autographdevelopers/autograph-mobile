import { createSelector } from 'reselect';
import  * as helpers from '../Lib/DrivingSchoolHelpers';
import { isDrivingSchoolRelationPending } from '../Lib/DrivingSchoolHelpers';
import { isDrivingSchoolAwaitingActivation } from '../Lib/DrivingSchoolHelpers';

const getCurrentDrivingSchoolId = state => state.support.context.currentDrivingSchoolID;
const getDrivingSchools = state => state.entities.drivingSchools.hashMap;

export const getCurrentDrivingSchool = createSelector(
  [getCurrentDrivingSchoolId, getDrivingSchools],
  (id, schools ) => schools[id]
);

export const getActiveDrivingSchools = state => {
  const { hashMap } = getDrivingSchools(state);

  return Object.values(hashMap)
               .filter(helpers.isDrivingSchoolRelationActive)
};


export const getInvitingDrivingSchools = state => {
  const { hashMap } = getDrivingSchools(state);

  return Object.values(hashMap)
        .filter(helpers.isDrivingSchoolRelationPending)
};

export const getAwaitingActivationDrivingSchools = state => {
  const { hashMap } = getDrivingSchools(state);

  return Object.values(hashMap)
        .filter(helpers.isDrivingSchoolAwaitingActivation)
};
