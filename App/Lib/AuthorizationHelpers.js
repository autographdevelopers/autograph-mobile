const EMPLOYEE = 'Employee'
const STUDENT = 'Student'

export const isEmployee = user =>
  user.type === EMPLOYEE

export const isStudent = user =>
  user.type === STUDENT

export const isDrivingSchoolOwner = drivingSchool =>
  drivingSchool.privilege_set && drivingSchool.privilege_set.is_owner
