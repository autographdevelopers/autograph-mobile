import React, { Component } from 'react';
import Layout from '../../Components/Layout';
import { connect } from 'react-redux';
import { FETCHING_STATUS } from '../../Lib/utils';
import { contextActionCreators } from '../../Redux/ContextRedux';
import { drivingLessonActionCreators } from '../../Redux/DrivingLessonRedux';
import { modalActionCreators } from '../../Redux/ModalRedux';
import { drivingCourseActionCreators } from '../../Redux/DrivingCourseRedux';

class Profile extends Component {

  componentWillMount = () => {
    this.props.fetchDrivingLessons({ employee_id: this.props.employeeId })
  };

  componentWillUnmount = () => {
    this.props.setCurrentEmployee(null);
  };

  render() {
    return (
      <Layout/>
    );
  }
}

const mapStateToProps = state => ({
  employeeId: state.context.currentEmployeeID
});

const mapDispatchToProps = dispatch => ({
  setCurrentEmployee: id => dispatch(contextActionCreators.setCurrentEmployee(id)),
  fetchDrivingLessons: (params) => dispatch(drivingLessonActionCreators.indexRequest(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
