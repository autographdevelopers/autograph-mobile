import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import {  Agenda, LocaleConfig } from 'react-native-calendars';
import { slotActionCreators } from '../Redux/SlotsRedux';
import { calendarActionCreators } from '../Redux/CalendarRedux';
import { bookLessonActionCreators } from '../Redux/Modals/BookLesson';
import { modalActionCreators } from '../Redux/ModalRedux';
import moment from 'moment';
import _ from 'lodash';
import AvailableSlot from '../Components/Slots/AvailableSlot';
import SelectedSlot from '../Containers/Slots/LockedSlot';
import SlotBookingBy3rdParty from '../Components/Slots/BookingBy3rdParty';
import DrivingLessonCell from '../Components/Slots/DriveSlot';
import { drivingLessonActionCreators } from '../Redux/DrivingLessonRedux';
import ModalTemplate from '../Components/ModalTemplate';

import { Fonts, Colors } from '../Themes/';
import ButtonText from '../Components/ButtonText';
import CustomDatePicker from '../Components/CustomDatePicker';
import { path } from 'ramda';
import { toastActionCreators } from '../Redux/ToastRedux';
import ButtonPrimary from '../Components/ButtonPrimary';
import SpinnerView from '../Components/SpinnerView';
import { FETCHING_STATUS } from '../Lib/utils';
import { MODALS_IDS } from '../Redux/ModalRedux';
import BookLessonWidget from '../Components/BookLessonWidget'
import EmployeeAvailabilitySummaryCell from '../Components/EmployeeAvailabilitySummaryCell';

import {
  slotsAndLessonsForDay,
  selectedSlots,
  dailySlotsForEachEmployee,
  lessonInterval
} from '../Selectors/slots';

LocaleConfig.locales['pl'] = {
  monthNames: ['Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec','Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzięń'],
  monthNamesShort: ['Sty.','Lut.','Mar','Kwi.','Maj.','Cze.','Lip.','Sie.','Wrz.','Paź.','Lis.','Gru.'],
  dayNames: ['Poniedziałek','Wtorek','Środa','Czwartek','Piątek','Sobota','Niedziela'],
  dayNamesShort: ['Pn.','Wt.','Śr.','Czw.','Pt.','Sob.','Nd.']
};

LocaleConfig.defaultLocale = 'pl';

const REQUEST_COMMANDS = {
  SUBSCRIBE: 'subscribe',
  MESSAGE: 'message',
};

const SERVER_ACTIONS = {
  LOCK_SLOT: 'lock_slot',
  UNLOCK_SLOT: 'unlock_slot'
};

const SLOTS_CHANNEL_NAME = `SlotsChannel`;

const SERVER_FEEDBACKS = {
  SLOT_CHANGED: 'SLOT_CHANGED'
};

class CalendarScreen extends Component {

  componentWillMount = () => {
    this.props.slotsIndexRequest({
      by_start_time: {
        from: this.props.daySelected,
        to: this.props.daySelected,
      }
    })
  };

  onEmployeeSelected = id => {
    const {
      navigation: { goBack },
      daySelected,
      slotsIndexRequest,
      selectEmployee
    } = this.props;

    selectEmployee(id);

    this.connectToSocketChannel(id);

    const requestParams = {
      ...this.getWeekRange(daySelected),
      employee_id: id
    };

    slotsIndexRequest(requestParams);

    goBack(null);
  };

  onDayPress = day => {
    const { dateString } = day;
    const requestParams = {
      ...this.getWeekRange(dateString),
    };

    if (this.props.selectedEmployee) {
      requestParams['employee_id'] = this.props.selectedEmployee.id;
    }

    this.props.slotsIndexRequest(requestParams, dateString);
  };

  renderCell = (slot, firstItemInDay) => {

    if (this.props.selectedEmployee) {
      console.tron.log('RENDERING REGULAR SLOTS');

      if ( slot.employee && slot.student && slot.slots ) {
        return <DrivingLessonCell employee={slot.employee}
                                  student={slot.student}
                                  slots={slot.slots}/>
      } else if ( moment(slot.release_at).isAfter(moment()) ) {
        if ( this.props.currentUser.id === slot.locking_user_id ) {
          const onCancelPress = this.isOnEdgeOfSelection(slot) ?
            this.unlockSlot :
            false;

          return <SelectedSlot slot={slot}
                               handleTimeout={this.releaseSlot(slot)}
                               onPressCancel={onCancelPress}/>
        } else {
          return <SlotBookingBy3rdParty slot={slot}/>
        }
      } else if ( slot.driving_lesson_id === null ) {
        return <AvailableSlot slot={slot} onPress={this.lockSlot}/>;
      }
    } else {
        return <EmployeeAvailabilitySummaryCell slots={slot} employee={{name: 'John', surname: 'Doe'}} />
    }
  };

