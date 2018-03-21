import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import SearchableList from './SearchableList';
import ActiveEmployeeCell from './ActiveEmployeeCell';
import ListHeaderSmall from '../Components/ListHeaderSmall';

const EmployeesSearchableList = props => {
  return (
    <SearchableList
      data={props.employees}
      renderSectionHeader={({section}) => <ListHeaderSmall label={section.title}/>}
      renderItem={({item, index}) => <ActiveEmployeeCell employee={item} index={index}/>}
    />
  )
};

const mapStateToProps = state => ({
  employees: Object.values(state.employees.active)
});

export default connect(mapStateToProps)(EmployeesSearchableList);
