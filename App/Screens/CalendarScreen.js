import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import {  Agenda, LocaleConfig } from 'react-native-calendars';
import {contextActionCreators} from '../Redux/ContextRedux';
import { slotActionCreators } from '../Redux/SlotsRedux';
import { calendarActionCreators } from '../Redux/CalendarRedux';
import moment from 'moment';
import _ from 'lodash';
import AvailableSlot from '../Components/Slots/FreeSlot';
import SelectedSlot from '../Containers/Slots/SelectedSlot';
import SlotBookingBy3rdParty from '../Components/Slots/BookingBy3rdParty';
import DrivingLessonCell from '../Components/Slots/DriveSlot';

import { slotHelper } from '../Lib/SlotHelpers';
import { Fonts, Colors } from '../Themes/';
import ButtonText from '../Components/ButtonText';
import CustomDatePicker from '../Components/CustomDatePicker';
import { path } from 'ramda';
import { toastActionCreators } from '../Redux/ToastRedux';
import ButtonPrimary from '../Components/ButtonPrimary';
import SpinnerView from '../Components/SpinnerView';
import { FETCHING_STATUS } from '../Lib/utils';

LocaleConfig.locales['pl'] = {
  monthNames: ['Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec','Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzięń'],
  monthNamesShort: ['Sty.','Lut.','Mar','Kwi.','Maj.','Cze.','Lip.','Sie.','Wrz.','Paź.','Lis.','Gru.'],
  dayNames: ['Poniedziałek','Wtorek','Środa','Czwartek','Piątek','Sobota','Niedziela'],
  dayNamesShort: ['Pn.','Wt.','Śr.','Czw.','Pt.','Sob.','Nd.']
};

LocaleConfig.defaultLocale = 'pl';

const SOCKET_COMMANDS = {
  SUBSCRIBE: 'subscribe',
  MESSAGE: 'message',
  LOCK_SLOT: 'lock_slot',
  UNLOCK_SLOT: 'unlock_slot'
};

class CalendarScreen extends Component {

  constructor(props) {
    super(props);
    this.state= {
      currentEmployeeId: null
    }
  }

  prepareSlotsData = () => {

    // TODO: how to handle dates on the edge of a week?

    // TODO: consider
    // TODO: How do I know wheather I already have this slots(from taht range) I don;t need to send the request..?

    // TODO: Retrive driving lessons IDs..here?
    // TODO: driving lessons index request here?
  };

  onEmployeeSelected = id => {
    const { navigation, currentDay, slotsIndexRequest } = this.props;

    this.setState({
      currentEmployeeId: id
    }, () => {
      this.connectToSocketChannel();

      const requestParams = this.buildRequestParams(currentDay);

      slotsIndexRequest(requestParams);
    });

    navigation.goBack(null);
  };

  onDayPress = day => {
    const { dateString } = day;

    const requestParams = this.buildRequestParams(dateString);

    this.props.slotsIndexRequest(requestParams, dateString);
  };

  renderCell = (item, firstItemInDay) => {
    console.log('Rendering SLOT');


    if(item.employee && item.student && item.driving_lesson_id) {
      return <DrivingLessonCell employee={item.employee} student={item.student} slots={item.slots}/>
    } else if (moment(item.release_at).isAfter(moment())) {
      if (this.props.currentUser.id === item.locking_user_id) {
        return <SelectedSlot slot={item} handleTimeout={this.releaseSlot(item)} onPressCancel={this.unlockSlot} />
      } else {
        return <SlotBookingBy3rdParty slot={item}/>
      }
    } else if (item.driving_lesson_id === null) {
      return <AvailableSlot slot={item} onPress={this.lockSlot}/>;
    }
  };

  releaseSlot = slot => () => {
    const releasedSlot = _.cloneDeep(slot);
    releasedSlot.release_at = null;
    this.props.saveSlots(releasedSlot);
  };

  buildRequestParams = date => {
    return {
      ...this.getWeekRange(date),
      employee_id: this.state.currentEmployeeId
    }
  };

