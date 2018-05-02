/** Built-in modules */
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment/moment';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Feather';
/** Custom modules */
import { drivingLessonActionCreators } from '../Redux/Entities/DrivingLessonRedux';
import { MODALS_IDS, modalActionCreators } from '../Redux/Views/Modals/ModalRedux';
import { FETCHING_STATUS } from '../Lib/utils';
import {
  AFTER_SAVE_CALLBACKS,
  DRIVING_LESSON_STATUSES,
} from '../Lib/DrivingLessonHelpers';
import { Fonts, Colors } from '../Themes/';

import DrivingLessonsList from '../Containers/DrivingLessonsList';
import DrivingLessonsFilter from '../Components/DrivingLessonsFilter';
import ModalTemplate from '../Components/ModalTemplate';
import SpinnerView from '../Components/SpinnerView';

/** Screen */
class DrivingLessonsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: DRIVING_LESSON_STATUSES.ALL,
      fromDate: null,
      toDate: null
    }
  }

  componentWillMount() {
    this.props.fetchDrivingLessons({
      student_id: this.props.navigation.state.params.studentId,
      employee_id: this.props.navigation.state.params.employeeId,
    })
  }

  fromDateFilter = (drivingLesson, fromDate) =>
    !!!fromDate || moment(fromDate).startOf('day').isBefore(drivingLesson.start_time)

  toDateFilter = (drivingLesson, toDate) =>
    !!!toDate || moment(toDate).endOf('day').isAfter(drivingLesson.start_time)

  typeFilter = (drivingLesson, type) =>
    type === DRIVING_LESSON_STATUSES.ALL || drivingLesson.status === type

  onApplyFilters = (type, fromDate, toDate) =>
    this.setState({type, fromDate, toDate}, this.props.closeModal)

  filteredDrivingLessons = (drivingLessons) => {
    const { type, fromDate, toDate } = this.state;

    return drivingLessons.allIDs.map(id => drivingLessons.hashMap[id]).filter(drivingLesson =>
      this.fromDateFilter(drivingLesson, fromDate) &&
        this.toDateFilter(drivingLesson, toDate) &&
          this.typeFilter(drivingLesson, type)
    )
  }

  render() {
    const { drivingLessons } = this.props;

    return(
      <View style={{flex: 1}}>
        { drivingLessons.status === FETCHING_STATUS.FETCHING ? <SpinnerView /> :
          <DrivingLessonsList
            drivingLessons={this.filteredDrivingLessons(drivingLessons)}
            userContext={'employee'}
            fetchingStatus={drivingLessons.status}
            scrollEnabled={true}
          />
        }

        <ActionButton onPress={() => this.props.openModal(MODALS_IDS.FILTER_DRIVING_LESSON)}
                      renderIcon={()=><Icon name="filter" size={20} color={Colors.primaryWarm} />}
                      buttonColor={Colors.lightGrey}
        >
        </ActionButton>

        <ModalTemplate
          customContainerStyle={{width: null}}
          modalID={MODALS_IDS.FILTER_DRIVING_LESSON}>
          <DrivingLessonsFilter
            onPress={(type, fromDate, toDate) => this.onApplyFilters(type, fromDate, toDate)}
            type={this.state.type}
            fromDate={this.state.fromDate}
            toDate={this.state.toDate}
          />
        </ModalTemplate>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  drivingLessons: state.entities.drivingLessons
});

const mapDispatchToProps = dispatch => ({
  fetchDrivingLessons: (params) => dispatch(drivingLessonActionCreators.indexRequest(params, AFTER_SAVE_CALLBACKS.OVERRIDE_ID)),
  openModal: (modalId) => dispatch(modalActionCreators.open(modalId)),
  closeModal: () => dispatch(modalActionCreators.close())
});

export default connect(mapStateToProps, mapDispatchToProps)(DrivingLessonsScreen)