  releaseSlot = slot => () => {
    const releasedSlot = _.cloneDeep(slot);
    releasedSlot.release_at = null;
    this.props.saveSlots(releasedSlot);
  };


  lockSlot = slot => () => {
    let isSlotAValidSelection = false;

    const { selectedSlots } = this.props;
    const firstOfSelected = _.first(selectedSlots);
    const lastOfSelected = _.last(selectedSlots);

    if(selectedSlots.length === 0) {
      isSlotAValidSelection = true;
    } else {
      const adjacentToBeginningOfSelectionBlock  = moment(slot.start_time)
        .add(30, 'minutes')
        .diff(moment(firstOfSelected.start_time)) === 0;

      const adjacentToEndOfSelectionBlock  = moment(slot.start_time)
        .subtract(30, 'minutes')
        .diff(moment(lastOfSelected.start_time)) === 0;

      if (adjacentToBeginningOfSelectionBlock || adjacentToEndOfSelectionBlock)
        isSlotAValidSelection = true;
    }

    if (isSlotAValidSelection) {
      const dataParams = this.buildDataParam(SERVER_ACTIONS.LOCK_SLOT, { slot_id: slot.id });
      const transmissionParams = this.buildTransmissionParams(
        REQUEST_COMMANDS.MESSAGE,
        this.getChannelIdentifier(),
        dataParams
      );

      this.socketTransmit(transmissionParams);

    } else {
      this.props.displayToastMsg('Możesz wybrać tylko sloty, ktory utworzą ciągłość..')
    }
  };

  isOnEdgeOfSelection = (slot) => {
    const { selectedSlots } = this.props;
    const firstSlotInSelection = _.first(selectedSlots);
    const lastSlotInSelection = _.last(selectedSlots);

    const edgeSlotsIds = [firstSlotInSelection, lastSlotInSelection].map(slot => slot.id);

    return edgeSlotsIds.includes(slot.id);
  };

  unlockSlot = slot => () => {
      const dataParams = this.buildDataParam(
        SERVER_ACTIONS.UNLOCK_SLOT, { slot_id: slot.id }
      );

      const transmissionParams = this.buildTransmissionParams(
        REQUEST_COMMANDS.MESSAGE,
        this.getChannelIdentifier(),
        dataParams
      );

      this.socketTransmit(transmissionParams);

  };

