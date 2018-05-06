/** == Built-in modules ================================ */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
import { View } from 'react-native';
import I18n from '../I18n';
import _ from 'lodash';
/** == Custom Components =============================== */
import AgendaWrapper from './AgendaWrapper';
import AvailableSlot from '../Components/Slots/AvailableSlot';
import LockedSlot from '../Containers/Slots/LockedSlot';
import DrivingLessonCell from '../Components/Slots/DriveSlot';
import SelectedSlotComponent from '../Components/Slots/SelectedSlot';
import BreakSlot from '../Components/Slots/BreakSlot';
import InfoBox from '../Components/InfoBox';
import { WastedSlot } from '../Components/Slots/WastedSlot';
import { BookLessonActionBar } from './BookLessonActionBar';
/** == Action Creators ================================ */
import { employeeDailyAgendaActionCreators } from '../Redux/Views/AgendaRedux';
import { modalActionCreators } from '../Redux/Views/Modals/ModalRedux';
import { slotActionCreators } from '../Redux/Entities/SlotsRedux';
import { toastActionCreators } from '../Redux/Support/ToastRedux';
import { cancelDrivingLessonModalActionCreators } from '../Redux/Views/Modals/CancelDrivingLesson';
import { bookLessonActionCreators } from '../Redux/Views/Modals/BookLesson';
import { drivingLessonActionCreators } from '../Redux/Entities/DrivingLessonRedux';
/** == Selectors ====================================== */
import {
  getEmployeeDailyAgenda,
  getSelectedSlots,
  getLessonInterval,
  getSlotsIndexParamsForEmployeeDailyAgenda
} from '../Selectors/Slots';
import { getCurrentDrivingSchool } from '../Selectors/DrivingSchool';
/** == Utilities ====================================== */
import withRequiredData from '../HOC/withRequiredData';
import { timeHelpers } from '../Lib/timeHandlers';
/** == Constants ====================================== */
import { MODALS_IDS } from '../Redux/Views/Modals/ModalRedux';
import { FETCHING_STATUS } from '../Lib/utils';
/** == Sockets ======================================== */
import { EmployeeSlotsSocket } from './EmployeeSlotsSocket';

class EmployeeDailyAgenda extends Component {
  constructor(props) {
    super(props);

    this.socket = new EmployeeSlotsSocket(
      props.session,
      props.employeeId,
      props.currentSchool.id,
      props.saveSlots,
      this.handleLessonChanged,
      props.displayToastMsg.bind(this, I18n.t('lost_connection_with_server'))
    )
  }

  handleLessonChanged = lesson => {
    switch(lesson.status) {
      case 'canceled':
        const slotsToRelease = this.props.allSlots
                                   .filter(slot => slot.driving_lesson_id === lesson.id)
                                   .map(slot => {
                                     slot.release_at = null;

                                     return slot;
                                   });
        if(slotsToRelease.length > 0)
          this.props.saveSlots(slotsToRelease);

        break;
      case 'active':
        this.props.saveLesson(lesson);
        this.props.saveSlots(lesson.slots);
        break;
    }
  };

  componentWillUnmount() {
    this.unlockSelectedSlots();
  }

  onDaySelected = date => {
    this.unlockSelectedSlots();
    const { dateString } = date;
    const {
      requestData,
      setDay,
      cacheHistory,
      requestDataArguments,
      currentSchool: { time_zone }
    } = this.props;

    setDay(dateString);

    if (timeHelpers.isCacheStale(dateString, cacheHistory, time_zone))
      requestData(requestDataArguments);
  };

  unlockSelectedSlots = () => {
    const { selectedSlots } = this.props;
    this.releaseSlots(selectedSlots);

    _.each(selectedSlots, this.socket.unlockSlot);
  };

  unLockSlot = slot => () => {
    this.releaseSlots(slot);
    this.socket.unlockSlot(slot);
  };

