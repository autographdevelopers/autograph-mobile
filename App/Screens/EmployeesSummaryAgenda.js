/** == Built-in modules ================================ */
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
/** == Custom modules ================================ */
import EmployeeAvailabilitySummaryCell from '../Components/EmployeeAvailabilitySummaryCell';
import AgendaWrapper from './AgendaWrapper';
/** == Action Creators ================================ */
import { employeesSummaryAgendaActionCreators } from '../Redux/EmployeesSummaryAgendaRedux';
import { employeeDailyAgendaActionCreators } from '../Redux/employeeDailyAgendaRedux';
import { slotActionCreators } from '../Redux/SlotsRedux';
/** == Utilities  ================================ */
import { getEmployeesSummaryAgenda } from '../Selectors/slots';


class EmployeesSummaryAgenda extends Component {
  componentWillMount() {
    const { selectedDay } = this.props;
    const dateRangeParams = this.getWeekRange(selectedDay);

    this.props.slotsIndexRequest(dateRangeParams);
  }

  onDaySelected = date => {
    const { dateString } = date;

    const dateRangeParams = this.getWeekRange(dateString);
    this.props.slotsIndexRequest(dateRangeParams);

    this.props.setDay(dateString);
  };

  renderSummaryCell = employeeSlots => {
    const id = employeeSlots[0].employee_id;
    const employee = this.props.employees[id] || {};

    return (
      <View style={{paddingVertical: 5, paddingHorizontal: 15}}>
        <EmployeeAvailabilitySummaryCell slots={employeeSlots}
                                                employee={employee}
                                                onCalendarPress={() => {
                                                  this.props.initDailyAgenda(this.props.selectedDay, id);
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
  employeesSummaryAgendaItems: getEmployeesSummaryAgenda(state)
});

const mapDispatchToProps = dispatch => ({
  slotsIndexRequest: params => dispatch(slotActionCreators.indexRequest(params)),
  setDay: day => dispatch(employeesSummaryAgendaActionCreators.setDay(day)),
  initDailyAgenda: (day, employeeId) => dispatch(employeeDailyAgendaActionCreators.init(day, employeeId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesSummaryAgenda);
