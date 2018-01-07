import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import Layout from '../Components/Layout'
import { connect } from 'react-redux';
import { drivingSchoolActionCreators } from '../Redux/DrivingSchoolRedux';

class SettingsScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props)
  }

  render() {
    const { navigation, showDrivingSchool } = this.props;

    return (
      <Layout>
        <ListItem
          title={'Information'}
          subtitle={'Edit basic information about your school.'}
          containerStyle={{ borderBottomWidth: 0 }}
          keyExtractor={(item, index) => index}
          onPress={() => {
            navigation.navigate('editSchoolInfo', { handleSubmitSuccess: ()=>{}} )
            showDrivingSchool();
          }}
        />

        <ListItem
          title={'Schedule Bounadries'}
          subtitle={'Edit schedule boundaries'}
          containerStyle={{ borderBottomWidth: 0 }}
          keyExtractor={(item, index) => index}
          onPress={() => {
          }}
        />

        <ListItem
          title={`Calendar`}
          subtitle={'Edit calendar settings'}
          containerStyle={{ borderBottomWidth: 0 }}
          keyExtractor={(item, index) => index}
          onPress={() => {
          }}
        />
      </Layout>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  showDrivingSchool: () => dispatch(drivingSchoolActionCreators.showDrivingSchoolRequest())
});

export default connect(null, mapDispatchToProps)(SettingsScreen)