  renderAgendaItem = slot => {
    let agendaItem;
    const { selectedSlots, currentUser } = this.props;

    if (slot.isWasted) {
      agendaItem = <WastedSlot slot={slot}/>
    } else if (slot.isBreakSlot) {
      agendaItem = <BreakSlot slot={slot}/>
    } else if ( slot.isLesson ) {
      agendaItem = <DrivingLessonCell
        currentUser={currentUser}
        onPress={this.prepareCancelLessonModal(slot)}
        employee={slot.employee || {} }
        student={slot.student || {} }
        slot={slot}/>
    } else if ( moment(slot.release_at).isAfter(moment()) ) {
      if (currentUser.id === slot.locking_user_id) {
        const isFirst = selectedSlots[0] && slot.id === selectedSlots[0].id;
        const isLast = slot.id === (_.last(selectedSlots) || {}).id;
        const onCancelPress = (isFirst || isLast) && this.unLockSlot(slot);

        agendaItem = <SelectedSlotComponent slot={slot} isFirst={isFirst} isLast={isLast} onPressCancel={onCancelPress}/>
      } else {
        agendaItem = <LockedSlot slot={slot} handleTimeout={this.releaseSlots.bind(this, slot)} />
      }
    } else if ( slot.driving_lesson_id === null ) {
      agendaItem = <AvailableSlot slot={slot} onPressIn={this.lockSlot(slot)}/>;
    }

    return agendaItem;
  };

  releaseSlots = slots => {
    const releasedSlot = _.flattenDeep([slots]).map(slot => {
      const releasedSlot = _.cloneDeep(slot);
      releasedSlot.release_at = null;
      return releasedSlot;
    });

    this.props.saveSlots(releasedSlot);
  };

  lockSlot = slot => () => {
    const {
      selectedSlots,
      currentUser,
      scheduleSettings: {
        maximum_slots_count_per_driving_lesson,
      }
    } = this.props;

    // max lesson time validation
    if ( selectedSlots.length === maximum_slots_count_per_driving_lesson ) {
      this.props.displayToastMsg(I18n.t('max_lesson_time_exceeded'));
      return;
    }

    // adjacency validation
    const firstOfSelected = _.first(selectedSlots);
    const lastOfSelected = _.last(selectedSlots);
    let isAdjacent = false;

    if(selectedSlots.length === 0) {
      isAdjacent = true;
    } else {
      const adjacentToBeginningOfSelectionBlock  = moment(slot.start_time)
        .add(30, 'minutes')
        .diff(firstOfSelected.start_time) === 0;

      const adjacentToEndOfSelectionBlock  = moment(slot.start_time)
        .subtract(30, 'minutes')
        .diff(lastOfSelected.start_time) === 0;

      if (adjacentToBeginningOfSelectionBlock || adjacentToEndOfSelectionBlock)
        isAdjacent = true;
    }

    if (!isAdjacent) {
      this.props.displayToastMsg(I18n.t('slots_not_adjacent'));
      return;
    }

    // If valid selection - lock slot

    const release_at = moment().add(120, 'seconds').format();
    const lockedSlot = _.cloneDeep(slot);
    lockedSlot.release_at = release_at;
    lockedSlot.locking_user_id = currentUser.id;
    this.props.saveSlots(lockedSlot);

    this.socket.lockSlot(slot);
  };

  prepareCancelLessonModal = lesson => () => {
    this.props.initCancelLessonModal(lesson);
    this.props.openModal(MODALS_IDS.CANCEL_DRIVING_LESSON)
  };

  leftInvalidSpace = () => {
    const {
      selectedSlots,
      scheduleSettings: {
        minimum_slots_count_per_driving_lesson
      },
      employeeDailyAgendaItems
    } = this.props;

    const agendaItems = _.values(employeeDailyAgendaItems)[0];

    const firstOfSelected = _.first(selectedSlots);
    const lastOfSelected = _.last(selectedSlots);

    const startOfSelectionIndex = agendaItems.findIndex(
      s => _.isEqual(s, firstOfSelected));
    const endOfSelectionIndex = agendaItems.findIndex(
      s => _.isEqual(s, lastOfSelected));

    let backwardIterator = startOfSelectionIndex;
    let forwardIterator = endOfSelectionIndex;

    const availableSlot = slot => slot.driving_lesson_id === null &&
      moment(slot.start_time).isAfter();

    const forwardEndCondition = index => ( index === agendaItems.length )
      ||
      ( !availableSlot(agendaItems[index]) && index > endOfSelectionIndex );

    const backwardEndCondition = index => ( index === -1 )
      ||
      ( !availableSlot(agendaItems[index]) && index < startOfSelectionIndex );

    do {
      if ( !forwardEndCondition(forwardIterator) )
        forwardIterator++;
      if ( !backwardEndCondition(backwardIterator) )
        backwardIterator--;
    } while (!forwardEndCondition(forwardIterator) ||
    !backwardEndCondition(backwardIterator));

    const invalidGapBeforeSelection = ( ( Math.abs(startOfSelectionIndex -
      backwardIterator) - 1 ) % minimum_slots_count_per_driving_lesson )
      !== 0;
    const invalidGapAfterSelection = ( ( Math.abs(forwardIterator -
      endOfSelectionIndex) - 1 ) % minimum_slots_count_per_driving_lesson )
      !== 0;

    return invalidGapBeforeSelection || invalidGapAfterSelection;
  };

