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
import { getCurrentDrivingSchool } from '../Selectors/DrivingSchool';
import { SLOTS_FETCHED_CALLBACKS } from '../Redux/Entities/SlotsRedux';
import { getSlotsIndexParamsForSummaryAgenda } from '../Selectors/slots';
import { timeHelpers } from '../Lib/timeHandlers';
import I18n from '../I18n';

class EmployeesSummaryAgenda extends Component {
  onDaySelected = date => {
    const { dateString } = date;
    const {
      currentSchool: { time_zone },
      slotsIndexRequest,
      setDay,
      employeesSummaryAgendaState: { cacheHistory },
    } = this.props;

    setDay(dateString);

    if ( timeHelpers.isCacheStale(dateString, cacheHistory, time_zone) ) {
      const dateRangeParams = timeHelpers.getWeekRange(dateString, time_zone);

      slotsIndexRequest(
        dateRangeParams,
        SLOTS_FETCHED_CALLBACKS.SUMMARY_AGENDA_PUSH_CACHE_HISTORY,
      );
    }
  };

  renderSummaryCell = employeeSlots => {
    const {
      initDailyAgenda,
      navigation,
      employees,
      employeesSummaryAgendaState
    } = this.props;

    const id = employeeSlots[0].employee_id;
    const employee = employees[id] || {};

    return (
      <View style={{ paddingVertical: 5, paddingHorizontal: 15 }}>
        <EmployeeAvailabilitySummaryCell slots={employeeSlots}
                                         employee={employee}
                                         onCalendarPress={() => {
                                           initDailyAgenda({
                                             ...employeesSummaryAgendaState,
                                             employeeId: id,
                                           });

                                           navigation.navigate(
                                             'employeeDailyAgenda',
                                             { employee });
                                         }}/>
      </View>
    );
  };

  render() {
    const {
      employeesSummaryAgendaItems,
      selectedDay,
      currentUser,
    } = this.props;

    const emptyDayLabels = ['title', 'description'].map(key =>
      I18n.t(`employee_summary_agenda_day_empty.${currentUser.type.toLowerCase()}_perspective.${key}`));

    return (
      <AgendaWrapper
        renderEmptyData={
          () =>
            <InfoBox
              title={emptyDayLabels[0]}
              description={emptyDayLabels[1]}
              customContainerStyle={{ marginHorizontal: 15 }}
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
  status: state.views.employeesSummaryAgenda.status,
  requestDataArguments: {
    employeesPayload: {},
    studentsPayload: {},
    slotsPayload: getSlotsIndexParamsForSummaryAgenda(state),
    scheduleSettingsPayload: {}
  },
  selectedDay: state.views.employeesSummaryAgenda.daySelected,
  employeesSummaryAgendaState: state.views.employeesSummaryAgenda,
  employeesSummaryAgendaItems: getEmployeesSummaryAgenda(state),
  employees: state.entities.employees.active,
  slotsIndexParams: getSlotsIndexParamsForSummaryAgenda(state),
  currentSchool: getCurrentDrivingSchool(state),
  currentUser: state.access.currentUser,
});

const mapDispatchToProps = dispatch => {
  return {
    requestData: payloads => dispatch(employeesSummaryAgendaActionCreators.requestDataForView(payloads)),
    slotsIndexRequest: (params, callback) => dispatch(slotActionCreators.indexRequest(params, callback)),
    setDay: day => dispatch(employeesSummaryAgendaActionCreators.setDay(day)),
    initDailyAgenda: stateToMerge => dispatch(employeeDailyAgendaActionCreators.init(stateToMerge))
  }
};

const withAsyncLoading = withRequiredData(
  EmployeesSummaryAgenda,
  'status',
  'requestData',
  'requestDataArguments'
);

export default connect(mapStateToProps, mapDispatchToProps)(withAsyncLoading);
