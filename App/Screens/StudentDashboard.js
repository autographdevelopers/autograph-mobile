/** Built-in modules */
import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment/moment';
/** Custom modules */
import { drivingCourseActionCreators } from '../Redux/Entities/DrivingCourseRedux';
import { drivingLessonActionCreators } from '../Redux/Entities/DrivingLessonRedux';
import { Colors, Fonts } from '../Themes/';
import {
  AFTER_SAVE_CALLBACKS,
  DRIVING_LESSON_STATUSES,
} from '../Lib/DrivingLessonHelpers';
import { FETCHING_STATUS } from '../Lib/utils';
import listProjectorStyles from '../Styles/ListProjector';

import DrivingLessonsList from '../Containers/DrivingLessonsList';
import DrivingCourseProgress from '../Components/DrivingCourseProgress'
import SectionHeader from '../Components/SectionHeader';
import SpinnerView from '../Components/SpinnerView';

/** Screen */
class StudentDashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount = () => {
    this.props.fetchDrivingCourse(this.props.user.id);
    this.props.fetchDrivingLessons({ student_id: this.props.user.id })
  }

  isFetching = (drivingLessonsStatus, drivingCourseStatus) =>
    drivingLessonsStatus === FETCHING_STATUS.FETCHING || drivingCourseStatus === FETCHING_STATUS.FETCHING


  upcomingDrivingLessons = (drivingLessons) =>
    drivingLessons.allIDs.map(id => drivingLessons.hashMap[id]).filter(drivingLesson =>
      (DRIVING_LESSON_STATUSES.ACTIVE === drivingLesson.status && moment().isBefore(drivingLesson.start_time))
    )

  render() {
    const { user } = this.props;
    const { drivingLessons, drivingCourse } = this.props;

    return (
      <View style={{flex: 1}}>
        { this.isFetching(drivingLessons.status, drivingCourse.status) ? <SpinnerView /> :
          <ScrollView style={styles.container}>
            <SectionHeader title={'Postępy'} />

            <View style={styles.drivingCourseProgressWrapper}>
              <DrivingCourseProgress
                drivingCourse={drivingCourse}
                drivingLessonsData={drivingLessons.allIDs.map(id => drivingLessons.hashMap[id])}/>
            </View>

            <View style={styles.headerWithBtn}>
              <SectionHeader title={'Nadchodzące jazdy'} />

              <ButtonText
                onPress={() => this.props.navigation.navigate('drivingLessons', {studentId: user.id})}
                customTextStyle={{fontSize: Fonts.size.small}}>
                Pokaż wszystkie
              </ButtonText>
            </View>

            <View style={[listProjectorStyles.containerStyle, styles.drivingLessonsListWrapper]}>
              <DrivingLessonsList
                drivingLessons={this.upcomingDrivingLessons(drivingLessons)}
                userContext={'employee'}
                fetchingStatus={drivingLessons.status}
                scrollEnabled={false}
              />
            </View>
          </ScrollView>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15
  },
  headerWithBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.snow,
    alignItems: 'center',
  },
  drivingCourseProgressWrapper: {
    marginVertical: 15
  },
  drivingLessonsListWrapper: {
    marginTop: 10,
    marginBottom: 15
  }
});

const mapStateToProps = state => ({
  drivingCourse: state.entities.drivingCourse,
  user: state.access.currentUser,
  drivingLessons: state.entities.drivingLessons
});

const mapDispatchToProps = dispatch => ({
  fetchDrivingCourse: (studentId) => dispatch(drivingCourseActionCreators.showRequest(studentId)),
  fetchDrivingLessons: (params) => dispatch(drivingLessonActionCreators.indexRequest(params, AFTER_SAVE_CALLBACKS.OVERRIDE_ID))
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentDashboard)
