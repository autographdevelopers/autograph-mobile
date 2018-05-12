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
/** == Selectors ======================================= */
import { getCurrentDrivingSchool } from '../../Selectors/DrivingSchool';
import { getActionsPayloadsForSaga } from '../../Selectors/StudentProfileScreen';
import { getStudentsUpcomingLessons } from '../../Selectors/DrivingLesson';
import { getCurrentStudent } from '../../Selectors/Student';
/** == HOCs ======================================= */
import withRequiredData from '../../HOC/withRequiredData';
/** == Utils =========================================== */
import listProjectorStyles from '../../Styles/ListProjector';
import { Colors, Fonts } from '../../Themes/';

class Profile extends Component {
  componentWillUnmount = () => {
    console.tron.log('Unmouneting students profile')
    this.props.setCurrentStudent(null);
  }


  render() {
    const {
      drivingCourse,
      drivingLessons,
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
      <View style={{flex: 1}}>
          <ScrollView style={styles.container}>
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
                drivingLessonsData={drivingLessons.allIDs.map(id => drivingLessons.hashMap[id])}/>
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
              <SectionHeader title={'Nadchodzące jazdy'} />

              <ButtonText
                onPress={() => navigate('drivingLessons', { lessonsParams: { studentId: student.id } })}
                customTextStyle={{fontSize: Fonts.size.small}}>
                Pokaż wszystkie
              </ButtonText>
            </View>

            <View style={[listProjectorStyles.containerStyle, styles.drivingLessonsListWrapper]}>
              <DrivingLessonsList
                drivingLessons={upcomingDrivingLessons}
                userContext={'employee'}
                scrollEnabled={false}
              />
            </View>

            { canManageStudents(drivingSchool) &&
            <View>
              <View style={styles.headerWithBtn}>
                <SectionHeader title={'Aktywności pracownikiem'} />
                <ButtonText
                  customTextStyle={{ fontSize: Fonts.size.small }}
                  icon={<Icon name={'edit'} size={16} color={Colors.primaryWarm}/>}>
                  Pokaż wszystkie
                </ButtonText>
              </View>
              <View style={[listProjectorStyles.containerStyle, { marginTop: 10 }]}>
                <ActivitiesList
                  activities={activities.userActivitiesFeedIds.map(id => activities.data[id])}
                  fetchingStatus={activities.status}
                  scrollEnabled={false} />
              </View>
            </View>
            }
          </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
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
  drivingLessons: state.entities.drivingLessons,
  student: getCurrentStudent(state),
  drivingSchool: getCurrentDrivingSchool(state),
  activities: state.entities.activities,
  status: state.views.studentProfileScreen.status,
  upcomingDrivingLessons: getStudentsUpcomingLessons(state),
  requestDataArguments: getActionsPayloadsForSaga(state)
});

const mapDispatchToProps = dispatch => ({
  requestDataForView: payloads => dispatch(studentProfileActionCreators.requestDataForView({payloads})),
  setCurrentStudent: studentID => dispatch(contextActionCreators.setCurrentStudent(studentID)),
  openModal: modalId => dispatch(modalActionCreators.open(modalId)),
  resetDrivingCourseFetchingStatus: () => dispatch(drivingCourseActionCreators.changeStatus(FETCHING_STATUS.READY)),
  updateDrivingCourse: data => dispatch(drivingCourseActionCreators.updateRequest(data)),
});

const withAsyncLoading = withRequiredData(
  Profile,
  'status',
  'requestDataForView',
  'requestDataArguments'
);

export default connect(mapStateToProps, mapDispatchToProps)(withAsyncLoading)
