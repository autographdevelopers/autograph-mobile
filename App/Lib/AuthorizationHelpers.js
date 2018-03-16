const EMPLOYEE = 'Employee'
const STUDENT = 'Student'

export const isEmployee = user =>
  user.type === EMPLOYEE

export const isStudent = user =>
  user.type === STUDENT

export const isDrivingSchoolOwner = drivingSchool =>
  drivingSchool.privilege_set && drivingSchool.privilege_set.is_owner

export const canManageEmployees = drivingSchool =>
  drivingSchool.privilege_set && (drivingSchool.privilege_set.is_owner || drivingSchool.privilege_set.can_manage_employees)

export const canManageStudents = drivingSchool =>
  drivingSchool.privilege_set && (drivingSchool.privilege_set.is_owner || drivingSchool.privilege_set.can_manage_students)
