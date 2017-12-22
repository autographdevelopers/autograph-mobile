import React, { Component } from 'react';
import { Text, ScrollView, ActivityIndicator } from 'react-native';
import styles from './placeholderStyles';
import { connect } from 'react-redux';
import { Colors } from '../Themes';
import {drivingSchoolActionCreators} from '../Redux/DrivingSchoolRedux';
import ButtonPrimary from '../Components/ButtonPrimary';

class StartScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.fetchSchoolsRequest();
  }

  render() {
    const {status, drivingSchools} = this.props;
    return (
      <ScrollView style={{paddingTop: 250}}>
        { status === 'FETCHING' ? <ActivityIndicator size={'large'} color={Colors.primaryWarm} /> :
          <ButtonPrimary onPress={()=> this.props.navigation.navigate('newDrivingSchool')}>NEW DRIVING SCHOOL</ButtonPrimary>}
      </ScrollView>
    )
  }
}

const mapStateToProps = ({ drivingSchools, context: currentDrivingSchoolID }) =>
  ({ currentDrivingSchoolID, drivingSchools, status: drivingSchools.status });

const mapDispatchToProps = dispatch => ({
  fetchSchoolsRequest: () => dispatch(drivingSchoolActionCreators.fetchDrivingSchoolsRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(StartScreen);
