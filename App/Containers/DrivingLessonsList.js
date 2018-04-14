import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import moment from 'moment/moment';

import { Fonts, Colors } from '../Themes/index';
import { FETCHING_STATUS } from '../Lib/utils';
import { canModifySchedules, isStudent } from '../Lib/AuthorizationHelpers';

import { MODALS_IDS, modalActionCreators } from '../Redux/ModalRedux';
import { drivingLessonActionCreators } from '../Redux/DrivingLessonRedux';

import DefaultAvatar from '../Components/DefaultAvatar';
import ButtonText from '../Components/ButtonText';
import ModalTemplate from '../Components/ModalTemplate';
import CancelDrivingLesson from '../Components/CancelDrivingLesson';
import DrivingLessonsListItem from '../Components/DrivingLessonsListItem';

class DrivingLessonsList extends Component {
  constructor(props) {
    super(props);

    this.state = { cancelableDrivingLessonId: null }
  }

  openCancelDrivingLessonModal = (id) =>
    this.setState({ cancelableDrivingLessonId: id },
      () => this.props.openModal(MODALS_IDS.CANCEL_DRIVING_LESSON)
    )

  userCanCancelLessons = () => {
    const { user, drivingSchool } = this.props;

    return (isStudent(user) || canModifySchedules(drivingSchool))
  }

  sort = (drivingLessons) =>
    drivingLessons.sort((lesson1, lesson2) =>
      moment(lesson1.start_time).isBefore(lesson2.start_time)
    )

  renderDrivingLessons = () => {
    const { drivingLessons, userContext, scrollEnabled, fetchingStatus } = this.props;

    if (fetchingStatus === FETCHING_STATUS.READY || fetchingStatus === FETCHING_STATUS.SUCCESS)
      if (drivingLessons.length === 0) {
        return <Text style={styles.emptyDrivingLessons}>Brak jazd</Text>
      } else {
        return (
          <FlatList
            scrollEnabled={scrollEnabled}
            data={this.sort(drivingLessons)}
            renderItem={({item, index}) => (
              <DrivingLessonsListItem drivingLesson={item}
                                      userCanCancelLesson={this.userCanCancelLessons()}
                                      userContext={userContext}
                                      onCancelPress={this.openCancelDrivingLessonModal} />
            )}
            showsVerticalScrollIndicator={false}
            keyExtractor={(element, _) => `drivingLesson-${element.id}`}
          />
        )
      }
  }

  findDrivingLesson = (id) =>
    this.props.drivingLessons.find(drivingLesson => (drivingLesson.id === id))

  render() {
    const { drivingLessons, fetchingStatus, scrollEnabled } = this.props;
    const { cancelableDrivingLessonId } = this.state;

    return (
      <View style={scrollEnabled && { flex: 1 }}>
        {this.renderDrivingLessons()}

        <ModalTemplate
          modalID={MODALS_IDS.CANCEL_DRIVING_LESSON}
          status={fetchingStatus}
          closeModalCallback={this.props.resetDrivingLessonFetchingStatus}>
          <CancelDrivingLesson
            onPress={() => this.props.cancelDrivingLesson(cancelableDrivingLessonId)}
            drivingLesson={this.findDrivingLesson(cancelableDrivingLessonId)}
          />
        </ModalTemplate>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  subtitle: {
    color: Colors.strongGrey,
    fontSize: Fonts.size.small,
    fontWeight: '500'
  },
  emptyDrivingLessons: {
    color: Colors.strongGrey,
    fontSize: Fonts.size.medium,
    fontWeight: '500',
    alignSelf: 'center',
    margin: 15
  }
});

const mapStateToProps = state => ({
  user: state.user,
  drivingSchool: state.drivingSchools.hashMap[state.context.currentDrivingSchoolID],
});

const mapDispatchToProps = dispatch => ({
  cancelDrivingLesson: (id) => dispatch(drivingLessonActionCreators.cancelRequest(id)),
  openModal: (modalId) => dispatch(modalActionCreators.open(modalId)),
  resetDrivingLessonFetchingStatus: () => dispatch(drivingLessonActionCreators.changeStatus(FETCHING_STATUS.READY)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DrivingLessonsList)
