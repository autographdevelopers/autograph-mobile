import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons'
import moment from 'moment/moment';

import { contextActionCreators } from '../../Redux/ContextRedux';
import { drivingCourseActionCreators } from '../../Redux/DrivingCourseRedux';
import { drivingLessonActionCreators } from '../../Redux/DrivingLessonRedux';
import { MODALS_IDS, modalActionCreators } from '../../Redux/ModalRedux';
import listProjectorStyles from '../../Styles/ListProjector';
import { FETCHING_STATUS } from '../../Lib/utils';
import { DRIVING_LESSON_TYPES } from '../../Lib/DrivingLessonHelpers';
import { canManageStudents } from '../../Lib/AuthorizationHelpers';
import { Colors, Fonts } from '../../Themes/';

import ModalTemplate from '../../Components/ModalTemplate';
import DrivingCourseProgress from '../../Components/DrivingCourseProgress'
import Layout from '../../Components/Layout';
import ChangeAvailableHours from '../../Components/ChangeAvailableHours'
import DrivingLessonsList from '../../Containers/DrivingLessonsList';
import ButtonText from '../../Components/ButtonText';
import SectionHeader from '../../Components/SectionHeader';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentDrivingLessonId: null
    };
  }

  componentWillMount = () => {
    this.props.fetchDrivingCourse();
    this.props.fetchDrivingLessons({ student_id: this.props.studentId })
  }

  componentWillUnmount = () => {
    this.props.setCurrentStudent(null);
  };

  openDrivingLessonCancelModal = (id) => {
    this.setState({currentDrivingLessonId: id},
      () => this.props.openModal(MODALS_IDS.CANCEL_DRIVING_LESSON)
    )
  }

  upcomingDrivingLessons = () => {
    const  { drivingLessons } = this.props;

    return drivingLessons.allIDs.map(id => drivingLessons.hashMap[id]).filter(drivingLesson =>
      (DRIVING_LESSON_TYPES.ACTIVE === drivingLesson.status && moment().isBefore(drivingLesson.start_time))
    )
  }

  render() {
    const { drivingCourse, drivingLessons, drivingSchool } = this.props
    const { currentDrivingLessonId } = this.state

    return (
      <Layout>
        <View style={styles.headerWithBtn}>
          <SectionHeader
            title={'Postępy'}
            customTextStyles={styles.headerText}
            customUnderlineStyles={styles.underline} />

          {
            canManageStudents(drivingSchool) &&
            <ButtonText
              onPress={() => this.props.openModal(MODALS_IDS.CHANGE_AVAILABLE_HOURS)}
              customTextStyle={{ fontSize: Fonts.size.small }}
              icon={<Icon name={'edit'} size={16} color={Colors.primaryWarm}/>}>
              Edytuj
            </ButtonText>
          }
        </View>

        <View style={styles.drivingCourseProgressWrapper}>
          <DrivingCourseProgress
            drivingCourse={drivingCourse}
            drivingLessonsData={drivingLessons.allIDs.map(id => drivingLessons.hashMap[id])}/>
        </View>

        <ModalTemplate
          modalID={MODALS_IDS.CHANGE_AVAILABLE_HOURS}
          status={drivingCourse.status}
          closeModalCallback={this.props.resetDrivingCourseFetchingStatus}>
          <ChangeAvailableHours
            availableHours={drivingCourse.data.available_hours}
            onPress={this.props.updateDrivingCourse}
          />
        </ModalTemplate>

        <View style={styles.headerWithBtn}>
          <SectionHeader
            title={'Nadchodzące jazdy'}
            customTextStyles={styles.headerText}
            customUnderlineStyles={styles.underline} />

          <ButtonText
            onPress={() => this.props.navigation.navigate('drivingLessons', { studentId: this.props.studentId })}
            customTextStyle={{ fontSize: Fonts.size.small }}>
            Pokaż wszystkie
          </ButtonText>
        </View>

        <View style={[listProjectorStyles.containerStyle, styles.drivingLessonsListWrapper]}>
          <DrivingLessonsList
            drivingLessons={this.upcomingDrivingLessons()}
            userContext={'employee'}
            fetchingStatus={drivingLessons.status}
            scrollEnabled={false}
          />
        </View>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
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
  drivingLessons: state.drivingLessons,
  studentId: state.context.currentStudentID,
  drivingSchool: state.drivingSchools.hashMap[state.context.currentDrivingSchoolID]
});

const mapDispatchToProps = dispatch => ({
  setCurrentStudent: (studentID) => dispatch(contextActionCreators.setCurrentStudent(studentID)),
  fetchDrivingCourse: () => dispatch(drivingCourseActionCreators.showRequest()),
  fetchDrivingLessons: (params) => dispatch(drivingLessonActionCreators.indexRequest(params)),
  openModal: (modalId) => dispatch(modalActionCreators.open(modalId)),
  resetDrivingCourseFetchingStatus: () => dispatch(drivingCourseActionCreators.changeStatus(FETCHING_STATUS.READY)),
  resetDrivingLessonFetchingStatus: () => dispatch(drivingLessonActionCreators.changeStatus(FETCHING_STATUS.READY)),
  updateDrivingCourse: (data) => dispatch(drivingCourseActionCreators.updateRequest(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
