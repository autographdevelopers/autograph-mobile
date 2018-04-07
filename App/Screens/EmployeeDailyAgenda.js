/** == Built-in modules ================================ */
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
/** == Custom Components =============================== */
import AgendaWrapper from './AgendaWrapper';
import ModalTemplate from '../Components/ModalTemplate';
import ButtonPrimary from '../Components/ButtonPrimary';
import BookLessonWidget from '../Components/BookLessonWidget';
import AvailableSlot from '../Components/Slots/FreeSlot';
import LockedSlot from '../Containers/Slots/LockedSlot';
import DrivingLessonCell from '../Components/Slots/DriveSlot';
/** == Action Creators ================================ */
import { employeeDailyAgendaActionCreators } from '../Redux/employeeDailyAgendaRedux';
import { modalActionCreators } from '../Redux/ModalRedux';
import { slotActionCreators } from '../Redux/SlotsRedux';
import { toastActionCreators } from '../Redux/ToastRedux';
import { bookLessonActionCreators } from '../Redux/BookLesson';
/** == Utilities ====================================== */
import {
  getEmployeeDailyAgenda,
  getSelectedSlots,
  getLessonInterval
} from '../Selectors/slots';
import I18n from '../I18n';
import moment from 'moment';
import _ from 'lodash';
/** == Sockets ======================================== */
import { EmployeeSlotsSocket } from './EmployeeSlotsSocket';
import { MODALS_IDS } from '../Redux/ModalRedux';
import { FETCHING_STATUS } from '../Lib/utils';
import { drivingLessonActionCreators } from '../Redux/DrivingLessonRedux';


class EmployeeDailyAgenda extends Component {
  constructor(props) {
    super(props);

    this.socket = new EmployeeSlotsSocket(
      props.session,
      props.employeeId,
      props.schoolId,
      props.saveSlots,
      props.displayToastMsg.bind(this, I18n.t('lost_connection_with_server'))
    )
  }

  componentWillMount() {
    const { selectedDay, slotsIndexRequest } = this.props;
    const params = this._buildParams(selectedDay);

    slotsIndexRequest(params);
  }

  componentWillUnmount() {
    this.unLockAllSlots();
  }

  _buildParams = date => ({
    employee_id: this.props.employeeId,
    by_start_time: {
      from: date,
      to: date
    }
  });

  onDaySelected = date => {
    this.unLockAllSlots();
    const { dateString } = date;
    const { slotsIndexRequest, setDay } = this.props;
    const params = this._buildParams(dateString);

    slotsIndexRequest(params);
    setDay(dateString);
  };

  unLockAllSlots = () => {
    _.each(this.props.selectedSlots, this.socket.unlockSlot);
  };

  renderAgendaItem = (slot, _) => {
    let agendaItem;
    if ( slot.employee && slot.student && slot.slots ) {

      agendaItem = <DrivingLessonCell employee={slot.employee}
                                student={slot.student}
                                slots={slot.slots}/>
    } else if ( moment(slot.release_at).isAfter(moment()) ) {
        const onCancelPress = this.isOnEdgeOfSelection(slot) ?
          () => this.socket.unlockSlot(slot):
          false;

      agendaItem = <LockedSlot slot={slot}
                           handleTimeout={this.releaseSlot(slot)}
                           onPressCancel={onCancelPress}
                           lockedByCurrentUser={this.props.currentUser.id === slot.locking_user_id}
              />
    } else if ( slot.driving_lesson_id === null ) {
      agendaItem = <AvailableSlot slot={slot} onPress={this.lockSlot}/>;
    }


    return agendaItem;
  };

  isOnEdgeOfSelection = slot => {
    const { selectedSlots } = this.props;
    const firstSlotInSelection = _.first(selectedSlots);
    const lastSlotInSelection = _.last(selectedSlots);

    const edgeSlotsIds = [firstSlotInSelection, lastSlotInSelection].map(slot => slot.id);

    return edgeSlotsIds.includes(slot.id);
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
        .diff(firstOfSelected.start_time) === 0;

      const adjacentToEndOfSelectionBlock  = moment(slot.start_time)
        .subtract(30, 'minutes')
        .diff(lastOfSelected.start_time) === 0;

      if (adjacentToBeginningOfSelectionBlock || adjacentToEndOfSelectionBlock)
        isSlotAValidSelection = true;
    }

    if (isSlotAValidSelection) {
      this.socket.lockSlot(slot);
    } else {
      this.props.displayToastMsg(I18n.t('slots_not_adjacent'));
    }
  };

  handleBookLessonBtnPress = () => {
    const {
      selectedSlots,
      drivingSchoolID,
      lessonInterval,
      selectedDay,
      employeeId,
      setBookLessonParams,
      resetDrivingLessonsStatus,
      navigation: { navigate }
    } = this.props;

    const bookLessonParams = {
      employee_id: employeeId,
      driving_school_id: drivingSchoolID,
      fromHour: lessonInterval.from,
      toHour: lessonInterval.to,
      date: selectedDay,
      slot_ids: selectedSlots.map(slot => slot.id)
    };

    resetDrivingLessonsStatus();
    setBookLessonParams(bookLessonParams);

    navigate('searchStudent', { onResultPress: this.onStudentsSelected })
  };

  onStudentsSelected = id => {
    this.props.setBookLessonParams({student_id: id});

    this.props.navigation.goBack(null);
    this.props.openModal(MODALS_IDS.CREATE_DRIVING_LESSON);
  };


  render() {
    const {
      employeeDailyAgendaItems,
      selectedDay,
      lessonInterval,
      drivingLessonStatus
    } = this.props;

    return (
      <View style={{flex: 1}}>
        <AgendaWrapper
          selected={selectedDay}
          onDayPress={this.onDaySelected}
          items={employeeDailyAgendaItems}
          renderItem={this.renderAgendaItem}
        />
        { lessonInterval &&
        <ButtonPrimary customWrapperStyles={{minWidth: '70%'}} onPress={this.handleBookLessonBtnPress}>
          {`Umów jazdę ${lessonInterval.from} - ${lessonInterval.to}`}
        </ButtonPrimary> }

        <ModalTemplate
          modalID={MODALS_IDS.CREATE_DRIVING_LESSON}
          status={drivingLessonStatus}
        >
          <BookLessonWidget/>
        </ModalTemplate>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  employeeDailyAgendaItems: getEmployeeDailyAgenda(state),
  employees: state.employees.active,
  selectedDay: state.employeeDailyAgenda.daySelected,
  fetchedDataBoundaries: state.employeeDailyAgenda.fetchedDataBoundaries,
  employeeId: state.employeeDailyAgenda.employeeId,
  currentUser: state.user,
  session: state.session,
  schoolId: state.context.currentDrivingSchoolID,
  selectedSlots: getSelectedSlots(state),
  lessonInterval: getLessonInterval(state),
  drivingLessonStatus: state.drivingLessons.status,
});

const mapDispatchToProps = dispatch => ({
  slotsIndexRequest: params => dispatch(slotActionCreators.indexRequest(params)),
  setDay: day => dispatch(employeeDailyAgendaActionCreators.setDay(day)),
  saveSlots: slots => dispatch(slotActionCreators.save(slots)),
  displayToastMsg: msg => dispatch(toastActionCreators.displayToastMessage(msg)),
  openModal: id => dispatch(modalActionCreators.open(id)),
  setBookLessonParams: params => dispatch(bookLessonActionCreators.setParams(params)),
  resetDrivingLessonsStatus: () => dispatch(drivingLessonActionCreators.changeStatus(FETCHING_STATUS.READY))
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDailyAgenda);
