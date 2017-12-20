import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import styles from './placeholderStyles';

export default class CalendarScreen extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.text}>CALENDAR</Text>
        <Text style={styles.soon}>soon</Text>
      </ScrollView>
    )
  }
}
