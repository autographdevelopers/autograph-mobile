import React, { Component } from 'react';
import {
  slotActionCreators,
  SLOTS_FETCHED_CALLBACKS,
} from '../Redux/SlotsRedux';
import { connect } from 'react-redux';
import { timeHelpers } from '../Lib/timeHandlers';
import EmployeeDailyAgenda from './EmployeeDailyAgenda';

class EmployeeDailyAgendaFetcher extends Component {
  componentWillMount() {
    const { selectedDay, slotsIndexRequest, employeeId } = this.props;
    const { time_zone } = this.props.currentSchool;

    slotsIndexRequest({
      employee_id: employeeId,
      ...timeHelpers.getWeekRange(selectedDay, time_zone)
      }, SLOTS_FETCHED_CALLBACKS.DAILY_AGENDA_PUSH_CACHE_HISTORY
    );
  }

  render() {
    return <EmployeeDailyAgenda {...this.props}/>
  }
}

const mapStateToProps = state => ({
  selectedDay: state.employeeDailyAgenda.daySelected,
  employeeId: state.employeeDailyAgenda.employeeId,
  currentSchool: state.drivingSchools.hashMap[state.context.currentDrivingSchoolID]
});

const mapDispatchToProps = dispatch => ({
  slotsIndexRequest: (params, callback) => dispatch(slotActionCreators.indexRequest(params, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDailyAgendaFetcher);
