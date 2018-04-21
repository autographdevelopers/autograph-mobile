const EMPLOYEE = 'Employee'
const STUDENT = 'Student'

export const isEmployee = user =>
  user.type === EMPLOYEE

export const isStudent = user =>
  user.type === STUDENT

export const isDrivingSchoolOwner = drivingSchool =>
  drivingSchool && drivingSchool.privileges && drivingSchool.privileges.is_owner

export const canManageEmployees = drivingSchool =>
  drivingSchool && drivingSchool.privileges && (drivingSchool.privileges.is_owner || drivingSchool.privileges.can_manage_employees)

export const canManageStudents = drivingSchool =>
  drivingSchool && drivingSchool.privileges && (drivingSchool.privileges.is_owner || drivingSchool.privileges.can_manage_students)

export const canModifySchedules = drivingSchool =>
  drivingSchool && drivingSchool.privileges && (drivingSchool.privileges.is_owner || drivingSchool.privileges.can_modify_schedules)
