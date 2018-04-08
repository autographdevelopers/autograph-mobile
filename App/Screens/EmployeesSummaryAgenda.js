/** == Built-in modules ================================ */
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
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
import _ from 'lodash';

class EmployeesSummaryAgenda extends Component {
  componentWillMount() {
    const { selectedDay } = this.props;
    const dateRangeParams = this.getWeekRange(selectedDay);

    this.props.slotsIndexRequest(dateRangeParams, SLOTS_FETCHED_CALLBACKS.SUMMARY_AGENDA_PUSH_CACHE_HISTORY);
  }

  onDaySelected = date => {
    const { dateString } = date;
    this.props.setDay(dateString);


    let shouldFetchData = true;
    _.each(this.props.cacheHistory, (frame) => {
      if( moment().isBefore(frame.expireAt) && moment(dateString).isBetween(frame.dataFrom, frame.dataTo, 'seconds', '[]')) {
        shouldFetchData = false;
      }
    });

    if (shouldFetchData) {
      const dateRangeParams = this.getWeekRange(dateString);

      this.props.slotsIndexRequest(dateRangeParams, SLOTS_FETCHED_CALLBACKS.SUMMARY_AGENDA_PUSH_CACHE_HISTORY);
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

  getWeekRange = day => {
    const referenceDay = moment(day, 'YYYY-MM-DD');
    const from = referenceDay.startOf('week').format('YYYY-MM-DD');
    const to = referenceDay.endOf('week').format('YYYY-MM-DD');

    return {
      by_start_time: { from, to }
    };
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
  cacheHistory: state.employeesSummaryAgenda.cacheHistory
});

const mapDispatchToProps = dispatch => ({
  slotsIndexRequest: (params, callback) => dispatch(slotActionCreators.indexRequest(params, callback)),
  setDay: day => dispatch(employeesSummaryAgendaActionCreators.setDay(day)),
  initDailyAgenda: (stateToMerge) => dispatch(employeeDailyAgendaActionCreators.init(stateToMerge)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesSummaryAgenda);
