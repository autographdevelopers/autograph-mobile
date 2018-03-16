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
