import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import Layout from '../Components/Layout'
import { connect } from 'react-redux';
import { drivingSchoolActionCreators } from '../Redux/DrivingSchoolRedux';
import { scheduleSettingsActionCreators } from '../Redux/ScheduleSettingsRedux';
import { scheduleBoundariesActionCreators } from '../Redux/ScheduleBoundariesRedux';

class SettingsScreen extends Component {
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
          onPress={() => {
            showDrivingSchool();
            navigation.navigate('editSchoolInfo', {
              handleSubmitSuccess: () => {
              }
            })
          }}
        />

        <ListItem
          title={'Schedule Bounadries'}
          subtitle={'Edit schedule boundaries'}
          containerStyle={{ borderBottomWidth: 0 }}
          keyExtractor={(item, index) => index}
          onPress={() => {
            showScheduleBoundaries();
            navigation.navigate('editScheduleBoundaries', {
              handleSubmitSuccess: () => {
              }
            })
          }}
        />

        <ListItem
          title={`Calendar`}
          subtitle={'Edit calendar settings'}
          containerStyle={{ borderBottomWidth: 0 }}
          keyExtractor={(item, index) => index}
          onPress={() => {
            showScheduleSettings();
            navigation.navigate('editScheduleSettings', {
              handleSubmitSuccess: () => {
              }
            })
          }}
        />
      </Layout>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  showDrivingSchool: () => dispatch(drivingSchoolActionCreators.showDrivingSchoolRequest()),
  showScheduleSettings: () => dispatch(scheduleSettingsActionCreators.showRequest()),
  showScheduleBoundaries: () => dispatch(scheduleBoundariesActionCreators.showRequest())
});

export default connect(null, mapDispatchToProps)(SettingsScreen)
