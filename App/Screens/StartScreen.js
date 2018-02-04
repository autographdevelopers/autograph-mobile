import React, { Component } from 'react';
import { Text, ScrollView, ActivityIndicator } from 'react-native';
import styles from './placeholderStyles';
import { connect } from 'react-redux';
import { Colors } from '../Themes';
import { drivingSchoolActionCreators } from '../Redux/DrivingSchoolRedux';
import ButtonPrimary from '../Components/ButtonPrimary';
import { contextActionCreators } from '../Redux/ContextRedux';

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

  displaySchoolsList = () => {
    const { drivingSchools } = this.props;
    const { hashMap, allIDs } = drivingSchools;
    return allIDs.map((id, index) => (
      <ButtonPrimary onPress={this.navigateToSchoolContext(id)} key={index}>{hashMap[id].name}</ButtonPrimary>
    ));
  };

  navigateToSchoolContext = id => () => {
    this.props.setCurrentSchoolContext(id);
    this.props.navigation.navigate('main');
  };

  navigateToNewDrivingSchoolForm = () => {
    this.props.setCurrentSchoolContext(null);
    this.props.navigation.navigate('newDrivingSchool');
  };

  render() {
    const { status } = this.props;

    return (
      <ScrollView>
        {status === 'FETCHING' ? <ActivityIndicator size={'large'} color={Colors.primaryWarm}/> :
          <ButtonPrimary onPress={this.navigateToNewDrivingSchoolForm}>NEW DRIVING SCHOOL</ButtonPrimary>}
        {this.displaySchoolsList()}
      </ScrollView>
    )
  }
}

const mapStateToProps = ({ drivingSchools }) => ({ drivingSchools });

const mapDispatchToProps = dispatch => ({
  fetchSchoolsRequest: () => dispatch(drivingSchoolActionCreators.indexRequest()),
  setCurrentSchoolContext: id => dispatch(contextActionCreators.setCurrentDrivingSchool(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(StartScreen);
