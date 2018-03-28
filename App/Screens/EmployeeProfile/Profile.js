import React, { Component } from 'react';
import Layout from '../../Components/Layout';
import { View } from 'react-native';
import SectionHeader from '../../Components/SectionHeader';
import ButtonText from '../../Components/ButtonText';
import { connect } from 'react-redux';
import { FETCHING_STATUS } from '../../Lib/utils';
import { contextActionCreators } from '../../Redux/ContextRedux';
import { drivingLessonActionCreators } from '../../Redux/DrivingLessonRedux';
import { modalActionCreators, MODALS_IDS } from '../../Redux/ModalRedux';
import { drivingCourseActionCreators } from '../../Redux/DrivingCourseRedux';
import { canManageEmployees, canManageStudents } from '../../Lib/AuthorizationHelpers';
import listProjectorStyles from '../../Styles/ListProjector';
import DrivingLessonsList from '../../Components/DrivingLessonsList';
import { Colors, Fonts } from '../../Themes/';
import Icon from 'react-native-vector-icons/MaterialIcons'

class Profile extends Component {

  componentWillMount = () => {
    this.props.fetchDrivingLessons({ employee_id: this.props.employeeId })
  };

  componentWillUnmount = () => {
    this.props.setCurrentEmployee(null);
  };

  render() {
    return (
      <Layout>
        <View style={styles.headerWithBtn}>
          <SectionHeader title={'Nadchodzące jazdy'} customTextStyles={styles.headerText} customUnderlineStyles={styles.underline}/>
          {
            canManageEmployees(this.props.drivingSchool) &&
              <ButtonText
                customTextStyle={{ fontSize: Fonts.size.small }}
                icon={<Icon name={'edit'} size={16} color={Colors.primaryWarm}/>}>
                Edytuj
              </ButtonText>
          }

        </View>
        <View style={[listProjectorStyles.containerStyle]}>
          <DrivingLessonsList
            onCancelPress={this.openDrivingLessonCancelModal}
            drivingLessons={this.props.drivingLessons}
            canManageStudents={canManageStudents(this.props.drivingSchool)}
            userContext={'employee'}/>
        </View>
      </Layout>

    );
  }
}

const styles = {
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
}

const mapStateToProps = state => ({
  employeeId: state.context.currentEmployeeID,
  drivingLessons: state.drivingLessons,
  drivingSchool: state.drivingSchools.hashMap[state.context.currentDrivingSchoolID]
});

const mapDispatchToProps = dispatch => ({
  setCurrentEmployee: id => dispatch(contextActionCreators.setCurrentEmployee(id)),
  fetchDrivingLessons: (params) => dispatch(drivingLessonActionCreators.indexRequest(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
