/** == Built-in modules ================================ */
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
/** == Custom modules ================================ */
import EmployeeAvailabilitySummaryCell from '../Components/EmployeeAvailabilitySummaryCell';
import AgendaWrapper from './AgendaWrapper';
import InfoBox from '../Components/InfoBox';
import withRequiredData from '../HOC/withRequiredData';
/** == Action Creators ================================ */
import { employeesSummaryAgendaActionCreators } from '../Redux/AgendaRedux';
import { employeeDailyAgendaActionCreators } from '../Redux/AgendaRedux';
import { slotActionCreators } from '../Redux/SlotsRedux';
/** == Utilities  ================================ */
import { getEmployeesSummaryAgenda } from '../Selectors/slots';
import { SLOTS_FETCHED_CALLBACKS } from '../Redux/SlotsRedux';
import { timeHelpers } from '../Lib/timeHandlers';
import I18n from '../I18n';

class EmployeesSummaryAgenda extends Component {
  onDaySelected = date => {
    const { dateString } = date;
    const { currentSchool: { time_zone }, slotsIndexRequest, cacheHistory } = this.props;
    this.props.setDay(dateString);

    if (timeHelpers.isCacheStale(dateString, cacheHistory, time_zone)) {
      const dateRangeParams = timeHelpers.getWeekRange(dateString, time_zone);

      slotsIndexRequest(
        dateRangeParams,
        SLOTS_FETCHED_CALLBACKS.SUMMARY_AGENDA_PUSH_CACHE_HISTORY
      );
    }
  };

  renderSummaryCell = employeeSlots => {
    const id = employeeSlots[0].employee_id;
    const employee = this.props.employees[id] || {};

    return (
      <View style={{paddingVertical: 5, paddingHorizontal: 15}}>
        <EmployeeAvailabilitySummaryCell slots={employeeSlots}
                                                employee={employee}
                                                onCalendarPress={() => {
                                                  this.props.initDailyAgenda({
                                                    ...this.props.employeesSummaryAgendaState,
                                                    employeeId: id});
                                                  this.props.navigation.navigate('employeeDailyAgenda', { employee })
                                                }}/>
      </View>
    )
  };

  render() {
    const {
      employeesSummaryAgendaItems,
      selectedDay,
      currentUser
    } = this.props;

    const emptyDayLabels = ['title', 'description'].map(
      key => I18n.t(`employee_summary_agenda_day_empty.${currentUser.type.toLowerCase()}_perspective.${key}`));

    return (
      <AgendaWrapper
        renderEmptyData={
          () =>
          <InfoBox
            title={emptyDayLabels[0]}
            description={emptyDayLabels[1]}
            customContainerStyle={{marginHorizontal: 15}}
          />
        }
        selected={selectedDay}
        onDayPress={this.onDaySelected}
        items={employeesSummaryAgendaItems}
        renderItem={this.renderSummaryCell}
      />
    );
  }
}

const mapStateToProps = state => ({
  employeesStatus: state.employees.status,
  studentsStatus: state.students.status,
  scheduleSettingsStatus: state.scheduleSettings.status,
  slotsStatus: state.slots.status,

  employees: state.employees.active,
  selectedDay: state.employeesSummaryAgenda.daySelected,
  employeesSummaryAgendaState: state.employeesSummaryAgenda,
  employeesSummaryAgendaItems: getEmployeesSummaryAgenda(state),
  cacheHistory: state.employeesSummaryAgenda.cacheHistory,
  currentSchool: state.drivingSchools.hashMap[state.context.currentDrivingSchoolID],
  currentUser: state.user
});

const mapDispatchToProps = dispatch => ({
  slotsIndexRequest: (params, callback) => dispatch(slotActionCreators.indexRequest(params, callback)),
  setDay: day => dispatch(employeesSummaryAgendaActionCreators.setDay(day)),
  initDailyAgenda: (stateToMerge) => dispatch(employeeDailyAgendaActionCreators.init(stateToMerge)),
});

const withAsyncLoading = withRequiredData(
  EmployeesSummaryAgenda,
  ['employeesStatus', 'slotsStatus', 'scheduleSettingsStatus']
);

export default connect(mapStateToProps, mapDispatchToProps)(withAsyncLoading);
