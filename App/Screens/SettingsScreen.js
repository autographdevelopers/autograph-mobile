import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import styles from './placeholderStyles';

export default class SettingsScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.text}>SETTINGS SCREEN</Text>
        <Text style={styles.soon}>soon</Text>
      </ScrollView>
    )
  }
}