  socketTransmit = (params) => {
    if(this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(params);
    } else {
      this.props.displayToastMsg('Nie udało się wysłac sygnału. Brak połączenia.')
    }
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

  buildTransmissionParams = (command, identifier, data={}) => {
    return JSON.stringify({
      command,
      identifier: JSON.stringify(identifier),
      data: JSON.stringify(data)
    })
  };

  buildDataParam = (action, data) => {
    return {
      action,
      ...data
    }
  };

  getChannelIdentifier = emp_id => {
    const employee_id = emp_id || this.props.selectedEmployee.id;
    const driving_school_id = this.props.drivingSchoolID;

    return {
      employee_id,
      driving_school_id,
      channel: SLOTS_CHANNEL_NAME
    };
  };

  connectToSocketChannel = emp_id => {
    const { uid, clientId, accessToken } = this.props.session;
    const endpoint = `ws://localhost:3000/api/v1/cable?uid=${uid}&client=${clientId}&token=${accessToken}`;

    this.socket = new WebSocket(endpoint);

    const employeeSlotsChannelIdentifier = this.getChannelIdentifier(emp_id);
    const subscribeParams = this.buildTransmissionParams(
      REQUEST_COMMANDS.SUBSCRIBE,
      employeeSlotsChannelIdentifier
    );

    this.socket.onopen = () => {
      this.socketTransmit(subscribeParams);
    };

    this.socket.onmessage = (event) => {
      const data = event.data;
      const receievedData = JSON.parse(data);

      const { message } = receievedData;

      if(message && message.type !== 'ping') {
        switch(message.type) {
          case SERVER_FEEDBACKS.SLOT_CHANGED:
            this.props.saveSlots(message.slot)
        }
      }

    }
  };

  agendaItemChanged = (r1, r2) => {
    return r1 !== r2
  };

  goToSelectEmployeeScreen = () => {
    this.props.navigation.navigate('searchEmployee',
      { onResultPress: this.onEmployeeSelected })
  };

  goToSelectStudentScreen = () => {
    this.props.navigation.navigate('searchStudent',
      { onResultPress: this.onStudentsSelected })
  };

  onStudentsSelected = id => {
    this.props.setBookLessonParams({student_id: id});

    this.props.navigation.goBack(null);
    this.props.openModal(MODALS_IDS.CREATE_DRIVING_LESSON);
  };

  handleBookLessonBtnPress = () => {
    const {
      selectedSlots,
      drivingSchoolID,
      lessonInterval,
      daySelected,
      selectedEmployee,
      setBookLessonParams,
      resetDrivingLessonsStatus
    } = this.props;

    const bookLessonParams = {
      employee_id: selectedEmployee.id,
      driving_school_id: drivingSchoolID,
      fromHour: lessonInterval.from,
      toHour: lessonInterval.to,
      date: daySelected,
      slot_ids: selectedSlots.map(slot => slot.id)
    };

    resetDrivingLessonsStatus();
    setBookLessonParams(bookLessonParams);
    this.goToSelectStudentScreen();
  };

  render() {
    const {
      daySelected,
      selectedEmployee,
      slotsAndLessonsForDay,
      lessonInterval,
      employeesDailySlots,
      drivingLessonStatus,
      slotsStatus
    } = this.props;

    if([drivingLessonStatus, slotsStatus].includes(FETCHING_STATUS.FETCHING)) return <SpinnerView/>;

    let dataForAgenda;

    if (selectedEmployee) {
      dataForAgenda = slotsAndLessonsForDay;
    } else {
      dataForAgenda = employeesDailySlots;
    }

    return (
      <View style={{flex: 1}}>
        <View style={styles.employeeSelectorRow}>
          <View style={styles.row}>
            <Text style={styles.employeeSelectorLabel}>Wyświetl dla </Text>
            {selectedEmployee &&
              <Text style={styles.employeeSelected}>
                {`${selectedEmployee.name} ${selectedEmployee.surname}`}
              </Text>
            }
          </View>
          <ButtonText customTextStyle={styles.changeEmployeeBtn} onPress={this.goToSelectEmployeeScreen}>
            Zmień
          </ButtonText>
        </View>

        {/*<CustomDatePicker datePickerConfiguration={{date: daySelected, onDateChange: selectDay}} />*/}

        <View style={styles.agendaWrapper}>
          <Agenda
            current={daySelected}
            selected={daySelected}
            items={dataForAgenda}
            firstDay={1}
            renderItem={this.renderCell}
            renderEmptyDate={(a)=><Text>dsadssa</Text>}
            onDayPress={this.onDayPress}
            rowHasChanged={this.agendaItemChanged}
            theme={styles.customAgendaThemeConfig}
          />
          { lessonInterval &&
          <ButtonPrimary customWrapperStyles={{minWidth: '70%'}} onPress={this.handleBookLessonBtnPress}>
            {`Umów jazdę ${lessonInterval.from} - ${lessonInterval.to}`}
          </ButtonPrimary> }
        </View>

        <ModalTemplate
          modalID={MODALS_IDS.CREATE_DRIVING_LESSON}
          status={drivingLessonStatus}
        >
          <BookLessonWidget/>
        </ModalTemplate>

      </View>
    )
  }
}

const styles = {
  agendaWrapper: {
    flex: 1,
    height: 600
  },
  customAgendaThemeConfig: {
    'stylesheet.agenda.list': {
      day: {
        marginTop: 0,
        width: 0,
      }
    }
  },
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
  },
  changeEmployeeBtn: {
    fontSize: Fonts.size.small
  }
};

const mapStateToProps = state => {
  return {
    slotsAndLessonsForDay: slotsAndLessonsForDay(state),
    selectedSlots: selectedSlots(state),
    lessonInterval: lessonInterval(state),
    employeesDailySlots: dailySlotsForEachEmployee(state),
    selectedEmployee: state.employees.active[state.calendar.selectedEmployeeId],
    daySelected: state.calendar.daySelected,
    slotsStatus: state.slots.status,
    drivingLessonStatus: state.drivingLessons.status,
    session: state.session,
    drivingSchoolID: state.context.currentDrivingSchoolID,
    currentUser: state.user
  }
};

const mapDispatchToProps = (dispatch) => ({
  slotsIndexRequest: (params, daySelected) => dispatch(slotActionCreators.indexRequest(params, daySelected)),
  selectDay: day => dispatch(calendarActionCreators.setDay(day)),
  selectEmployee: id => dispatch(calendarActionCreators.selectEmployee(id)),
  saveSlots: slots => dispatch(slotActionCreators.save(slots)),
  displayToastMsg: msg => dispatch(toastActionCreators.displayToastMessage(msg)),
  setBookLessonParams: params => dispatch(bookLessonActionCreators.setParams(params)),
  openModal: id => dispatch(modalActionCreators.open(id)),
  resetDrivingLessonsStatus: () => dispatch(drivingLessonActionCreators.changeStatus(FETCHING_STATUS.READY))
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarScreen)
