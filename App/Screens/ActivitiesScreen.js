import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import styles from './placeholderStyles';
import EmployeeAvailabilitySummaryCell from '../Components/EmployeeAvailabilitySummaryCell';

export default class ActivitiesScreen extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.text}>ACTIVITIES</Text>
        <Text style={styles.soon}>soon</Text>
        <EmployeeAvailabilitySummaryCell/>
      </ScrollView>
    )
  }
}
