import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import SearchableList from './SearchableList';
import ActiveEmployeeCell from './ActiveEmployeeCell';
import ListHeaderSmall from '../Components/ListHeaderSmall';

const EmployeesSearchableList = props => {
  const handlePress = () => {
    const callback = props.navigation.state.params.onResultPress || props.onResultPress;
    callback && callback();
  };

  return (
    <SearchableList
      data={props.employees}
      renderSectionHeader={({section}) => <ListHeaderSmall label={section.title}/>}
      renderItem={({item, index}) => <ActiveEmployeeCell employee={item} index={index} onPress={handlePress}/>}
    />
  )
};

const mapStateToProps = state => ({
  employees: Object.values(state.employees.active)
});

export default connect(mapStateToProps)(EmployeesSearchableList);
