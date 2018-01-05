import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import styles from './placeholderStyles';

export default class ActivitiesScreen extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.text}>ACTIVITIES</Text>
        <Text style={styles.soon}>soon</Text>
      </ScrollView>
    )
  }
}
