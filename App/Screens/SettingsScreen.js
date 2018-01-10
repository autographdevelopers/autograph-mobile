import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import Layout from '../Components/Layout'

export default class SettingsScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props)
  }

  render() {
    const { navigation, showDrivingSchool, showScheduleSettings, showScheduleBoundaries } = this.props;

    return (
      <Layout>
        <ListItem
          title={'Information'}
          subtitle={'Edit basic information about your school.'}
          containerStyle={{ borderBottomWidth: 0 }}
          keyExtractor={(item, index) => index}
          onPress={() => {navigation.navigate('editSchoolInfo', { handleSubmitSuccess: () => {} }) }}
        />

        <ListItem
          title={'Schedule Bounadries'}
          subtitle={'Edit schedule boundaries'}
          containerStyle={{ borderBottomWidth: 0 }}
          keyExtractor={(item, index) => index}
          onPress={() => {navigation.navigate('editScheduleBoundaries', { handleSubmitSuccess: () => {} })}}
        />

        <ListItem
          title={`Calendar`}
          subtitle={'Edit calendar settings'}
          containerStyle={{ borderBottomWidth: 0 }}
          keyExtractor={(item, index) => index}
          onPress={() => {navigation.navigate('editScheduleSettings', { handleSubmitSuccess: () => {} })}}
        />
      </Layout>
    )
  }
}