  lockSlot = slot => () => {
    const currentEmployee = this.props.employees[this.state.currentEmployeeId];
    const slotsCollection = Object.values(this.props.slots);

    const employeeSlots = slotsCollection.filter( slot => slot.employee_id === currentEmployee.id );

    console.log("employeeSlots");
    console.log(employeeSlots);

// TODO take into consideration only for a given day


    const emptyEmployeeSlots = employeeSlots.filter( slot => slot.driving_lesson_id === null );

    console.log("emptyEmployeeSlots");
    console.log(emptyEmployeeSlots);


    const selectedSlots = emptyEmployeeSlots.filter( slot => moment(slot.release_at).isAfter(moment.utc()) && this.props.currentUser.id === slot.locking_user_id );

    console.log("selectedSlots");
    console.log(selectedSlots);

    const sortedSelectedSlots = selectedSlots.sort( (left, right) => moment.utc(left.start_time).diff(moment.utc(right.start_time)) );


    console.log("sortedSelectedSlots");
    console.log(sortedSelectedSlots);

    const groupedSelections = sortedSelectedSlots.reduce((acc, current) => {
      if (acc.length && moment(_.last(_.last(acc))).diff(moment(current.start_time), 'minutes') === -30 ) {
        acc.last.push(current);
      }
      else {
        acc.push([current]);
      }

      return acc;
    }, []);

    let valid = false;

    console.log('********************');

    console.log(groupedSelections);

    if(groupedSelections.length === 0)
      valid = true;

    _.each(groupedSelections, group => {
      console.log('Already selected group');
      console.log(groupedSelections);


      const adjacentToBeginningOfSelectionBlock  = moment(slot.start_time).add(30, 'minutes').diff(moment(group[0].start_time)) === 0;
      console.log('adjacentToBeginningOfSelectionBlock');
      console.log(adjacentToBeginningOfSelectionBlock);

      const adjacentToEndOfSelectionBlock  = moment(slot.start_time).subtract(30, 'minutes').diff(moment(_.last(group).start_time)) === 0;
      console.log('adjacentToEndOfSelectionBlock');
      console.log(adjacentToEndOfSelectionBlock);

      if ( adjacentToBeginningOfSelectionBlock || adjacentToEndOfSelectionBlock ) {
        valid = true;
      }
    });

    if (valid) {
      const dataParams = this.buildDataParam(SOCKET_COMMANDS.LOCK_SLOT, { slot_id: slot.id });
      const params = this.buildTransmissionParams(SOCKET_COMMANDS.MESSAGE, dataParams);

      this.socket.send(params);
    } else {
      this.props.displayToastMsg('Możesz wybrać tylko sloty, ktory utworzą ciągłość..')
    }
  };

  unlockSlot = slot => () => {
    const dataParams = this.buildDataParam(SOCKET_COMMANDS.UNLOCK_SLOT, { slot_id: slot.id });
    const params = this.buildTransmissionParams(SOCKET_COMMANDS.MESSAGE, dataParams);

    this.socket.send(params);
  };

  getWeekRange = day => {
    const day2 = moment(day, 'YYYY-MM-DD');
    const from = day2.startOf('week').format('YYYY-MM-DD');
    const to = day2.endOf('week').format('YYYY-MM-DD');

    return {
      by_start_time: {
        from,
        to
      }
    };
  };

  buildTransmissionParams = (command, data={}) => {
    const params = JSON.stringify({
      command,
      identifier: JSON.stringify({
        channel: `SlotsChannel`,
        employee_id: this.state.currentEmployeeId,
        driving_school_id: this.props.drivingSchoolID
      }),
      data: JSON.stringify(data)
    });

    return params;
  };

  buildDataParam = (action, data) => {
    return {
      action,
      ...data
    }
  };

  connectToSocketChannel = () => {
    const { uid, clientId, accessToken } = this.props.session;
    const endpoint = `ws://localhost:3000/api/v1/cable?uid=${uid}&client=${clientId}&token=${accessToken}`;

    this.socket = new WebSocket(endpoint);

    const params = this.buildTransmissionParams(SOCKET_COMMANDS.SUBSCRIBE);

    this.socket.onopen = () => {
      this.socket.send(params);
    };

    this.socket.onmessage = (event) => {
      const data = event.data;
      const receievedData = JSON.parse(data)

      const { message } = receievedData;

      if(message && message.type !== 'ping') {
        switch(message.type) {
          case  'SLOT_CHANGED':
            const { slot } = message;
            this.props.saveSlots([slot])
        }
      }

    }
  }

  getSelectedInterval = () => {

    const currentEmployee = this.props.employees[this.state.currentEmployeeId];

      const slotsCollection = Object.values(this.props.slots) || [];

      const employeeSlots = slotsCollection.filter( slot => slot.employee_id === currentEmployee.id );

      const emptyEmployeeSlots = employeeSlots.filter( slot => slot.driving_lesson_id === null );

      const selectedSlots = emptyEmployeeSlots.filter( slot => moment(slot.release_at).isAfter(moment.utc()) && this.props.currentUser.id === slot.locking_user_id );

      return selectedSlots;
  };

