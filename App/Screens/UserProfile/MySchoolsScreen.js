import React, { Component } from 'react';
import { StyleSheet, Text, FlatList, View, ScrollView, ActivityIndicator } from 'react-native';
import { List, ListItem, Avatar } from 'react-native-elements';
import ProfileHeader from '../../Components/ProfileHeader'
import NavHeader from '../../Components/NavHeader'
import { Fonts, Colors } from '../../Themes/index';
import { connect } from 'react-redux';
import { drivingSchoolActionCreators } from '../../Redux/DrivingSchoolRedux';
import { contextActionCreators } from '../../Redux/ContextRedux';
import DrivingSchoolCell from '../../Components/DrivingSchoolCell'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ButtonPrimary from '../../Components/ButtonPrimary';


class MySchoolsScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchSchoolsRequest();
  }

  navigateToNewDrivingSchoolForm = () => {
    this.props.setCurrentSchoolContext(null);
    this.props.navigation.navigate('newDrivingSchool');
  }

  render() {
    const { drivingSchools } = this.props;
    const { status } = drivingSchools;

    return (
      <View style={{flex: 1}}>
        <ProfileHeader />
        <View style={styles.listContainer}>
          <Text style={styles.listHeader}>
            Moje szkoły
          </Text>
          <View style={styles.underline}/>
          {status === 'FETCHING' ? <ActivityIndicator size={'large'} color={Colors.primaryWarm}/> : null}
          <List containerStyle={{ borderBottomWidth: 0, borderTopWidth: 0, marginTop: 0}}>
            <FlatList
              data={
                Object.values(drivingSchools.hashMap).filter((value) => {
                  return value.employee_driving_school_status === 'active' && (value.status == 'active' || value.status == 'pending' && value.privilege_set.is_owner === true)
                })
              }
              renderItem={({ item }) => <DrivingSchoolCell drivingSchool={item}/>}
              keyExtractor={(e, i) => i}
            />
          </List>
          <ButtonPrimary onPress={this.navigateToNewDrivingSchoolForm}>Dodaj szkołę</ButtonPrimary>
          <Text style={styles.listHeader}>
            Zaproszenia do współpracy
          </Text>
          <View style={styles.underline}/>
          {status === 'FETCHING' ? <ActivityIndicator size={'large'} color={Colors.primaryWarm}/> : null}
          <List containerStyle={{ borderBottomWidth: 0, borderTopWidth: 0, marginTop: 0}}>
            <FlatList
              data={
                Object.values(drivingSchools.hashMap).filter((value) => {
                  return (value.employee_driving_school_status === 'pending' && value.status == 'active')
                })
              }
              renderItem={({ item }) => <DrivingSchoolCell drivingSchool={item}/>}
              keyExtractor={(e, i) => i}
            />
          </List>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    marginHorizontal: 15
  },
  listHeader: {
    fontSize: 20,
    color: 'gray'
  },
  underline: {
    marginTop: 8,
    width: '15%',
    borderColor: Colors.primaryWarm,
    borderWidth: 2,
    borderRadius: 10
  }
});

const mapStateToProps = ({ drivingSchools }) => ({ drivingSchools });

const mapDispatchToProps = dispatch => ({
  fetchSchoolsRequest: () => dispatch(drivingSchoolActionCreators.fetchDrivingSchoolsRequest()),
  setCurrentSchoolContext: id => dispatch(contextActionCreators.setCurrentDrivingSchool(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(MySchoolsScreen);
