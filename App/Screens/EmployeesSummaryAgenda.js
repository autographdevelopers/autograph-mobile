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
import { employeesSummaryAgendaActionCreators } from '../Redux/Views/AgendaRedux';
import { employeeDailyAgendaActionCreators } from '../Redux/Views/AgendaRedux';
import { slotActionCreators } from '../Redux/Entities/SlotsRedux';
/** == Utilities  ================================ */
import { getEmployeesSummaryAgenda } from '../Selectors/slots';
import { SLOTS_FETCHED_CALLBACKS } from '../Redux/Entities/SlotsRedux';
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

    console.log('employeeSlots');
    console.log(employeeSlots);

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
  employeesStatus: state.entities.employees.status,
  studentsStatus: state.entities.students.status,
  scheduleSettingsStatus: state.entities.scheduleSettings.status,
  slotsStatus: state.entities.slots.status,

  employees: state.entities.employees.active,
  selectedDay: state.views.employeesSummaryAgenda.daySelected,
  employeesSummaryAgendaState: state.views.employeesSummaryAgenda,
  employeesSummaryAgendaItems: getEmployeesSummaryAgenda(state),
  cacheHistory: state.views.employeesSummaryAgenda.cacheHistory,
  currentSchool: state.entities.drivingSchools.hashMap[state.support.context.currentDrivingSchoolID],
  currentUser: state.access.currentUser
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
