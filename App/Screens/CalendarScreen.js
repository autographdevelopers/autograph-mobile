import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import styles from './placeholderStyles';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import EmployeesSearchableList from '../Components/EmployeesSearchableList';

export default class CalendarScreen extends Component {
  render() {
    return (
      <EmployeesSearchableList/>
    )
  }
}
