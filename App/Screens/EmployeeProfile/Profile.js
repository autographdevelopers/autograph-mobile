/** == Built-in modules ================================ */
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
import {
  canManageEmployees,
} from '../../Lib/AuthorizationHelpers';
/** == Action Creators ================================= */
import { employeeProfileActionCreators } from '../../Redux/Views/EmployeeProfileRedux';
import { employeeDailyAgendaActionCreators } from '../../Redux/Views/AgendaRedux';
import { contextActionCreators } from '../../Redux/Support/ContextRedux';
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
import { getEmployeeProfileActivities } from '../../Selectors/Activities';
/** == HOCs ======================================= */
import withRequiredData from '../../HOC/withRequiredData';
/** == Utils =========================================== */
import listProjectorStyles from '../../Styles/ListProjector';
import { Colors, Fonts } from '../../Themes/';


const VISIBLE_ACTIVITIES_NO = 3;

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
      drivingSchool,
      employee,
      navigation: { navigate }
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
                  <SectionHeader title={'Ostatnie aktywności'} />
                  <ButtonText
                    onPress={() => navigate('activitiesFullList', { activitiesParams: { related_user_id: employee.id } })}
                    customTextStyle={{ fontSize: Fonts.size.small }}
                    icon={<Icon name={'edit'} size={16}
                                color={Colors.primaryWarm}/>}>
                    Pokaż wszystkie
                  </ButtonText>
                </View>
                <View
                  style={[listProjectorStyles.containerStyle, { marginTop: 10 }]}>
                  <ActivitiesList activities={activities.slice(0, VISIBLE_ACTIVITIES_NO)} />
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

const mapStateToProps = state => ({
  employee: getCurrentEmployee(state),
  lessons: getEmployeeUpcomingLessons(state),
  drivingSchool: getCurrentDrivingSchool(state),
  activities: getEmployeeProfileActivities(state),
  status: state.views.employeeProfileScreen.status,
  requestDataParams: getActionsPayloadsForSaga(state),
});

const mapDispatchToProps = dispatch => ({
  requestDataForView: payloads => dispatch(employeeProfileActionCreators.requestDataForView({ payloads })),
  cleanupCurrentEmployee: () => dispatch(contextActionCreators.setCurrentEmployee()),
  initDailyAgenda: stateToMerge => dispatch(employeeDailyAgendaActionCreators.init(stateToMerge)),
});

const withAsyncLoading = withRequiredData(
  Profile,
  'status',
  'requestDataForView',
  'requestDataParams',
  'cleanupCurrentEmployee'
);

export default connect(mapStateToProps, mapDispatchToProps)(withAsyncLoading);
