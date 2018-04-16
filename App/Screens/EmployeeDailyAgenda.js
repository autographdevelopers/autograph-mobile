/** == Built-in modules ================================ */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
import { View } from 'react-native';
import _ from 'lodash';
/** == Custom Components =============================== */
import AgendaWrapper from './AgendaWrapper';
import AvailableSlot from '../Components/Slots/AvailableSlot';
import LockedSlot from '../Containers/Slots/LockedSlot';
import DrivingLessonCell from '../Components/Slots/DriveSlot';
import SelectedSlotComponent from '../Components/Slots/SelectedSlot';
import BreakSlot from '../Components/Slots/BreakSlot';
import BlockButton from '../Components/BlockButton';
import BookLessonTimeoutCounter from '../Components/BookLessonTimeoutCounter';
/** == Action Creators ================================ */
import { employeeDailyAgendaActionCreators } from '../Redux/AgendaRedux';
import { drivingLessonActionCreators } from '../Redux/DrivingLessonRedux';
import { modalActionCreators } from '../Redux/ModalRedux';
import { slotActionCreators } from '../Redux/SlotsRedux';
import { toastActionCreators } from '../Redux/ToastRedux';
import { WastedSlot } from '../Components/Slots/WastedSlot';
import { cancelDrivingLessonModalActionCreators } from '../Redux/Modals/CancelDrivingLesson';
import { bookLessonActionCreators } from '../Redux/Modals/BookLesson';
/** == Utilities ====================================== */
import {
  getEmployeeDailyAgenda,
  getSelectedSlots,
  getLessonInterval
} from '../Selectors/slots';
import I18n from '../I18n';
import { timeHelpers } from '../Lib/timeHandlers';
import { Colors, Fonts } from '../Themes/';
import withRequiredData from '../Containers/withRequiredData';
/** == Constants ====================================== */
import { MODALS_IDS } from '../Redux/ModalRedux';
import { SLOTS_FETCHED_CALLBACKS } from '../Redux/SlotsRedux';
import { FETCHING_STATUS } from '../Lib/utils';
/** == Sockets ======================================== */
import { EmployeeSlotsSocket } from './EmployeeSlotsSocket';

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

  componentWillUnmount() {
    this.unlockSelectedSlots();
  }

  _buildParams = date => {
    const { time_zone } = this.props.currentSchool;

    return {
      employee_id: this.props.employeeId,
      ...timeHelpers.getWeekRange(date, time_zone)
    }
  };

  onDaySelected = date => {
    this.unlockSelectedSlots();
    const { dateString } = date;
    const { slotsIndexRequest, setDay, cacheHistory, currentSchool: { time_zone } } = this.props;
    setDay(dateString);

    if (timeHelpers.isCacheStale(dateString, cacheHistory, time_zone)) {
      const params = this._buildParams(dateString);

      slotsIndexRequest(
        params,
        SLOTS_FETCHED_CALLBACKS.DAILY_AGENDA_PUSH_CACHE_HISTORY
      );
    }
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

  renderAgendaItem = (slot, dsas) => {
    let agendaItem;
    const { selectedSlots, currentUser } = this.props;

    if (slot.isWasted) {
      agendaItem = <WastedSlot slot={slot}/>
    } else if (slot.isBreakSlot) {
      agendaItem = <BreakSlot slot={slot}/>
    } else if ( slot.employee && slot.student && slot.slots ) {
      agendaItem = <DrivingLessonCell
        onPress={this.prepareCancelLessonModal(slot)}
        employee={slot.employee}
        student={slot.student}
        slots={slot.slots}/>
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
      scheduleSettings: { maximum_slots_count_per_driving_lesson }
    } = this.props;

    if ( selectedSlots.length === maximum_slots_count_per_driving_lesson ) {
      this.props.displayToastMsg(I18n.t('max_lesson_time_exceeded'));
      return;
    }

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
    const release_at = moment().add(11, 'seconds').format();
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
      status: FETCHING_STATUS.READY,
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
      selectedSlots,
      scheduleSettings: { minimum_slots_count_per_driving_lesson }
    } = this.props;

    const slotsSelected = selectedSlots.length > 0;
    const tooFewSlotsSelected = slotsSelected && selectedSlots.length < minimum_slots_count_per_driving_lesson;
    const enoughSlotsSelected = slotsSelected && selectedSlots.length >= minimum_slots_count_per_driving_lesson;

    return (
      <View style={{flex: 1}}>
        <AgendaWrapper
          selected={selectedDay}
          onDayPress={this.onDaySelected}
          items={employeeDailyAgendaItems}
          renderItem={this.renderAgendaItem}
        />
        { tooFewSlotsSelected &&
          <BlockButton customContainerStyles={{backgroundColor: Colors.salmon}} disabled={true}>
            {`Zaznacz co najmniej ${minimum_slots_count_per_driving_lesson} sloty by stworzyc lekcję`}
          </BlockButton>
        }
        { enoughSlotsSelected &&
          <BlockButton onPress={this.handleBookLessonBtnPress}>
            {`Umów jazdę ${lessonInterval.from} - ${lessonInterval.to} ->`}
          </BlockButton>
        }
        { slotsSelected &&
          <BookLessonTimeoutCounter
            submaskColor={enoughSlotsSelected ? Colors.primaryWarm : Colors.salmon}
            release_at={selectedSlots[0].release_at}
            handleTimeout={this.unlockSelectedSlots}/>
        }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  slotsStatus: state.slots.status,
  employeeDailyAgendaItems: getEmployeeDailyAgenda(state),
  employees: state.employees.active,
  selectedDay: state.employeeDailyAgenda.daySelected,
  fetchedDataBoundaries: state.employeeDailyAgenda.fetchedDataBoundaries,
  employeeId: state.employeeDailyAgenda.employeeId,
  currentUser: state.user,
  session: state.session,
  schoolId: state.context.currentDrivingSchoolID,
  currentSchool: state.drivingSchools.hashMap[state.context.currentDrivingSchoolID],
  selectedSlots: getSelectedSlots(state),
  lessonInterval: getLessonInterval(state),
  drivingLessonStatus: state.drivingLessons.status,
  cacheHistory: state.employeeDailyAgenda.cacheHistory,
  scheduleSettings: state.scheduleSettings
});

const mapDispatchToProps = dispatch => ({
  slotsIndexRequest: (params, callback) => dispatch(slotActionCreators.indexRequest(params, callback)),
  setDay: day => dispatch(employeeDailyAgendaActionCreators.setDay(day)),
  saveSlots: slots => dispatch(slotActionCreators.save(slots)),
  displayToastMsg: msg => dispatch(toastActionCreators.displayToastMessage(msg)),
  openModal: id => dispatch(modalActionCreators.open(id)),
  setBookLessonParams: params => dispatch(bookLessonActionCreators.setParams(params)),
  resetDrivingLessonsStatus: () => dispatch(drivingLessonActionCreators.changeStatus(FETCHING_STATUS.READY)),
  initCancelLessonModal: lesson => dispatch(cancelDrivingLessonModalActionCreators.init(lesson))
});

const withAsyncLoading = withRequiredData(
  EmployeeDailyAgenda,
  ['slotsStatus']
);

export default connect(mapStateToProps, mapDispatchToProps)(withAsyncLoading);
