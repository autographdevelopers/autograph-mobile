import React, { Component } from 'react';
import { Text, ScrollView, TouchableOpacity } from 'react-native';
import styles from './placeholderStyles';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import EmployeesSearchableList from '../Components/EmployeesSearchableList';

export default class CalendarScreen extends Component {
  render() {
    return (
      <TouchableOpacity onPress={()=>this.props.navigation.navigate('searchEmployee', {onResultPress: () => this.props.navigation.goBack(null)})}>
        <Text>Find Employee</Text>
      </TouchableOpacity>
    )
  }
}
