import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { employeeProfileActionCreators } from '../../Redux/Views/EmployeeProfileRedux';
import { activityActionCreators } from '../../Redux/Entities/ActivityRedux';

import { FETCHING_STATUS } from '../../Lib/utils';
import { ACTIVITY_DISPLAY_TYPE } from '../../Lib/ActivitiesHelper';

import { contextActionCreators } from '../../Redux/Support/ContextRedux';
import { drivingLessonActionCreators } from '../../Redux/Entities/DrivingLessonRedux';

import { canManageEmployees, canManageStudents } from '../../Lib/AuthorizationHelpers';
import listProjectorStyles from '../../Styles/ListProjector';
import { Colors, Fonts } from '../../Themes/';

import DrivingLessonsList from '../../Containers/DrivingLessonsList';
import SectionHeader from '../../Components/SectionHeader';
import ButtonText from '../../Components/ButtonText';
import ActivitiesList from '../../Components/ActivitiesList';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { employeeDailyAgendaActionCreators } from '../../Redux/Views/AgendaRedux';
import moment from 'moment-timezone';
import { AFTER_SAVE_CALLBACKS } from '../../Lib/DrivingLessonHelpers';
import withRequiredData from '../../HOC/withRequiredData';


class Profile extends Component {
  componentWillUnmount = () =>
    this.props.setCurrentEmployee(null);

  isFetching = (drivingLessonsStatus, activitiesStatus) =>
    drivingLessonsStatus === FETCHING_STATUS.FETCHING || activitiesStatus === FETCHING_STATUS.FETCHING

  goToCalendar = () => {
    const { employee } = this.props;

    this.props.initDailyAgenda({
      daySelected: moment.tz('Poland').format('YYYY-MM-DD'),
      cacheHistory: [],
      employeeId: employee.id
    });

    this.props.navigation.navigate('employeeDailyAgenda', { employee })
  };

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
                customTextStyle={{ fontSize: Fonts.size.small }}
                onPress={this.goToCalendar}
                icon={<Icon name={'edit'} size={16} color={Colors.primaryWarm} />}
              >
                Zobacz Kalendarz
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
  employeeId: state.support.context.currentEmployeeID,
  employee: state.entities.employees.active[state.support.context.currentEmployeeID],
  drivingLessons: state.entities.drivingLessons,
  drivingSchool: state.entities.drivingSchools.hashMap[state.support.context.currentDrivingSchoolID],
  activities: state.entities.activities,
  status: state.views.employeeProfileScreen.status
});

const mapDispatchToProps = (dispatch, otherProps )=> {
  const { user: { id } } = otherProps.navigation.state.params;

  const activitiesPayload = {
    related_user_id: id
  };

  const drivingLessonsPayload = {
    employee_id: id,
    upcoming: true,
    active: true
  };

  const payloads = {
    activitiesPayload,
    drivingLessonsPayload
  };

  return {
    requestDataForView: () => dispatch(
      employeeProfileActionCreators.requestDataForView({payloads})),
    setCurrentEmployee: id => dispatch(
      contextActionCreators.setCurrentEmployee(id)),
    fetchActivities: (params) => dispatch(
      activityActionCreators.indexRequest(params,
        ACTIVITY_DISPLAY_TYPE.USER_ACTIVITIES_FEED)),
    fetchDrivingLessons: (params) => dispatch(
      drivingLessonActionCreators.indexRequest(params,
        AFTER_SAVE_CALLBACKS.OVERRIDE_ID)),
    initDailyAgenda: (stateToMerge) => dispatch(
      employeeDailyAgendaActionCreators.init(stateToMerge)),
  }
};

const withAsyncLoading = withRequiredData(
  Profile,
  'status',
  'requestDataForView',
);

export default connect(mapStateToProps, mapDispatchToProps)(withAsyncLoading)
