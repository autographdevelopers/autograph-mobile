/** == Built-in modules ================================ */
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons'
/** == Action Creators ================================= */
import { contextActionCreators } from '../../Redux/Support/ContextRedux';
import { drivingCourseActionCreators } from '../../Redux/Entities/DrivingCourseRedux';
import { studentProfileActionCreators } from '../../Redux/Views/StudentProfileRedux';
/** == Constants ======================================= */
import { MODALS_IDS, modalActionCreators } from '../../Redux/Views/Modals/ModalRedux';
import { FETCHING_STATUS } from '../../Lib/utils';
import { canManageStudents } from '../../Lib/AuthorizationHelpers';
/** == Components ====================================== */
import ModalTemplate from '../../Components/ModalTemplate';
import DrivingCourseProgress from '../../Components/DrivingCourseProgress'
import ChangeAvailableHours from '../../Components/ChangeAvailableHours'
import DrivingLessonsList from '../../Containers/DrivingLessonsList';
import ButtonText from '../../Components/ButtonText';
import SectionHeader from '../../Components/SectionHeader';
import ActivitiesList from '../../Components/ActivitiesList';
/** == Selectors ======================================= */
import { getCurrentDrivingSchool } from '../../Selectors/DrivingSchool';
import { getActionsPayloadsForSaga } from '../../Selectors/StudentProfileScreen';
import { getAllStudentsLessons } from '../../Selectors/DrivingLesson';
import { getStudentsUpcomingLessons } from '../../Selectors/DrivingLesson';
import { getCurrentStudent } from '../../Selectors/Student';
import { getStudentProfileActivities } from '../../Selectors/Activities';
/** == HOCs ======================================= */
import withRequiredData from '../../HOC/withRequiredData';
/** == Utils =========================================== */
import listProjectorStyles from '../../Styles/ListProjector';
import { Colors, Fonts } from '../../Themes/';
import { propsChangedOnlyByNavigation } from '../../Lib/utils';

const VISIBLE_ACTIVITIES_NO = 3;
const VISIBLE_LESSONS_NO = 3;

class Profile extends Component {
  shouldComponentUpdate(nextProps) {
    return !propsChangedOnlyByNavigation(nextProps, this.props);
  }

  render() {
    const {
      drivingCourse,
      allDrivingLessons,
      drivingSchool,
      activities,
      openModal,
      upcomingDrivingLessons,
      student,
      navigation: { navigate },
      resetDrivingCourseFetchingStatus,
      updateDrivingCourse
    } = this.props;

    return (
      <ScrollView contentContainerStyle={styles.container}
                  showsVerticalScrollIndicator={false}>
        <View style={styles.headerWithBtn}>
          <SectionHeader title={'Postępy'} />
          {
            canManageStudents(drivingSchool) &&
            <ButtonText
              onPress={() => openModal(MODALS_IDS.CHANGE_AVAILABLE_HOURS)}
              customTextStyle={{fontSize: Fonts.size.small}}
              icon={<Icon name={'edit'} size={16} color={Colors.primaryWarm}/>}>
              Edytuj
            </ButtonText>
          }
        </View>

        <View style={styles.drivingCourseProgressWrapper}>
          <DrivingCourseProgress
            drivingCourse={drivingCourse}
            drivingLessonsData={allDrivingLessons}/>
        </View>

        <ModalTemplate
          modalID={MODALS_IDS.CHANGE_AVAILABLE_HOURS}
          status={drivingCourse.status}
          closeModalCallback={resetDrivingCourseFetchingStatus}>
          <ChangeAvailableHours
            availableHours={drivingCourse.data.available_hours}
            onPress={updateDrivingCourse}
          />
        </ModalTemplate>

        <View style={styles.headerWithBtn}>
          <SectionHeader title={`Nadchodzące jazdy (${upcomingDrivingLessons.length})`} />
          <ButtonText
            onPress={() => navigate('drivingLessons', { lessonsParams: { student_id: student.id } })}
            icon={<Icon name={'edit'} size={16} color={Colors.primaryWarm}/>}
            customTextStyle={{fontSize: Fonts.size.small}}>
              Pokaż wszystkie
          </ButtonText>
        </View>

        <View style={[listProjectorStyles.containerStyle, styles.drivingLessonsListWrapper]}>
          <DrivingLessonsList
            drivingLessons={upcomingDrivingLessons.slice(0, VISIBLE_LESSONS_NO)}
            userContext={'employee'}
            scrollEnabled={false}
          />
        </View>

        { canManageStudents(drivingSchool) &&
        <View>
          <View style={styles.headerWithBtn}>
            <SectionHeader title={'Ostatnie aktywności'} />
            <ButtonText
              onPress={() => navigate('activitiesFullList', { activitiesParams: { related_user_id: student.id } })}
              customTextStyle={{ fontSize: Fonts.size.small }}
              icon={<Icon name={'edit'} size={16} color={Colors.primaryWarm}/>}>
              Pokaż wszystkie
            </ButtonText>
          </View>
          <View style={[listProjectorStyles.containerStyle, { marginTop: 10 }]}>
            <ActivitiesList activities={activities.slice(0, VISIBLE_ACTIVITIES_NO)}/>
          </View>
        </View>
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 15,
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
  allDrivingLessons: getAllStudentsLessons(state),
  student: getCurrentStudent(state),
  drivingSchool: getCurrentDrivingSchool(state),
  activities: getStudentProfileActivities(state),
  status: state.views.studentProfileScreen.status,
  upcomingDrivingLessons: getStudentsUpcomingLessons(state),
  requestDataArguments: getActionsPayloadsForSaga(state)
});

const mapDispatchToProps = dispatch => ({
  requestDataForView: payloads => dispatch(studentProfileActionCreators.requestDataForView({payloads})),
  cleanupCurrentStudent: () => dispatch(contextActionCreators.setCurrentStudent(null)),
  openModal: modalId => dispatch(modalActionCreators.open(modalId)),
  resetDrivingCourseFetchingStatus: () => dispatch(drivingCourseActionCreators.changeStatus(FETCHING_STATUS.READY)),
  updateDrivingCourse: data => dispatch(drivingCourseActionCreators.updateRequest(data)),
});

const withAsyncLoading = withRequiredData(
  Profile,
  'status',
  'requestDataForView',
  'requestDataArguments',
  'cleanupCurrentStudent'
);

export default connect(mapStateToProps, mapDispatchToProps)(withAsyncLoading)
