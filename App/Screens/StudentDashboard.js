/** Built-in modules */
import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment/moment';
/** Custom modules */
import { drivingCourseActionCreators } from '../Redux/DrivingCourseRedux';
import { drivingLessonActionCreators } from '../Redux/DrivingLessonRedux';
import { Colors, Fonts } from '../Themes/';
import { DRIVING_LESSON_STATUSES } from '../Lib/DrivingLessonHelpers';
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
            <SectionHeader
              title={'Postępy'}
              customTextStyles={styles.headerText}
              customUnderlineStyles={styles.underline}/>

            <View style={styles.drivingCourseProgressWrapper}>
              <DrivingCourseProgress
                drivingCourse={drivingCourse}
                drivingLessonsData={drivingLessons.allIDs.map(id => drivingLessons.hashMap[id])}/>
            </View>

            <View style={styles.headerWithBtn}>
              <SectionHeader
                title={'Nadchodzące jazdy'}
                customTextStyles={styles.headerText}
                customUnderlineStyles={styles.underline}/>

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
  headerText: {
    fontSize: Fonts.size.medium,
    color: Colors.strongGrey,
    fontWeight: '400'
  },
  underline: {
    marginTop: 3,
    width: 30,
    borderColor: Colors.primaryWarm,
    borderWidth: 1,
  },
  drivingCourseProgressWrapper: {
    marginVertical: 15
  },
  drivingLessonsListWrapper: {
    marginTop: 10,
    marginBottom: 15
  }
})

const mapStateToProps = state => ({
  drivingCourse: state.drivingCourse,
  user: state.user,
  drivingLessons: state.drivingLessons
});

const mapDispatchToProps = dispatch => ({
  fetchDrivingCourse: (studentId) => dispatch(drivingCourseActionCreators.showRequest(studentId)),
  fetchDrivingLessons: (params) => dispatch(drivingLessonActionCreators.indexRequest(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentDashboard)
