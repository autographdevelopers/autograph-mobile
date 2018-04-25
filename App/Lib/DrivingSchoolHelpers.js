export const DRIVING_SCHOOL_STATUS = {
  ACTIVE: 'active',
  PENDING: 'pending'
}

export const DRIVING_SCHOOL_RELATION_STATUS = {
  ACTIVE: 'active',
  PENDING: 'pending'
}

export const isDrivingSchoolRelationActive = school =>
  school.status === DRIVING_SCHOOL_STATUS.ACTIVE && (
    school.relation_status === DRIVING_SCHOOL_RELATION_STATUS.ACTIVE ||
    school.relation_status === DRIVING_SCHOOL_RELATION_STATUS.ACTIVE
  )

export const isDrivingSchoolAwaitingActivation = school =>
  school.status === DRIVING_SCHOOL_STATUS.PENDING &&
  school.relation_status === DRIVING_SCHOOL_RELATION_STATUS.ACTIVE &&
  school.privileges && school.privileges.is_owner === true

export const isDrivingSchoolRelationPending = school =>
  school.status === DRIVING_SCHOOL_STATUS.ACTIVE && (
    school.relation_status === DRIVING_SCHOOL_RELATION_STATUS.PENDING ||
    school.relation_status === DRIVING_SCHOOL_RELATION_STATUS.PENDING
  )

/** @description */
/** While updating entities associated w/ driving school(schedule_settings etc)
 * we need driving_school_id. When we are during creation of new driving school
 * we takes this is from screenProps params passed in step form, when we edit this things
 * directly we take it from navigation params or rely on currentDrivingSchoolId context.
 *  */
export const getSchoolIdOfCurrentContext = props => {
  return (props.screenProps && props.screenProps.drivingSchoolId)
    || (props.navigation.state.params && props.navigation.state.params.id);
};
