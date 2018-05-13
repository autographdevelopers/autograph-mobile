/** == Built-in modules ================================ */
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
/** == Constants ======================================= */
import { ACTIVITY_DISPLAY_TYPE } from '../../Lib/ActivitiesHelper';
import { AFTER_SAVE_CALLBACKS } from '../../Lib/DrivingLessonHelpers';
import {
  canManageEmployees,
  canManageStudents,
} from '../../Lib/AuthorizationHelpers';
/** == Action Creators ================================= */
import { employeeProfileActionCreators } from '../../Redux/Views/EmployeeProfileRedux';
import { employeeDailyAgendaActionCreators } from '../../Redux/Views/AgendaRedux';
import { activityActionCreators } from '../../Redux/Entities/ActivityRedux';
import { contextActionCreators } from '../../Redux/Support/ContextRedux';
import { drivingLessonActionCreators } from '../../Redux/Entities/DrivingLessonRedux';
/** == Components ====================================== */
import DrivingLessonsList from '../../Containers/DrivingLessonsList';
import SectionHeader from '../../Components/SectionHeader';
import ButtonText from '../../Components/ButtonText';
import ActivitiesList from '../../Components/ActivitiesList';
/** == Selectors ======================================= */
import { getActionsPayloadsForSaga } from '../../Selectors/EmployeeProfile';
import { getCurrentDrivingSchool } from '../../Selectors/DrivingSchool';
import { getCurrentEmployee } from '../../Selectors/Employees';
import { getEmployeeUpcomingLessons } from '../../Selectors/DrivingLesson';
/** == HOCs ======================================= */
import withRequiredData from '../../HOC/withRequiredData';
/** == Utils =========================================== */
import listProjectorStyles from '../../Styles/ListProjector';
import { Colors, Fonts } from '../../Themes/';


class Profile extends Component {
  goToCalendar = () => {
    const {
      employee,
      navigation: { navigate },
      initDailyAgenda
    } = this.props;

    initDailyAgenda({
      daySelected: moment.tz('Poland').format('YYYY-MM-DD'),
      cacheHistory: [],
      employeeId: employee.id,
    });

    navigate('employeeDailyAgenda', { employee });
  };

  render() {
    const {
      lessons,
      activities,
      drivingSchool
    } = this.props;

    return (
      <View style={{ flex: 1 }}>
          <ScrollView style={styles.container}>
            <View style={styles.headerWithBtn}>
              <SectionHeader title={'Nadchodzące jazdy'} />
              { canManageEmployees(drivingSchool) &&
                  <ButtonText
                    customTextStyle={{ fontSize: Fonts.size.small }}
                    onPress={this.goToCalendar}
                    icon={ <Icon name={'edit'} size={16}
                                color={Colors.primaryWarm}/>}
                  >
                    Zobacz Kalendarz
                  </ButtonText>
              }

            </View>
            <View style={[listProjectorStyles.containerStyle]}>
              <DrivingLessonsList
                drivingLessons={lessons}
                userContext={'student'}
                scrollEnabled={false}/>
            </View>

            { canManageEmployees(drivingSchool) &&
              <View>
                <View style={styles.headerWithBtn}>
                  <SectionHeader title={'Aktywności pracownikiem'} />
                  <ButtonText
                    customTextStyle={{ fontSize: Fonts.size.small }}
                    icon={<Icon name={'edit'} size={16}
                                color={Colors.primaryWarm}/>}>
                    Pokaż wszystkie
                  </ButtonText>
                </View>
                <View
                  style={[listProjectorStyles.containerStyle, { marginTop: 10 }]}>
                  <ActivitiesList
                    activities={activities.userActivitiesFeedIds.map(
                      id => activities.data[id])}
                    fetchingStatus={activities.status}
                    scrollEnabled={false}/>
                </View>
              </View>
            }
          </ScrollView>
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
    marginBottom: 5,
  }
};

const mapStateToProps = state => ( {
  employee: getCurrentEmployee(state),
  lessons: getEmployeeUpcomingLessons(state),
  drivingSchool: getCurrentDrivingSchool(state),
  activities: state.entities.activities,
  status: state.views.employeeProfileScreen.status,
  requestDataParams: getActionsPayloadsForSaga(state),
});

const mapDispatchToProps = dispatch => ({
  requestDataForView: payloads => dispatch(

    employeeProfileActionCreators.requestDataForView({ payloads })
  ),
  cleanupCurrentEmployee: () => dispatch(
    contextActionCreators.setCurrentEmployee()),
  fetchActivities: params => dispatch(
    activityActionCreators.indexRequest(params,
      ACTIVITY_DISPLAY_TYPE.USER_ACTIVITIES_FEED)),
  fetchDrivingLessons: params => dispatch(
    drivingLessonActionCreators.indexRequest(params,
      AFTER_SAVE_CALLBACKS.OVERRIDE_ID)),
  initDailyAgenda: stateToMerge => dispatch(
    employeeDailyAgendaActionCreators.init(stateToMerge)),
});

const withAsyncLoading = withRequiredData(
  Profile,
  'status',
  'requestDataForView',
  'requestDataParams',
  'cleanupCurrentEmployee'
);

export default connect(mapStateToProps, mapDispatchToProps)(withAsyncLoading);
