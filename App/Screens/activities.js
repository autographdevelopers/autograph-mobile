import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';

export default class ActivitiesScreen extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <ScrollView>
        <Text>Activities</Text>
      </ScrollView>
    )
  }
}
