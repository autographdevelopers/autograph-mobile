/** Built-in modules */
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment/moment';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Feather';
/** Custom modules */
import { MODALS_IDS, modalActionCreators } from '../Redux/Views/Modals/ModalRedux';
import { DRIVING_LESSON_STATUSES, } from '../Lib/DrivingLessonHelpers';
import { Fonts, Colors } from '../Themes/';

import DrivingLessonsList from '../Containers/DrivingLessonsList';
import DrivingLessonsFilter from '../Components/DrivingLessonsFilter';
import ModalTemplate from '../Components/ModalTemplate';
import { drivingLessonsScreenActionCreators } from '../Redux/Views/DrivingLessonsScreenRedux';
import withRequiredData from '../HOC/withRequiredData';

/** Screen */
class DrivingLessonsFullListScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: DRIVING_LESSON_STATUSES.ALL,
      fromDate: null,
      toDate: null
    }
  }

  componentWillUnmount() {
    this.props.resetListState();
  }

  fromDateFilter = (drivingLesson, fromDate) =>
    !!!fromDate || moment(fromDate).startOf('day').isBefore(drivingLesson.start_time)

  toDateFilter = (drivingLesson, toDate) =>
    !!!toDate || moment(toDate).endOf('day').isAfter(drivingLesson.start_time)

  typeFilter = (drivingLesson, type) =>
    type === DRIVING_LESSON_STATUSES.ALL || drivingLesson.status === type

  onApplyFilters = (type, fromDate, toDate) =>
    this.setState({type, fromDate, toDate}, this.props.closeModal)

  filteredDrivingLessons = () => {
    const { type, fromDate, toDate } = this.state;
    const { drivingLessons, lessonsIds } = this.props;

    return lessonsIds.map(id => drivingLessons.hashMap[id]).filter(drivingLesson =>
      this.fromDateFilter(drivingLesson, fromDate) &&
        this.toDateFilter(drivingLesson, toDate) &&
          this.typeFilter(drivingLesson, type)
    )
  };

  render() {
    return(
      <View style={{flex: 1}}>
        <DrivingLessonsList
          drivingLessons={this.filteredDrivingLessons()}
          userContext={'employee'}
          scrollEnabled={true}
        />

        <ActionButton onPress={() => this.props.openModal(MODALS_IDS.FILTER_DRIVING_LESSON)}
                      renderIcon={()=><Icon name="filter" size={20} color={Colors.primaryWarm} />}
                      buttonColor={Colors.lightGrey}
        />

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
  drivingLessons: state.entities.drivingLessons,
  lessonsIds: state.views.drivingLessonsScreen.ids,
  status: state.views.drivingLessonsScreen.status
});

const mapDispatchToProps = (dispatch, otherProps) => {
  const payloads = {
    lessonsParams: otherProps.navigation.state.params.lessonsParams
  };

  return {
    requestDataForView: () => dispatch(drivingLessonsScreenActionCreators.requestDataForView({payloads})),
    openModal: (modalId) => dispatch(modalActionCreators.open(modalId)),
    closeModal: () => dispatch(modalActionCreators.close()),
    resetListState: () => dispatch(drivingLessonsScreenActionCreators.resetState())
  }
};

const withAsyncLoading = withRequiredData(
  DrivingLessonsFullListScreen,
  'status',
  'requestDataForView',
);

export default connect(mapStateToProps, mapDispatchToProps)(withAsyncLoading)
