import React, { Component } from 'react';
import DefaultAvatar from './DefaultAvatar';
import { ListItem } from 'react-native-elements';
import EmployeeRolesSubtitle from './EmployeeRolesSubtitle';

export default ActiveEmployeeCell = ({employee, index, onPress=()=>{}}) => (
  <ListItem
    title={`${employee.name} ${employee.surname}`}
    subtitle={<EmployeeRolesSubtitle employeePrivileges={employee.privileges}/>}
    leftIcon={<DefaultAvatar name={employee.name} index={index}/>}
    containerStyle={{ borderBottomWidth: 0 }}
    onPress={onPress}
  />
)
