import React, { Component } from 'react';
import { timeHelpers } from '../Lib/timeHandlers';
import {
  slotActionCreators,
  SLOTS_FETCHED_CALLBACKS,
} from '../Redux/Entities/SlotsRedux';
import { scheduleSettingsActionCreators } from '../Redux/Entities/ScheduleSettingsRedux';
import { connect } from 'react-redux';
import EmployeesSummaryAgenda from './EmployeesSummaryAgenda';
import { employeesActionCreators } from '../Redux/Entities/EmployeesRedux';
import { studentsActionCreators } from '../Redux/Entities/StudentsRedux';

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
  selectedDay: state.views.employeesSummaryAgenda.daySelected,
  currentSchool: state.entities.drivingSchools.hashMap[state.support.context.currentDrivingSchoolID],
});

const mapDispatchToProps = dispatch => ({
  slotsIndexRequest: (params, callback) => dispatch(slotActionCreators.indexRequest(params, callback)),
  scheduleSettingsRequest: () => dispatch(scheduleSettingsActionCreators.showRequest()),
  employeesIndexRequest: () => dispatch(employeesActionCreators.indexRequest()),
  studentsIndexRequest: () => dispatch(studentsActionCreators.indexRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SummaryAgendaFetcher);
