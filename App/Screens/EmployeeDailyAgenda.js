/** == Built-in modules ================================ */
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
import _ from 'lodash';
/** == Custom Components =============================== */
import AgendaWrapper from './AgendaWrapper';
import ModalTemplate from '../Components/ModalTemplate';
import BookLessonWidget from '../Components/BookLessonWidget';
import AvailableSlot from '../Components/Slots/AvailableSlot';
import LockedSlot from '../Containers/Slots/LockedSlot';
import DrivingLessonCell from '../Components/Slots/DriveSlot';
import BreakSlot from '../Components/Slots/BreakSlot';
import BlockButton from '../Components/BlockButton';
/** == Action Creators ================================ */
import { employeeDailyAgendaActionCreators } from '../Redux/AgendaRedux';
import { drivingLessonActionCreators } from '../Redux/DrivingLessonRedux';
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
import { timeHelpers } from '../Lib/timeHandlers';
import { Colors, Fonts } from '../Themes/';
/** == Constants ====================================== */
import { MODALS_IDS } from '../Redux/ModalRedux';
import { SLOTS_FETCHED_CALLBACKS } from '../Redux/SlotsRedux';
import { FETCHING_STATUS } from '../Lib/utils';
/** == Sockets ======================================== */
import { EmployeeSlotsSocket } from './EmployeeSlotsSocket';
import { WastedSlot } from '../Components/Slots/WastedSlot';

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

    slotsIndexRequest(params, SLOTS_FETCHED_CALLBACKS.DAILY_AGENDA_PUSH_CACHE_HISTORY);
  }

  componentWillUnmount() {
    this.unLockAllSlots();
  }

  _buildParams = date => {
    const { time_zone } = this.props.currentSchool;

    return {
      employee_id: this.props.employeeId,
      ...timeHelpers.getWeekRange(date, time_zone)
    }
  };

  onDaySelected = date => {
    this.unLockAllSlots();
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

  unLockAllSlots = () => {
    _.each(this.props.selectedSlots, this.socket.unlockSlot);
  };

  renderAgendaItem = (slot, dsas) => {
    let agendaItem;
    const { selectedSlots, currentUser } = this.props;

    if (slot.isWasted) {
      agendaItem = <WastedSlot slot={slot}/>
    } else if (slot.isBreakSlot) {
      agendaItem = <BreakSlot slot={slot}/>
    } else if ( slot.employee && slot.student && slot.slots ) {
      agendaItem = <DrivingLessonCell employee={slot.employee}
                                student={slot.student}
                                slots={slot.slots}/>
    } else if ( moment(slot.release_at).isAfter(moment()) ) {
        const onCancelPress = this.isOnEdgeOfSelection(slot) ?
          () => this.socket.unlockSlot(slot):
          false;
        const isFirst = selectedSlots[0] && slot.id === selectedSlots[0].id;
        const isLast = slot.id === (_.last(selectedSlots) || {}).id;

        agendaItem = <LockedSlot slot={slot}
                           handleTimeout={this.releaseSlot(slot)}
                           onPressCancel={onCancelPress}
                           lockedByCurrentUser={currentUser.id === slot.locking_user_id}
                           isFirst={isFirst}
                           isLast={isLast}
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
    const { selectedSlots, scheduleSettings: { maximum_slots_count_per_driving_lesson } } = this.props;
    console.log('this.props.selectedSlots');
    console.log(this.props.selectedSlots);
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

    this.socket.lockSlot(slot);
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
      drivingLessonStatus,
      selectedSlots,
      scheduleSettings: { minimum_slots_count_per_driving_lesson }
    } = this.props;

    const tooFewSlots = selectedSlots.length < minimum_slots_count_per_driving_lesson;

    console.log('employeeDailyAgendaItems');
    console.log(employeeDailyAgendaItems);

    return (
      <View style={{flex: 1}}>
        <AgendaWrapper
          selected={selectedDay}
          onDayPress={this.onDaySelected}
          items={employeeDailyAgendaItems}
          renderItem={this.renderAgendaItem}
        />
        { lessonInterval &&
          <BlockButton customWrapperStyles={{minWidth: '70%'}} customContainerStyles={tooFewSlots ? {backgroundColor: Colors.salmon} : {}}
            disabled={tooFewSlots}
                       onPress={this.handleBookLessonBtnPress}>
            {tooFewSlots ? `Zaznacz co najmniej ${minimum_slots_count_per_driving_lesson} sloty by stworzyc lekcję` : `Umów jazdę ${lessonInterval.from} - ${lessonInterval.to} ->`}
          </BlockButton>
        }

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
  resetDrivingLessonsStatus: () => dispatch(drivingLessonActionCreators.changeStatus(FETCHING_STATUS.READY))
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDailyAgenda);
