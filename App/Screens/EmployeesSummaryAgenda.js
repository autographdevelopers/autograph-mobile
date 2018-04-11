/** == Built-in modules ================================ */
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
/** == Custom modules ================================ */
import EmployeeAvailabilitySummaryCell from '../Components/EmployeeAvailabilitySummaryCell';
import AgendaWrapper from './AgendaWrapper';
/** == Action Creators ================================ */
import { employeesSummaryAgendaActionCreators } from '../Redux/AgendaRedux';
import { employeeDailyAgendaActionCreators } from '../Redux/AgendaRedux';
import { slotActionCreators } from '../Redux/SlotsRedux';
/** == Utilities  ================================ */
import { getEmployeesSummaryAgenda } from '../Selectors/slots';
import { SLOTS_FETCHED_CALLBACKS } from '../Redux/SlotsRedux';
import { timeHelpers } from '../Lib/timeHandlers';

class EmployeesSummaryAgenda extends Component {
  componentWillMount() {
    const { selectedDay, currentSchool } = this.props;
    const dateRangeParams = timeHelpers.getWeekRange(selectedDay, currentSchool.time_zone);

    this.props.slotsIndexRequest(dateRangeParams, SLOTS_FETCHED_CALLBACKS.SUMMARY_AGENDA_PUSH_CACHE_HISTORY);
  }

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
                                                  this.props.navigation.navigate('employeeDailyAgenda', { employeeId: id })
                                                }}/>
      </View>
    )
  };



  render() {
    const { employeesSummaryAgendaItems, selectedDay } = this.props;

    return (
      <AgendaWrapper
        selected={selectedDay}
        onDayPress={this.onDaySelected}
        items={employeesSummaryAgendaItems}
        renderItem={this.renderSummaryCell}
      />
    );
  }
}

const mapStateToProps = state => ({
  employees: state.employees.active,
  selectedDay: state.employeesSummaryAgenda.daySelected,
  employeesSummaryAgendaState: state.employeesSummaryAgenda,
  employeesSummaryAgendaItems: getEmployeesSummaryAgenda(state),
  cacheHistory: state.employeesSummaryAgenda.cacheHistory,
  currentSchool: state.drivingSchools.hashMap[state.context.currentDrivingSchoolID],
});

const mapDispatchToProps = dispatch => ({
  slotsIndexRequest: (params, callback) => dispatch(slotActionCreators.indexRequest(params, callback)),
  setDay: day => dispatch(employeesSummaryAgendaActionCreators.setDay(day)),
  initDailyAgenda: (stateToMerge) => dispatch(employeeDailyAgendaActionCreators.init(stateToMerge)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesSummaryAgenda);
