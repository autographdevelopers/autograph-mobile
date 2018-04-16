import React, { Component } from 'react';
import { timeHelpers } from '../Lib/timeHandlers';
import {
  slotActionCreators,
  SLOTS_FETCHED_CALLBACKS,
} from '../Redux/SlotsRedux';
import { scheduleSettingsActionCreators } from '../Redux/ScheduleSettingsRedux';
import { connect } from 'react-redux';
import EmployeesSummaryAgenda from './EmployeesSummaryAgenda';
import { employeesActionCreators } from '../Redux/EmployeesRedux';
import { studentsActionCreators } from '../Redux/StudentsRedux';

class SummaryAgendaFetcher extends Component {
  componentWillMount() {
    const {
      selectedDay,
      currentSchool,
      scheduleSettingsRequest,
      slotsIndexRequest,
      employeesIndexRequest,
      studentsIndexRequest
    } = this.props;

    const dateRangeParams = timeHelpers.getWeekRange(selectedDay, currentSchool.time_zone);

    scheduleSettingsRequest();
    employeesIndexRequest();
    studentsIndexRequest();
    slotsIndexRequest(
      dateRangeParams,
      SLOTS_FETCHED_CALLBACKS.SUMMARY_AGENDA_PUSH_CACHE_HISTORY
    );
  }

  render () {
    return <EmployeesSummaryAgenda {...this.props}/>
  }
}

const mapStateToProps = state => ({
  selectedDay: state.employeesSummaryAgenda.daySelected,
  currentSchool: state.drivingSchools.hashMap[state.context.currentDrivingSchoolID],
});

const mapDispatchToProps = dispatch => ({
  slotsIndexRequest: (params, callback) => dispatch(slotActionCreators.indexRequest(params, callback)),
  scheduleSettingsRequest: () => dispatch(scheduleSettingsActionCreators.showRequest()),
  employeesIndexRequest: () => dispatch(employeesActionCreators.indexRequest()),
  studentsIndexRequest: () => dispatch(studentsActionCreators.indexRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SummaryAgendaFetcher);
