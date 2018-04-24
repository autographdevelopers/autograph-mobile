import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux';

import { contextActionCreators } from '../../Redux/ContextRedux';
import { drivingLessonActionCreators } from '../../Redux/DrivingLessonRedux';
import { modalActionCreators, MODALS_IDS } from '../../Redux/ModalRedux';
import { drivingCourseActionCreators } from '../../Redux/DrivingCourseRedux';
import { activityActionCreators } from '../../Redux/ActivityRedux';

import { FETCHING_STATUS } from '../../Lib/utils';
import { ACTIVITY_DISPLAY_TYPE } from '../../Lib/ActivitiesHelper';
import { canManageEmployees, canManageStudents } from '../../Lib/AuthorizationHelpers';
import listProjectorStyles from '../../Styles/ListProjector';
import { Colors, Fonts } from '../../Themes/';

import DrivingLessonsList from '../../Containers/DrivingLessonsList';
import Layout from '../../Components/Layout';
import SectionHeader from '../../Components/SectionHeader';
import ButtonText from '../../Components/ButtonText';
import ActivitiesList from '../../Components/ActivitiesList';

class Profile extends Component {

  componentWillMount = () => {
    const { employeeId } = this.props;
    this.props.fetchDrivingLessons({ employee_id: employeeId, upcoming: true, active: true })
    this.props.fetchActivities({related_user_id: employeeId})
  }

  componentWillUnmount = () =>
    this.props.setCurrentEmployee(null);

  isFetching = (drivingLessonsStatus, activitiesStatus) =>
    drivingLessonsStatus === FETCHING_STATUS.FETCHING || activitiesStatus === FETCHING_STATUS.FETCHING

  render() {
    const  { drivingLessons, activities } = this.props;

    return (
      <View style={{flex: 1}}>
        {this.isFetching(drivingLessons.status, activities.status) ? <SpinnerView/> :
          <ScrollView style={styles.container}>
            <View style={styles.headerWithBtn}>
              <SectionHeader title={'Nadchodzące jazdy'}
                             customTextStyles={styles.headerText}
                             customUnderlineStyles={styles.underline}/>
              {canManageEmployees(this.props.drivingSchool) &&
              <ButtonText
                customTextStyle={{fontSize: Fonts.size.small}}
                icon={<Icon name={'edit'} size={16} color={Colors.primaryWarm}/>}>
                Przejdź do kalendarza
              </ButtonText>
              }

            </View>
            <View style={[listProjectorStyles.containerStyle]}>
              <DrivingLessonsList
                drivingLessons={drivingLessons.allIDs.map(id => drivingLessons.hashMap[id])}
                userContext={'student'}
                fetchingStatus={drivingLessons.status}
                scrollEnabled={false}/>
            </View>

            {canManageEmployees(this.props.drivingSchool) &&
            <View>
              <View style={styles.headerWithBtn}>
                <SectionHeader title={'Aktywności pracownikiem'}
                               customTextStyles={styles.headerText}
                               customUnderlineStyles={styles.underline}/>
                <ButtonText
                  customTextStyle={{fontSize: Fonts.size.small}}
                  icon={<Icon name={'edit'} size={16} color={Colors.primaryWarm}/>}>
                  Pokaż wszystkie
                </ButtonText>
              </View>
              <View style={[listProjectorStyles.containerStyle, { marginTop: 10 }]}>
                <ActivitiesList
                  activities={activities.userActivitiesFeedIds.map(id => activities.data[id])}
                  fetchingStatus={activities.status}
                  scrollEnabled={false}/>
              </View>
            </View>
            }
          </ScrollView>
        }
      </View>
    );
  }
}

const styles = {
  container: {
    padding: 15,
  },
  headerWithBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.snow,
    alignItems: 'center',
    marginBottom: 5
  },
  headerText: {
    fontSize: Fonts.size.medium,
    color: Colors.strongGrey,
    fontWeight: '400'
  },
  underline: {
    marginTop: 3,
    width: 30,
    borderColor: Colors.primaryWarm,
    borderWidth: 1,
  }
}

const mapStateToProps = state => ({
  employeeId: state.context.currentEmployeeID,
  drivingLessons: state.drivingLessons,
  drivingSchool: state.drivingSchools.hashMap[state.context.currentDrivingSchoolID],
  activities: state.activities
});

const mapDispatchToProps = dispatch => ({
  setCurrentEmployee: id => dispatch(contextActionCreators.setCurrentEmployee(id)),
  fetchDrivingLessons: (params) => dispatch(drivingLessonActionCreators.indexRequest(params)),
  fetchActivities: (params) =>
    dispatch(activityActionCreators.indexRequest(params, ACTIVITY_DISPLAY_TYPE.USER_ACTIVITIES_FEED))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
