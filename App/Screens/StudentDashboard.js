/** Built-in modules */
import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
/** Custom modules */
import { studentDashboardActionCreators } from '../Redux/Views/StudentDashboardRedux';
import { Colors, Fonts } from '../Themes/';
import listProjectorStyles from '../Styles/ListProjector';

import DrivingLessonsList from '../Containers/DrivingLessonsList';
import DrivingCourseProgress from '../Components/DrivingCourseProgress'
import SectionHeader from '../Components/SectionHeader';
import withRequiredData from '../HOC/withRequiredData';
import { getStudentsDashboardRequestParams } from '../Selectors/StudentDashboard';
import { getUpcomingDrivingLessons } from '../Selectors/StudentDashboard';

/** Screen */
class StudentDashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      drivingLessons,
      drivingCourse,
      upcomingDrivingLessons,
      user
    } = this.props;

    return (
      <View style={{flex: 1}}>
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
              drivingLessons={upcomingDrivingLessons}
              userContext={'employee'}
              fetchingStatus={drivingLessons.status}
              scrollEnabled={false}
            />
          </View>
        </ScrollView>
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
  status: state.views.studentDashboardScreen.status,
  drivingLessons: state.entities.drivingLessons,
  requestDataParams: getStudentsDashboardRequestParams(state),
  upcomingDrivingLessons: getUpcomingDrivingLessons(state)
});

const mapDispatchToProps = dispatch => ({
  requestDataForView: payloads => dispatch(studentDashboardActionCreators.requestDataForView({payloads})),
});

const withAsyncLoading = withRequiredData(
  StudentDashboard,
  'status',
  'requestDataForView',
  'requestDataParams'
);

export default connect(mapStateToProps, mapDispatchToProps)(withAsyncLoading)