  handleBookLessonBtnPress = () => {
    if (this.leftInvalidSpace()) {
      this.props.displayToastMsg(I18n.t('invalid_gap_around_selection'));
      return;
    }

    const {
      selectedSlots,
      drivingSchoolID,
      lessonInterval,
      currentUser,
      selectedDay,
      employeeId,
      setBookLessonParams,
      navigation: { navigate }
    } = this.props;

    const bookLessonParams = {
      employee_id: employeeId,
      driving_school_id: drivingSchoolID,
      fromHour: lessonInterval.from,
      toHour: lessonInterval.to,
      date: selectedDay,
      status: FETCHING_STATUS.READY,
      student_id: currentUser.id,
      slot_ids: selectedSlots.map(slot => slot.id)
    };

    setBookLessonParams(bookLessonParams);

    if(currentUser.type === 'Employee') {
      navigate('searchStudent', { onResultPress: this.onStudentsSelected })
    } else if (currentUser.type === 'Student') {
      this.props.openModal(MODALS_IDS.CREATE_DRIVING_LESSON);
    }
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
      selectedSlots,
      currentUser,
      scheduleSettings: { minimum_slots_count_per_driving_lesson }
    } = this.props;


    const emptyDayLabels = ['title', 'description'].map(
      key => I18n.t(`employee_daily_agenda_day_empty.${currentUser.type.toLowerCase()}_perspective.${key}`));

    return (
      <View style={{flex: 1}}>
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
          items={employeeDailyAgendaItems}
          renderItem={this.renderAgendaItem}
        />
        <BookLessonActionBar
          minimum_slots_count_per_driving_lesson={minimum_slots_count_per_driving_lesson}
          selectedSlots={selectedSlots}
          lessonInterval={lessonInterval}
          handleBookLessonBtnPress={this.handleBookLessonBtnPress}
          unlockSelectedSlots={this.unlockSelectedSlots}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  status: state.views.employeeDailyAgenda.status,
  allSlots: _.values(state.entities.slots.data),
  employeeDailyAgendaItems: getEmployeeDailyAgenda(state),
  selectedDay: state.views.employeeDailyAgenda.daySelected,
  employeeId: state.views.employeeDailyAgenda.employeeId,
  currentUser: state.access.currentUser,
  session: state.access.session,
  currentSchool: getCurrentDrivingSchool(state),
  selectedSlots: getSelectedSlots(state),
  lessonInterval: getLessonInterval(state),
  cacheHistory: state.views.employeeDailyAgenda.cacheHistory,
  scheduleSettings: state.entities.scheduleSettings,
  requestDataArguments: { slotsPayload: getSlotsIndexParamsForEmployeeDailyAgenda(state) }
});

const mapDispatchToProps = dispatch => ({
  requestData: payloads => dispatch(employeeDailyAgendaActionCreators.requestDataForView(payloads)),
  setDay: day => dispatch(employeeDailyAgendaActionCreators.setDay(day)),
  saveSlots: slots => dispatch(slotActionCreators.save(slots)),
  saveLesson: lesson => dispatch(drivingLessonActionCreators.save(lesson)),
  displayToastMsg: msg => dispatch(toastActionCreators.displayToastMessage(msg)),
  openModal: id => dispatch(modalActionCreators.open(id)),
  setBookLessonParams: params => dispatch(bookLessonActionCreators.setParams(params)),
  initCancelLessonModal: lesson => dispatch(cancelDrivingLessonModalActionCreators.init(lesson))
});

const withAsyncLoading = withRequiredData(
  EmployeeDailyAgenda,
  'status',
  'requestData',
  'requestDataArguments'
);

export default connect(mapStateToProps, mapDispatchToProps)(withAsyncLoading);
