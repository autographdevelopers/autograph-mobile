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
