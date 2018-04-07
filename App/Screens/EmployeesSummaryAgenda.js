import React, { Component } from 'react';
import AgendaWrapper from './AgendaWrapper';
import { connect } from 'react-redux';
import { getEmployeesSummaryAgenda } from '../Selectors/slots';
import { slotActionCreators } from '../Redux/SlotsRedux';
import moment from 'moment';
import { employeesSummaryAgendaActionCreators } from '../Redux/EmployeesSummaryAgendaRedux';
import EmployeeAvailabilitySummaryCell from '../Components/EmployeeAvailabilitySummaryCell';

class EmployeesSummaryAgenda extends Component {
  componentWillMount() {
    const { selectedDay } = this.props;
    const dateRangeParams = this.getWeekRange(selectedDay);

    this.props.slotsIndexRequest(dateRangeParams);
  }

  onDaySelected = date => {
    const { dateString } = date;
    const { left, right } = this.props.fetchedDataBoundaries;

    if(!moment(dateString).isBetween(left, right, 'day')) {
      const dateRangeParams = this.getWeekRange(dateString);
      this.props.slotsIndexRequest(dateRangeParams);
    }

    this.props.setDay(dateString);
  };

  renderSummaryCell = employeeSlots => {
    const id = employeeSlots[0].employee_id;
    const employee = this.props.employees[id] || {};

    return <EmployeeAvailabilitySummaryCell slots={employeeSlots} employee={employee} />
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

    console.log('employeesSummaryAgendaItems');
    console.log(employeesSummaryAgendaItems);

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
  fetchedDataBoundaries: state.employeesSummaryAgenda.fetchedDataBoundaries,
  employeesSummaryAgendaItems: getEmployeesSummaryAgenda(state)
});

const mapDispatchToProps = dispatch => ({
  slotsIndexRequest: params => dispatch(slotActionCreators.indexRequest(params)),
  setDay: day => dispatch(employeesSummaryAgendaActionCreators.setDay(day))
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesSummaryAgenda);
