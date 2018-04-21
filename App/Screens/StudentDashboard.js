/** Built-in modules */
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
/** Custom modules */
import { drivingCourseActionCreators } from '../Redux/DrivingCourseRedux';
import { drivingLessonActionCreators } from '../Redux/DrivingLessonRedux';
import DrivingCourseProgress from '../Components/DrivingCourseProgress'
import SectionHeader from '../Components/SectionHeader';
import DrivingLessonsList from '../Components/DrivingLessonsList';
import listProjectorStyles from '../Styles/ListProjector';
import { Colors, Fonts } from '../Themes/';

/** Screen */
class StudentDashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount = () => {
    this.props.fetchDrivingCourse(this.props.user.id);
    this.props.fetchDrivingLessons({ student_id: this.props.user.id, upcoming: true, active: true })
  }

  render() {
    return (
      <View style={styles.container}>
        <SectionHeader
          title={'Postępy'}
          customTextStyles={styles.headerText}
          customUnderlineStyles={styles.underline} />

        <View style={styles.drivingCourseProgressWrapper}>
          <DrivingCourseProgress drivingCourse={this.props.drivingCourse} />
        </View>

        <View style={styles.headerWithBtn}>
          <SectionHeader
            title={'Nadchodzące jazdy'}
            customTextStyles={styles.headerText}
            customUnderlineStyles={styles.underline} />

          <ButtonText
            onPress={() => {}}
            customTextStyle={{ fontSize: Fonts.size.small }}>
            Pokaż wszystkie
          </ButtonText>
        </View>

        <View style={[listProjectorStyles.containerStyle, styles.drivingLessonsListWrapper]}>
          <DrivingLessonsList
            onCancelPress={() => {}}
            drivingLessons={this.props.drivingLessons}
            canManageStudents={true}
            userContext={'student'} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 15
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