  bookSelectedSlotsLabel = slots => {
    const from = moment(slots[0].start_time).format('HH:mm');
    const to = moment(_.last(slots).start_time).add(30, 'minutes').format('HH:mm');

    return `Umów jazdę ${from} - ${to}`
  };

  render() {
    // if(this.props.slotsStatus !== FETCHING_STATUS.SUCCESS)
    //   return <SpinnerView/>;


    const {
      currentDay,
      slots,
      lessons,
      selectDay,
      employees,
      navigation: { navigate }
    } = this.props;

    console.log('Rendering Calendar screen');

    const currentEmployee = employees[this.state.currentEmployeeId];

    const slotsCollection = Object.values(slots);
    const employeeSlots = slotsCollection.filter( slot => slot.employee_id === currentEmployee.id);
    const emptyEmployeeSlots = employeeSlots.filter( slot => slot.driving_lesson_id === null);
    const lesson_ids = employeeSlots.filter( slot => slot.driving_lesson_id !== null).map(slot => slot.driving_lesson_id);
    const drivingLessons = lesson_ids.map(id => lessons[id]);

    const slotsWithLessonsUnion = [...drivingLessons, ...emptyEmployeeSlots];

    const sortedSlots = slotsWithLessonsUnion.sort((left, right) => moment.utc(left.start_time).diff(moment.utc(right.start_time)) );

    const processedSlots = _(sortedSlots).groupBy(slot => moment(slot.start_time).format('YYYY-MM-DD')).value();



    // const markedItems = Object.keys(processedSlots).reduce( (acc, current) => {
    //   acc[current] = { marked: true };
    //   return acc;
    // }, {});


    const selectedInterval = this.getSelectedInterval();

    return (
      <View style={{flex: 1}}>
        <View style={styles.employeeSelectorRow}>
          <View style={styles.row}>
            <Text style={styles.employeeSelectorLabel}>Wyświetl dla </Text>
            {currentEmployee && <Text style={styles.employeeSelected}>{`${currentEmployee.name} ${currentEmployee.surname}`}</Text> }
          </View>
          <ButtonText customTextStyle={{fontSize: Fonts.size.small}} onPress={() => navigate('searchEmployee', {onResultPress: this.onEmployeeSelected})}>Zmień</ButtonText>
        </View>

        {/*<CustomDatePicker datePickerConfiguration={{date: currentDay, onDateChange: selectDay}} />*/}

        <View style={{flex: 1, height: 600}}>
          <Agenda
            current={currentDay}
            selected={currentDay}
            items={{[currentDay]: processedSlots[currentDay]}}
            firstDay={1}
            renderItem={this.renderCell}
            onDayPress={this.onDayPress}
            rowHasChanged={(r1, r2) => (r1.release_at !== r2.release_at) || (r1.driving_lesson_id !== r2.driving_lesson_id) || (r1.locking_user_id !== r2.locking_user_id) }
            theme={{
              'stylesheet.agenda.list': {
                day: {
                  marginTop: 0,
                  width: 0,
                  // paddingVertical: 15,
                  // paddingHorizontal: 15,
                }
              }
            }}
          />
          { selectedInterval.length > 0 && <ButtonPrimary>{this.bookSelectedSlotsLabel(selectedInterval)}</ButtonPrimary> }
        </View>
      </View>
    )
  }
}

const styles = {
  employeeSelectorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  row: {
    flexDirection: 'row',
  },
  employeeSelectorLabel: {
    color: Colors.strongGrey,
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.base,
    paddingRight: 15
  },
  employeeSelected: {
    color: Colors.softBlack,
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.medium
  }
};

const mapStateToProps = (state) => ({
  employees: state.employees.active,
  slotsStatus: state.slots.status,
  currentDay: state.calendar.daySelected,
  lessons: state.drivingLessons.hashMap,
  slots: state.slots.data,
  session: state.session,
  drivingSchoolID: state.context.currentDrivingSchoolID,
  currentUser: state.user
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentEmployee: id => dispatch(contextActionCreators.setCurrentEmployee(id)),
  slotsIndexRequest: (params, daySelected)=> dispatch(slotActionCreators.indexRequest(params, daySelected)),
  selectDay: day => dispatch(calendarActionCreators.setDay(day)),
  saveSlots: slots => dispatch(slotActionCreators.save(slots)),
  displayToastMsg: msg => dispatch(toastActionCreators.displayToastMessage(msg))
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarScreen)
