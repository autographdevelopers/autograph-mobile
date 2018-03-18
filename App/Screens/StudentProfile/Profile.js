import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Layout from '../../Components/Layout';
import SectionHeader from '../../Components/SectionHeader';
import ButtonText from '../../Components/ButtonText';
import { Colors } from '../../Themes/index';
import Fonts from '../../Themes/Fonts';
import listProjectorStyles from '../../Styles/ListProjector';
import DrivingCourseProgress from '../../Components/DrivingCourseProgress'
import { contextActionCreators } from '../../Redux/ContextRedux';
import { drivingCourseActionCreators, drivingCourseActionTypes } from '../../Redux/DrivingCourseRedux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { MODALS_IDS, modalActionCreators } from '../../Redux/ModalRedux';
import { FETCHING_STATUS } from '../../Lib/utils';
import ModalTemplate from '../../Components/ModalTemplate';
import ChangeAvailableHours from '../../Components/ChangeAvailableHours'

class Profile extends Component {
  componentDidMount = () => {
    console.tron.log(drivingCourseActionTypes);
    this.props.fetchDrivingCourse()
  }

  componentWillUnmount = () => {
    this.props.setCurrentStudent(null);
  };

  render() {
    const { drivingCourse } = this.props

    return (
      <Layout>
        {/*-------------*/}
        <View style={styles.headerWithBtn}>
          <View>
            <Text style={styles.headerText}>Postępy</Text>
            <View style={styles.underline}/>
          </View>

          <ButtonText
            onPress={this.props.openChangeAvailableHoursModal}
            customTextStyle={{ fontSize: Fonts.size.small }}
            icon={<Icon name={'edit'} size={16} color={Colors.primaryWarm}/>}>
            Edytuj
          </ButtonText>
        </View>

        <View style={[listProjectorStyles.containerStyle, { flex: 0 }]}>
          <DrivingCourseProgress drivingCourse={drivingCourse}/>
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
        {/*-------------*/}



        <View style={styles.headerWithBtn}>

          <View>
            <Text style={styles.headerText}>Nadchodzące jazdy</Text>
            <View style={styles.underline}/>
          </View>

          <ButtonText
            onPress={() => {}}
            customTextStyle={{ fontSize: Fonts.size.small }}>
            Pokaż wszystkie
          </ButtonText>
        </View>

        <View style={listProjectorStyles.containerStyle}>
        </View>
        {/*-------------*/}

        <View style={styles.headerWithBtn}>

          <View>
            <Text style={styles.headerText}>Aktywności</Text>
            <View style={styles.underline}/>
          </View>

          <ButtonText
            onPress={() => {}}
            customTextStyle={{ fontSize: Fonts.size.small }}>
            Pokaż wszystkie
          </ButtonText>
        </View>

        <View style={listProjectorStyles.containerStyle}>
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
    marginBottom: 5
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
  }
})

const mapStateToProps = state => ({
  drivingCourse: state.drivingCourse
});

const mapDispatchToProps = dispatch => ({
  setCurrentStudent: (studentID) => dispatch(contextActionCreators.setCurrentStudent(studentID)),
  fetchDrivingCourse: () => dispatch(drivingCourseActionCreators.showRequest()),
  openChangeAvailableHoursModal: () => dispatch(modalActionCreators.open(MODALS_IDS.CHANGE_AVAILABLE_HOURS)),
  resetDrivingCourseFetchingStatus: () => dispatch(drivingCourseActionCreators.changeStatus(FETCHING_STATUS.READY)),
  updateDrivingCourse: (data) => dispatch(drivingCourseActionCreators.updateRequest(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
