/** Built-in modules */
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment/moment';
/** Custom modules */
import { drivingLessonActionCreators } from '../Redux/DrivingLessonRedux';
import { MODALS_IDS, modalActionCreators } from '../Redux/ModalRedux';

import FullScreenInformation from '../Components/FullScreenInformation';
import Layout from '../Components/Layout';
import FilterButton from '../Components/FilterButton';
import DrivingLessonsFilter from '../Components/DrivingLessonsFilter';
import DrivingLessonsList from '../Containers/DrivingLessonsList';
import ModalTemplate from '../Components/ModalTemplate';

import { FETCHING_STATUS } from '../Lib/utils';
import { DRIVING_LESSON_TYPES } from '../Lib/DrivingLessonHelpers';

import { Fonts, Colors } from '../Themes/';

/** Screen */
class DrivingLessonsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: DRIVING_LESSON_TYPES.ALL,
      fromDate: null,
      toDate: null
    }
  }

  componentDidMount() {
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
    type === DRIVING_LESSON_TYPES.ALL || drivingLesson.status === type

  onApplyFilters = (type, fromDate, toDate) =>
    this.setState({type, fromDate, toDate}, this.props.closeModal)

  filteredDrivingLessons = () => {
    const drivingLessons = this.props.drivingLessons;
    const { type, fromDate, toDate } = this.state;

    return drivingLessons.allIDs.map(id => drivingLessons.hashMap[id]).filter(drivingLesson =>
      this.fromDateFilter(drivingLesson, fromDate) &&
        this.toDateFilter(drivingLesson, toDate) &&
          this.typeFilter(drivingLesson, type)
    )
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <DrivingLessonsList
          drivingLessons={this.filteredDrivingLessons()}
          userContext={'employee'}
          fetchingStatus={this.props.drivingLessons.status}
          scrollEnabled={true}
        />

        <FilterButton
          onPress={() => this.props.openModal(MODALS_IDS.FILTER_DRIVING_LESSON)} />

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
  drivingLessons: state.drivingLessons
});

const mapDispatchToProps = dispatch => ({
  fetchDrivingLessons: (params) => dispatch(drivingLessonActionCreators.indexRequest(params)),
  openModal: (modalId) => dispatch(modalActionCreators.open(modalId)),
  closeModal: () => dispatch(modalActionCreators.close())
});

export default connect(mapStateToProps, mapDispatchToProps)(DrivingLessonsScreen)
