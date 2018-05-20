import { createSelector } from 'reselect';
import  * as helpers from '../Lib/DrivingSchoolHelpers';

const getCurrentDrivingSchoolId = state => state.support.context.currentDrivingSchoolID;
const getDrivingSchools = state => state.entities.drivingSchools.hashMap;
const getDrivingSchoolsArray = state => Object.values(getDrivingSchools(state));

export const getCurrentDrivingSchool = createSelector(
  [getCurrentDrivingSchoolId, getDrivingSchools],
  (id, schools ) => schools[id]
);

export const getActiveDrivingSchools = state => {
  return getDrivingSchoolsArray(state)
               .filter(helpers.isDrivingSchoolRelationActive)
};


export const getInvitingDrivingSchools = state => {
  return getDrivingSchoolsArray(state)
        .filter(helpers.isDrivingSchoolRelationPending)
};

export const getAwaitingActivationDrivingSchools = state => {
  return getDrivingSchoolsArray(state)
        .filter(helpers.isDrivingSchoolAwaitingActivation)
};
