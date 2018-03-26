import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import styles from './placeholderStyles';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import EmployeesSearchableList from '../Components/EmployeesSearchableList';
import {contextActionCreators} from '../Redux/ContextRedux';
import { slotActionCreators } from '../Redux/SlotsRedux';
import { calendarActionCreators } from '../Redux/CalendarRedux';
import moment from 'moment';
import _ from 'lodash';
import AvailableSlot from '../Components/Slots/FreeSlot';
import { slotHelper } from '../Lib/SlotHelpers';

class CalendarScreen extends Component {

  prepareSlotsData = () => {

    // TODO: how to handle dates on the edge of a week?

    // TODO: consider
    // TODO: How do I know wheather I already have this slots(from taht range) I don;t need to send the request..?
    // TODO: If Api returns no slots for newly selected employee I am left out with slots from previous employee

    // TODO: Retrive driving lessons IDs..here?
    // TODO: driving lessons index request here?
  };

  onEmployeeSelected = id => {
    const { navigation, setCurrentEmployee, currentDay } = this.props;
    setCurrentEmployee(id);
    navigation.goBack(null);

    this.props.slotsIndexRequest(currentDay, id);
  };

  onDayPress = day => {
    this.props.slotsIndexRequest(day.dateString);
  };

  render() {
    const {
      currentEmployee,
      currentDay,
      slots,
      navigation: {navigate}
    } = this.props;

    // TODO filter and sort
    const processedSlots = _(Object.values(slots)).groupBy(slot => moment(slot.start_time).format('YYYY-MM-DD')).value();
    // TODO display loader when fetching
    return (
      <ScrollView contentContainerStyle={{flex: 1}}>
        <TouchableOpacity onPress={()=>navigate('searchEmployee', {onResultPress: this.onEmployeeSelected})}>
          <Text>Find Employee</Text>
        </TouchableOpacity>
        {currentEmployee && <Text>{`${currentEmployee.name} ${currentEmployee.surname}`}</Text>}
        <View style={{flex: 1}}>
          <Agenda
            current={currentDay}
            items={processedSlots}
            renderItem={(item, firstItemInDay) => <AvailableSlot hour={slotHelper.dateTimeToTimeZoneHour(item.start_time)}/> }
            onDayPress={this.onDayPress}
            rowHasChanged={(r1, r2) => {return r1.start_time !== r2.start_time}}
          />
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => ({
  currentEmployee: state.employees.active[state.context.currentEmployeeID],
  currentDay: state.calendar.daySelected,
  slots: state.slots.data
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentEmployee: id => dispatch(contextActionCreators.setCurrentEmployee(id)),
  slotsIndexRequest: (day, employeeId )=> dispatch(slotActionCreators.indexRequest(day, employeeId)),
  selectDay: day => dispatch(calendarActionCreators.setDay(day.dateString))
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarScreen)
