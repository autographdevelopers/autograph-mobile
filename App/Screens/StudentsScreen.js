import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import styles from './placeholderStyles';

export default class StudentsScreen extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.text}>STUDENTS MANAGEMENT</Text>
        <Text style={styles.soon}>soon</Text>
      </ScrollView>
    )
  }
}
