/** Built-in modules */
import React, { Component } from 'react';
import { FlatList, View, RefreshControl, Text } from 'react-native';
import {connect} from 'react-redux';
/** Custom modules */
import { drivingCourseActionCreators } from '../Redux/DrivingCourseRedux';

/** Screen */
class StudentDashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount = () => {
    console.tron.log('adfsadfsfas')
    this.props.fetchDrivingCourse(this.props.user.id);
  }

  render() {
    return(
      <Layout>
        <Text>slkdlasdfalskdjfalskdjf</Text>
      </Layout>
    );
  }
}

const styles = {

};

const mapStateToProps = state => ({
  drivingCourse: state.drivingCourse,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  fetchDrivingCourse: (studentId) => dispatch(drivingCourseActionCreators.showRequest(studentId))
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentDashboard)
