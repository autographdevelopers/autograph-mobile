import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Fonts, Colors } from '../Themes/'
import I18n from '../I18n/index'

export default EmployeeRolesSubtitle = ({ employeePrivileges }) => {

  let employeeRolesTexts = []

  if(employeePrivileges.is_owner) employeeRolesTexts.push(I18n.t('owner'));
  if(employeePrivileges.is_driving) employeeRolesTexts.push(I18n.t('instructor'));
  if(employeePrivileges.can_manage_employees || employeePrivileges.can_manage_students || employeePrivileges.can_modify_schedules)
    employeeRolesTexts.push(I18n.t('office_employee'));
  if(employeeRolesTexts.length === 0) employeeRolesTexts.push(I18n.t('lack_of_privileges'));

  const rolesList = employeeRolesTexts.map((role, i) => {
    return(
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.roleText}>{role.toUpperCase()}</Text>
        { i !== (employeeRolesTexts.length-1) && <View style={styles.dot}/>}
      </View>
    )
  })

  return (
    <View style={styles.subtitleView}>
      {rolesList}
    </View>
  )
}

const styles = StyleSheet.create({
  subtitleView: {
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    height: 5,
    width: 5,
    borderRadius: 3,
    backgroundColor: Colors.strongGrey,
    marginHorizontal: 5
  },
  roleText: {
    color: Colors.strongGrey,
    fontSize: 11,
    fontWeight: '500'
  }
})
