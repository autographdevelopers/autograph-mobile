import React, { Component } from 'react';
import Layout from '../../Components/Layout';
import { View } from 'react-native';
import SectionHeader from '../../Components/SectionHeader';
import ButtonText from '../../Components/ButtonText';
import { connect } from 'react-redux';
import { contextActionCreators } from '../../Redux/ContextRedux';
import { drivingLessonActionCreators } from '../../Redux/DrivingLessonRedux';
import { canManageEmployees, canManageStudents } from '../../Lib/AuthorizationHelpers';
import listProjectorStyles from '../../Styles/ListProjector';
import DrivingLessonsList from '../../Containers/DrivingLessonsList';
import { Colors, Fonts } from '../../Themes/';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { employeeDailyAgendaActionCreators } from '../../Redux/AgendaRedux';
import moment from 'moment-timezone';
import { AFTER_SAVE_CALLBACKS } from '../../Lib/DrivingLessonHelpers';

class Profile extends Component {
  componentWillMount = () =>
    this.props.fetchDrivingLessons({
      employee_id: this.props.employeeId,
      upcoming: true,
      active: true
    })

  componentWillUnmount = () =>
    this.props.setCurrentEmployee(null);

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
    const  { drivingLessons } = this.props;

    return (
      <Layout>
        <View style={styles.headerWithBtn}>
          <SectionHeader title={'Nadchodzące jazdy'}
                         customTextStyles={styles.headerText}
                         customUnderlineStyles={styles.underline}/>
          {
            canManageEmployees(this.props.drivingSchool) &&
              <ButtonText
                customTextStyle={{ fontSize: Fonts.size.small }}
                onPress={this.goToCalendar}
                icon={<Icon name={'edit'} size={16} color={Colors.primaryWarm}/>}>
                Zobacz Kalendarz
              </ButtonText>
          }

        </View>
        <View style={[listProjectorStyles.containerStyle]}>
          <DrivingLessonsList
            drivingLessons={drivingLessons.allIDs.map(id => drivingLessons.hashMap[id])}
            userContext={'student'}
            fetchingStatus={drivingLessons.status}
            scrollEnabled={false} />
        </View>
      </Layout>

    );
  }
}

const styles = {
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
  employee: state.employees.active[state.context.currentEmployeeID],
  drivingLessons: state.drivingLessons,
  drivingSchool: state.drivingSchools.hashMap[state.context.currentDrivingSchoolID]
});

const mapDispatchToProps = dispatch => ({
  setCurrentEmployee: id => dispatch(contextActionCreators.setCurrentEmployee(id)),
  fetchDrivingLessons: (params) => dispatch(drivingLessonActionCreators.indexRequest(params, AFTER_SAVE_CALLBACKS.OVERRIDE_ID)),
  initDailyAgenda: (stateToMerge) => dispatch(employeeDailyAgendaActionCreators.init(stateToMerge)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
